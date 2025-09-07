# Layout.jsx 組件分析

## 概述
Layout.jsx 是應用程式的主要佈局組件，提供了完整的頁面結構，包含導航欄、側邊選單和主要內容區域。

## 主要功能

### 1. 國際化支援
- 使用 Kendo React Intl 提供國際化功能
- 載入繁體中文 (zh-TW) 語言包
- 支援 CLDR 數據格式化

### 2. 響應式設計
- 支援桌面、平板、手機三種螢幕尺寸
- 斷點：768px (平板)、480px (小手機)
- 自動調整導航欄和內容區域佈局

### 3. 導航系統
- 頂部導航欄：包含應用名稱、用戶資訊、主要導航連結
- 側邊選單：動態載入功能選單
- 權限控制：根據用戶權限顯示對應功能

### 4. 用戶介面元素
- 用戶資訊顯示（姓名、部門）
- 登出功能
- 選單切換按鈕（小螢幕）

## 組件結構

```
Layout
├── LocalizationProvider (國際化)
├── IntlProvider (語言設定)
├── nav (頂部導航欄)
│   ├── 應用標題
│   ├── 選單切換按鈕 (行動版)
│   ├── 用戶資訊
│   └── 導航連結
└── main (主要內容區)
    ├── SideMenu (側邊選單)
    └── children (頁面內容)
```

## 樣式系統

### 基礎樣式
- 使用 JavaScript 物件定義樣式
- 深色主題 (#2c3e50 背景色)
- 固定頂部導航欄
- Flexbox 佈局

### 響應式樣式
- `getResponsiveStyles()` 函數處理不同螢幕尺寸
- 小螢幕：垂直排列導航元素
- 大螢幕：水平排列導航元素

## 權限管理

### 功能權限
- `mcb()` 函數：根據用戶權限過濾功能選單
- 支援超級用戶 (IsSupper) 權限
- 基於 `actAuths` 的存取控制

### 通用頁面
- `getCommonAuth()` 函數：載入通用頁面
- 從 `_commonpage` 配置載入

## 狀態管理

### React State
- `windowWidth`：視窗寬度
- `sideOpen`：側邊選單開啟狀態
- `sideCollapsed`：側邊選單收合狀態

### Context
- `useTokenContext`：用戶認證資訊
- 包含用戶 ID、姓名、部門等資訊

## 事件處理

### 視窗調整
- 監聽 `resize` 事件
- 自動調整側邊選單顯示狀態

### 導航互動
- 滑鼠懸停效果
- 活動連結高亮顯示
- 登出功能

## 依賴項目

### Kendo UI React
- `@progress/kendo-react-intl`：國際化
- CLDR 數據包：數字、日期、貨幣格式化

### React Router
- `NavLink`：導航連結
- 支援活動狀態樣式

### 工具函數
- `lodash`：數據處理 (chain, filter)
- 自定義 context 和 hook

## 配置項目

### 環境變數
- `VITE_APP_NAME`：應用程式名稱

### 數據來源
- `_commonpage`：通用頁面配置
- `language`：語言包配置

## 使用方式

```jsx
<Layout data={menuData}>
  <YourPageComponent />
</Layout>
```

### Props
- `children`：頁面內容
- `data`：功能選單數據

## 特色功能

1. **完全響應式**：支援各種螢幕尺寸
2. **權限控制**：動態顯示用戶可存取的功能
3. **國際化就緒**：支援多語言切換
4. **現代化 UI**：Material Design 風格
5. **高度可配置**：透過 props 和環境變數自定義

## 改進建議

1. 考慮將樣式抽離到 CSS 模組
2. 增加主題切換功能
3. 優化行動版用戶體驗
4. 增加鍵盤導航支援
5. 考慮使用 CSS Grid 替代部分 Flexbox 佈局