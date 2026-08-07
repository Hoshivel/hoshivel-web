---
slug: hoshi-id-intro
locale: zh-Hant
title: Hoshi ID 上線——一個帳號，通行 Hoshivel
summary: Hoshivel 的通用帳號服務正式啟用：OpenID Connect 單一登入、帳戶中心與安全工作階段管理，《碎界》已率先接入。
date: 2026-07-26T10:00:00Z
tag: Hoshi ID
---

Hoshi ID——Hoshivel 的通用帳號與 OpenID Connect 身份服務——正式上線。

我們希望玩家在 Hoshivel 的世界裡只需要記得一件事：自己是誰。其餘的——登入、工作階段、與各作品的連接——都交給帳戶中心集中管理：

- **單一帳號、單一登入**：以 OAuth 2.0 ＋ OpenID Connect 標準打造，一次註冊，通行全部作品；
- **帳戶中心**：個人檔案、安全工作階段、已連接服務與登入紀錄，一頁看清、隨時撤銷；
- **安全為先**：短效憑證、Refresh Token 輪替與重用偵測；密碼重設會登出所有工作階段；
- **資料各歸其位**：各作品只保存自己的遊戲資料，信箱與密碼由 Hoshi ID 保管。

《碎界 Shattered Realms》已率先接入——從遊戲點「使用 Hoshi ID 登入」，即可自動建立或載入你的遊戲檔案。

之後的每一件 Hoshivel 作品，都會經由同一個 Hoshi ID 與你見面。
