/* ==========================================================================
   physics.js — 普通物理 term data
   Source notes: 普物9_11.pdf  (units and measurement)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.

   The notes carry no chapter heading. Units and measurement are chapter 1 of
   every general-physics text, so these terms are tagged ch1.
   ========================================================================== */

(function () {
  GLOSSARY.register({
    id: 'physics',
    name: 'General Physics',
    nameZh: '普通物理',
    page: 'physics/physics.html', // relative to index.html
    hue: 190, // teal
    // every source PDF sits in this same folder; the footer links to each one
    sources: [{ file: '普物9_11.pdf', label: '普物9_11.pdf（ch1）' }],
    blurb: '物理的量測語言：SI 單位與詞頭、科學記號、單位換算，以及公尺的定義與有效數字。',

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
          '1 in. = 2.54 cm is exact by definition; everything else in the table follows from it.',
          'Strictly, the pound is a unit of force and the <em>slug</em> the matching unit of mass — ' +
            'which is why the slug appears in the table.'
        ],
        defZh:
          '在 SI 單位與美國慣用（英制）單位 &mdash; 英里、英尺、英寸、磅 &mdash; 之間換算，用的是 1 in. = 2.54 cm 這類固定等式。',
        notesZh: [
          '筆記（投影片）寫 <strong>1 lb = 0.465 kg</strong>，正確值是 <strong>1 lb = 0.4536 kg</strong>。',
          '1 in. = 2.54 cm 是依定義的精確值，表中其他數值都由它推出。',
          '嚴格說磅是力的單位，對應的質量單位是 slug &mdash; 所以表裡才會有 slug。'
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
      }
    ]
  });
})();
