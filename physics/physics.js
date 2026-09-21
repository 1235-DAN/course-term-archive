/* ==========================================================================
   physics.js — 普通物理 term data
   Source notes: 普物9_11.pdf        (units and measurement)
                 普物9_18-9_21.pdf  (ch2 kinematics: 9/18 is headed only "ch2"; its
                                    terms follow the textbook sections 2.1 and 2.2)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.

   普物9_11 carries no chapter heading. Units and measurement are chapter 1 of
   every general-physics text, so these terms are tagged ch1.
   ========================================================================== */

(function () {
  /* An arrow from (x1, y1) to (x2, y2) with a polygon head, so a figure can
     repeat on several cards without SVG marker ids clashing. */
  function arrow(x1, y1, x2, y2, color) {
    var a = Math.atan2(y2 - y1, x2 - x1),
      bx = x2 - 9 * Math.cos(a),
      by = y2 - 9 * Math.sin(a),
      nx = 4 * Math.sin(a),
      ny = 4 * Math.cos(a);
    var p = function (x, y) { return x.toFixed(1) + ',' + y.toFixed(1); };
    return (
      '<path d="M' + x1 + ' ' + y1 + ' L' + bx.toFixed(1) + ' ' + by.toFixed(1) + '" stroke="' +
      color + '" stroke-width="2.2"/>' +
      '<polygon points="' + p(x2, y2) + ' ' + p(bx + nx, by - ny) + ' ' + p(bx - nx, by + ny) +
      '" fill="' + color + '"/>'
    );
  }

  /* a winding path (distance) against the straight arrow from start to end
     (displacement) */
  var DISP_FIG =
    '<svg viewBox="0 0 300 130" role="img" aria-label="distance along a path versus displacement">' +
    '<path d="M40 95 C80 10 140 130 180 40 S240 20 250 70" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-dasharray="5 4" opacity=".7"/>' +
    arrow(40, 95, 250, 70, 'var(--accent)') +
    '<g fill="currentColor"><circle cx="40" cy="95" r="3.6"/></g>' +
    '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
    '<text x="34" y="112" text-anchor="middle">start</text>' +
    '<text x="256" y="90" text-anchor="middle">end</text>' +
    '<text x="96" y="30">distance = length of the path</text>' +
    '<text x="150" y="104" text-anchor="middle" fill="var(--accent)">displacement Δx</text></g></svg>';

  /* x against t: the secant through A and B has slope v_avg; the tangent at A
     has slope v, the instantaneous velocity */
  var XT_FIG = (function () {
    var Y = function (u) { return 160 - (1.1 * u - 0.0033 * u * u); },
      pts = [];
    for (var u = 0; u <= 240; u += 10) pts.push((35 + u) + ',' + Y(u).toFixed(1));
    return (
      '<svg viewBox="0 0 300 180" role="img" aria-label="position against time with a secant and a tangent">' +
      '<g stroke="currentColor" stroke-width="1.2" opacity=".5"><path d="M35 160 H290"/><path d="M35 170 V8"/></g>' +
      '<polyline points="' + pts.join(' ') + '" fill="none" stroke="currentColor" stroke-width="2" opacity=".8"/>' +
      '<path d="M35 157.1 L165 39.8" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<path d="M45 140.1 L215 54.1" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>' +
      '<g fill="currentColor"><circle cx="65" cy="130" r="3.6"/><circle cx="185" cy="69.3" r="3.6"/></g>' +
      '<g font-family="sans-serif" font-size="10.5" fill="currentColor">' +
      '<text x="72" y="146">A</text><text x="190" y="86">B</text>' +
      '<text x="288" y="174" text-anchor="end">t</text><text x="26" y="16">x</text>' +
      '<text x="296" y="106" text-anchor="end">secant: slope = v<tspan dy="3" font-size="8">avg</tspan></text>' +
      '<text x="44" y="40" fill="var(--accent)">tangent at A: slope = v</text></g></svg>'
    );
  })();

  GLOSSARY.register({
    id: 'physics',
    name: 'General Physics',
    nameZh: '普通物理',
    page: 'physics/physics.html', // relative to index.html
    hue: 190, // teal
    // every source PDF sits in this same folder; the footer links to each one
    sources: [
      { file: '普物9_11.pdf', label: '普物9_11.pdf（ch1）' },
      { file: '普物9_18-9_21.pdf', label: '普物9_18-9_21.pdf（ch2.1–ch2.3）' }
    ],
    blurb:
      '物理的量測語言：SI 單位與詞頭、科學記號、單位換算、公尺的定義與有效數字；' +
      '以及直線運動學：位移、速度、速率與加速度。',

    terms: [
      /* ============================================ units */
      {
        id: 'si-unit',
        term: 'SI unit',
        abbr: 'SI',
        zh: '國際單位制（SI 單位）',
        zhAlt: '公制',
        aliases: ['international system', 'base unit', 'meter', 'kilogram', 'second', 'kelvin', 'ampere', 'candela', 'mole', '公尺', '公斤', '秒', '基本單位'],
        tags: ['ch1', 'units'],
        def:
          'The International System of Units: the agreed set of units used in science. It ' +
          'fixes one <strong>base unit</strong> for each of seven <strong>base quantities</strong> ' +
          '— length, mass, time, temperature, electric current, luminous intensity and amount ' +
          'of substance — and builds every other unit from them.',
        notes: [
          'Two symbols in the notes need fixing: the kelvin is written <strong>K</strong>, with ' +
            'no degree sign (the notes have °K); and the candela, left blank, is <strong>cd</strong>.',
          'Symbols for units named after people are capitalised (K, A), but the unit names are ' +
            'not (kelvin, ampere).',
          'Every other unit is built from these seven — see ' +
            '<a href="#base-derived-quantity">base and derived quantities</a>.'
        ],
        defZh:
          '國際單位制：科學界共同採用的單位系統。它為七個<strong>基本量</strong>（長度、質量、時間、溫度、電流、' +
          '發光強度、物質的量）各訂一個<strong>基本單位</strong>，其他所有單位都由它們組合而成。',
        notesZh: [
          '筆記裡有兩個符號要修正：克耳文寫成 <strong>K</strong>，不加度數符號（筆記寫成 °K）；燭光筆記空白，符號是 <strong>cd</strong>。',
          '以人名命名的單位，符號大寫（K、A），但單位名稱小寫（kelvin、ampere）。',
          '其他單位都由這七個組成 &mdash; 見<a href="#base-derived-quantity">基本量與導出量</a>。'
        ],
        examples: [
          {
            label: 'From the notes (symbols as written, corrected where marked)',
            html:
              '<table><tr><th>Quantity</th><th>SI unit</th><th>Symbol</th></tr>' +
              '<tr><td>Length</td><td>meter</td><td>m</td></tr>' +
              '<tr><td>Mass</td><td>kilogram</td><td>kg</td></tr>' +
              '<tr><td>Time</td><td>second</td><td>s</td></tr>' +
              '<tr><td>Temperature</td><td>kelvin</td><td>K &nbsp;(notes: °K)</td></tr>' +
              '<tr><td>Electric current</td><td>ampere</td><td>A</td></tr>' +
              '<tr><td>Luminous intensity</td><td>candela</td><td>cd &nbsp;(notes: blank)</td></tr>' +
              '<tr><td>Amount of substance</td><td>mole</td><td>mol</td></tr></table>'
          }
        ]
      },

      {
        id: 'base-derived-quantity',
        term: 'Base and derived quantities',
        zh: '基本量與導出量',
        aliases: ['base quantity', 'derived quantity', 'derived unit', 'newton', 'joule', '導出單位'],
        tags: ['ch1', 'units'],
        added: true,
        def:
          'A <strong>base quantity</strong> is one of the seven the <a href="#si-unit">SI</a> ' +
          'defines on its own. A <strong>derived quantity</strong> is built from base quantities ' +
          'by multiplying and dividing, and so is its unit.',
        notes: [
          'Why this is here: the SI table in the notes lists only the base quantities; almost ' +
            'everything measured later (speed, force, energy) is derived.',
          'Some derived units get their own names: 1 N = 1 kg·m/s², 1 J = 1 N·m.'
        ],
        defZh:
          '<strong>基本量</strong>是 <a href="#si-unit">SI</a> 單獨訂定的七個量；<strong>導出量</strong>由基本量相乘相除組合而成，單位也一樣。',
        notesZh: [
          '為什麼補這個：筆記的 SI 表只列了基本量，但之後量的東西（速度、力、能量）幾乎都是導出量。',
          '有些導出單位有自己的名字：1 N = 1 kg·m/s²、1 J = 1 N·m。'
        ],
        examples: [
          {
            label: 'Derived from base units',
            html:
              '<table><tr><th>Quantity</th><th>Unit</th></tr>' +
              '<tr><td>speed</td><td>m/s</td></tr>' +
              '<tr><td>acceleration</td><td>m/s²</td></tr>' +
              '<tr><td>density</td><td>kg/m³</td></tr>' +
              '<tr><td>force</td><td>kg·m/s² = N (newton)</td></tr></table>'
          }
        ]
      },

      {
        id: 'meter',
        term: 'Meter (definition)',
        abbr: 'm',
        zh: '公尺的定義',
        zhAlt: '米',
        aliases: ['metre', 'speed of light', 'c', '光速', 'length', '長度'],
        tags: ['ch1', 'units'],
        def:
          'The meter is the length of the path traveled by light in a vacuum during a time ' +
          'interval of <strong>1/299 792 458</strong> of a second.',
        notes: [
          'Reading it the other way round: the speed of light is exactly ' +
            '<span class="mono">c = 299 792 458 m/s</span>, by definition — it is no longer a ' +
            'measured value.',
          'This ties the meter to the second, so length is only as accurate as timekeeping — ' +
            'and atomic clocks are extremely accurate.',
          'Background: the meter was once a metal bar kept in Paris; the definition by light has ' +
            'been used since 1983.'
        ],
        defZh: '公尺是光在真空中於 1/299 792 458 秒內所走的路徑長度。',
        notesZh: [
          '倒過來看：光速<strong>依定義</strong>恰好是 c = 299 792 458 m/s，已經不是量出來的數值了。',
          '這把公尺綁在秒上，所以長度的精確度取決於計時 &mdash; 而原子鐘極為精確。',
          '背景：公尺以前是一根存放在巴黎的金屬棒；1983 年起改用光來定義。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>The meter is the length of the path traveled by light in a vacuum during a ' +
              'time interval of 1/299 792 458 of a second.</p>'
          },
          {
            label: 'Light in one nanosecond',
            html: '<p>299 792 458 m/s × 10<sup>&minus;9</sup> s ≈ 0.30 m &nbsp;(about 30 cm)</p>'
          }
        ]
      },

      /* ============================================ powers of ten */
      {
        id: 'e-notation',
        term: 'E notation (exponent of ten)',
        abbr: 'E',
        zh: 'E 表示法（10 的指數）',
        zhAlt: '科學記號',
        aliases: ['scientific notation', 'exponent', 'power of ten', '指數', '10 的次方'],
        tags: ['ch1', 'powers of ten'],
        def:
          'In a number like <span class="mono">3.0E8</span>, <strong>E</strong> means "times ten ' +
          'to the power": 3.0E8 = <span class="mono">3.0 × 10<sup>8</sup></span>. It is ' +
          'scientific notation written on one line, as calculators and computers show it.',
        notes: [
          'A negative exponent means a small number: 2.5E&minus;3 = 2.5 × 10<sup>&minus;3</sup> = 0.0025.',
          'In scientific notation the leading number is kept between 1 and 10: 4.2 × 10<sup>5</sup>, ' +
            'not 42 × 10<sup>4</sup>.',
          'The exponents are what the <a href="#si-prefix">prefixes</a> name: 10<sup>3</sup> is kilo, ' +
            '10<sup>&minus;6</sup> is micro.'
        ],
        defZh:
          '像 3.0E8 這樣的數字裡，<strong>E</strong> 代表「乘以 10 的幾次方」：3.0E8 = 3.0 × 10<sup>8</sup>。' +
          '它就是把科學記號寫成一行，計算機與電腦都這樣顯示。',
        notesZh: [
          '指數為負代表很小的數：2.5E&minus;3 = 2.5 × 10<sup>&minus;3</sup> = 0.0025。',
          '科學記號的前面那個數保持在 1 到 10 之間：寫 4.2 × 10<sup>5</sup>，不寫 42 × 10<sup>4</sup>。',
          '這些指數正是<a href="#si-prefix">詞頭</a>在命名的：10<sup>3</sup> 叫 kilo、10<sup>&minus;6</sup> 叫 micro。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>E: exponent of ten</p>' },
          {
            label: 'Reading E notation',
            html:
              '<p>6.02E23 = 6.02 × 10<sup>23</sup></p>' +
              '<p>1.6E&minus;19 = 1.6 × 10<sup>&minus;19</sup></p>'
          }
        ]
      },

      {
        id: 'si-prefix',
        term: 'Prefixes for powers of ten',
        zh: '十的次方詞頭',
        zhAlt: 'SI 詞頭',
        aliases: ['prefix', 'kilo', 'mega', 'giga', 'milli', 'micro', 'nano', 'pico', 'centi', '詞頭', '字首'],
        tags: ['ch1', 'powers of ten'],
        def:
          'Words attached to a unit that multiply it by a power of ten, so very large and very ' +
          'small values stay readable: <span class="mono">1 km = 10<sup>3</sup> m</span>, ' +
          '<span class="mono">1 ns = 10<sup>&minus;9</sup> s</span>.',
        notes: [
          'The notes paste the full table, from yocto (10<sup>&minus;24</sup>) to yotta (10<sup>24</sup>). ' +
            'The ones used daily are listed below.',
          'Capitals for the big ones from mega up (M, G, T), lower case for kilo and everything ' +
            'smaller (k, m, μ, n).',
          'Mind m vs. M: 1 mm is a millimeter, 1 Mm a megameter — a factor of 10<sup>9</sup> apart.',
          'μ (the Greek letter mu) is micro — often typed as "u" when μ is not available.'
        ],
        defZh:
          '加在單位前面、把它乘上 10 的某次方的字，讓極大與極小的數值好讀：1 km = 10<sup>3</sup> m、1 ns = 10<sup>&minus;9</sup> s。',
        notesZh: [
          '筆記貼了完整的表，從 yocto（10<sup>&minus;24</sup>）到 yotta（10<sup>24</sup>）。下面列的是日常最常用的。',
          'mega 以上用大寫（M、G、T），kilo 與更小的用小寫（k、m、μ、n）。',
          '注意 m 和 M：1 mm 是毫米，1 Mm 是百萬米 &mdash; 差了 10<sup>9</sup> 倍。',
          'μ（希臘字母 mu）是 micro，打不出 μ 時常寫成 u。'
        ],
        examples: [
          {
            label: 'The common ones (full table in the notes)',
            html:
              '<table><tr><th>Power</th><th>Prefix</th><th>Symbol</th>' +
              '<th>&nbsp;</th><th>Power</th><th>Prefix</th><th>Symbol</th></tr>' +
              '<tr><td>10<sup>12</sup></td><td>tera</td><td>T</td><td></td>' +
              '<td>10<sup>&minus;2</sup></td><td>centi</td><td>c</td></tr>' +
              '<tr><td>10<sup>9</sup></td><td>giga</td><td>G</td><td></td>' +
              '<td>10<sup>&minus;3</sup></td><td>milli</td><td>m</td></tr>' +
              '<tr><td>10<sup>6</sup></td><td>mega</td><td>M</td><td></td>' +
              '<td>10<sup>&minus;6</sup></td><td>micro</td><td>μ</td></tr>' +
              '<tr><td>10<sup>3</sup></td><td>kilo</td><td>k</td><td></td>' +
              '<td>10<sup>&minus;9</sup></td><td>nano</td><td>n</td></tr>' +
              '<tr><td></td><td></td><td></td><td></td>' +
              '<td>10<sup>&minus;12</sup></td><td>pico</td><td>p</td></tr></table>'
          },
          {
            label: 'Using them',
            html: '<p>4.7 kΩ = 4.7 × 10<sup>3</sup> Ω &nbsp;&nbsp; 250 μs = 2.5 × 10<sup>&minus;4</sup> s</p>'
          }
        ]
      },

      /* ============================================ conversion */
      {
        id: 'conversion-factor',
        term: 'Conversion factor',
        zh: '換算因子',
        zhAlt: '轉換因子',
        aliases: ['unit ratio', 'unity', 'ratio', '比值', '換算'],
        tags: ['ch1', 'conversion'],
        def:
          'A <strong>ratio of units that equals 1</strong>, such as ' +
          '<span class="mono">60 s / 1 min</span>. Because it equals 1, multiplying by it ' +
          'changes the units of a quantity without changing its size.',
        notes: [
          'Every equality between units gives two factors: 1 min = 60 s gives 60 s / 1 min ' +
            'and 1 min / 60 s. Pick the one that puts the unwanted unit in the denominator so it cancels.',
          'Stringing several together is <a href="#chain-link-conversion">chain-link conversion</a>.'
        ],
        defZh:
          '<strong>等於 1 的單位比值</strong>，例如 60 s / 1 min。因為它等於 1，乘上它只會改變單位、不改變量的大小。',
        notesZh: [
          '每一條單位等式都能給出兩個因子：1 min = 60 s 可得 60 s / 1 min 和 1 min / 60 s。挑那個能把不要的單位放在分母、讓它消掉的。',
          '把好幾個串在一起用，就是<a href="#chain-link-conversion">連鎖換算</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>conversion factor: a ratio of unit that is equal to unity &nbsp;&nbsp; 60 s / 1 min</p>'
          }
        ]
      },

      {
        id: 'chain-link-conversion',
        term: 'Chain-link conversion',
        zh: '連鎖換算',
        zhAlt: '鏈式換算',
        aliases: ['chain link', 'unit conversion', 'cancel units', '單位消去', '換算'],
        tags: ['ch1', 'conversion'],
        def:
          'Converting units by multiplying by one or more ' +
          '<a href="#conversion-factor">conversion factors</a> in a row, arranged so that each ' +
          'unwanted unit <strong>cancels</strong> against the next factor, like links in a chain, ' +
          'until only the wanted unit is left.',
        notes: [
          'Treat units like algebra: min on top and min underneath cancel, just as x/x = 1.',
          'If the units left at the end are not the ones you wanted, a factor was upside down.'
        ],
        defZh:
          '連續乘上一個或多個<a href="#conversion-factor">換算因子</a>來換單位，排成讓每個不要的單位都和下一個因子<strong>消掉</strong>，' +
          '像鏈條一環扣一環，最後只剩想要的單位。',
        notesZh: [
          '把單位當代數處理：分子的 min 和分母的 min 消掉，就像 x/x = 1。',
          '算到最後剩下的單位不是你要的，就代表有某個因子放反了。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>2 <del>min</del> × (60 s / 1 <del>min</del>) = 120 s</p>'
          },
          {
            label: 'Two links: 90 km/h in m/s',
            html:
              '<p>90 <del>km</del>/<del>h</del> × (1000 m / 1 <del>km</del>) × (1 <del>h</del> / 3600 s) = 25 m/s</p>'
          }
        ]
      },

      {
        id: 'conversion-of-systems',
        term: 'Conversion between unit systems',
        zh: '單位制換算',
        aliases: ['conversion of systems', 'imperial', 'us customary', 'mile', 'inch', 'foot', 'pound', 'ounce', 'slug', '英制', '英里', '英寸', '英尺', '磅'],
        tags: ['ch1', 'conversion'],
        def:
          'Converting between SI units and the US customary (British) units — miles, feet, ' +
          'inches, pounds — using fixed equalities such as <span class="mono">1 in. = 2.54 cm</span>.',
        notes: [
          'The notes (from the slide) give <strong>1 lb = 0.465 kg</strong>; the correct value is ' +
            '<strong>1 lb = 0.4536 kg</strong>.',
          '1 in. = 2.54 cm is exact by definition, and the other <em>length</em> entries follow ' +
            'from it (1 ft = 12 in. = 30.48 cm). The mass entries are defined separately: ' +
            '1 lb = 0.45359237 kg exactly.',
          'In physics texts the pound is usually a unit of <em>force</em> (1 lb = 4.448 N), and ' +
            'the <em>slug</em> is the matching unit of mass — which is why the slug appears in the ' +
            'table. "1 lb = 0.4536 kg" means the mass that weighs one pound on Earth.'
        ],
        defZh:
          '在 SI 單位與美國慣用（英制）單位 &mdash; 英里、英尺、英寸、磅 &mdash; 之間換算，用的是 1 in. = 2.54 cm 這類固定等式。',
        notesZh: [
          '筆記（投影片）寫 <strong>1 lb = 0.465 kg</strong>，正確值是 <strong>1 lb = 0.4536 kg</strong>。',
          '1 in. = 2.54 cm 是依定義的精確值，表中其他<em>長度</em>換算都由它推出（1 ft = 12 in. = 30.48 cm）；' +
            '質量那幾列是另外定義的：1 lb = 0.45359237 kg（精確值）。',
          '物理課本裡磅通常是<em>力</em>的單位（1 lb = 4.448 N），對應的質量單位是 slug &mdash; 所以表裡才會有 slug。' +
            '「1 lb = 0.4536 kg」指的是在地球上重一磅的那個質量。'
        ],
        examples: [
          {
            label: 'From the notes (lb corrected)',
            html:
              '<table>' +
              '<tr><td>1 mile = 1609 m = 1.609 km</td><td>1 ft = 0.3048 m = 30.48 cm</td></tr>' +
              '<tr><td>1 m = 39.37 in. = 3.281 ft</td><td>1 in. = 0.0254 m = 2.54 cm</td></tr>' +
              '<tr><td>1 lb = 0.4536 kg &nbsp;(notes: 0.465)</td><td>1 oz = 28.35 g</td></tr>' +
              '<tr><td>1 slug = 14.59 kg</td><td></td></tr>' +
              '<tr><td colspan="2">1 day = 24 h = 24 × 60 min = 24 × 60 × 60 s</td></tr></table>'
          },
          {
            label: 'Using the table',
            html: '<p>5 <del>mile</del> × (1.609 km / 1 <del>mile</del>) = 8.045 km</p>'
          }
        ]
      },

      /* ============================================ measurement */
      {
        id: 'significant-figure',
        term: 'Significant figure',
        zh: '有效數字',
        aliases: ['sig fig', 'sig figs', 'significant digits', 'precision', '精確度', '精密度'],
        tags: ['ch1', 'measurement'],
        def:
          'A digit in a number that carries <strong>meaningful information about the precision</strong> ' +
          'of the measurement — the digits that were actually measured, plus the last, estimated one.',
        notes: [
          'Counting rules: all non-zero digits count; zeros between them count (1.05 → 3); ' +
            'leading zeros do not (0.0042 → 2); trailing zeros after a decimal point do (2.50 → 3).',
          'Multiplying or dividing: keep as many significant figures as the <em>least</em> precise ' +
            'factor has.',
          'Adding or subtracting: keep as many decimal places as the number with the fewest.',
          'Scientific notation removes ambiguity: 1500 is unclear, but 1.50 × 10<sup>3</sup> has three.'
        ],
        defZh:
          '數字中對量測<strong>精確度帶有意義資訊</strong>的位數 &mdash; 真正量到的那幾位，再加上最後一位估計值。',
        notesZh: [
          '計算規則：非零數字都算；夾在中間的 0 算（1.05 → 3 位）；前導的 0 不算（0.0042 → 2 位）；小數點後尾端的 0 算（2.50 → 3 位）。',
          '乘除：結果保留的有效位數，和<em>最不精確</em>的那個因數一樣多。',
          '加減：結果保留的小數位數，和小數位最少的那個數一樣多。',
          '用科學記號就不會有歧義：1500 看不出幾位，1.50 × 10<sup>3</sup> 就是三位。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>significant figure: A digit in a number that carry meaningful information ' +
              'about the precision and resolution of measurement</p>'
          },
          {
            label: 'Counting and calculating',
            html:
              '<p>0.00340 &rarr; 3 significant figures</p>' +
              '<p>2.5 cm × 3.14 cm = 7.85 &rarr; 7.9 cm² &nbsp;(2 s.f., limited by 2.5)</p>' +
              '<p>12.1 + 0.32 = 12.42 &rarr; 12.4 &nbsp;(1 decimal place)</p>'
          }
        ]
      },

      {
        id: 'dimensional-analysis',
        term: 'Dimensional analysis',
        zh: '因次分析',
        aliases: ['dimension', 'dimensions', 'units check', '因次', '量綱'],
        tags: ['ch1', 'measurement'],
        added: true,
        def:
          'Checking an equation by comparing the <strong>dimensions</strong> — length L, mass M, ' +
          'time T — on its two sides. Both sides must match, and only quantities with the same ' +
          'dimensions can be added or subtracted.',
        notes: [
          'Why this is here: it is the same "units behave like algebra" idea as ' +
            '<a href="#chain-link-conversion">chain-link conversion</a>, and it is normally taught ' +
            'in the same first chapter.',
          'Matching dimensions do not prove an equation right, but mismatched ones prove it wrong.',
          'Pure numbers such as ½ or 2π have no dimensions, so this check cannot catch them.'
        ],
        defZh:
          '比較等號兩邊的<strong>因次</strong>（長度 L、質量 M、時間 T）來檢查方程式。兩邊必須一致，而且只有因次相同的量才能相加減。',
        notesZh: [
          '為什麼補這個：它和<a href="#chain-link-conversion">連鎖換算</a>一樣是「單位可以當代數算」的想法，通常也在同一個第一章教。',
          '因次相符不代表方程式一定對，但因次不符就一定錯。',
          '½、2π 這種純數沒有因次，所以這個方法抓不到它們。'
        ],
        examples: [
          {
            label: 'Checking x = ½at²',
            html:
              '<p>left: [x] = L</p>' +
              '<p>right: [a][t²] = (L/T²)(T²) = L &nbsp;&#10003;</p>'
          }
        ]
      },

      /* ============================================ ch2 — motion along a line */
      {
        id: 'kinematics',
        term: 'Kinematics',
        zh: '運動學',
        aliases: ['motion', 'mechanics', '力學', '運動'],
        tags: ['ch2.1', 'kinematics'],
        def:
          'The part of mechanics that <strong>describes</strong> motion — position, ' +
          '<a href="#displacement">displacement</a>, <a href="#average-velocity">velocity</a> and ' +
          '<a href="#average-acceleration">acceleration</a> — without asking what causes it.',
        notes: [
          'The notes give only the name (9/21, ch2.1); the definition is filled in here.',
          'The causes of motion — forces — come later, under <em>dynamics</em>.',
          'This chapter is motion along a straight line, so every direction is just a + or &minus; sign.'
        ],
        defZh:
          '力學中<strong>描述</strong>運動的部分 &mdash; 位置、<a href="#displacement">位移</a>、<a href="#average-velocity">速度</a>、<a href="#average-acceleration">加速度</a> &mdash; 不追問運動的原因。',
        notesZh: [
          '筆記只寫了名稱（9/21，ch2.1）；定義是這裡補上的。',
          '運動的原因 &mdash; 力 &mdash; 之後在<em>動力學</em>（dynamics）才講。',
          '這一章講直線運動，所以方向只用 + 或 &minus; 號表示。'
        ],
        examples: [{ label: 'From the notes', html: '<p>Kinematics 運動學</p>' }]
      },

      {
        id: 'distance',
        term: 'Distance',
        abbr: 'd',
        zh: '距離',
        zhAlt: '路程',
        aliases: ['path length', 'total distance', '路徑長', '路程'],
        tags: ['ch2.1', 'kinematics'],
        def:
          'The <strong>total length of the path travelled</strong>. It is a ' +
          '<a href="#vector-scalar-quantity">scalar</a>, measured in meters.',
        notes: [
          'It only ever adds up, so it is never negative and never decreases.',
          'Compare <a href="#displacement">displacement</a>, which only looks at where you started ' +
            'and ended.'
        ],
        defZh: '<strong>走過路徑的總長度</strong>。它是<a href="#vector-scalar-quantity">純量</a>，單位是公尺。',
        notesZh: [
          '它只會一直累加，所以不會是負的，也不會變小。',
          '對照<a href="#displacement">位移</a>：位移只看起點和終點。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Distance (d): total length of the path travelled; measured in meters; scalar</p>'
          },
          {
            label: 'Out and back',
            html: '<p>3 m east, then 3 m west: distance = 6 m, displacement = 0</p>'
          }
        ],
        figure: { caption: 'Distance follows the path; displacement is the straight arrow from start to end', svg: DISP_FIG }
      },

      {
        id: 'displacement',
        term: 'Displacement',
        abbr: 'Δx',
        zh: '位移',
        aliases: ['change in position', 'delta x', 'Δx', 'xf - xi', '位置變化'],
        tags: ['ch2.1', 'kinematics'],
        def:
          'The <strong>change in position</strong>, regardless of the path: ' +
          '<span class="mono">Δx = x<sub>f</sub> &minus; x<sub>i</sub></span> (final minus initial). ' +
          'It is a <a href="#vector-scalar-quantity">vector</a>, measured in meters.',
        notes: [
          'Along a line its sign is its direction: Δx &gt; 0 means it moved in the + direction.',
          'The size of the displacement is never more than the <a href="#distance">distance</a>, and ' +
            'equals it only for one-way straight-line motion.'
        ],
        defZh:
          '<strong>位置的改變</strong>，與路徑無關：Δx = x<sub>f</sub> &minus; x<sub>i</sub>（末減初）。它是<a href="#vector-scalar-quantity">向量</a>，單位是公尺。',
        notesZh: [
          '在直線上，它的正負號就是方向：Δx &gt; 0 表示往 + 方向移動。',
          '位移的大小不會超過<a href="#distance">距離</a>，只有單向直線運動時兩者相等。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Displacement (d&#8407;): change in position (Δx) regardless of path; Δx = x<sub>f</sub> &minus; x<sub>i</sub>; measured in meters; vector</p>'
          },
          { label: 'Sign gives direction', html: '<p>x<sub>i</sub> = 5 m, x<sub>f</sub> = 2 m &nbsp;&rarr;&nbsp; Δx = &minus;3 m (moved 3 m in the &minus; direction)</p>' }
        ],
        figure: { caption: 'Only the start and the end matter for displacement', svg: DISP_FIG }
      },

      {
        id: 'vector-scalar-quantity',
        term: 'Vector and scalar quantities',
        zh: '向量與純量',
        aliases: ['vector', 'scalar', 'magnitude', 'direction', '向量', '純量', '大小', '方向'],
        tags: ['ch2.1', 'kinematics'],
        def:
          'A <strong>vector</strong> quantity needs both <strong>magnitude</strong> (size or numerical ' +
          'value) and <strong>direction</strong> to describe it completely. A <strong>scalar</strong> ' +
          'quantity is completely described by magnitude only.',
        notes: [
          'In one dimension we use <strong>+ and &minus; signs</strong> to indicate a vector\'s direction.',
          'Vectors so far: <a href="#displacement">displacement</a>, velocity, acceleration. Scalars: ' +
            '<a href="#distance">distance</a>, speed, time, mass.'
        ],
        defZh:
          '<strong>向量</strong>要同時有<strong>大小</strong>（數值）和<strong>方向</strong>才能完整描述；<strong>純量</strong>只要大小就能完整描述。',
        notesZh: [
          '一維時用<strong>正負號</strong>表示向量的方向。',
          '目前的向量：<a href="#displacement">位移</a>、速度、加速度。純量：<a href="#distance">距離</a>、速率、時間、質量。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Vector quantities need both magnitude (size or numerical value) and direction to completely describe them</p>' +
              '<p>Will use + and &minus; signs to indicate vector directions</p>' +
              '<p>Scalar quantities are completely described by magnitude only</p>'
          }
        ]
      },

      {
        id: 'average-velocity',
        term: 'Average velocity',
        abbr: 'v<sub>avg</sub>',
        zh: '平均速度',
        aliases: ['average velocity', 'vavg', 'slope of secant', '割線斜率'],
        tags: ['ch2.1', 'kinematics'],
        def:
          '<span class="mono">v<sub>avg</sub> = displacement / elapsed time = (x&#8322; &minus; x&#8321;) / (t&#8322; &minus; t&#8321;) = Δx / Δt</span>. ' +
          'SI unit: m/s.',
        notes: [
          'On an x&ndash;t graph it is the <strong>slope</strong> of the straight line joining the two ' +
            'points (x&#8321;, t&#8321;) and (x&#8322;, t&#8322;): up to the right means positive, down means negative.',
          'It is a vector with the same sign as Δx, because Δt is always positive.',
          'Do not confuse it with <a href="#average-speed">average speed</a>.'
        ],
        defZh:
          'v<sub>avg</sub> = 位移 / 經過時間 = (x&#8322; &minus; x&#8321;) / (t&#8322; &minus; t&#8321;) = Δx / Δt。SI 單位 m/s。',
        notesZh: [
          '在 x&ndash;t 圖上，它是連接兩點的直線的<strong>斜率</strong>：往右上為正、往右下為負。',
          '它是向量，正負號和 Δx 相同，因為 Δt 永遠是正的。',
          '別和<a href="#average-speed">平均速率</a>搞混。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Average velocity = Displacement / Elapsed time = (x&#8322; &minus; x&#8321;) / (t&#8322; &minus; t&#8321;), SI unit: m/s</p>' +
              '<p>On a graph of x versus t, v<sub>avg</sub> is the slope of the straight line that connects two particular points on the x(t) curve</p>'
          },
          { label: 'Computing one', html: '<p>x: 2 m &rarr; 14 m while t: 1 s &rarr; 5 s &nbsp;&rArr;&nbsp; v<sub>avg</sub> = 12 / 4 = 3 m/s</p>' }
        ],
        figure: { caption: 'v_avg is the slope of the secant through A and B', svg: XT_FIG }
      },

      {
        id: 'average-speed',
        term: 'Average speed',
        abbr: 's<sub>avg</sub>',
        zh: '平均速率',
        aliases: ['average speed', 'savg', 'speed'],
        tags: ['ch2.1', 'kinematics'],
        def:
          '<span class="mono">s<sub>avg</sub> = total distance / elapsed time</span>. SI unit: m/s. ' +
          'A scalar — no direction.',
        notes: [
          'It is <strong>not</strong> the magnitude of the <a href="#average-velocity">average ' +
            'velocity</a> (the notes stress this too): it uses the whole <a href="#distance">distance</a>, ' +
            'not the displacement.',
          'For one-way straight-line motion the two agree in size.'
        ],
        defZh: 's<sub>avg</sub> = 總距離 / 經過時間。SI 單位 m/s。它是純量，沒有方向。',
        notesZh: [
          '它<strong>不是</strong><a href="#average-velocity">平均速度</a>的大小（筆記也特別強調）：它用的是整段<a href="#distance">距離</a>，不是位移。',
          '單向直線運動時，兩者大小才相同。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Average speed: Distance / elapsed time = l / Δt, unit: m/s</p>' },
          { label: 'Round trip', html: '<p>6 m out and back in 3 s: average speed 2 m/s, average velocity 0</p>' }
        ]
      },

      {
        id: 'instantaneous-velocity',
        term: 'Instantaneous velocity',
        abbr: 'v = dx/dt',
        zh: '瞬時速度',
        aliases: ['velocity', 'dx/dt', 'slope of tangent', '切線斜率', '速度'],
        tags: ['ch2.2', 'kinematics'],
        def:
          'How fast something moves and in which direction <strong>at one instant</strong>: ' +
          '<span class="mono">v = lim<sub>Δt&rarr;0</sub> Δx / Δt = dx / dt</span>.',
        notes: [
          'On an x&ndash;t graph it is the <strong>slope of the tangent</strong> line at that moment. As ' +
            'Δt shrinks, the secant lines (whose slopes are <a href="#average-velocity">average velocities</a>) ' +
            'close in on the tangent — the notes\' blue lines approaching the green one.',
          'This is the derivative of position with respect to time — the same limit as in calculus.',
          'Its magnitude is the <a href="#speed">speed</a>.'
        ],
        defZh:
          '<strong>某一瞬間</strong>移動有多快、往哪個方向：v = lim<sub>Δt&rarr;0</sub> Δx / Δt = dx / dt。',
        notesZh: [
          '在 x&ndash;t 圖上，它是該時刻<strong>切線的斜率</strong>。Δt 越小，割線（斜率是<a href="#average-velocity">平均速度</a>）就越貼近切線 &mdash; 就是筆記裡藍線逼近綠線的圖。',
          '它就是位置對時間的導數 &mdash; 和微積分裡的極限是同一件事。',
          '它的大小就是<a href="#speed">速率</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>The instantaneous velocity indicates how fast the car moves and the direction of motion at each instant of time.</p>' +
              '<p>v = lim<sub>Δt&rarr;0</sub> Δx/Δt = dx/dt</p>' +
              '<p>The instantaneous velocity is the slope of the line tangent to the x vs. t curve</p>'
          },
          { label: 'From a formula', html: '<p>x(t) = 3t² m &nbsp;&rArr;&nbsp; v = dx/dt = 6t; at t = 2 s, v = 12 m/s</p>' }
        ],
        figure: { caption: 'v is the slope of the tangent at A; the secants approach it as Δt → 0', svg: XT_FIG }
      },

      {
        id: 'speed',
        term: 'Speed (instantaneous)',
        abbr: '|v|',
        zh: '速率',
        zhAlt: '瞬時速率',
        aliases: ['instantaneous speed', 'speed', '瞬時速率'],
        tags: ['ch2.2', 'kinematics'],
        def:
          'The <strong>magnitude</strong> of the <a href="#instantaneous-velocity">instantaneous ' +
          'velocity</a> — how fast, with the direction dropped. A scalar, never negative.',
        notes: [
          'v = &minus;5 m/s and v = +5 m/s both have speed 5 m/s.',
          'Instantaneous speed is the size of instantaneous velocity, but <a href="#average-speed">average ' +
            'speed</a> is not the size of average velocity — the notes flag this difference.'
        ],
        defZh: '<a href="#instantaneous-velocity">瞬時速度</a>的<strong>大小</strong> &mdash; 只看多快、不管方向。是純量，不會是負的。',
        notesZh: [
          'v = &minus;5 m/s 和 v = +5 m/s 的速率都是 5 m/s。',
          '瞬時速率是瞬時速度的大小，但<a href="#average-speed">平均速率</a>不是平均速度的大小 &mdash; 筆記特別標出這個差別。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>The speed is the magnitude of the instantaneous velocity</p>' +
              '<p>Remember that the average speed is <u>not</u> the magnitude of the average velocity.</p>'
          }
        ]
      },

      {
        id: 'average-acceleration',
        term: 'Average acceleration',
        abbr: 'a<sub>avg</sub>',
        zh: '平均加速度',
        aliases: ['acceleration', 'aavg', 'Δv/Δt', '加速度'],
        tags: ['ch2.3', 'kinematics'],
        def:
          'The change in velocity divided by the time it took: ' +
          '<span class="mono">a<sub>avg</sub> = (v&#8322; &minus; v&#8321;) / (t&#8322; &minus; t&#8321;) = Δv / Δt</span>. ' +
          'SI unit: m/s².',
        notes: [
          'A particle whose velocity changes is said to <strong>accelerate</strong>.',
          'm/s² reads as "meters per second, per second": how many m/s the velocity gains each second.',
          'It is a vector: along a line, its sign is its direction.'
        ],
        defZh: '速度的變化量除以經過的時間：a<sub>avg</sub> = (v&#8322; &minus; v&#8321;) / (t&#8322; &minus; t&#8321;) = Δv / Δt。SI 單位 m/s²。',
        notesZh: [
          '速度有改變的質點，就說它在<strong>加速</strong>。',
          'm/s² 讀作「每秒每秒幾公尺」：每過一秒，速度增加幾 m/s。',
          '它是向量；在直線上，正負號就是方向。'
        ],
        examples: [
          {
            label: 'From the notes (textbook, Eq. 2-7)',
            html: '<p>a<sub>avg</sub> = (v&#8322; &minus; v&#8321;) / (t&#8322; &minus; t&#8321;) = Δv / Δt</p>'
          },
          { label: 'Computing one', html: '<p>0 &rarr; 27 m/s in 9 s &nbsp;&rArr;&nbsp; a<sub>avg</sub> = 3 m/s²</p>' }
        ]
      },

      {
        id: 'instantaneous-acceleration',
        term: 'Instantaneous acceleration',
        abbr: 'a = dv/dt',
        zh: '瞬時加速度',
        aliases: ['acceleration', 'dv/dt', 'second derivative', 'd2x/dt2', '二階導數'],
        tags: ['ch2.3', 'kinematics'],
        def:
          'The rate at which velocity is changing at one instant: ' +
          '<span class="mono">a = dv / dt = d²x / dt²</span>. Usually just called "acceleration".',
        notes: [
          'Graphically it is the slope of the v&ndash;t curve at that point.',
          'Since v = dx/dt, acceleration is the <strong>second derivative</strong> of position.'
        ],
        defZh: '某一瞬間速度改變的快慢：a = dv / dt = d²x / dt²。通常直接叫「加速度」。',
        notesZh: [
          '在圖上，它是 v&ndash;t 曲線在該點的斜率。',
          '因為 v = dx/dt，加速度就是位置的<strong>二階導數</strong>。'
        ],
        examples: [
          {
            label: 'From the notes (textbook, Eq. 2-8, 2-9)',
            html:
              '<p>a = dv/dt</p>' +
              '<p>a = dv/dt = d/dt (dx/dt) = d²x/dt² — the second derivative of its position x(t)</p>'
          },
          { label: 'From a formula', html: '<p>x(t) = 3t² &nbsp;&rArr;&nbsp; v = 6t &nbsp;&rArr;&nbsp; a = 6 m/s² (constant)</p>' }
        ]
      },

      {
        id: 'speeding-up-slowing-down',
        term: 'Speeding up or slowing down',
        zh: '加速或減速的判斷',
        aliases: ['deceleration', 'slowing down', 'speeding up', 'sign of acceleration', '減速', '正負號'],
        tags: ['ch2.3', 'kinematics'],
        def:
          'Compare the signs of velocity and acceleration: if they are the <strong>same</strong>, the ' +
          'speed increases; if they are <strong>opposite</strong>, the speed decreases.',
        notes: [
          'A negative acceleration alone does not mean slowing down: v = &minus;4 m/s with ' +
            'a = &minus;2 m/s² is speeding up (in the &minus; direction).',
          '"Deceleration" in everyday speech means slowing down, i.e. a opposite to v.'
        ],
        defZh: '比較速度與加速度的正負號：<strong>同號</strong>，速率增加；<strong>異號</strong>，速率減少。',
        notesZh: [
          '加速度是負的不代表在減速：v = &minus;4 m/s、a = &minus;2 m/s² 其實是在（往 &minus; 方向）加快。',
          '日常說的「減速」（deceleration）指的是 a 和 v 方向相反。'
        ],
        examples: [
          {
            label: 'From the notes (textbook tip)',
            html:
              '<p>If the signs of the velocity and acceleration of a particle are the same, the speed of ' +
              'the particle increases. If the signs are opposite, the speed decreases.</p>'
          },
          {
            label: 'Four cases',
            html:
              '<table><tr><th>v</th><th>a</th><th>speed</th></tr>' +
              '<tr><td>+</td><td>+</td><td>increases</td></tr><tr><td>&minus;</td><td>&minus;</td><td>increases</td></tr>' +
              '<tr><td>+</td><td>&minus;</td><td>decreases</td></tr><tr><td>&minus;</td><td>+</td><td>decreases</td></tr></table>'
          }
        ]
      },

      {
        id: 'g-unit',
        term: 'g unit (and the sensation of acceleration)',
        abbr: 'g',
        zh: 'g 單位（加速度的感覺）',
        zhAlt: 'G 力',
        aliases: ['g', 'G force', 'g-force', '9.8', 'gravity', 'sensation', '重力加速度', '感覺'],
        tags: ['ch2.3', 'kinematics'],
        def:
          'A unit that measures acceleration relative to Earth\'s gravity: ' +
          '<span class="mono">1g = 9.8 m/s²</span>. "Pulling 3g" means an acceleration of about 29 m/s².',
        notes: [
          'Sensation: your body reacts to acceleration — it is an accelerometer, not a speedometer. ' +
            'The notes say it reacts "when acceleration changes"; more precisely it reacts to the ' +
            'acceleration itself, whenever there is one, and feels nothing at constant velocity ' +
            '(a smooth airliner cruising at 250 m/s).',
          'That felt push is what is called the <strong>G force</strong>.',
          '9.8 m/s² is the free-fall acceleration g near Earth\'s surface.'
        ],
        defZh: '以地球重力加速度為基準來量加速度的單位：1g = 9.8 m/s²。「承受 3g」就是約 29 m/s² 的加速度。',
        notesZh: [
          '感覺：身體會對加速度起反應 &mdash; 它是加速度計，不是速度計。筆記寫「加速度改變時」身體才有反應；' +
            '更精確地說，只要有加速度就會感覺到，等速時完全沒感覺（例如平穩巡航、時速九百公里的客機）。',
          '這種感覺到的推力就叫 <strong>G 力</strong>。',
          '9.8 m/s² 就是地表附近的自由落體加速度 g。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Sensation: Body reacts when acceleration changes &rArr; resulting in G force</p>' +
              '<p>G unit: Measures acceleration relative to Earth\'s gravity. 1g = 9.8 m/s²</p>'
          },
          { label: 'Converting', html: '<p>49 m/s² &divide; 9.8 m/s² = 5g</p>' }
        ]
      }
    ]
  });
})();
