---
slug: hoshi-data-commit-dag
locale: en
title: "Replicate Facts, Not Overwrites: The Commit DAG Behind hoshi-data"
summary: How immutable commits, causality, and deterministic replay shape multi-node data in hoshi-data—and why convergence is not finality
date: 2026-09-12T10:00:00Z
tag: hoshi-data
---

Two nodes temporarily lose contact, but both receive writes. When communication resumes, which version of the data should survive?

If they exchange only current values, the problem quickly becomes one of choosing sides: which copy is newer, which node is authoritative, and whether the other node's changes must be discarded. But what each node did and what the application should eventually see are different questions.

The operation log in hoshi-data starts with that distinction: **nodes replicate immutable facts, then derive current state through explicit rules.** Those facts form a Commit DAG—a directed acyclic graph of commits and their causal relationships.

This article describes the engineering design as of September 12, 2026. Its guarantees apply only to datasets integrated with the operation log and using the relevant policies. Not every dataset in the service has the same replication capabilities. This is neither a performance report nor a formal correctness proof.

## 1. This is not Git as a database

hoshi-data is Hoshivel's internal data service. Applications use semantic operations to access data; PostgreSQL still provides persistence and querying. The Commit DAG does not replace database transactions, indexes, or query capabilities.

What changes is the unit of replication. For integrated datasets, we retain not only current rows but also the operations that produced them. Each commit records operations accepted together and the history its author had already observed. The data applications query is a projection of those commits: materialized state.

There are two distinct layers:

```text
Immutable commit set + versioned rules
                   |
                   v
          Deterministic replay
                   |
                   v
          Queryable projection
```

The resemblance to Git is content addressing, immutable history, and parent relationships—not storing application data through Git commands. Nor can we wrap arbitrary SQL in commits and automatically obtain multi-writer replication. Every operation needs replayable semantics and an explicit account of conflicts.

## 2. What a commit remembers

Conceptually, a commit must identify its author, its position in that origin's history, the earlier commits it depends on, its operations, and the versions of the rules used to interpret them.

hoshi-data records an origin sequence, parent set, hybrid logical clock (HLC), schema and policy versions, and an ordered sequence of operations. **This describes the data model, not a public wire format.**

A commit's identifier is computed from its canonical content. The same commit arriving through different paths has the same identifier and can be deduplicated. Changing meaningful content produces a different commit. Parents are a set and need a fixed encoding order; operations are a sequence, so swapping them may change their meaning and must not be treated as harmless normalization.

Immutability has a concrete consequence: we do not rewrite a commit's parents or rebase another node's history into a preferred shape. Correcting an earlier operation means appending another operation. The old fact remains; current state reflects the interpretation of the complete history.

Content addressing does not establish application correctness. If one request becomes two distinct commits, their hashes do not tell us whether they should count as one business operation. That still requires operation-level idempotency.

## 3. The DAG records causality, not arrival time

Suppose A is shared history. Two nodes independently observe A and create B and C. Later, a node observes both and creates D:

```text
       B
      / \
A ---     --- D
      \ /
       C

B.parents = {A}
C.parents = {A}
D.parents = {B, C}
```

The drawing runs from earlier facts on the left to later operations on the right. Actual parent references point in the opposite direction, from child to parent.

B and C do not depend on each other, so they are concurrent. That does not mean they occurred at precisely the same physical instant, or that they necessarily conflict. It means this history does not record either as having observed the other. D must be interpreted after both.

Network arrival order therefore cannot be the operation order. One node receiving C first and another receiving B first must not cause permanently different projections. hoshi-data first orders commits topologically by causality. Among concurrently eligible commits, it breaks ties deterministically using HLC, origin identity, and commit identity. The implementation uses a priority queue with topological sorting, rather than a queue whose order depends on insertion.

HLC helps produce a reproducible order. **It does not establish which operation happened later in the physical world, and it does not replace causal parent relationships.**

Most importantly, this total order is computed over each node's known commit set. It is not a globally agreed, permanently fixed log position established before execution. A late concurrent commit may still change a result that has not become final.

## 4. The same facts must produce the same state

A DAG does not make arbitrary programs convergent. The essential contract belongs to the reducer: the rules that interpret operations as state.

A more complete expression is:

```text
S = Reduce(B, CanonicalOrder(C), R)

B: the same valid initial state or checkpoint
C: the same valid, dependency-complete commit set
R: versioned rules with identical semantics
S: the resulting projection
```

Equal C alone is insufficient: B and R must agree as well. Missing parents or gaps in origin sequences cannot be treated as complete information. An unknown policy version must not be replaced with the nearest available interpretation.

This constrains the reducer's inputs. Its answer cannot depend on local current time, packet arrival order, incidental database row order, or the language runtime's map iteration order. Numeric values and encodings also need unambiguous interpretation.

Versions are part of that contract, but **recording a version number does not solve arbitrary mixed-version operation or automatic upgrades**. Historical rules must remain available, and a node must refuse history it cannot interpret. Compatibility design and validation are still necessary.

## 5. Synchronization finds missing facts

Synchronization is not merely pushing the latest value. Nodes must discover missing commits and repeatedly repair gaps when communication is available—a process commonly called anti-entropy.

Origin sequences are useful here. If commits 4 and 6 from an origin have arrived but commit 5 has not, contiguous progress remains at 4. Reporting the highest observed sequence, 6, as completed progress would conceal a hole. Parent references provide another dependency check: receiving a child does not make it safe to project before the history it needs is available.

Two notions of frontier must be kept distinct. The parent set describes the DAG frontier observed by a commit's author. Synchronization progress records the highest contiguous sequence for each origin. One expresses causal relationships; the other helps locate gaps. A single maximum timestamp cannot replace both.

Duplicate delivery can be deduplicated by commit identity, and missing dependencies can be fetched. Reused origin sequences, invalid content, and failed origin verification are not ordinary concurrent writes to be merged away.

Content and origin verification do not, by themselves, provide full Byzantine fault tolerance. Detecting tampering, deciding whose facts may be accepted, and tolerating arbitrary malicious replicas are separate problems.

## 6. Operation semantics determine coordination

The easiest mistake is to confuse everyone eventually obtaining the same answer with that answer being valid.

Consider a resource with exactly one remaining place. Two nodes promise it to different people. A deterministic rule can eventually pick a winner, so the system converges. But the two promises already made do not become correct retroactively. This is an application-invariant problem, not something a different sorting rule can repair.

hoshi-data therefore distinguishes operation classes:

- **Commutative or monotonic operations:** under their policy guarantees, new concurrent facts cannot overturn an already confirmed effect. Every write need not first obtain a global position.
- **Deterministically conflict-resolved operations:** the current winner can be calculated, but the result may remain provisional. Choosing a winner is not the same as making it irrevocable.
- **Bounded or exclusive operations:** use preallocated rights, or escrow, or obtain the required coordination evidence instead of accepting writes unconditionally everywhere.

For a hypothetical resource with capacity 10, one node might receive 6 usage rights and another 4. Each consumes only its own rights. Even while disconnected, their combined consumption cannot exceed 10. The trade-off is that the node holding 4 cannot approve a consumption of 5 merely because it believes the other node has spare capacity.

Moving rights also requires more than independently subtracting on one side and adding on the other. The model places transferred rights in the receiver's pending inbox; they become spendable only after the receiver claims them. It maintains:

```text
Available rights + in-transit rights + consumed = capacity
```

Exclusive conditions that cannot be decomposed this way still need coordination. A quorum or proof for one key does not automatically give every operation across the database global serializability.

The goal is not to eliminate coordination. It is to **keep coordination at the semantic boundaries that require it**. Those boundaries are currently implemented as explicit operation policies, not inferred automatically from arbitrary application code.

## 7. Appended, converged, and finalized are different

A commit durably appended on one node is not necessarily present on every replica. Equal projections of all currently known commits do not establish that an unseen concurrent commit can never change the result.

hoshi-data therefore models operation finality. Results may be finalized, provisional, or superseded by a subsequent interpretation. Finality describes the result guarantee under the relevant policy; it is not a declaration that every replica or remote backup has durably stored the commit.

This distinction matters especially for external side effects. A projection can be rebuilt. An email already sent or a resource already delivered cannot be recalled simply by replaying the database. The outbox must carry finality, and consumers must explicitly decide whether they accept provisional results. Successful local append alone is not a sufficient reason to trigger an irreversible effect.

Similarly, commit deduplication is not end-to-end exactly-once execution. Cross-service retries and outbox delivery still need their own idempotency handling. One deduplicated segment cannot establish a guarantee for the entire chain.

## 8. Rebuildable projections do not make history disposable

The operation log means current state is no longer the only place that can explain the data. A projection can be checked or rebuilt from the same facts and rules, rather than by choosing one node's current rows as the answer.

Integrating this with a database still requires transaction boundaries. Related commits, projections, and idempotency records must be included in the appropriate local transaction for that write path. A commit cannot arbitrarily span database boundaries that lack atomicity. This is not general-purpose cross-database two-phase commit.

A checkpoint records a projection at a frontier, contiguous progress, and version information, providing a digest that can be checked. **Possessing a checkpoint does not make it safe to delete all earlier commits.** A matching digest answers only part of the integrity question. It does not independently establish a trusted source, complete dependencies, or that a long-offline replica will never need that history.

The current member-admission path does not directly install an external snapshot as local truth either. A joining node uses a checkpoint as a comparison target, retrieves history, replays it independently, and compares the target projection before becoming read-ready. Admission for writes is a separate explicit step. This is different from bootstrapping solely from a snapshot while skipping all history.

Safe pruning, direct checkpoint bootstrap, and preservation of verifiable causal dependencies are separate engineering capabilities.

## 9. What needs testing—and what we are not claiming

Successful writes in normal conditions are not enough to validate this design. Model-level checks need to vary delivery order, add duplicates, and replay after dependencies become available, then compare projections for the same valid commit set. Gaps, unknown policies, and invalid origins must cause refusal rather than guesswork.

Once persistence and networking are involved, validation must also cover partitions, process interruption, restart, joining replicas, and external effects. Properties of a pure reducer do not rule out mistakes in transaction wiring, synchronization, or restoration.

These requirements also bound our claims. Convergence requires the same valid facts, the same rules, and eventual access to missing data. A DAG cannot reconstruct a commit lost from every surviving copy. Replication does not replace independent backups. Causal requirements on cross-node reads also need explicit read conditions; having a DAG does not make every read immediately consistent.

This article does not claim better performance than consensus replication, or present a formal proof of whole-system correctness. Latency, throughput, history growth, replay costs, and recovery time need measurement under workloads with comparable guarantees.

## 10. From engineering to research questions

Content addressing, causal DAGs, and convergent data types have substantial prior work. [Merkle-CRDTs][merkle] discusses Merkle-DAGs as a transport and persistence layer for CRDTs. [Coordination Avoidance in Database Systems][coordination] uses invariant confluence to analyze which application invariants can survive coordination-free execution and merging. [Highly Available Transactions][hat] examines the boundaries between availability and different transactional guarantees.

The engineering value of hoshi-data is not a claim to have invented DAGs. It is bringing operation semantics, finality, persistence, and recovery into one inspectable contract. Using a related data structure does not automatically inherit every theorem from those works.

Two questions are particularly interesting for further research. First, as schemas and rules evolve, how can explicit compatibility conditions preserve historical semantics while incompatible nodes safely refuse data rather than silently reinterpreting it? Second, after pruning history, how can late-joining or long-offline replicas still verify dependencies, reconstruct results, and retain the necessary auditability?

These are research directions, not announcements of completed capabilities. A paper contribution would require a precise model, a demonstrated distinction from prior work, correctness arguments, and reproducible experiments. Evaluation should compare baselines under equivalent guarantees and measure synchronization traffic, replay and storage costs, post-failure convergence, and the fraction of operations requiring coordination—not merely select a favorable throughput chart.

For hoshi-data today, the central principle remains simple: **the current shape of the data should not be the only thing we know about it. Keeping the facts that produced it gives us a way to recompute an explainable answer after concurrency, failures, and change.**

## Further reading

1. Héctor Sanjuán et al., [*Merkle-CRDTs: Merkle-DAGs meet CRDTs*][merkle], 2020.
2. Peter Bailis et al., [*Coordination Avoidance in Database Systems (Extended Version)*][coordination], 2014.
3. Peter Bailis et al., [*Highly Available Transactions: Virtues and Limitations (Extended Version)*][hat], 2013.

[merkle]: https://arxiv.org/abs/2004.00107
[coordination]: https://arxiv.org/abs/1402.2237
[hat]: https://arxiv.org/abs/1302.0309
