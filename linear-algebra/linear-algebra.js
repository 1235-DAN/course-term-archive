/* ==========================================================================
   linear-algebra.js — 線性代數 term data
   Source notes: 線性代數9_7-9_8.pdf (ch1.1), 線性代數9_9.pdf (ch1.2),
                 線性代數9_14.pdf (ch1.2 homogeneous systems; ch1.3 vectors in Rⁿ;
                                   ch1.4 subsets and subspaces)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.
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

  /* An arrow from (x1, y1) to (x2, y2). The head is a polygon rather than an
     SVG marker, so a figure can appear on several cards without id clashes. */
  function arrow(x1, y1, x2, y2, color, dash) {
    var a = Math.atan2(y2 - y1, x2 - x1),
      bx = x2 - 9 * Math.cos(a),
      by = y2 - 9 * Math.sin(a),
      nx = 4 * Math.sin(a),
      ny = 4 * Math.cos(a);
    var p = function (x, y) { return x.toFixed(1) + ',' + y.toFixed(1); };
    return (
      '<path d="M' + x1 + ' ' + y1 + ' L' + bx.toFixed(1) + ' ' + by.toFixed(1) + '" stroke="' +
      color + '" stroke-width="2"' + (dash ? ' stroke-dasharray="4 3"' : '') + '/>' +
      '<polygon points="' + p(x2, y2) + ' ' + p(bx + nx, by - ny) + ' ' + p(bx - nx, by + ny) +
      '" fill="' + color + '"/>'
    );
  }

  /* light x/y axes crossing at (ox, oy) */
  function axes(ox, oy, x0, x1, y0, y1) {
    return (
      '<g stroke="currentColor" stroke-width="1.1" opacity=".4">' +
      '<path d="M' + x0 + ' ' + oy + ' H' + x1 + '"/><path d="M' + ox + ' ' + y0 + ' V' + y1 + '"/></g>'
    );
  }

  var INK = 'currentColor',
    ACC = 'var(--accent)',
    LBL = '<g font-family="sans-serif" font-size="11" fill="currentColor" font-style="italic">';

  /* O→A is a position vector; P→Q is a vector with its own initial point */
  var POSITION_FIG =
    '<svg viewBox="0 0 300 150" role="img" aria-label="a position vector and a vector from P to Q">' +
    axes(50, 120, 30, 285, 138, 12) +
    arrow(50, 120, 200, 50, ACC) +
    arrow(150, 95, 265, 55, INK) +
    '<g fill="currentColor"><circle cx="50" cy="120" r="3.2"/><circle cx="150" cy="95" r="3.2"/></g>' +
    LBL +
    '<text x="42" y="134" text-anchor="end" font-style="normal">O</text>' +
    '<text x="206" y="46" font-style="normal">A</text>' +
    '<text x="144" y="108" text-anchor="end" font-style="normal">P</text>' +
    '<text x="270" y="52" font-style="normal">Q</text>' +
    '<text x="104" y="84" fill="var(--accent)" font-style="normal">OA</text></g></svg>';

  GLOSSARY.register({
    id: 'linear-algebra',
    name: 'Linear Algebra',
    nameZh: '線性代數',
    page: 'linear-algebra/linear-algebra.html', // relative to index.html
    hue: 232, // indigo
    // every source PDF sits in this same folder; the footer links to each one
    sources: [
      { file: '線性代數9_7-9_8.pdf', label: '線性代數9_7-9_8.pdf（ch1.1）' },
      { file: '線性代數9_9.pdf', label: '線性代數9_9.pdf（ch1.2）' },
      { file: '線性代數9_14.pdf', label: '線性代數9_14.pdf（ch1.2、ch1.3、ch1.4）' }
    ],
    blurb:
      '線性方程組的語言：方程式的零件、矩陣的零件與大小、增廣矩陣與基本列運算、' +
      '消去法的終點 — 簡化列梯形、齊次方程組，以及向量空間 ℝⁿ 的向量運算、線性組合與子空間。',

    terms: [
      /* ============================================ 9/7 — equations */
      {
        id: 'linear-equation',
        term: 'Linear equation',
        zh: '線性方程式',
        zhAlt: '一次方程式',
        aliases: ['linear', '一次'],
        tags: ['ch1.1', 'equations'],
        def:
          'An equation in which every variable appears to the first power only, ' +
          'multiplied by a constant and added together: ' +
          '<span class="mono">a&#8321;x&#8321; + a&#8322;x&#8322; + &hellip; + a<sub>n</sub>x<sub>n</sub> = b</span>. ' +
          'No products of variables, no powers, no roots, no trig.',
        notes: [
          'So <span class="mono">xy = 1</span>, <span class="mono">x² + y = 3</span> and ' +
            '<span class="mono">&radic;x = 2</span> are all <em>not</em> linear.'
        ],
        defZh:
          '每個變數都只出現一次方、各自乘上常數再相加的方程式：' +
          'a&#8321;x&#8321; + a&#8322;x&#8322; + … + a<sub>n</sub>x<sub>n</sub> = b。' +
          '不能有變數相乘、次方、根號或三角函數。',
        notesZh: ['所以 xy = 1、x² + y = 3、&radic;x = 2 都<em>不是</em>線性方程式。'],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>2x + 3y + 5z = 5</p>' +
              '<p>variables: x, y, z</p>' +
              '<p>coefficients: 2, 3, 5</p>' +
              '<p>constant term: 5</p>'
          }
        ]
      },

      {
        id: 'variable',
        term: 'Variable',
        zh: '變數',
        aliases: ['unknown', '未知數', 'x y z'],
        tags: ['ch1.1', 'equations'],
        def: 'The unknown quantities being solved for — the letters in the equation.',
        notes: [
          'With many variables the subscript form x&#8321;, x&#8322;, …, x<sub>n</sub> is ' +
            'preferred over x, y, z, because it generalises.'
        ],
        defZh: '方程式中要求解的未知量，也就是式子裡的那些字母。',
        notesZh: [
          '變數多的時候慣用下標寫法 x&#8321;, x&#8322;, …, x<sub>n</sub>，比 x, y, z 好推廣。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; variables: x, y, z</p>'
          }
        ]
      },

      {
        id: 'coefficient',
        term: 'Coefficient',
        zh: '係數',
        aliases: ['multiplier', '倍數'],
        tags: ['ch1.1', 'equations'],
        def: 'The constant multiplying each variable.',
        notes: [
          'An unwritten coefficient is 1, and a minus sign means &minus;1 — in ' +
            '<span class="mono">x &minus; y</span> the coefficients are 1 and &minus;1.',
          'Laying every coefficient out in its original position gives the ' +
            '<a href="#coefficient-matrix">matrix of coefficients</a>.'
        ],
        defZh: '乘在每個變數前面的那個常數。',
        notesZh: [
          '沒寫出來的係數是 1，減號代表 &minus;1（x &minus; y 的係數是 1 和 &minus;1）。',
          '把所有係數依原位置排成矩陣，就是<a href="#coefficient-matrix">係數矩陣</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; coefficients: 2, 3, 5</p>'
          }
        ]
      },

      {
        id: 'constant-term',
        term: 'Constant term',
        zh: '常數項',
        aliases: ['right hand side', 'rhs', '等號右邊'],
        tags: ['ch1.1', 'equations'],
        def:
          'The number standing alone on the right-hand side of the equation — the part ' +
          'with no variable attached.',
        notes: [
          'In an <a href="#augmented-matrix">augmented matrix</a> the constant terms are ' +
            'exactly the column to the right of the bar.'
        ],
        defZh: '等號右邊那個獨立的數字，沒有搭配任何變數的部分。',
        notesZh: [
          '在<a href="#augmented-matrix">增廣矩陣</a>裡，常數項就是分隔線右邊那一行。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>2x + 3y + 5z = 5 &nbsp;&rarr;&nbsp; constant term: 5</p>'
          }
        ]
      },

      {
        id: 'equation',
        term: 'Equation',
        zh: '方程式',
        zhAlt: '等式',
        aliases: ['equals', '等號'],
        tags: ['ch1.1', 'equations'],
        def:
          'A statement that two expressions are equal — the whole line, left side, ' +
          'equals sign and right side together.',
        notes: [
          'The notes write the example as 2x + 3y + 5 = 5, dropping the z; it is the same ' +
            'equation as on the line above, <span class="mono">2x + 3y + 5z = 5</span>.'
        ],
        defZh: '宣稱兩個式子相等的敘述；左式、等號、右式合起來整條才叫一個方程式。',
        notesZh: [
          '筆記的例子寫成 2x + 3y + 5 = 5，漏了 z；它和上一行是同一條式子：2x + 3y + 5z = 5。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>equations: 2x + 3y + 5 = 5</p><p>&rarr; should read 2x + 3y + 5z = 5</p>' }
        ]
      },

      {
        id: 'system-of-linear-equations',
        term: 'System of linear equations',
        zh: '線性方程組',
        zhAlt: '聯立方程組',
        aliases: ['system', '聯立', 'simultaneous'],
        tags: ['ch1.1', 'equations'],
        def:
          'Several linear equations in the same variables, to be satisfied ' +
          '<strong>all at once</strong>. Solving the system means finding the values that ' +
          'work in every equation simultaneously.',
        notes: [
          'The notes put it as <span class="mono">system = many linear equations</span>.',
          'A system of m equations in n variables is called an m &times; n system.'
        ],
        defZh:
          '好幾條共用同一組變數的線性方程式，要<strong>同時</strong>成立。' +
          '解方程組就是找出讓每一條式子都成立的那組值。',
        notesZh: [
          '筆記寫法：<span class="mono">system = many linear equations</span>。',
          'm 條方程式、n 個變數的方程組稱為 m &times; n 系統。'
        ],
        examples: [
          {
            label: 'The general form, from the notes',
            html: SYS([
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
        tags: ['ch1.1', 'notation'],
        def:
          'How this course distinguishes the three kinds of object by typeface: ' +
          '<strong>bold lowercase</strong> = vector, <strong>light lowercase</strong> = scalar, ' +
          '<strong>light uppercase</strong> = matrix.',
        notes: [
          'Bold is hard to write by hand, so an arrow (v&#8407;) or an underline ' +
            '(<u>v</u>) is normally used instead.'
        ],
        defZh:
          '這門課用字體區分三種東西：<strong>粗體小寫</strong>是向量、' +
          '<strong>細體小寫</strong>是純量、<strong>細體大寫</strong>是矩陣。',
        notesZh: ['手寫時粗體不好表現，通常改成加箭頭（v&#8407;）或加底線（<u>v</u>）。'],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>bold lowercase &nbsp;&rarr;&nbsp; vector: <strong>u</strong>, v&#8407;, u&#8407;</p>' +
              '<p>light lowercase &nbsp;&rarr;&nbsp; scalar: a, k, &lambda;</p>' +
              '<p>light uppercase &nbsp;&rarr;&nbsp; matrix: A, B, I</p>'
          }
        ]
      },

      {
        id: 'vector',
        term: 'Vector',
        zh: '向量',
        aliases: ['column vector', 'row vector', '行向量', '列向量'],
        tags: ['ch1.1', 'notation'],
        def:
          'An ordered list of numbers, written either as a <strong>column</strong> or as a ' +
          '<strong>row</strong>. It is the same data either way, but the two shapes behave ' +
          'differently in matrix multiplication.',
        notes: [
          'An n-dimensional vector is just an n&times;1 or 1&times;n matrix — a vector is a ' +
            'special case of a matrix.'
        ],
        defZh:
          '一串有順序的數，可以寫成<strong>直的</strong>（column）或<strong>橫的</strong>（row）。' +
          '資料一樣，但在矩陣乘法裡兩種形狀的行為不同。',
        notesZh: [
          '一個 n 維向量其實就是 n&times;1 或 1&times;n 的矩陣 &mdash; 向量是矩陣的特例。'
        ],
        examples: [
          {
            label: 'From the notes — one vector, two shapes',
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
        tags: ['ch1.1', 'notation'],
        def:
          'A single number (as opposed to a vector or a matrix). Scalars are what you ' +
          'multiply vectors and matrices <em>by</em>.',
        notes: [
          'In this course the scalars are the real numbers &#8477; (some texts use the ' +
            'complex numbers &#8450;).'
        ],
        defZh: '單一一個數（相對於向量與矩陣）。純量是用來「乘」向量或矩陣的那個東西。',
        notesZh: ['本課的純量就是實數 &#8477;（有些課本會用複數 &#8450;）。']
      },

      {
        id: 'matrix',
        term: 'Matrix',
        zh: '矩陣',
        aliases: ['matrices', 'array', '陣列'],
        tags: ['ch1.1', 'notation'],
        def:
          'A rectangular array of numbers arranged in rows and columns. It is the ' +
          'bookkeeping device that lets us handle a whole system of equations at once.',
        notes: ['The plural is <em>matrices</em>, not "matrixes".'],
        defZh: '把數字排成橫列與直行的長方形陣列。它是讓我們一次處理整個方程組的記帳工具。',
        notesZh: ['複數是 matrices（不是 matrixes）。'],
        examples: [{ label: 'A 3×3 matrix', html: EX_COEF }]
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
        tags: ['ch1.1', 'solutions'],
        def:
          'A system of linear equations has exactly one of three outcomes: ' +
          '<strong>1. a unique solution</strong>, <strong>2. no solution</strong>, or ' +
          '<strong>3. infinitely many solutions</strong>. There is no fourth possibility — ' +
          'a linear system can never have, say, exactly two solutions.',
        notes: [
          'With two variables, picture lines: crossing at a point &rarr; unique; ' +
            'parallel &rarr; none; coincident &rarr; infinitely many.',
          'Cases 1 and 3 are called <a href="#consistent">consistent</a>; case 2 is inconsistent.'
        ],
        defZh:
          '線性方程組只會有三種結果：<strong>1. 唯一解</strong>、<strong>2. 無解</strong>、' +
          '<strong>3. 無限多解</strong>。沒有第四種 &mdash; 線性方程組不可能剛好有兩組解。',
        notesZh: [
          '兩個變數時可以用直線想像：相交一點 &rarr; 唯一解；平行 &rarr; 無解；重合 &rarr; 無限多解。',
          '有解（型態 1、3）叫 <a href="#consistent">consistent 相容</a>，無解（型態 2）叫 inconsistent 不相容。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>1. unique solution</p><p>2. no solution</p><p>3. infinite solutions</p>'
          }
        ],
        figure: {
          caption: 'Two variables: crossing / parallel / coincident',
          svg:
            '<svg viewBox="0 0 340 128" role="img" aria-label="three solution types">' +
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
            '<text x="57" y="116">unique</text>' +
            '<text x="170" y="116">none</text>' +
            '<text x="283" y="116">infinite</text></g></svg>'
        }
      },

      {
        id: 'consistent',
        term: 'Consistent / inconsistent system',
        zh: '相容／不相容方程組',
        aliases: ['有解', '無解', 'solvable'],
        tags: ['ch1.1', 'solutions'],
        added: true,
        def:
          'A system is <strong>consistent</strong> if it has at least one solution, and ' +
          '<strong>inconsistent</strong> if it has none.',
        notes: [
          'Why this is here: the notes list the three solution types but give no name for ' +
            'the split between "types 1 and 3" and "type 2".',
          'Reaching <span class="mono">0 = (non-zero)</span> during elimination — say ' +
            '<span class="mono">0 = 5</span> — is the signal that a system is inconsistent.'
        ],
        defZh:
          '至少有一組解就叫<strong>相容</strong>（consistent）；完全沒有解就叫<strong>不相容</strong>。',
        notesZh: [
          '為什麼補這個：筆記列了三種解的型態，但沒給這組把「型態 1、3」和「型態 2」分開的標準名稱。',
          '消去後出現 0 = 非零數（例如 0 = 5）就是不相容的訊號。'
        ]
      },

      {
        id: 'solution-set',
        term: 'Solution set',
        zh: '解集合',
        aliases: ['solution', '解'],
        tags: ['ch1.1', 'solutions'],
        added: true,
        def:
          'The set of <em>all</em> ordered tuples that satisfy every equation in the system. ' +
          '"Solving the system" means describing this set, not just finding one member of it.',
        notes: [
          'Type 1 gives a single point, type 2 the empty set &empty;, type 3 a line or plane ' +
            'described with a parameter.'
        ],
        defZh:
          '所有能同時滿足方程組每一條式子的有序組所成的集合。' +
          '「解方程組」是把這個集合描述清楚，不只是找到其中一組。',
        notesZh: [
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
        tags: ['ch1.1', 'matrix parts'],
        def: 'A single number sitting inside the matrix.',
        notes: [
          'Positions carry two subscripts: <span class="mono">a<sub>ij</sub></span> is the ' +
            'element in row i and column j — row first, always.'
        ],
        defZh: '矩陣裡面的單一個數字。',
        notesZh: [
          '位置用兩個下標標記，a<sub>ij</sub> 表示第 i 列（row）、第 j 行（column）的元素 &mdash; 永遠先列後行。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>element = the number in the matrix</p>' },
          {
            label: 'Locating an element',
            html: '<p>in ' + EX_COEF + ' , a<sub>23</sub> = 1 (row 2, column 3)</p>'
          }
        ]
      },

      {
        id: 'row',
        term: 'Row',
        zh: '列',
        zhAlt: '橫列',
        aliases: ['horizontal', '橫的', '水平'],
        tags: ['ch1.1', 'matrix parts'],
        def: 'A <strong>horizontal</strong> line of numbers in the matrix.',
        notes: [
          'In a system, one row is one equation — which is why "row operations" means ' +
            '"operations on a whole equation".',
          '<strong>Careful with the Chinese</strong>: Taiwanese texts use 列 for row and ' +
            '行 for column; mainland texts swap them. Check which convention a source uses.'
        ],
        defZh: '矩陣裡<strong>橫向</strong>的一排數字。',
        notesZh: [
          '在方程組裡，一個 row 就對應一條方程式 &mdash; 所以「列運算」等於「對整條方程式做運算」。',
          '<strong>注意中文用語差異</strong>：台灣課本 row =「列」、column =「行」；' +
            '中國課本恰好相反（row = 行）。讀不同來源的資料時要確認一下。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>row = horizontal line of number</p>' }
        ],
        figure: {
          caption: 'Horizontal is a row, vertical is a column',
          svg:
            '<svg viewBox="0 0 320 130" role="img" aria-label="rows and columns">' +
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
            '<text x="244" y="72">row</text>' +
            '<text x="157" y="14" text-anchor="middle">column</text></g></svg>'
        }
      },

      {
        id: 'column',
        term: 'Column',
        zh: '行',
        zhAlt: '直行',
        aliases: ['vertical', '直的', '垂直', 'vetical'],
        tags: ['ch1.1', 'matrix parts'],
        def: 'A <strong>vertical</strong> line of numbers in the matrix.',
        notes: [
          'In a system, one column corresponds to one variable (the last column being the ' +
            'constant terms).',
          'Same warning as for row: Taiwanese 行 = column, mainland 行 = row.'
        ],
        defZh: '矩陣裡<strong>直向</strong>的一排數字。',
        notesZh: [
          '在方程組裡，一個 column 對應一個變數（最後一行則是常數項）。',
          '同上：台灣 column =「行」，中國 column =「列」，用語剛好相反。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>column = vertical line of number</p>' }
        ]
      },

      {
        id: 'submatrix',
        term: 'Submatrix',
        zh: '子矩陣',
        aliases: ['sub matrix', '部分矩陣'],
        tags: ['ch1.1', 'matrix parts'],
        def:
          'The matrix left over after deleting some rows and/or some columns from a ' +
          'matrix, keeping the remaining entries in their original relative positions.',
        notes: [
          'The <a href="#coefficient-matrix">coefficient matrix</a> is the submatrix you get ' +
            'by deleting the last column of the <a href="#augmented-matrix">augmented matrix</a>.'
        ],
        defZh:
          '從一個矩陣中刪掉某些列和／或某些行之後剩下的矩陣，其餘元素保持原本的相對位置。',
        notesZh: [
          '<a href="#coefficient-matrix">係數矩陣</a>就是<a href="#augmented-matrix">增廣矩陣</a>刪掉最後一行得到的子矩陣。'
        ],
        examples: [
          {
            label: 'Delete row 3 and column 3',
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
        tags: ['ch1.1', 'matrix shapes'],
        def:
          'Written <span class="mono">m &times; n</span>, meaning <strong>m rows by ' +
          'n columns</strong> — always rows first.',
        notes: [
          'The order matches the subscripts in <span class="mono">a<sub>ij</sub></span>: ' +
            'row before column, every time.'
        ],
        defZh: '寫成 m &times; n，意思是「m 列 &times; n 行」 &mdash; 永遠先講列（橫）再講行（直）。',
        notesZh: ['記法：先橫後直、先 row 後 column，和 a<sub>ij</sub> 的下標順序一致。'],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>2&times;3 matrix ' +
              M([
                [2, 0, 1],
                [3, 2, 1]
              ]) +
              ' (2 rows, 3 columns)</p>'
          }
        ]
      },

      {
        id: 'square-matrix',
        term: 'Square matrix',
        zh: '方陣',
        zhAlt: '方形矩陣',
        aliases: ['n x n', '正方'],
        tags: ['ch1.1', 'matrix shapes'],
        def:
          'A matrix with the same number of rows as columns — an ' +
          '<span class="mono">n &times; n</span> matrix.',
        notes: [
          'Only square matrices have a determinant, an inverse or eigenvalues — all of which ' +
            'later chapters lean on constantly.'
        ],
        defZh: '列數與行數相同的矩陣，也就是 n &times; n 的矩陣。',
        notesZh: [
          '只有方陣才談得上行列式（determinant）、反矩陣（inverse）與特徵值 &mdash; 後面章節會一直用到。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>2&times;2 matrix ' +
              M([
                ['&#9633;', '&#9633;'],
                ['&#9633;', '&#9633;']
              ]) +
              ' &rarr; square matrix</p>'
          }
        ]
      },

      {
        id: 'row-matrix',
        term: 'Row matrix',
        zh: '列矩陣',
        zhAlt: '列向量',
        aliases: ['row vector', '1 x n'],
        tags: ['ch1.1', 'matrix shapes'],
        def: 'A matrix with only one row — size <span class="mono">1 &times; n</span>.',
        defZh: '只有一列（一橫排）的矩陣，大小為 1 &times; n。',
        examples: [
          {
            label: 'From the notes',
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
        tags: ['ch1.1', 'matrix shapes'],
        def: 'A matrix with only one column — size <span class="mono">m &times; 1</span>.',
        defZh: '只有一行（一直排）的矩陣，大小為 m &times; 1。',
        examples: [
          {
            label: 'From the notes',
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
        tags: ['ch1.1', 'matrix shapes'],
        def:
          'The square matrix with <strong>1 on the main diagonal and 0 everywhere else</strong>. ' +
          'It is the "do nothing" matrix: <span class="mono">AI = IA = A</span>.',
        notes: [
          'It plays the role that the number 1 plays for ordinary multiplication — hence ' +
            '<em>identity</em>.',
          'The n fixes the size, written I&#8322;, I&#8323;. The main diagonal runs from the ' +
            'top-left corner to the bottom-right.'
        ],
        defZh:
          '主對角線上全是 1、其餘位置全是 0 的方陣。它是矩陣乘法裡的「不動」元素：AI = IA = A。',
        notesZh: [
          '角色相當於數字裡的 1，所以叫 identity（單位／恆等）。',
          'n 決定大小，寫成 I&#8322;、I&#8323;；主對角線是從左上到右下那條。'
        ],
        examples: [
          {
            label: 'From the notes',
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
        tags: ['ch1.1', 'matrix shapes'],
        added: true,
        def: 'A matrix all of whose entries are 0.',
        notes: [
          'Why this is here: it is the "do nothing" element for addition ' +
            '(<span class="mono">A + O = A</span>), mirroring what the identity matrix does ' +
            'for multiplication.'
        ],
        defZh: '所有元素都是 0 的矩陣。',
        notesZh: [
          '為什麼補這個：它是加法裡的「不動」元素（A + O = A），和單位矩陣在乘法裡的角色相對應。'
        ]
      },

      {
        id: 'diagonal-matrix',
        term: 'Diagonal matrix',
        zh: '對角矩陣',
        aliases: ['main diagonal', '主對角線'],
        tags: ['ch1.1', 'matrix shapes'],
        added: true,
        def:
          'A square matrix whose off-diagonal entries are all 0; only the main diagonal ' +
          'may be non-zero.',
        notes: [
          'The <a href="#identity-matrix">identity matrix</a> is the special case where every ' +
            'diagonal entry is 1.'
        ],
        defZh: '主對角線以外全是 0 的方陣；只有主對角線上可以有非零的數。',
        notesZh: ['<a href="#identity-matrix">單位矩陣</a>是對角線全為 1 的對角矩陣，屬於它的特例。'],
        examples: [
          {
            label: 'Example',
            html: M([
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
        tags: ['ch1.1', 'matrix shapes'],
        added: true,
        def:
          'The matrix obtained by turning rows into columns: the (i, j) entry of ' +
          '<span class="mono">A&#7488;</span> is the (j, i) entry of A. An ' +
          '<span class="mono">m &times; n</span> matrix transposes to ' +
          '<span class="mono">n &times; m</span>.',
        notes: [
          'Why this is here: the notes write a column vector as ' +
            '<span class="mono">[1 3 &minus;2]&#7488;</span> — that superscript T is the transpose.'
        ],
        defZh:
          '把列變成行得到的矩陣：A&#7488; 的 (i, j) 位置就是 A 的 (j, i) 位置。' +
          'm &times; n 轉置後變成 n &times; m。',
        notesZh: [
          '為什麼補這個：筆記用 [1 3 &minus;2]&#7488; 表示直的向量，那個上標 T 就是轉置。'
        ],
        examples: [
          {
            label: 'Rows become columns',
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
        tags: ['ch1.1', 'matrix form'],
        def:
          'The matrix holding only the coefficients of the system, each in its original ' +
          'row-and-column position. The constant terms are left out.',
        notes: [
          'A missing term needs a 0 in its place — if the positions do not line up, the ' +
            'whole matrix means something else.'
        ],
        defZh: '只放方程組係數的矩陣，每個係數保持原本的列、行位置；常數項不放進來。',
        notesZh: ['缺項的係數要補 0 &mdash; 位置對不上就整個矩陣的意思都錯了。'],
        examples: [
          { label: 'The system, from the notes', html: '<p>' + EX_SYS + '</p>' },
          { label: '&rarr; in matrix of coefficient', html: '<p>' + EX_COEF + '</p>' }
        ]
      },

      {
        id: 'augmented-matrix',
        term: 'Augmented matrix',
        zh: '增廣矩陣',
        zhAlt: '擴增矩陣',
        aliases: ['augmented', 'bar', '分隔線', '常數項'],
        tags: ['ch1.1', 'matrix form'],
        def:
          'The coefficient matrix with the column of constant terms attached on the right, ' +
          'usually separated by a vertical bar. It carries the <em>complete</em> information ' +
          'of the system, which is why row operations are performed on it.',
        notes: [
          'One equation &harr; one row; one variable &harr; one column; right of the bar ' +
            '&harr; right of the equals sign.',
          'For m equations in n variables the augmented matrix is m &times; (n+1).'
        ],
        defZh:
          '在係數矩陣右邊接上常數項那一行（通常用一條豎線分隔）。' +
          '它帶有方程組的<em>完整</em>資訊，所以列運算都是對它做的。',
        notesZh: [
          '一條方程式 &harr; 一列（row）；一個變數 &harr; 一行（column）；豎線右邊 &harr; 等號右邊。',
          'm 條方程式、n 個變數的增廣矩陣大小是 m &times; (n+1)。'
        ],
        examples: [
          { label: '&rarr; in matrix of augmented (from the notes)', html: '<p>' + EX_AUG + '</p>' }
        ],
        figure: {
          caption: 'Coefficients left of the bar, constants right; each row is one equation',
          svg:
            '<svg viewBox="0 0 330 150" role="img" aria-label="augmented matrix structure">' +
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
            '<text x="143" y="22" fill="currentColor">coefficients</text>' +
            '<text x="253" y="22" fill="var(--accent)">constants</text>' +
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
        tags: ['ch1.1', 'row operations'],
        def:
          'Two augmented matrices are <strong>row equivalent</strong> when one can be turned ' +
          'into the other by elementary row operations. They look different but describe ' +
          'systems with <strong>exactly the same solution set</strong>. The symbol is ' +
          '<span class="mono">~</span>.',
        notes: [
          'From the notes: <span class="mono">Different augmented matrix but same solution.</span>',
          'This is exactly why elimination is allowed — every step leaves the answer alone ' +
            'and only makes it easier to see.'
        ],
        defZh:
          '兩個增廣矩陣如果能透過基本列運算互相轉換，就稱為<strong>列等價</strong>。' +
          '它們長得不一樣，但代表的方程組有<strong>完全相同的解集合</strong>。符號是 <span class="mono">~</span>。',
        notesZh: [
          '筆記原文：<span class="mono">Different augmented matrix but same solution.</span>',
          '這正是消去法能用的理由 &mdash; 化簡的每一步都不改變答案，只把答案變得更明顯。'
        ],
        examples: [
          {
            label: 'One system, two appearances',
            html:
              '<p>' +
              M([[1, 1], [2, 3]], [[2], [3]]) +
              ' ~ ' +
              M([[1, 1], [0, 1]], [[2], ['&minus;1']]) +
              '</p><p>both give x&#8321; = 3, x&#8322; = &minus;1</p>'
          }
        ]
      },

      {
        id: 'elementary-row-operation',
        term: 'Elementary Row Operation',
        abbr: 'ERO',
        zh: '基本列運算',
        aliases: ['interchange', 'multiply', 'add', '對調', '相加', '列運算'],
        tags: ['ch1.1', 'row operations'],
        def:
          'The three legal moves on the rows of an augmented matrix. Each one is reversible, ' +
          'so none of them changes the solution set: ' +
          '<strong>1. Interchange</strong> two rows. ' +
          '<strong>2. Multiply</strong> a row by a non-zero scalar. ' +
          '<strong>3. Add</strong> a multiple of one row to another row.',
        notes: [
          'The notes write the third as "Add a multiple of the element of one row"; the full ' +
            'statement is <strong>to <em>another</em> row</strong> — without naming the ' +
            'receiving row there is nowhere to put the result.',
          'In the second operation the multiplier <strong>must be non-zero</strong>. ' +
            'Multiplying by 0 wipes out a whole equation, which is irreversible and can ' +
            'invent solutions that were never there.',
          'It works on <em>rows</em> only, never columns — a row is an equation, a column is a ' +
            'variable, so swapping columns silently swaps the variables.'
        ],
        defZh:
          '對增廣矩陣的列可以做的三種合法操作。每一種都可逆，所以都不會改變解集合：' +
          '<strong>1. 對調</strong>兩列。<strong>2. 乘上</strong>一個非零純量。' +
          '<strong>3. 把某一列的倍數加到另一列</strong>。',
        notesZh: [
          '筆記第 3 條寫成「Add a multiple of the element of one row」，完整說法是' +
            '<strong>加到「另一」列</strong>（add a multiple of one row <em>to another row</em>）&mdash; ' +
            '少了受方就不知道結果放哪裡。',
          '第 2 條的倍數<strong>必須非零</strong>。乘 0 會把一整條方程式抹掉，變成不可逆、可能多出假的解。',
          '只能對「列」做，不能對「行」做 &mdash; 一列是一條方程式，一行是一個變數，換行等於偷換變數。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>&#9312; Interchange</p>' +
              '<p>&#9313; Multiply</p>' +
              '<p>&#9314; Add a multiple of the element of one row</p>'
          },
          {
            label: 'Standard shorthand',
            html:
              '<p>&#9312; R&#8321; &harr; R&#8322;</p>' +
              '<p>&#9313; kR&#8321; &rarr; R&#8321;&nbsp;&nbsp;(k &ne; 0)</p>' +
              '<p>&#9314; R&#8322; + kR&#8321; &rarr; R&#8322;</p>'
          },
          {
            label: 'Operation 3: clearing the first entry of R&#8322;',
            html:
              '<p>' +
              M([[1, 1], [2, 3]], [[2], [3]]) +
              '&nbsp;&nbsp;R&#8322; &minus; 2R&#8321;&nbsp;&nbsp;' +
              M([[1, 1], [0, 1]], [[2], ['&minus;1']]) +
              '</p>'
          }
        ]
      },

      /* ============================================ 9/9 — echelon */
      {
        id: 'pivot',
        term: 'Pivot',
        zh: '主元',
        zhAlt: '樞紐元／階梯基準點',
        aliases: ['leading entry', '首項', '基準點', '階梯'],
        tags: ['ch1.2', 'echelon'],
        def:
          'The entry a row is anchored on during elimination — the position of that row\'s ' +
          'first non-zero element, i.e. where its step in the staircase begins. In reduced ' +
          'echelon form every pivot is a <a href="#leading-1">leading 1</a>.',
        notes: [
          'The column a pivot sits in is a <strong>pivot column</strong>; its variable is ' +
            'determined. A column with no pivot belongs to a ' +
            '<a href="#free-variable">free variable</a>.',
          'The number of pivots is the <strong>rank</strong> of the matrix. For a consistent ' +
            'system, rank = number of variables means a unique solution; rank &lt; number of ' +
            'variables means infinitely many. (Whether the system is consistent at all is decided ' +
            'by the last column: a pivot there means 0 = non-zero, so no solution.)'
        ],
        defZh:
          '消去時每一列所倚靠的那個位置 &mdash; 該列第一個非零元素所在處，也就是階梯的轉折點。' +
          '在 reduced echelon form 中，每個主元都是一個 leading 1。',
        notesZh: [
          '主元所在的那一行叫 <strong>pivot column</strong>（主行），' +
            '它對應的變數是被綁定的；沒有主元的行對應<a href="#free-variable">自由變數</a>。',
          '主元的個數就是矩陣的 <strong>rank</strong>（秩）。方程組有解時，rank = 變數個數 &rArr; 唯一解；' +
            'rank &lt; 變數個數 &rArr; 無限多解。（有沒有解則看最後一行：那裡出現主元代表 0 = 非零數，無解。）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>pivot：每一階梯基準點</p>' +
              '<p>&rarr; "the reference point of each step"</p>'
          },
          {
            label: 'Pivot positions (&#9646; marks a pivot)',
            html:
              M([
                ['&#9646;', '&lowast;', '&lowast;', '&lowast;'],
                [0, 0, '&#9646;', '&lowast;'],
                [0, 0, 0, '&#9646;']
              ]) + '<p>three pivots &rarr; rank = 3</p>'
          }
        ]
      },

      {
        id: 'reduced-echelon-form',
        term: 'Reduced echelon form',
        abbr: 'RREF',
        zh: '簡化列梯形形式',
        zhAlt: '最簡列梯形',
        aliases: ['rref', 'reduced row echelon', '簡化', '最簡', '梯形'],
        tags: ['ch1.2', 'echelon'],
        def:
          'A matrix is in <strong>reduced echelon form</strong> when it satisfies all four ' +
          'conditions below. It is the finish line of elimination: once the augmented matrix ' +
          'is in this shape, the solution can be read straight off — no back-substitution needed.',
        notes: [
          '<strong>&#9312;</strong> Any row consisting entirely of zeros is grouped at the ' +
            '<strong>bottom</strong> of the matrix.',
          '<strong>&#9313;</strong> The first non-zero element of each other row is ' +
            '<strong>1</strong>; this element is called a <a href="#leading-1">leading 1</a>.',
          '<strong>&#9314;</strong> The leading 1 of each row after the first row is positioned ' +
            '<strong>to the right of</strong> the leading 1 of the previous row — that is the staircase.',
          '<strong>&#9315;</strong> All other elements in the column containing a leading 1 are ' +
            '<strong>zero</strong>.',
          'Conditions &#9312;&#9313;&#9314; together give plain ' +
            '<a href="#row-echelon-form">echelon form</a>; adding &#9315; is what makes it ' +
            '<em>reduced</em> — &#9315; is the step that also clears the entries <em>above</em> ' +
            'each leading 1.'
        ],
        defZh:
          '同時滿足下面四個條件的矩陣就是 <strong>reduced echelon form</strong>。' +
          '它是消去法的終點：增廣矩陣化到這個形狀後，解可以直接讀出來，不必再回代。',
        notesZh: [
          '<strong>&#9312;</strong> 全零的列都排到最底下。',
          '<strong>&#9313;</strong> 其餘每一列的第一個非零元素必須是 1，這個元素叫 ' +
            '<a href="#leading-1">leading 1</a>。',
          '<strong>&#9314;</strong> 每列的 leading 1 都在上一列 leading 1 的右邊 &mdash; 這就是「階梯」。',
          '<strong>&#9315;</strong> leading 1 所在那一行的其他元素都要是 0。',
          '&#9312;&#9313;&#9314; 合起來是 <a href="#row-echelon-form">echelon form</a>（列梯形）；' +
            '再加上 &#9315; 才叫 <em>reduced</em>（簡化）&mdash; &#9315; 就是把 leading 1 ' +
            '<em>上方</em>也清成 0 的那一步。'
        ],
        examples: [
          {
            label: 'In reduced echelon form',
            html:
              M([[1, 0, 0], [0, 1, 0], [0, 0, 1]], [[3], ['&minus;1'], [2]]) +
              '<p>read off x&#8321;=3, x&#8322;=&minus;1, x&#8323;=2</p>'
          },
          {
            label: 'Not — breaks &#9315; (non-zero above a leading 1)',
            html:
              M([
                [1, 2, 0],
                [0, 1, 0],
                [0, 0, 1]
              ]) + '<p>the 2 in column 2 sits above a leading 1 and must be cleared</p>'
          },
          {
            label: 'Not — breaks &#9312; (zero row not at the bottom)',
            html: M([
              [1, 0, 0],
              [0, 0, 0],
              [0, 1, 0]
            ])
          }
        ],
        figure: {
          caption: 'The staircase steps right and down; above and below each leading 1 is 0',
          svg:
            '<svg viewBox="0 0 330 150" role="img" aria-label="reduced echelon form shape">' +
            '<g fill="none" stroke="currentColor" stroke-width="1.5">' +
            '<path d="M52 22 h-9 v106 h9"/><path d="M288 22 h9 v106 h9"/></g>' +
            '<g fill="var(--accent-soft)">' +
            '<rect x="62" y="28" width="42" height="26" rx="3"/>' +
            '<rect x="128" y="60" width="42" height="26" rx="3"/>' +
            '<rect x="194" y="92" width="42" height="26" rx="3"/></g>' +
            '<g fill="var(--accent)" font-family="monospace" font-size="15" ' +
            'font-weight="700" text-anchor="middle">' +
            '<text x="83" y="47">1</text><text x="149" y="79">1</text>' +
            '<text x="215" y="111">1</text></g>' +
            '<g fill="currentColor" font-family="monospace" font-size="15" ' +
            'text-anchor="middle" opacity=".75">' +
            '<text x="149" y="47">0</text><text x="215" y="47">0</text><text x="271" y="47">*</text>' +
            '<text x="83" y="79">0</text><text x="215" y="79">0</text><text x="271" y="79">*</text>' +
            '<text x="83" y="111">0</text><text x="149" y="111">0</text><text x="271" y="111">*</text>' +
            '</g>' +
            '<path d="M62 60 L104 60 L104 92 L170 92 L170 124 L236 124" fill="none" ' +
            'stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4" opacity=".8"/>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif">' +
            '<text x="271" y="18" text-anchor="middle">constants</text>' +
            '<text x="165" y="145" text-anchor="middle">dashed = the staircase, one column right per step</text>' +
            '</g></svg>'
        }
      },

      {
        id: 'leading-1',
        term: 'Leading 1',
        zh: '領先 1',
        zhAlt: '前導 1',
        aliases: ['leading one', 'leading', '首項 1', '第一個非零'],
        tags: ['ch1.2', 'echelon'],
        def:
          'The <strong>first non-zero element of a row</strong> in a matrix being reduced to ' +
          'echelon form. It <strong>must be 1</strong> — that requirement is what condition ' +
          '&#9313; of reduced echelon form demands.',
        notes: [
          'The notes highlight <em>It must be 1</em> — it is one of the things that decides ' +
            'whether a matrix counts as reduced echelon form at all.',
          'If a row starts with k (k &ne; 0), multiplying the whole row by 1/k turns it into a ' +
            '1. That is exactly <a href="#elementary-row-operation">ERO</a> &#9313;, so it can ' +
            'always be done.',
          'An all-zero row has no leading 1, which is why condition &#9312; sends those rows ' +
            'to the bottom.'
        ],
        defZh:
          '在化為 reduced echelon form 的過程中，一列的<strong>第一個非零元素</strong>。' +
          '它<strong>必須是 1</strong> &mdash; 這正是 reduced echelon form 條件 &#9313; 的要求。',
        notesZh: [
          '筆記把 <em>It must be 1</em> 特別畫了螢光 &mdash; 這是能不能算 reduced echelon form 的關鍵之一。',
          '如果某列首項是 k（k &ne; 0），把整列乘上 1/k 就變成 1，' +
            '這正是<a href="#elementary-row-operation">基本列運算</a>的第 &#9313; 種，所以永遠做得到。',
          '全零的列沒有 leading 1，依條件 &#9312; 它們要被排到最底下。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>leading 1: The first nonzero element of each other row in a matrix ' +
              'being reduced echelon form. <mark>It must be 1</mark></p>'
          },
          {
            label: 'Turning a first entry into a leading 1',
            html: M([[3, 6, 9]]) + '&nbsp;&nbsp;&#8531;R&#8321;&nbsp;&nbsp;' + M([[1, 2, 3]])
          }
        ]
      },

      {
        id: 'free-variable',
        term: 'Free variable',
        zh: '自由變數',
        aliases: ['free', '參數', 'parameter'],
        tags: ['ch1.2', 'echelon'],
        added: true,
        def:
          'A variable whose column contains <strong>no pivot</strong> once the matrix is in ' +
          'reduced echelon form. It can be set to anything, and the pivot variables are then ' +
          'determined by it — which is exactly why such a system has infinitely many solutions.',
        notes: [
          'Why this is here: it links ch1.1\'s "infinitely many solutions" to ch1.2\'s pivots — ' +
            'the number of free variables is the number of parameters in the answer.',
          'Counting: free variables = total variables &minus; pivots (rank).'
        ],
        defZh:
          '矩陣化成 reduced echelon form 後，<strong>那一行沒有主元</strong>的變數。' +
          '它可以任意取值，其他主元變數再隨它而定 &mdash; 這就是無限多解的來源。',
        notesZh: [
          '為什麼補這個：它把 ch1.1 的「無限多解」和 ch1.2 的主元直接接起來 &mdash; ' +
            '有幾個自由變數，解就有幾個參數。',
          '數量關係：自由變數個數 = 變數總數 &minus; 主元個數（rank）。'
        ],
        examples: [
          {
            label: 'Column x&#8323; has no pivot',
            html:
              M([[1, 0, 2], [0, 1, '&minus;1']], [[5], [3]]) +
              '<p>let x&#8323; = t (free)</p>' +
              '<p>then x&#8321; = 5 &minus; 2t,&nbsp; x&#8322; = 3 + t</p>'
          }
        ]
      },

      {
        id: 'row-echelon-form',
        term: 'Row echelon form',
        abbr: 'REF',
        zh: '列梯形形式',
        zhAlt: '階梯形',
        aliases: ['echelon', '梯形', 'staircase'],
        tags: ['ch1.2', 'echelon'],
        added: true,
        def:
          'The staircase shape without the "reduced" part: all-zero rows sit at the bottom and ' +
          'each pivot lies strictly to the right of the pivot above it, but the entries ' +
          '<em>above</em> a pivot need not be zero, and pivots need not be 1.',
        notes: [
          'Why this is here: the notes define only <em>reduced</em> echelon form. Textbooks and ' +
            'exercises often say plain "echelon form", meaning the version that satisfies only ' +
            'the first three conditions — the difference is condition &#9315;.',
          'Side by side: echelon form = &#9312;&#9313;&#9314; (with &#9313; relaxed to "first ' +
            'entry non-zero"); <a href="#reduced-echelon-form">reduced echelon form</a> = ' +
            '&#9312;&#9313;&#9314;&#9315;.'
        ],
        defZh:
          '只有階梯、還沒「簡化」的形狀：全零列在最底下、每個主元都在上一列主元的右邊，' +
          '但主元<em>上方</em>不必是 0，主元本身也不必是 1。',
        notesZh: [
          '為什麼補這個：筆記只定義了 <em>reduced</em> echelon form（四個條件）。' +
            '課本與題目常單獨提 echelon form，指的是只滿足前三個條件的版本，兩者差在條件 &#9315;。',
          '對照：echelon form = &#9312;&#9313;&#9314;（且 &#9313; 可放寬成「首項非零」）；' +
            '<a href="#reduced-echelon-form">reduced echelon form</a> = &#9312;&#9313;&#9314;&#9315;。'
        ],
        examples: [
          {
            label: 'Echelon, but not reduced (&#9646; = pivot)',
            html: M([
              ['&#9646;', '&lowast;', '&lowast;'],
              [0, '&#9646;', '&lowast;'],
              [0, 0, '&#9646;']
            ])
          }
        ]
      },

      {
        id: 'gaussian-elimination',
        term: 'Gaussian elimination',
        zh: '高斯消去法',
        aliases: ['elimination', '消去法', 'gauss', 'gauss-jordan'],
        tags: ['ch1.2', 'echelon'],
        added: true,
        def:
          'The procedure of applying elementary row operations, column by column, to drive ' +
          'the augmented matrix into a staircase shape from which the solution can be read ' +
          'off directly.',
        notes: [
          'Why this is here: ch1.1 gives the three EROs as tools and ch1.2 gives ' +
            '<a href="#reduced-echelon-form">reduced echelon form</a> as the goal — this is the ' +
            'name of the procedure joining them.',
          'How: left to right, use each column\'s <a href="#pivot">pivot</a> to clear the ' +
            'entries <em>below</em> it.',
          'Clearing only below a pivot gives echelon form and is called Gaussian elimination; ' +
            'also clearing <em>above</em> each pivot and scaling pivots to 1 gives reduced ' +
            'echelon form, and that version is usually called ' +
            '<strong>Gauss-Jordan elimination</strong>.'
        ],
        defZh:
          '有系統地一行一行套用基本列運算，把增廣矩陣化成階梯狀，讓解可以直接讀出來的做法。',
        notesZh: [
          '為什麼補這個：ch1.1 給了三種 ERO 這些「工具」、ch1.2 給了 ' +
            '<a href="#reduced-echelon-form">reduced echelon form</a> 這個目標，' +
            '而這個名字就是連接兩者的那套流程。',
          '做法：由左到右，用每一行的<a href="#pivot">主元</a>把它<em>下方</em>的元素清成 0。',
          '只清主元下方 &rarr; 得到 echelon form，稱 Gaussian elimination；' +
            '連主元<em>上方</em>也清掉、並把主元化成 1 &rarr; 得到 reduced echelon form，' +
            '這一版通常叫 <strong>Gauss-Jordan elimination</strong>（高斯-喬登消去法）。'
        ]
      },

      {
        id: 'homogeneous-system',
        term: 'Homogeneous system',
        zh: '齊次方程組',
        aliases: ['homogeneous', 'homogeneus', '齊次', 'more variables than equations'],
        tags: ['ch1.2', 'solutions'],
        def:
          'A system of linear equations in which <strong>every constant term is 0</strong>. It is ' +
          'always <a href="#consistent">consistent</a>, because setting all variables to 0 — the ' +
          '<a href="#trivial-solution">trivial solution</a> — always works. So it has either ' +
          'exactly one solution or infinitely many, never none.',
        notes: [
          'The notes add: a homogeneous system with <strong>more variables than equations</strong> ' +
            'has many solutions, including the trivial one. "Many" here means infinitely many: ' +
            'there are too few equations to give every variable a <a href="#pivot">pivot</a>, so ' +
            'at least one is a <a href="#free-variable">free variable</a>.',
          'A homogeneous system with as many or more equations than variables can still have ' +
            'only the trivial solution — the count only settles the case with more variables.',
          'It removes one of the three <a href="#type-of-solution">types of solution</a> outright.'
        ],
        defZh:
          '所有<strong>常數項都是 0</strong> 的線性方程組。它一定<a href="#consistent">有解</a>，因為全部變數取 0 &mdash; ' +
          '也就是<a href="#trivial-solution">零解</a> &mdash; 永遠成立。所以只會是唯一解或無限多解，絕不會無解。',
        notesZh: [
          '筆記補充：<strong>變數比方程式多</strong>的齊次方程組有很多解（包含零解）。這裡的「很多」就是無限多：' +
            '方程式太少，不夠讓每個變數都有<a href="#pivot">主元</a>，至少會有一個<a href="#free-variable">自由變數</a>。',
          '方程式數目 &ge; 變數數目時，也可能只有零解 &mdash; 數目比較只能確定「變數比較多」的那種情形。',
          '它把三種<a href="#type-of-solution">解的型態</a>直接砍掉一種（無解）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Homogeneous System: All constants in linear equations are zero</p>' +
              '<p>* A homogeneous system that has more variables than equations has many solutions, ' +
              'including trivial solution.</p>'
          },
          {
            label: '2 equations, 3 variables: the last column is all zeros',
            html:
              M([[1, 1, 1], [2, 3, 1]], [[0], [0]]) +
              '<p>x&#8323; is free &rArr; infinitely many solutions, e.g. (&minus;2, 1, 1)</p>'
          }
        ]
      },

      {
        id: 'trivial-solution',
        term: 'Trivial solution',
        zh: '零解',
        zhAlt: '平凡解',
        aliases: ['trivial', 'nontrivial solution', 'non-trivial', '非零解', 'trival'],
        tags: ['ch1.2', 'solutions'],
        def:
          'The solution <span class="mono">x&#8321; = x&#8322; = &hellip; = x<sub>n</sub> = 0</span> ' +
          'that every <a href="#homogeneous-system">homogeneous system</a> has. Any other ' +
          'solution is called a <strong>nontrivial solution</strong>.',
        notes: [
          'It is "trivial" because it tells you nothing — plugging in all zeros into equations ' +
            'whose constant terms are all 0 works every time.',
          'The interesting question about a homogeneous system is therefore whether it has a ' +
            'nontrivial solution; with more variables than equations it always does.',
          'A non-homogeneous system (some constant term &ne; 0) never has the zero solution.'
        ],
        defZh:
          '每個<a href="#homogeneous-system">齊次方程組</a>都有的解 x&#8321; = x&#8322; = … = x<sub>n</sub> = 0。' +
          '除此之外的解叫<strong>非零解</strong>（nontrivial solution）。',
        notesZh: [
          '叫「平凡」是因為它沒有提供任何資訊 &mdash; 常數項全是 0 的方程式，全部代 0 一定成立。',
          '所以齊次方程組真正要問的是「有沒有非零解」；變數比方程式多時一定有。',
          '非齊次方程組（有某個常數項 &ne; 0）絕不會有零解。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Trivial Solution: A homogeneous of linear equations always have one solution ' +
              'x&#8321; = 0, x&#8322; = 0, x&#8323; = 0</p>'
          },
          {
            label: 'Trivial and nontrivial',
            html:
              '<p>x + y = 0: (0, 0) is the trivial solution; (1, &minus;1) and (5, &minus;5) are nontrivial</p>'
          }
        ]
      },

      /* ============================================ ch1.2 — vectors in Rⁿ */
      {
        id: 'vector-space-rn',
        term: 'Vector space &#8477;<sup>n</sup>',
        abbr: '&#8477;<sup>n</sup>',
        zh: '向量空間',
        zhAlt: 'n 維空間',
        aliases: ['vector space', 'n-space', 'R^n', 'Rn', 'R2', 'R3', 'dimension', '維度', 'n維'],
        tags: ['ch1.3', 'vectors'],
        def:
          'The set of all ordered lists <span class="mono">(u&#8321;, u&#8322;, &hellip;, u<sub>n</sub>)</span> ' +
          'of n real numbers, together with <a href="#vector-addition">addition</a> and ' +
          '<a href="#scalar-multiplication">scalar multiplication</a>. n is its ' +
          '<strong>dimension</strong>: &#8477;² is the plane, &#8477;³ is space.',
        notes: [
          'Each element is a <a href="#vector">vector</a>; each entry is a ' +
            '<a href="#component">component</a>.',
          'What makes it a vector space is that the two operations obey the usual rules: ' +
            '<strong>u</strong> + <strong>v</strong> = <strong>v</strong> + <strong>u</strong>, ' +
            '(<strong>u</strong> + <strong>v</strong>) + <strong>w</strong> = <strong>u</strong> + (<strong>v</strong> + <strong>w</strong>), ' +
            '<strong>u</strong> + <strong>0</strong> = <strong>u</strong>, <strong>u</strong> + (&minus;<strong>u</strong>) = <strong>0</strong>, ' +
            'c(<strong>u</strong> + <strong>v</strong>) = c<strong>u</strong> + c<strong>v</strong>, ' +
            '(c + d)<strong>u</strong> = c<strong>u</strong> + d<strong>u</strong>, c(d<strong>u</strong>) = (cd)<strong>u</strong>, ' +
            '1<strong>u</strong> = <strong>u</strong> (filled in here).',
          'For n &gt; 3 there is no picture, but the algebra works exactly the same.'
        ],
        defZh:
          '所有由 n 個實數組成的有序數組 (u&#8321;, u&#8322;, …, u<sub>n</sub>) 所成的集合，配上' +
          '<a href="#vector-addition">加法</a>與<a href="#scalar-multiplication">純量乘法</a>。' +
          'n 是它的<strong>維度</strong>：&#8477;² 是平面，&#8477;³ 是空間。',
        notesZh: [
          '裡面每個元素是一個<a href="#vector">向量</a>，每個數字是一個<a href="#component">分量</a>。',
          '它之所以叫「向量空間」，是因為兩種運算滿足熟悉的規則：交換律、結合律、有零向量、有負向量、' +
            '兩種分配律、c(d<strong>u</strong>) = (cd)<strong>u</strong>、1<strong>u</strong> = <strong>u</strong>（這裡補上的）。',
          'n &gt; 3 就畫不出來了，但代數運算完全一樣。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Vector space: 向量空間 &#8477;<sup>n</sup>, n 維度</p><p>&rarr; "vector space &#8477;<sup>n</sup>, n dimensions"</p>' },
          {
            label: 'Elements of different spaces',
            html:
              '<p>(3, &minus;1) &isin; &#8477;² &nbsp;&nbsp; (1, 0, 2) &isin; &#8477;³ &nbsp;&nbsp; (1, 2, 3, 4, 5) &isin; &#8477;<sup>5</sup></p>'
          }
        ]
      },

      {
        id: 'origin',
        term: 'Origin',
        abbr: 'O',
        zh: '原點',
        aliases: ['zero point', '(0,0)', '(0,0,0)'],
        tags: ['ch1.3', 'vectors'],
        def:
          'The point <span class="mono">O = (0, 0, &hellip;, 0)</span> where all the axes meet. ' +
          '<a href="#position-vector">Position vectors</a> are drawn from it.',
        notes: [
          'As a vector it is the <a href="#zero-vector">zero vector</a> <strong>0</strong>.',
          'Every <a href="#subspace">subspace</a> must pass through the origin — the quickest test ' +
            'for ruling a set out.'
        ],
        defZh: '所有座標軸交會的點 O = (0, 0, …, 0)。<a href="#position-vector">位置向量</a>都從這裡畫出去。',
        notesZh: [
          '當成向量看，它就是<a href="#zero-vector">零向量</a> <strong>0</strong>。',
          '每個<a href="#subspace">子空間</a>都一定通過原點 &mdash; 這是排除一個集合最快的檢查。'
        ],
        examples: [{ label: 'From the notes', html: '<p>Origin: 原點 O</p>' }]
      },

      {
        id: 'position-vector',
        term: 'Position vector',
        zh: '位置向量',
        aliases: ['OA', 'radius vector', '位置'],
        tags: ['ch1.3', 'vectors'],
        def:
          'The vector from the <a href="#origin">origin</a> to a point. The position vector of ' +
          'the point <span class="mono">A = (a&#8321;, a&#8322;)</span> is ' +
          '<span class="mono">OA = (a&#8321;, a&#8322;)</span> — the same numbers, read as an arrow.',
        notes: [
          'This is why a point and a vector in &#8477;<sup>n</sup> can be written the same way: ' +
            'the vector (3, 2) is the arrow from O to the point (3, 2).',
          'A vector drawn somewhere else (from P to Q) is the same vector as the position vector ' +
            'with the same length and direction — see <a href="#initial-terminal-point">initial ' +
            'and terminal point</a>.'
        ],
        defZh:
          '從<a href="#origin">原點</a>指到某一點的向量。點 A = (a&#8321;, a&#8322;) 的位置向量是 OA = (a&#8321;, a&#8322;) &mdash; 同一組數字，當成箭頭來讀。',
        notesZh: [
          '所以 &#8477;<sup>n</sup> 裡的點和向量可以用同樣的寫法：向量 (3, 2) 就是從 O 指到點 (3, 2) 的箭頭。',
          '畫在別處（從 P 到 Q）的向量，只要長度、方向一樣，就和那個位置向量是同一個向量，見<a href="#initial-terminal-point">起點與終點</a>。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>position vector: 位置向量: The vector from origin to a position.</p>' }
        ],
        figure: { caption: 'OA is a position vector; P→Q is a vector with its own initial point', svg: POSITION_FIG }
      },

      {
        id: 'initial-terminal-point',
        term: 'Initial / terminal point',
        zh: '起點／終點',
        aliases: ['initial point', 'terminal point', 'tail', 'head', '起點', '終點', 'PQ'],
        tags: ['ch1.3', 'vectors'],
        def:
          'A vector drawn as an arrow from P to Q starts at its <strong>initial point</strong> P ' +
          'and ends at its <strong>terminal point</strong> Q. Its components are ' +
          '<span class="mono">PQ = Q &minus; P</span>: terminal minus initial.',
        notes: [
          'The notes give only the names; the formula Q &minus; P is filled in here.',
          'Moving an arrow without turning or stretching it does not change the vector. A ' +
            '<a href="#position-vector">position vector</a> is the case where the initial point ' +
            'is the origin.'
        ],
        defZh:
          '畫成從 P 到 Q 的箭頭時，P 是<strong>起點</strong>、Q 是<strong>終點</strong>。它的分量是 PQ = Q &minus; P：終點減起點。',
        notesZh: [
          '筆記只寫了名稱；Q &minus; P 的公式是這裡補上的。',
          '把箭頭平移（不旋轉、不伸縮）不會改變向量。<a href="#position-vector">位置向量</a>就是起點剛好在原點的情形。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>initial point: 起點位置 &nbsp;&nbsp; terminal point: 終點位置</p>' },
          { label: 'Terminal minus initial', html: '<p>P = (1, 2), Q = (4, 3) &nbsp;&rarr;&nbsp; PQ = (4 &minus; 1, 3 &minus; 2) = (3, 1)</p>' }
        ],
        figure: { caption: 'P is the initial point and Q the terminal point of the grey arrow', svg: POSITION_FIG }
      },

      {
        id: 'component',
        term: 'Component',
        zh: '分量',
        aliases: ['entry', 'first component', 'coordinate', 'n-space'],
        tags: ['ch1.3', 'vectors'],
        def:
          'Each number in a vector <span class="mono">(u&#8321;, u&#8322;, &hellip;, u<sub>n</sub>)</span>: ' +
          'u&#8321; is the <strong>first component</strong>, u&#8322; the second, and so on. The set of ' +
          'all such lists is called <strong>n-space</strong>, &#8477;<sup>n</sup>.',
        notes: [
          'Vectors are added and scaled component by component — see ' +
            '<a href="#vector-addition">vector addition</a> and ' +
            '<a href="#scalar-multiplication">scalar multiplication</a>.'
        ],
        defZh:
          '向量 (u&#8321;, u&#8322;, …, u<sub>n</sub>) 裡的每一個數：u&#8321; 是<strong>第一分量</strong>、u&#8322; 是第二分量，依此類推。' +
          '所有這種數組所成的集合叫 <strong>n 維空間</strong> &#8477;<sup>n</sup>。',
        notesZh: [
          '向量的加法和純量乘法都是「一個分量一個分量」做，見<a href="#vector-addition">向量加法</a>與<a href="#scalar-multiplication">純量乘法</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>component: (u&#8321;, u&#8322;, &hellip;, u<sub>n</sub>) these sequences is call n-space or &#8477;<sup>n</sup></p>' +
              '<p>u&#8321; is first component, u&#8322; is second component</p>'
          },
          { label: 'Reading components', html: '<p><strong>u</strong> = (4, &minus;1, 7): first component 4, third component 7</p>' }
        ]
      },

      {
        id: 'equal-vectors',
        term: 'Equal vectors',
        zh: '向量相等',
        aliases: ['equal', 'equality', '相等'],
        tags: ['ch1.3', 'vectors'],
        def:
          'Two vectors <strong>u</strong> = (u&#8321;, &hellip;, u<sub>n</sub>) and ' +
          '<strong>v</strong> = (v&#8321;, &hellip;, v<sub>n</sub>) in &#8477;<sup>n</sup> are equal when ' +
          'their corresponding components are the same: u&#8321; = v&#8321;, u&#8322; = v&#8322;, &hellip;, ' +
          'u<sub>n</sub> = v<sub>n</sub>.',
        notes: [
          'Both must live in the same &#8477;<sup>n</sup> — (1, 2) and (1, 2, 0) are not equal, they are ' +
            'not even comparable.',
          'One vector equation stands for n ordinary equations, one per component.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 中的兩個向量 <strong>u</strong>、<strong>v</strong>，當每個對應分量都相同（u&#8321; = v&#8321;、…、u<sub>n</sub> = v<sub>n</sub>）時就相等。',
        notesZh: [
          '兩個向量要在同一個 &#8477;<sup>n</sup> 裡 &mdash; (1, 2) 和 (1, 2, 0) 不是相等，是根本不能比。',
          '一條向量等式等於 n 條普通方程式，每個分量一條。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>equal: If u = (u&#8321;, u&#8322;, &hellip;, u<sub>n</sub>) and v = (v&#8321;, v&#8322;, &hellip;, v<sub>n</sub>) ' +
              'two element of &#8477;<sup>n</sup> and correspondingly same</p>'
          },
          { label: 'Solving with it', html: '<p>(x + 1, 2y) = (4, 6) &nbsp;&rArr;&nbsp; x = 3, y = 3</p>' }
        ]
      },

      {
        id: 'vector-addition',
        term: 'Vector addition',
        zh: '向量加法',
        aliases: ['addition', 'sum', 'parallelogram', '平行四邊形', 'tip to tail', '加法'],
        tags: ['ch1.3', 'vectors'],
        def:
          'Add two vectors component by component: ' +
          '<span class="mono">u + v = (u&#8321; + v&#8321;, &hellip;, u<sub>n</sub> + v<sub>n</sub>)</span>. ' +
          'Geometrically, place <strong>v</strong> at the tip of <strong>u</strong>; the sum runs from ' +
          'the start of <strong>u</strong> to the tip of <strong>v</strong> — the diagonal of the ' +
          'parallelogram they span.',
        notes: [
          'The notes give only the picture; the component formula is filled in here.',
          'Only vectors in the same &#8477;<sup>n</sup> can be added.',
          'Order does not matter: <strong>u</strong> + <strong>v</strong> = <strong>v</strong> + <strong>u</strong> — ' +
            'the two ways round the parallelogram end at the same corner.'
        ],
        defZh:
          '兩個向量一個分量一個分量相加：u + v = (u&#8321; + v&#8321;, …, u<sub>n</sub> + v<sub>n</sub>)。' +
          '幾何上，把 <strong>v</strong> 接在 <strong>u</strong> 的尾端，和就是從 <strong>u</strong> 的起點指到 <strong>v</strong> 的終點 &mdash; 兩者張成的平行四邊形的對角線。',
        notesZh: [
          '筆記只畫了圖；分量公式是這裡補上的。',
          '只有同一個 &#8477;<sup>n</sup> 裡的向量才能相加。',
          '順序不影響：<strong>u</strong> + <strong>v</strong> = <strong>v</strong> + <strong>u</strong> &mdash; 沿平行四邊形兩邊走，最後停在同一個角。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Addition: (drawing of <strong>u</strong>, <strong>v</strong> and <strong>u</strong> + <strong>v</strong>)</p>' },
          { label: 'Component by component', html: '<p>(1, 3) + (4, &minus;1) = (5, 2)</p>' }
        ],
        figure: {
          caption: 'u + v is the diagonal of the parallelogram built on u and v',
          svg:
            '<svg viewBox="0 0 300 165" role="img" aria-label="adding two vectors">' +
            axes(40, 140, 20, 290, 160, 4) +
            arrow(90, 50, 260, 10, INK, true) +
            arrow(210, 100, 260, 10, INK, true) +
            arrow(40, 140, 90, 50, INK) +
            arrow(40, 140, 210, 100, INK) +
            arrow(40, 140, 260, 10, ACC) +
            LBL + '<text x="50" y="88" font-weight="700">u</text>' +
            '<text x="130" y="134" font-weight="700">v</text>' +
            '<text x="116" y="80" text-anchor="end" fill="var(--accent)" font-weight="700" font-style="normal">u + v</text></g></svg>'
        }
      },

      {
        id: 'scalar-multiplication',
        term: 'Scalar multiplication',
        zh: '純量乘法',
        zhAlt: '係數積',
        aliases: ['scalar multiple', 'multiply', 'scaling', 'ku', '倍數', '伸縮'],
        tags: ['ch1.3', 'vectors'],
        def:
          'Multiplying a vector by a <a href="#scalar">scalar</a> (a number) multiplies every ' +
          'component: <span class="mono">k u = (k u&#8321;, &hellip;, k u<sub>n</sub>)</span>. The arrow ' +
          'is stretched by |k| and, if k &lt; 0, turned round.',
        notes: [
          'The notes put it as "multiply a vector to a constant term".',
          'k = 2 doubles the length; k = ½ halves it; k = &minus;1 gives the ' +
            '<a href="#negative-vector">negative vector</a>; k = 0 gives the ' +
            '<a href="#zero-vector">zero vector</a>.',
          'A scalar multiple always lies on the same line through the origin as the original vector.'
        ],
        defZh:
          '向量乘上一個<a href="#scalar">純量</a>（一個數），每個分量都乘上它：k u = (k u&#8321;, …, k u<sub>n</sub>)。' +
          '箭頭長度變成 |k| 倍，k &lt; 0 時方向反過來。',
        notesZh: [
          '筆記的說法是「把向量乘上一個常數」。',
          'k = 2 長度加倍、k = ½ 減半、k = &minus;1 得到<a href="#negative-vector">負向量</a>、k = 0 得到<a href="#zero-vector">零向量</a>。',
          '純量倍數永遠和原向量落在同一條通過原點的直線上。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Scalar multiplication: multiply a vector to a constant term</p>' },
          { label: 'Component by component', html: '<p>3(2, &minus;1, 0) = (6, &minus;3, 0)</p>' }
        ],
        figure: {
          caption: 'v, 2v (twice as long) and −v (same length, opposite direction)',
          svg:
            '<svg viewBox="0 0 300 115" role="img" aria-label="scalar multiples of a vector">' +
            arrow(30, 95, 80, 65, INK) +
            arrow(115, 95, 215, 35, ACC) +
            arrow(290, 65, 240, 95, INK) +
            LBL + '<text x="60" y="60" font-weight="700">v</text>' +
            '<text x="170" y="48" fill="var(--accent)" font-weight="700" font-style="normal">2<tspan font-style="italic">v</tspan></text>' +
            '<text x="258" y="100" font-weight="700" font-style="normal">&minus;<tspan font-style="italic">v</tspan></text></g></svg>'
        }
      },

      {
        id: 'zero-vector',
        term: 'Zero vector',
        abbr: '<strong>0</strong>',
        zh: '零向量',
        aliases: ['zero', '0 vector', 'null vector'],
        tags: ['ch1.3', 'vectors'],
        def:
          'The vector whose every component is 0: <span class="mono">0 = (0, 0, &hellip;, 0)</span>. ' +
          'Adding it changes nothing: <strong>u</strong> + <strong>0</strong> = <strong>u</strong>.',
        notes: [
          'It is the only vector with no direction; drawn as an arrow it is just the ' +
            '<a href="#origin">origin</a>.',
          'Every <a href="#subspace">subspace</a> contains it, since 0<strong>u</strong> = <strong>0</strong> for any ' +
            '<strong>u</strong> in the subspace.'
        ],
        defZh: '每個分量都是 0 的向量 0 = (0, 0, …, 0)。加上它什麼都不變：<strong>u</strong> + <strong>0</strong> = <strong>u</strong>。',
        notesZh: [
          '它是唯一沒有方向的向量；畫成箭頭就只是<a href="#origin">原點</a>一個點。',
          '每個<a href="#subspace">子空間</a>都包含它，因為子空間裡任何 <strong>u</strong> 都有 0<strong>u</strong> = <strong>0</strong>。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Zero vector: <strong>0</strong>: <strong>u</strong> has zero component</p><p>&rarr; every component is zero</p>' }
        ]
      },

      {
        id: 'negative-vector',
        term: 'Negative vector',
        abbr: '&minus;<strong>v</strong>',
        zh: '負向量',
        zhAlt: '反向量',
        aliases: ['negative', 'opposite vector', 'additive inverse', '反方向'],
        tags: ['ch1.3', 'vectors'],
        def:
          'The vector <span class="mono">&minus;v = (&minus;v&#8321;, &hellip;, &minus;v<sub>n</sub>)</span>: ' +
          'the same length as <strong>v</strong>, pointing the opposite way. It is what cancels ' +
          '<strong>v</strong>: <strong>v</strong> + (&minus;<strong>v</strong>) = <strong>0</strong>.',
        notes: [
          'The notes give only the name and a dashed arrow; the definition is filled in here.',
          'It equals (&minus;1)<strong>v</strong>, a <a href="#scalar-multiplication">scalar multiple</a>.'
        ],
        defZh:
          '向量 &minus;v = (&minus;v&#8321;, …, &minus;v<sub>n</sub>)：長度和 <strong>v</strong> 一樣、方向相反。它能把 <strong>v</strong> 抵銷：<strong>v</strong> + (&minus;<strong>v</strong>) = <strong>0</strong>。',
        notesZh: [
          '筆記只寫了名稱、畫了一條虛線箭頭；定義是這裡補上的。',
          '它等於 (&minus;1)<strong>v</strong>，是一種<a href="#scalar-multiplication">純量乘法</a>。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>negative vector: (dashed arrow &minus;<strong>v</strong>, opposite to <strong>v</strong>)</p>' },
          { label: 'Example', html: '<p><strong>v</strong> = (3, &minus;2) &nbsp;&rarr;&nbsp; &minus;<strong>v</strong> = (&minus;3, 2)</p>' }
        ]
      },

      {
        id: 'vector-subtraction',
        term: 'Vector subtraction',
        abbr: '<strong>u</strong> &minus; <strong>v</strong>',
        zh: '向量減法',
        aliases: ['subtraction', 'difference', 'u-v', '減法'],
        tags: ['ch1.3', 'vectors'],
        def:
          '<span class="mono">u &minus; v = u + (&minus;v)</span>: add the ' +
          '<a href="#negative-vector">negative</a> of <strong>v</strong>. Component by component it is ' +
          '(u&#8321; &minus; v&#8321;, &hellip;, u<sub>n</sub> &minus; v<sub>n</sub>).',
        notes: [
          'Geometrically, <strong>u</strong> &minus; <strong>v</strong> is the arrow from the tip of ' +
            '<strong>v</strong> to the tip of <strong>u</strong> — the other diagonal of the parallelogram.',
          'Moved to start at the origin, it points the way the notes draw it: up and to the left of both.',
          'Order matters: <strong>v</strong> &minus; <strong>u</strong> = &minus;(<strong>u</strong> &minus; <strong>v</strong>).'
        ],
        defZh:
          'u &minus; v = u + (&minus;v)：加上 <strong>v</strong> 的<a href="#negative-vector">負向量</a>。逐分量就是 (u&#8321; &minus; v&#8321;, …, u<sub>n</sub> &minus; v<sub>n</sub>)。',
        notesZh: [
          '幾何上，<strong>u</strong> &minus; <strong>v</strong> 是從 <strong>v</strong> 的終點指到 <strong>u</strong> 的終點的箭頭 &mdash; 平行四邊形的另一條對角線。',
          '平移到從原點出發，就是筆記畫的那條往左上的紅色箭頭。',
          '順序有差：<strong>v</strong> &minus; <strong>u</strong> = &minus;(<strong>u</strong> &minus; <strong>v</strong>)。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>subtraction: <strong>u</strong> &minus; <strong>v</strong> (drawn with &minus;<strong>v</strong> dashed)</p>' },
          { label: 'Component by component', html: '<p>(5, 2) &minus; (1, 4) = (4, &minus;2)</p>' }
        ],
        figure: {
          caption: 'u − v = u + (−v); drawn from the origin, and again from the tip of v to the tip of u',
          svg:
            '<svg viewBox="0 0 300 165" role="img" aria-label="subtracting two vectors">' +
            axes(140, 125, 10, 290, 160, 8) +
            arrow(140, 125, 20, 140, INK, true) +
            arrow(260, 110, 200, 40, ACC, true) +
            arrow(140, 125, 200, 40, INK) +
            arrow(140, 125, 260, 110, INK) +
            arrow(140, 125, 80, 55, ACC) +
            LBL + '<text x="178" y="72" font-weight="700">u</text>' +
            '<text x="222" y="132" font-weight="700">v</text>' +
            '<text x="30" y="158" font-weight="700" font-style="normal">&minus;<tspan font-style="italic">v</tspan></text>' +
            '<text x="74" y="50" text-anchor="end" fill="var(--accent)" font-weight="700" font-style="normal">u &minus; v</text>' +
            '<text x="236" y="70" fill="var(--accent)" font-style="normal">u &minus; v</text></g></svg>'
        }
      },

      {
        id: 'linear-combination',
        term: 'Linear combination',
        zh: '線性組合',
        aliases: ['combination', 'c1u1 + c2u2', 'weights', '組合'],
        tags: ['ch1.3', 'vectors'],
        def:
          'A sum of scalar multiples of vectors: ' +
          '<span class="mono">c&#8321;u&#8321; + c&#8322;u&#8322; + &hellip; + c<sub>k</sub>u<sub>k</sub></span>. ' +
          'A vector that can be written this way is a linear combination of ' +
          '<strong>u</strong>&#8321;, &hellip;, <strong>u</strong><sub>k</sub>; the scalars c<sub>i</sub> are its weights.',
        notes: [
          'It uses exactly the two operations of &#8477;<sup>n</sup> — ' +
            '<a href="#scalar-multiplication">scaling</a> and <a href="#vector-addition">adding</a> — and nothing else.',
          'Asking "is <strong>b</strong> a linear combination of <strong>u</strong>&#8321;, <strong>u</strong>&#8322;?" ' +
            'is the same as asking whether a <a href="#system-of-linear-equations">system of linear ' +
            'equations</a> has a solution — the weights are the unknowns.',
          'All linear combinations of a set of vectors together form their <a href="#span">span</a>.'
        ],
        defZh:
          '一堆向量各乘上純量再相加：c&#8321;u&#8321; + c&#8322;u&#8322; + … + c<sub>k</sub>u<sub>k</sub>。' +
          '能寫成這種形式的向量，就叫 <strong>u</strong>&#8321;, …, <strong>u</strong><sub>k</sub> 的線性組合；那些純量 c<sub>i</sub> 是權重（係數）。',
        notesZh: [
          '它只用到 &#8477;<sup>n</sup> 的兩種運算 &mdash; <a href="#scalar-multiplication">伸縮</a>與<a href="#vector-addition">相加</a>。',
          '問「<strong>b</strong> 是不是 <strong>u</strong>&#8321;、<strong>u</strong>&#8322; 的線性組合」，等於問一個<a href="#system-of-linear-equations">線性方程組</a>有沒有解 &mdash; 權重就是未知數。',
          '一組向量的所有線性組合合起來，就是它們的<a href="#span">生成空間</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Linear combination of vector: <strong>u</strong><sub>R</sub> = c&#8321;<strong>u</strong>&#8321; + ' +
              'c&#8322;<strong>u</strong>&#8322; + c&#8323;<strong>u</strong>&#8323;, then <strong>u</strong><sub>R</sub> is ' +
              'the linear combination of <strong>u</strong>&#8321;, <strong>u</strong>&#8322;, <strong>u</strong>&#8323;（線性組合）</p>'
          },
          {
            label: 'Finding the weights',
            html:
              '<p>(7, 5) = c&#8321;(1, 1) + c&#8322;(2, 1)</p>' +
              '<p>c&#8321; + 2c&#8322; = 7, c&#8321; + c&#8322; = 5 &nbsp;&rArr;&nbsp; c&#8321; = 3, c&#8322; = 2</p>'
          }
        ]
      },

      {
        id: 'span',
        term: 'Span',
        zh: '生成空間',
        zhAlt: '張成',
        aliases: ['spanned', 'span{}', '生成', 'plane through the origin'],
        tags: ['ch1.4', 'vectors'],
        added: true,
        def:
          'The set of <strong>all</strong> <a href="#linear-combination">linear combinations</a> of ' +
          'some vectors <strong>u</strong>&#8321;, &hellip;, <strong>u</strong><sub>k</sub>, written ' +
          'span{<strong>u</strong>&#8321;, &hellip;, <strong>u</strong><sub>k</sub>}. It is always a ' +
          '<a href="#subspace">subspace</a>.',
        notes: [
          'Why this is here: the textbook example in the notes ends by saying W "is in fact the ' +
            'plane determined by the vectors (1, 0, 1) and (0, 1, 1)" — that plane is their span.',
          'The span of one non-zero vector is a line through the origin; of two vectors not on ' +
            'the same line, a plane through the origin.'
        ],
        defZh:
          '一組向量 <strong>u</strong>&#8321;, …, <strong>u</strong><sub>k</sub> 的<strong>所有</strong><a href="#linear-combination">線性組合</a>所成的集合，' +
          '記作 span{<strong>u</strong>&#8321;, …, <strong>u</strong><sub>k</sub>}。它一定是<a href="#subspace">子空間</a>。',
        notesZh: [
          '為什麼補這個：筆記裡課本例題的結尾說 W「其實就是由 (1, 0, 1) 和 (0, 1, 1) 決定的平面」&mdash; 那個平面就是它們的生成空間。',
          '一個非零向量生成一條通過原點的直線；兩個不共線的向量生成一個通過原點的平面。'
        ],
        examples: [
          {
            label: 'The W example from the notes',
            html:
              '<p>(a, b, a + b) = a(1, 0, 1) + b(0, 1, 1)</p>' +
              '<p>&rArr; W = span{(1, 0, 1), (0, 1, 1)}, a plane through the origin in &#8477;³</p>'
          }
        ]
      },

      {
        id: 'subset',
        term: 'Subset',
        zh: '子集合',
        aliases: ['set', '集合', '⊆'],
        tags: ['ch1.4', 'vectors'],
        def:
          'A collection of some of the vectors of a space: W is a subset of &#8477;<sup>n</sup>, written ' +
          '<span class="mono">W &sube; &#8477;<sup>n</sup></span>, when every vector in W is also in &#8477;<sup>n</sup>.',
        notes: [
          'A subset can be any collection at all. The ones that keep the vector-space structure are ' +
            'the <a href="#subspace">subspaces</a> — every subspace is a subset, but not the other way round.'
        ],
        defZh: '從一個空間裡挑出一部分向量所成的集合：若 W 裡每個向量都在 &#8477;<sup>n</sup> 裡，就說 W 是 &#8477;<sup>n</sup> 的子集合，記作 W &sube; &#8477;<sup>n</sup>。',
        notesZh: [
          '子集合可以是任意一群向量；其中還保有向量空間結構的，才叫<a href="#subspace">子空間</a> &mdash; 子空間都是子集合，反過來不一定。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>subset: 子集合: A group part of vector in the vector space.</p>' },
          {
            label: 'Subsets of ℝ²',
            html: '<p>the line y = x, the line y = x + 1, the unit circle, the single point (2, 3)</p><p>only the first is a subspace</p>'
          }
        ]
      },

      {
        id: 'subspace',
        term: 'Subspace',
        zh: '子空間',
        aliases: ['subspace of R^n', 'W', '子空間', 'closed under addition', 'closed under scalar multiplication'],
        tags: ['ch1.4', 'vectors'],
        def:
          'A non-empty <a href="#subset">subset</a> W of &#8477;<sup>n</sup> that is ' +
          '<a href="#closed-under">closed</a> under <a href="#vector-addition">addition</a> and ' +
          '<a href="#scalar-multiplication">scalar multiplication</a>: if <strong>u</strong> and ' +
          '<strong>v</strong> are in W, so are <strong>u</strong> + <strong>v</strong> and ' +
          'k<strong>u</strong> for every scalar k.',
        notes: [
          'The notes\' picture: a line L&#8321; through the origin is a subspace — ' +
            '<strong>u</strong> + <strong>v</strong> and 3<strong>u</strong> stay on it. A parallel line ' +
            'L&#8322; that misses the origin is not — <strong>w</strong> + <strong>s</strong> leaves it.',
          'Quick test: a subspace must contain the <a href="#zero-vector">zero vector</a> (take k = 0). ' +
            'A set that misses the <a href="#origin">origin</a> is ruled out at once — that is exactly what ' +
            'goes wrong with L&#8322;.',
          'The notes add that all subspaces of &#8477;<sup>n</sup> have the same features as a vector ' +
            'space: every rule for adding and scaling in &#8477;<sup>n</sup> still holds inside W.',
          'In &#8477;³ the subspaces are {<strong>0</strong>}, lines through the origin, planes through the ' +
            'origin, and &#8477;³ itself.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 的一個非空<a href="#subset">子集合</a> W，對<a href="#vector-addition">加法</a>與<a href="#scalar-multiplication">純量乘法</a>' +
          '<a href="#closed-under">封閉</a>：只要 <strong>u</strong>、<strong>v</strong> 在 W 裡，<strong>u</strong> + <strong>v</strong> 和任意 k<strong>u</strong> 也都在 W 裡。',
        notesZh: [
          '筆記的圖：通過原點的直線 L&#8321; 是子空間 &mdash; <strong>u</strong> + <strong>v</strong>、3<strong>u</strong> 都還在線上；' +
            '和它平行但不過原點的 L&#8322; 就不是 &mdash; <strong>w</strong> + <strong>s</strong> 跑出去了。',
          '快速檢查：子空間一定包含<a href="#zero-vector">零向量</a>（取 k = 0）。不經過<a href="#origin">原點</a>的集合馬上出局 &mdash; L&#8322; 就是敗在這裡。',
          '筆記補充：&#8477;<sup>n</sup> 的所有子空間都具有向量空間的性質 &mdash; &#8477;<sup>n</sup> 裡加法與伸縮的規則在 W 裡照樣成立。',
          '&#8477;³ 的子空間只有：{<strong>0</strong>}、通過原點的直線、通過原點的平面、&#8477;³ 本身。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>subspace: 子空間: subset that is closed（封閉）under addition and scalar multiplication.</p>' +
              '<p>L&#8321;: <strong>u</strong> + <strong>v</strong> still in L&#8321;, <strong>u</strong> &times; 3 still in L&#8321; &rArr; L&#8321; is subspace of &#8477;<sup>n</sup></p>' +
              '<p>L&#8322;: <strong>w</strong> + <strong>s</strong> isn\'t in L&#8322; &rArr; L&#8322; is not subspace of &#8477;<sup>n</sup></p>' +
              '<p>* All subspaces of &#8477;<sup>n</sup> have the same features of vector space.</p>'
          },
          {
            label: 'Textbook example in the notes: W = {(a, b, a + b)} in ℝ³',
            html:
              '<p>(a, b, a + b) + (c, d, c + d) = (a + c, b + d, (a + c) + (b + d)) &isin; W</p>' +
              '<p>k(a, b, a + b) = (ka, kb, ka + kb) &isin; W</p>' +
              '<p>&rArr; W is a subspace of &#8477;³ &nbsp; e.g. (2, 5, 7) &isin; W, (2, 5, 9) &notin; W</p>'
          }
        ],
        figure: {
          caption: 'L₁ passes through O and keeps its sums; L₂ misses O, and w + s falls off it',
          svg:
            '<svg viewBox="0 0 300 180" role="img" aria-label="a line through the origin is a subspace, a shifted line is not">' +
            axes(130, 110, 12, 290, 176, 4) +
            '<path d="M20 176 L280 20" stroke="var(--accent)" stroke-width="2.2" opacity=".55"/>' +
            '<path d="M20 131 L230 5" stroke="currentColor" stroke-width="1.8" opacity=".55"/>' +
            arrow(130, 110, 200, 68, ACC) +
            arrow(130, 110, 100, 83, INK) +
            arrow(130, 110, 170, 41, INK) +
            arrow(130, 110, 140, 14, INK, true) +
            '<circle cx="140" cy="14" r="4" fill="var(--bg-elev)" stroke="currentColor" stroke-width="1.5"/>' +
            LBL +
            '<text x="272" y="42" fill="var(--accent)" font-style="normal" font-weight="700">L&#8321;</text>' +
            '<text x="22" y="122" font-style="normal" font-weight="700">L&#8322;</text>' +
            '<text x="206" y="82" fill="var(--accent)" font-weight="700">u</text>' +
            '<text x="92" y="80" text-anchor="end" font-weight="700">w</text>' +
            '<text x="178" y="44" font-weight="700">s</text>' +
            '<text x="148" y="16">w + s</text>' +
            '<text x="136" y="124" font-style="normal">O</text></g></svg>'
        }
      },

      {
        id: 'closed-under',
        term: 'Closed under an operation',
        zh: '封閉',
        zhAlt: '封閉性',
        aliases: ['closed', 'closure', '封閉性', 'closed under addition'],
        tags: ['ch1.4', 'vectors'],
        def:
          'A set is <strong>closed</strong> under an operation when doing that operation to members ' +
          'of the set always gives another member — you can never leave the set that way.',
        notes: [
          'The notes write 封閉 above "closed" in the definition of <a href="#subspace">subspace</a>; ' +
            'the general meaning is filled in here.',
          'For a subspace the two operations are <a href="#vector-addition">addition</a> and ' +
            '<a href="#scalar-multiplication">scalar multiplication</a>.',
          'Everyday example: the whole numbers are closed under addition (whole + whole = whole) ' +
            'but not under division (1 &divide; 2 is not whole).'
        ],
        defZh: '對某種運算<strong>封閉</strong>，是指集合裡的成員做完這個運算，結果一定還在集合裡 &mdash; 用這個運算永遠跑不出去。',
        notesZh: [
          '筆記在<a href="#subspace">子空間</a>定義的「closed」上方寫了「封閉」；一般的意思是這裡補上的。',
          '對子空間來說，這兩種運算是<a href="#vector-addition">加法</a>與<a href="#scalar-multiplication">純量乘法</a>。',
          '生活化的例子：整數對加法封閉（整數 + 整數 = 整數），對除法不封閉（1 &divide; 2 不是整數）。'
        ],
        examples: [
          {
            label: 'Closed or not',
            html:
              '<p>the line y = 2x: (1, 2) + (3, 6) = (4, 8), still on it &rArr; closed under addition</p>' +
              '<p>the line y = 2x + 1: (0, 1) + (1, 3) = (1, 4), not on it &rArr; not closed</p>'
          }
        ]
      }
    ]
  });
})();
