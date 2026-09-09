# 課堂名詞檔案庫 — Course Term Archive

從手寫筆記 PDF 整理出來的專有名詞檔案庫。純靜態 HTML，**不需要網路、不需要伺服器**，
直接用瀏覽器打開 `index.html` 就能用。

## 檔案結構

每個科目一個資料夾，該科目的所有東西（頁面、名詞資料、原始筆記 PDF）都放在裡面。
`index.html` 是入口，不歸類到任何科目；`assets/` 是所有科目共用的樣式與引擎。

```
index.html                      ← 入口網站：選擇科目（不分類）
assets/
  glossary.css                  ← 共用樣式（淺色／深色自動切換）
  glossary.js                   ← 共用引擎：搜尋、篩選、渲染、矩陣排版
calculus/                       ← 微積分
  calculus.html                 ← 檔案庫頁面
  calculus.js                   ← 名詞資料
  微積分9_8.pdf                  ← 原始筆記
linear-algebra/                 ← 線性代數
  linear-algebra.html
  linear-algebra.js
  線性代數9_7-9_8.pdf
README.md
```

頁尾的「來源」會直接連到同資料夾裡的那份 PDF，可以隨時點開對照原筆記。

## 怎麼用

- **一則名詞一條橫向方塊**：左邊是英文名詞＋中譯＋章節標籤，右邊是定義、補充、
  範例與圖示。方塊底色與頁面底色分開，一眼就看得出邊界。
- **搜尋**：上方搜尋欄。中文、英文、符號都能打，會同時比對名詞、中譯、定義、
  補充說明與範例。多個關鍵字用空白隔開＝必須全部命中。
- **快速鍵**：按 `/` 跳到搜尋欄，按 `Esc` 清空。
- **篩選晶片**：依章節（9/7 ch1.1、9/8 ch1.1…）篩選，或切「只看筆記原文 / 只看補充」。
- **深層連結**：`calculus/calculus.html#even-function` 會直接跳到並highlight該張方塊。
- **深淺色**：右上角 `Theme` 切換，選擇會記在瀏覽器裡。

## 標「補充」是什麼意思

綠色的 **補充** 標籤代表**這一則不在原始筆記裡**，是為了把定義補完整而加上的
（例如 `codomain 對應域`、`Gaussian elimination 高斯消去法`）。
沒有標籤的就是筆記上真的有寫的名詞，而且每則都放了一段「筆記原文」範例方便對照。
個別條目裡若有修正筆記的地方（例如筆記把 even function 寫成「偏函數」、
第 3 種列運算漏寫「加到另一列」），都寫在該則的 notes 中。

---

# 之後要加東西

## 1. 新增一個名詞

打開該科目資料夾裡的資料檔（例如 `calculus/calculus.js`），在 `terms: [ … ]`
陣列裡複製一筆物件改內容就好。只有 `id` / `term` / `zh` 是必填：

```js
{
  id:     'chain-rule',              // 唯一，會變成 #網址錨點，用小寫連字號
  term:   'Chain rule',              // 英文名詞（標題）
  abbr:   'd/dx',                    // 選填：縮寫或符號
  zh:     '連鎖律',                   // 中譯（必填）
  zhAlt:  '鏈鎖法則',                 // 選填：另一種譯法
  aliases:['composite', '複合'],      // 選填：額外的搜尋關鍵字
  tags:   ['9/15 ch3.6', 'derivative'], // 第一個 tag 會變成章節晶片
  def:    'English definition. 可以用 <strong>HTML</strong>。',
  defZh:  '中文說明。',
  notes:  ['補充說明一', '補充說明二'],   // 選填：條列
  examples:[                          // 選填：範例區塊
    { label: '筆記原文', html: '<p>(f∘g)&prime; = f&prime;(g(x))·g&prime;(x)</p>' }
  ],
  figure: { svg:'<svg viewBox="0 0 340 120">…</svg>', caption:'圖說' }, // 選填
  added:  true                        // 若不在筆記裡就加這行，會顯示「補充」標籤
}
```

### 排版小工具

`def` / `defZh` / `notes` / `examples[].html` 都吃 HTML，另外有兩個 helper：

```js
var M   = GLOSSARY.M;    // 矩陣
var SYS = GLOSSARY.SYS;  // 大括號方程組

M([[1,2],[3,4]])                    // 一般矩陣
M([[1,1,1],[2,3,1]], [[2],[3]])     // 增廣矩陣（第二個參數在豎線右邊）
SYS(['x + y = 2', 'x - y = 0'])     // 方程組
```

**注意**：`SYS()` 的每一列是 `<span>`。要放在 `<p>` 裡沒問題，但不要自己改成 `<div>` —
`<div>` 會把 `<p>` 提前關掉，大括號就空掉了。

圖片一律用 **inline SVG**（不要外部圖檔），並用 `currentColor` 與 `var(--accent)` 上色，
這樣深淺色模式都會自動跟著變。

## 2. 新增一個科目

假設要加「物理」：

1. **開資料夾** `physics/`，把該科目的筆記 PDF 丟進去。

2. **複製** `calculus/calculus.js` → `physics/physics.js`，改掉最上面這幾個欄位：

   ```js
   id:         'physics',                  // 唯一
   name:       'Physics',                  // 英文科目名
   nameZh:     '物理',                      // 中文科目名
   page:       'physics/physics.html',     // 相對於 index.html 的路徑
   hue:        150,                        // 主色色相 0–360（微積分 24、線性代數 232）
   source:     'physics9_20.pdf（9/20 ch1）', // 頁尾顯示的來源文字
   sourceFile: 'physics9_20.pdf',          // 同資料夾裡的 PDF，頁尾會連過去
   blurb:      '一句話介紹，顯示在入口網站的卡片上。',
   terms:      [ … ]                       // 換成自己的名詞
   ```

3. **複製** `calculus/calculus.html` → `physics/physics.html`，改裡面兩行
   （順便改 `<title>`）。`../assets/…` 那兩行不用動：

   ```html
   <script src="physics.js"></script>
   <script>GLOSSARY.mountSubject('physics');</script>
   ```

4. **在 `index.html` 加一行**，入口網站就會自動長出這張卡片、並算好名詞數量與章節：

   ```html
   <script src="physics/physics.js"></script>
   ```

就這樣 — 不用改 `assets/` 裡的任何東西。

### 路徑規則

科目頁固定住在自己的資料夾裡（比 `index.html` 深一層），所以：

- 科目頁引用共用檔案用 `../assets/…`
- 科目頁引用自己的資料檔與 PDF 用檔名即可（同資料夾）
- `index.html` 引用科目資料檔用 `<科目資料夾>/<檔名>.js`
- 科目設定裡的 `page` 是「相對於 index.html」的路徑
