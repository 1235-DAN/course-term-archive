/* ==========================================================================
   data/linear-algebra.js — 線性代數 term data
   Source notes: 線性代數9_7-9_8.pdf  (9/7 + 9/8, ch 1.1)
   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own. Everything else is straight from
   the notes, with the definitions written out in full.
   ========================================================================== */

(function () {
  var M = GLOSSARY.M;
  var SYS = GLOSSARY.SYS;

  /* the running example used throughout the 9/8 notes */
  var EX_SYS = SYS([
    'x&#8321; +&nbsp; x&#8322; +&nbsp; x&#8323; =&nbsp; 2',
    '2x&#8321; + 3x&#8322; +&nbsp; x&#8323; =&nbsp; 3',
    'x&#8321; &minus;&nbsp; x&#8322; &minus; 2x&#8323; = &minus;6'
  ]);
  var EX_COEF = M([
    [1, 1, 1],
    [2, 3, 1],
    [1, '&minus;1', '&minus;2']
  ]);
  var EX_AUG = M(
    [
      [1, 1, 1],
      [2, 3, 1],
      [1, '&minus;1', '&minus;2']
    ],
    [[2], [3], ['&minus;6']]
  );

  GLOSSARY.register({
    id: 'linear-algebra',
    name: 'Linear Algebra',
    nameZh: '線性代數',
    page: 'linear-algebra/linear-algebra.html', // relative to index.html
    hue: 232, // indigo
    source: '線性代數9_7-9_8.pdf（9/7、9/8 ch 1.1）',
    sourceFile: '線性代數9_7-9_8.pdf', // sits in this same folder; linked in the footer
    blurb: '線性方程組的語言：方程式的零件、矩陣的零件與大小、增廣矩陣與基本列運算。',

    terms: [
      /* ============================================ 9/7 — equations */
      {
        id: 'linear-equation',
        term: 'Linear equation',
        zh: '線性方程式',
        zhAlt: '一次方程式',
        aliases: ['linear', '一次'],
        tags: ['9/7 ch1.1', 'equations'],
        def:
          'An equation in which every variable appears to the first power only, ' +
          'multiplied by a constant and added together: ' +
          '<span class="mono">a&#8321;x&#8321; + a&#8322;x&#8322; + &hellip; + a<sub>n</sub>x<sub>n</sub> = b</span>. ' +
          'No products of variables, no powers, no roots, no trig.',
        defZh:
          '每個變數都只出現一次方、各自乘上常數再相加的方程式：' +
          'a&#8321;x&#8321; + a&#8322;x&#8322; + … + a<sub>n</sub>x<sub>n</sub> = b。' +
          '不能有變數相乘、次方、根號或三角函數。',
        notes: [
          '<strong>補充</strong>：所以 xy = 1、x² + y = 3、&radic;x = 2 都<em>不是</em>線性方程式。'
        ],
        examples: [
          {
            label: '筆記原文的例子',
            html:
              '<p>2x + 3y + 5z = 5</p>' +
              '<p>variables 變數：x, y, z</p>' +
              '<p>coefficients 係數：2, 3, 5</p>' +
              '<p>constant term 常數項：5</p>'
          }
        ]
      },

      {
        id: 'variable',
        term: 'Variable',
        zh: '變數',
        aliases: ['unknown', '未知數', 'x y z'],
        tags: ['9/7 ch1.1', 'equations'],
        def: 'The unknown quantities being solved for — the letters in the equation.',
        defZh: '方程式中要求解的未知量，也就是式子裡的那些字母。',
        notes: [
          '變數多的時候慣用下標寫法 x&#8321;, x&#8322;, &hellip;, x<sub>n</sub>，比 x, y, z 好推廣。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; variables：x, y, z</p>' }
        ]
      },

      {
        id: 'coefficient',
        term: 'Coefficient',
        zh: '係數',
        aliases: ['multiplier', '倍數'],
        tags: ['9/7 ch1.1', 'equations'],
        def: 'The constant multiplying each variable.',
        defZh: '乘在每個變數前面的那個常數。',
        notes: [
          '<strong>補充</strong>：沒寫出來的係數是 1，減號代表 &minus;1（x &minus; y 的係數是 1 和 &minus;1）。',
          '把所有係數依原位置排成矩陣，就是 <a href="#coefficient-matrix">係數矩陣</a>。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; coefficients：2, 3, 5</p>' }
        ]
      },

      {
        id: 'constant-term',
        term: 'Constant term',
        zh: '常數項',
        aliases: ['right hand side', 'rhs', '等號右邊'],
        tags: ['9/7 ch1.1', 'equations'],
        def:
          'The number standing alone on the right-hand side of the equation — the part ' +
          'with no variable attached.',
        defZh: '等號右邊那個獨立的數字，沒有搭配任何變數的部分。',
        notes: [
          '在 <a href="#augmented-matrix">增廣矩陣</a> 裡，常數項就是分隔線右邊那一行。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; constant term：5</p>' }
        ]
      },

      {
        id: 'equation',
        term: 'Equation',
        zh: '方程式',
        zhAlt: '等式',
        aliases: ['equals', '等號'],
        tags: ['9/7 ch1.1', 'equations'],
        def:
          'A statement that two expressions are equal — the whole line, left side, ' +
          'equals sign and right side together.',
        defZh: '宣稱兩個式子相等的敘述；左式、等號、右式合起來整條才叫一個方程式。',
        examples: [
          { label: '筆記原文', html: '<p>equations：2x + 3y + 5 = 5　（等式）</p>' }
        ]
      },

      {
        id: 'system-of-linear-equations',
        term: 'System of linear equations',
        zh: '線性方程組',
        zhAlt: '聯立方程組',
        aliases: ['system', '聯立', 'simultaneous'],
        tags: ['9/7 ch1.1', 'equations'],
        def:
          'Several linear equations in the same variables, to be satisfied ' +
          '<strong>all at once</strong>. Solving the system means finding the values that ' +
          'work in every equation simultaneously.',
        defZh:
          '好幾條共用同一組變數的線性方程式，要<strong>同時</strong>成立。' +
          '解方程組就是找出讓每一條式子都成立的那組值。',
        notes: [
          '筆記寫法：<span class="mono">system = many linear equations</span>。',
          '<strong>補充</strong>：m 條方程式、n 個變數的方程組稱為 m &times; n 系統。'
        ],
        examples: [
          {
            label: '筆記原文的一般式',
            html:
              SYS([
                'a&#8321;x + b&#8321;y + c&#8321;z = d&#8321;',
                'a&#8322;x + b&#8322;y + c&#8322;z = d&#8322;',
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8942;',
                'a<sub>n</sub>x + b<sub>n</sub>y + c<sub>n</sub>z = d<sub>n</sub>'
              ])
          }
        ]
      },

      /* ============================================ 9/7 — notation */
      {
        id: 'notation-convention',
        term: 'Notation convention',
        zh: '符號慣例',
        aliases: ['bold', 'lowercase', 'uppercase', '粗體', '大寫', '小寫', '符號'],
        tags: ['9/7 ch1.1', 'notation'],
        def:
          'How this course distinguishes the three kinds of object by typeface: ' +
          '<strong>bold lowercase</strong> = vector, <strong>light lowercase</strong> = scalar, ' +
          '<strong>light uppercase</strong> = matrix.',
        defZh:
          '這門課用字體區分三種東西：<strong>粗體小寫</strong>是向量、' +
          '<strong>細體小寫</strong>是純量、<strong>細體大寫</strong>是矩陣。',
        notes: [
          '手寫時粗體不好表現，通常改成加箭頭（v&#8407;）或加底線（<u>v</u>）。'
        ],
        examples: [
          {
            label: '筆記原文',
            html:
              '<p>粗體小寫 &nbsp;&rarr;&nbsp; vector（向量）：<strong>u</strong>, v&#8407;, u&#8407;</p>' +
              '<p>細體小寫 &nbsp;&rarr;&nbsp; scalar（純量）：a, k, &lambda;</p>' +
              '<p>細體大寫 &nbsp;&rarr;&nbsp; matrix（矩陣）：A, B, I</p>'
          }
        ]
      },

      {
        id: 'vector',
        term: 'Vector',
        zh: '向量',
        aliases: ['column vector', 'row vector', '行向量', '列向量'],
        tags: ['9/7 ch1.1', 'notation'],
        def:
          'An ordered list of numbers, written either as a <strong>column</strong> or as a ' +
          '<strong>row</strong>. It is the same data either way, but the two shapes behave ' +
          'differently in matrix multiplication.',
        defZh:
          '一串有順序的數，可以寫成<strong>直的</strong>（column）或<strong>橫的</strong>（row）。' +
          '資料一樣，但在矩陣乘法裡兩種形狀的行為不同。',
        notes: [
          '一個 n 維向量其實就是 n&times;1 或 1&times;n 的矩陣 &mdash; 向量是矩陣的特例。'
        ],
        examples: [
          {
            label: '筆記原文：同一個向量的兩種寫法',
            html:
              '<p>column ' +
              M([[1], [3], ['&minus;2']]) +
              '&nbsp;&nbsp;&nbsp; row ' +
              M([[1, 3, '&minus;2']]) +
              '</p>'
          }
        ]
      },

      {
        id: 'scalar',
        term: 'Scalar',
        zh: '純量',
        aliases: ['number', '單一數值'],
        tags: ['9/7 ch1.1', 'notation'],
        def:
          'A single number (as opposed to a vector or a matrix). Scalars are what you ' +
          'multiply vectors and matrices <em>by</em>.',
        defZh: '單一一個數（相對於向量與矩陣）。純量是用來「乘」向量或矩陣的那個東西。',
        notes: ['本課的純量就是實數 &#8477;（有些課本會用複數 &#8450;）。']
      },

      {
        id: 'matrix',
        term: 'Matrix',
        zh: '矩陣',
        aliases: ['matrices', 'array', '陣列'],
        tags: ['9/7 ch1.1', 'notation'],
        def:
          'A rectangular array of numbers arranged in rows and columns. It is the ' +
          'bookkeeping device that lets us handle a whole system of equations at once.',
        defZh:
          '把數字排成橫列與直行的長方形陣列。它是讓我們一次處理整個方程組的記帳工具。',
        notes: ['複數是 matrices（不是 matrixes）。'],
        examples: [
          {
            label: '一個 3&times;3 矩陣',
            html: EX_COEF
          }
        ]
      },

      /* ============================================ 9/7 — solutions */
      {
        id: 'type-of-solution',
        term: 'Types of solution',
        zh: '解的型態',
        aliases: [
          'unique solution',
          'no solution',
          'infinite solutions',
          '唯一解',
          '無解',
          '無限多解'
        ],
        tags: ['9/7 ch1.1', 'solutions'],
        def:
          'A system of linear equations has exactly one of three outcomes: ' +
          '<strong>1. a unique solution</strong>, <strong>2. no solution</strong>, or ' +
          '<strong>3. infinitely many solutions</strong>. There is no fourth possibility — ' +
          'a linear system can never have, say, exactly two solutions.',
        defZh:
          '線性方程組只會有三種結果：<strong>1. 唯一解</strong>、<strong>2. 無解</strong>、' +
          '<strong>3. 無限多解</strong>。沒有第四種 — 線性方程組不可能剛好有兩組解。',
        notes: [
          '兩個變數時可以用直線想像：相交一點 &rarr; 唯一解；平行 &rarr; 無解；重合 &rarr; 無限多解。',
          '<strong>補充</strong>：有解（型態 1、3）叫 <a href="#consistent">consistent 相容</a>，無解（型態 2）叫 inconsistent 不相容。'
        ],
        examples: [
          {
            label: '筆記原文',
            html:
              '<p>1. unique solution</p><p>2. no solution</p><p>3. infinite solutions</p>'
          }
        ],
        figure: {
          caption: '兩變數的幾何圖像：相交／平行／重合',
          svg:
            '<svg viewBox="0 0 340 128" role="img" aria-label="三種解的幾何圖像">' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".45">' +
            '<path d="M14 92 H100 M24 14 V100"/>' +
            '<path d="M127 92 H213 M137 14 V100"/>' +
            '<path d="M240 92 H326 M250 14 V100"/></g>' +
            '<g fill="none" stroke="var(--accent)" stroke-width="2.1">' +
            '<path d="M20 86 L96 24"/><path d="M20 30 L96 88"/>' +
            '<path d="M133 84 L209 34"/><path d="M133 60 L209 10"/>' +
            '<path d="M246 86 L322 26"/></g>' +
            '<path d="M246 86 L322 26" fill="none" stroke="currentColor" stroke-width="2.4" ' +
            'stroke-dasharray="6 5"/>' +
            '<circle cx="58" cy="56" r="4" fill="var(--accent)"/>' +
            '<g fill="currentColor" font-size="10" font-family="sans-serif" text-anchor="middle">' +
            '<text x="57" y="116">unique 唯一解</text>' +
            '<text x="170" y="116">none 無解</text>' +
            '<text x="283" y="116">infinite 無限多</text></g></svg>'
        }
      },

      {
        id: 'consistent',
        term: 'Consistent / inconsistent system',
        zh: '相容／不相容方程組',
        aliases: ['有解', '無解', 'solvable'],
        tags: ['9/7 ch1.1', 'solutions'],
        added: true,
        def:
          'A system is <strong>consistent</strong> if it has at least one solution, and ' +
          '<strong>inconsistent</strong> if it has none.',
        defZh: '至少有一組解就叫<strong>相容</strong>（consistent）；完全沒有解就叫<strong>不相容</strong>。',
        notes: [
          '為什麼補這個：筆記列了三種解的型態，但沒給這組把「型態 1、3」和「型態 2」分開的標準名稱。',
          '消去後出現 0 = 非零數（例如 0 = 5）就是不相容的訊號。'
        ]
      },

      {
        id: 'solution-set',
        term: 'Solution set',
        zh: '解集合',
        aliases: ['solution', '解'],
        tags: ['9/7 ch1.1', 'solutions'],
        added: true,
        def:
          'The set of <em>all</em> ordered tuples that satisfy every equation in the system. ' +
          '"Solving the system" means describing this set, not just finding one member of it.',
        defZh:
          '所有能同時滿足方程組每一條式子的有序組所成的集合。' +
          '「解方程組」是把這個集合描述清楚，不只是找到其中一組。',
        notes: [
          '型態 1 的解集合是一個點，型態 2 是空集合 &empty;，型態 3 是一條線／一個平面（用參數表示）。'
        ]
      },

      /* ============================================ 9/8 — matrix parts */
      {
        id: 'element',
        term: 'Element',
        zh: '元素',
        zhAlt: '元／entry',
        aliases: ['entry', 'a_ij', '項'],
        tags: ['9/8 ch1.1', 'matrix parts'],
        def: 'A single number sitting inside the matrix.',
        defZh: '矩陣裡面的單一個數字。',
        notes: [
          '<strong>補充</strong>：位置用兩個下標標記，a<sub>ij</sub> 表示第 i 列（row）、第 j 行（column）的元素 &mdash; 永遠先列後行。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>element = the number in the matrix</p>' },
          {
            label: '定位',
            html:
              '<p>在 ' + EX_COEF + ' 中，a<sub>23</sub> = 1（第 2 列第 3 行）</p>'
          }
        ]
      },

      {
        id: 'row',
        term: 'Row',
        zh: '列',
        zhAlt: '橫列',
        aliases: ['horizontal', '橫的', '水平'],
        tags: ['9/8 ch1.1', 'matrix parts'],
        def: 'A <strong>horizontal</strong> line of numbers in the matrix.',
        defZh: '矩陣裡<strong>橫向</strong>的一排數字。',
        notes: [
          '<strong>注意中文用語差異</strong>：台灣課本 row = 「列」、column = 「行」；' +
          '中國課本恰好相反（row = 行）。讀不同來源的資料時要確認一下。',
          '在方程組裡，一個 row 就對應一條方程式 &mdash; 所以「列運算」等於「對整條方程式做運算」。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>row = horizontal line of number</p>' }
        ],
        figure: {
          caption: '橫的是 row（列），直的是 column（行）',
          svg:
            '<svg viewBox="0 0 320 130" role="img" aria-label="矩陣的列與行">' +
            '<g fill="var(--accent-soft)"><rect x="60" y="56" width="152" height="24" rx="3"/>' +
            '<rect x="140" y="20" width="34" height="96" rx="3"/></g>' +
            '<g fill="none" stroke="currentColor" stroke-width="1.5">' +
            '<path d="M52 18 h-8 v100 h8"/><path d="M220 18 h8 v100 h8"/></g>' +
            '<g fill="currentColor" font-family="monospace" font-size="15" text-anchor="middle">' +
            '<text x="80" y="42">1</text><text x="118" y="42">1</text>' +
            '<text x="157" y="42">1</text><text x="196" y="42">2</text>' +
            '<text x="80" y="74">2</text><text x="118" y="74">3</text>' +
            '<text x="157" y="74">1</text><text x="196" y="74">3</text>' +
            '<text x="80" y="106">1</text><text x="118" y="106">-1</text>' +
            '<text x="157" y="106">-2</text><text x="196" y="106">-6</text></g>' +
            '<g fill="var(--accent)" font-size="10.5" font-family="sans-serif">' +
            '<text x="244" y="72">row 列</text>' +
            '<text x="157" y="14" text-anchor="middle">column 行</text></g></svg>'
        }
      },

      {
        id: 'column',
        term: 'Column',
        zh: '行',
        zhAlt: '直行',
        aliases: ['vertical', '直的', '垂直', 'vetical'],
        tags: ['9/8 ch1.1', 'matrix parts'],
        def: 'A <strong>vertical</strong> line of numbers in the matrix.',
        defZh: '矩陣裡<strong>直向</strong>的一排數字。',
        notes: [
          '在方程組裡，一個 column 對應一個變數（最後一行則是常數項）。',
          '同上：台灣 column = 「行」，中國 column = 「列」，用語剛好相反。'
        ],
        examples: [
          { label: '筆記原文', html: '<p>column = vertical line of number</p>' }
        ]
      },

      {
        id: 'submatrix',
        term: 'Submatrix',
        zh: '子矩陣',
        aliases: ['sub matrix', '部分矩陣'],
        tags: ['9/8 ch1.1', 'matrix parts'],
        def:
          'The matrix left over after deleting some rows and/or some columns from a ' +
          'matrix, keeping the remaining entries in their original relative positions.',
        defZh:
          '從一個矩陣中刪掉某些列和／或某些行之後剩下的矩陣，其餘元素保持原本的相對位置。',
        notes: [
          '<a href="#coefficient-matrix">係數矩陣</a>就是<a href="#augmented-matrix">增廣矩陣</a>刪掉最後一行得到的子矩陣。'
        ],
        examples: [
          {
            label: '刪掉第 3 列與第 3 行',
            html:
              '<p>' +
              EX_COEF +
              '&nbsp;&rarr;&nbsp;' +
              M([
                [1, 1],
                [2, 3]
              ]) +
              '</p>'
          }
        ]
      },

      /* ============================================ 9/8 — size & shapes */
      {
        id: 'size-of-matrix',
        term: 'Size of a matrix',
        zh: '矩陣的大小',
        zhAlt: '階數／維度',
        aliases: ['dimension', 'm x n', '2x3', '幾乘幾'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        def:
          'Written <span class="mono">m &times; n</span>, meaning <strong>m rows by ' +
          'n columns</strong> — always rows first.',
        defZh: '寫成 m &times; n，意思是「m 列 &times; n 行」 — 永遠先講列（橫）再講行（直）。',
        notes: ['記法：先橫後直、先 row 後 column，和 a<sub>ij</sub> 的下標順序一致。'],
        examples: [
          {
            label: '筆記原文',
            html:
              '<p>2&times;3 matrix ' +
              M([
                [2, 0, 1],
                [3, 2, 1]
              ]) +
              '（2 列 3 行）</p>'
          }
        ]
      },

      {
        id: 'square-matrix',
        term: 'Square matrix',
        zh: '方陣',
        zhAlt: '方形矩陣',
        aliases: ['n x n', '正方'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        def:
          'A matrix with the same number of rows as columns — an ' +
          '<span class="mono">n &times; n</span> matrix.',
        defZh: '列數與行數相同的矩陣，也就是 n &times; n 的矩陣。',
        notes: [
          '<strong>補充</strong>：只有方陣才談得上行列式（determinant）、反矩陣（inverse）與特徵值 &mdash; 後面章節會一直用到。'
        ],
        examples: [
          {
            label: '筆記原文',
            html: '<p>2&times;2 matrix ' + M([['&#9633;', '&#9633;'], ['&#9633;', '&#9633;']]) + ' &rarr; square matrix</p>'
          }
        ]
      },

      {
        id: 'row-matrix',
        term: 'Row matrix',
        zh: '列矩陣',
        zhAlt: '列向量',
        aliases: ['row vector', '1 x n'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        def: 'A matrix with only one row — size <span class="mono">1 &times; n</span>.',
        defZh: '只有一列（一橫排）的矩陣，大小為 1 &times; n。',
        examples: [
          {
            label: '筆記原文',
            html: '<p>1&times;3 matrix ' + M([[1, 0, 0]]) + ' &rarr; row matrix</p>'
          }
        ]
      },

      {
        id: 'column-matrix',
        term: 'Column matrix',
        zh: '行矩陣',
        zhAlt: '行向量',
        aliases: ['column vector', 'n x 1'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        def: 'A matrix with only one column — size <span class="mono">m &times; 1</span>.',
        defZh: '只有一行（一直排）的矩陣，大小為 m &times; 1。',
        examples: [
          {
            label: '筆記原文',
            html: '<p>3&times;1 matrix ' + M([[3], [1], [5]]) + ' &rarr; column matrix</p>'
          }
        ]
      },

      {
        id: 'identity-matrix',
        term: 'Identity matrix',
        abbr: 'I<sub>n</sub>',
        zh: '單位矩陣',
        aliases: ['I', 'unit matrix', '對角線 1'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        def:
          'The square matrix with <strong>1 on the main diagonal and 0 everywhere else</strong>. ' +
          'It is the "do nothing" matrix: <span class="mono">AI = IA = A</span>.',
        defZh:
          '主對角線上全是 1、其餘位置全是 0 的方陣。它是矩陣乘法裡的「不動」元素：AI = IA = A。',
        notes: [
          '<strong>補充</strong>：角色相當於數字裡的 1，所以叫 identity（單位／恆等）。',
          '<strong>補充</strong>：n 決定大小，寫成 I&#8322;、I&#8323;；主對角線是從左上到右下那條。'
        ],
        examples: [
          {
            label: '筆記原文',
            html:
              '<p>I&#8322; = ' +
              M([
                [1, 0],
                [0, 1]
              ]) +
              '&nbsp;&nbsp; I&#8323; = ' +
              M([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
              ]) +
              '</p>'
          }
        ]
      },

      {
        id: 'zero-matrix',
        term: 'Zero matrix',
        abbr: 'O',
        zh: '零矩陣',
        aliases: ['null matrix', '全零'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        added: true,
        def: 'A matrix all of whose entries are 0.',
        defZh: '所有元素都是 0 的矩陣。',
        notes: [
          '為什麼補這個：它是加法裡的「不動」元素（A + O = A），和單位矩陣在乘法裡的角色相對應。'
        ]
      },

      {
        id: 'diagonal-matrix',
        term: 'Diagonal matrix',
        zh: '對角矩陣',
        aliases: ['main diagonal', '主對角線'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        added: true,
        def:
          'A square matrix whose off-diagonal entries are all 0; only the main diagonal ' +
          'may be non-zero.',
        defZh: '主對角線以外全是 0 的方陣；只有主對角線上可以有非零的數。',
        notes: ['<a href="#identity-matrix">單位矩陣</a>是對角線全為 1 的對角矩陣，屬於它的特例。'],
        examples: [
          {
            label: '例',
            html:
              M([
                [2, 0, 0],
                [0, '&minus;1', 0],
                [0, 0, 5]
              ])
          }
        ]
      },

      {
        id: 'transpose',
        term: 'Transpose',
        abbr: 'A&#7488;',
        zh: '轉置矩陣',
        aliases: ['A transpose', '轉置'],
        tags: ['9/8 ch1.1', 'matrix shapes'],
        added: true,
        def:
          'The matrix obtained by turning rows into columns: the (i, j) entry of ' +
          '<span class="mono">A&#7488;</span> is the (j, i) entry of A. An ' +
          '<span class="mono">m &times; n</span> matrix transposes to ' +
          '<span class="mono">n &times; m</span>.',
        defZh:
          '把列變成行得到的矩陣：A&#7488; 的 (i, j) 位置就是 A 的 (j, i) 位置。' +
          'm &times; n 轉置後變成 n &times; m。',
        notes: [
          '為什麼補這個：筆記用 [1 3 &minus;2]&#7488; 表示直的向量，那個上標 T 就是轉置。'
        ],
        examples: [
          {
            label: '行列互換',
            html:
              '<p>' +
              M([
                [1, 2, 3],
                [4, 5, 6]
              ]) +
              '&#7488; = ' +
              M([
                [1, 4],
                [2, 5],
                [3, 6]
              ]) +
              '</p>'
          }
        ]
      },

      /* ============================================ 9/8 — matrix form */
      {
        id: 'coefficient-matrix',
        term: 'Matrix of coefficients',
        zh: '係數矩陣',
        aliases: ['coefficient matrix', 'A', '係數'],
        tags: ['9/8 ch1.1', 'matrix form'],
        def:
          'The matrix holding only the coefficients of the system, each in its original ' +
          'row-and-column position. The constant terms are left out.',
        defZh:
          '只放方程組係數的矩陣，每個係數保持原本的列、行位置；常數項不放進來。',
        notes: [
          '<strong>補充</strong>：缺項的係數要補 0 &mdash; 位置對不上就整個矩陣的意思都錯了。'
        ],
        examples: [
          {
            label: '筆記原文的系統',
            html: '<p>' + EX_SYS + '</p>'
          },
          {
            label: '&rarr; in matrix of coefficient',
            html: '<p>' + EX_COEF + '</p>'
          }
        ]
      },

      {
        id: 'augmented-matrix',
        term: 'Augmented matrix',
        zh: '增廣矩陣',
        zhAlt: '擴增矩陣',
        aliases: ['augmented', 'bar', '分隔線', '常數項'],
        tags: ['9/8 ch1.1', 'matrix form'],
        def:
          'The coefficient matrix with the column of constant terms attached on the right, ' +
          'usually separated by a vertical bar. It carries the <em>complete</em> information ' +
          'of the system, which is why row operations are performed on it.',
        defZh:
          '在係數矩陣右邊接上常數項那一行（通常用一條豎線分隔）。' +
          '它帶有方程組的<em>完整</em>資訊，所以列運算都是對它做的。',
        notes: [
          '一條方程式 &harr; 一列（row）；一個變數 &harr; 一行（column）；豎線右邊 &harr; 等號右邊。',
          'm 條方程式、n 個變數的增廣矩陣大小是 m &times; (n+1)。'
        ],
        examples: [
          {
            label: '&rarr; in matrix of augmented（筆記原文）',
            html: '<p>' + EX_AUG + '</p>'
          }
        ],
        figure: {
          caption: '豎線左邊是係數，右邊是常數項；每一列就是一條方程式',
          svg:
            '<svg viewBox="0 0 330 150" role="img" aria-label="增廣矩陣的結構">' +
            '<g fill="var(--accent-soft)"><rect x="236" y="34" width="34" height="84" rx="3"/></g>' +
            '<g fill="none" stroke="currentColor" stroke-width="1.5">' +
            '<path d="M62 30 h-9 v92 h9"/><path d="M278 30 h9 v92 h9"/></g>' +
            '<path d="M223 36 V116" stroke="currentColor" stroke-width="1.6" opacity=".8"/>' +
            '<g fill="currentColor" font-family="monospace" font-size="15" text-anchor="middle">' +
            '<text x="90" y="56">1</text><text x="143" y="56">1</text><text x="196" y="56">1</text>' +
            '<text x="253" y="56">2</text>' +
            '<text x="90" y="86">2</text><text x="143" y="86">3</text><text x="196" y="86">1</text>' +
            '<text x="253" y="86">3</text>' +
            '<text x="90" y="116">1</text><text x="143" y="116">-1</text><text x="196" y="116">-2</text>' +
            '<text x="253" y="116">-6</text></g>' +
            '<g font-size="10.5" font-family="sans-serif" text-anchor="middle">' +
            '<text x="143" y="22" fill="currentColor">coefficients 係數</text>' +
            '<text x="253" y="22" fill="var(--accent)">constants 常數</text>' +
            '<text x="90" y="140" fill="currentColor">x&#8321;</text>' +
            '<text x="143" y="140" fill="currentColor">x&#8322;</text>' +
            '<text x="196" y="140" fill="currentColor">x&#8323;</text></g></svg>'
        }
      },

      /* ============================================ 9/8 — row ops */
      {
        id: 'row-equivalent',
        term: 'Row equivalent',
        abbr: '~',
        zh: '列等價',
        aliases: ['equivalent', '等價', 'same solution'],
        tags: ['9/8 ch1.1', 'row operations'],
        def:
          'Two augmented matrices are <strong>row equivalent</strong> when one can be turned ' +
          'into the other by elementary row operations. They look different but describe ' +
          'systems with <strong>exactly the same solution set</strong>. The symbol is ' +
          '<span class="mono">~</span>.',
        defZh:
          '兩個增廣矩陣如果能透過基本列運算互相轉換，就稱為<strong>列等價</strong>。' +
          '它們長得不一樣，但代表的方程組有<strong>完全相同的解集合</strong>。符號是 <span class="mono">~</span>。',
        notes: [
          '筆記原文：<span class="mono">Different augmented matrix but same solution.</span>',
          '這正是消去法能用的理由 &mdash; 化簡的每一步都不改變答案，只把答案變得更明顯。'
        ],
        examples: [
          {
            label: '同一個系統，兩種長相',
            html:
              '<p>' +
              M([[1, 1], [2, 3]], [[2], [3]]) +
              ' ~ ' +
              M([[1, 1], [0, 1]], [[2], ['&minus;1']]) +
              '</p><p>解都是 x&#8321; = 3, x&#8322; = &minus;1</p>'
          }
        ]
      },

      {
        id: 'elementary-row-operation',
        term: 'Elementary Row Operation',
        abbr: 'ERO',
        zh: '基本列運算',
        aliases: ['interchange', 'multiply', 'add', '對調', '相加', '列運算'],
        tags: ['9/8 ch1.1', 'row operations'],
        def:
          'The three legal moves on the rows of an augmented matrix. Each one is reversible, ' +
          'so none of them changes the solution set: ' +
          '<strong>1. Interchange</strong> two rows. ' +
          '<strong>2. Multiply</strong> a row by a non-zero scalar. ' +
          '<strong>3. Add</strong> a multiple of one row to another row.',
        defZh:
          '對增廣矩陣的列可以做的三種合法操作。每一種都可逆，所以都不會改變解集合：' +
          '<strong>1. 對調</strong>兩列。<strong>2. 乘上</strong>一個非零純量。' +
          '<strong>3. 把某一列的倍數加到另一列</strong>。',
        notes: [
          '筆記第 3 條寫成「Add a multiple of the element of one row」，完整說法是' +
          '<strong>加到「另一」列</strong>（add a multiple of one row <em>to another row</em>）&mdash; ' +
          '少了受方就不知道結果放哪裡。',
          '<strong>補充</strong>：第 2 條的倍數<strong>必須非零</strong>。乘 0 會把一整條方程式抹掉，變成不可逆、可能多出假的解。',
          '<strong>補充</strong>：只能對「列」做，不能對「行」做 &mdash; 一列是一條方程式，一行是一個變數，換行等於偷換變數。'
        ],
        examples: [
          {
            label: '筆記原文',
            html:
              '<p>&#9312; Interchange</p>' +
              '<p>&#9313; Multiply</p>' +
              '<p>&#9314; Add a multiple of the element of one row</p>'
          },
          {
            label: '三種操作的記法',
            html:
              '<p>&#9312; R&#8321; &harr; R&#8322;</p>' +
              '<p>&#9313; kR&#8321; &rarr; R&#8321;　(k &ne; 0)</p>' +
              '<p>&#9314; R&#8322; + kR&#8321; &rarr; R&#8322;</p>'
          },
          {
            label: '第 3 種：用 R&#8321; 把 R&#8322; 的第一項清成 0',
            html:
              '<p>' +
              M([[1, 1], [2, 3]], [[2], [3]]) +
              '&nbsp;&nbsp;R&#8322; &minus; 2R&#8321;&nbsp;&nbsp;' +
              M([[1, 1], [0, 1]], [[2], ['&minus;1']]) +
              '</p>'
          }
        ]
      },

      {
        id: 'gaussian-elimination',
        term: 'Gaussian elimination',
        zh: '高斯消去法',
        aliases: ['elimination', '消去法', 'gauss'],
        tags: ['9/8 ch1.1', 'row operations'],
        added: true,
        def:
          'The procedure of applying elementary row operations, column by column, to drive ' +
          'the augmented matrix into a staircase shape from which the solution can be read ' +
          'off directly.',
        defZh:
          '有系統地一行一行套用基本列運算，把增廣矩陣化成階梯狀，' +
          '讓解可以直接讀出來的做法。',
        notes: [
          '為什麼補這個：筆記給了三種 ERO 這些「工具」，但還沒說要拿它們去做什麼 &mdash; 目標就是這個。',
          '做法：由左到右，用每一行的主元把它下方的元素全部清成 0。'
        ]
      },

      {
        id: 'leading-entry',
        term: 'Leading entry (pivot)',
        zh: '主元',
        zhAlt: '領先元／樞紐',
        aliases: ['pivot', 'leading one', '首項'],
        tags: ['9/8 ch1.1', 'row operations'],
        added: true,
        def:
          'The first non-zero entry of a row, reading left to right. Pivots are the anchors ' +
          'that elimination uses to clear out the entries below them.',
        defZh:
          '一列從左往右數第一個非零的元素。消去法就是靠主元把它下方的元素清成 0。',
        notes: [
          '主元的個數（rank，秩）決定了方程組是唯一解還是無限多解 &mdash; 之後的章節會回到這裡。'
        ]
      },

      {
        id: 'row-echelon-form',
        term: 'Row echelon form',
        abbr: 'REF',
        zh: '列梯形形式',
        zhAlt: '階梯形',
        aliases: ['echelon', '梯形', 'staircase'],
        tags: ['9/8 ch1.1', 'row operations'],
        added: true,
        def:
          'The staircase shape that elimination aims for: all-zero rows sit at the bottom, ' +
          'and each pivot lies strictly to the right of the pivot in the row above it.',
        defZh:
          '消去法要達到的階梯形狀：全零的列都在最底下，而且每一列的主元都嚴格在上一列主元的右邊。',
        notes: [
          '為什麼補這個：這是 ch1.1 三種 ERO 的直接終點，也是下一節的主題。',
          '再進一步把主元化成 1、並清掉主元<em>上方</em>的元素，就是簡化列梯形 RREF。'
        ],
        examples: [
          {
            label: '階梯形（&#9646; 為主元）',
            html:
              M([
                ['&#9646;', '&lowast;', '&lowast;'],
                [0, '&#9646;', '&lowast;'],
                [0, 0, '&#9646;']
              ])
          }
        ]
      },

      {
        id: 'homogeneous-system',
        term: 'Homogeneous system',
        zh: '齊次方程組',
        aliases: ['homogeneous', 'trivial solution', '零解', '齊次'],
        tags: ['9/8 ch1.1', 'solutions'],
        added: true,
        def:
          'A system in which every constant term is 0. It is always consistent, because ' +
          'setting all variables to 0 (the <strong>trivial solution</strong>) always works — ' +
          'so it has either exactly one solution or infinitely many, never none.',
        defZh:
          '所有常數項都是 0 的方程組。它一定有解，因為全部變數取 0（<strong>零解</strong>）永遠成立 &mdash; ' +
          '所以只會是唯一解或無限多解，絕不會無解。',
        notes: [
          '為什麼補這個：它把「三種解型態」直接砍掉一種，是後面判斷解結構最常用的特例。'
        ],
        examples: [
          {
            label: '增廣矩陣的最後一行全為 0',
            html:
              M([[1, 1, 1], [2, 3, 1]], [[0], [0]])
          }
        ]
      }
    ]
  });
})();
