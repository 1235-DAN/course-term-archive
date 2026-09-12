/* ==========================================================================
   data/calculus.js — 微積分 term data
   Source notes: 微積分9_8.pdf  (9/8, ch 1.1 Functions)
                 微積分9_10.pdf (page 1 repeats 9/8; page 2 adds 9/9 and 9/10)
                 微積分9_11.pdf (ch1.2 and the start of ch2.2)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.
   ========================================================================== */

(function () {
  /* The xy-plane drawing shared by the coordinate / axis / xy-plane cards.
     mode picks what gets the accent: 'coord' the two coordinates of P,
     'axis' the two axes, 'plane' the four quadrants. */
  function plane(mode) {
    var ax = mode === 'axis',
      co = mode === 'coord',
      pl = mode === 'plane';
    var axisC = ax ? 'var(--accent)' : 'currentColor';
    var axisW = ax ? 2.4 : 1.3;
    var guideC = co ? 'var(--accent)' : 'currentColor';
    var numStyle = co ? 'fill="var(--accent)" font-weight="700"' : 'fill="currentColor"';
    var axStyle = ax ? 'fill="var(--accent)" font-weight="700"' : 'fill="currentColor"';
    var ticks = '';
    [40, 70, 100, 160, 190, 220, 250].forEach(function (x) {
      ticks += '<path d="M' + x + ' 107 V113"/>';
    });
    [20, 50, 80, 140, 170].forEach(function (y) {
      ticks += '<path d="M127 ' + y + ' H133"/>';
    });
    return (
      '<svg viewBox="0 0 300 180" role="img" aria-label="the xy-plane">' +
      (pl
        ? '<g fill="var(--accent)" font-family="serif" font-size="17" font-weight="700" ' +
          'text-anchor="middle" opacity=".8">' +
          '<text x="255" y="32">I</text><text x="45" y="32">II</text>' +
          '<text x="45" y="165">III</text><text x="255" y="165">IV</text></g>'
        : '') +
      '<g stroke="currentColor" stroke-width="1.1" opacity=".55">' + ticks + '</g>' +
      '<g stroke="' + axisC + '" stroke-width="' + axisW + '">' +
      '<path d="M20 110 H280"/><path d="M130 176 V18"/></g>' +
      '<g fill="' + axisC + '">' +
      '<polygon points="287,110 279,106 279,114"/>' +
      '<polygon points="130,11 126,19 134,19"/></g>' +
      '<g stroke="' + guideC + '" stroke-width="1.4" stroke-dasharray="4 3" opacity=".85">' +
      '<path d="M220 50 V110"/><path d="M220 50 H130"/></g>' +
      '<circle cx="220" cy="50" r="4" fill="var(--accent)"/>' +
      '<g font-family="sans-serif" font-size="11">' +
      '<text x="227" y="44" fill="currentColor">P (3, 2)</text>' +
      '<text x="122" y="124" text-anchor="end" fill="currentColor">O</text>' +
      '<text x="220" y="126" text-anchor="middle" ' + numStyle + '>3</text>' +
      '<text x="121" y="54" text-anchor="end" ' + numStyle + '>2</text>' +
      (co
        ? '<text x="220" y="140" text-anchor="middle" fill="var(--accent)">x-coordinate</text>' +
          '<text x="121" y="68" text-anchor="end" fill="var(--accent)">y-coordinate</text>'
        : '') +
      '<text x="283" y="128" text-anchor="end" ' + axStyle + '>x-axis</text>' +
      '<text x="138" y="22" ' + axStyle + '>y-axis</text>' +
      '</g></svg>'
    );
  }

  /* y = x² with only the right half kept, plus a horizontal line that meets
     the full parabola twice but the restricted half once. Shared by the
     one-to-one and domain-restriction cards. */
  var RESTRICTED_PARABOLA =
    '<svg viewBox="0 0 300 150" role="img" aria-label="restricting x squared to x at least 0">' +
    '<path d="M20 130 H280" stroke="currentColor" stroke-width="1.2" opacity=".5"/>' +
    '<path d="M150 8 V145" stroke="currentColor" stroke-width="1.2" opacity=".5"/>' +
    '<path d="M50 20 Q150 240 250 20" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-dasharray="5 4" opacity=".55"/>' +
    '<path d="M150 130 Q200 130 250 20" fill="none" stroke="var(--accent)" stroke-width="2.6"/>' +
    '<path d="M30 75 H275" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 3"/>' +
    '<circle cx="79.3" cy="75" r="4" fill="var(--bg-elev)" stroke="currentColor" stroke-width="1.5" opacity=".7"/>' +
    '<circle cx="220.7" cy="75" r="4" fill="var(--accent)"/>' +
    '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
    '<text x="200" y="68" fill="var(--accent)">x ≥ 0 kept</text>' +
    '<text x="34" y="68" opacity=".75">x &lt; 0 dropped</text>' +
    '<text x="276" y="88" text-anchor="end">horizontal line</text></g></svg>';

  GLOSSARY.register({
    id: 'calculus',
    name: 'Calculus',
    nameZh: '微積分',
    page: 'calculus/calculus.html', // relative to index.html
    hue: 24, // warm amber
    // every source PDF sits in this same folder; the footer links to each one
    sources: [
      { file: '微積分9_8.pdf', label: '微積分9_8.pdf（ch1.1）' },
      { file: '微積分9_10.pdf', label: '微積分9_10.pdf（ch1.1）' },
      { file: '微積分9_11.pdf', label: '微積分9_11.pdf（ch1.2、ch2.2）' }
    ],
    blurb:
      '函數的基本語言：定義域與值域、座標與座標軸、差商、取整函數、' +
      '奇偶性與對稱、絕對值、三角與反三角函數、指數與對數、反函數，以及常見的函數家族。',

    terms: [
      /* ------------------------------------------------ core definition */
      {
        id: 'function',
        term: 'Function',
        zh: '函數',
        aliases: ['f(x)', 'mapping', '對應'],
        tags: ['ch1.1', 'basics'],
        def:
          'A rule that assigns to <em>every</em> <span class="mono">x</span> in the ' +
          '<strong>domain</strong> exactly one (a <em>unique</em>) value ' +
          '<span class="mono">f(x)</span> in the <strong>range</strong>.',
        notes: [
          'Usually written <span class="mono">f : D &rarr; R</span>, read as ' +
            '"f maps D into R".',
          'One x may have only one y, but different x values are allowed to share ' +
            'the same y — for <span class="mono">f(x) = x²</span>, f(2) = f(&minus;2) = 4.'
        ],
        defZh:
          '一個規則，把定義域中的<strong>每一個</strong> x，指定到<strong>唯一一個</strong>值 f(x)。' +
          '「每一個」保證不漏，「唯一」保證不歧義 — 兩個條件都要成立才算函數。',
        notesZh: [
          '常寫成 <span class="mono">f : D &rarr; R</span>，讀作「f 把 D 映到 R」。',
          '一個 x 只能配一個 y，但不同的 x 可以配到同一個 y（例如 <span class="mono">f(x)=x²</span> 中 f(2)=f(&minus;2)=4）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>function: a rule that assigns to a unique value ' +
              'f(x) &isin; Range to every x &isin; Domain</p>'
          },
          {
            label: 'Function or not',
            html:
              '<p>f(x) = x² &nbsp;&rarr;&nbsp; yes (one value per x)</p>' +
              '<p>x = y² &nbsp;&rarr;&nbsp; no (x = 4 gives y = 2 or &minus;2)</p>'
          }
        ],
        figure: {
          caption: 'Every point in the domain sends out exactly one arrow',
          svg:
            '<svg viewBox="0 0 340 130" role="img" aria-label="domain to range mapping">' +
            '<g fill="none" stroke="currentColor" stroke-width="1.4">' +
            '<ellipse cx="70" cy="65" rx="46" ry="52" opacity=".55"/>' +
            '<ellipse cx="262" cy="65" rx="46" ry="52" opacity=".55"/></g>' +
            '<g fill="currentColor" font-size="11" font-family="sans-serif">' +
            '<text x="70" y="126" text-anchor="middle">Domain</text>' +
            '<text x="262" y="126" text-anchor="middle">Range</text></g>' +
            '<g fill="currentColor">' +
            '<circle cx="60" cy="36" r="3.6"/><circle cx="60" cy="65" r="3.6"/><circle cx="60" cy="94" r="3.6"/>' +
            '<circle cx="272" cy="46" r="3.6"/><circle cx="272" cy="84" r="3.6"/></g>' +
            '<g stroke="var(--accent)" stroke-width="1.7" fill="none" marker-end="url(#ar)">' +
            '<path d="M68 36 L262 46"/><path d="M68 65 L262 47"/><path d="M68 94 L262 84"/></g>' +
            '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" ' +
            'markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/>' +
            '</marker></defs></svg>'
        }
      },

      {
        id: 'domain',
        term: 'Domain',
        zh: '定義域',
        aliases: ['input', '輸入'],
        tags: ['ch1.1', 'basics'],
        def:
          'The set of all <strong>input</strong> values the function is allowed to take — ' +
          'the x-side of the rule.',
        notes: [
          'Finding a domain means ruling out what cannot be done: division by zero, ' +
            'even roots of negative numbers, logarithms of non-positive numbers.'
        ],
        defZh: '所有可以代進函數的輸入值所成的集合，也就是 input 的範圍。',
        notesZh: [
          '找定義域就是把「不能做的事」排掉：分母為 0、負數開偶次方根、log 的引數 &le; 0。'
        ],
        examples: [
          { label: 'From the notes', html:
              '<p>domain：定義域，input 範圍</p>' +
              '<p>&rarr; "domain", the range of inputs</p>' },
          {
            label: 'Ruling out illegal inputs',
            html:
              '<p>f(x) = 1/(x&minus;2) &nbsp;&rarr;&nbsp; D = {x | x &ne; 2}</p>' +
              '<p>g(x) = &radic;x &nbsp;&rarr;&nbsp; D = [0, &infin;)</p>'
          }
        ]
      },

      {
        id: 'range',
        term: 'Range',
        zh: '值域',
        aliases: ['output', '輸出', 'image'],
        tags: ['ch1.1', 'basics'],
        def:
          'The set of all <strong>output</strong> values that the function actually ' +
          'produces as x runs through the whole domain.',
        defZh: '當 x 掃過整個定義域時，f(x) 真正取到的所有值所成的集合，也就是 output 的範圍。',
        examples: [
          { label: 'From the notes', html:
              '<p>range：值域，output 範圍</p>' +
              '<p>&rarr; "range", the range of outputs</p>' },
          {
            label: 'The range is not just "what it looks like"',
            html:
              '<p>f(x) = x², D = &#8477; &nbsp;&rarr;&nbsp; Range = [0, &infin;)</p>' +
              '<p>f(x) = sin x &nbsp;&rarr;&nbsp; Range = [&minus;1, 1]</p>'
          }
        ]
      },

      {
        id: 'codomain',
        term: 'Codomain',
        zh: '對應域',
        zhAlt: '共域',
        aliases: ['target set'],
        tags: ['ch1.1', 'basics'],
        added: true,
        def:
          'The set the outputs are declared to live in when we write ' +
          '<span class="mono">f : D &rarr; Y</span>. The <strong>range</strong> is the part ' +
          'of the codomain that is actually hit, so range &sube; codomain.',
        notes: [
          'Why this is here: the notes give only domain and range, but a textbook writing ' +
            '<span class="mono">f : D &rarr; &#8477;</span> means &#8477; as the codomain — ' +
            'easy to confuse with the range.'
        ],
        defZh:
          '寫 f : D &rarr; Y 時，Y 就是對應域 — 「宣稱」輸出會落在哪裡；' +
          '值域則是真正被取到的那一部分，所以「值域 &sube; 對應域」。',
        notesZh: [
          '為什麼補這個：筆記只寫 domain 與 range，但課本寫 f : D &rarr; &#8477; 時的 &#8477; 指的是對應域，兩者容易混。'
        ],
        examples: [
          {
            label: 'Where the two differ',
            html:
              '<p>f : &#8477; &rarr; &#8477;,&nbsp; f(x) = x²</p>' +
              '<p>codomain = &#8477;&nbsp;&nbsp;but&nbsp;&nbsp;range = [0, &infin;)</p>'
          }
        ]
      },

      {
        id: 'independent-dependent-variable',
        term: 'Independent / dependent variable',
        zh: '自變數／因變數',
        aliases: ['argument', '應變數', 'independent number'],
        tags: ['ch1.1', 'basics'],
        def:
          'In <span class="mono">y = f(x)</span>, <span class="mono">x</span> is the ' +
          '<strong>independent</strong> variable (the one you choose) and ' +
          '<span class="mono">y</span> is the <strong>dependent</strong> variable ' +
          '(the one that follows).',
        notes: [
          'The notes write "independent number:" and leave the definition blank; the ' +
            'standard term is <em>independent variable</em>, filled in here.',
          'The independent variable lives in the domain and the dependent one in the ' +
            'range — the two pairs of words describe the same thing from different angles.'
        ],
        defZh: '在 y = f(x) 中，x 是自變數（你可以自由選），y 是因變數（隨 x 而定）。',
        notesZh: [
          '筆記寫了「independent number:」但冒號後面空白；標準用語是 independent variable（自變數），這裡補上定義。',
          '自變數住在定義域，因變數住在值域 — 這兩組詞其實在講同一件事的兩個角度。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>independent number:</p><p>&rarr; (left blank)</p>' },
          {
            label: 'Which is which',
            html:
              '<p>area of a circle A = &pi;r²</p>' +
              '<p>r independent (you pick the radius), A dependent</p>'
          }
        ]
      },

      /* ------------------------------------------------ 9/10 the plane */
      {
        id: 'coordinate',
        term: 'Coordinate',
        zh: '座標',
        aliases: ['x-coordinate', 'y-coordinate', 'x座標', 'y座標', 'ordered pair', 'point'],
        tags: ['ch1.1', 'the plane'],
        def:
          'A <strong>number</strong> giving a point\'s position along one axis. A point in the ' +
          'plane has two: its <strong>x-coordinate</strong> (how far across) and its ' +
          '<strong>y-coordinate</strong> (how far up), written as the ordered pair ' +
          '<span class="mono">(x, y)</span>.',
        notes: [
          'The notes set this against <a href="#axis">axis</a>: a coordinate is a number that ' +
            'locates a point, an axis is the line that number is measured along.',
          'Order matters — (3, 2) and (2, 3) are different points. The x-coordinate always comes first.'
        ],
        defZh:
          '表示一個點在某條軸上位置的<strong>數字</strong>。平面上的點有兩個：' +
          '<strong>x 座標</strong>（橫向多遠）與 <strong>y 座標</strong>（縱向多高），寫成有序數對 (x, y)。',
        notesZh: [
          '筆記把它和 <a href="#axis">axis</a> 對照：座標是用來定位點的「數字」，座標軸是量這個數字所沿著的「直線」。',
          '順序有差 &mdash; (3, 2) 和 (2, 3) 是不同的點，x 座標永遠寫在前面。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>coordinate vs. axis</p><p>x-coordinate &nbsp; y-coordinate</p>' },
          {
            label: 'Reading a point',
            html: '<p>P = (3, 2): x-coordinate 3, y-coordinate 2</p>'
          }
        ],
        figure: { caption: 'Coordinates are the numbers that locate P', svg: plane('coord') }
      },

      {
        id: 'axis',
        term: 'Axis',
        zh: '座標軸',
        zhAlt: '軸',
        aliases: ['axes', 'x-axis', 'y-axis', 'x軸', 'y軸'],
        tags: ['ch1.1', 'the plane'],
        def:
          'One of the two perpendicular number lines that set up the plane: the horizontal ' +
          '<strong>x-axis</strong> and the vertical <strong>y-axis</strong>, crossing at the ' +
          '<strong>origin</strong> <span class="mono">(0, 0)</span>.',
        notes: [
          'An axis is a <em>line</em>; a <a href="#coordinate">coordinate</a> is a <em>number</em> ' +
            'measured along it — the distinction the notes flag with "coordinate vs. axis".',
          'Every point on the x-axis has y-coordinate 0; every point on the y-axis has ' +
            'x-coordinate 0.',
          'The plural is <em>axes</em>.'
        ],
        defZh:
          '建立平面的兩條互相垂直的數線：橫的 <strong>x 軸</strong>與直的 <strong>y 軸</strong>，' +
          '兩者交於<strong>原點</strong> (0, 0)。',
        notesZh: [
          '軸是一條「直線」；<a href="#coordinate">座標</a>是沿著它量出來的「數字」&mdash; 筆記用 coordinate vs. axis 強調的就是這個差別。',
          'x 軸上每一點的 y 座標都是 0；y 軸上每一點的 x 座標都是 0。',
          '複數是 axes。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>x-axis &nbsp; y-axis</p>' },
          {
            label: 'Points that sit on an axis',
            html: '<p>(4, 0) is on the x-axis</p><p>(0, &minus;2) is on the y-axis</p>'
          }
        ],
        figure: { caption: 'The axes are the two lines; the origin O is where they cross', svg: plane('axis') }
      },

      {
        id: 'xy-plane',
        term: 'xy-plane',
        zh: 'xy 平面',
        zhAlt: '座標平面／直角座標平面',
        aliases: ['coordinate plane', 'cartesian plane', 'quadrant', '象限', '平面'],
        tags: ['ch1.1', 'the plane'],
        def:
          'The plane set up by the x-axis and the y-axis, in which every point is named by an ' +
          'ordered pair <span class="mono">(x, y)</span>. It is where the ' +
          '<a href="#graph-of-a-function">graph of a function</a> is drawn.',
        notes: [
          'Also called the coordinate plane or Cartesian plane.',
          'The axes cut it into four <strong>quadrants</strong>, numbered I–IV counter-clockwise ' +
            'from the top right: I (+, +), II (&minus;, +), III (&minus;, &minus;), IV (+, &minus;).'
        ],
        defZh:
          '由 x 軸與 y 軸張成的平面，平面上每一點都用有序數對 (x, y) 表示；' +
          '<a href="#graph-of-a-function">函數圖形</a>就畫在這裡。',
        notesZh: [
          '也叫座標平面、直角座標平面（Cartesian plane）。',
          '兩軸把平面切成四個<strong>象限</strong>，從右上逆時針編號 I–IV：' +
            'I (+, +)、II (&minus;, +)、III (&minus;, &minus;)、IV (+, &minus;)。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>xy plane：xy 平面</p><p>&rarr; "the xy-plane"</p>' },
          {
            label: 'Which quadrant',
            html: '<p>(3, 2) &rarr; I &nbsp;&nbsp; (&minus;1, 4) &rarr; II &nbsp;&nbsp; (2, &minus;5) &rarr; IV</p>'
          }
        ],
        figure: { caption: 'The four quadrants, numbered counter-clockwise', svg: plane('plane') }
      },

      /* ------------------------------------------------ 9/9 rates */
      {
        id: 'difference-quotient',
        term: 'Difference quotient',
        zh: '差商',
        aliases: ['secant', 'slope', '割線', '斜率', 'average rate of change', '平均變化率'],
        tags: ['ch1.1', 'rates'],
        def:
          'The expression <span class="mono">[f(x + h) &minus; f(x)] / h</span> (with ' +
          '<span class="mono">h &ne; 0</span>): the change in the output divided by the change ' +
          'in the input. Geometrically it is the slope of the secant line through ' +
          '<span class="mono">(x, f(x))</span> and <span class="mono">(x + h, f(x + h))</span>.',
        notes: [
          'It measures the <strong>average rate of change</strong> of f over a step of size h.',
          'The notes\' line <span class="mono">ah / h = a</span> is the linear case: for ' +
            '<span class="mono">f(x) = ax + b</span> the numerator is exactly ah, so the ' +
            'difference quotient is the slope a, whatever x and h are.',
          'Letting h shrink toward 0 turns this into the derivative — the main idea later in the course.'
        ],
        defZh:
          '式子 [f(x + h) &minus; f(x)] / h（h &ne; 0）：輸出的變化量除以輸入的變化量。' +
          '幾何上就是通過 (x, f(x)) 與 (x + h, f(x + h)) 兩點的割線斜率。',
        notesZh: [
          '它衡量 f 在一段長度為 h 的區間上的<strong>平均變化率</strong>。',
          '筆記寫的 ah / h = a 是線性函數的情形：f(x) = ax + b 時分子剛好是 ah，所以差商不管 x、h 是多少都等於斜率 a。',
          '讓 h 趨近 0，差商就變成導數 &mdash; 這是之後整門課的核心。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>difference quotient：差商：ah / h = a</p>' },
          {
            label: 'Linear f(x) = ax + b',
            html:
              '<p>f(x + h) &minus; f(x) = a(x + h) + b &minus; (ax + b) = ah</p>' +
              '<p>&rArr; ah / h = a</p>'
          },
          {
            label: 'Non-linear f(x) = x²',
            html:
              '<p>[(x + h)² &minus; x²] / h = (2xh + h²) / h = 2x + h</p>' +
              '<p>depends on both x and h</p>'
          }
        ],
        figure: {
          caption: 'The difference quotient is the slope of the secant line through the two points',
          svg:
            '<svg viewBox="0 0 320 170" role="img" aria-label="secant line on a curve">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5">' +
            '<path d="M20 145 H305"/><path d="M30 155 V8"/></g>' +
            '<polyline fill="none" stroke="currentColor" stroke-width="2" opacity=".8" points="' +
            '40,135 55,134.4 70,132.6 85,129.7 100,125.5 115,120.2 130,113.7 145,106 160,97.1 ' +
            '175,87 190,75.8 205,63.4 220,49.7 235,34.9 250,18.9"/>' +
            '<path d="M90 137 L252 28.3" stroke="var(--accent)" stroke-width="2.2"/>' +
            '<g stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity=".6">' +
            '<path d="M115 120.2 V145"/><path d="M220 120.2 V145"/></g>' +
            '<g stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 3">' +
            '<path d="M115 120.2 H220"/><path d="M220 120.2 V49.7"/></g>' +
            '<g fill="var(--accent)"><circle cx="115" cy="120.2" r="4"/><circle cx="220" cy="49.7" r="4"/></g>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="115" y="159" text-anchor="middle">x</text>' +
            '<text x="220" y="159" text-anchor="middle">x + h</text>' +
            '<text x="167" y="135" text-anchor="middle">h</text>' +
            '<text x="226" y="92">f(x+h) &minus; f(x)</text>' +
            '<text x="40" y="20" fill="var(--accent)">slope of secant = difference quotient</text>' +
            '</g></svg>'
        }
      },

      {
        id: 'graph-of-a-function',
        term: 'Graph of a function',
        zh: '函數圖形',
        aliases: ['vertical line test', '垂線檢驗'],
        tags: ['ch1.1', 'basics'],
        added: true,
        def:
          'The set of points <span class="mono">{ (x, f(x)) : x &isin; D }</span> drawn in the ' +
          'plane. A curve is the graph of a function precisely when it passes the ' +
          '<strong>vertical line test</strong>: no vertical line meets it twice.',
        notes: [
          'The vertical line test is the picture version of uniqueness — meeting a curve ' +
            'twice means one x paired with two different y values.'
        ],
        defZh:
          '把所有 (x, f(x)) 畫在平面上就是函數圖形。一條曲線是函數圖形的判準是' +
          '<strong>垂線檢驗</strong>：任何一條鉛直線最多只能交它一次。',
        notesZh: ['垂線檢驗就是「唯一性」的圖形版本 — 交兩次代表同一個 x 配到兩個 y。'],
        figure: {
          caption: 'Left: passes the vertical line test. Right: meets it twice.',
          svg:
            '<svg viewBox="0 0 340 120" role="img" aria-label="vertical line test">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".55">' +
            '<path d="M20 100 H150 M40 15 V108"/><path d="M195 100 H325 M215 15 V108"/></g>' +
            '<path d="M40 95 C70 30 110 25 145 22" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
            '<path d="M255 25 C215 45 215 80 255 98 C285 84 288 40 255 25" fill="none" ' +
            'stroke="var(--accent)" stroke-width="2"/>' +
            '<g stroke="currentColor" stroke-width="1.3" stroke-dasharray="4 3">' +
            '<path d="M100 12 V110"/><path d="M240 12 V110"/></g>' +
            '<g fill="currentColor"><circle cx="100" cy="41" r="3.4"/>' +
            '<circle cx="240" cy="35" r="3.4"/><circle cx="240" cy="88" r="3.4"/></g>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif">' +
            '<text x="85" y="118">1 point &#10003;</text>' +
            '<text x="222" y="118">2 points &#10007;</text></g></svg>'
        }
      },

      /* ------------------------------------------------ floor / ceiling */
      {
        id: 'floor-function',
        term: 'Integer floor function',
        abbr: '&lfloor;x&rfloor;',
        zh: '下取整函數',
        zhAlt: '高斯函數／地板函數',
        aliases: ['greatest integer function', 'floor', '取整', 'gauss'],
        tags: ['ch1.1', 'special functions'],
        def:
          '<span class="mono">&lfloor;x&rfloor;</span> is the <strong>greatest integer that is ' +
          'less than or equal to</strong> x — round <em>down</em> to the nearest integer.',
        notes: [
          'Negative numbers need care: it rounds toward the smaller value, it does not chop ' +
            'off the decimal part. &lfloor;&minus;1.3&rfloor; = &minus;2, not &minus;1.',
          'At an integer, &lfloor;n&rfloor; = n. The graph is a staircase, each step closed ' +
            'on the left and open on the right.'
        ],
        defZh: '&lfloor;x&rfloor; 是「小於或等於 x 的最大整數」，也就是往下取整。',
        notesZh: [
          '負數要小心，是往「小」的方向取，不是砍掉小數。&lfloor;&minus;1.3&rfloor; = &minus;2，不是 &minus;1。',
          '整數處 &lfloor;n&rfloor; = n；圖形是一段一段的階梯，每格左端閉、右端開。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>&lfloor;0.5&rfloor; = 0　　&lfloor;1.3&rfloor; = 1</p>'
          },
          {
            label: 'Negatives and integers',
            html:
              '<p>&lfloor;&minus;1.3&rfloor; = &minus;2　　&lfloor;2&rfloor; = 2　　&lfloor;&minus;2&rfloor; = &minus;2</p>'
          }
        ],
        figure: {
          caption: 'y = ⌊x⌋ — filled dot: value taken, hollow: not taken',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="floor function staircase">' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".5">' +
            '<path d="M20 75 H285"/><path d="M150 15 V140"/></g>' +
            '<g stroke="var(--accent)" stroke-width="2.4" fill="none">' +
            '<path d="M90 135 H120"/><path d="M120 105 H150"/><path d="M150 75 H180"/>' +
            '<path d="M180 45 H210"/><path d="M210 15 H240"/></g>' +
            '<g fill="var(--accent)">' +
            '<circle cx="90" cy="135" r="3.6"/><circle cx="120" cy="105" r="3.6"/>' +
            '<circle cx="150" cy="75" r="3.6"/><circle cx="180" cy="45" r="3.6"/>' +
            '<circle cx="210" cy="15" r="3.6"/></g>' +
            '<g fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.8">' +
            '<circle cx="120" cy="135" r="3.6"/><circle cx="150" cy="105" r="3.6"/>' +
            '<circle cx="180" cy="75" r="3.6"/><circle cx="210" cy="45" r="3.6"/>' +
            '<circle cx="240" cy="15" r="3.6"/></g>' +
            '<g fill="currentColor" font-size="10" font-family="sans-serif">' +
            '<text x="146" y="90">0</text><text x="177" y="90">1</text>' +
            '<text x="207" y="90">2</text><text x="113" y="90">&minus;1</text></g></svg>'
        }
      },

      {
        id: 'ceiling-function',
        term: 'Integer ceiling function',
        abbr: '&lceil;x&rceil;',
        zh: '上取整函數',
        zhAlt: '天花板函數',
        aliases: ['least integer function', 'ceiling', '進位'],
        tags: ['ch1.1', 'special functions'],
        def:
          '<span class="mono">&lceil;x&rceil;</span> is the <strong>smallest integer that is ' +
          'greater than or equal to</strong> x — round <em>up</em> to the nearest integer.',
        notes: [
          'How the two relate: if x is not an integer then ' +
            '&lceil;x&rceil; = &lfloor;x&rfloor; + 1; if x is an integer both equal x.'
        ],
        defZh: '&lceil;x&rceil; 是「大於或等於 x 的最小整數」，也就是往上取整。',
        notesZh: [
          '兩者關係 &mdash; 若 x 不是整數，則 &lceil;x&rceil; = &lfloor;x&rfloor; + 1；若 x 是整數，則兩者都等於 x。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>&lceil;0.5&rceil; = 1　　&lceil;1.3&rceil; = 2</p>'
          },
          {
            label: 'Negatives and integers',
            html: '<p>&lceil;&minus;1.3&rceil; = &minus;1　　&lceil;2&rceil; = 2</p>'
          }
        ]
      },

      /* ------------------------------------------------ monotonicity */
      {
        id: 'monotonic-function',
        term: 'Monotonic function',
        zh: '單調函數',
        aliases: ['monotone', '遞增', '遞減'],
        tags: ['ch1.1', 'behaviour'],
        def:
          'A function that moves in one direction only on an interval: always ' +
          'increasing, or always decreasing — it never turns around.',
        notes: [
          '<strong>Strictly increasing</strong>: x&#8321; &lt; x&#8322; implies f(x&#8321;) &lt; f(x&#8322;).',
          '<strong>Strictly decreasing</strong>: x&#8321; &lt; x&#8322; implies f(x&#8321;) &gt; f(x&#8322;).',
          'Replacing &lt; with &le; gives the non-strict (weak) version, which allows flat stretches.'
        ],
        defZh: '在一個區間上只往一個方向走的函數：一路遞增或一路遞減，中途不折返。',
        notesZh: [
          '嚴格遞增 &mdash; 若 x&#8321; &lt; x&#8322; 則 f(x&#8321;) &lt; f(x&#8322;)。',
          '嚴格遞減 &mdash; 若 x&#8321; &lt; x&#8322; 則 f(x&#8321;) &gt; f(x&#8322;)。',
          '把 &lt; 換成 &le; 就叫「非嚴格（弱）單調」，允許有平的一段。'
        ],
        examples: [
          {
            label: 'Monotonic or not',
            html:
              '<p>f(x) = x³ is strictly increasing on &#8477; &nbsp;&rarr;&nbsp; monotonic</p>' +
              '<p>f(x) = x² falls then rises on &#8477; &nbsp;&rarr;&nbsp; not monotonic</p>' +
              '<p>but f(x) = x² restricted to [0, &infin;) is monotonic</p>'
          }
        ],
        figure: {
          caption: 'Left: increasing. Right: decreasing.',
          svg:
            '<svg viewBox="0 0 340 110" role="img" aria-label="increasing and decreasing">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5">' +
            '<path d="M20 90 H150 M30 12 V96"/><path d="M195 90 H325 M205 12 V96"/></g>' +
            '<path d="M32 85 C70 78 100 35 145 20" fill="none" stroke="var(--accent)" stroke-width="2.2"/>' +
            '<path d="M207 20 C245 35 275 78 320 85" fill="none" stroke="var(--accent)" stroke-width="2.2"/>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif">' +
            '<text x="52" y="108">x&#8593; then y&#8593;</text>' +
            '<text x="227" y="108">x&#8593; then y&#8595;</text></g></svg>'
        }
      },

      /* ------------------------------------------------ symmetry */
      {
        id: 'symmetry',
        term: 'Symmetry',
        zh: '對稱性',
        aliases: ['symmetric', '對稱', 'y-axis symmetry', 'origin symmetry', 'x-axis symmetry'],
        tags: ['ch1.1', 'symmetry'],
        def:
          'A graph is <strong>symmetric</strong> when some reflection or rotation carries it ' +
          'onto itself. The three kinds that matter here are symmetry about the ' +
          '<strong>y-axis</strong>, about the <strong>origin</strong>, and about the ' +
          '<strong>x-axis</strong>.',
        notes: [
          'About the y-axis: (x, y) on the graph &rArr; (&minus;x, y) on it too. For a function ' +
            'that is exactly an <a href="#even-function">even function</a>.',
          'About the origin: (x, y) &rArr; (&minus;x, &minus;y). For a function that is exactly ' +
            'an <a href="#odd-function">odd function</a>.',
          'About the x-axis: (x, y) &rArr; (x, &minus;y). No function other than y = 0 can ' +
            'have it — it would give one x two y values and fail the ' +
            '<a href="#graph-of-a-function">vertical line test</a>.',
          'The notes give only the name; the three tests are filled in here.'
        ],
        defZh:
          '一個圖形經過某種鏡射或旋轉後能和自己重合，就叫<strong>對稱</strong>。' +
          '這裡要看的三種是：對 <strong>y 軸</strong>、對<strong>原點</strong>、對 <strong>x 軸</strong>對稱。',
        notesZh: [
          '對 y 軸：(x, y) 在圖上 &rArr; (&minus;x, y) 也在。對函數而言這就是<a href="#even-function">偶函數</a>。',
          '對原點：(x, y) &rArr; (&minus;x, &minus;y)。對函數而言這就是<a href="#odd-function">奇函數</a>。',
          '對 x 軸：(x, y) &rArr; (x, &minus;y)。除了 y = 0 以外沒有函數能這樣 &mdash; 同一個 x 會對到兩個 y，過不了<a href="#graph-of-a-function">垂線檢驗</a>。',
          '筆記只寫了名稱，三種判別法是這裡補上的。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>symmetry：對稱性</p><p>&rarr; "symmetry"</p>' },
          {
            label: 'One example of each',
            html:
              '<p>y = x² &nbsp;&rarr;&nbsp; y-axis</p>' +
              '<p>y = x³ &nbsp;&rarr;&nbsp; origin</p>' +
              '<p>x = y² &nbsp;&rarr;&nbsp; x-axis (not a function)</p>'
          }
        ],
        figure: {
          caption: 'Symmetric about the y-axis, the origin, and the x-axis',
          svg:
            '<svg viewBox="0 0 340 122" role="img" aria-label="three kinds of symmetry">' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".45">' +
            '<path d="M10 70 H104 M57 12 V100"/>' +
            '<path d="M123 62 H217 M170 12 V100"/>' +
            '<path d="M236 62 H330 M283 12 V100"/></g>' +
            '<g stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="4 3">' +
            '<path d="M57 10 V102"/><path d="M234 62 H332"/></g>' +
            '<circle cx="170" cy="62" r="3" fill="var(--accent)"/>' +
            '<g fill="none" stroke="var(--accent)" stroke-width="2.2">' +
            '<path d="M17 20 Q57 120 97 20"/>' +
            '<path d="M130 105 C160 105 160 62 170 62 C180 62 180 19 210 19"/>' +
            '<path d="M323 20 Q243 62 323 104"/></g>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif" text-anchor="middle">' +
            '<text x="57" y="116">y-axis</text><text x="170" y="116">origin</text>' +
            '<text x="283" y="116">x-axis</text></g></svg>'
        }
      },

      {
        id: 'even-function',
        term: 'Even function',
        zh: '偶函數',
        aliases: ['symmetry', '對稱', 'y軸對稱'],
        tags: ['ch1.1', 'symmetry'],
        def:
          'A function with <span class="mono">f(x) = f(&minus;x)</span> for every ' +
          'x in the domain. Its graph is symmetric about the <strong>y-axis</strong>.',
        notes: [
          'The domain itself must be symmetric about 0, otherwise f(&minus;x) may be undefined.',
          'Where the name comes from: x<sup>n</sup> is even exactly when n is an even ' +
            'number (x², x&#8308;, …).'
        ],
        defZh:
          '對定義域中每個 x 都有 f(x) = f(&minus;x) 的函數。圖形對 <strong>y 軸</strong>左右對稱。',
        notesZh: [
          '筆記把中文寫成「偏函數」，標準用語是<strong>偶函數</strong>（even = 偶）。',
          '定義域本身也必須左右對稱，否則 f(&minus;x) 可能沒定義。',
          '名字的由來：x&#8319; 在 n 為偶數時就是偶函數（x², x&#8308;…）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>even function: for x &isin; D,&nbsp; f(x) = f(&minus;x)</p>'
          },
          {
            label: 'Common examples',
            html:
              '<p>x², x&#8308;, |x|, cos x are all even</p>' +
              '<p>check: f(x)=x² &rArr; f(&minus;x)=(&minus;x)²=x²=f(x) &#10003;</p>'
          }
        ],
        figure: {
          caption: 'Even: mirroring across the y-axis leaves the graph unchanged',
          svg:
            '<svg viewBox="0 0 300 120" role="img" aria-label="even function symmetry">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5">' +
            '<path d="M25 100 H275"/></g>' +
            '<path d="M150 10 V112" stroke="currentColor" stroke-width="1.3" stroke-dasharray="4 3"/>' +
            '<path d="M70 20 C110 20 130 95 150 95 C170 95 190 20 230 20" fill="none" ' +
            'stroke="var(--accent)" stroke-width="2.2"/>' +
            '<g fill="currentColor"><circle cx="105" cy="60" r="3.2"/><circle cx="195" cy="60" r="3.2"/></g>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif">' +
            '<text x="72" y="55">(&minus;x, y)</text><text x="205" y="55">(x, y)</text></g></svg>'
        }
      },

      {
        id: 'odd-function',
        term: 'Odd function',
        zh: '奇函數',
        aliases: ['symmetry', '原點對稱', 'origin'],
        tags: ['ch1.1', 'symmetry'],
        def:
          'A function with <span class="mono">f(x) = &minus;f(&minus;x)</span> — equivalently ' +
          '<span class="mono">f(&minus;x) = &minus;f(x)</span> — for every x in the domain. ' +
          'Its graph is symmetric about the <strong>origin</strong> (a 180&deg; turn maps it to itself).',
        notes: [
          'If 0 is in the domain, an odd function must have f(0) = 0.',
          'Where the name comes from: x<sup>n</sup> is odd exactly when n is an odd number (x, x³, …).'
        ],
        defZh:
          '對每個 x 都有 f(x) = &minus;f(&minus;x)（等價於 f(&minus;x) = &minus;f(x)）的函數。' +
          '圖形對<strong>原點</strong>對稱 — 轉 180&deg; 後和自己重合。',
        notesZh: [
          '若 0 在定義域內，則奇函數必有 f(0) = 0。',
          '名字的由來：x&#8319; 在 n 為奇數時就是奇函數（x, x³…）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>odd function: for x &isin; D,&nbsp; f(x) = &minus;f(&minus;x)</p>'
          },
          {
            label: 'Common examples',
            html:
              '<p>x, x³, 1/x, sin x are all odd</p>' +
              '<p>x² + x is neither odd nor even (most functions are neither)</p>'
          }
        ],
        figure: {
          caption: 'Odd: a 180° turn about the origin leaves the graph unchanged',
          svg:
            '<svg viewBox="0 0 300 120" role="img" aria-label="odd function symmetry">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5">' +
            '<path d="M25 60 H275"/><path d="M150 8 V112"/></g>' +
            '<path d="M70 108 C120 100 130 60 150 60 C170 60 180 20 230 12" fill="none" ' +
            'stroke="var(--accent)" stroke-width="2.2"/>' +
            '<g fill="currentColor"><circle cx="110" cy="94" r="3.2"/><circle cx="190" cy="26" r="3.2"/>' +
            '<circle cx="150" cy="60" r="2.6"/></g>' +
            '<g fill="currentColor" font-size="10.5" font-family="sans-serif">' +
            '<text x="60" y="90">(&minus;x, &minus;y)</text><text x="200" y="24">(x, y)</text></g></svg>'
        }
      },

      /* ------------------------------------------------ absolute value */
      {
        id: 'absolute-value',
        term: 'Absolute value',
        abbr: '|x|',
        zh: '絕對值',
        aliases: ['abs', 'distance', '距離', 'modulus'],
        tags: ['ch1.1', 'special functions'],
        def:
          'The <strong>distance from a number to 0</strong> on the real number line. Because it ' +
          'is a distance, it is <strong>never negative</strong> — always positive or 0.',
        notes: [
          'As a formula it is <a href="#piecewise-function">piecewise</a>: ' +
            '|x| = x when x &ge; 0, and |x| = &minus;x when x &lt; 0. The &minus;x is what ' +
            'turns a negative number positive.',
          '|a &minus; b| is the distance between a and b on the number line.',
          'The graph of y = |x| is a V with its corner at the origin, symmetric about the y-axis ' +
            '— so |x| is an <a href="#even-function">even function</a>.'
        ],
        defZh:
          '數線上一個數到 0 的<strong>距離</strong>。既然是距離，它<strong>永遠不會是負的</strong> &mdash; 一定是正數或 0。',
        notesZh: [
          '寫成公式是<a href="#piecewise-function">分段函數</a>：x &ge; 0 時 |x| = x，x &lt; 0 時 |x| = &minus;x。那個 &minus;x 就是把負數變正的地方。',
          '|a &minus; b| 就是數線上 a 與 b 之間的距離。',
          'y = |x| 的圖形是一個 V，尖端在原點、對 y 軸對稱 &mdash; 所以 |x| 是<a href="#even-function">偶函數</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>absolute value: The distance from a number to 0 on the real number line, ' +
              'it is always positive or 0.</p>'
          },
          {
            label: 'Evaluating',
            html: '<p>|3| = 3 &nbsp;&nbsp; |&minus;3| = 3 &nbsp;&nbsp; |0| = 0</p><p>|2 &minus; 7| = 5</p>'
          }
        ],
        figure: {
          caption: '3 and −3 are both 3 units from 0, so both have absolute value 3',
          svg:
            '<svg viewBox="0 0 320 95" role="img" aria-label="absolute value as distance">' +
            '<path d="M18 62 H302" stroke="currentColor" stroke-width="1.3" opacity=".6"/>' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".6">' +
            '<path d="M40 57 V67"/><path d="M70 57 V67"/><path d="M100 57 V67"/><path d="M130 57 V67"/>' +
            '<path d="M160 55 V69"/><path d="M190 57 V67"/><path d="M220 57 V67"/>' +
            '<path d="M250 57 V67"/><path d="M280 57 V67"/></g>' +
            '<g fill="none" stroke="var(--accent)" stroke-width="2">' +
            '<path d="M158 56 Q115 16 72 56"/><path d="M162 56 Q205 16 248 56"/></g>' +
            '<g fill="var(--accent)"><circle cx="70" cy="62" r="4"/><circle cx="250" cy="62" r="4"/></g>' +
            '<circle cx="160" cy="62" r="3" fill="currentColor"/>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor" text-anchor="middle">' +
            '<text x="40" y="82">&minus;4</text><text x="70" y="82">&minus;3</text>' +
            '<text x="100" y="82">&minus;2</text><text x="130" y="82">&minus;1</text>' +
            '<text x="160" y="82">0</text><text x="190" y="82">1</text><text x="220" y="82">2</text>' +
            '<text x="250" y="82">3</text><text x="280" y="82">4</text></g>' +
            '<g font-family="sans-serif" font-size="11" fill="var(--accent)" text-anchor="middle">' +
            '<text x="115" y="28">|&minus;3| = 3</text><text x="205" y="28">|3| = 3</text></g></svg>'
        }
      },

      /* ------------------------------------------------ families */
      {
        id: 'power-function',
        term: 'Power function',
        zh: '冪函數',
        aliases: ['x^a', 'exponent', '次方'],
        tags: ['ch1.1', 'families'],
        def:
          'A function of the form <span class="mono">f(x) = x<sup>a</sup></span> where the ' +
          'exponent <span class="mono">a</span> is a fixed real constant, ' +
          '<span class="mono">a &isin; &#8477;</span>.',
        notes: [
          'Mind the direction: a power function has the variable in the base and a constant ' +
            'in the exponent. The other way round, <span class="mono">a<sup>x</sup></span>, ' +
            'is an exponential function.',
          'The form of a fixes the domain — a = 1/2 needs x &ge; 0; a = &minus;1 needs x &ne; 0.'
        ],
        defZh: '形如 f(x) = x<sup>a</sup> 的函數，其中指數 a 是固定的實數常數（a &isin; &#8477;）。',
        notesZh: [
          '注意方向：冪函數是「變數在底、常數在指數」；反過來（a<sup>x</sup>）叫指數函數 exponential function。',
          'a 的形態決定定義域 &mdash; a = 1/2 時 x &ge; 0；a = &minus;1 時 x &ne; 0。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>power function: x<sup>a</sup>,&nbsp; a &isin; &#8477;</p>'
          },
          {
            label: 'One formula, many faces',
            html:
              '<p>a = 2 &rarr; x² (parabola)</p>' +
              '<p>a = 1/2 &rarr; &radic;x</p>' +
              '<p>a = &minus;1 &rarr; 1/x (hyperbola)</p>'
          }
        ]
      },

      {
        id: 'constant-function',
        term: 'Constant function',
        zh: '常數函數',
        aliases: ['horizontal line', '水平線'],
        tags: ['ch1.1', 'families'],
        def:
          'A function <span class="mono">f(x) = c</span> whose output never changes, ' +
          'no matter the input. Its graph is a horizontal line.',
        notes: [
          'The range is the single value {c}; the slope is always 0.',
          'It is both a special case of a <a href="#linear-function">linear function</a> ' +
            '(m = 0) and an even function.'
        ],
        defZh: '不論輸入什麼，輸出永遠是同一個數 c 的函數 f(x) = c。圖形是一條水平線。',
        notesZh: [
          '值域只有一個元素 {c}；斜率恆為 0。',
          '它同時是<a href="#linear-function">線性函數</a>的特例（m = 0），也是偶函數。'
        ],
        examples: [
          {
            label: 'Example',
            html: '<p>f(x) = 5 &nbsp;&rarr;&nbsp; f(0) = f(&minus;3) = f(100) = 5</p>'
          }
        ]
      },

      {
        id: 'linear-function',
        term: 'Linear function',
        zh: '線性函數',
        aliases: ['slope', '斜率', 'mx+b', '一次函數'],
        tags: ['ch1.1', 'families'],
        def:
          'A function of the form <span class="mono">f(x) = mx + b</span>, whose graph is a ' +
          'straight line with slope <span class="mono">m</span> and y-intercept ' +
          '<span class="mono">b</span>.',
        notes: [
          'The slope is how much y moves per unit of x, &Delta;y / &Delta;x — the same ' +
            'everywhere on the line.',
          'Strictly, this is called <em>affine</em> when b &ne; 0; a calculus course usually ' +
            'just says linear.'
        ],
        defZh: '形如 f(x) = mx + b 的函數，圖形是一條直線，m 是斜率、b 是 y 軸截距。',
        notesZh: [
          '斜率是「每增加一單位 x，y 變動多少」= &Delta;y / &Delta;x，整條線上都一樣。',
          '嚴格來說 b &ne; 0 時線性代數會稱它 affine（仿射）；微積分課通常統稱 linear。'
        ],
        examples: [
          {
            label: 'Example',
            html:
              '<p>f(x) = 2x + 1 &nbsp;&rarr;&nbsp; slope 2, through (0, 1)</p>' +
              '<p>x goes 3 &rarr; 4, y goes 7 &rarr; 9 (+2 per step)</p>'
          }
        ]
      },

      {
        id: 'parabola',
        term: 'Parabola',
        zh: '拋物線',
        aliases: ['quadratic', 'vertex', '頂點', '二次函數', 'x^2'],
        tags: ['ch1.1', 'families'],
        def:
          'The U-shaped curve that is the graph of a quadratic function ' +
          '<span class="mono">y = ax² + bx + c</span> (a &ne; 0). The simplest one is ' +
          '<span class="mono">y = x²</span>.',
        notes: [
          'It opens upward when a &gt; 0 and downward when a &lt; 0.',
          'Its turning point is the <strong>vertex</strong>, and it is symmetric about the ' +
            'vertical line through the vertex (the axis of symmetry), at ' +
            '<span class="mono">x = &minus;b / 2a</span>.',
          'y = x² is the <a href="#power-function">power function</a> with a = 2, and it is ' +
            '<a href="#even-function">even</a> — its axis of symmetry is the y-axis.'
        ],
        defZh:
          '二次函數 y = ax² + bx + c（a &ne; 0）的圖形，是一條 U 形的曲線；最簡單的是 y = x²。',
        notesZh: [
          'a &gt; 0 開口向上，a &lt; 0 開口向下。',
          '轉折點叫<strong>頂點</strong>；拋物線對通過頂點的鉛直線（對稱軸）對稱，對稱軸在 x = &minus;b / 2a。',
          'y = x² 就是 a = 2 的<a href="#power-function">冪函數</a>，而且是<a href="#even-function">偶函數</a> &mdash; 對稱軸就是 y 軸。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>parabola：拋物線</p><p>&rarr; "parabola"</p>' },
          {
            label: 'Finding the vertex',
            html:
              '<p>y = x² &minus; 4x + 3</p>' +
              '<p>x = &minus;(&minus;4) / 2 = 2, y = 4 &minus; 8 + 3 = &minus;1</p>' +
              '<p>vertex (2, &minus;1), opens upward</p>'
          }
        ],
        figure: {
          caption: 'y = x²: the vertex sits on the axis of symmetry',
          svg:
            '<svg viewBox="0 0 300 155" role="img" aria-label="the parabola y equals x squared">' +
            '<path d="M20 130 H280" stroke="currentColor" stroke-width="1.2" opacity=".5"/>' +
            '<path d="M150 8 V148" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="4 3"/>' +
            '<path d="M50 20 Q150 240 250 20" fill="none" stroke="var(--accent)" stroke-width="2.4"/>' +
            '<circle cx="150" cy="130" r="4" fill="var(--accent)"/>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="157" y="146">vertex</text>' +
            '<text x="156" y="18" fill="var(--accent)">axis of symmetry</text>' +
            '<text x="240" y="62">y = x²</text></g></svg>'
        }
      },

      {
        id: 'piecewise-function',
        term: 'Piecewise-defined function',
        zh: '分段函數',
        aliases: ['piecewise', '分段定義'],
        tags: ['ch1.1', 'families'],
        def:
          'A function defined by <strong>different formulas on different parts of its ' +
          'domain</strong>. It is still one function: each x uses exactly one of the formulas.',
        notes: [
          'The notes say "in different domains"; more precisely, the pieces are different ' +
            'intervals of a <em>single</em> domain, and together they must not overlap.',
          'The <a href="#absolute-value">absolute value</a> and the ' +
            '<a href="#floor-function">floor</a> and ceiling functions are all piecewise.',
          'At a switching point, check which piece owns it — that decides filled vs. hollow dot on the graph.'
        ],
        defZh:
          '在定義域的<strong>不同區段上用不同公式</strong>定義的函數。它仍然是「一個」函數：每個 x 只會用到其中一條公式。',
        notesZh: [
          '筆記寫「in different domains」；更精確地說，是<em>同一個</em>定義域切成的不同區間，而且區間彼此不能重疊。',
          '<a href="#absolute-value">絕對值</a>、<a href="#floor-function">取整函數</a>都是分段函數。',
          '在切換點要看它屬於哪一段 &mdash; 這決定圖上畫實心點還是空心點。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>piecewise function：分段函數：a function that is defined by different ' +
              'formulas in different domains.</p>'
          },
          {
            label: 'Absolute value is piecewise',
            html:
              '<p>|x| = ' +
              GLOSSARY.SYS([
                '&nbsp;x,&nbsp;&nbsp;&nbsp;&nbsp;x &ge; 0',
                '&minus;x,&nbsp;&nbsp;x &lt; 0'
              ]) +
              '</p>'
          }
        ],
        figure: {
          caption: 'Two formulas on two parts of the domain; the graph jumps where the formula switches',
          svg:
            '<svg viewBox="0 0 300 175" role="img" aria-label="graph of a piecewise function">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5">' +
            '<path d="M30 120 H285"/><path d="M150 170 V10"/></g>' +
            '<path d="M75 165 L147 93" stroke="var(--accent)" stroke-width="2.4" opacity=".6"/>' +
            '<path d="M150 120 Q177 120 204 22.8" fill="none" stroke="var(--accent)" stroke-width="2.4"/>' +
            '<circle cx="150" cy="90" r="4" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.8"/>' +
            '<circle cx="150" cy="120" r="4" fill="var(--accent)"/>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="38" y="98">x + 1, &nbsp;x &lt; 0</text>' +
            '<text x="210" y="42">x², &nbsp;x &ge; 0</text></g></svg>'
        }
      },

      {
        id: 'polynomial-function',
        term: 'Polynomial function',
        zh: '多項式函數',
        aliases: ['degree', '次數', 'polynomial'],
        tags: ['ch1.1', 'families'],
        added: true,
        def:
          'A finite sum of power functions with non-negative whole-number exponents: ' +
          '<span class="mono">a<sub>n</sub>x<sup>n</sup> + &hellip; + a<sub>1</sub>x + a<sub>0</sub></span>. ' +
          'The largest exponent is its <strong>degree</strong>.',
        notes: [
          'The domain is always all of &#8477; — no denominators or roots to worry about.',
          'Constant functions (degree 0) and linear functions (degree 1) are special cases.'
        ],
        defZh:
          '有限多個非負整數次冪的和：a<sub>n</sub>x<sup>n</sup> + … + a<sub>1</sub>x + a<sub>0</sub>。' +
          '最高次數就是它的<strong>次數</strong>（degree）。',
        notesZh: [
          '定義域一律是整個 &#8477;（不會有分母或根號的問題）。',
          '常數函數（0 次）與線性函數（1 次）都是多項式函數的特例。'
        ],
        examples: [
          {
            label: 'Degree',
            html:
              '<p>3x&#8308; &minus; x + 7 &nbsp;&rarr;&nbsp; degree 4</p>' +
              '<p>2x + 1 &nbsp;&rarr;&nbsp; degree 1 (linear)</p>'
          }
        ]
      },

      {
        id: 'rational-function',
        term: 'Rational function',
        zh: '有理函數',
        aliases: ['quotient', '分式'],
        tags: ['ch1.1', 'families'],
        added: true,
        def:
          'A quotient of two polynomials, <span class="mono">f(x) = p(x) / q(x)</span>. ' +
          'Its domain excludes every x with <span class="mono">q(x) = 0</span>.',
        defZh: '兩個多項式的商 f(x) = p(x)/q(x)。定義域要把所有使分母 q(x) = 0 的 x 都排除。',
        examples: [
          {
            label: 'Example',
            html:
              '<p>f(x) = (x + 1)/(x² &minus; 4) &nbsp;&rarr;&nbsp; D = {x | x &ne; &plusmn;2}</p>'
          }
        ]
      },

      {
        id: 'composite-function',
        term: 'Composite function',
        zh: '合成函數',
        aliases: ['composition', 'f of g', '複合函數', 'fog'],
        tags: ['ch1.2', 'operations'],
        def:
          '<span class="mono">(f &compfn; g)(x) = f(g(x))</span> — feed x into g, then feed the ' +
          'result into f. It is defined only where g(x) lands inside the domain of f.',
        notes: [
          'Read f &compfn; g right to left: g acts first, even though f is written first.',
          'Order matters: in general f &compfn; g &ne; g &compfn; f.'
        ],
        defZh:
          '(f &compfn; g)(x) = f(g(x))：先丟進 g，再把結果丟進 f。' +
          '只有當 g(x) 落在 f 的定義域內時才有定義。',
        notesZh: [
          'f &compfn; g 要從右往左讀：雖然 f 寫在前面，但先作用的是 g。',
          '順序有差：一般來說 f &compfn; g &ne; g &compfn; f。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>f &compfn; g(x) = f(g(x)): composition of f(·) and g(·)</p>'
          },
          {
            label: 'Order is not interchangeable',
            html:
              '<p>f(x) = x², g(x) = x + 1</p>' +
              '<p>(f &compfn; g)(x) = (x + 1)²</p>' +
              '<p>(g &compfn; f)(x) = x² + 1 &nbsp;&larr;&nbsp; different</p>'
          }
        ]
      },

      /* ------------------------------------------------ ch1.2 trigonometry */
      {
        id: 'angle-measure',
        term: 'Positive / negative angle measure',
        zh: '正向角／負向角',
        aliases: ['positive measure', 'negative measure', 'counterclockwise', 'clockwise', '逆時針', '順時針', 'angle'],
        tags: ['ch1.2', 'trigonometry'],
        def:
          'An angle drawn from the positive x-axis has a <strong>positive measure</strong> when ' +
          'it turns <strong>counter-clockwise</strong>, and a <strong>negative measure</strong> ' +
          'when it turns <strong>clockwise</strong>.',
        notes: [
          'The starting ray (along the positive x-axis) is the initial side; where the turn ends is the terminal side.',
          'Angles past a full turn are allowed: 390° ends in the same place as 30°, and so does &minus;330°.'
        ],
        defZh:
          '從正 x 軸量起的角，<strong>逆時針</strong>轉為<strong>正向角</strong>（正的度量），' +
          '<strong>順時針</strong>轉為<strong>負向角</strong>（負的度量）。',
        notesZh: [
          '起始的那條射線（沿正 x 軸）叫始邊，轉到最後停下的那條叫終邊。',
          '角可以超過一圈：390° 和 30° 停在同一個位置，&minus;330° 也是。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>positive measure：正向角（逆時針）</p>' +
              '<p>negative measure：負向角（順時針）</p>' +
              '<p>&rarr; positive = counter-clockwise, negative = clockwise</p>'
          }
        ],
        figure: {
          caption: 'Left: +60°, turned counter-clockwise. Right: −60°, turned clockwise.',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="positive and negative angles">' +
            '<defs><marker id="angar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" ' +
            'markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".45">' +
            '<path d="M20 75 H135 M75 15 V135"/><path d="M170 75 H285 M225 15 V135"/></g>' +
            '<g stroke="currentColor" stroke-width="2">' +
            '<path d="M75 75 L135 75"/><path d="M75 75 L105 23"/>' +
            '<path d="M225 75 L285 75"/><path d="M225 75 L255 127"/></g>' +
            '<g fill="none" stroke="var(--accent)" stroke-width="2" marker-end="url(#angar)">' +
            '<path d="M103 75 A28 28 0 0 0 89 50.8"/>' +
            '<path d="M253 75 A28 28 0 0 1 239 99.2"/></g>' +
            '<g font-family="sans-serif" font-size="11" text-anchor="middle">' +
            '<text x="75" y="148" fill="var(--accent)">+60° (counter-clockwise)</text>' +
            '<text x="225" y="148" fill="var(--accent)">&minus;60° (clockwise)</text></g></svg>'
        }
      },

      {
        id: 'radian',
        term: 'Radian',
        abbr: 'rad',
        zh: '弧度',
        aliases: ['rad', 'pi', 'π', 'degree', '度'],
        tags: ['ch1.2', 'trigonometry'],
        added: true,
        def:
          'The angle that cuts off an arc <strong>equal in length to the radius</strong>. On a ' +
          'circle of radius r, an angle of θ radians cuts off an arc of length ' +
          '<span class="mono">s = rθ</span>.',
        notes: [
          'Why this is here: the notes use angles such as π/2 and π/3 without saying they are ' +
            'in radians — calculus always measures angles this way.',
          'A full turn is 2π rad = 360°, so 180° = π rad.',
          'On a unit circle (r = 1) the angle in radians <em>is</em> the arc length — the fact ' +
            'the <a href="#sin-le-theta">sin θ ≤ θ</a> argument relies on.'
        ],
        defZh:
          '所對的弧長<strong>剛好等於半徑</strong>的那個角。半徑為 r 的圓上，θ 弧度的角所對弧長為 s = rθ。',
        notesZh: [
          '為什麼補這個：筆記裡的 π/2、π/3 都沒說單位是弧度 &mdash; 微積分量角一律用弧度。',
          '一整圈是 2π rad = 360°，所以 180° = π rad。',
          '在單位圓（r = 1）上，弧度數<em>就是</em>弧長 &mdash; <a href="#sin-le-theta">sin θ ≤ θ</a> 的證明正是用這一點。'
        ],
        examples: [
          {
            label: 'Converting',
            html:
              '<p>degrees &rarr; radians: multiply by π/180</p>' +
              '<p>90° = π/2 &nbsp;&nbsp; 60° = π/3 &nbsp;&nbsp; 45° = π/4 &nbsp;&nbsp; 30° = π/6</p>'
          }
        ]
      },

      {
        id: 'triangle-sides',
        term: 'Adjacent / opposite / hypotenuse',
        zh: '鄰邊／對邊／斜邊',
        aliases: ['adjacent', 'opposite', 'hypotenuse', '鄰邊', '對邊', '斜邊', 'right triangle', '直角三角形'],
        tags: ['ch1.2', 'trigonometry'],
        def:
          'The three sides of a right triangle, named relative to an angle θ: the ' +
          '<strong>hypotenuse</strong> is the longest side, opposite the right angle; the ' +
          '<strong>opposite</strong> side faces θ; the <strong>adjacent</strong> side is the ' +
          'other side touching θ.',
        notes: [
          '"Opposite" and "adjacent" depend on which angle you are looking at — swap to the ' +
            'other acute angle and they trade places. The hypotenuse never changes.',
          'The notes label them as coordinates: adjacent = x, opposite = y, hypotenuse = h — ' +
            'which is how the <a href="#trigonometric-functions">trig ratios</a> are written.'
        ],
        defZh:
          '直角三角形的三個邊，依角 θ 命名：<strong>斜邊</strong>最長、正對直角；' +
          '<strong>對邊</strong>正對 θ；<strong>鄰邊</strong>是貼著 θ 的另一邊。',
        notesZh: [
          '「對邊」「鄰邊」取決於你看的是哪個角 &mdash; 換成另一個銳角，兩者就互換；斜邊永遠不變。',
          '筆記用座標來標：鄰邊 = x、對邊 = y、斜邊 = h，<a href="#trigonometric-functions">三角比</a>就是這樣寫的。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>adjacent &nbsp; opposite &nbsp; hypotenuse</p>' }
        ],
        figure: {
          caption: 'Named from the angle θ: x adjacent, y opposite, h the hypotenuse',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="sides of a right triangle">' +
            '<path d="M40 125 L240 125 L240 30 Z" fill="var(--accent-soft)" stroke="currentColor" stroke-width="1.6"/>' +
            '<path d="M228 125 V113 H240" fill="none" stroke="currentColor" stroke-width="1.2"/>' +
            '<path d="M72 125 A32 32 0 0 0 68.9 111.3" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
            '<g font-family="sans-serif" font-size="11" fill="currentColor">' +
            '<text x="78" y="118" fill="var(--accent)" font-weight="700">θ</text>' +
            '<text x="140" y="142" text-anchor="middle">adjacent (x)</text>' +
            '<text x="248" y="82">opposite (y)</text>' +
            '<text x="118" y="66" text-anchor="middle">hypotenuse (h)</text></g></svg>'
        }
      },

      {
        id: 'trigonometric-functions',
        term: 'Trigonometric functions',
        zh: '三角函數',
        aliases: ['sin', 'cos', 'tan', 'csc', 'sec', 'cot', 'sine', 'cosine', 'tangent', '正弦', '餘弦', '正切', 'trig'],
        tags: ['ch1.2', 'trigonometry'],
        def:
          'The six ratios of the sides of a right triangle, as functions of the angle θ. With ' +
          'adjacent x, opposite y and hypotenuse h: ' +
          '<span class="mono">sin θ = y/h</span>, <span class="mono">cos θ = x/h</span>, ' +
          '<span class="mono">tan θ = y/x</span>, and their reciprocals ' +
          '<span class="mono">csc θ = h/y</span>, <span class="mono">sec θ = h/x</span>, ' +
          '<span class="mono">cot θ = x/y</span>.',
        notes: [
          'The notes give sin, cos and tan, and list csc, sec and cot without values; the three ' +
            'reciprocals are filled in here.',
          'Pairing: csc = 1/sin, sec = 1/cos, cot = 1/tan.',
          'On the unit circle (h = 1) the point at angle θ is (cos θ, sin θ) — which is how the ' +
            'functions extend past 90° and to negative angles.'
        ],
        defZh:
          '直角三角形各邊的六個比值，看成角 θ 的函數。鄰邊 x、對邊 y、斜邊 h 時：' +
          'sin θ = y/h、cos θ = x/h、tan θ = y/x，以及它們的倒數 csc θ = h/y、sec θ = h/x、cot θ = x/y。',
        notesZh: [
          '筆記寫了 sin、cos、tan，csc、sec、cot 只列了名字沒寫值；三個倒數是這裡補上的。',
          '對應關係：csc = 1/sin、sec = 1/cos、cot = 1/tan。',
          '在單位圓（h = 1）上，角 θ 對應的點就是 (cos θ, sin θ) &mdash; 三角函數就是這樣推廣到大於 90° 和負角的。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>sin = y/h &nbsp;&nbsp; cos = x/h &nbsp;&nbsp; tan = y/x</p>' +
              '<p>csc &nbsp;&nbsp; sec &nbsp;&nbsp; cot &nbsp;&nbsp;(left blank)</p>'
          },
          {
            label: 'A 3-4-5 triangle, θ at the side of length 4',
            html:
              '<p>x = 4, y = 3, h = 5</p>' +
              '<p>sin θ = 3/5 &nbsp; cos θ = 4/5 &nbsp; tan θ = 3/4</p>' +
              '<p>csc θ = 5/3 &nbsp; sec θ = 5/4 &nbsp; cot θ = 4/3</p>'
          }
        ]
      },

      {
        id: 'sin-le-theta',
        term: 'sin θ ≤ θ',
        zh: '正弦不等式 sin θ ≤ θ',
        aliases: ['characteristic of sin', 'sine inequality', 'unit circle', '單位圓', 'arc length', '弧長', 'chord'],
        tags: ['ch1.2', 'trigonometry'],
        def:
          'For <span class="mono">0 ≤ θ ≤ π/2</span>, <span class="mono">sin θ ≤ θ</span>. On the ' +
          'unit circle, sin θ is a vertical leg, which is no longer than the chord PA, which is ' +
          'no longer than the arc PA — and that arc has length θ.',
        notes: [
          'Step 1: on a unit circle the arc cut off by angle θ has length θ (θ in ' +
            '<a href="#radian">radians</a>).',
          'Step 2: a straight chord is never longer than the arc it spans: chord PA ≤ arc PA = θ.',
          'Step 3: by Pythagoras, chord PA = &radic;(sin²θ + (1 &minus; cos θ)²) ≥ &radic;(sin²θ) = sin θ.',
          'The handwritten side-calculation expands the square as 2 &minus; 2 sin θ cos θ; it ' +
            'should be sin²θ + 1 &minus; 2cos θ + cos²θ = <strong>2 &minus; 2cos θ</strong>. The ' +
            'conclusion is unaffected.',
          'On the graph, y = sin θ stays under the line y = θ, touching it only at 0 — the ' +
            'reason sin θ / θ &rarr; 1 as θ &rarr; 0, used later for limits.'
        ],
        defZh:
          '當 0 ≤ θ ≤ π/2 時，sin θ ≤ θ。在單位圓上，sin θ 是一條直的股，它不會比弦 PA 長，' +
          '弦 PA 又不會比弧 PA 長 &mdash; 而那段弧的長度就是 θ。',
        notesZh: [
          '第 1 步：單位圓上角 θ 所對的弧長就是 θ（θ 用<a href="#radian">弧度</a>）。',
          '第 2 步：弦不會比它所跨的弧長：弦 PA ≤ 弧 PA = θ。',
          '第 3 步：由畢氏定理，弦 PA = &radic;(sin²θ + (1 &minus; cos θ)²) ≥ &radic;(sin²θ) = sin θ。',
          '筆記旁邊的手寫展開寫成 2 &minus; 2 sin θ cos θ；正確應為 sin²θ + 1 &minus; 2cos θ + cos²θ = <strong>2 &minus; 2cos θ</strong>。不影響結論。',
          '在圖上 y = sin θ 永遠在直線 y = θ 下方，只在 0 相切 &mdash; 這就是之後極限裡 sin θ / θ &rarr; 1 的原因。'
        ],
        examples: [
          {
            label: 'From the notes (slide "Characteristic of sin(θ)")',
            html:
              '<p>PA (arc) = θ</p>' +
              '<p>PA ≥ chord PA = &radic;(sin²θ + (1 &minus; cos θ)²) ≥ &radic;sin²θ = sin θ</p>' +
              '<p>&rArr; sin θ ≤ θ for 0 ≤ θ ≤ π/2</p>'
          },
          {
            label: 'Checking a value',
            html: '<p>θ = π/6 ≈ 0.524 &nbsp;&rarr;&nbsp; sin θ = 0.5 ≤ 0.524 &#10003;</p>'
          }
        ],
        figure: {
          caption: 'sin θ (vertical) ≤ chord PA (dashed) ≤ arc PA, which has length θ',
          svg:
            '<svg viewBox="0 0 320 185" role="img" aria-label="unit circle proof that sin theta is at most theta">' +
            '<g stroke="currentColor" stroke-width="1.1" opacity=".45">' +
            '<path d="M30 150 H300"/><path d="M120 170 V22"/></g>' +
            '<path d="M230 150 A110 110 0 0 0 120 40" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".6"/>' +
            '<path d="M120 150 L190.7 65.7" stroke="currentColor" stroke-width="1.8"/>' +
            '<path d="M190.7 65.7 L230 150" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>' +
            '<path d="M230 150 A110 110 0 0 0 190.7 65.7" fill="none" stroke="var(--accent)" stroke-width="3"/>' +
            '<path d="M190.7 65.7 V150" stroke="var(--accent)" stroke-width="2.4"/>' +
            '<path d="M182 150 V142 H190.7" fill="none" stroke="currentColor" stroke-width="1"/>' +
            '<path d="M140 150 A20 20 0 0 0 132.9 134.7" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
            '<g fill="currentColor"><circle cx="190.7" cy="65.7" r="3.6"/><circle cx="230" cy="150" r="3.6"/></g>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="110" y="164" text-anchor="end">O</text>' +
            '<text x="194" y="58">P</text>' +
            '<text x="193" y="164">Q</text>' +
            '<text x="232" y="164">A (1, 0)</text>' +
            '<text x="146" y="100">1</text>' +
            '<text x="143" y="143">θ</text>' +
            '<text x="186" y="118" text-anchor="end" fill="var(--accent)" font-weight="700">sin θ</text>' +
            '<text x="229" y="96" fill="var(--accent)">arc = θ</text>' +
            '<text x="212" y="176" text-anchor="middle" font-size="9.5">1 &minus; cos θ</text></g></svg>'
        }
      },

      /* ------------------------------------------------ ch1.2 exp / inverse / log */
      {
        id: 'exponential-function',
        term: 'Exponential function',
        zh: '指數函數',
        aliases: ['exponential', 'a^x', 'growth', 'decay', '成長', '衰減'],
        tags: ['ch1.2', 'families'],
        def:
          'A function of the form <span class="mono">f(x) = c · a<sup>x</sup></span>, with a ' +
          'constant base <span class="mono">a &gt; 0, a &ne; 1</span> and the variable in the ' +
          '<strong>exponent</strong>.',
        notes: [
          'Do not mix it up with a <a href="#power-function">power function</a> x<sup>a</sup>, ' +
            'where the variable is in the base.',
          'a &gt; 1 gives growth, 0 &lt; a &lt; 1 gives decay. Either way the graph passes ' +
            'through (0, c) and never touches the x-axis: a<sup>x</sup> &gt; 0 always.',
          'Its inverse is the <a href="#logarithm-function">logarithm</a> log<sub>a</sub>x.'
        ],
        defZh:
          '形如 f(x) = c · a<sup>x</sup> 的函數：底數 a 是常數（a &gt; 0、a &ne; 1），變數在<strong>指數</strong>上。',
        notesZh: [
          '別和<a href="#power-function">冪函數</a> x<sup>a</sup> 搞混 &mdash; 冪函數的變數在底數。',
          'a &gt; 1 是成長、0 &lt; a &lt; 1 是衰減。兩種都通過 (0, c)，而且永遠碰不到 x 軸：a<sup>x</sup> 恆大於 0。',
          '它的反函數是<a href="#logarithm-function">對數函數</a> log<sub>a</sub>x。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Exponential functions：指數函數：f(x) = c · a<sup>x</sup></p>' },
          {
            label: 'Growth and decay',
            html: '<p>f(x) = 3 · 2<sup>x</sup> &nbsp;&rarr;&nbsp; doubles with every +1 in x</p><p>g(x) = (½)<sup>x</sup> &nbsp;&rarr;&nbsp; halves with every +1</p>'
          }
        ],
        figure: {
          caption: 'Both pass through (0, c); here c = 1',
          svg:
            '<svg viewBox="0 0 300 160" role="img" aria-label="exponential growth and decay">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5"><path d="M20 140 H285"/><path d="M150 155 V8"/></g>' +
            '<polyline fill="none" stroke="var(--accent)" stroke-width="2.4" points="' +
            '50,138.4 75,136.9 100,133.75 125,127.5 150,115 175,90 200,40 207.5,17"/>' +
            '<polyline fill="none" stroke="var(--accent)" stroke-width="2.4" opacity=".55" points="' +
            '92.5,17 100,40 125,90 150,115 175,127.5 200,133.75 225,136.9 250,138.4"/>' +
            '<circle cx="150" cy="115" r="3.8" fill="currentColor"/>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="212" y="40">2<tspan dy="-4" font-size="8">x</tspan><tspan dy="4"> (a &gt; 1)</tspan></text>' +
            '<text x="8" y="70">(½)<tspan dy="-4" font-size="8">x</tspan><tspan dy="4"> (0 &lt; a &lt; 1)</tspan></text>' +
            '<text x="157" y="110">(0, 1)</text></g></svg>'
        }
      },

      {
        id: 'inverse-function',
        term: 'Inverse function',
        abbr: 'f<sup>&minus;1</sup>',
        zh: '反函數',
        aliases: ['inverse', 'inverse graph', 'reflection', 'y = x', '鏡射'],
        tags: ['ch1.2', 'operations'],
        def:
          'The function that <strong>undoes</strong> f: it takes an output of f back to the ' +
          'input that produced it. If h is <a href="#one-to-one-function">one-to-one</a>, its ' +
          'inverse exists and is written <span class="mono">h<sup>&minus;1</sup></span>, with ' +
          '<span class="mono">h<sup>&minus;1</sup>(h(x)) = x</span>.',
        notes: [
          'The notes put it as "a function can be reasoned its input by its output" — given the ' +
            'output, you can work back to the input.',
          '<strong>Inverse graph</strong>: the graphs of g and g<sup>&minus;1</sup> are ' +
            'reflections of each other in the line y = x, because (a, b) on one means (b, a) on the other.',
          'The domain and range swap: dom f<sup>&minus;1</sup> = range f.',
          'The &minus;1 is not a power: f<sup>&minus;1</sup>(x) is not 1/f(x).'
        ],
        defZh:
          '把 f「倒回去」的函數：把 f 的輸出帶回產生它的那個輸入。若 h 是<a href="#one-to-one-function">一對一</a>，' +
          '反函數就存在，記作 h<sup>&minus;1</sup>，滿足 h<sup>&minus;1</sup>(h(x)) = x。',
        notesZh: [
          '筆記的說法是「a function can be reasoned its input by its output」&mdash; 知道輸出就能反推輸入。',
          '<strong>反函數圖形</strong>：g 與 g<sup>&minus;1</sup> 的圖形對直線 y = x 互為鏡射，因為一邊有 (a, b)，另一邊就有 (b, a)。',
          '定義域與值域互換：f<sup>&minus;1</sup> 的定義域 = f 的值域。',
          '那個 &minus;1 不是次方：f<sup>&minus;1</sup>(x) 不是 1/f(x)。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Inverse functions: A function can be reasoned its input by its output.</p>' +
              '<p>Definition. If h(·) is one-to-one, then the inverse of h(·) exists and is defined by h<sup>&minus;1</sup>(·)</p>' +
              '<p>The graphs of g(x) and g<sup>&minus;1</sup>(x) are reflections of each other about the line y = x!</p>'
          },
          {
            label: 'Finding an inverse',
            html:
              '<p>f(x) = 2x + 3 &nbsp;&rarr;&nbsp; y = 2x + 3 &nbsp;&rarr;&nbsp; x = (y &minus; 3)/2</p>' +
              '<p>f<sup>&minus;1</sup>(x) = (x &minus; 3)/2</p>'
          }
        ],
        figure: {
          caption: 'f(x) = 2ˣ and its inverse log₂ x mirror each other in y = x',
          svg:
            '<svg viewBox="0 0 300 210" role="img" aria-label="a function and its inverse reflected in y equals x">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5"><path d="M20 120 H285"/><path d="M120 205 V5"/></g>' +
            '<path d="M32 208 L232 8" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 4"/>' +
            '<polyline fill="none" stroke="var(--accent)" stroke-width="2.4" points="' +
            '42,116.8 68,113.5 94,107 120,94 146,68 172,16"/>' +
            '<polyline fill="none" stroke="var(--accent)" stroke-width="2.4" opacity=".55" points="' +
            '123.3,198 126.5,172 133,146 146,120 172,94 224,68"/>' +
            '<path d="M146 68 L172 94" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>' +
            '<g fill="currentColor"><circle cx="146" cy="68" r="3.4"/><circle cx="172" cy="94" r="3.4"/></g>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="36" y="100">f(x) = 2<tspan dy="-4" font-size="8">x</tspan></text>' +
            '<text x="140" y="192">f<tspan dy="-4" font-size="8">&minus;1</tspan><tspan dy="4">(x) = log₂ x</tspan></text>' +
            '<text x="236" y="18">y = x</text>' +
            '<text x="116" y="64" text-anchor="end">(1, 2)</text>' +
            '<text x="178" y="104">(2, 1)</text></g></svg>'
        }
      },

      {
        id: 'one-to-one-function',
        term: 'One-to-one function',
        zh: '一對一函數',
        aliases: ['one to one', 'injective', 'horizontal line test', '水平線檢驗', '單射'],
        tags: ['ch1.2', 'operations'],
        def:
          'A function in which <strong>every output comes from exactly one input</strong>: for ' +
          'any two different inputs <span class="mono">x₁ &ne; x₂</span>, ' +
          '<span class="mono">h(x₁) &ne; h(x₂)</span>. These are exactly the functions that ' +
          'have an <a href="#inverse-function">inverse</a>.',
        notes: [
          'The notes add "then the answer is positive" — read it as: if a function is one-to-one, ' +
            'the answer to "does it have an inverse?" is yes.',
          '<strong>Horizontal line test</strong>: a graph is one-to-one exactly when no ' +
            'horizontal line meets it twice (compare the vertical line test for being a function).',
          'Strictly <a href="#monotonic-function">increasing or decreasing</a> functions are ' +
            'always one-to-one.'
        ],
        defZh:
          '<strong>每個輸出都只來自唯一一個輸入</strong>的函數：任兩個不同的輸入 x₁ &ne; x₂，都有 h(x₁) &ne; h(x₂)。' +
          '有<a href="#inverse-function">反函數</a>的，恰好就是這種函數。',
        notesZh: [
          '筆記後面寫「then the answer is positive」&mdash; 意思是：若函數是一對一，那「它有沒有反函數？」的答案就是肯定的。',
          '<strong>水平線檢驗</strong>：圖形上任一條水平線都最多只交一次，就是一對一（對照判斷是否為函數的垂線檢驗）。',
          '嚴格<a href="#monotonic-function">遞增或遞減</a>的函數一定是一對一。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>One-to-One functions: Every output results from uniquely one input, then the answer is positive.</p>' +
              '<p>For any two distinct input x₁ and x₂ we have h(x₁) &ne; h(x₂)</p>'
          },
          {
            label: 'One-to-one or not',
            html:
              '<p>f(x) = x³ &nbsp;&rarr;&nbsp; yes</p>' +
              '<p>f(x) = x² &nbsp;&rarr;&nbsp; no: f(2) = f(&minus;2) = 4</p>'
          }
        ],
        figure: {
          caption: 'The horizontal line hits x² twice (not one-to-one) but the kept half once',
          svg: RESTRICTED_PARABOLA
        }
      },

      {
        id: 'logarithm-function',
        term: 'Logarithm function',
        abbr: 'log<sub>a</sub>x',
        zh: '對數函數',
        aliases: ['log', 'ln', 'natural log', '自然對數', 'logarithm'],
        tags: ['ch1.2', 'families'],
        def:
          'The <a href="#inverse-function">inverse</a> of the exponential function a<sup>x</sup>: ' +
          '<span class="mono">log<sub>a</sub>x = y</span> means <span class="mono">a<sup>y</sup> = x</span>. ' +
          'It answers "what power of a gives x?"',
        notes: [
          'The notes give only the heading; the definition is filled in here.',
          'Domain x &gt; 0 — the range of a<sup>x</sup> — and range all of &#8477;.',
          'With base e it is the natural log, ln x.',
          'Log laws: log(xy) = log x + log y, log(x/y) = log x &minus; log y, log(x<sup>r</sup>) = r log x.'
        ],
        defZh:
          '指數函數 a<sup>x</sup> 的<a href="#inverse-function">反函數</a>：log<sub>a</sub>x = y 就是 a<sup>y</sup> = x。它回答「a 的幾次方是 x？」',
        notesZh: [
          '筆記只寫了標題，定義是這裡補上的。',
          '定義域 x &gt; 0（也就是 a<sup>x</sup> 的值域），值域是整個 &#8477;。',
          '底數為 e 時就是自然對數 ln x。',
          '對數律：log(xy) = log x + log y、log(x/y) = log x &minus; log y、log(x<sup>r</sup>) = r log x。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Logarithm function</p><p>&rarr; (heading only)</p>' },
          {
            label: 'Evaluating',
            html: '<p>log₂ 8 = 3 because 2³ = 8</p><p>log₁₀ 0.01 = &minus;2 because 10<sup>&minus;2</sup> = 0.01</p>'
          }
        ]
      },

      {
        id: 'domain-restriction',
        term: 'Domain restriction',
        zh: '定義域限制',
        aliases: ['restricted domain', 'restrict', '限制定義域'],
        tags: ['ch1.2', 'operations'],
        def:
          'Cutting a function\'s domain down to a smaller interval, usually so that it becomes ' +
          '<a href="#one-to-one-function">one-to-one</a> there and therefore has an ' +
          '<a href="#inverse-function">inverse</a>.',
        notes: [
          'The notes give only the heading; the definition is filled in here.',
          'x² is not one-to-one on &#8477;, but restricted to x ≥ 0 it is — and its inverse is &radic;x.',
          'This is the "properly restricted" in the definition of the ' +
            '<a href="#inverse-trig">inverse trig functions</a>: sin x is restricted to ' +
            '[&minus;π/2, π/2] before it is inverted.'
        ],
        defZh:
          '把函數的定義域縮小到某個區間，通常是為了讓它在那裡變成<a href="#one-to-one-function">一對一</a>，因而有<a href="#inverse-function">反函數</a>。',
        notesZh: [
          '筆記只寫了標題，定義是這裡補上的。',
          'x² 在 &#8477; 上不是一對一，但限制在 x ≥ 0 就是 &mdash; 它的反函數就是 &radic;x。',
          '<a href="#inverse-trig">反三角函數</a>定義裡的「properly restricted」就是指這個：sin x 先限制在 [&minus;π/2, π/2] 才取反函數。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Domain restriction</p><p>&rarr; (heading only)</p>' }
        ],
        figure: {
          caption: 'Keeping only x ≥ 0 makes x² one-to-one, so it can be inverted',
          svg: RESTRICTED_PARABOLA
        }
      },

      {
        id: 'inverse-trig',
        term: 'Inverse trigonometric functions',
        abbr: 'arcsin',
        zh: '反三角函數',
        aliases: ['arcsin', 'arccos', 'arctan', 'sin^-1', 'cos^-1', '反正弦', 'relation between inverse'],
        tags: ['ch1.2', 'trigonometry'],
        def:
          'The inverses of the <em>properly restricted</em> trig functions. The inverse of sin x ' +
          '(restricted to <span class="mono">[&minus;π/2, π/2]</span>) is written ' +
          '<span class="mono">sin<sup>&minus;1</sup>x = arcsin x</span>: the angle — the ' +
          '<em>arc</em> — whose sine is x.',
        notes: [
          'The restriction is needed because sin repeats itself and is not ' +
            '<a href="#one-to-one-function">one-to-one</a> on its whole domain — see ' +
            '<a href="#domain-restriction">domain restriction</a>.',
          'arcsin takes values in [&minus;π/2, π/2], arccos in [0, π], arctan in (&minus;π/2, π/2).',
          '<strong>Relation</strong> from the notes: cos<sup>&minus;1</sup>x + sin<sup>&minus;1</sup>x = π/2. ' +
            'The notes state it for 0 ≤ x ≤ 1; it in fact holds for every x in [&minus;1, 1].',
          'As with any inverse, sin<sup>&minus;1</sup>x is not 1/sin x — that would be csc x.'
        ],
        defZh:
          '<em>適當限制定義域後</em>的三角函數的反函數。sin x（限制在 [&minus;π/2, π/2]）的反函數寫成 ' +
          'sin<sup>&minus;1</sup>x = arcsin x：正弦值為 x 的那個角（那段<em>弧</em>）。',
        notesZh: [
          '必須先限制，因為 sin 會重複、在整個定義域上不是<a href="#one-to-one-function">一對一</a> &mdash; 見<a href="#domain-restriction">定義域限制</a>。',
          'arcsin 的值落在 [&minus;π/2, π/2]，arccos 在 [0, π]，arctan 在 (&minus;π/2, π/2)。',
          '筆記裡的<strong>關係式</strong>：cos<sup>&minus;1</sup>x + sin<sup>&minus;1</sup>x = π/2。筆記寫的條件是 0 ≤ x ≤ 1，其實對 [&minus;1, 1] 內所有 x 都成立。',
          '和所有反函數一樣，sin<sup>&minus;1</sup>x 不是 1/sin x（那是 csc x）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>The inverse of (the properly restricted) sin x is defined as sin<sup>&minus;1</sup>x = arcsin x</p>' +
              '<p>arcsin: the arc whose sin x is &radic;3/2 &nbsp;&rarr;&nbsp; sin<sup>&minus;1</sup>(&radic;3/2): θ = π/3</p>' +
              '<p>cos<sup>&minus;1</sup>x + sin<sup>&minus;1</sup>x = π/2, &nbsp;1 ≥ x ≥ 0</p>'
          },
          {
            label: 'Checking the relation at x = ½',
            html: '<p>sin<sup>&minus;1</sup>(½) = π/6, &nbsp; cos<sup>&minus;1</sup>(½) = π/3</p><p>π/6 + π/3 = π/2 &#10003;</p>'
          }
        ]
      },

      /* ------------------------------------------------ ch2.2 */
      {
        id: 'identity-function',
        term: 'Identity function',
        zh: '恆等函數',
        aliases: ['identity', 'f(x) = x', 'y = x'],
        tags: ['ch2.2', 'special functions'],
        def:
          'The function <span class="mono">f(x) = x</span>, which outputs exactly what it is ' +
          'given. Its graph is the line y = x.',
        notes: [
          'It is the "do nothing" function for <a href="#composite-function">composition</a>: ' +
            'f &compfn; id = id &compfn; f = f, and f<sup>&minus;1</sup> &compfn; f is the identity.',
          'The line y = x is also the mirror in the <a href="#inverse-function">inverse graph</a>.'
        ],
        defZh: '函數 f(x) = x：輸入什麼就輸出什麼。圖形就是直線 y = x。',
        notesZh: [
          '它是<a href="#composite-function">合成</a>裡的「不動」函數：f &compfn; id = id &compfn; f = f，而 f<sup>&minus;1</sup> &compfn; f 就是恆等函數。',
          '直線 y = x 也正是<a href="#inverse-function">反函數圖形</a>裡的那面鏡子。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Identity function: Directly output the result from input.</p>' }
        ]
      },

      {
        id: 'unit-step-function',
        term: 'Unit step function',
        abbr: 'U(x)',
        zh: '單位步階函數',
        zhAlt: '單位階梯函數／Heaviside 函數',
        aliases: ['step', 'heaviside', 'jump', '跳躍', '步階'],
        tags: ['ch2.2', 'special functions'],
        def:
          'The <a href="#piecewise-function">piecewise</a> function that is <strong>0 for x &lt; 0</strong> ' +
          'and <strong>1 for x &gt; 0</strong>, jumping up at the origin. The version in the notes ' +
          'sets the value at the jump to ½.',
        notes: [
          'The notes write the first case as 1 for x &lt; 0; for a step it must be <strong>0</strong> — ' +
            'otherwise the function would be 1 on both sides and there would be no step.',
          'The value exactly at 0 is a convention: ½ (as in the notes), 1, or left undefined all appear.',
          'Its use in ch2.2: as x &rarr; 0 from the left it approaches 0, from the right 1, so it ' +
            'has no limit at 0 — the standard example of a jump.'
        ],
        defZh:
          'x &lt; 0 時為 <strong>0</strong>、x &gt; 0 時為 <strong>1</strong> 的<a href="#piecewise-function">分段函數</a>，在原點往上跳。筆記的版本把跳躍點的值定為 ½。',
        notesZh: [
          '筆記把第一段寫成 x &lt; 0 時為 1；步階函數這一段必須是 <strong>0</strong>，不然兩邊都是 1，就沒有「階」了。',
          '恰好在 0 的值是約定：½（筆記的寫法）、1、或不定義都有人用。',
          '在 ch2.2 的用途：x 從左邊趨近 0 時趨近 0，從右邊趨近 1，所以在 0 沒有極限 &mdash; 跳躍不連續的標準例子。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Unit step function: ' +
              GLOSSARY.SYS(['1, &nbsp;x &lt; 0', '½, &nbsp;x = 0', '1, &nbsp;x &gt; 0']) +
              '</p><p>&rarr; the first case should read 0</p>'
          },
          {
            label: 'Corrected',
            html: '<p>U(x) = ' + GLOSSARY.SYS(['0, &nbsp;x &lt; 0', '½, &nbsp;x = 0', '1, &nbsp;x &gt; 0']) + '</p>'
          }
        ],
        figure: {
          caption: '0 on the left, 1 on the right, ½ at the jump',
          svg:
            '<svg viewBox="0 0 300 150" role="img" aria-label="the unit step function">' +
            '<g stroke="currentColor" stroke-width="1.2" opacity=".5"><path d="M20 120 H285"/><path d="M150 145 V15"/></g>' +
            '<path d="M30 120 H146" stroke="var(--accent)" stroke-width="2.8"/>' +
            '<path d="M154 60 H280" stroke="var(--accent)" stroke-width="2.8"/>' +
            '<circle cx="150" cy="120" r="4" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.8"/>' +
            '<circle cx="150" cy="60" r="4" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.8"/>' +
            '<circle cx="150" cy="90" r="4" fill="var(--accent)"/>' +
            '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
            '<text x="142" y="64" text-anchor="end">1</text>' +
            '<text x="142" y="94" text-anchor="end">½</text>' +
            '<text x="142" y="134" text-anchor="end">0</text></g></svg>'
        }
      }
    ]
  });
})();
