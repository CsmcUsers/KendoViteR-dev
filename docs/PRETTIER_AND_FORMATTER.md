# Prettier 與格式化設定說明 (專案說明)

以下為專案中常見的格式化設定註解，包含 `.prettierrc`、`.prettierignore`、`package.json` 的 scripts，以及 VS Code 的相關設定範例與說明。可把這份檔案當作團隊文件或留作備查。

---

## 一、`.prettierrc`（專案 Prettier 設定）

原始（JSON）範例（注意 JSON 不支援註解）：

```json
{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "printWidth": 100,
    "bracketSpacing": true,
    "jsxSingleQuote": true,
    "endOfLine": "lf",
    "quoteProps": "as-needed",
    "trailingComma": "all"
}
```

逐項說明：

- `semi`: 是否在語句尾加分號。
  - `false`：不自動加分號（風格偏向 no-semi）。
  - `true`：自動加分號。

- `singleQuote`: 使用單引號（`'`）而非雙引號（`"`）。
  - 對 JS/JSX/JSON（非 JSON）有效。

- `tabWidth`: tab 等同的空白數量。
  - 例：`4` 表示一個縮排層級等於 4 個空白。

- `printWidth`: 換行寬度（超過會嘗試換行）。
  - 例：`100` 表示超過 100 字元會嘗試斷行。

- `bracketSpacing`: 物件的大括號是否要空格。
  - `true`：`{ a: 1 }`。
  - `false`：`{a:1}`。

- `jsxSingleQuote`: JSX 裡是否使用單引號（`'`）而非雙引號（`"`）。
  - 只影響 JSX 屬性字串的引號樣式。

- `endOfLine`: 換行符號類型（`lf`、`crlf`、`auto`）。
  - `lf`：Linux/macOS 樣式；Windows 若需要可改 `crlf`。

- `quoteProps`: 物件屬性何時要加引號。常見值：`as-needed`（預設）、`consistent`、`preserve`。

- `trailingComma`: Trailing comma 行為。
  - `es5`：只在物件與陣列等 ES5 支援位置加逗號。
  - `all`：也會在多行函式參數/呼叫後加逗號（你目前設定為 `all`）。
  - 注意：即使設定 `all`，JSX 標籤的屬性列表仍然不會有逗號，因為 JSX 語法不允許屬性間使用逗號。

示範（如果你想在設定檔內加註解）可以改用 `prettierrc.js` 或 `prettierrc.cjs`：

```js
// .prettierrc.cjs
module.exports = {
    // 不要在語句尾加分號
    semi: false,
    // 使用單引號
    singleQuote: true,
    tabWidth: 4,
    printWidth: 100,
    bracketSpacing: true,
    jsxSingleQuote: true,
    endOfLine: 'lf',
    quoteProps: 'as-needed',
    // trailingComma 設為 'all' 會影響物件/陣列/函式參數等，但不影響 JSX 屬性
    trailingComma: 'all',
}
```

---

## 二、`.prettierignore`

用法：列出不想被 Prettier 處理的檔案或目錄（類似 `.gitignore`）。

範例（專案中已有的基本項目）：
- `node_modules`、`dist`、`build` 等產物資料夾
- `*.log`、`.env` 類的機密/環境檔

重點：如果 `.prettierignore` 沒有把 `.jsx` 或 `src/` 加入，那 Prettier 會處理 `src` 底下的 `.jsx` 檔案。

---

## 三、`package.json` 的 scripts（你專案新增的兩個 script）

範例：

```json
"scripts": {
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
  "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
}
```

說明：
- `format`：會實際寫回（`--write`）格式化後的結果到檔案。執行後會改檔。
- `format:check`：只是檢查格式是否符合 Prettier，找到違規會以非 0 程式碼結束（方便 CI 使用）。

如何執行（在專案目錄）：

```powershell
pnpm run format:check
pnpm run format
```

或使用 `npm`/`npx`：

```powershell
npx prettier --check "src/**/*.{js,jsx,ts,tsx,json,css,md}"
npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"
```

---

## 四、VS Code 設定（使用者或工作區）

重要設定說明：

- `editor.defaultFormatter`: 指定預設的格式化工具（例如 `esbenp.prettier-vscode`）。可在全域使用者設定或工作區 `.vscode/settings.json` 指定。
- `editor.formatOnSave`: 儲存時自動格式化（若開啟則在儲存時呼叫預設 formatter）。

建議的 workspace-level 範例（放在 `.vscode/settings.json`，會覆蓋使用者設定）:

```jsonc
{
  // 強制在此工作區使用 Prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 儲存時自動格式化
  "editor.formatOnSave": true,
  // 對特定語言也可以指定
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

注意：你使用者層級的 `settings.json` 已經把 Prettier 設為 `javascript` / `javascriptreact` 的預設格式器，且 `editor.formatOnSave` 為 `true`。

---

## 五、常見問答（快速摘要）

- 為什麼 JSX 屬性不會出現逗號？
  - 因為 JSX 標籤屬性不是以逗號分隔的語法，加入逗號會產生語法錯誤，Prettier 因此不會在該處加入逗號。

- 我可以看到 trailing comma 嗎？在哪些情況會出現？
  - 在物件字面量、陣列、多行 import/export、以及多行函式參數/呼叫（當 `trailingComma: "all"` 時）會出現。

- 我想強制團隊都使用相同設定，建議做法？
  - 把 `.prettierrc` 放在 repo root（已存在），在 repo 加入 `.vscode/settings.json` 做 workspace 層級設定，並在 CI workflow 中執行 `pnpm run format:check` 或 `npx prettier --check`。

---

如果你要我把上述的 workspace `.vscode/settings.json` 自動加入到 repo（或把 `.prettierrc` 轉成可註解的 `prettierrc.cjs` 並保留原檔），我可以立刻為你執行並驗證變更。
