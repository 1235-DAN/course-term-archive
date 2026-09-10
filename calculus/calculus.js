/* ==========================================================================
   data/calculus.js — 微積分 term data
   Source notes: 微積分9_8.pdf  (9/8, ch 1.1 Functions)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.
   ========================================================================== */

(function () {
  GLOSSARY.register({
    id: 'calculus',
    name: 'Calculus',
    nameZh: '微積分',
    page: 'calculus/calculus.html', // relative to index.html
    hue: 24, // warm amber
    // every source PDF sits in this same folder; the footer links to each one
    sources: [{ file: '微積分9_8.pdf', label: '微積分9_8.pdf（9/8 ch1.1）' }],
    blurb: '函數的基本語言：定義域與值域、取整函數、奇偶性、以及常見的函數家族。',

    terms: [
      /* ------------------------------------------------ core definition */
      {
        id: 'function',
        term: 'Function',
        zh: '函數',
        aliases: ['f(x)', 'mapping', '對應'],
        tags: ['9/8 ch1.1', 'basics'],
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
        tags: ['9/8 ch1.1', 'basics'],
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
        tags: ['9/8 ch1.1', 'basics'],
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
        tags: ['9/8 ch1.1', 'basics'],
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
        aliases: ['argument', '應變數'],
        tags: ['9/8 ch1.1', 'basics'],
        added: true,
        def:
          'In <span class="mono">y = f(x)</span>, <span class="mono">x</span> is the ' +
          '<strong>independent</strong> variable (the one you choose) and ' +
          '<span class="mono">y</span> is the <strong>dependent</strong> variable ' +
          '(the one that follows).',
        notes: [
          'The independent variable lives in the domain and the dependent one in the ' +
            'range — the two pairs of words describe the same thing from different angles.'
        ],
        defZh: '在 y = f(x) 中，x 是自變數（你可以自由選），y 是因變數（隨 x 而定）。',
        notesZh: [
          '自變數住在定義域，因變數住在值域 — 這兩組詞其實在講同一件事的兩個角度。'
        ]
      },

      {
        id: 'graph-of-a-function',
        term: 'Graph of a function',
        zh: '函數圖形',
        aliases: ['vertical line test', '垂線檢驗'],
        tags: ['9/8 ch1.1', 'basics'],
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
        tags: ['9/8 ch1.1', 'special functions'],
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
        tags: ['9/8 ch1.1', 'special functions'],
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
        tags: ['9/8 ch1.1', 'behaviour'],
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
        id: 'even-function',
        term: 'Even function',
        zh: '偶函數',
        aliases: ['symmetry', '對稱', 'y軸對稱'],
        tags: ['9/8 ch1.1', 'symmetry'],
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
        tags: ['9/8 ch1.1', 'symmetry'],
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

      /* ------------------------------------------------ families */
      {
        id: 'power-function',
        term: 'Power function',
        zh: '冪函數',
        aliases: ['x^a', 'exponent', '次方'],
        tags: ['9/8 ch1.1', 'families'],
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
        tags: ['9/8 ch1.1', 'families'],
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
        tags: ['9/8 ch1.1', 'families'],
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
        id: 'piecewise-function',
        term: 'Piecewise-defined function',
        zh: '分段函數',
        aliases: ['piecewise', '分段定義'],
        tags: ['9/8 ch1.1', 'families'],
        added: true,
        def: 'A function defined by different formulas on different parts of its domain.',
        notes: [
          'Why this is here: the <a href="#floor-function">floor</a> and ceiling functions ' +
            'and the absolute value are all piecewise, so the name is worth having first.'
        ],
        defZh: '在定義域的不同區段上用不同公式定義的函數。',
        notesZh: [
          '為什麼補這個：<a href="#floor-function">取整函數</a>與絕對值都是分段函數，先有這個名字後面才好講。'
        ],
        examples: [
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
        ]
      },

      {
        id: 'polynomial-function',
        term: 'Polynomial function',
        zh: '多項式函數',
        aliases: ['degree', '次數', 'polynomial'],
        tags: ['9/8 ch1.1', 'families'],
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
        tags: ['9/8 ch1.1', 'families'],
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
        aliases: ['composition', 'f of g', '複合函數'],
        tags: ['9/8 ch1.1', 'operations'],
        added: true,
        def:
          '<span class="mono">(f &compfn; g)(x) = f(g(x))</span> — feed x into g, then feed the ' +
          'result into f. It is defined only where g(x) lands inside the domain of f.',
        notes: ['Order matters: in general f &compfn; g &ne; g &compfn; f.'],
        defZh:
          '(f &compfn; g)(x) = f(g(x))：先丟進 g，再把結果丟進 f。' +
          '只有當 g(x) 落在 f 的定義域內時才有定義。',
        notesZh: ['順序有差：一般來說 f &compfn; g &ne; g &compfn; f。'],
        examples: [
          {
            label: 'Order is not interchangeable',
            html:
              '<p>f(x) = x², g(x) = x + 1</p>' +
              '<p>(f &compfn; g)(x) = (x + 1)²</p>' +
              '<p>(g &compfn; f)(x) = x² + 1 &nbsp;&larr;&nbsp; different</p>'
          }
        ]
      }
    ]
  });
})();
