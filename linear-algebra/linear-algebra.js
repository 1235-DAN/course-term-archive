/* ==========================================================================
   linear-algebra.js — 線性代數 term data
   Source notes: 線性代數9_7-9_8.pdf (ch1.1), 線性代數9_9.pdf (ch1.2),
                 線性代數9_14.pdf (ch1.2 homogeneous systems; ch1.3 vectors in Rⁿ;
                                   ch1.4 subsets and subspaces),
                 線性代數9_15.pdf (ch1.4 span, ch1.5 basis)
                 線性代數9_21.pdf (repeats 9_15; adds standard basis, dimension, ch1.6 dot product,
                                 norm, unit vector, normalizing, angle between vectors)
                 線性代數9_22.pdf (ch1.6 Cauchy–Schwarz, orthogonality, distance)
                 線性代數10_5-10_6.pdf (ch2.2 AX = B and solution subspaces; ch2.3 transpose,
                                       symmetric matrix, trace; ch2.4 inverse; the 10/6
                                       transformations have no chapter number — tagged ch2.5)
                 線性代數10_12-10_13.pdf (ch2.5 matrix transformation, orthogonal matrix and
                                         transformation, translation, affine; ch2.6 linear
                                         transformation; ch3.1 determinant, minor, cofactor)
                 線性代數10_14.pdf (ch2.6 the standard matrix derivation — it fills in the
                                   heading the 10/13 page left blank)
                 線性代數10_19.pdf (repeats the 10/14 standard matrix page; adds ch3.2 Theorem 3.2,
                                   singular and nonsingular matrices, determinant arithmetic)
                 線性代數11_3-11_10.pdf (10/20 ch3.3 matrix of cofactors and adjoint; ch3.2 triangular
                                        determinant; 11/3 ch3.3 Cramer's rule; 11/8 ch3.4 eigenvalues;
                                        11/10 ch4.5 row space and rank)
                 線性代數11_15.pdf (extends the 11/10 page with column vectors and the rank conditions;
                                   adds the general vector space, subspace and dependence boxes — those
                                   carry no chapter number, tagged ch4.1 from the textbook — and
                                   ch4.4 basis and dimension)
                 線性代數11_16.pdf (repeats 11/15 p2; adds 11/16 ch4.5 Theorem 4.18 and ch4.6
                                   orthogonal and orthonormal sets and bases)

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
      { file: '線性代數9_14.pdf', label: '線性代數9_14.pdf（ch1.2、ch1.3、ch1.4）' },
      { file: '線性代數9_15.pdf', label: '線性代數9_15.pdf（ch1.4、ch1.5）' },
      { file: '線性代數9_21.pdf', label: '線性代數9_21.pdf（ch1.4–ch1.6）' },
      { file: '線性代數9_22.pdf', label: '線性代數9_22.pdf（ch1.6）' },
      { file: '線性代數10_5-10_6.pdf', label: '線性代數10_5-10_6.pdf（ch2.2、ch2.3、ch2.4、ch2.5）' },
      { file: '線性代數10_12-10_13.pdf', label: '線性代數10_12-10_13.pdf（ch2.5、ch2.6、ch3.1）' },
      { file: '線性代數10_14.pdf', label: '線性代數10_14.pdf（ch2.6）' },
      { file: '線性代數10_19.pdf', label: '線性代數10_19.pdf（ch2.6、ch3.2）' },
      { file: '線性代數11_3-11_10.pdf', label: '線性代數11_3-11_10.pdf（ch3.2、ch3.3、ch3.4、ch4.5）' },
      { file: '線性代數11_15.pdf', label: '線性代數11_15.pdf（ch4.1、ch4.4、ch4.5）' },
      { file: '線性代數11_16.pdf', label: '線性代數11_16.pdf（ch4.4、ch4.5、ch4.6）' }
    ],
    blurb:
      '線性方程組的語言：方程式的零件、矩陣的零件與大小、增廣矩陣與基本列運算、' +
      '消去法的終點 — 簡化列梯形、齊次方程組，向量空間 ℝⁿ 的向量運算、線性組合與子空間，基底、線性獨立與維度，內積、正交與柯西–施瓦茨不等式，矩陣的轉置、反矩陣與平面變換，線性變換與標準矩陣，行列式、餘因子、伴隨矩陣與克拉瑪公式，特徵值與特徵向量，' +
      '以及一般向量空間、rank 與單範正交基底。',

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
        aliases: ['A transpose', '轉置', 'interchange rows and columns'],
        tags: ['ch2.3', 'matrix operations'],
        def:
          'The matrix obtained by <strong>interchanging rows and columns</strong>: the (i, j) entry of ' +
          '<span class="mono">A&#7488;</span> is the (j, i) entry of A. An ' +
          '<span class="mono">m &times; n</span> matrix transposes to ' +
          '<span class="mono">n &times; m</span>.',
        notes: [
          '<strong>Properties</strong> (textbook Theorem 2.4), for matrices whose sizes allow the ' +
            'operations and a scalar c: &#9312; (A + B)&#7488; = A&#7488; + B&#7488;; ' +
            '&#9313; (cA)&#7488; = cA&#7488;; &#9314; <strong>(AB)&#7488; = B&#7488;A&#7488;</strong> ' +
            '(the order reverses — the one the notes highlight); &#9315; (A&#7488;)&#7488; = A.',
          'Why the order reverses in &#9314;: for the sizes to match, an m&times;n times n&times;p ' +
            'becomes p&times;n times n&times;m.',
          'The earlier notes already used it to write a column vector as ' +
            '<span class="mono">[1 3 &minus;2]&#7488;</span>.'
        ],
        defZh:
          '把<strong>列與行互換</strong>得到的矩陣：A&#7488; 的 (i, j) 位置就是 A 的 (j, i) 位置。' +
          'm &times; n 轉置後變成 n &times; m。',
        notesZh: [
          '<strong>性質</strong>（課本 Theorem 2.4），在大小允許運算、c 為純量時：&#9312; (A + B)&#7488; = A&#7488; + B&#7488;；' +
            '&#9313; (cA)&#7488; = cA&#7488;；&#9314; <strong>(AB)&#7488; = B&#7488;A&#7488;</strong>（順序會反過來，筆記特別畫了螢光）；&#9315; (A&#7488;)&#7488; = A。',
          '&#9314; 為什麼要反過來：大小才對得上 &mdash; m&times;n 乘 n&times;p，轉置後變成 p&times;n 乘 n&times;m。',
          '之前的筆記已經用它把直的向量寫成 [1 3 &minus;2]&#7488;。'
        ],
        examples: [
          {
            label: 'From the notes (Theorem 2.4)',
            html:
              '<p>transpose: interchange rows and columns</p>' +
              '<p>1. (A + B)&#7488; = A&#7488; + B&#7488; &nbsp; 2. (cA)&#7488; = cA&#7488;</p>' +
              '<p>3. (AB)&#7488; = B&#7488;A&#7488; &nbsp; 4. (A&#7488;)&#7488; = A</p>'
          },
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


      {
        id: 'symmetric-matrix',
        term: 'Symmetric matrix',
        abbr: 'A = A&#7488;',
        zh: '對稱矩陣',
        aliases: ['symmetric', '對稱', 'equal to its transpose'],
        tags: ['ch2.3', 'matrix operations'],
        def:
          'A matrix that is <strong>equal to its own ' +
          '<a href="#transpose">transpose</a></strong>: ' +
          '<span class="mono">A = A&#7488;</span>.',
        notes: [
          'Only a <a href="#square-matrix">square matrix</a> can be symmetric &mdash; otherwise A and ' +
            'A&#7488; do not even have the same size.',
          'Entry-wise the condition is <span class="mono">a<sub>ij</sub> = a<sub>ji</sub></span>: the ' +
            'matrix is a mirror image of itself across the main diagonal. The diagonal entries ' +
            'themselves are unconstrained.',
          'A&#7488;A and AA&#7488; are symmetric for <em>every</em> matrix A, because ' +
            '(A&#7488;A)&#7488; = A&#7488;(A&#7488;)&#7488; = A&#7488;A by property &#9314; of the transpose.'
        ],
        defZh:
          '和自己的<a href="#transpose">轉置矩陣</a>相等的矩陣：A = A&#7488;。',
        notesZh: [
          '只有<a href="#square-matrix">方陣</a>可能對稱 &mdash; 不是方陣的話 A 跟 A&#7488; 連大小都不一樣。',
          '用元素寫就是 a<sub>ij</sub> = a<sub>ji</sub>：整個矩陣以主對角線為鏡面對稱，對角線上的元素本身沒有限制。',
          '對<em>任何</em>矩陣 A，A&#7488;A 與 AA&#7488; 都是對稱的，因為由轉置性質 &#9314; 可得 (A&#7488;A)&#7488; = A&#7488;(A&#7488;)&#7488; = A&#7488;A。（這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Symmetric matrix: a matrix that is equal to its transpose &nbsp; A = A&#7488;</p>'
          },
          {
            label: 'Symmetric and not symmetric',
            html:
              '<p>' +
              M([
                [1, 2],
                [2, 3]
              ]) +
              ' is symmetric; ' +
              M([
                [1, 2],
                [5, 3]
              ]) +
              ' is not (2 &ne; 5).</p>'
          }
        ]
      },

      {
        id: 'trace',
        term: 'Trace of a matrix',
        abbr: 'tr(A)',
        zh: '跡',
        zhAlt: '跡數／對角線和',
        aliases: ['trace', 'tr', '跡數', 'diagonal sum'],
        tags: ['ch2.3', 'matrix operations'],
        def:
          'The <strong>sum of the diagonal elements</strong> of a ' +
          '<a href="#square-matrix">square matrix</a>: ' +
          '<span class="mono">tr(A) = a&#8321;&#8321; + a&#8322;&#8322; + &hellip; + a<sub>nn</sub></span>.',
        notes: [
          '<strong>Properties</strong> (textbook Theorem 2.5), for A and B of the same size and a ' +
            'scalar c: &#9312; tr(A + B) = tr(A) + tr(B); &#9313; <strong>tr(AB) = tr(BA)</strong>; ' +
            '&#9314; tr(cA) = c&middot;tr(A); &#9315; tr(A&#7488;) = tr(A).',
          'Defined only for a square matrix &mdash; a non-square matrix has no "main diagonal" to add up.',
          '&#9313; is the surprising one: AB and BA are usually different matrices (and can even be ' +
            'different sizes), yet their traces always agree. &#9315; holds because transposing moves ' +
            'a<sub>ij</sub> to a<sub>ji</sub> and leaves the diagonal alone.'
        ],
        defZh:
          '<a href="#square-matrix">方陣</a><strong>對角線元素的總和</strong>：tr(A) = a&#8321;&#8321; + a&#8322;&#8322; + … + a<sub>nn</sub>。',
        notesZh: [
          '<strong>性質</strong>（課本 Theorem 2.5），A、B 同大小、c 為純量：&#9312; tr(A + B) = tr(A) + tr(B)；' +
            '&#9313; <strong>tr(AB) = tr(BA)</strong>；&#9314; tr(cA) = c&middot;tr(A)；&#9315; tr(A&#7488;) = tr(A)。',
          '只對方陣有定義 &mdash; 不是方陣就沒有「主對角線」可以加。',
          '&#9313; 最反直覺：AB 和 BA 通常不是同一個矩陣（大小都可能不同），跡卻一定相等。' +
            '&#9315; 成立是因為轉置只是把 a<sub>ij</sub> 搬到 a<sub>ji</sub>，對角線原地不動。（這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes (Theorem 2.5)',
            html:
              '<p>Trace of matrix: sum of diagonal elements of a square matrix.</p>' +
              '<p>1. tr(A + B) = tr(A) + tr(B) &nbsp; 2. tr(AB) = tr(BA)</p>' +
              '<p>3. tr(cA) = c&middot;tr(A) &nbsp; 4. tr(A&#7488;) = tr(A)</p>'
          },
          {
            label: 'Computing one',
            html:
              '<p>tr' +
              M([
                [1, 5, 7],
                [2, 3, 0],
                [4, 6, 8]
              ]) +
              ' = 1 + 3 + 8 = 12</p>'
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
          'The number of pivots is the <strong><a href="#rank">rank</a></strong> of the matrix. For a consistent ' +
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
          '主元的個數就是矩陣的 <strong><a href="#rank">rank</a></strong>（秩）。方程組有解時，rank = 變數個數 &rArr; 唯一解；' +
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
        zhAlt: '張成／展開（筆記用「展開」）',
        aliases: ['spanned', 'span{}', '生成', '展開', 'spans', 'plane through the origin'],
        tags: ['ch1.4', 'vectors'],
        def:
          'The set of <strong>all</strong> <a href="#linear-combination">linear combinations</a> of ' +
          'some vectors <strong>u</strong>&#8321;, &hellip;, <strong>u</strong><sub>k</sub>, written ' +
          'span{<strong>u</strong>&#8321;, &hellip;, <strong>u</strong><sub>k</sub>}. It is always a ' +
          '<a href="#subspace">subspace</a>; if it equals W, the vectors are said to ' +
          '<strong>span</strong> W.',
        notes: [
          'The notes put it as "all linear combination of subspace span W": the set of all ' +
            'linear combinations is a subspace, and the vectors span it.',
          'The textbook example from the previous lecture ends by saying W "is in fact the plane ' +
            'determined by the vectors (1, 0, 1) and (0, 1, 1)" — that plane is their span.',
          'The span of one non-zero vector is a line through the origin; of two vectors not on ' +
            'the same line, a plane through the origin.',
          'Spanning is the first of the two properties of a <a href="#basis">basis</a>.'
        ],
        defZh:
          '一組向量 <strong>u</strong>&#8321;, …, <strong>u</strong><sub>k</sub> 的<strong>所有</strong><a href="#linear-combination">線性組合</a>所成的集合，' +
          '記作 span{<strong>u</strong>&#8321;, …, <strong>u</strong><sub>k</sub>}。它一定是<a href="#subspace">子空間</a>；若它等於 W，就說這些向量<strong>生成</strong>（span）W。',
        notesZh: [
          '筆記的寫法是「all linear combination of subspace span W」：所有線性組合構成一個子空間，這些向量就生成它。筆記把 span 譯作「展開」，常見的譯法是「生成」或「張成」。',
          '上一堂課本例題的結尾說 W「其實就是由 (1, 0, 1) 和 (0, 1, 1) 決定的平面」&mdash; 那個平面就是它們的生成空間。',
          '一個非零向量生成一條通過原點的直線；兩個不共線的向量生成一個通過原點的平面。',
          '「生成」是<a href="#basis">基底</a>兩個性質中的第一個。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>span（展開）: all linear combination of subspace span W.</p>' },
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
            'origin, and &#8477;³ itself.',
          'The 11/15 notes restate the definition for a general <a href="#vector-space">vector space</a> ' +
            'V — a non-empty subset U of V closed under both operations, which "inherits the other vector ' +
            'space properties from V" — and record the zero-vector test as textbook <strong>Theorem ' +
            '4.2</strong>.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 的一個非空<a href="#subset">子集合</a> W，對<a href="#vector-addition">加法</a>與<a href="#scalar-multiplication">純量乘法</a>' +
          '<a href="#closed-under">封閉</a>：只要 <strong>u</strong>、<strong>v</strong> 在 W 裡，<strong>u</strong> + <strong>v</strong> 和任意 k<strong>u</strong> 也都在 W 裡。',
        notesZh: [
          '筆記的圖：通過原點的直線 L&#8321; 是子空間 &mdash; <strong>u</strong> + <strong>v</strong>、3<strong>u</strong> 都還在線上；' +
            '和它平行但不過原點的 L&#8322; 就不是 &mdash; <strong>w</strong> + <strong>s</strong> 跑出去了。',
          '快速檢查：子空間一定包含<a href="#zero-vector">零向量</a>（取 k = 0）。不經過<a href="#origin">原點</a>的集合馬上出局 &mdash; L&#8322; 就是敗在這裡。',
          '筆記補充：&#8477;<sup>n</sup> 的所有子空間都具有向量空間的性質 &mdash; &#8477;<sup>n</sup> 裡加法與伸縮的規則在 W 裡照樣成立。',
          '&#8477;³ 的子空間只有：{<strong>0</strong>}、通過原點的直線、通過原點的平面、&#8477;³ 本身。',
          '11/15 的筆記把定義重述成一般<a href="#vector-space">向量空間</a> V 的版本 &mdash; ' +
            'V 的非空子集 U 對兩種運算封閉，並且「從 V 繼承其他向量空間性質」&mdash; ' +
            '同時把零向量的檢查記成課本 <strong>Theorem 4.2</strong>。'
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
      },

      /* ============================================ ch1.5 — basis */
      {
        id: 'basis',
        term: 'Basis',
        zh: '基底',
        aliases: ['bases', 'basis of R^3', '基', 'two important properties'],
        tags: ['ch1.5', 'basis'],
        def:
          'A set of vectors in a space that has two properties: <strong>&#9312; it spans the ' +
          'space</strong> — every vector can be written as a <a href="#linear-combination">linear ' +
          'combination</a> of them — and <strong>&#9313; it is ' +
          '<a href="#linear-independence">linearly independent</a></strong> — none of them can be ' +
          'built from the others.',
        notes: [
          'The notes state it for &#8477;³: vectors in &#8477;³ form a basis of &#8477;³ when they ' +
            '<a href="#span">span</a> &#8477;³ and are linearly independent.',
          'Why both are needed: spanning means every vector can be made <em>at least one way</em>; ' +
            'independence means <em>at most one way</em>. Together, every vector has exactly one set ' +
            'of weights.',
          'Every basis of &#8477;³ has exactly 3 vectors — that count is the ' +
            '<a href="#dimension">dimension</a>. Too few cannot span; too many cannot be independent.',
          'The simplest one is the <a href="#standard-basis">standard basis</a>.',
          'The 11/15 notes generalise it to any <a href="#vector-space">vector space</a> V under ch4.4, ' +
            'spell out the uniqueness ("each vector in V is <strong>uniquely</strong> a linear ' +
            'combination of the vectors in a basis") and add the shortcut for checking one — see ' +
            '<a href="#basis-tests">testing for a basis</a>. A basis that is also ' +
            '<a href="#orthogonal-set">orthogonal</a> is better still: see ' +
            '<a href="#orthonormal-basis">orthonormal basis</a>.'
        ],
        defZh:
          '空間裡具備兩個性質的一組向量：<strong>&#9312; 生成整個空間</strong> &mdash; 每個向量都能寫成它們的' +
          '<a href="#linear-combination">線性組合</a>；<strong>&#9313; <a href="#linear-independence">線性獨立</a></strong> &mdash; 其中沒有一個能由其他幾個組出來。',
        notesZh: [
          '筆記以 &#8477;³ 為例：&#8477;³ 中的向量若能<a href="#span">生成</a> &#8477;³ 又線性獨立，就是 &#8477;³ 的基底。',
          '為什麼兩個都要：「生成」保證每個向量<em>至少有一種</em>組法；「獨立」保證<em>至多一種</em>。合起來，每個向量的權重恰好只有一組。',
          '&#8477;³ 的每組基底都剛好 3 個向量 &mdash; 這個數就是<a href="#dimension">維度</a>。太少生成不了，太多就不可能獨立。',
          '最簡單的是<a href="#standard-basis">標準基底</a>。',
          '11/15 的筆記在 ch4.4 把它推廣到任何<a href="#vector-space">向量空間</a> V，明寫出唯一性' +
            '（「V 中每個向量都<strong>唯一</strong>是基底向量的線性組合」），並補上驗證基底的捷徑 &mdash; ' +
            '見<a href="#basis-tests">基底的判別</a>。基底若同時<a href="#orthogonal-set">正交</a>更好用：' +
            '見<a href="#orthonormal-basis">單範正交基底</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Basis: Vectors in &#8477;³ form a basis of &#8477;³ and have two important properties.</p>' +
              '<p>&#9312; They span &#8477;³. They can be write an arbitrary vector as a linear combination.</p>' +
              '<p>&#9313; They are linearly independent which can\'t be decompose.</p>'
          },
          {
            label: 'A basis other than the standard one',
            html:
              '<p>(1, 1, 0), (0, 1, 1), (1, 0, 1)</p>' +
              '<p>(2, 3, 1) = 2(1, 1, 0) + 1(0, 1, 1) + 0(1, 0, 1) — and no other weights work</p>'
          },
          {
            label: 'Not a basis of ℝ³',
            html:
              '<p>(1, 0, 0), (0, 1, 0): only two vectors, cannot span &#8477;³</p>' +
              '<p>(1, 0, 0), (0, 1, 0), (1, 1, 0): dependent, the third is the sum of the first two</p>'
          }
        ]
      },

      {
        id: 'linear-independence',
        term: 'Linear independence',
        zh: '線性獨立',
        zhAlt: '線性無關',
        aliases: ['linearly independent', 'linearly dependent', 'linear dependence', 'dependent', '線性相依', 'decompose'],
        tags: ['ch1.5', 'basis'],
        def:
          'Vectors <strong>v</strong>&#8321;, &hellip;, <strong>v</strong><sub>k</sub> are ' +
          '<strong>linearly independent</strong> when the only way to get ' +
          '<span class="mono">c&#8321;v&#8321; + &hellip; + c<sub>k</sub>v<sub>k</sub> = 0</span> is ' +
          'c&#8321; = &hellip; = c<sub>k</sub> = 0. Equivalently, none of them is a linear combination ' +
          'of the others. Otherwise they are <strong>linearly dependent</strong>.',
        notes: [
          'The notes say independent vectors "can\'t be decomposed": none of them can be broken down ' +
            'into the others. The 9/21 notes add the test in grey: if a[1,0,0] + b[0,1,0] + c[0,0,1] = ' +
            '[0,0,0] has only the solution a = 0, b = 0, c = 0, the vectors are linearly independent.',
          'How to test: solve c&#8321;<strong>v</strong>&#8321; + &hellip; + c<sub>k</sub><strong>v</strong><sub>k</sub> = ' +
            '<strong>0</strong>, a <a href="#homogeneous-system">homogeneous system</a> in the c\'s. Only ' +
            'the <a href="#trivial-solution">trivial solution</a> &rArr; independent; a nontrivial one ' +
            '&rArr; dependent.',
          'Quick checks: two vectors are dependent exactly when one is a multiple of the other; a set ' +
            'containing the <a href="#zero-vector">zero vector</a> is always dependent; more than n ' +
            'vectors in &#8477;<sup>n</sup> are always dependent.',
          'The 11/15 notes add two more, for any <a href="#vector-space">vector space</a>: ' +
            '<strong>any set containing a dependent set is itself dependent</strong>, and the definition ' +
            'restated — a set of two or more vectors is dependent if and only if one of them is a linear ' +
            'combination of the others. The easy way round is ' +
            '<a href="#orthogonal-set">Theorem 4.19</a>: an orthogonal set of non-zero vectors is ' +
            'independent for free.'
        ],
        defZh:
          '向量 <strong>v</strong>&#8321;, …, <strong>v</strong><sub>k</sub> <strong>線性獨立</strong>，是指要讓 ' +
          'c&#8321;v&#8321; + … + c<sub>k</sub>v<sub>k</sub> = 0，唯一的方法是 c&#8321; = … = c<sub>k</sub> = 0。' +
          '等價地說：沒有一個能寫成其他幾個的線性組合。不是這樣就叫<strong>線性相依</strong>。',
        notesZh: [
          '筆記的說法是獨立的向量「can\'t be decompose（不能被拆解）」：沒有一個能拆成其他向量的組合。' +
            '9/21 的筆記用灰字補了檢驗法：若 a[1,0,0] + b[0,1,0] + c[0,0,1] = [0,0,0] 只有 a = 0、b = 0、c = 0 這組解，這些向量就線性獨立。',
          '檢驗法：解 c&#8321;<strong>v</strong>&#8321; + … + c<sub>k</sub><strong>v</strong><sub>k</sub> = <strong>0</strong>，這是以 c 為未知數的<a href="#homogeneous-system">齊次方程組</a>。' +
            '只有<a href="#trivial-solution">零解</a> &rArr; 獨立；有非零解 &rArr; 相依。',
          '快速判斷：兩個向量相依，恰好是其中一個是另一個的倍數；含<a href="#zero-vector">零向量</a>的集合一定相依；&#8477;<sup>n</sup> 裡超過 n 個向量一定相依。',
          '11/15 的筆記又補了兩條，對任何<a href="#vector-space">向量空間</a>都成立：' +
            '<strong>任何包含相依集合的集合本身也相依</strong>；以及定義的重述 &mdash; ' +
            '兩個以上向量的集合相依，若且唯若其中一個是其他向量的線性組合。' +
            '反過來最省事的是 <a href="#orthogonal-set">Theorem 4.19</a>：非零向量的正交集直接就是獨立的。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>&#9313; They are linearly independent which can\'t be decompose.</p>' +
              '<p>e.g. a[1,0,0] + b[0,1,0] + c[0,0,1] = [0,0,0]</p>' +
              '<p>if only a = 0, b = 0, c = 0 solution, the vectors linearly independent.</p>'
          },
          {
            label: 'Independent or not',
            html:
              '<p>(1, 0, 0), (0, 1, 0), (0, 0, 1) &rarr; independent</p>' +
              '<p>(1, 2), (2, 4) &rarr; dependent: (2, 4) = 2(1, 2)</p>' +
              '<p>(1, 0, 0), (0, 1, 0), (1, 1, 0) &rarr; dependent: 1&middot;v&#8321; + 1&middot;v&#8322; &minus; 1&middot;v&#8323; = 0</p>'
          }
        ]
      },

      {
        id: 'standard-basis',
        term: 'Standard basis',
        abbr: 'e&#8321;, e&#8322;, e&#8323;',
        zh: '標準基底',
        aliases: ['e1', 'e2', 'e3', 'unit vectors', 'i j k', '單位向量'],
        tags: ['ch1.5', 'basis'],
        def:
          'The <a href="#basis">basis</a> of &#8477;³ made of the unit vectors along the axes: ' +
          '<span class="mono">e&#8321; = (1, 0, 0)</span>, <span class="mono">e&#8322; = (0, 1, 0)</span>, ' +
          '<span class="mono">e&#8323; = (0, 0, 1)</span>. In &#8477;<sup>n</sup> it is ' +
          'e&#8321;, &hellip;, e<sub>n</sub>, each with a single 1.',
        notes: [
          'The 9/21 notes paste the textbook\'s "Standard Basis of &#8477;<sup>n</sup>": the two ' +
            'basis properties can be checked directly. (x, y, z) = x e&#8321; + y e&#8322; + z e&#8323;, so ' +
            'they <a href="#span">span</a>; and p e&#8321; + q e&#8322; + r e&#8323; = (0, 0, 0) only for ' +
            'p = q = r = 0, so they are <a href="#linear-independence">independent</a>.',
          'With this basis the weights are just the <a href="#component">components</a>.',
          'Physics writes the same three vectors as i, j, k.'
        ],
        defZh:
          '&#8477;³ 中沿各座標軸的單位向量組成的<a href="#basis">基底</a>：e&#8321; = (1, 0, 0)、e&#8322; = (0, 1, 0)、e&#8323; = (0, 0, 1)。' +
          '在 &#8477;<sup>n</sup> 中就是 e&#8321;, …, e<sub>n</sub>，每個都只有一個 1。',
        notesZh: [
          '9/21 的筆記貼了課本的「Standard Basis of &#8477;<sup>n</sup>」：基底的兩個性質可以直接驗證。' +
            '(x, y, z) = x e&#8321; + y e&#8322; + z e&#8323;，所以能<a href="#span">生成</a>；p e&#8321; + q e&#8322; + r e&#8323; = (0, 0, 0) 只有 p = q = r = 0，所以<a href="#linear-independence">線性獨立</a>。',
          '用這組基底時，權重就是向量的<a href="#component">分量</a>。',
          '物理課把同樣三個向量寫成 i、j、k。'
        ],
        examples: [
          {
            label: 'From the notes (textbook slide)',
            html:
              '<p>Consider the vectors (1, 0, 0), (0, 1, 0), (0, 0, 1) in &#8477;³.</p>' +
              '<p>(i) They span &#8477;³: (x, y, z) = x(1, 0, 0) + y(0, 1, 0) + z(0, 0, 1)</p>' +
              '<p>(ii) They are linearly independent: p(1, 0, 0) + q(0, 1, 0) + r(0, 0, 1) = (0, 0, 0) ' +
              'has the unique solution p = 0, q = 0, r = 0</p>'
          },
          { label: 'Weights = components', html: '<p>(4, &minus;1, 7) = 4e&#8321; &minus; 1e&#8322; + 7e&#8323;</p>' }
        ],
        figure: {
          caption: 'e₁, e₂, e₃ point one unit along the x-, y- and z-axes',
          svg:
            '<svg viewBox="0 0 300 170" role="img" aria-label="the standard basis vectors of R3">' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".45">' +
            '<path d="M130 110 L60 166"/><path d="M130 110 H285"/><path d="M130 110 V8"/></g>' +
            arrow(130, 110, 90, 142, ACC) +
            arrow(130, 110, 195, 110, ACC) +
            arrow(130, 110, 130, 45, ACC) +
            LBL +
            '<text x="76" y="140" fill="var(--accent)" font-weight="700">e&#8321;</text>' +
            '<text x="190" y="128" fill="var(--accent)" font-weight="700">e&#8322;</text>' +
            '<text x="138" y="52" fill="var(--accent)" font-weight="700">e&#8323;</text>' +
            '<text x="56" y="162" font-style="normal">x</text>' +
            '<text x="280" y="124" font-style="normal">y</text>' +
            '<text x="138" y="16" font-style="normal">z</text></g></svg>'
        }
      },

      {
        id: 'dimension',
        term: 'Dimension',
        abbr: 'dim',
        zh: '維度',
        zhAlt: '維數',
        aliases: ['dim', 'n-dimensional', 'n維', '維'],
        tags: ['ch1.5', 'basis'],
        def:
          'The number of vectors in a <a href="#basis">basis</a>. Every basis of the same space has ' +
          'the same number of vectors, so this is well defined: ' +
          '<span class="mono">dim &#8477;<sup>n</sup> = n</span>.',
        notes: [
          'The notes: the <a href="#standard-basis">standard basis</a> {[1,0,…,0], [0,1,…,0], …, ' +
            '[0,…,0,1]} has n vectors, so the dimension of &#8477;<sup>n</sup> is n — matching the ' +
            '"n 維度" (n dimensions) on the <a href="#vector-space-rn">vector space</a> card.',
          'Subspaces of &#8477;³ by dimension: {<strong>0</strong>} has 0, a line through the origin 1, ' +
            'a plane through the origin 2, &#8477;³ itself 3.',
          'In a space of dimension n, n independent vectors automatically span, and n spanning vectors ' +
            'are automatically independent — you only need to check one property.',
          'The 11/15 notes restate this for a general <a href="#vector-space">vector space</a> V under ' +
            'ch4.4 and turn it into a rule: see <a href="#basis-tests">testing for a basis</a>. The same ' +
            'page also notes that an independent set of fewer than n vectors can always be extended to a ' +
            'basis of V.'
        ],
        defZh:
          '<a href="#basis">基底</a>裡向量的個數。同一個空間的每組基底個數都一樣，所以這個數有明確定義：dim &#8477;<sup>n</sup> = n。',
        notesZh: [
          '筆記：<a href="#standard-basis">標準基底</a> {[1,0,…,0], [0,1,…,0], …, [0,…,0,1]} 有 n 個向量，所以 &#8477;<sup>n</sup> 的維度是 n &mdash; 和<a href="#vector-space-rn">向量空間</a>卡上的「n 維度」一致。',
          '&#8477;³ 的子空間依維度分：{<strong>0</strong>} 是 0 維、通過原點的直線 1 維、通過原點的平面 2 維、&#8477;³ 本身 3 維。',
          '在 n 維空間裡，n 個獨立的向量自動能生成，n 個能生成的向量也自動獨立 &mdash; 只要檢查其中一個性質就好。',
          '11/15 的筆記在 ch4.4 把這件事重述成一般<a href="#vector-space">向量空間</a> V 的版本，並寫成一條規則：' +
            '見<a href="#basis-tests">基底的判別</a>。同一頁也提到，向量數少於 n 的獨立集合一定可以擴充成 V 的基底。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Dimension (&#8477;<sup>n</sup>): The standard basis {[1,0,…,0], [0,1,…,0], …, [0,…,1]} ' +
              'of n vectors. The dimension of &#8477;<sup>n</sup> is n</p>'
          },
          {
            label: 'The W example',
            html:
              '<p>W = span{(1, 0, 1), (0, 1, 1)}: the two vectors are independent</p>' +
              '<p>&rArr; they form a basis of W, and dim W = 2 (a plane)</p>'
          }
        ]
      },

      /* ============================================ ch1.6 — dot product */
      {
        id: 'dot-product',
        term: 'Dot product',
        abbr: 'u · v',
        zh: '內積',
        zhAlt: '點積',
        aliases: ['inner product', 'scalar product', 'dot', '點積', '純量積'],
        tags: ['ch1.6', 'dot product'],
        def:
          'For <strong>u</strong> = (a&#8321;, &hellip;, a<sub>n</sub>) and <strong>v</strong> = ' +
          '(b&#8321;, &hellip;, b<sub>n</sub>) in &#8477;<sup>n</sup>, ' +
          '<span class="mono">u · v = a&#8321;b&#8321; + a&#8322;b&#8322; + &hellip; + a<sub>n</sub>b<sub>n</sub></span>: ' +
          'multiply matching components and add. The answer is a <strong>real number</strong>, not a vector.',
        notes: [
          'Properties (from the notes, for <strong>u</strong>, <strong>v</strong>, <strong>w</strong> in ' +
            '&#8477;<sup>n</sup> and a scalar c): &#9312; u · v = v · u; &#9313; (u + v) · w = u · w + v · w; ' +
            '&#9314; cu · v = c(u · v) = u · cv; &#9315; u · u ≥ 0, and u · u = 0 only when u = <strong>0</strong>.',
          'Property &#9315; is what lets u · u serve as a squared length — see ' +
            '<a href="#norm">norm</a>.',
          'u · v = 0 means the vectors are perpendicular — <a href="#orthogonal">orthogonal</a>, e.g. (1, 2) · (2, &minus;1) = 0 ' +
            '(the 9/22 notes name it).',
          'Both vectors must be in the same &#8477;<sup>n</sup>; the dot product of a vector in &#8477;² ' +
            'with one in &#8477;³ is undefined.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 中 <strong>u</strong> = (a&#8321;, …, a<sub>n</sub>)、<strong>v</strong> = (b&#8321;, …, b<sub>n</sub>) 的內積是 ' +
          'u · v = a&#8321;b&#8321; + a&#8322;b&#8322; + … + a<sub>n</sub>b<sub>n</sub>：對應分量相乘再相加。結果是一個<strong>實數</strong>，不是向量。',
        notesZh: [
          '性質（筆記）：&#9312; u · v = v · u；&#9313; (u + v) · w = u · w + v · w；&#9314; cu · v = c(u · v) = u · cv；&#9315; u · u ≥ 0，且 u · u = 0 若且唯若 u = <strong>0</strong>。',
          '性質 &#9315; 讓 u · u 可以當作「長度的平方」，見<a href="#norm">範數</a>。',
          'u · v = 0 代表兩向量互相垂直，即<a href="#orthogonal">正交</a>，例如 (1, 2) · (2, &minus;1) = 0。',
          '兩個向量必須在同一個 &#8477;<sup>n</sup>；&#8477;² 和 &#8477;³ 的向量不能做內積。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Dot product（內積）: u = [a&#8321;, a&#8322;, …, a<sub>n</sub>], v = [b&#8321;, b&#8322;, …, b<sub>n</sub>]</p>' +
              '<p>u · v = a&#8321;b&#8321; + a&#8322;b&#8322; + … + a<sub>n</sub>b<sub>n</sub> &rarr; real number</p>'
          },
          {
            label: 'Computing one',
            html: '<p>(1, &minus;2, 3) · (4, 0, &minus;1) = 4 + 0 &minus; 3 = 1</p>'
          }
        ]
      },

      {
        id: 'norm',
        term: 'Norm (length of a vector)',
        abbr: '‖u‖',
        zh: '範數',
        zhAlt: '向量長度／大小',
        aliases: ['norm', 'length', 'magnitude', '長度', '大小'],
        tags: ['ch1.6', 'dot product'],
        def:
          'The <strong>length</strong> (magnitude) of a vector: ' +
          '<span class="mono">‖u‖ = &radic;(u · u) = &radic;(a&#8321;² + &hellip; + a<sub>n</sub>²)</span>. ' +
          'It is Pythagoras&rsquo; theorem extended to n components.',
        notes: [
          'The notes write it for &#8477;²: for <span class="mono">u = [a&#8321;, a&#8322;]</span>, ' +
            '<span class="mono">|u| = &radic;(a&#8321;² + a&#8322;²)</span>. The same formula keeps going ' +
            'for any number of components.',
          'Property &#9315; of the <a href="#dot-product">dot product</a> (u · u ≥ 0) guarantees the ' +
            'square root is of a non-negative number, so every vector has a real length.',
          '‖u‖ = 0 happens only for the <a href="#zero-vector">zero vector</a>, and ' +
            '‖cu‖ = |c| ‖u‖ for a scalar c.'
        ],
        defZh:
          '向量的<strong>長度</strong>（大小）：‖u‖ = &radic;(u · u) = &radic;(a&#8321;² + … + a<sub>n</sub>²)。就是把畢氏定理推廣到 n 個分量。',
        notesZh: [
          '筆記寫的是 &#8477;² 的情形：u = [a&#8321;, a&#8322;] 時 |u| = &radic;(a&#8321;² + a&#8322;²)。分量再多，公式一樣。',
          '<a href="#dot-product">內積</a>的性質 &#9315;（u · u ≥ 0）保證根號裡不會是負數，所以每個向量都有實數長度。',
          '只有<a href="#zero-vector">零向量</a>的 ‖u‖ = 0；另外對純量 c 有 ‖cu‖ = |c| ‖u‖。（這兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Norm (length / Magnitude): u = [a&#8321;, a&#8322;]</p>' +
              '<p>|u| = &radic;(a&#8321;² + a&#8322;²)</p>'
          },
          {
            label: 'Computing one',
            html: '<p>‖(3, 4)‖ = &radic;(9 + 16) = &radic;25 = 5</p>'
          }
        ]
      },

      {
        id: 'unit-vector',
        term: 'Unit vector',
        abbr: '‖u‖ = 1',
        zh: '單位向量',
        aliases: ['unit vector', 'length 1', '單位向量', '長度為一'],
        tags: ['ch1.6', 'dot product'],
        def:
          'A vector whose <a href="#norm">norm</a> is <strong>1</strong>.',
        notes: [
          'A unit vector carries only a <strong>direction</strong> &mdash; the length has been stripped ' +
            'out. That is why every vector splits as ‖u‖ &times; (unit vector in the same direction).',
          'The vectors of the <a href="#standard-basis">standard basis</a> &mdash; (1, 0, 0), (0, 1, 0), ' +
            '(0, 0, 1) &mdash; are the most-used unit vectors.',
          'Being a unit vector is not enough to be <a href="#orthonormal">orthonormal</a>: that also ' +
            'requires the vectors to be mutually <a href="#orthogonal">orthogonal</a>.'
        ],
        defZh: '<a href="#norm">範數</a>等於 <strong>1</strong> 的向量。',
        notesZh: [
          '單位向量只帶<strong>方向</strong>，長度被抽掉了。所以任何向量都可以拆成「‖u‖ × 同方向的單位向量」。（這裡補上的）',
          '<a href="#standard-basis">標準基底</a>的 (1, 0, 0)、(0, 1, 0)、(0, 0, 1) 就是最常用的單位向量。',
          '是單位向量還不足以<a href="#orthonormal">單範正交</a>：還要兩兩<a href="#orthogonal">正交</a>才行。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Unit vector: vector whose norm is 1</p>'
          },
          {
            label: 'Which ones qualify',
            html:
              '<p>(0.6, 0.8): &radic;(0.36 + 0.64) = 1 &#10003;</p>' +
              '<p>(1, 1): &radic;2 ≈ 1.41 &#10007;</p>'
          }
        ]
      },

      {
        id: 'normalizing',
        term: 'Normalizing a vector',
        abbr: 'u / ‖u‖',
        zh: '正規化',
        zhAlt: '單位化',
        aliases: ['normalize', 'normalizing', 'normalization', '正規化', '單位化', '歸一化'],
        tags: ['ch1.6', 'dot product'],
        def:
          'Turning a vector into a <a href="#unit-vector">unit vector</a> by dividing it by its own ' +
          '<a href="#norm">norm</a>: <span class="mono">u / ‖u‖</span>.',
        notes: [
          'The direction is unchanged, because dividing by ‖u‖ is just ' +
            '<a href="#scalar-multiplication">scalar multiplication</a> by the positive number 1/‖u‖.',
          'It works for every vector except the <a href="#zero-vector">zero vector</a>, whose norm is 0 ' +
            '&mdash; and <strong>0</strong> has no direction to keep.',
          'Check it afterwards: ‖u / ‖u‖‖ = ‖u‖ / ‖u‖ = 1.'
        ],
        defZh:
          '把向量除以自己的<a href="#norm">範數</a>，變成<a href="#unit-vector">單位向量</a>：u / ‖u‖。',
        notesZh: [
          '方向不變，因為除以 ‖u‖ 只是乘上正數 1/‖u‖ 的<a href="#scalar-multiplication">純量乘法</a>。',
          '除了<a href="#zero-vector">零向量</a>以外都做得到 &mdash; 零向量的範數是 0，而且它本來就沒有方向。（這兩點是這裡補上的）',
          '做完可以驗算：‖u / ‖u‖‖ = ‖u‖ / ‖u‖ = 1。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Normalizing: let a vector become unit vector</p>'
          },
          {
            label: 'Doing it',
            html:
              '<p>u = (3, 4), ‖u‖ = 5</p>' +
              '<p>u / ‖u‖ = (3/5, 4/5) = (0.6, 0.8)</p>'
          }
        ]
      },

      {
        id: 'angle-between-vectors',
        term: 'Angle between vectors',
        abbr: 'cos θ',
        zh: '向量夾角',
        zhAlt: '夾角',
        aliases: ['angle', 'angle between vector', 'cos theta', '夾角', '角度'],
        tags: ['ch1.6', 'dot product'],
        def:
          'The angle θ between two non-zero vectors <strong>u</strong> and <strong>v</strong>, defined by ' +
          '<span class="mono">cos θ = (u · v) / (‖u‖ ‖v‖)</span>.',
        notes: [
          'The notes immediately bound it: <span class="mono">|cos θ| = |u · v| / (‖u‖ ‖v‖) ≤ 1</span>. ' +
            'That bound is exactly the <a href="#cauchy-schwarz">Cauchy–Schwarz inequality</a>, and it is ' +
            'what makes the definition legal &mdash; a cosine can never leave [&minus;1, 1].',
          'Reading the sign: u · v &gt; 0 gives an acute angle, u · v &lt; 0 an obtuse one, and ' +
            'u · v = 0 gives θ = 90&deg; &mdash; the vectors are <a href="#orthogonal">orthogonal</a>.',
          'Normalizing first makes it simpler still: for <a href="#unit-vector">unit vectors</a> the ' +
            'formula collapses to cos θ = u · v.'
        ],
        defZh:
          '兩個非零向量 <strong>u</strong>、<strong>v</strong> 的夾角 θ，由 cos θ = (u · v) / (‖u‖ ‖v‖) 定義。',
        notesZh: [
          '筆記緊接著寫出界限：|cos θ| = |u · v| / (‖u‖ ‖v‖) ≤ 1。這個界限就是' +
            '<a href="#cauchy-schwarz">柯西–施瓦茨不等式</a>，也正是這個定義合法的理由 &mdash; 餘弦值不可能跑出 [&minus;1, 1]。',
          '看正負號：u · v &gt; 0 是銳角，u · v &lt; 0 是鈍角，u · v = 0 則 θ = 90&deg;，兩向量<a href="#orthogonal">正交</a>。（這裡補上的）',
          '先<a href="#normalizing">正規化</a>會更簡單：對<a href="#unit-vector">單位向量</a>來說公式就剩 cos θ = u · v。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Angles between vector（夾角）: θ is an angle between u and v</p>' +
              '<p>cos θ = (u · v) / (‖u‖ · ‖v‖) &nbsp;&rarr;&nbsp; |cos θ| = |u · v| / (‖u‖ · ‖v‖) ≤ 1</p>'
          },
          {
            label: 'Computing one',
            html:
              '<p>u = (1, 0), v = (1, 1): u · v = 1, ‖u‖ = 1, ‖v‖ = &radic;2</p>' +
              '<p>cos θ = 1/&radic;2 &nbsp;&rarr;&nbsp; θ = 45&deg;</p>'
          }
        ],
        figure: {
          svg:
            '<svg viewBox="0 0 340 150" role="img">' +
            arrow(40, 120, 190, 90, ACC) +
            arrow(40, 120, 130, 30, INK) +
            '<path d="M 84 111 A 45 45 0 0 0 72 88" fill="none" stroke="currentColor" stroke-width="1"/>' +
            LBL +
            '<text x="92" y="101">&#952;</text>' +
            '<text x="196" y="94">u</text>' +
            '<text x="132" y="26">v</text>' +
            '</g>' +
            '</svg>',
          caption: 'θ is read off the dot product: cos θ = (u · v) / (‖u‖ ‖v‖).'
        }
      },

      {
        id: 'cauchy-schwarz',
        term: 'Cauchy–Schwarz inequality',
        zh: '柯西–施瓦茨不等式',
        zhAlt: '柯西不等式',
        aliases: ['cauchy schwarz', 'cauchy-schwartz', 'schwarz', 'cauchy', '柯西', '不等式'],
        tags: ['ch1.6', 'dot product'],
        def:
          'For any vectors <strong>u</strong>, <strong>v</strong> in &#8477;<sup>n</sup>: ' +
          '<span class="mono">|u · v| ≤ ‖u‖ ‖v‖</span>. The <a href="#dot-product">dot product</a> is ' +
          'never bigger in size than the product of the lengths.',
        notes: [
          'The notes write it as |u||v| ≥ |u · v|, using |u| for the <a href="#norm">norm</a>, and ' +
            'rearrange it as |u · v| / (|u||v|) ≤ 1.',
          'That ratio is what makes the <a href="#angle-between-vectors">angle between vectors</a> definable: ' +
            '<span class="mono">cos θ = u · v / (‖u‖ ‖v‖)</span> always lands between &minus;1 and 1.',
          'Equality holds exactly when one vector is a multiple of the other (they lie on one line).'
        ],
        defZh:
          '&#8477;<sup>n</sup> 中任意向量 <strong>u</strong>、<strong>v</strong> 都有 |u · v| ≤ ‖u‖ ‖v‖：<a href="#dot-product">內積</a>的大小永遠不會超過兩個長度的乘積。',
        notesZh: [
          '筆記寫成 |u||v| ≥ |u · v|（用 |u| 表示<a href="#norm">範數</a>），並改寫成 |u · v| / (|u||v|) ≤ 1。',
          '這個比值讓我們能定義兩向量的<a href="#angle-between-vectors">夾角</a>：cos θ = u · v / (‖u‖ ‖v‖) 一定落在 &minus;1 到 1 之間。',
          '等號成立，恰好是其中一個向量是另一個的倍數（兩者共線）時。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Cauchy Schwarz Inequality: |u||v| ≥ |u · v| &nbsp;&rarr;&nbsp; |u · v| / (|u||v|) ≤ 1</p>'
          },
          {
            label: 'Checking it',
            html:
              '<p>u = (1, 2), v = (3, 1): |u · v| = 5</p>' +
              '<p>‖u‖ ‖v‖ = &radic;5 · &radic;10 = &radic;50 ≈ 7.07 ≥ 5 &#10003;</p>'
          }
        ]
      },

      {
        id: 'orthogonal',
        term: 'Orthogonal vectors',
        zh: '正交',
        zhAlt: '互相垂直',
        aliases: ['orthogonal', 'perpendicular', 'u·v = 0', '垂直', '正交'],
        tags: ['ch1.6', 'dot product'],
        def:
          'Two vectors are <strong>orthogonal</strong> — perpendicular — when their ' +
          '<a href="#dot-product">dot product</a> is zero: <span class="mono">u · v = 0</span>.',
        notes: [
          'The notes give only the Chinese: 互相垂直、正交. The dot-product test is filled in here.',
          'The <a href="#zero-vector">zero vector</a> counts as orthogonal to every vector.',
          'For orthogonal vectors the <a href="#vector-pythagorean-theorem">Pythagorean theorem</a> holds: ' +
            '‖u + v‖² = ‖u‖² + ‖v‖².'
        ],
        defZh: '兩向量的<a href="#dot-product">內積</a>為 0（u · v = 0）時，稱為<strong>正交</strong>，也就是互相垂直。',
        notesZh: [
          '筆記只寫了中文「互相垂直、正交」；用內積判斷的方法是這裡補上的。',
          '<a href="#zero-vector">零向量</a>和任何向量都算正交。',
          '正交的向量滿足<a href="#vector-pythagorean-theorem">畢氏定理</a>：‖u + v‖² = ‖u‖² + ‖v‖²。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Orthogonal: 互相垂直、正交</p>' },
          { label: 'Testing', html: '<p>(2, &minus;1, 3) · (1, 5, 1) = 2 &minus; 5 + 3 = 0 &nbsp;&rarr;&nbsp; orthogonal</p>' }
        ]
      },

      {
        id: 'orthonormal',
        term: 'Orthonormal vectors',
        zh: '標準正交',
        zhAlt: '單範正交／正規正交',
        aliases: ['orthonormal', 'orthonormal basis', 'unit', '標準正交', '單位正交'],
        tags: ['ch1.6', 'dot product'],
        def:
          'Vectors that are <a href="#orthogonal">orthogonal</a> to each other <strong>and</strong> each ' +
          'have length 1: u · v = 0 and ‖u‖ = ‖v‖ = 1.',
        notes: [
          'The notes: two vectors that are perpendicular and whose lengths are 1 (互相垂直且長度為 1).',
          'The <a href="#standard-basis">standard basis</a> is orthonormal. Any orthogonal set of ' +
            'non-zero vectors becomes orthonormal after dividing each by its <a href="#norm">norm</a>.'
        ],
        defZh: '彼此<a href="#orthogonal">正交</a>、<strong>而且</strong>每個長度都是 1 的向量：u · v = 0 且 ‖u‖ = ‖v‖ = 1。',
        notesZh: [
          '筆記：兩個向量互相垂直且長度為 1。',
          '<a href="#standard-basis">標準基底</a>就是標準正交的。任何一組非零的正交向量，各自除以<a href="#norm">範數</a>後就變成標準正交。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Orthonormal: two vectors 互相垂直且長度為 1</p>' },
          {
            label: 'Making a pair orthonormal',
            html: '<p>(3, 4) and (&minus;4, 3) are orthogonal, both length 5 &nbsp;&rarr;&nbsp; (0.6, 0.8), (&minus;0.8, 0.6)</p>'
          }
        ]
      },

      {
        id: 'distance-between-points',
        term: 'Distance between points',
        abbr: 'd(x, y)',
        zh: '兩點間的距離',
        aliases: ['distance', 'd(x,y)', 'euclidean distance', '距離', '歐氏距離'],
        tags: ['ch1.6', 'dot product'],
        def:
          'For points <strong>x</strong> = (x&#8321;, …, x<sub>n</sub>) and <strong>y</strong> = (y&#8321;, …, y<sub>n</sub>) ' +
          'in &#8477;<sup>n</sup>: <span class="mono">d(x, y) = &radic;((x&#8321; &minus; y&#8321;)² + … + (x<sub>n</sub> &minus; y<sub>n</sub>)²) = ‖x &minus; y‖</span>.',
        notes: [
          'It is the <a href="#norm">norm</a> of the difference vector — the length of the arrow from one ' +
            'point to the other.',
          'In &#8477;² and &#8477;³ it is the familiar distance formula from Pythagoras.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 中兩點 <strong>x</strong>、<strong>y</strong> 的距離：d(x, y) = &radic;((x&#8321; &minus; y&#8321;)² + … + (x<sub>n</sub> &minus; y<sub>n</sub>)²) = ‖x &minus; y‖。',
        notesZh: [
          '它就是差向量的<a href="#norm">範數</a> &mdash; 從一點指到另一點的箭頭長度。',
          '在 &#8477;²、&#8477;³ 裡，就是熟悉的畢氏距離公式。'
        ],
        examples: [
          {
            label: 'From the notes (textbook definition)',
            html:
              '<p>Let x = (x&#8321;, …, x<sub>n</sub>) and y = (y&#8321;, …, y<sub>n</sub>) be two points in &#8477;<sup>n</sup>. ' +
              'The distance between x and y is d(x, y) = &radic;((x&#8321; &minus; y&#8321;)² + … + (x<sub>n</sub> &minus; y<sub>n</sub>)²)</p>' +
              '<p>Note: d(x, y) = ‖x &minus; y‖</p>'
          },
          { label: 'Computing one', html: '<p>d((1, 2), (4, 6)) = &radic;(9 + 16) = 5</p>' }
        ]
      },

      {
        id: 'triangle-inequality',
        term: 'Triangle inequality',
        zh: '三角不等式',
        aliases: ['triangle', '三角形', 'u + v'],
        tags: ['ch1.6', 'dot product'],
        def:
          'For vectors <strong>u</strong>, <strong>v</strong> in &#8477;<sup>n</sup>: ' +
          '<span class="mono">‖u + v‖ ≤ ‖u‖ + ‖v‖</span>. One side of a triangle can never be longer ' +
          'than the other two sides together.',
        notes: [
          'It follows from the <a href="#cauchy-schwarz">Cauchy–Schwarz inequality</a>: ' +
            '‖u + v‖² = ‖u‖² + 2u · v + ‖v‖² ≤ ‖u‖² + 2‖u‖‖v‖ + ‖v‖² = (‖u‖ + ‖v‖)².',
          'Equality only when u and v point the same way.'
        ],
        defZh:
          '&#8477;<sup>n</sup> 中向量 <strong>u</strong>、<strong>v</strong> 滿足 ‖u + v‖ ≤ ‖u‖ + ‖v‖：三角形的一邊永遠不會比另外兩邊加起來長。',
        notesZh: [
          '它可由<a href="#cauchy-schwarz">柯西–施瓦茨不等式</a>推出：‖u + v‖² = ‖u‖² + 2u · v + ‖v‖² ≤ ‖u‖² + 2‖u‖‖v‖ + ‖v‖² = (‖u‖ + ‖v‖)²。',
          '只有 u、v 同方向時等號成立。'
        ],
        examples: [
          {
            label: 'From the notes (textbook)',
            html:
              '<p>(a) Triangle inequality: ‖u + v‖ ≤ ‖u‖ + ‖v‖</p>' +
              '<p>This inequality tells us that the length of one side of a triangle cannot exceed the sum of the lengths of the other two sides.</p>'
          },
          { label: 'Checking it', html: '<p>u = (3, 0), v = (0, 4): ‖u + v‖ = 5 ≤ 3 + 4 = 7 &#10003;</p>' }
        ],
        figure: {
          caption: 'The side u + v is never longer than u and v laid end to end',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="triangle made by u, v and u plus v">' +
            arrow(40, 125, 170, 125, INK) +
            arrow(170, 125, 250, 35, INK) +
            arrow(40, 125, 250, 35, ACC) +
            LBL +
            '<text x="105" y="142" font-weight="700">u</text>' +
            '<text x="220" y="92" font-weight="700">v</text>' +
            '<text x="120" y="70" fill="var(--accent)" font-weight="700" font-style="normal">u + v</text></g></svg>'
        }
      },

      {
        id: 'vector-pythagorean-theorem',
        term: 'Pythagorean theorem (vectors)',
        zh: '畢氏定理（向量形式）',
        aliases: ['pythagoras', 'pythagorean', '畢氏定理', '勾股定理'],
        tags: ['ch1.6', 'dot product'],
        def:
          'If <strong>u</strong> · <strong>v</strong> = 0 (the vectors are <a href="#orthogonal">orthogonal</a>), ' +
          'then <span class="mono">‖u + v‖² = ‖u‖² + ‖v‖²</span>.',
        notes: [
          'Why: ‖u + v‖² = (u + v) · (u + v) = ‖u‖² + 2u · v + ‖v‖², and the middle term is 0.',
          'It is the familiar a² + b² = c² for a right triangle, now valid in any &#8477;<sup>n</sup>.'
        ],
        defZh: '若 <strong>u</strong> · <strong>v</strong> = 0（兩向量<a href="#orthogonal">正交</a>），則 ‖u + v‖² = ‖u‖² + ‖v‖²。',
        notesZh: [
          '原因：‖u + v‖² = (u + v) · (u + v) = ‖u‖² + 2u · v + ‖v‖²，而中間那項是 0。',
          '就是直角三角形的 a² + b² = c²，現在在任何 &#8477;<sup>n</sup> 都成立。'
        ],
        examples: [
          { label: 'From the notes (textbook)', html: '<p>(b) Pythagorean Theorem: If u · v = 0, then ‖u + v‖² = ‖u‖² + ‖v‖²</p>' },
          { label: 'Checking it', html: '<p>u = (3, 0), v = (0, 4): u · v = 0, ‖u + v‖² = 25 = 9 + 16 &#10003;</p>' }
        ]
      },

      /* ============================================ ch2.2 — the matrix form */
      {
        id: 'matrix-form-of-a-system',
        term: 'Matrix form of a system',
        abbr: 'AX = B',
        zh: '方程組的矩陣形式',
        zhAlt: '線性組合的矩陣寫法',
        aliases: ['AX = B', 'matrix of linear combination', 'matrix equation', '矩陣方程式'],
        tags: ['ch2.2', 'matrix operations'],
        def:
          'A whole <a href="#system-of-linear-equations">system of linear equations</a> written as one ' +
          'matrix product: <span class="mono">AX = B</span>, where A is the ' +
          '<a href="#coefficient-matrix">matrix of coefficients</a>, X the column of unknowns and B the ' +
          'column of constants.',
        notes: [
          'The notes call it the "matrix of linear combination": each row of AX is the linear ' +
            'combination a<sub>i1</sub>x&#8321; + … + a<sub>in</sub>x<sub>n</sub>, which the system sets ' +
            'equal to b<sub>i</sub>.',
          'Seen by columns it says the same thing about <a href="#linear-combination">linear ' +
            'combinations</a> of A\'s columns: x&#8321;(column 1) + … + x<sub>n</sub>(column n) = B.',
          'If A is square and <a href="#matrix-inverse">invertible</a>, the solution is X = A<sup>&minus;1</sup>B.'
        ],
        defZh:
          '把一整個<a href="#system-of-linear-equations">線性方程組</a>寫成一個矩陣乘法：AX = B，' +
          '其中 A 是<a href="#coefficient-matrix">係數矩陣</a>、X 是未知數的行向量、B 是常數項的行向量。',
        notesZh: [
          '筆記叫它「matrix of linear combination」：AX 的每一列就是線性組合 a<sub>i1</sub>x&#8321; + … + a<sub>in</sub>x<sub>n</sub>，方程組要它等於 b<sub>i</sub>。',
          '換成用行來看也是同一件事：x&#8321;(第 1 行) + … + x<sub>n</sub>(第 n 行) = B，是 A 的行向量的<a href="#linear-combination">線性組合</a>。',
          'A 是方陣且<a href="#matrix-inverse">可逆</a>時，解就是 X = A<sup>&minus;1</sup>B。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Matrix of linear combination:</p>' +
              '<p>a<sub>11</sub>x&#8321; + … + a<sub>1n</sub>x<sub>n</sub> = b&#8321;, &nbsp;…, &nbsp;' +
              'a<sub>m1</sub>x&#8321; + … + a<sub>mn</sub>x<sub>n</sub> = b<sub>m</sub></p>' +
              '<p>&rArr; AX = B</p>'
          },
          {
            label: 'A 2×2 system',
            html:
              '<p>' + SYS(['x&#8321; + 2x&#8322; = 5', '3x&#8321; &minus; x&#8322; = 1']) + '</p>' +
              '<p>' + M([[1, 2], [3, '&minus;1']]) + M([['x&#8321;'], ['x&#8322;']]) + ' = ' + M([[5], [1]]) + '</p>'
          }
        ]
      },

      {
        id: 'solution-space',
        term: 'Solution set as a subspace',
        zh: '解集合與子空間',
        aliases: ['solution space', 'homogeneous solutions', 'null space', '解空間', '齊次解'],
        tags: ['ch2.2', 'matrix operations'],
        def:
          'The solutions of a <strong>homogeneous</strong> system AX = <strong>0</strong> form a ' +
          '<a href="#subspace">subspace</a> of &#8477;<sup>n</sup>; the solutions of a ' +
          '<strong>non-homogeneous</strong> system AX = B (B &ne; <strong>0</strong>) do not.',
        notes: [
          'Why homogeneous works: if AX&#8321; = <strong>0</strong> and AX&#8322; = <strong>0</strong> then ' +
            'A(X&#8321; + X&#8322;) = <strong>0</strong> (closed under addition) and A(cX&#8321;) = ' +
            'c(AX&#8321;) = <strong>0</strong> (closed under scalar multiplication).',
          'Why non-homogeneous fails: AX&#8321; = B and AX&#8322; = B give A(X&#8321; + X&#8322;) = 2B &ne; B. ' +
            'It also misses the <a href="#zero-vector">zero vector</a>, since A<strong>0</strong> = <strong>0</strong> &ne; B.',
          'Careful with the letters: the notes write A&#8321;X = 0, A&#8322;X = 0 &rArr; (A&#8321; + A&#8322;)X = 0. ' +
            'What is being added are the <em>solutions</em>, so it should be AX&#8321; = <strong>0</strong>, ' +
            'AX&#8322; = <strong>0</strong> &rArr; A(X&#8321; + X&#8322;) = <strong>0</strong> — same idea, correct labels.',
          'This subspace is called the <strong>null space</strong> of A; its dimension is the number of ' +
            '<a href="#free-variable">free variables</a>.'
        ],
        defZh:
          '<strong>齊次</strong>方程組 AX = <strong>0</strong> 的解形成 &#8477;<sup>n</sup> 的<a href="#subspace">子空間</a>；' +
          '<strong>非齊次</strong>方程組 AX = B（B &ne; <strong>0</strong>）的解則不是。',
        notesZh: [
          '齊次為什麼可以：若 AX&#8321; = <strong>0</strong>、AX&#8322; = <strong>0</strong>，則 A(X&#8321; + X&#8322;) = <strong>0</strong>（對加法封閉），' +
            'A(cX&#8321;) = c(AX&#8321;) = <strong>0</strong>（對純量乘法封閉）。',
          '非齊次為什麼不行：AX&#8321; = B、AX&#8322; = B 會得到 A(X&#8321; + X&#8322;) = 2B &ne; B；而且它不含<a href="#zero-vector">零向量</a>，因為 A<strong>0</strong> = <strong>0</strong> &ne; B。',
          '字母要注意：筆記寫成 A&#8321;X = 0、A&#8322;X = 0 &rArr; (A&#8321; + A&#8322;)X = 0。相加的其實是<em>解</em>，所以應寫成 AX&#8321; = <strong>0</strong>、AX&#8322; = <strong>0</strong> &rArr; A(X&#8321; + X&#8322;) = <strong>0</strong> &mdash; 意思一樣，只是標對字母。',
          '這個子空間叫 A 的<strong>零空間</strong>（null space），維度等於<a href="#free-variable">自由變數</a>的個數。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Subspace: A&#8321;X = 0, A&#8322;X = 0 &rArr; (A&#8321; + A&#8322;)X = 0 (closed under addition); ' +
              'cA&#8321;X = 0 &rArr; A&#8321;(cX) = 0 (closed under scalar multiplication)</p>' +
              '<p>* The sets of solutions to a homogeneous system of linear equations is a subspace, ' +
              'but to a non homogeneous system AX = B: A&#8321;X = B, A&#8322;X = B &rArr; (A&#8321; + A&#8322;)X = 2B</p>' +
              '<p>* The sets of solutions to a non homogeneous system of linear equation is not a subspace.</p>'
          },
          {
            label: 'Checking with numbers',
            html:
              '<p>x + y = 0: (1, &minus;1) and (2, &minus;2) are solutions, so is their sum (3, &minus;3) &#10003;</p>' +
              '<p>x + y = 1: (1, 0) and (0, 1) are solutions, but (1, 1) is not &#10007;</p>'
          }
        ]
      },

      /* ============================================ ch2.4 — the inverse */
      {
        id: 'matrix-inverse',
        term: 'Inverse of a matrix',
        abbr: 'A<sup>&minus;1</sup>',
        zh: '反矩陣',
        zhAlt: '逆矩陣',
        aliases: ['inverse', 'invertible', 'nonsingular', '可逆', '反矩陣', 'AA^-1 = I'],
        tags: ['ch2.4', 'matrix operations'],
        def:
          'Let A be an n &times; n matrix. If a matrix B can be found with ' +
          '<span class="mono">AB = BA = I<sub>n</sub></span>, then A is <strong>invertible</strong> and B ' +
          'is its inverse, written <span class="mono">A<sup>&minus;1</sup></span>: ' +
          'AA<sup>&minus;1</sup> = I = A<sup>&minus;1</sup>A. If no such B exists, A has no inverse.',
        notes: [
          'The inverse is <strong>unique</strong> when it exists — the notes stress this.',
          '<strong>Properties</strong> for invertible A, B and a non-zero scalar c: ' +
            '&#9312; (A<sup>&minus;1</sup>)<sup>&minus;1</sup> = A; &#9313; (cA)<sup>&minus;1</sup> = ' +
            '(1/c)A<sup>&minus;1</sup>; &#9314; (AB)<sup>&minus;1</sup> = B<sup>&minus;1</sup>A<sup>&minus;1</sup> ' +
            '(order reverses, as with the <a href="#transpose">transpose</a>); &#9315; ' +
            '(A<sup>n</sup>)<sup>&minus;1</sup> = (A<sup>&minus;1</sup>)<sup>n</sup>; &#9316; ' +
            '(A&#7488;)<sup>&minus;1</sup> = (A<sup>&minus;1</sup>)&#7488;.',
          'Solving a system: for <span class="mono">AX = Y</span>, if A<sup>&minus;1</sup> exists then A is ' +
            '<a href="#row-equivalent">row equivalent</a> to I<sub>n</sub>, the system has a unique ' +
            'solution, and it is <span class="mono">X = A<sup>&minus;1</sup>Y</span>.',
          'Only square matrices can have an inverse, and not all of them do — a square matrix with a row ' +
            'of zeros after elimination has none.'
        ],
        defZh:
          '設 A 是 n &times; n 矩陣。若存在矩陣 B 使 AB = BA = I<sub>n</sub>，就說 A <strong>可逆</strong>，' +
          'B 是它的反矩陣，記作 A<sup>&minus;1</sup>：AA<sup>&minus;1</sup> = I = A<sup>&minus;1</sup>A。若不存在這樣的 B，A 就沒有反矩陣。',
        notesZh: [
          '反矩陣存在時是<strong>唯一</strong>的 &mdash; 筆記特別強調。',
          '<strong>性質</strong>（A、B 可逆，c 為非零純量）：&#9312; (A<sup>&minus;1</sup>)<sup>&minus;1</sup> = A；' +
            '&#9313; (cA)<sup>&minus;1</sup> = (1/c)A<sup>&minus;1</sup>；&#9314; (AB)<sup>&minus;1</sup> = B<sup>&minus;1</sup>A<sup>&minus;1</sup>' +
            '（順序反過來，和<a href="#transpose">轉置</a>一樣）；&#9315; (A<sup>n</sup>)<sup>&minus;1</sup> = (A<sup>&minus;1</sup>)<sup>n</sup>；' +
            '&#9316; (A&#7488;)<sup>&minus;1</sup> = (A<sup>&minus;1</sup>)&#7488;。',
          '解方程組：對 AX = Y，若 A<sup>&minus;1</sup> 存在，則 A 與 I<sub>n</sub> <a href="#row-equivalent">列等價</a>，' +
            '方程組有唯一解，且解為 X = A<sup>&minus;1</sup>Y。',
          '只有方陣才可能有反矩陣，而且不是每個方陣都有 &mdash; 消去後出現全零列的方陣就沒有。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Definition. Let A be an n &times; n matrix. If a matrix B can be found such that AB = BA = I<sub>n</sub>, ' +
              'then A is said to be invertible and B is called an inverse of A. If such B does not exist, then A has no inverse.</p>' +
              '<p>Unique: If a matrix is invertible, that inverse is unique.</p>' +
              '<p>A<sub>mn</sub>X = Y: if A<sup>&minus;1</sup> exist &rArr; A is row equivalent to I<sub>n</sub> &rArr; unique solution, ' +
              'and the solution: X = A<sup>&minus;1</sup>Y</p>'
          },
          {
            label: 'A 2×2 inverse',
            html:
              '<p>A = ' + M([[2, 1], [1, 1]]) + ', A<sup>&minus;1</sup> = ' + M([[1, '&minus;1'], ['&minus;1', 2]]) + '</p>' +
              '<p>check: AA<sup>&minus;1</sup> = ' + M([[1, 0], [0, 1]]) + '</p>'
          }
        ]
      },

      /* ============================================ ch2.5 — matrix transformations */
      {
        id: 'transformation',
        term: 'Transformation (mapping)',
        abbr: 'T',
        zh: '變換（映射）',
        zhAlt: '轉換',
        aliases: ['mapping', 'transformation', 'image', 'domain', 'codomain', '映射', '變換', '像'],
        tags: ['ch2.5', 'transformations'],
        def:
          'A rule T that assigns to each vector <strong>u</strong> in &#8477;<sup>n</sup> a unique vector ' +
          '<strong>v</strong> in &#8477;<sup>m</sup>, written T(<strong>u</strong>) = <strong>v</strong>. ' +
          '&#8477;<sup>n</sup> is the <strong>domain</strong> of T, &#8477;<sup>m</sup> its ' +
          '<strong>codomain</strong>, and <strong>v</strong> is the <strong>image</strong> of ' +
          '<strong>u</strong> under T.',
        notes: [
          'It is the "function" idea from calculus, with vectors instead of numbers: one ' +
            'input, exactly one output.',
          'In this chapter every T is given by a matrix: T(X) = AX, so an m &times; n matrix maps ' +
            '&#8477;<sup>n</sup> into &#8477;<sup>m</sup>. <a href="#dilation-contraction">Dilations</a>, ' +
            '<a href="#reflection">reflections</a> and <a href="#rotation">rotations</a> are the standard examples.',
          'Because T(X) = AX, transformations inherit the matrix rules: T(X + Y) = T(X) + T(Y) and ' +
            'T(cX) = cT(X) — what makes them <em>linear</em> (filled in here).'
        ],
        defZh:
          '一個規則 T，把 &#8477;<sup>n</sup> 中每個向量 <strong>u</strong> 對應到 &#8477;<sup>m</sup> 中唯一的 <strong>v</strong>，記作 T(<strong>u</strong>) = <strong>v</strong>。' +
          '&#8477;<sup>n</sup> 是 T 的<strong>定義域</strong>，&#8477;<sup>m</sup> 是<strong>對應域</strong>，<strong>v</strong> 是 <strong>u</strong> 在 T 之下的<strong>像</strong>。',
        notesZh: [
          '就是微積分裡「函數」的概念，只是把數換成向量：一個輸入，剛好一個輸出。',
          '這一章的 T 都由矩陣給出：T(X) = AX，所以 m &times; n 的矩陣把 &#8477;<sup>n</sup> 映到 &#8477;<sup>m</sup>。' +
            '<a href="#dilation-contraction">伸縮</a>、<a href="#reflection">鏡射</a>、<a href="#rotation">旋轉</a>是標準例子。',
          '因為 T(X) = AX，變換會繼承矩陣的運算律：T(X + Y) = T(X) + T(Y)、T(cX) = cT(X) &mdash; 這就是它們「線性」的意思（這裡補上的）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Transformation / Mapping T: A rule that assigns to each <strong>u</strong> in &#8477;<sup>n</sup> ' +
              'a unique <strong>v</strong> in &#8477;<sup>m</sup></p>' +
              '<p>&#8477;<sup>n</sup> is domain of T, &#8477;<sup>m</sup> is codomain of T</p>' +
              '<p><strong>v</strong> is image of <strong>u</strong> under T</p>'
          }
        ],
        figure: {
          caption: 'T sends each u in the domain to a single image v in the codomain',
          svg:
            '<svg viewBox="0 0 320 150" role="img" aria-label="a transformation from Rn to Rm">' +
            '<g fill="none" stroke="currentColor" stroke-width="1.4" opacity=".6">' +
            '<ellipse cx="70" cy="75" rx="48" ry="52"/><ellipse cx="250" cy="75" rx="48" ry="52"/></g>' +
            arrow(118, 75, 202, 75, ACC) +
            '<g fill="currentColor"><circle cx="62" cy="75" r="4"/><circle cx="256" cy="75" r="4"/></g>' +
            LBL +
            '<text x="54" y="70" text-anchor="end" font-weight="700">u</text>' +
            '<text x="266" y="70" font-weight="700">v</text>' +
            '<text x="160" y="66" text-anchor="middle" fill="var(--accent)" font-style="normal">T(u) = v</text>' +
            '<text x="70" y="140" text-anchor="middle" font-style="normal">&#8477;<tspan dy="-4" font-size="8">n</tspan><tspan dy="4"> — domain</tspan></text>' +
            '<text x="250" y="140" text-anchor="middle" font-style="normal">&#8477;<tspan dy="-4" font-size="8">m</tspan><tspan dy="4"> — codomain</tspan></text>' +
            '</g></svg>'
        }
      },

      {
        id: 'dilation-contraction',
        term: 'Dilation and contraction',
        zh: '放大與縮小',
        zhAlt: '伸張與收縮',
        aliases: ['dilation', 'contraction', 'scaling', '放大', '縮小', '伸縮'],
        tags: ['ch2.5', 'transformations'],
        def:
          'The <a href="#transformation">transformation</a> T(X) = rX, i.e. the matrix ' +
          '<span class="mono">[r 0; 0 r]</span>, which stretches every vector by the factor r. ' +
          'It is a <strong>dilation</strong> when r &gt; 1 and a <strong>contraction</strong> when ' +
          '0 &lt; r &lt; 1.',
        notes: [
          'Correction: the notes write the contraction condition as 0 &gt; r &gt; 1, which no number ' +
            'satisfies; it should be <strong>0 &lt; r &lt; 1</strong>.',
          'Direction is unchanged — only the length is scaled — because rX is a ' +
            '<a href="#scalar-multiplication">scalar multiple</a> of X.',
          'r = 1 leaves everything fixed (the <a href="#identity-matrix">identity matrix</a>); a negative r ' +
            'also flips the direction.'
        ],
        defZh:
          '<a href="#transformation">變換</a> T(X) = rX，也就是矩陣 [r 0; 0 r]，把每個向量都拉長 r 倍。' +
          'r &gt; 1 時叫<strong>放大</strong>（dilation），0 &lt; r &lt; 1 時叫<strong>縮小</strong>（contraction）。',
        notesZh: [
          '修正：筆記把縮小的條件寫成 0 &gt; r &gt; 1，沒有數字符合；應該是 <strong>0 &lt; r &lt; 1</strong>。',
          '方向不變、只有長度改變，因為 rX 就是 X 的<a href="#scalar-multiplication">純量倍數</a>。',
          'r = 1 時什麼都不動（就是<a href="#identity-matrix">單位矩陣</a>）；r 為負時方向還會反過來。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Dilation: T([x; y]) = ' + M([['r', 0], [0, 'r']]) + M([['x'], ['y']]) + ', r &gt; 1</p>' +
              '<p>Contraction: T([x; y]) = ' + M([['r', 0], [0, 'r']]) + M([['x'], ['y']]) + ', ' +
              '<del>0 &gt; r &gt; 1</del> 0 &lt; r &lt; 1</p>'
          },
          {
            label: 'On a vector',
            html: '<p>r = 2: (3, 1) &rarr; (6, 2) &nbsp;&nbsp; r = ½: (3, 1) &rarr; (1.5, 0.5)</p>'
          }
        ],
        figure: {
          caption: 'r > 1 stretches (dilation); 0 < r < 1 shrinks (contraction)',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="dilation and contraction of a vector">' +
            axes(45, 120, 20, 290, 140, 10) +
            arrow(45, 120, 225, 30, 'var(--accent)') +
            arrow(45, 120, 135, 75, INK) +
            arrow(45, 120, 90, 97.5, INK) +
            LBL +
            '<text x="232" y="28" fill="var(--accent)" font-weight="700" font-style="normal">2X</text>' +
            '<text x="140" y="68" font-weight="700">X</text>' +
            '<text x="86" y="112" font-weight="700" font-style="normal">½X</text></g></svg>'
        }
      },

      {
        id: 'reflection',
        term: 'Reflection',
        zh: '鏡射',
        zhAlt: '反射',
        aliases: ['reflection', 'mirror', '鏡射', '對稱變換'],
        tags: ['ch2.5', 'transformations'],
        def:
          'The <a href="#transformation">transformation</a> that mirrors each vector across a line. ' +
          'Across the x-axis it is <span class="mono">[1 0; 0 &minus;1]</span>, sending (x, y) to ' +
          '(x, &minus;y).',
        notes: [
          'The notes write this one faintly and leave the other mirrors out; the usual matrices are ' +
            'filled in here: across the y-axis [&minus;1 0; 0 1], across the line y = x [0 1; 1 0], ' +
            'through the origin [&minus;1 0; 0 &minus;1].',
          'Doing the same reflection twice returns the original vector, so each reflection matrix is its ' +
            'own <a href="#matrix-inverse">inverse</a>.',
          'Lengths are unchanged, so like <a href="#rotation">rotation</a> it is a rigid motion.'
        ],
        defZh:
          '把每個向量對一條直線鏡射的<a href="#transformation">變換</a>。對 x 軸鏡射的矩陣是 [1 0; 0 &minus;1]，把 (x, y) 送到 (x, &minus;y)。',
        notesZh: [
          '筆記這一行寫得很淡，也沒寫其他鏡射；常見的矩陣補在這裡：對 y 軸 [&minus;1 0; 0 1]、對直線 y = x [0 1; 1 0]、對原點 [&minus;1 0; 0 &minus;1]。',
          '同一個鏡射做兩次會回到原向量，所以鏡射矩陣是它自己的<a href="#matrix-inverse">反矩陣</a>。',
          '長度不變，所以和<a href="#rotation">旋轉</a>一樣屬於剛體運動。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Reflection: T([x; y]) = ' + M([[1, 0], [0, '&minus;1']]) + M([['x'], ['y']]) + ' = ' + M([['x'], ['&minus;y']]) + '</p>'
          },
          { label: 'On a vector', html: '<p>(3, 2) &rarr; (3, &minus;2) across the x-axis; &rarr; (&minus;3, 2) across the y-axis</p>' }
        ]
      },

      {
        id: 'rotation',
        term: 'Rotation',
        zh: '旋轉',
        aliases: ['rotation matrix', 'rotate', 'about the origin', '旋轉矩陣', '繞原點'],
        tags: ['ch2.5', 'transformations'],
        def:
          'The <a href="#transformation">transformation</a> that turns every vector through the angle θ ' +
          'about the origin: <span class="mono">[x&prime;; y&prime;] = [cos θ &minus;sin θ; sin θ cos θ][x; y]</span>.',
        notes: [
          'θ is measured counter-clockwise; a negative θ turns the other way.',
          'The columns of the matrix are the images of the standard basis: ' +
            'e&#8321; &rarr; (cos θ, sin θ) and e&#8322; &rarr; (&minus;sin θ, cos θ). That is how the matrix ' +
            'is built (filled in here).',
          'Lengths and angles are preserved; the inverse is the rotation by &minus;θ, which is also the ' +
            '<a href="#transpose">transpose</a> of the matrix.'
        ],
        defZh:
          '把每個向量繞原點轉角 θ 的<a href="#transformation">變換</a>：[x&prime;; y&prime;] = [cos θ &minus;sin θ; sin θ cos θ][x; y]。',
        notesZh: [
          'θ 以逆時針為正；θ 為負就往反方向轉。',
          '矩陣的兩行就是標準基底的像：e&#8321; &rarr; (cos θ, sin θ)、e&#8322; &rarr; (&minus;sin θ, cos θ)。矩陣就是這樣組出來的（這裡補上的）。',
          '長度和夾角都不變；它的反矩陣就是轉 &minus;θ，也剛好等於原矩陣的<a href="#transpose">轉置</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Rotation: ' + M([['x&prime;'], ['y&prime;']]) + ' = ' +
              M([['cos θ', '&minus;sin θ'], ['sin θ', 'cos θ']]) + M([['x'], ['y']]) + ' (rotation about the origin)</p>'
          },
          {
            label: 'Turning 90°',
            html: '<p>θ = π/2: ' + M([[0, '&minus;1'], [1, 0]]) + ', so (3, 1) &rarr; (&minus;1, 3)</p>'
          }
        ],
        figure: {
          caption: 'X turned through θ about the origin becomes X′',
          svg: (function () {
            var ox = 60, oy = 120, r = 120, a = 28 * Math.PI / 180, b = 72 * Math.PI / 180;
            return (
              '<svg viewBox="0 0 300 150" role="img" aria-label="rotating a vector about the origin">' +
              axes(ox, oy, 20, 290, 142, 8) +
              '<path d="M' + (ox + 60) + ' ' + (oy - 60 * Math.tan(a)).toFixed(1) +
              ' A60 60 0 0 0 ' + (ox + 60 * Math.cos(b - a + a)).toFixed(1) + ' ' +
              (oy - 60 * Math.sin(b)).toFixed(1) + '" fill="none" stroke="var(--accent)" stroke-width="1.6" opacity=".7"/>' +
              arrow(ox, oy, ox + r * Math.cos(a), oy - r * Math.sin(a), INK) +
              arrow(ox, oy, ox + r * Math.cos(b), oy - r * Math.sin(b), ACC) +
              LBL +
              '<text x="' + (ox + r * Math.cos(a) + 6) + '" y="' + (oy - r * Math.sin(a) + 4).toFixed(1) + '" font-weight="700">X</text>' +
              '<text x="' + (ox + r * Math.cos(b) + 6) + '" y="' + (oy - r * Math.sin(b)).toFixed(1) + '" fill="var(--accent)" font-weight="700">X&prime;</text>' +
              '<text x="' + (ox + 70) + '" y="' + (oy - 40) + '" fill="var(--accent)" font-style="normal">θ</text>' +
              '</g></svg>'
            );
          })()
        }
      },

      {
        id: 'matrix-transformation',
        term: 'Matrix transformation',
        abbr: 'T(x) = Ax',
        zh: '矩陣變換',
        zhAlt: '矩陣轉換',
        aliases: ['matrix transformation', 'T(x) = Ax', '矩陣變換', 'image of x'],
        tags: ['ch2.5', 'transformations'],
        def:
          'Let A be an <span class="mono">m &times; n</span> matrix and let <strong>x</strong> be an ' +
          'element of &#8477;<sup>n</sup> written as a column matrix. Then A defines a ' +
          '<strong>matrix transformation</strong> <span class="mono">T(x) = Ax</span> of ' +
          '&#8477;<sup>n</sup> into &#8477;<sup>m</sup>. The vector Ax is the <strong>image</strong> of ' +
          '<strong>x</strong>; the <a href="#transformation">domain</a> is &#8477;<sup>n</sup> and the ' +
          'codomain is &#8477;<sup>m</sup>.',
        notes: [
          'What it preserves (textbook): a matrix transformation maps <strong>line segments into line ' +
            'segments</strong> (or into points). If the matrix is <a href="#matrix-inverse">invertible</a> ' +
            'it also maps <strong>parallel lines into parallel lines</strong>.',
          'The notes add the warning: <strong>not every transformation can be written as a matrix</strong>. ' +
            'The <a href="#translation">translation</a> on the next line is the counter-example — it moves ' +
            'the origin, and T(x) = Ax always fixes it.',
          'But every <a href="#linear-transformation">linear transformation</a> &#8477;<sup>n</sup> &rarr; ' +
            '&#8477;<sup>m</sup> <em>is</em> a matrix transformation: its matrix is the ' +
            '<a href="#standard-matrix">standard matrix</a>.',
          'The sizes decide the direction: an m &times; n matrix eats a vector from &#8477;<sup>n</sup> and ' +
            'produces one in &#8477;<sup>m</sup>. <a href="#dilation-contraction">Dilation</a>, ' +
            '<a href="#reflection">reflection</a> and <a href="#rotation">rotation</a> are the ones the ' +
            '10/6 notes already built this way.'
        ],
        defZh:
          '設 A 是 <span class="mono">m &times; n</span> 矩陣，<strong>x</strong> 是 &#8477;<sup>n</sup> 中寫成行矩陣的元素。' +
          '則 A 定義了一個<strong>矩陣變換</strong> T(x) = Ax，把 &#8477;<sup>n</sup> 送到 &#8477;<sup>m</sup>。' +
          'Ax 稱為 <strong>x</strong> 的<strong>像</strong>；<a href="#transformation">定義域</a>是 &#8477;<sup>n</sup>，對應域是 &#8477;<sup>m</sup>。',
        notesZh: [
          '它保留什麼（課本）：矩陣變換把<strong>線段映成線段</strong>（或映成點）；若矩陣<a href="#matrix-inverse">可逆</a>，' +
            '還會把<strong>平行線映成平行線</strong>。',
          '筆記特別註明：<strong>不是每個變換都寫得成矩陣</strong>。下一行的<a href="#translation">平移</a>就是反例 &mdash; ' +
            '它會移動原點，而 T(x) = Ax 永遠把原點留在原地。',
          '不過每個 &#8477;<sup>n</sup> &rarr; &#8477;<sup>m</sup> 的<a href="#linear-transformation">線性變換</a>' +
            '<em>都是</em>矩陣變換，它的矩陣就是<a href="#standard-matrix">標準矩陣</a>。（這兩點是這裡補上的）',
          '大小決定方向：m &times; n 矩陣吃 &#8477;<sup>n</sup> 的向量，吐出 &#8477;<sup>m</sup> 的向量。' +
            '10/6 筆記的<a href="#dilation-contraction">放大縮小</a>、<a href="#reflection">鏡射</a>、' +
            '<a href="#rotation">旋轉</a>都是這樣做出來的。'
        ],
        examples: [
          {
            label: 'From the notes (textbook definition)',
            html:
              '<p>Let A be an m &times; n matrix. Let x be an element of &#8477;<sup>n</sup> written in column matrix form. ' +
              'A defines a matrix transformation T(x) = Ax of &#8477;<sup>n</sup> into &#8477;<sup>m</sup>. ' +
              'The vector Ax is the image of x. The domain of the transformation is &#8477;<sup>n</sup> and the codomain is &#8477;<sup>m</sup>.</p>' +
              '<p>Matrix transformations map line segments into line segments (or points). If the matrix is invertible ' +
              'the transformation also maps parallel lines into parallel lines.</p>' +
              '<p>&#10033; Not any transformation can be written as matrix.</p>'
          },
          {
            label: 'Taking an image',
            html:
              '<p>A = ' + M([[2, 0], [0, 3]]) + ', x = ' + M([[1], [4]]) + '</p>' +
              '<p>T(x) = Ax = ' + M([[2], [12]]) + ' &mdash; a 2 &times; 2 matrix, so &#8477;² &rarr; &#8477;²</p>'
          }
        ]
      },

      {
        id: 'orthogonal-matrix',
        term: 'Orthogonal matrix',
        abbr: 'A&#8315;&#185; = A&#7488;',
        zh: '正交矩陣',
        aliases: ['orthogonal matrix', 'A inverse equals A transpose', '正交矩陣'],
        tags: ['ch2.5', 'transformations'],
        def:
          'A square matrix whose <a href="#matrix-inverse">inverse</a> is its own ' +
          '<a href="#transpose">transpose</a>: <span class="mono">A<sup>&minus;1</sup> = A&#7488;</span>.',
        notes: [
          'Equivalently <span class="mono">A&#7488;A = AA&#7488; = I<sub>n</sub></span>, which is just the ' +
            'definition of the inverse with A&#7488; put in place of A<sup>&minus;1</sup>.',
          'Read column by column, A&#7488;A = I says the columns of A are ' +
            '<a href="#orthonormal">orthonormal</a> — mutually ' +
            '<a href="#orthogonal">orthogonal</a> and each of ' +
            '<a href="#norm">norm</a> 1. That is where the name comes from.',
          'Inverting such a matrix costs nothing: you only have to swap rows and columns.',
          'The <a href="#rotation">rotation</a> matrix is the example already on hand — its columns ' +
            '(cos θ, sin θ) and (&minus;sin θ, cos θ) are perpendicular unit vectors.'
        ],
        defZh:
          '<a href="#matrix-inverse">反矩陣</a>剛好等於自己<a href="#transpose">轉置</a>的方陣：A<sup>&minus;1</sup> = A&#7488;。',
        notesZh: [
          '等價地說就是 A&#7488;A = AA&#7488; = I<sub>n</sub> &mdash; 把反矩陣定義裡的 A<sup>&minus;1</sup> 換成 A&#7488; 而已。',
          '逐行來看，A&#7488;A = I 說的是 A 的各行<a href="#orthonormal">單範正交</a>：兩兩<a href="#orthogonal">正交</a>' +
            '且<a href="#norm">範數</a>都是 1。名字就是這樣來的。',
          '這種矩陣求逆完全不費力，把列與行對調就好。',
          '現成的例子就是<a href="#rotation">旋轉</a>矩陣 &mdash; 它的兩行 (cos θ, sin θ) 與 (&minus;sin θ, cos θ) 正是互相垂直的單位向量。（後三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Orthogonal matrix: A<sup>&minus;1</sup> = A&#7488;</p>'
          },
          {
            label: 'Checking one',
            html:
              '<p>A = ' + M([[0, '&minus;1'], [1, 0]]) + ' (rotation by 90&deg;), A&#7488; = ' +
              M([[0, 1], ['&minus;1', 0]]) + '</p>' +
              '<p>A&#7488;A = ' + M([[1, 0], [0, 1]]) + ' &#10003;</p>'
          }
        ]
      },

      {
        id: 'orthogonal-transformation',
        term: 'Orthogonal transformation',
        abbr: 'rigid motion',
        zh: '正交變換',
        zhAlt: '剛體運動',
        aliases: ['orthogonal transformation', 'rigid motion', '剛體運動', '正交變換', '保距'],
        tags: ['ch2.5', 'transformations'],
        def:
          'A <a href="#matrix-transformation">matrix transformation</a> whose matrix is ' +
          '<a href="#orthogonal-matrix">orthogonal</a>. The notes gloss it as a ' +
          '<strong>rigid motion</strong>.',
        notes: [
          'Textbook: orthogonal transformations <strong>preserve angles and distances</strong> ' +
            '(left as Exercise 21). "Rigid motion" is exactly that — the figure may be moved, but it is ' +
            'never stretched, squashed or bent.',
          'Why distances survive: ‖Ax‖² = (Ax)&#7488;(Ax) = x&#7488;A&#7488;Ax = x&#7488;x = ‖x‖², ' +
            'using A&#7488;A = I. Angles follow because the <a href="#dot-product">dot product</a> ' +
            'itself is unchanged, and the <a href="#angle-between-vectors">angle</a> is read off it.',
          '<a href="#rotation">Rotation</a> and <a href="#reflection">reflection</a> are orthogonal; ' +
            '<a href="#dilation-contraction">dilation and contraction</a> are not, because they change ' +
            'every length by the factor r.'
        ],
        defZh:
          '矩陣是<a href="#orthogonal-matrix">正交矩陣</a>的<a href="#matrix-transformation">矩陣變換</a>。筆記直接註明這就是<strong>剛體運動</strong>。',
        notesZh: [
          '課本：正交變換<strong>保持角度與距離</strong>（留作習題 21）。「剛體運動」講的就是這件事 &mdash; 圖形可以被搬動，但不會被拉長、壓扁或扭曲。',
          '距離為什麼不變：‖Ax‖² = (Ax)&#7488;(Ax) = x&#7488;A&#7488;Ax = x&#7488;x = ‖x‖²，用到 A&#7488;A = I。' +
            '角度跟著不變，是因為<a href="#dot-product">內積</a>本身沒變，而<a href="#angle-between-vectors">夾角</a>就是從內積讀出來的。（這裡補上的）',
          '<a href="#rotation">旋轉</a>和<a href="#reflection">鏡射</a>是正交變換；' +
            '<a href="#dilation-contraction">放大與縮小</a>不是，因為它們把每個長度都乘上了 r。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Orthogonal transformation（rigid motion）</p>' +
              '<p>We leave it for the reader to show that orthogonal transformations also preserve ' +
              'angles and distances in Exercise 21.</p>'
          }
        ]
      },

      {
        id: 'translation',
        term: 'Translation',
        abbr: 'T(u) = u + v',
        zh: '平移',
        aliases: ['translation', 'shift', '平移', '位移變換'],
        tags: ['ch2.5', 'transformations'],
        def:
          'The transformation that <strong>adds a fixed vector</strong> to every vector: ' +
          '<span class="mono">T(u) = u + v</span>.',
        notes: [
          'A translation is <strong>not</strong> a <a href="#matrix-transformation">matrix ' +
            'transformation</a> (unless v = <strong>0</strong>): T(<strong>0</strong>) = v, while ' +
            'A<strong>0</strong> = <strong>0</strong> for every matrix A. This is what the notes mean by ' +
            '"not any transformation can be written as matrix".',
          'For the same reason it is not <a href="#linear-transformation">linear</a>: ' +
            'T(u + w) = u + w + v, but T(u) + T(w) = u + w + 2v.',
          'Correction to the notes: the example is written so that the input bracket reads ' +
            '<span class="mono">[1; 2]</span>, the same as the vector being added. The left side has to be ' +
            'the general vector <span class="mono">[x; y]</span> — otherwise the line states one particular ' +
            'image rather than the rule.'
        ],
        defZh:
          '把每個向量都<strong>加上同一個固定向量</strong>的變換：T(u) = u + v。',
        notesZh: [
          '平移<strong>不是</strong><a href="#matrix-transformation">矩陣變換</a>（除非 v = <strong>0</strong>）：' +
            'T(<strong>0</strong>) = v，但對任何矩陣 A 都有 A<strong>0</strong> = <strong>0</strong>。' +
            '筆記寫的「不是每個變換都寫得成矩陣」指的就是這個。',
          '同樣的理由讓它不是<a href="#linear-transformation">線性</a>的：T(u + w) = u + w + v，而 T(u) + T(w) = u + w + 2v。（這裡補上的）',
          '筆記修正：範例把輸入的括號寫成和被加的向量一樣的 <span class="mono">[1; 2]</span>。' +
            '左邊應該是一般的 <span class="mono">[x; y]</span> &mdash; 不然那一行只是寫出某一個像，而不是寫出規則。'
        ],
        examples: [
          {
            label: 'From the notes (input corrected to [x; y])',
            html:
              '<p>Translation（平移）: T(u) = u + v</p>' +
              '<p>T' + M([['x'], ['y']]) + ' = ' + M([['x'], ['y']]) + ' + ' + M([[1], [2]]) + '</p>'
          }
        ],
        figure: {
          svg:
            '<svg viewBox="0 0 340 150" role="img" aria-label="a triangle moved by a fixed vector">' +
            '<path d="M50 120 L110 120 L80 70 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
            '<path d="M170 90 L230 90 L200 40 Z" fill="none" stroke="var(--accent)" stroke-width="1.6"/>' +
            arrow(80, 103, 200, 73, ACC, true) +
            LBL +
            '<text x="72" y="136">S</text>' +
            '<text x="192" y="106" fill="var(--accent)">S + v</text>' +
            '<text x="134" y="80" fill="var(--accent)">v</text>' +
            '</g>' +
            '</svg>',
          caption: 'Every point moves by the same v, so the shape is unchanged — but the origin moves too.'
        }
      },

      {
        id: 'affine-transformation',
        term: 'Affine transformation',
        abbr: 'T(u) = Au + v',
        zh: '仿射變換',
        aliases: ['affine', 'affine transformation', '仿射', '仿射變換'],
        tags: ['ch2.5', 'transformations'],
        def:
          'A <a href="#matrix-transformation">matrix transformation</a> followed by a ' +
          '<a href="#translation">translation</a>: <span class="mono">T(u) = Au + v</span>.',
        notes: [
          'The two special cases sit at the ends: v = <strong>0</strong> leaves a plain matrix ' +
            'transformation, A = I leaves a plain translation.',
          'It is the general "straight lines stay straight, parallel stays parallel" map of the plane — ' +
            'which is why graphics and image software describe placements this way.',
          'Not <a href="#linear-transformation">linear</a> when v &ne; <strong>0</strong>, for the same ' +
            'reason the translation is not: T(<strong>0</strong>) = v.'
        ],
        defZh:
          '先做<a href="#matrix-transformation">矩陣變換</a>、再做<a href="#translation">平移</a>：T(u) = Au + v。',
        notesZh: [
          '兩個特例分佔兩端：v = <strong>0</strong> 就退回純矩陣變換，A = I 就退回純平移。',
          '它是平面上「直線還是直線、平行還是平行」的一般映射 &mdash; 繪圖與影像軟體描述物件擺放時用的就是這個。（這兩點是這裡補上的）',
          'v &ne; <strong>0</strong> 時不是<a href="#linear-transformation">線性</a>的，理由和平移一樣：T(<strong>0</strong>) = v。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Affine transformation: a matrix transformation followed by a translation.</p>' +
              '<p>T(u) = Au + v</p>'
          },
          {
            label: 'Rotate, then shift',
            html:
              '<p>T(u) = ' + M([[0, '&minus;1'], [1, 0]]) + 'u + ' + M([[1], [2]]) + '</p>' +
              '<p>u = ' + M([[3], [1]]) + ' &rarr; ' + M([['&minus;1'], [3]]) + ' + ' +
              M([[1], [2]]) + ' = ' + M([[0], [5]]) + '</p>'
          }
        ]
      },

      /* ============================================ 10/13, 10/14 — ch2.6 linear transformations */
      {
        id: 'linear-transformation',
        term: 'Linear transformation',
        zh: '線性變換',
        zhAlt: '線性映射',
        aliases: ['linear transformation', 'linear map', '線性變換', '線性映射', 'additivity', 'homogeneity'],
        tags: ['ch2.6', 'transformations'],
        def:
          'A <a href="#transformation">transformation</a> T that respects the two vector-space ' +
          'operations: &#9312; <span class="mono">T(u + v) = T(u) + T(v)</span> and ' +
          '&#9313; <span class="mono">cT(u) = T(cu)</span> for every scalar c.',
        notes: [
          'In words: it does not matter whether you add (or scale) first and transform after, or ' +
            'transform first and add (or scale) after.',
          'Putting c = 0 in &#9313; forces <span class="mono">T(<strong>0</strong>) = <strong>0</strong></span>. ' +
            'That single test rules out <a href="#translation">translation</a> and any ' +
            '<a href="#affine-transformation">affine</a> map with v &ne; <strong>0</strong>.',
          'Both conditions together are the same as <span class="mono">T(au + bv) = aT(u) + bT(v)</span>, ' +
            'so a <a href="#linear-combination">linear combination</a> passes straight through T — which is ' +
            'what makes the <a href="#standard-matrix">standard matrix</a> work.',
          '<a href="#dilation-contraction">Dilation</a>, <a href="#reflection">reflection</a> and ' +
            '<a href="#rotation">rotation</a> are linear; every ' +
            '<a href="#matrix-transformation">matrix transformation</a> is.'
        ],
        defZh:
          '尊重向量空間兩種運算的<a href="#transformation">變換</a> T：&#9312; T(u + v) = T(u) + T(v)；&#9313; 對任何純量 c 有 cT(u) = T(cu)。',
        notesZh: [
          '白話說：先加（或先乘）再變換，和先變換再加（或再乘），結果一樣。',
          '在 &#9313; 取 c = 0 就逼出 <span class="mono">T(<strong>0</strong>) = <strong>0</strong></span>。' +
            '光這一個檢查就排除了<a href="#translation">平移</a>、以及任何 v &ne; <strong>0</strong> 的<a href="#affine-transformation">仿射</a>變換。',
          '兩個條件合起來等同於 T(au + bv) = aT(u) + bT(v)，所以<a href="#linear-combination">線性組合</a>可以直接穿過 T &mdash; ' +
            '這正是<a href="#standard-matrix">標準矩陣</a>能成立的原因。（這三點是這裡補上的）',
          '<a href="#dilation-contraction">放大縮小</a>、<a href="#reflection">鏡射</a>、<a href="#rotation">旋轉</a>都是線性的；' +
            '每個<a href="#matrix-transformation">矩陣變換</a>也都是。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Linear transformation:</p>' +
              '<p>&#9312; T(u + v) = T(u) + T(v) &nbsp;&nbsp; &#9313; cT(u) = T(cu)</p>'
          },
          {
            label: 'One that passes, one that fails',
            html:
              '<p>T(x, y) = (2x, 3y): T(0, 0) = (0, 0), and both rules hold &#10003;</p>' +
              '<p>T(x, y) = (x + 1, y): T(0, 0) = (1, 0) &ne; (0, 0) &#10007;</p>'
          }
        ]
      },

      {
        id: 'standard-matrix',
        term: 'Standard matrix',
        abbr: 'A = [T(e&#8321;) &hellip; T(e<sub>n</sub>)]',
        zh: '標準矩陣',
        aliases: ['standard matrix', 'matrix of a transformation', '標準矩陣', 'T(e1)'],
        tags: ['ch2.6', 'transformations'],
        def:
          'The matrix of a <a href="#linear-transformation">linear transformation</a> T, built by ' +
          'transforming each <a href="#standard-basis">standard basis</a> vector and standing the results ' +
          'up as columns: <span class="mono">A = [T(e&#8321;) T(e&#8322;) &hellip; T(e<sub>n</sub>)]</span>.',
        notes: [
          'The derivation on the 10/14 page: write ' +
            '<span class="mono">u = c&#8321;e&#8321; + c&#8322;e&#8322; + &hellip; + c<sub>n</sub>e<sub>n</sub></span>, ' +
            'then linearity gives ' +
            '<span class="mono">T(u) = c&#8321;T(e&#8321;) + &hellip; + c<sub>n</sub>T(e<sub>n</sub>)</span>, ' +
            'which is exactly [T(e&#8321;) &hellip; T(e<sub>n</sub>)] times the column of c&#8217;s.',
          'So <span class="mono">T(u) = Au</span>: <strong>every linear transformation of ' +
            '&#8477;<sup>n</sup> into &#8477;<sup>m</sup> is a ' +
            '<a href="#matrix-transformation">matrix transformation</a></strong>, and A is unique.',
          'Practical recipe: to find the matrix of a transformation, just see where e&#8321;, e&#8322;, … go. ' +
            'That is how the <a href="#rotation">rotation</a> matrix was read off earlier.',
          'The 10/13 page leaves this heading blank; the definition here is the 10/14 derivation that ' +
            'follows it.'
        ],
        defZh:
          '<a href="#linear-transformation">線性變換</a> T 的矩陣：把每個<a href="#standard-basis">標準基底</a>向量變換後，' +
          '當作一行一行立起來 &mdash; A = [T(e&#8321;) T(e&#8322;) … T(e<sub>n</sub>)]。',
        notesZh: [
          '10/14 那頁的推導：先把 u 寫成 u = c&#8321;e&#8321; + c&#8322;e&#8322; + … + c<sub>n</sub>e<sub>n</sub>，' +
            '再用線性得到 T(u) = c&#8321;T(e&#8321;) + … + c<sub>n</sub>T(e<sub>n</sub>)，' +
            '這正好就是 [T(e&#8321;) … T(e<sub>n</sub>)] 乘上那一行係數。',
          '所以 T(u) = Au：<strong>每個 &#8477;<sup>n</sup> &rarr; &#8477;<sup>m</sup> 的線性變換都是' +
            '<a href="#matrix-transformation">矩陣變換</a></strong>，而且 A 唯一。',
          '實用做法：要找一個變換的矩陣，只要看 e&#8321;、e&#8322;、… 被送到哪裡。之前<a href="#rotation">旋轉</a>矩陣就是這樣讀出來的。（這點是這裡補上的）',
          '10/13 那頁這個標題底下是空白的，這裡的定義取自接在後面的 10/14 推導。'
        ],
        examples: [
          {
            label: 'From the notes (10/14)',
            html:
              '<p>Let e&#8321; = [1; …; 0], e&#8322; = [0; …; 0], …, e<sub>n</sub> = [0; …; 1] and u = [c&#8321;; c&#8322;; …; c<sub>n</sub>]</p>' +
              '<p>&rArr; u = c&#8321;e&#8321; + c&#8322;e&#8322; + c&#8323;e&#8323; … c<sub>n</sub>e<sub>n</sub></p>' +
              '<p>&rArr; T(u) = T(c&#8321;e&#8321; + c&#8322;e&#8322; … + c<sub>n</sub>e<sub>n</sub>) = ' +
              'c&#8321;T(e&#8321;) + c&#8322;T(e&#8322;) … + c<sub>n</sub>T(e<sub>n</sub>) = ' +
              '[T(e&#8321;) T(e&#8322;) … T(e<sub>n</sub>)][c&#8321;; c&#8322;; …; c<sub>n</sub>]</p>' +
              '<p>Thus the matrix of transformation T is A = [T(e&#8321;), T(e&#8322;) … T(e<sub>n</sub>)]. ' +
              'A is also called standard matrix.</p>'
          },
          {
            label: 'Building one',
            html:
              '<p>T(x, y) = (2x, x + y): T(e&#8321;) = (2, 1), T(e&#8322;) = (0, 1)</p>' +
              '<p>A = ' + M([[2, 0], [1, 1]]) + '</p>'
          }
        ]
      },

      /* ============================================ 10/13 — ch3.1 determinants */
      {
        id: 'determinant',
        term: 'Determinant',
        abbr: 'det(A) = |A|',
        zh: '行列式',
        aliases: ['determinant', 'det', '行列式', 'ad - bc', 'cofactor expansion'],
        tags: ['ch3.1', 'determinants'],
        def:
          'A single number attached to a <a href="#square-matrix">square matrix</a>: the ' +
          '<strong>sum of the products of the elements of the first row and their ' +
          '<a href="#cofactor">cofactors</a></strong>. For 2 &times; 2, ' +
          '<span class="mono">det(A) = |A| = ad &minus; bc</span>.',
        notes: [
          'Written out: <span class="mono">|A| = a&#8321;&#8321;C&#8321;&#8321; + a&#8321;&#8322;C&#8321;&#8322; ' +
            '+ &hellip; + a&#8321;<sub>n</sub>C&#8321;<sub>n</sub></span>. The definition is recursive — each ' +
            '<a href="#cofactor">cofactor</a> is built from a smaller determinant.',
          'Supplement to the notes: the <strong>first row is only a convenient choice</strong>. Expanding ' +
            'along any row or any column gives the same number, so pick the line with the most zeros.',
          'Only square matrices have one — a non-square matrix has no determinant at all.',
          '<span class="mono">|A| &ne; 0</span> is exactly the test for A being ' +
            '<a href="#matrix-inverse">invertible</a>, which is what the chapter is heading towards.'
        ],
        defZh:
          '掛在<a href="#square-matrix">方陣</a>上的一個數：<strong>第一列各元素與其<a href="#cofactor">餘因子</a>乘積的總和</strong>。' +
          '2 &times; 2 時 det(A) = |A| = ad &minus; bc。',
        notesZh: [
          '寫開來是 |A| = a&#8321;&#8321;C&#8321;&#8321; + a&#8321;&#8322;C&#8321;&#8322; + … + a&#8321;<sub>n</sub>C&#8321;<sub>n</sub>。' +
            '這個定義是遞迴的 &mdash; 每個<a href="#cofactor">餘因子</a>都由更小的行列式組成。',
          '補充筆記：<strong>第一列只是方便的選擇</strong>。沿任何一列或任何一行展開，得到的數都一樣，所以挑零最多的那一條。',
          '只有方陣有行列式 &mdash; 不是方陣就根本沒有。',
          '<span class="mono">|A| &ne; 0</span> 正是 A <a href="#matrix-inverse">可逆</a>的判別條件，也是這一章要走到的地方。（後三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Determinant: sum of products of the elements of the first row and their cofactors.</p>' +
              '<p>2&times;2 matrix A&#8322;&#8339;&#8322;: ' + M([['a', 'b'], ['c', 'd']]) +
              ' &rArr; det|A| = |A| = ad &minus; bc</p>'
          },
          {
            label: 'A 3×3 along the first row',
            html:
              '<p>A = ' + M([[1, 3, 4], [2, 5, 6], [7, 7, 8]]) + '</p>' +
              '<p>|A| = 1&middot;(5&middot;8 &minus; 6&middot;7) &minus; 3&middot;(2&middot;8 &minus; 6&middot;7) + ' +
              '4&middot;(2&middot;7 &minus; 5&middot;7)</p>' +
              '<p>= 1&middot;(&minus;2) &minus; 3&middot;(&minus;26) + 4&middot;(&minus;21) = &minus;8</p>'
          }
        ]
      },

      {
        id: 'minor',
        term: 'Minor',
        abbr: 'M<sub>ij</sub>',
        zh: '子行列式',
        zhAlt: '餘子式',
        aliases: ['minor', 'Mij', '子行列式', '餘子式', 'delete row and column'],
        tags: ['ch3.1', 'determinants'],
        def:
          '<span class="mono">M<sub>ij</sub></span> is the <a href="#determinant">determinant</a> of the ' +
          'matrix that remains after <strong>deleting row i and column j</strong> of A.',
        notes: [
          'An n &times; n matrix therefore has (n &minus; 1) &times; (n &minus; 1) minors, one for each ' +
            'position — it is a determinant, so a number, not a matrix.',
          'The indices name what is <em>removed</em>, not what is kept: M&#8322;&#8321; deletes the second ' +
            'row and the first column.',
          'Attach the sign and it becomes the <a href="#cofactor">cofactor</a>, which is what the ' +
            '<a href="#determinant">determinant</a> expansion actually uses.'
        ],
        defZh:
          '<span class="mono">M<sub>ij</sub></span> 是把 A 的<strong>第 i 列與第 j 行刪掉</strong>後，剩下那個矩陣的<a href="#determinant">行列式</a>。',
        notesZh: [
          '所以 n &times; n 矩陣的子行列式是 (n &minus; 1) &times; (n &minus; 1) 的行列式，每個位置一個 &mdash; 它是行列式，所以是一個數，不是矩陣。（這點是這裡補上的）',
          '下標指的是被<em>刪掉</em>的、不是被留下的：M&#8322;&#8321; 刪的是第二列和第一行。',
          '加上正負號就變成<a href="#cofactor">餘因子</a>，<a href="#determinant">行列式</a>展開實際用的是餘因子。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Minor: M<sub>ij</sub> is determinant of the matrix that remains after deleting row i and column j of A.</p>' +
              '<p>A = ' + M([[1, 3, 4], [2, 5, 6], [7, 7, 8]]) + ', M&#8322;&#8321; = ' +
              M([[3, 4], [7, 8]]) + ' = 24 &minus; 28 = &minus;4</p>'
          }
        ],
        figure: {
          svg:
            '<svg viewBox="0 0 340 150" role="img" aria-label="deleting row 2 and column 1 of a 3 by 3 matrix">' +
            '<g font-family="sans-serif" font-size="15" fill="currentColor" text-anchor="middle">' +
            '<text x="70" y="55">1</text><text x="115" y="55">3</text><text x="160" y="55">4</text>' +
            '<text x="70" y="90">2</text><text x="115" y="90">5</text><text x="160" y="90">6</text>' +
            '<text x="70" y="125">7</text><text x="115" y="125">7</text><text x="160" y="125">8</text>' +
            '<text x="255" y="72">3</text><text x="295" y="72">4</text>' +
            '<text x="255" y="107">7</text><text x="295" y="107">8</text>' +
            '</g>' +
            '<path d="M48 85 H182" stroke="var(--accent)" stroke-width="1.8"/>' +
            '<path d="M70 32 V138" stroke="var(--accent)" stroke-width="1.8"/>' +
            '<path d="M44 34 h-6 v102 h6" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
            '<path d="M186 34 h6 v102 h-6" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
            '<path d="M232 52 h-6 v68 h6" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
            '<path d="M318 52 h6 v68 h-6" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
            arrow(196, 86, 220, 86, ACC) +
            '</svg>',
          caption: 'M₂₁: strike out row 2 and column 1, then take the determinant of what is left (−4).'
        }
      },

      {
        id: 'cofactor',
        term: 'Cofactor',
        abbr: 'C<sub>ij</sub>',
        zh: '餘因子',
        zhAlt: '代數餘子式',
        aliases: ['cofactor', 'Cij', '餘因子', '代數餘子式', 'signed minor'],
        tags: ['ch3.1', 'determinants'],
        def:
          'The <a href="#minor">minor</a> with a sign attached: ' +
          '<span class="mono">C<sub>ij</sub> = (&minus;1)<sup>i+j</sup> M<sub>ij</sub></span>.',
        notes: [
          'The sign only depends on the position, and it alternates like a chessboard: + &minus; + / ' +
            '&minus; + &minus; / + &minus; + . Where i + j is even the minor is kept as it is.',
          'This is the piece the <a href="#determinant">determinant</a> is built from — expanding a row ' +
            'means multiplying each element by <em>its</em> cofactor and adding.',
          'Minor and cofactor differ only by that sign, so |C<sub>ij</sub>| = |M<sub>ij</sub>| always.'
        ],
        defZh:
          '加上正負號的<a href="#minor">子行列式</a>：C<sub>ij</sub> = (&minus;1)<sup>i+j</sup> M<sub>ij</sub>。',
        notesZh: [
          '正負號只看位置，像棋盤一樣交錯：+ &minus; + ／&minus; + &minus;／+ &minus; +。i + j 是偶數時子行列式原封不動。（這點是這裡補上的）',
          '這就是<a href="#determinant">行列式</a>的組成零件 &mdash; 沿一列展開，就是把每個元素乘上<em>它自己的</em>餘因子再相加。',
          '餘因子與子行列式只差那個符號，所以 |C<sub>ij</sub>| = |M<sub>ij</sub>| 恆成立。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Cofactor: C<sub>ij</sub> = (&minus;1)<sup>i+j</sup> M<sub>ij</sub></p>' +
              '<p>C&#8322;&#8321; = (&minus;1)<sup>2+1</sup> &middot; (&minus;4) = 4</p>'
          },
          {
            label: 'The sign pattern (3 × 3)',
            html: '<p>' + M([['+', '&minus;', '+'], ['&minus;', '+', '&minus;'], ['+', '&minus;', '+']]) + '</p>'
          }
        ]
      },

      /* ============================================ 10/19 — ch3.2 properties of determinants */
      {
        id: 'determinant-row-operations',
        term: 'Properties of the determinant',
        abbr: 'Theorem 3.2',
        zh: '行列式的性質',
        zhAlt: '列運算對行列式的影響',
        aliases: ['properties of determinant', 'theorem 3.2', '行列式性質', 'row operation determinant', '列運算'],
        tags: ['ch3.2', 'determinants'],
        def:
          'What the three <a href="#elementary-row-operation">elementary row operations</a> do to ' +
          '<span class="mono">|A|</span> (textbook Theorem 3.2), for an n &times; n matrix A and a ' +
          'non-zero scalar c: &#9312; <strong>multiplying</strong> a row (column) by c gives ' +
          '<span class="mono">|B| = c|A|</span>; &#9313; <strong>interchanging</strong> two rows (columns) ' +
          'gives <span class="mono">|B| = &minus;|A|</span>; &#9314; <strong>adding a multiple</strong> of ' +
          'one row (column) to another leaves <span class="mono">|B| = |A|</span>.',
        notes: [
          'Everything holds for columns as well as rows, which is the same symmetry that lets the ' +
            '<a href="#determinant">determinant</a> be expanded along either.',
          'This is how a determinant is computed in practice: run ' +
            '<a href="#gaussian-elimination">Gaussian elimination</a>, keep a tally of the swaps and the ' +
            'scalings, and read the answer off the triangular matrix at the end. &#9314; is free, so most ' +
            'of the work costs nothing.',
          'Two quick consequences: a matrix with a repeated row has |A| = 0 (swapping those two rows ' +
            'changes nothing yet must flip the sign, so |A| = &minus;|A|), and scaling a whole n &times; n ' +
            'matrix multiplies the determinant by c<sup>n</sup>, not by c — see ' +
            '<a href="#determinant-arithmetic">determinant arithmetic</a>.'
        ],
        defZh:
          '三種<a href="#elementary-row-operation">基本列運算</a>對 <span class="mono">|A|</span> 的影響（課本 Theorem 3.2）。' +
          '設 A 是 n &times; n 矩陣、c 是非零純量：&#9312; 把某一列（行）<strong>乘以 c</strong> 得 |B| = c|A|；' +
          '&#9313; <strong>對調</strong>兩列（行）得 |B| = &minus;|A|；&#9314; 把某列（行）的倍數<strong>加到另一列（行）</strong>，|B| = |A| 不變。',
        notesZh: [
          '對行跟對列都成立，這就是<a href="#determinant">行列式</a>可以沿列或沿行展開的那個對稱性。',
          '實務上行列式就是這樣算的：做<a href="#gaussian-elimination">高斯消去法</a>，一邊記下對調了幾次、乘了哪些倍數，' +
            '最後從三角矩陣讀出答案。&#9314; 不花代價，所以大部分步驟都是免費的。',
          '兩個立即的推論：有重複列的矩陣 |A| = 0（對調那兩列什麼都沒變，卻必須變號，所以 |A| = &minus;|A|）；' +
            '把整個 n &times; n 矩陣乘上 c，行列式乘的是 c<sup>n</sup> 而不是 c &mdash; 見' +
            '<a href="#determinant-arithmetic">行列式的運算律</a>。（這兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes (Theorem 3.2)',
            html:
              '<p>Let A be an n &times; n matrix and c be a nonzero scalar.</p>' +
              '<table>' +
              '<tr><th>B obtained from A by…</th><th>|B|</th></tr>' +
              '<tr><td>(a) multiplying the elements of a row (column) by c</td><td>c|A|</td></tr>' +
              '<tr><td>(b) interchanging two rows (columns)</td><td>&minus;|A|</td></tr>' +
              '<tr><td>(c) adding a multiple of one row (column) to another row (column)</td><td>|A|</td></tr>' +
              '</table>'
          },
          {
            label: 'Watching it happen',
            html:
              '<p>A = ' + M([[1, 2], [3, 4]]) + ', |A| = &minus;2</p>' +
              '<p>(a) double row 1: ' + M([[2, 4], [3, 4]]) + ' = &minus;4 = 2(&minus;2)</p>' +
              '<p>(b) swap the rows: ' + M([[3, 4], [1, 2]]) + ' = 2 = &minus;(&minus;2)</p>' +
              '<p>(c) R&#8322; &minus; 3R&#8321;: ' + M([[1, 2], [0, '&minus;2']]) + ' = &minus;2, unchanged</p>'
          }
        ]
      },

      {
        id: 'singular-matrix',
        term: 'Singular matrix',
        abbr: '|A| = 0',
        zh: '奇異矩陣',
        zhAlt: '不可逆矩陣',
        aliases: ['singular', 'singular matrix', '奇異矩陣', '不可逆', 'determinant is zero'],
        tags: ['ch3.2', 'determinants'],
        def:
          'A square matrix whose <a href="#determinant">determinant</a> is <strong>0</strong>. ' +
          'A singular matrix <strong>has no <a href="#matrix-inverse">inverse</a></strong>.',
        notes: [
          '<strong>Tests from the notes</strong> — A is singular if &#9312; all the elements of a row ' +
            '(column) are zero; &#9313; two rows (columns) are equal; &#9314; two rows (columns) are ' +
            'proportional.',
          'Those three are <strong>sufficient, not exhaustive</strong>: they are the easy cases to spot, ' +
            'but a matrix can be singular without any of them holding — in ' +
            '<span class="mono">[1 2 3; 4 5 6; 5 7 9]</span> no two rows are proportional, yet row 3 = ' +
            'row 1 + row 2, so |A| = 0.',
          'What ties them together is the <a href="#linear-independence">linear dependence</a> of the ' +
            'rows. Case &#9314; also covers &#9312; and &#9313;, since a zero row is 0 times any row and ' +
            'equal rows are 1 times each other.',
          'For a system, <a href="#matrix-form-of-a-system">AX = B</a> with A singular never has exactly ' +
            'one solution: it has none, or infinitely many.'
        ],
        defZh:
          '<a href="#determinant">行列式</a>為 <strong>0</strong> 的方陣。奇異矩陣<strong>沒有<a href="#matrix-inverse">反矩陣</a></strong>。',
        notesZh: [
          '<strong>筆記上的判別法</strong> &mdash; A 是奇異矩陣，若 &#9312; 某一列（行）全為零；&#9313; 有兩列（行）相等；&#9314; 有兩列（行）成比例。',
          '這三條是<strong>充分條件，不是全部</strong>：它們是一眼看得出來的情形，但矩陣可能三條都不符合卻仍然奇異 &mdash; ' +
            '例如 <span class="mono">[1 2 3; 4 5 6; 5 7 9]</span> 沒有任兩列成比例，但第三列 = 第一列 + 第二列，所以 |A| = 0。（這裡補上的）',
          '把它們串起來的是各列的<a href="#linear-independence">線性相依</a>。&#9314; 其實也涵蓋了 &#9312; 和 &#9313;：' +
            '零列是任一列的 0 倍，相等的兩列則是彼此的 1 倍。',
          '對方程組來說，A 奇異時 <a href="#matrix-form-of-a-system">AX = B</a> 絕不會恰好一組解：不是無解，就是無限多解。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Singular matrix: determinant of matrix is 0, and it does not have inverse.</p>' +
              '<p>Let A be a square matrix. A is singular if</p>' +
              '<p>(a) all the elements of a row (column) are zero.</p>' +
              '<p>(b) two rows (columns) are equal.</p>' +
              '<p>(c) two rows (columns) are proportional.</p>'
          },
          {
            label: 'One of each kind',
            html:
              '<p>(a) ' + M([[1, 2], [0, 0]]) + ' = 0 &nbsp; (b) ' + M([[3, 5], [3, 5]]) + ' = 0</p>' +
              '<p>(c) ' + M([[1, 2], [4, 8]]) + ' = 8 &minus; 8 = 0 (row 2 = 4 &times; row 1)</p>'
          }
        ]
      },

      {
        id: 'nonsingular-matrix',
        term: 'Nonsingular matrix',
        abbr: '|A| &ne; 0',
        zh: '非奇異矩陣',
        zhAlt: '可逆矩陣',
        aliases: ['nonsingular', 'non-singular', 'invertible', '非奇異', '可逆矩陣'],
        tags: ['ch3.2', 'determinants'],
        def:
          'A square matrix whose <a href="#determinant">determinant</a> is <strong>non-zero</strong>. ' +
          'A nonsingular matrix <strong>has an <a href="#matrix-inverse">inverse</a></strong>.',
        notes: [
          '"Nonsingular" and "invertible" name the same property — one by the determinant test, the other ' +
            'by what the matrix can do. Every square matrix is one or the other, never both.',
          'The earlier ch2.4 statement lines up with this: if A<sup>&minus;1</sup> exists then A is ' +
            '<a href="#row-equivalent">row equivalent</a> to I<sub>n</sub> and ' +
            '<a href="#matrix-form-of-a-system">AX = Y</a> has the unique solution ' +
            'X = A<sup>&minus;1</sup>Y.',
          'So <span class="mono">|A| &ne; 0</span> is a one-number test for "this system has exactly one ' +
            'solution" — no elimination needed to find out.'
        ],
        defZh:
          '<a href="#determinant">行列式</a><strong>不為零</strong>的方陣。非奇異矩陣<strong>有<a href="#matrix-inverse">反矩陣</a></strong>。',
        notesZh: [
          '「非奇異」和「可逆」講的是同一件事 &mdash; 一個從行列式判別，一個從矩陣能做什麼來說。每個方陣必居其一，不會兩者皆是。',
          '這和 ch2.4 的說法對得上：若 A<sup>&minus;1</sup> 存在，則 A 與 I<sub>n</sub> <a href="#row-equivalent">列等價</a>，' +
            '且 <a href="#matrix-form-of-a-system">AX = Y</a> 有唯一解 X = A<sup>&minus;1</sup>Y。',
          '所以 <span class="mono">|A| &ne; 0</span> 就是「這個方程組恰好一組解」的單一數字檢驗 &mdash; 不必真的去消去。（這兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Nonsingular matrix: determinant of matrix is nonzero, and it has inverse.</p>'
          },
          {
            label: 'Checking one',
            html:
              '<p>A = ' + M([[2, 1], [1, 1]]) + ', |A| = 2 &minus; 1 = 1 &ne; 0 &rArr; nonsingular</p>' +
              '<p>A<sup>&minus;1</sup> = ' + M([[1, '&minus;1'], ['&minus;1', 2]]) + '</p>'
          }
        ]
      },

      {
        id: 'determinant-arithmetic',
        term: 'Determinant arithmetic',
        abbr: '|AB| = |A||B|',
        zh: '行列式的運算律',
        zhAlt: '行列式與矩陣運算',
        aliases: ['determinant of a product', 'determinant of a transpose', 'determinant of an inverse',
          'cA determinant', '行列式運算', '乘積的行列式'],
        tags: ['ch3.2', 'determinants'],
        def:
          'How <span class="mono">|&nbsp;|</span> behaves under the matrix operations, for n &times; n ' +
          'matrices A, B and a non-zero scalar c: ' +
          '&#9312; <span class="mono">|cA| = c<sup>n</sup>|A|</span>; ' +
          '&#9313; <span class="mono">|AB| = |A||B|</span>; ' +
          '&#9314; <span class="mono">|A&#7488;| = |A|</span>; ' +
          '&#9315; <span class="mono">|A<sup>&minus;1</sup>| = 1/|A|</span> (assuming A<sup>&minus;1</sup> exists).',
        notes: [
          'The exponent in &#9312; is the <strong>size of the matrix</strong>, not 1: scaling by c scales ' +
            'each of the n rows, and each row costs a factor of c by ' +
            '<a href="#determinant-row-operations">Theorem 3.2</a>. Writing |cA| = c|A| is the usual slip.',
          '&#9313; is the surprising one — the determinant turns matrix multiplication, which is not even ' +
            'commutative, into ordinary multiplication of numbers. It also gives |AB| = |BA| for free.',
          '&#9315; follows from &#9313;: AA<sup>&minus;1</sup> = I and |I| = 1, so |A||A<sup>&minus;1</sup>| = 1. ' +
            'The proviso matters — a <a href="#singular-matrix">singular</a> A would need 1/0.',
          '&#9314; is why every row statement about determinants has a column twin, and it fits the ' +
            '<a href="#transpose">transpose</a> leaving the diagonal alone.'
        ],
        defZh:
          '<span class="mono">|&nbsp;|</span> 在矩陣運算下的行為。設 A、B 是 n &times; n 矩陣、c 是非零純量：' +
          '&#9312; |cA| = c<sup>n</sup>|A|；&#9313; |AB| = |A||B|；&#9314; |A&#7488;| = |A|；' +
          '&#9315; |A<sup>&minus;1</sup>| = 1/|A|（假設 A<sup>&minus;1</sup> 存在）。',
        notesZh: [
          '&#9312; 的指數是<strong>矩陣的大小</strong>，不是 1：乘上 c 等於把 n 個列各乘一次 c，' +
            '而由 <a href="#determinant-row-operations">Theorem 3.2</a> 每一列各貢獻一個 c。寫成 |cA| = c|A| 是最常見的錯。',
          '&#9313; 最意外 &mdash; 行列式把連交換律都沒有的矩陣乘法，變成一般數字的乘法。順便也免費得到 |AB| = |BA|。',
          '&#9315; 由 &#9313; 推出：AA<sup>&minus;1</sup> = I 且 |I| = 1，所以 |A||A<sup>&minus;1</sup>| = 1。' +
            '那個但書有意義 &mdash; A 若<a href="#singular-matrix">奇異</a>就要算 1/0 了。',
          '&#9314; 正是每條關於列的行列式性質都有一條關於行的雙胞胎的原因，也和<a href="#transpose">轉置</a>不動對角線相合。（這些說明是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Let A and B be n &times; n matrices and c be a nonzero scalar.</p>' +
              '<table>' +
              '<tr><th></th><th>rule</th></tr>' +
              '<tr><td>(a) Determinant of a scalar multiple</td><td>|cA| = c<sup>n</sup>|A|</td></tr>' +
              '<tr><td>(b) Determinant of a product</td><td>|AB| = |A||B|</td></tr>' +
              '<tr><td>(c) Determinant of a transpose</td><td>|A&#7488;| = |A|</td></tr>' +
              '<tr><td>(d) Determinant of an inverse</td><td>|A<sup>&minus;1</sup>| = 1/|A| (assuming A<sup>&minus;1</sup> exists)</td></tr>' +
              '</table>'
          },
          {
            label: 'The cⁿ trap',
            html:
              '<p>A = ' + M([[1, 2], [3, 4]]) + ', |A| = &minus;2, n = 2</p>' +
              '<p>3A = ' + M([[3, 6], [9, 12]]) + ' = 36 &minus; 54 = &minus;18 = 3²(&minus;2) &#10003;</p>' +
              '<p>not 3(&minus;2) = &minus;6 &#10007;</p>'
          }
        ]
      },

      {
        id: 'triangular-determinant',
        term: 'Determinant of a triangular matrix',
        abbr: '&prod; diagonal',
        zh: '三角矩陣的行列式',
        aliases: ['triangular', 'triangular matrix determinant', '三角矩陣', '對角線相乘'],
        tags: ['ch3.2', 'determinants'],
        def:
          'The <a href="#determinant">determinant</a> of a <strong>triangular matrix</strong> — one ' +
          'whose entries are all zero on one side of the main diagonal — is the ' +
          '<strong>product of its diagonal elements</strong>.',
        notes: [
          'Upper triangular, lower triangular and <a href="#diagonal-matrix">diagonal</a> matrices all ' +
            'qualify, and so does <a href="#identity-matrix">I<sub>n</sub></a>, whose determinant is ' +
            'therefore 1.',
          'Why it is worth knowing: <a href="#gaussian-elimination">Gaussian elimination</a> turns any ' +
            'matrix into a triangular one, and by ' +
            '<a href="#determinant-row-operations">Theorem 3.2</a> the step that does most of the work ' +
            'leaves |A| alone. Eliminate, multiply the diagonal, adjust for the swaps and scalings.',
          'A triangular matrix is therefore <a href="#singular-matrix">singular</a> exactly when some ' +
            'diagonal entry is 0.'
        ],
        defZh:
          '<strong>三角矩陣</strong>（主對角線某一側全為零的矩陣）的<a href="#determinant">行列式</a>，' +
          '就是<strong>對角線元素的乘積</strong>。',
        notesZh: [
          '上三角、下三角和<a href="#diagonal-matrix">對角矩陣</a>都算，' +
            '<a href="#identity-matrix">I<sub>n</sub></a> 也是，所以 |I<sub>n</sub>| = 1。',
          '為什麼實用：<a href="#gaussian-elimination">高斯消去法</a>可以把任何矩陣變成三角矩陣，而由' +
            '<a href="#determinant-row-operations">Theorem 3.2</a>，做最多事的那個步驟根本不改變 |A|。' +
            '消去、對角線相乘、再補上對調與伸縮的修正就好。',
          '因此三角矩陣是<a href="#singular-matrix">奇異</a>的，恰好在對角線上出現 0 的時候。（這三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>The determinant of a triangular matrix is the product of its diagonal elements.</p>'
          },
          {
            label: 'Reading one off',
            html:
              '<p>' + M([[2, 7, 1], [0, 3, 5], [0, 0, 4]]) + ' = 2 &middot; 3 &middot; 4 = 24</p>'
          }
        ]
      },

      /* ============================================ 10/20, 11/3 — ch3.3 adjoint and Cramer */
      {
        id: 'matrix-of-cofactors',
        term: 'Matrix of cofactors',
        abbr: '[C<sub>ij</sub>]',
        zh: '餘因子矩陣',
        aliases: ['matrix of cofactor', 'cofactor matrix', '餘因子矩陣'],
        tags: ['ch3.3', 'determinants'],
        def:
          'The matrix built by replacing every entry <span class="mono">a<sub>ij</sub></span> of A with ' +
          'its <a href="#cofactor">cofactor</a> <span class="mono">C<sub>ij</sub></span>.',
        notes: [
          'Same size as A, and every entry costs one smaller <a href="#determinant">determinant</a>, so a ' +
            '3 &times; 3 matrix needs nine 2 &times; 2 determinants.',
          'Do not stop here: the <a href="#adjoint">adjoint</a> is this matrix <em>transposed</em>, and ' +
            'that is the one that appears in the inverse formula.',
          'Keep the chessboard of signs in view — <a href="#minor">minor</a> first, then ' +
            '(&minus;1)<sup>i+j</sup>.'
        ],
        defZh:
          '把 A 的每個元素 <span class="mono">a<sub>ij</sub></span> 換成它的<a href="#cofactor">餘因子</a> ' +
          '<span class="mono">C<sub>ij</sub></span> 所組成的矩陣。',
        notesZh: [
          '大小和 A 一樣，每個位置都要算一個較小的<a href="#determinant">行列式</a>，所以 3 &times; 3 要算九個 2 &times; 2。',
          '不要停在這裡：<a href="#adjoint">伴隨矩陣</a>是這個矩陣再<em>轉置</em>，出現在反矩陣公式裡的是那一個。',
          '符號的棋盤要記著 &mdash; 先算<a href="#minor">子行列式</a>，再乘 (&minus;1)<sup>i+j</sup>。（這三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Matrix of cofactor: the matrix composed of cofactors C<sub>ij</sub> of a<sub>ij</sub> of ' +
              'matrix A, call <strong>matrix of cofactors of A</strong>.</p>'
          },
          {
            label: 'A 2 × 2 one',
            html:
              '<p>A = ' + M([[1, 2], [3, 4]]) + ' &rarr; cofactors ' +
              M([[4, '&minus;3'], ['&minus;2', 1]]) + '</p>'
          }
        ]
      },

      {
        id: 'adjoint',
        term: 'Adjoint of a matrix',
        abbr: 'adj(A)',
        zh: '伴隨矩陣',
        zhAlt: '古典伴隨矩陣',
        aliases: ['adjoint', 'adj', 'adjugate', '伴隨矩陣', '轉置的餘因子矩陣'],
        tags: ['ch3.3', 'determinants'],
        def:
          'The <a href="#transpose">transpose</a> of the ' +
          '<a href="#matrix-of-cofactors">matrix of cofactors</a>, written ' +
          '<span class="mono">adj(A)</span>.',
        notes: [
          'It gives a closed formula for the <a href="#matrix-inverse">inverse</a>: for a square A with ' +
            '|A| &ne; 0, <span class="mono">A<sup>&minus;1</sup> = (1/|A|) adj(A)</span>.',
          'The notes record the matching criterion: <strong>a square matrix A is invertible if and only ' +
            'if |A| &ne; 0</strong> — the same split as ' +
            '<a href="#singular-matrix">singular</a> versus ' +
            '<a href="#nonsingular-matrix">nonsingular</a>.',
          'The transpose is not decoration: adj(A) is defined so that ' +
            'A&middot;adj(A) = |A| I<sub>n</sub>, which is what makes the division by |A| work.',
          'Useful for 2 &times; 2 and for proofs; for anything larger ' +
            '<a href="#gaussian-elimination">elimination</a> is far less work than n² cofactors.'
        ],
        defZh:
          '<a href="#matrix-of-cofactors">餘因子矩陣</a>的<a href="#transpose">轉置</a>，記作 ' +
          '<span class="mono">adj(A)</span>。',
        notesZh: [
          '它給出<a href="#matrix-inverse">反矩陣</a>的公式解：方陣 A 若 |A| &ne; 0，則 A<sup>&minus;1</sup> = (1/|A|) adj(A)。',
          '筆記同時記下對應的判準：<strong>方陣 A 可逆的充要條件是 |A| &ne; 0</strong> &mdash; 也就是' +
            '<a href="#singular-matrix">奇異</a>與<a href="#nonsingular-matrix">非奇異</a>的那條界線。',
          '轉置不是裝飾：adj(A) 這樣定義才會有 A&middot;adj(A) = |A| I<sub>n</sub>，除以 |A| 才說得通。',
          '2 &times; 2 和證明時好用；再大就不如直接做<a href="#gaussian-elimination">消去法</a>，不必算 n² 個餘因子。（後兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Adjoint of matrix: the <strong>transpose</strong> of matrix of cofactors of a matrix. ' +
              'Denoted <strong>adj(A)</strong>.</p>' +
              '<p>Let A be a square matrix with |A| &ne; 0. A is invertible with ' +
              'A<sup>&minus;1</sup> = (1/|A|) adj(A)</p>' +
              '<p>A square matrix A is invertible if and only if |A| &ne; 0.</p>'
          },
          {
            label: 'Inverting a 2 × 2 with it',
            html:
              '<p>A = ' + M([[1, 2], [3, 4]]) + ', |A| = &minus;2, cofactors ' +
              M([[4, '&minus;3'], ['&minus;2', 1]]) + ', adj(A) = ' +
              M([[4, '&minus;2'], ['&minus;3', 1]]) + '</p>' +
              '<p>A<sup>&minus;1</sup> = (1/&minus;2)&middot;adj(A) = ' +
              M([['&minus;2', 1], ['1.5', '&minus;0.5']]) + '</p>'
          }
        ]
      },

      {
        id: 'cramers-rule',
        term: "Cramer's rule",
        abbr: 'x<sub>i</sub> = |A<sub>i</sub>|/|A|',
        zh: '克拉瑪公式',
        zhAlt: '克萊姆法則',
        aliases: ['cramer', "cramer's rule", '克拉瑪', '克萊姆', 'determinant solution'],
        tags: ['ch3.3', 'determinants'],
        def:
          'For <a href="#matrix-form-of-a-system">AX = B</a> with A square and ' +
          '<span class="mono">|A| &ne; 0</span>, the unique solution is read off as a ratio of ' +
          'determinants: <span class="mono">x&#8321; = |A&#8321;|/|A|, x&#8322; = |A&#8322;|/|A|, &hellip;, ' +
          'x<sub>n</sub> = |A<sub>n</sub>|/|A|</span>, where <strong>A<sub>i</sub> is A with column i ' +
          'replaced by B</strong>.',
        notes: [
          'The notes pair it with textbook Theorem 3.7: for a system of n equations in n variables, ' +
            '|A| &ne; 0 gives a unique solution; |A| = 0 gives many solutions or none.',
          'It solves for one unknown without touching the others, which ' +
            '<a href="#gaussian-elimination">elimination</a> cannot do — handy when only x&#8323; is wanted.',
          'The cost is steep: n + 1 determinants of size n. Past 3 &times; 3 it is a formula for proofs, ' +
            'not for computing.',
          'It needs A square and non-singular; with |A| = 0 the formula divides by zero and says nothing ' +
            'about which of the two cases you are in.'
        ],
        defZh:
          '對 <a href="#matrix-form-of-a-system">AX = B</a>，A 是方陣且 <span class="mono">|A| &ne; 0</span> 時，' +
          '唯一解可以用行列式的比值讀出來：x&#8321; = |A&#8321;|/|A|、x&#8322; = |A&#8322;|/|A|、…、x<sub>n</sub> = |A<sub>n</sub>|/|A|，' +
          '其中 <strong>A<sub>i</sub> 是把 A 的第 i 行換成 B</strong> 的矩陣。',
        notesZh: [
          '筆記把它和課本 Theorem 3.7 擺在一起：n 個方程式、n 個變數的方程組，|A| &ne; 0 有唯一解；|A| = 0 則是無限多解或無解。',
          '它可以只解其中一個未知數而不動其他的，這是<a href="#gaussian-elimination">消去法</a>辦不到的 &mdash; 只想要 x&#8323; 時很方便。',
          '代價很高：要算 n + 1 個 n 階行列式。超過 3 &times; 3 就只適合用在證明，不適合實際計算。',
          '它要求 A 是方陣且非奇異；|A| = 0 時公式會除以零，而且也分不出是無解還是無限多解。（後三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Theorem 3.7: Let AX = B be a system of n linear equations in n variables. ' +
              'If |A| &ne; 0 there is a unique solution. If |A| = 0 there are many or no solutions.</p>' +
              '<p>Cramer&rsquo;s Rule: linear equation AX = B, |A| &ne; 0 &rArr; it has unique solution, then solution</p>' +
              '<p>x&#8321; = |A&#8321;|/|A|, x&#8322; = |A&#8322;|/|A|, &hellip;, x<sub>n</sub> = |A<sub>n</sub>|/|A|</p>' +
              '<p>&#10033; A<sub>i</sub> is matrix that replacing column i of A with B</p>'
          },
          {
            label: 'Solving a 2 × 2',
            html:
              '<p>x + 2y = 5, 3x + 4y = 11: A = ' + M([[1, 2], [3, 4]]) + ', B = ' +
              M([[5], [11]]) + ', |A| = &minus;2</p>' +
              '<p>|A&#8321;| = ' + M([[5, 2], [11, 4]]) + ' = &minus;2, |A&#8322;| = ' +
              M([[1, 5], [3, 11]]) + ' = &minus;4</p>' +
              '<p>x = &minus;2/&minus;2 = 1, y = &minus;4/&minus;2 = 2</p>'
          }
        ]
      },

      /* ============================================ 11/8 — ch3.4 eigenvalues */
      {
        id: 'eigenvalue',
        term: 'Eigenvalue',
        abbr: '&lambda;',
        zh: '特徵值',
        zhAlt: '固有值',
        aliases: ['eigenvalue', 'lambda', '特徵值', '固有值', 'Ax = lambda x'],
        tags: ['ch3.4', 'eigen'],
        def:
          'A scalar &lambda; such that multiplying some <strong>non-zero</strong> vector ' +
          '<strong>x</strong> by &lambda; gives the same result as multiplying it by the n &times; n ' +
          'matrix A: <span class="mono">Ax = &lambda;x</span>.',
        notes: [
          'The vector has to be non-zero — A<strong>0</strong> = &lambda;<strong>0</strong> holds for ' +
            'every &lambda;, so <strong>0</strong> would make the definition empty. &lambda; = 0 itself ' +
            '<em>is</em> allowed, and happens exactly when A is ' +
            '<a href="#singular-matrix">singular</a>.',
          'Geometrically, A leaves the direction of <strong>x</strong> alone and only stretches it by ' +
            '&lambda; — the <a href="#rotation">rotation</a> is the opposite case, where no real ' +
            'direction survives.',
          'Only square matrices have eigenvalues: Ax and &lambda;x must be the same size.',
          'You find them by solving the ' +
            '<a href="#characteristic-equation">characteristic equation</a>.'
        ],
        defZh:
          '一個純量 &lambda;，使得某個<strong>非零</strong>向量 <strong>x</strong> 乘上 &lambda; 的結果，' +
          '和它乘上 n &times; n 矩陣 A 的結果相同：<span class="mono">Ax = &lambda;x</span>。',
        notesZh: [
          '向量必須非零 &mdash; A<strong>0</strong> = &lambda;<strong>0</strong> 對任何 &lambda; 都成立，' +
            '用 <strong>0</strong> 的話定義就空了。但 &lambda; = 0 本身是允許的，而且恰好發生在 A 是' +
            '<a href="#singular-matrix">奇異矩陣</a>的時候。',
          '幾何上，A 不改變 <strong>x</strong> 的方向，只把它伸縮 &lambda; 倍 &mdash; ' +
            '<a href="#rotation">旋轉</a>就是相反的例子，沒有任何實方向留得下來。',
          '只有方陣有特徵值：Ax 和 &lambda;x 大小要一樣。',
          '求法是解<a href="#characteristic-equation">特徵方程式</a>。（前三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Eigen value: a scalar &lambda; and it multiply a non zero vector x is equal to ' +
              'a n&times;n matrix A multiplying x. The scalar &lambda; is called eigenvalue.</p>'
          },
          {
            label: 'One by hand',
            html:
              '<p>A = ' + M([[2, 0], [0, 3]]) + ', x = ' + M([[1], [0]]) + ': Ax = ' +
              M([[2], [0]]) + ' = 2x &rArr; &lambda; = 2</p>'
          }
        ]
      },

      {
        id: 'eigenvector',
        term: 'Eigenvector',
        abbr: 'x',
        zh: '特徵向量',
        zhAlt: '固有向量',
        aliases: ['eigenvector', '特徵向量', '固有向量'],
        tags: ['ch3.4', 'eigen'],
        def:
          'The non-zero vector <strong>x</strong> in <span class="mono">Ax = &lambda;x</span> — the one ' +
          'whose direction A does not change.',
        notes: [
          'Eigenvectors come in families: if <strong>x</strong> works then so does c<strong>x</strong> ' +
            'for every non-zero scalar c, since A(cx) = cAx = c&lambda;x = &lambda;(cx). There is no ' +
            '"the" eigenvector for a &lambda;, only a direction.',
          'Collect them all, add <strong>0</strong> back in, and you get the ' +
            '<a href="#eigenspace">eigenspace</a> of &lambda;.',
          'Each eigenvector belongs to exactly one <a href="#eigenvalue">eigenvalue</a>: if ' +
            '&lambda;&#8321;x = &lambda;&#8322;x with x &ne; <strong>0</strong> then ' +
            '&lambda;&#8321; = &lambda;&#8322;.'
        ],
        defZh:
          '<span class="mono">Ax = &lambda;x</span> 裡的那個非零向量 <strong>x</strong> &mdash; 方向不被 A 改變的向量。',
        notesZh: [
          '特徵向量是成群出現的：<strong>x</strong> 可以的話，任何非零純量倍 c<strong>x</strong> 也可以，' +
            '因為 A(cx) = cAx = c&lambda;x = &lambda;(cx)。所以一個 &lambda; 沒有「那個」特徵向量，只有一個方向。',
          '把它們全部收集起來、再把 <strong>0</strong> 加回去，就是 &lambda; 的<a href="#eigenspace">特徵空間</a>。',
          '每個特徵向量只屬於一個<a href="#eigenvalue">特徵值</a>：若 &lambda;&#8321;x = &lambda;&#8322;x 且 x &ne; <strong>0</strong>，則 &lambda;&#8321; = &lambda;&#8322;。（這三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Eigenvector: according to above description, vector x is eigenvector.</p>'
          },
          {
            label: 'A whole direction at once',
            html:
              '<p>A = ' + M([[2, 0], [0, 3]]) + ': (1, 0), (5, 0), (&minus;2, 0) are all eigenvectors for &lambda; = 2</p>'
          }
        ]
      },

      {
        id: 'characteristic-polynomial',
        term: 'Characteristic polynomial',
        abbr: '|A &minus; &lambda;I|',
        zh: '特徵多項式',
        aliases: ['characteristic polynomial', '特徵多項式', 'A - lambda I'],
        tags: ['ch3.4', 'eigen'],
        def:
          'The <a href="#determinant">determinant</a> ' +
          '<span class="mono">|A &minus; &lambda;I|</span>, treated as a polynomial in &lambda;.',
        notes: [
          'Where it comes from, as the notes derive it: Ax = &lambda;x &rArr; Ax &minus; &lambda;x = ' +
            '<strong>0</strong> &rArr; (A &minus; &lambda;I)x = <strong>0</strong>. For a non-zero x to ' +
            'exist, A &minus; &lambda;I must be <a href="#singular-matrix">singular</a>, so ' +
            '|A &minus; &lambda;I| = 0.',
          'Why the I is needed: &lambda; is a scalar and A is a matrix, so A &minus; &lambda; is not ' +
            'defined. &lambda;I turns the scalar into a matrix of the right size.',
          'For an n &times; n matrix it has degree n, so there are n ' +
            '<a href="#eigenvalue">eigenvalues</a> counted with multiplicity — though some may repeat ' +
            'or be complex.'
        ],
        defZh:
          '把<a href="#determinant">行列式</a> <span class="mono">|A &minus; &lambda;I|</span> 看成 &lambda; 的多項式。',
        notesZh: [
          '來源就是筆記上的推導：Ax = &lambda;x &rArr; Ax &minus; &lambda;x = <strong>0</strong> &rArr; ' +
            '(A &minus; &lambda;I)x = <strong>0</strong>。要有非零的 x，A &minus; &lambda;I 就必須是' +
            '<a href="#singular-matrix">奇異矩陣</a>，所以 |A &minus; &lambda;I| = 0。',
          '為什麼要有 I：&lambda; 是純量、A 是矩陣，A &minus; &lambda; 沒有定義。&lambda;I 把純量變成同樣大小的矩陣。',
          'n &times; n 矩陣的特徵多項式是 n 次，所以連重根一起算有 n 個<a href="#eigenvalue">特徵值</a> &mdash; 不過可能重複，也可能是複數。（後兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Characteristic polynomial（特徵多項式）: let A an n&times;n matrix and &lambda; an eigenvalue ' +
              'and x is eigenvector.</p>' +
              '<p>Ax = &lambda;x &rArr; Ax &minus; &lambda;x = 0 &rArr; (A &minus; &lambda;I)x = 0</p>' +
              '<p>Suppose x is nonzero vector, so |A &minus; &lambda;I| = 0. ' +
              '|A &minus; &lambda;I| is characteristic polynomial.</p>'
          },
          {
            label: 'Writing one out',
            html:
              '<p>A = ' + M([[1, 2], [4, 3]]) + ', A &minus; &lambda;I = ' +
              M([['1 &minus; &lambda;', 2], [4, '3 &minus; &lambda;']]) + '</p>' +
              '<p>|A &minus; &lambda;I| = (1 &minus; &lambda;)(3 &minus; &lambda;) &minus; 8 = ' +
              '&lambda;² &minus; 4&lambda; &minus; 5</p>'
          }
        ]
      },

      {
        id: 'characteristic-equation',
        term: 'Characteristic equation',
        abbr: '|A &minus; &lambda;I| = 0',
        zh: '特徵方程式',
        aliases: ['characteristic equation', '特徵方程式', '特徵方程'],
        tags: ['ch3.4', 'eigen'],
        def:
          'Setting the <a href="#characteristic-polynomial">characteristic polynomial</a> to zero: ' +
          '<span class="mono">|A &minus; &lambda;I| = 0</span>. Its roots are the ' +
          '<a href="#eigenvalue">eigenvalues</a> of A.',
        notes: [
          'This is the actual recipe — solve it for &lambda;, then put each &lambda; back into ' +
            '(A &minus; &lambda;I)x = <strong>0</strong> and solve that ' +
            '<a href="#homogeneous-system">homogeneous system</a> for the ' +
            '<a href="#eigenvector">eigenvectors</a>.',
          'The second step always has infinitely many solutions, by construction: A &minus; &lambda;I was ' +
            'made singular on purpose, so there are <a href="#free-variable">free variables</a>.',
          'Real matrices can have complex roots — the 90&deg; ' +
            '<a href="#rotation">rotation</a> matrix gives &lambda;² + 1 = 0.'
        ],
        defZh:
          '把<a href="#characteristic-polynomial">特徵多項式</a>設為零：' +
          '<span class="mono">|A &minus; &lambda;I| = 0</span>。它的根就是 A 的<a href="#eigenvalue">特徵值</a>。',
        notesZh: [
          '這就是實際的做法 &mdash; 先解出 &lambda;，再把每個 &lambda; 代回 (A &minus; &lambda;I)x = <strong>0</strong>，' +
            '解這個<a href="#homogeneous-system">齊次方程組</a>得到<a href="#eigenvector">特徵向量</a>。',
          '第二步一定有無限多解，這是設計出來的：A &minus; &lambda;I 本來就是被弄成奇異的，所以會有' +
            '<a href="#free-variable">自由變數</a>。',
          '實矩陣也可能有複數根 &mdash; 90&deg; 的<a href="#rotation">旋轉</a>矩陣就給出 &lambda;² + 1 = 0。（這三點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Characteristic equation: according to above description, |A &minus; &lambda;I| = 0 is ' +
              'characteristic equation.</p>'
          },
          {
            label: 'All the way through',
            html:
              '<p>A = ' + M([[1, 2], [4, 3]]) + ': &lambda;² &minus; 4&lambda; &minus; 5 = 0 &rArr; ' +
              '&lambda; = 5 or &lambda; = &minus;1</p>' +
              '<p>&lambda; = 5: (A &minus; 5I)x = 0 &rArr; x = r(1, 2)</p>' +
              '<p>&lambda; = &minus;1: (A + I)x = 0 &rArr; x = r(1, &minus;1)</p>'
          }
        ]
      },

      {
        id: 'eigenspace',
        term: 'Eigenspace',
        zh: '特徵空間',
        aliases: ['eigenspace', '特徵空間', 'eigenspaces'],
        tags: ['ch3.4', 'eigen'],
        def:
          'All the <a href="#eigenvector">eigenvectors</a> belonging to one ' +
          '<a href="#eigenvalue">eigenvalue</a> &lambda;, <strong>together with the ' +
          '<a href="#zero-vector">zero vector</a></strong>. It is a ' +
          '<a href="#subspace">subspace</a>.',
        notes: [
          'The zero vector has to be added by hand: it is not an eigenvector, but without it the set is ' +
            'not <a href="#closed-under">closed</a> and so not a subspace.',
          'The notes\' example: the eigenvectors of &lambda; = 2 are the non-zero vectors ' +
            'r(&minus;1, 1); adding <strong>0</strong> gives a subspace with ' +
            '<a href="#basis">basis</a> {(&minus;1, 1)} and ' +
            '<a href="#dimension">dimension</a> 1. For &lambda; = &minus;1 it is the one-dimensional ' +
            'space spanned by (&minus;2, 1).',
          'Its dimension says how many independent directions &lambda; stretches — 1 for a plain line of ' +
            'eigenvectors, more when &lambda; is a repeated root.'
        ],
        defZh:
          '屬於同一個<a href="#eigenvalue">特徵值</a> &lambda; 的所有<a href="#eigenvector">特徵向量</a>，' +
          '<strong>再加上<a href="#zero-vector">零向量</a></strong>。它是一個<a href="#subspace">子空間</a>。',
        notesZh: [
          '零向量要手動加進去：它不是特徵向量，但少了它這個集合就不<a href="#closed-under">封閉</a>，也就不是子空間。',
          '筆記的例子：&lambda; = 2 的特徵向量是所有非零的 r(&minus;1, 1)；加上 <strong>0</strong> 之後是一個子空間，' +
            '<a href="#basis">基底</a>為 {(&minus;1, 1)}、<a href="#dimension">維度</a>為 1。' +
            '&lambda; = &minus;1 則是由 (&minus;2, 1) 生成的一維空間。',
          '維度告訴你 &lambda; 拉伸了幾個獨立方向 &mdash; 一條特徵向量直線就是 1，&lambda; 是重根時會更多。（這點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes (textbook)',
            html:
              '<p>Eigenspaces: the eigenvectors of &lambda; = 2 are nonzero vectors of the form r(&minus;1, 1). ' +
              'Add the zero vector to this set to get the set of <em>all</em> vectors of the form r(&minus;1, 1). ' +
              'This set is closed under addition and scalar multiplication; it is a subspace.</p>' +
              '<p>This subspace {r(&minus;1, 1)}, with a basis {(&minus;1, 1)}, is called the eigenspace of ' +
              '&lambda; = 2. The dimension of the eigenspace is 1. Similarly, the eigenspace for ' +
              '&lambda; = &minus;1 is the one-dimensional space {s(&minus;2, 1)}, with a basis {(&minus;2, 1)}.</p>'
          }
        ]
      },

      /* ============================================ 11/15 — ch4.1 general vector spaces */
      {
        id: 'vector-space',
        term: 'Vector space (general)',
        abbr: 'V',
        zh: '向量空間（一般定義）',
        zhAlt: '抽象向量空間',
        aliases: ['vector space', 'general vector space', '向量空間', '抽象向量空間', 'axioms'],
        tags: ['ch4.1', 'vector spaces'],
        def:
          'A set V of elements called <strong>vectors</strong>, with an addition and a scalar ' +
          'multiplication defined on it that satisfy a fixed list of conditions (for arbitrary ' +
          '<strong>u</strong>, <strong>v</strong>, <strong>w</strong> in V and scalars c, d).',
        notes: [
          'This is <a href="#vector-space-rn">&#8477;<sup>n</sup></a> with the arrows removed. The ' +
            'elements no longer have to be lists of numbers — matrices, polynomials and functions all ' +
            'form vector spaces under their usual addition and scaling.',
          '<strong>Properties that follow</strong> (from the notes), for v in V, the zero vector ' +
            '<strong>0</strong>, a scalar c and the number 0: &#9312; 0v = <strong>0</strong>; ' +
            '&#9313; c<strong>0</strong> = <strong>0</strong>; &#9314; (&minus;1)v = &minus;v; ' +
            '&#9315; if cv = <strong>0</strong> then c = 0 or v = <strong>0</strong>.',
          'Note the two different zeros in &#9312;: the scalar 0 on the left, the zero <em>vector</em> ' +
            'on the right. &#9315; is the one that gets used constantly — it is what makes ' +
            '<a href="#linear-independence">linear independence</a> arguments work.',
          'The notes\' box stops at "satisfy the following conditions" without listing them. They are ' +
            'the ten usual axioms: addition is closed, commutative and associative, has an identity ' +
            '<strong>0</strong> and inverses &minus;u; scalar multiplication is closed, distributes over ' +
            'both kinds of sum, satisfies c(du) = (cd)u, and 1u = u.',
          'The 11/15 page gives no chapter number for this block. Tagged <strong>ch4.1</strong> from the ' +
            'textbook, where the general definition opens the chapter.'
        ],
        defZh:
          '一個集合 V，其元素稱為<strong>向量</strong>，並定義了加法與純量乘法，且滿足一組固定的條件' +
          '（對 V 中任意 <strong>u</strong>、<strong>v</strong>、<strong>w</strong> 與純量 c、d）。',
        notesZh: [
          '這就是把箭頭拿掉的 <a href="#vector-space-rn">&#8477;<sup>n</sup></a>。元素不必再是一串數字 &mdash; ' +
            '矩陣、多項式、函數在各自的加法與伸縮下都構成向量空間。',
          '<strong>可以推出的性質</strong>（筆記）：設 v 在 V 中、<strong>0</strong> 是零向量、c 是純量、0 是數字 &mdash; ' +
            '&#9312; 0v = <strong>0</strong>；&#9313; c<strong>0</strong> = <strong>0</strong>；' +
            '&#9314; (&minus;1)v = &minus;v；&#9315; 若 cv = <strong>0</strong>，則 c = 0 或 v = <strong>0</strong>。',
          '注意 &#9312; 裡有兩種零：左邊是純量 0，右邊是零<em>向量</em>。&#9315; 最常用 &mdash; ' +
            '<a href="#linear-independence">線性獨立</a>的論證全靠它。',
          '筆記的框框停在「satisfy the following conditions」就沒了。那十條公理是：加法封閉、交換、結合，' +
            '有單位元 <strong>0</strong> 與反元素 &minus;u；純量乘法封閉，對兩種和都分配，' +
            'c(du) = (cd)u，以及 1u = u。（這段是這裡補上的）',
          '11/15 這一段沒有寫章節號。依課本標 <strong>ch4.1</strong>，一般定義正是該章的開頭。'
        ],
        examples: [
          {
            label: 'From the notes (textbook definition)',
            html:
              '<p>A <strong>vector space</strong> is a set V of elements called <strong>vectors</strong>, ' +
              'having operations of addition and scalar multiplication defined on it that satisfy the ' +
              'following conditions. (u, v, and w are arbitrary elements of V, and c and d are scalars.)</p>' +
              '<p>Let V be a vector space, v a vector in V, <strong>0</strong> the zero vector of V, ' +
              'c a scalar, and 0 the zero scalar. Then</p>' +
              '<p>(a) 0v = <strong>0</strong> &nbsp; (b) c<strong>0</strong> = <strong>0</strong> &nbsp; ' +
              '(c) (&minus;1)v = &minus;v &nbsp; (d) If cv = <strong>0</strong>, then either c = 0 or v = <strong>0</strong></p>'
          },
          {
            label: 'Spaces that are not ℝⁿ',
            html:
              '<p>all 2 &times; 2 matrices, under matrix addition and scalar multiples</p>' +
              '<p>all polynomials of degree &le; 3</p>' +
              '<p>all continuous functions on [0, 1]</p>'
          }
        ]
      },

      /* ============================================ 11/15, 11/16 — ch4.4 basis and dimension */
      {
        id: 'basis-tests',
        term: 'Testing for a basis',
        abbr: '2 of 3',
        zh: '基底的判別',
        zhAlt: '三個條件二取二',
        aliases: ['basis test', 'base', 'three statements', '基底判別', '基底條件'],
        tags: ['ch4.4', 'basis'],
        def:
          'A set is a <a href="#basis">basis</a> of a vector space V when all three of these hold: ' +
          '&#9312; the set <strong>spans</strong> V; &#9313; its vectors are <strong>linearly ' +
          'independent</strong>; &#9314; the <strong>number of vectors equals the ' +
          '<a href="#dimension">dimension</a></strong> of V. The notes\' shortcut: <strong>any two of ' +
          'the three imply the third</strong>.',
          notes: [
          'That shortcut is what makes basis checking cheap. Once you know dim V = n, a set of exactly ' +
            'n vectors only has to pass <em>one</em> more test — either spanning or independence, ' +
            'whichever is easier.',
          'The counting facts behind it, both in the notes: <strong>all bases of V have the same number ' +
            'of vectors</strong>, and a set of <strong>more than n vectors in an n-dimensional space is ' +
            'always dependent</strong>.',
          'It also works the other way: a <a href="#linear-independence">linearly independent</a> set of ' +
            'm &lt; n vectors can always be extended with further vectors ' +
            'v<sub>m+1</sub>, &hellip;, v<sub>n</sub> to a basis of V.',
          'Terminology: the notes head this section "Base". In English the word is <strong>basis</strong> ' +
            '(plural <em>bases</em>); "base" is a different term.'
        ],
        defZh:
          '一組向量是向量空間 V 的<a href="#basis">基底</a>，條件是三件事同時成立：' +
          '&#9312; 這組向量<strong>生成</strong> V；&#9313; 它們<strong>線性獨立</strong>；' +
          '&#9314; 向量個數等於 V 的<strong><a href="#dimension">維度</a></strong>。' +
          '筆記的捷徑：<strong>三個條件滿足其中兩個，第三個就自動成立</strong>。',
        notesZh: [
          '這個捷徑讓驗證基底變得很省事。只要知道 dim V = n，一組剛好 n 個向量就只需要再過<em>一關</em> &mdash; ' +
            '生成或獨立，挑好驗的那個就好。',
          '背後的兩個計數事實，筆記都有：<strong>V 的所有基底向量個數相同</strong>；' +
            '在 n 維空間裡<strong>超過 n 個向量的集合一定線性相依</strong>。',
          '反方向也成立：m &lt; n 個向量的<a href="#linear-independence">線性獨立</a>集合，' +
            '一定可以再補上 v<sub>m+1</sub>、…、v<sub>n</sub> 湊成 V 的基底。',
          '用詞：筆記這一節的標題寫「Base」。英文的正確說法是 <strong>basis</strong>（複數 <em>bases</em>），' +
            '「base」是另一個字。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Base: a finite set of vectors {v&#8321; &hellip; v<sub>m</sub>}. If it spans a vector space V ' +
              'and it is linearly independent, it is called a basis for a vector space V.</p>' +
              '<p>&rarr; Each vector in V is <strong>uniquely</strong> a linear combination of the vectors in a basis.</p>' +
              '<p>&#10033; A basis of V is satisfied under statements:</p>' +
              '<p>&middot; The set spans V &nbsp; &middot; Vectors in the set are linearly independent &nbsp; ' +
              '&middot; The number of vectors equals dimension of V</p>' +
              '<p>&#10033; satisfied two of statements of basis then it is a basis for a vector space V</p>'
          },
          {
            label: 'Using the shortcut in ℝ³',
            html:
              '<p>dim &#8477;³ = 3, so (1, 1, 0), (0, 1, 1), (1, 0, 1) already pass &#9314;</p>' +
              '<p>they are independent &rArr; &#9312; follows, so they are a basis — no need to check spanning</p>'
          }
        ]
      },

      /* ============================================ 11/10, 11/16 — ch4.5 row space and rank */
      {
        id: 'row-space',
        term: 'Row space',
        zh: '列空間',
        zhAlt: '橫列生成的空間',
        aliases: ['row space', 'row vectors', '列空間', '橫列空間'],
        tags: ['ch4.5', 'rank'],
        def:
          'For an m &times; n matrix A, the rows r&#8321;, &hellip;, r<sub>m</sub> are the ' +
          '<strong>row vectors</strong> of A. Each has <strong>n</strong> components, and the ' +
          '<a href="#subspace">subspace</a> of &#8477;<sup>n</sup> they ' +
          '<a href="#span">span</a> is the <strong>row space</strong> of A.',
        notes: [
          'A <a href="#basis">basis</a> for it falls out of elimination: if E is the ' +
            '<a href="#reduced-echelon-form">reduced echelon form</a> of A, the <strong>non-zero row ' +
            'vectors of E form a basis for the row space of A</strong>.',
          'That works because <a href="#row-equivalent">row equivalent</a> matrices have the ' +
            '<strong>same row space</strong> — the three ' +
            '<a href="#elementary-row-operation">row operations</a> only recombine rows, never reach ' +
            'outside their span.',
          'The rows of A themselves are usually <em>not</em> a basis: they span the row space but may be ' +
            'dependent. The echelon rows are the cleaned-up version.'
        ],
        defZh:
          '設 A 是 m &times; n 矩陣，各列 r&#8321;、…、r<sub>m</sub> 稱為 A 的<strong>列向量</strong>。' +
          '每個列向量有 <strong>n</strong> 個分量，它們所<a href="#span">生成</a>的 ' +
          '&#8477;<sup>n</sup> 的<a href="#subspace">子空間</a>就是 A 的<strong>列空間</strong>。',
        notesZh: [
          '基底可以從消去法直接得到：設 E 是 A 的<a href="#reduced-echelon-form">簡化列梯形</a>，' +
            '則 <strong>E 的非零列向量就是 A 的列空間的一組<a href="#basis">基底</a></strong>。',
          '之所以成立，是因為<a href="#row-equivalent">列等價</a>的矩陣有<strong>相同的列空間</strong> &mdash; ' +
            '三種<a href="#elementary-row-operation">列運算</a>只是把列重新組合，從不跑出它們的生成空間。',
          'A 原本的那些列通常<em>不是</em>基底：它們生成列空間，但可能相依。梯形後的列才是整理乾淨的版本。（這點是這裡補上的）',
          '台灣稱 row 為「列」、column 為「行」。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Let A be an m&times;n matrix. Rows of A is <strong>row vectors</strong> ' +
              'r&#8321; &hellip; r<sub>m</sub>. Each vector has <strong>n</strong> components, span a subspace.</p>' +
              '<p>The nonzero row vectors of a matrix A that is in reduced echelon form are a basis for the ' +
              'row space of A.</p>' +
              '<p>Let A and B be row equivalent matrices. Then A and B have the same row space: rank A = rank B</p>'
          },
          {
            label: 'Reading a basis off the echelon form',
            html:
              '<p>A = ' + M([[1, 2, 3], [2, 4, 6], [1, 0, 1]]) + ' &rarr; E = ' +
              M([[1, 0, 1], [0, 1, 1], [0, 0, 0]]) + '</p>' +
              '<p>basis of the row space: (1, 0, 1), (0, 1, 1)</p>'
          }
        ]
      },

      {
        id: 'column-space',
        term: 'Column space',
        zh: '行空間',
        zhAlt: '直行生成的空間',
        aliases: ['column space', 'column vectors', '行空間', '直行空間'],
        tags: ['ch4.5', 'rank'],
        def:
          'The <a href="#subspace">subspace</a> <a href="#span">spanned</a> by the ' +
          '<strong>column vectors</strong> c&#8321;, &hellip;, c<sub>n</sub> of A. For an m &times; n ' +
          'matrix each column has m components, so the column space lives in &#8477;<sup>m</sup>.',
        notes: [
          'The headline result: the <strong>row space and the column space of a matrix have the same ' +
            'dimension</strong>, even though they usually sit in different spaces. That shared number is ' +
            'the <a href="#rank">rank</a>.',
          'It is the set of all <a href="#matrix-form-of-a-system">AX</a> as X ranges over ' +
            '&#8477;<sup>n</sup>, so AX = B is solvable exactly when B lies in the column space.',
          'A quick route to a basis: take the columns of A in the positions where E has ' +
            '<a href="#leading-1">leading 1s</a> — the columns of A, not of E.'
        ],
        defZh:
          '由 A 的<strong>行向量</strong> c&#8321;、…、c<sub>n</sub> 所<a href="#span">生成</a>的' +
          '<a href="#subspace">子空間</a>。m &times; n 矩陣的每一行有 m 個分量，所以行空間住在 &#8477;<sup>m</sup> 裡。',
        notesZh: [
          '重點結論：<strong>矩陣的列空間與行空間維度相同</strong>，即使兩者通常住在不同的空間裡。' +
            '這個共同的數就是 <a href="#rank">rank（秩）</a>。',
          '它就是 X 跑遍 &#8477;<sup>n</sup> 時所有 <a href="#matrix-form-of-a-system">AX</a> 的集合，' +
            '所以 AX = B 有解，恰好等於 B 落在行空間裡。',
          '找基底的捷徑：取 E 中有<a href="#leading-1">領先 1</a> 的那些位置，對應回 A 的那幾行 &mdash; 是 A 的行，不是 E 的。（後兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Column of A is <strong>column vectors</strong> c&#8321; &hellip;</p>' +
              '<p>The row space and the column space of a matrix A have the same dimension.</p>'
          }
        ]
      },

      {
        id: 'rank',
        term: 'Rank',
        abbr: 'rank(A)',
        zh: '秩',
        zhAlt: '階',
        aliases: ['rank', 'rank of a matrix', '秩', '階數'],
        tags: ['ch4.5', 'rank'],
        def:
          'The common <a href="#dimension">dimension</a> of the <a href="#row-space">row space</a> and ' +
          'the <a href="#column-space">column space</a> of A — equivalently, the <strong>number of ' +
          'non-zero row vectors in the <a href="#reduced-echelon-form">reduced echelon form</a></strong> ' +
          'of A.',
        notes: [
          '<a href="#row-equivalent">Row equivalent</a> matrices have the same rank, which is why ' +
            'elimination is allowed to compute it. It is also the number of ' +
            '<a href="#pivot">pivots</a>.',
          'Bounds: rank(A) &le; min(m, n). A square n &times; n matrix with rank n is ' +
            '<a href="#nonsingular-matrix">nonsingular</a> — see ' +
            '<a href="#rank-and-solutions">rank and solutions</a>.',
          'Because row and column rank agree, rank(A&#7488;) = rank(A).'
        ],
        defZh:
          'A 的<a href="#row-space">列空間</a>與<a href="#column-space">行空間</a>共同的' +
          '<a href="#dimension">維度</a> &mdash; 等價地說，就是 A 的' +
          '<a href="#reduced-echelon-form">簡化列梯形</a>中<strong>非零列向量的個數</strong>。',
        notesZh: [
          '<a href="#row-equivalent">列等價</a>的矩陣 rank 相同，所以才可以用消去法去算。它也等於' +
            '<a href="#pivot">主元</a>的個數。',
          '範圍：rank(A) &le; min(m, n)。n &times; n 方陣的 rank 是 n 時就是' +
            '<a href="#nonsingular-matrix">非奇異矩陣</a> &mdash; 見' +
            '<a href="#rank-and-solutions">rank 與解的關係</a>。',
          '因為列秩等於行秩，所以 rank(A&#7488;) = rank(A)。（後兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>The rank of A is the number of nonzero row vectors.</p>' +
              '<p>Let E be the reduced echelon form of a matrix A. The nonzero row vectors of E form a ' +
              'basis for the row space of A. The rank of A is the number of nonzero row vectors in E</p>'
          },
          {
            label: 'Counting it',
            html:
              '<p>E = ' + M([[1, 0, 1], [0, 1, 1], [0, 0, 0]]) + ' &rarr; two non-zero rows &rArr; rank = 2</p>'
          }
        ]
      },

      {
        id: 'rank-and-solutions',
        term: 'Rank and the solutions of AX = B',
        abbr: 'r vs n',
        zh: 'rank 與解的關係',
        zhAlt: '秩與解的個數',
        aliases: ['rank and solutions', 'theorem 4.18', 'consistent', '秩與解', '解的判別'],
        tags: ['ch4.5', 'rank'],
        def:
          'For a system <a href="#matrix-form-of-a-system">AX = B</a> of m equations in n variables, ' +
          'compare the <a href="#rank">rank</a> of the ' +
          '<a href="#coefficient-matrix">matrix of coefficients</a> with that of the ' +
          '<a href="#augmented-matrix">augmented matrix</a>: ' +
          '&#9312; same rank r and <strong>r = n</strong> &rarr; the solution is <strong>unique</strong>; ' +
          '&#9313; same rank r and <strong>r &lt; n</strong> &rarr; <strong>many</strong> solutions; ' +
          '&#9314; <strong>different</strong> ranks &rarr; <strong>no</strong> solution.',
        notes: [
          'This is the <a href="#type-of-solution">three types of solution</a> from ch1.1, now decided by ' +
            'two numbers instead of by inspecting the echelon form.',
          'Case &#9314; is the inconsistent one: a bigger rank in the augmented matrix means elimination ' +
            'produced a row reading 0 = non-zero.',
          'In case &#9313; the number of <a href="#free-variable">free variables</a> is exactly ' +
            'n &minus; r.',
          '<strong>Theorem 4.18</strong> collects the square case — for an n &times; n matrix A these are ' +
            'all the same statement: (a) |A| &ne; 0 (A is ' +
            '<a href="#nonsingular-matrix">nonsingular</a>); (b) A is ' +
            '<a href="#matrix-inverse">invertible</a>; (c) A is ' +
            '<a href="#row-equivalent">row equivalent</a> to I<sub>n</sub>; (d) AX = B has a unique ' +
            'solution; (e) rank(A) = n; (f) the column vectors of A form a ' +
            '<a href="#basis">basis</a> for &#8477;<sup>n</sup>.'
        ],
        defZh:
          '對 m 個方程式、n 個變數的 <a href="#matrix-form-of-a-system">AX = B</a>，' +
          '比較<a href="#coefficient-matrix">係數矩陣</a>與<a href="#augmented-matrix">增廣矩陣</a>的' +
          '<a href="#rank">rank</a>：&#9312; rank 相同為 r 且 <strong>r = n</strong> &rarr; <strong>唯一解</strong>；' +
          '&#9313; rank 相同為 r 且 <strong>r &lt; n</strong> &rarr; <strong>無限多解</strong>；' +
          '&#9314; rank <strong>不同</strong> &rarr; <strong>無解</strong>。',
        notesZh: [
          '這就是 ch1.1 的<a href="#type-of-solution">三種解的型態</a>，只是現在由兩個數字決定，不必去看梯形長什麼樣。',
          '&#9314; 是矛盾的情形：增廣矩陣的 rank 比較大，代表消去後出現「0 = 非零數」那一列。',
          '&#9313; 的情形下，<a href="#free-variable">自由變數</a>的個數恰好是 n &minus; r。（這兩點是這裡補上的）',
          '<strong>Theorem 4.18</strong> 把方陣的情形整理在一起 &mdash; 對 n &times; n 矩陣 A，下列說法完全等價：' +
            '(a) |A| &ne; 0（A <a href="#nonsingular-matrix">非奇異</a>）；(b) A <a href="#matrix-inverse">可逆</a>；' +
            '(c) A 與 I<sub>n</sub> <a href="#row-equivalent">列等價</a>；(d) AX = B 有唯一解；' +
            '(e) rank(A) = n；(f) A 的行向量構成 &#8477;<sup>n</sup> 的一組<a href="#basis">基底</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Consider a system AX = B of m linear equations in n variables.</p>' +
              '<table>' +
              '<tr><th>ranks</th><th>result</th></tr>' +
              '<tr><td>(a) augmented and coefficient matrices have the same rank r, and r = n</td><td>the solution is unique</td></tr>' +
              '<tr><td>(b) same rank r, and r &lt; n</td><td>there are many solutions</td></tr>' +
              '<tr><td>(c) the two matrices do not have the same rank</td><td>a solution does not exist</td></tr>' +
              '</table>'
          },
          {
            label: 'From the notes (Theorem 4.18)',
            html:
              '<p>Let A be an n &times; n matrix. The following statements are equivalent.</p>' +
              '<p>(a) |A| &ne; 0 (A is nonsingular). &nbsp; (b) A is invertible. &nbsp; ' +
              '(c) A is row equivalent to I<sub>n</sub>.</p>' +
              '<p>(d) The system of equations AX = B has a unique solution. &nbsp; (e) rank(A) = n. &nbsp; ' +
              '(f) The column vectors of A form a basis for &#8477;<sup>n</sup>.</p>'
          }
        ]
      },

      /* ============================================ 11/16 — ch4.6 orthonormal bases */
      {
        id: 'orthogonal-set',
        term: 'Orthogonal set / orthonormal set',
        zh: '正交集／單範正交集',
        aliases: ['orthogonal set', 'orthonormal set', '正交集', '單範正交集', '標準正交集'],
        tags: ['ch4.6', 'orthonormal'],
        def:
          'A set of vectors in a vector space V is an <strong>orthogonal set</strong> if every pair of ' +
          'vectors in it is <a href="#orthogonal">orthogonal</a>. It is an <strong>orthonormal ' +
          'set</strong> if it is orthogonal <em>and</em> every vector is a ' +
          '<a href="#unit-vector">unit vector</a>.',
        notes: [
          '<strong>Theorem 4.19</strong>: an orthogonal set of <strong>non-zero</strong> vectors is ' +
            '<a href="#linear-independence">linearly independent</a>. Independence comes free — no ' +
            'elimination needed.',
          'The non-zero proviso matters: <strong>0</strong> is orthogonal to everything, so a set ' +
            'containing it is orthogonal yet dependent.',
          'This is the ch1.6 pair <a href="#orthogonal">orthogonal</a> / ' +
            '<a href="#orthonormal">orthonormal</a> lifted from two vectors to a whole set, and from ' +
            '&#8477;<sup>n</sup> to any <a href="#vector-space">vector space</a>.',
          'Any orthogonal set becomes orthonormal by <a href="#normalizing">normalizing</a> each vector.'
        ],
        defZh:
          '向量空間 V 中的一組向量，若其中任兩個向量都<a href="#orthogonal">正交</a>，就是<strong>正交集</strong>；' +
          '若它正交<em>而且</em>每個向量都是<a href="#unit-vector">單位向量</a>，就是<strong>單範正交集</strong>。',
        notesZh: [
          '<strong>Theorem 4.19</strong>：由<strong>非零</strong>向量組成的正交集一定' +
            '<a href="#linear-independence">線性獨立</a>。獨立性是免費送的 &mdash; 不必做消去法。',
          '「非零」這個但書有意義：<strong>0</strong> 和任何向量都正交，所以含有 <strong>0</strong> 的集合雖然正交卻相依。（這點是這裡補上的）',
          '這是 ch1.6 的<a href="#orthogonal">正交</a>／<a href="#orthonormal">單範正交</a>，' +
            '從兩個向量推廣到整個集合，也從 &#8477;<sup>n</sup> 推廣到任何<a href="#vector-space">向量空間</a>。',
          '任何正交集只要把每個向量<a href="#normalizing">正規化</a>，就變成單範正交集。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>A set of vectors in a vector space V is said to be an <strong>orthogonal set</strong> if ' +
              'every pair of vectors in the set is orthogonal. The set is said to be an ' +
              '<strong>orthonormal set</strong> if it is orthogonal and each vector is a unit vector.</p>' +
              '<p>Theorem 4.19: An orthogonal set of nonzero vectors in a vector space is linearly independent.</p>'
          },
          {
            label: 'Orthogonal, then orthonormal',
            html:
              '<p>{(1, 1), (1, &minus;1)}: (1, 1)&middot;(1, &minus;1) = 0 &rArr; orthogonal, but ‖(1, 1)‖ = &radic;2</p>' +
              '<p>normalize: {(1/&radic;2, 1/&radic;2), (1/&radic;2, &minus;1/&radic;2)} &rArr; orthonormal</p>'
          }
        ]
      },

      {
        id: 'orthonormal-basis',
        term: 'Orthogonal basis / orthonormal basis',
        abbr: 'v = &sum;(v&middot;u<sub>i</sub>)u<sub>i</sub>',
        zh: '正交基底／單範正交基底',
        aliases: ['orthogonal basis', 'orthonormal basis', '正交基底', '單範正交基底', '標準正交基底'],
        tags: ['ch4.6', 'orthonormal'],
        def:
          'A <a href="#basis">basis</a> that is an <a href="#orthogonal-set">orthogonal set</a> is an ' +
          '<strong>orthogonal basis</strong>; one that is an orthonormal set is an ' +
          '<strong>orthonormal basis</strong>.',
        notes: [
          '<strong>Theorem 4.20</strong> is the payoff: for an orthonormal basis ' +
            '{u&#8321;, &hellip;, u<sub>n</sub>} of V, every v in V is ' +
            '<span class="mono">v = (v&middot;u&#8321;)u&#8321; + (v&middot;u&#8322;)u&#8322; + &hellip; + ' +
            '(v&middot;u<sub>n</sub>)u<sub>n</sub></span>.',
          'That is the whole point. With an ordinary basis the coefficients cost a ' +
            '<a href="#matrix-form-of-a-system">system of equations</a>; with an orthonormal one each ' +
            'coefficient is a single <a href="#dot-product">dot product</a>.',
          'The <a href="#standard-basis">standard basis</a> is the orthonormal basis everyone already ' +
            'uses — v&middot;e<sub>i</sub> is just the i-th component.',
          'Each term (v&middot;u<sub>i</sub>)u<sub>i</sub> is the projection of v onto that basis ' +
            'direction, so the formula says: project onto each axis and add the pieces back up.'
        ],
        defZh:
          '本身是<a href="#orthogonal-set">正交集</a>的<a href="#basis">基底</a>叫<strong>正交基底</strong>；' +
          '本身是單範正交集的基底叫<strong>單範正交基底</strong>。',
        notesZh: [
          '<strong>Theorem 4.20</strong> 就是回報：設 {u&#8321;, …, u<sub>n</sub>} 是 V 的單範正交基底，' +
            '則 V 中每個 v 都可以寫成 <span class="mono">v = (v&middot;u&#8321;)u&#8321; + (v&middot;u&#8322;)u&#8322; + … + ' +
            '(v&middot;u<sub>n</sub>)u<sub>n</sub></span>。',
          '這就是重點所在。用一般基底要解一組<a href="#matrix-form-of-a-system">方程組</a>才找得到係數；' +
            '用單範正交基底的話，每個係數就只是一個<a href="#dot-product">內積</a>。',
          '<a href="#standard-basis">標準基底</a>就是大家早就在用的單範正交基底 &mdash; v&middot;e<sub>i</sub> 就是第 i 個分量。',
          '每一項 (v&middot;u<sub>i</sub>)u<sub>i</sub> 是 v 在那個基底方向上的投影，所以這條公式在說：' +
            '往每個軸投影，再把碎片加回去。（後兩點是這裡補上的）'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>A basis that is an orthogonal set is said to be an <strong>orthogonal basis</strong>. ' +
              'A basis that is an orthonormal set is said to be an <strong>orthonormal basis</strong>.</p>' +
              '<p>Theorem 4.20: Let {u&#8321;, &hellip;, u<sub>n</sub>} be an orthonormal basis for a vector ' +
              'space V. Let v be a vector in V. v can be written as a linear combination of these basis ' +
              'vectors as follows</p>' +
              '<p>v = (v&middot;u&#8321;)u&#8321; + (v&middot;u&#8322;)u&#8322; + &hellip; + (v&middot;u<sub>n</sub>)u<sub>n</sub></p>'
          },
          {
            label: 'Coefficients by dot product',
            html:
              '<p>u&#8321; = (1/&radic;2)(1, 1), u&#8322; = (1/&radic;2)(1, &minus;1), v = (3, 1)</p>' +
              '<p>v&middot;u&#8321; = 4/&radic;2, v&middot;u&#8322; = 2/&radic;2</p>' +
              '<p>v = (4/&radic;2)u&#8321; + (2/&radic;2)u&#8322; = (2, 2) + (1, &minus;1) = (3, 1) &#10003;</p>'
          }
        ]
      }
    ]
  });
})();
