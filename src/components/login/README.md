# Login 組件

## 概述
多模組管理專區的登入頁面組件，支援自動登入和手動登入功能。

## 功能特色
- 自動登入：透過 URL 參數 `uid` 進行自動登入 (base64)
- 手動登入：提供帳號密碼輸入表單 (只要打員編)
- 登入狀態顯示：包含載入動畫和狀態提示
- 錯誤處理：使用 SweetAlert2 顯示登入失敗訊息
- 路由導航：登入後自動導向指定模組或首頁

## 使用方式

### 自動登入
```
/login?uid=<user_id>
```

### 手動登入
直接訪問 `/login` 頁面，輸入帳號密碼後點擊登入按鈕。

## 組件結構
- `Login`: 主要登入組件
- `LoginPage`: 路由包裝組件，支援巢狀路由

## 錯誤處理
登入過程中如果發生錯誤，會透過 SweetAlert2 彈出友善的錯誤提示訊息：
- 標題：「登入失敗」
- 內容：「帳號或密碼錯誤，請重新輸入」
- 確認按鈕：「確定」

## 技術實作
- 使用 `useTransition` 處理非同步登入操作
- 錯誤處理在 `startTransition` 內的 async 函數中進行
- 透過 `finally` 區塊確保載入狀態正確重置

## 依賴項
- Kendo UI React (Button, Loader)
- React Router (路由導航)
- Lodash (工具函數)
- Query String (URL 參數解析)
- SweetAlert2 (錯誤訊息顯示)