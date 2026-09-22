/* ==========================================================================
   computer-science.js — 計算機概論 term data
   Source notes: 計算機概論9_10.pdf   (ch 1.1)
                 計算機概論9_10-2.pdf (the same page, extended: ALU, I/O, sequential execution)
                 計算機概論9_15.pdf   (ch1.2 program, ch1.3 components, ch2.2 number systems)
                 計算機概論9_17.pdf   (ch2.2 reals, max/min, binary)
                 計算機概論9_22.pdf   (no chapter number: hex, octal, conversion, number of digits — ch2.2)

   The card face is ENGLISH ONLY: term / def / notes / example labels /
   figure captions. Everything Chinese — zh, zhAlt, defZh, notesZh — is
   rendered inside the collapsed 中文翻譯 dropdown.

   Terms flagged `added: true` were NOT in the handwritten notes; they fill
   gaps so each entry stands on its own.

   The notes paste two textbook figures (the Turing model and Figure 1.5,
   the von Neumann model). The diagrams below are fresh drawings of the same
   standard architecture, not copies of those figures.
   ========================================================================== */

(function () {
  /* arrowheads are drawn as polygons rather than <marker>s, because the same
     figure appears on several cards and marker ids would collide */
  function arrowR(x, y) {
    return '<polygon points="' + x + ',' + y + ' ' + (x - 8) + ',' + (y - 4.5) + ' ' +
      (x - 8) + ',' + (y + 4.5) + '"/>';
  }
  function arrowD(x, y) {
    return '<polygon points="' + x + ',' + y + ' ' + (x - 4.5) + ',' + (y - 8) + ' ' +
      (x + 4.5) + ',' + (y - 8) + '"/>';
  }

  /* one box of the diagram, lit up in the accent when it is the subject */
  function box(x, y, w, h, label, lit, sub) {
    var fill = lit ? 'var(--accent-soft)' : 'none';
    var stroke = lit ? 'var(--accent)' : 'currentColor';
    var sw = lit ? 2.2 : 1.3;
    var tc = lit ? 'var(--accent)' : 'currentColor';
    var fw = lit ? '700' : '400';
    var cy = sub ? y + h / 2 - 3 : y + h / 2 + 4;
    return (
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" ' +
      'fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '"' +
      (lit ? '' : ' opacity=".85"') + '/>' +
      '<text x="' + (x + w / 2) + '" y="' + cy + '" text-anchor="middle" fill="' + tc + '" ' +
      'font-weight="' + fw + '">' + label + '</text>' +
      (sub
        ? '<text x="' + (x + w / 2) + '" y="' + (cy + 15) + '" text-anchor="middle" ' +
          'font-size="9.5" fill="' + tc + '" opacity=".85">' + sub + '</text>'
        : '')
    );
  }

  /* The von Neumann machine. `lit` names the part(s) to highlight:
     'all' | 'memory' | 'alu' | 'cu' | 'io' | 'cpu' */
  function vn(lit) {
    var all = lit === 'all';
    var on = function (k) {
      return all || lit === k || (lit === 'cpu' && (k === 'alu' || k === 'cu'));
    };
    return (
      '<svg viewBox="0 0 370 172" role="img" aria-label="the von Neumann model">' +
      '<g font-family="sans-serif" font-size="11">' +
      /* the machine */
      '<rect x="78" y="18" width="214" height="144" rx="7" fill="none" ' +
      'stroke="currentColor" stroke-width="1.2" opacity=".5"/>' +
      '<text x="82" y="13" fill="currentColor" opacity=".8">Computer</text>' +
      (lit === 'cpu'
        ? '<rect x="88" y="60" width="102" height="94" rx="6" fill="none" ' +
          'stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4"/>' +
          '<text x="139" y="171" text-anchor="middle" fill="var(--accent)" ' +
          'font-weight="700" font-size="10">CPU</text>'
        : '') +
      /* buses */
      '<g stroke="currentColor" stroke-width="4" opacity=".45">' +
      '<path d="M180 81 H198"/><path d="M180 128 H198"/>' +
      '<path d="M139 98 V110"/><path d="M237 54 V64"/><path d="M139 54 V64"/></g>' +
      box(86, 28, 198, 26, 'Input / output', on('io')) +
      box(96, 64, 84, 34, 'ALU', on('alu')) +
      box(96, 110, 84, 36, 'Control unit', on('cu')) +
      box(198, 64, 78, 82, 'Memory', on('memory'), 'program + data') +
      /* data in and out */
      '<g stroke="currentColor" stroke-width="1.4"><path d="M6 41 H78"/><path d="M292 41 H358"/></g>' +
      '<g fill="currentColor">' + arrowR(86, 41) + arrowR(366, 41) + '</g>' +
      '<text x="40" y="33" text-anchor="middle" fill="currentColor" font-size="10">Input data</text>' +
      '<text x="330" y="33" text-anchor="middle" fill="currentColor" font-size="10">Output data</text>' +
      '</g></svg>'
    );
  }

  var TURING =
    '<svg viewBox="0 0 360 128" role="img" aria-label="the Turing model">' +
    '<g font-family="sans-serif" font-size="11">' +
    '<rect x="135" y="8" width="90" height="28" rx="4" fill="var(--accent-soft)" ' +
    'stroke="var(--accent)" stroke-width="2"/>' +
    '<text x="180" y="26" text-anchor="middle" fill="var(--accent)" font-weight="700">Program</text>' +
    '<path d="M180 36 V54" stroke="var(--accent)" stroke-width="2"/>' +
    '<g fill="var(--accent)">' + arrowD(180, 62) + '</g>' +
    '<rect x="118" y="62" width="124" height="36" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
    '<text x="180" y="84" text-anchor="middle" fill="currentColor">Computer</text>' +
    '<g stroke="currentColor" stroke-width="1.4"><path d="M12 80 H110"/><path d="M242 80 H340"/></g>' +
    '<g fill="currentColor">' + arrowR(118, 80) + arrowR(348, 80) + '</g>' +
    '<text x="62" y="72" text-anchor="middle" fill="currentColor" font-size="10">Input data</text>' +
    '<text x="296" y="72" text-anchor="middle" fill="currentColor" font-size="10">Output data</text>' +
    '<text x="180" y="120" text-anchor="middle" fill="currentColor" font-size="10" opacity=".75">' +
    'the program is supplied from outside — only data passes through</text>' +
    '</g></svg>';

  /* The two comparison tables asked for: k digits → largest value (b^k − 1),
     and a value N → digits needed (⌊log_b N⌋ + 1), in the four bases. */
  var DIGITS_MAX_TABLE =
    '<table><tr><th>digits k</th><th>binary 2<sup>k</sup>&minus;1</th><th>octal 8<sup>k</sup>&minus;1</th>' +
    '<th>decimal 10<sup>k</sup>&minus;1</th><th>hex 16<sup>k</sup>&minus;1</th></tr>' +
    '<tr><td>1</td><td>1</td><td>7</td><td>9</td><td>15</td></tr>' +
    '<tr><td>2</td><td>3</td><td>63</td><td>99</td><td>255</td></tr>' +
    '<tr><td>3</td><td>7</td><td>511</td><td>999</td><td>4 095</td></tr>' +
    '<tr><td>4</td><td>15</td><td>4 095</td><td>9 999</td><td>65 535</td></tr>' +
    '<tr><td>5</td><td>31</td><td>32 767</td><td>99 999</td><td>1 048 575</td></tr></table>' +
    '<p>signed: N<sub>min</sub> = &minus;N<sub>max</sub>, e.g. 3 decimal digits &rarr; &minus;999 … +999</p>';

  var NUM_DIGITS_TABLE =
    '<table><tr><th>value N</th><th>binary</th><th>octal</th><th>decimal</th><th>hex</th></tr>' +
    '<tr><td>7</td><td>3 (111)</td><td>1 (7)</td><td>1</td><td>1 (7)</td></tr>' +
    '<tr><td>8</td><td>4 (1000)</td><td>2 (10)</td><td>1</td><td>1 (8)</td></tr>' +
    '<tr><td>100</td><td>7 (1100100)</td><td>3 (144)</td><td>3</td><td>2 (64)</td></tr>' +
    '<tr><td>234</td><td>8 (11101010)</td><td>3 (352)</td><td>3</td><td>2 (EA)</td></tr>' +
    '<tr><td>255</td><td>8 (11111111)</td><td>3 (377)</td><td>3</td><td>2 (FF)</td></tr>' +
    '<tr><td>256</td><td>9 (100000000)</td><td>3 (400)</td><td>3</td><td>3 (100)</td></tr></table>';

  GLOSSARY.register({
    id: 'computer-science',
    name: 'Introduction to Computer Science',
    nameZh: '計算機概論',
    page: 'computer-science/computer-science.html', // relative to index.html
    hue: 290, // violet
    // every source PDF sits in this same folder; the footer links to each one
    sources: [
      { file: '計算機概論9_10.pdf', label: '計算機概論9_10.pdf（ch1.1）' },
      { file: '計算機概論9_10-2.pdf', label: '計算機概論9_10-2.pdf（ch1.1，補充版）' },
      { file: '計算機概論9_15.pdf', label: '計算機概論9_15.pdf（ch1.2、ch1.3、ch2.2）' },
      { file: '計算機概論9_17.pdf', label: '計算機概論9_17.pdf（ch2.2）' },
      { file: '計算機概論9_22.pdf', label: '計算機概論9_22.pdf（ch2.2）' }
    ],
    blurb:
      '電腦的兩種基本模型 — 圖靈模型與馮紐曼模型、馮紐曼電腦裡的四個子系統、程式如何逐條執行、' +
      '電腦的組成（硬體與資料），位值進位制（十、二、八、十六進位）、進位轉換與位數。',

    terms: [
      /* ============================================ models */
      {
        id: 'turing-model',
        term: 'Turing model',
        zh: '圖靈模型',
        aliases: ['turing', 'alan turing', 'programmable data processor', '圖靈機'],
        tags: ['ch1.1', 'models'],
        def:
          'A model of the computer as a <strong>programmable data processor</strong>: input ' +
          'data goes in, output data comes out, and a <strong>program</strong> supplied from ' +
          'outside tells the machine what processing to do. The same machine does different ' +
          'jobs when it is given different programs.',
        notes: [
          'The weakness the notes point out: <em>only the data</em> is kept in memory. To get a ' +
            'different kind of output you have to change the program from outside — contrast ' +
            'the <a href="#von-neumann-model">von Neumann model</a>.',
          'Background: Alan Turing described the idea in 1936. Its theoretical form, the ' +
            'universal Turing machine, is a single machine that can carry out any computation ' +
            'if given the right program.'
        ],
        defZh:
          '把電腦看成一台<strong>可程式化的資料處理器</strong>：輸入資料進去、輸出資料出來，' +
          '而由外部提供的<strong>程式</strong>決定要做什麼處理。同一台機器換上不同程式，就做不同的事。',
        notesZh: [
          '筆記點出的缺點：記憶體裡<em>只存資料</em>，想要不同種類的輸出，就得從外部更換程式 &mdash; ' +
            '對照<a href="#von-neumann-model">馮紐曼模型</a>。',
          '背景：Alan Turing 在 1936 年提出這個想法。它的理論形式「通用圖靈機」是一台只要給對程式、' +
            '就能執行任何計算的單一機器。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>vs. Turing Model: Only data is stored in memory, but you should change ' +
              'programs if you want different output.</p>'
          },
          {
            label: 'Same data, different program',
            html:
              '<p>input 3, 5 + program "add" &rarr; output 8</p>' +
              '<p>input 3, 5 + program "multiply" &rarr; output 15</p>'
          }
        ],
        figure: { caption: 'Input → computer → output, with the program fed in from above', svg: TURING }
      },

      {
        id: 'von-neumann-model',
        term: 'Von Neumann model',
        zh: '馮紐曼模型',
        zhAlt: '范紐曼模型',
        aliases: ['von neumann', 'neumann', 'stored program', '馮諾伊曼', '四個子系統'],
        tags: ['ch1.1', 'models'],
        def:
          'A computer design in which the <strong>program and the data are stored in the same ' +
          'memory</strong>. The machine is split into four subsystems — ' +
          '<a href="#memory">memory</a>, the <a href="#alu">arithmetic logic unit</a>, the ' +
          '<a href="#control-unit">control unit</a> and <a href="#io-subsystem">input/output</a> ' +
          '— and almost every computer built since follows it.',
        notes: [
          'Because the program is just more contents of memory, switching to a different task ' +
            'only means loading a different program: no rewiring, nothing swapped in from ' +
            'outside. That idea has its own name, the ' +
            '<a href="#stored-program-concept">stored-program concept</a>.',
          'Instructions are fetched from memory and executed one after another — ' +
            '<a href="#sequential-execution">sequential execution</a>.',
          'Background: proposed by John von Neumann around 1944–45.'
        ],
        defZh:
          '一種電腦設計：<strong>程式和資料存放在同一個記憶體裡</strong>。機器分成四個子系統 &mdash; ' +
          '<a href="#memory">記憶體</a>、<a href="#alu">算術邏輯單元</a>、<a href="#control-unit">控制單元</a>、' +
          '<a href="#io-subsystem">輸入／輸出</a> &mdash; 之後幾乎所有電腦都照這個架構。',
        notesZh: [
          '因為程式本身也只是記憶體裡的內容，要換工作只要載入另一個程式：不必重新接線、也不必從外部更換。' +
            '這個想法有自己的名字：<a href="#stored-program-concept">內儲程式概念</a>。',
          '指令從記憶體取出後一條接一條依序執行 &mdash; <a href="#sequential-execution">循序執行</a>。',
          '背景：John von Neumann 約在 1944–45 年提出。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Von Neumann Model: Store program and data in the same memory</p>'
          },
          {
            label: 'Turing vs. von Neumann',
            html:
              '<p>Turing: memory holds data only; the program comes from outside</p>' +
              '<p>von Neumann: memory holds the program <em>and</em> the data</p>'
          }
        ],
        figure: {
          caption: 'The four subsystems (as in Figure 1.5 of the notes); program and data share the memory',
          svg: vn('all')
        }
      },

      {
        id: 'sequential-execution',
        term: 'Sequential execution',
        zh: '循序執行',
        zhAlt: '依序執行',
        aliases: ['fetch', 'decode', 'execute', 'instruction cycle', 'machine cycle', '取指', '解碼', '執行', '指令週期'],
        tags: ['ch1.1', 'models'],
        def:
          'How a program runs in the <a href="#von-neumann-model">von Neumann model</a>: its ' +
          'instructions are carried out <strong>one after another, in order</strong>. For each ' +
          'one the <a href="#control-unit">control unit</a> <strong>fetches</strong> it from ' +
          'memory, <strong>decodes</strong> it, then <strong>executes</strong> it.',
        notes: [
          'Fetch → decode → execute repeats for every instruction; it is often called the ' +
            'instruction cycle or machine cycle.',
          'Fetch: copy the next instruction from <a href="#memory">memory</a>. Decode: work out ' +
            'which operation it asks for. Execute: carry it out, usually in the ' +
            '<a href="#alu">ALU</a>.',
          '"Sequential" is the default order; later chapters add instructions such as jumps that ' +
            'change which instruction comes next.'
        ],
        defZh:
          '程式在<a href="#von-neumann-model">馮紐曼模型</a>中的執行方式：指令<strong>一條接一條、依序</strong>執行。' +
          '每一條都由<a href="#control-unit">控制單元</a>從記憶體<strong>取出</strong>、<strong>解碼</strong>，再<strong>執行</strong>。',
        notesZh: [
          '取指 → 解碼 → 執行，每條指令都重複一次，常稱為指令週期（machine cycle）。',
          '取指：從<a href="#memory">記憶體</a>複製下一條指令。解碼：判斷它要做哪種運算。執行：把它做完，通常交給 <a href="#alu">ALU</a>。',
          '「循序」是預設的順序；之後的章節會加入跳躍（jump）之類改變下一條指令的指令。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>A program in Von Neumann model executing by following the sequential ' +
              'execution of instructions. The control unit fetches the instruction from ' +
              'memory, decodes it, then execution it.</p>'
          },
          {
            label: 'One instruction, three steps',
            html:
              '<p>fetch &nbsp;&nbsp;&nbsp;"ADD R1, R2" from memory</p>' +
              '<p>decode &nbsp;&nbsp;it means: add register 2 into register 1</p>' +
              '<p>execute the ALU does the addition</p>'
          }
        ],
        figure: {
          caption: 'Every instruction goes round this loop once, in program order',
          svg:
            '<svg viewBox="0 0 340 130" role="img" aria-label="the fetch decode execute cycle">' +
            '<g font-family="sans-serif" font-size="12">' +
            '<rect x="14" y="44" width="86" height="38" rx="19" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>' +
            '<rect x="127" y="44" width="86" height="38" rx="19" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>' +
            '<rect x="240" y="44" width="86" height="38" rx="19" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>' +
            '<g text-anchor="middle" fill="var(--accent)" font-weight="700">' +
            '<text x="57" y="68">Fetch</text><text x="170" y="68">Decode</text><text x="283" y="68">Execute</text></g>' +
            '<g stroke="currentColor" stroke-width="1.6" fill="none">' +
            '<path d="M100 63 H119"/><path d="M213 63 H232"/>' +
            '<path d="M283 82 V108 H57 V90"/></g>' +
            '<g fill="currentColor">' + arrowR(127, 63) + arrowR(240, 63) +
            '<polygon points="57,82 52.5,90 61.5,90"/></g>' +
            '<text x="170" y="122" text-anchor="middle" fill="currentColor" font-size="10" opacity=".8">next instruction</text>' +
            '<text x="57" y="34" text-anchor="middle" fill="currentColor" font-size="9.5" opacity=".8">from memory</text>' +
            '<text x="283" y="34" text-anchor="middle" fill="currentColor" font-size="9.5" opacity=".8">in the ALU</text>' +
            '</g></svg>'
        }
      },

      /* ============================================ the four subsystems */
      {
        id: 'memory',
        term: 'Memory',
        zh: '記憶體',
        zhAlt: '主記憶體',
        aliases: ['main memory', 'ram', 'storage', '儲存'],
        tags: ['ch1.1', 'subsystems'],
        def:
          'The storage area where the <strong>data and the program</strong> are kept ' +
          '<strong>during processing</strong>.',
        notes: [
          '"During processing" is the key phrase: this is the working storage the machine uses ' +
            'while it runs, as opposed to long-term storage such as a disk.',
          'Keeping the program here alongside the data is exactly what makes a machine a ' +
            '<a href="#von-neumann-model">von Neumann</a> machine.'
        ],
        defZh: '<strong>處理過程中</strong>存放<strong>資料和程式</strong>的儲存區。',
        notesZh: [
          '關鍵在「處理過程中」：這是機器執行時使用的工作儲存空間，不同於硬碟那種長期儲存。',
          '把程式和資料一起放在這裡，正是一台機器之所以是<a href="#von-neumann-model">馮紐曼</a>機器的原因。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Memory: Storage area where data and program is stored during processing.</p>'
          }
        ],
        figure: { caption: 'Memory holds both the program and the data', svg: vn('memory') }
      },

      {
        id: 'alu',
        term: 'Arithmetic logic unit',
        abbr: 'ALU',
        zh: '算術邏輯單元',
        aliases: ['arithmetic', 'logic', 'calculation', '運算'],
        tags: ['ch1.1', 'subsystems'],
        def:
          'The subsystem that carries out the <strong>calculations and logic operations</strong>.',
        notes: [
          '<strong>Arithmetic</strong> operations: add, subtract, multiply, divide.',
          '<strong>Logic</strong> operations: AND, OR, NOT, and comparisons — operations whose ' +
            'answer is true or false.',
          'Together with the <a href="#control-unit">control unit</a> it makes up the ' +
            '<a href="#cpu">CPU</a>.'
        ],
        defZh: '負責執行<strong>算術運算與邏輯運算</strong>的子系統。',
        notesZh: [
          '筆記寫成「算數邏輯單元」，標準用語是<strong>算術</strong>邏輯單元（術，不是數）。',
          '<strong>算術</strong>運算：加、減、乘、除。',
          '<strong>邏輯</strong>運算：AND、OR、NOT 以及比較 &mdash; 結果是真或假的運算。',
          '它和<a href="#control-unit">控制單元</a>合起來就是 <a href="#cpu">CPU</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Arithmetic logic unit (ALU): Doing calculate and logic operation, including ' +
              'arithmetic operations and logic operations.</p>'
          },
          {
            label: 'One of each',
            html:
              '<p>arithmetic: 7 + 5 = 12</p>' +
              '<p>comparison: 7 &gt; 5 &rarr; true</p>' +
              '<p>logic: 1 AND 0 = 0</p>'
          }
        ],
        figure: { caption: 'The ALU does the actual computing', svg: vn('alu') }
      },

      {
        id: 'control-unit',
        term: 'Control unit',
        abbr: 'CU',
        zh: '控制單元',
        aliases: ['controller', 'control', '控制器'],
        tags: ['ch1.1', 'subsystems'],
        def:
          'The subsystem that <strong>controls the operation of the ALU, the memory and the ' +
          'input/output subsystem</strong> — it decides what happens next, and when.',
        notes: [
          'It does no calculating itself. As the notes put it, it <strong>fetches</strong> each ' +
            'instruction from memory, <strong>decodes</strong> it, then has it ' +
            '<strong>executed</strong> — the <a href="#sequential-execution">fetch–decode–execute</a> cycle.',
          'Control unit + <a href="#alu">ALU</a> = <a href="#cpu">CPU</a>.'
        ],
        defZh:
          '<strong>控制 ALU、記憶體與輸入／輸出子系統運作</strong>的子系統 &mdash; 由它決定下一步做什麼、什麼時候做。',
        notesZh: [
          '它本身不做計算。照筆記的說法，它從記憶體<strong>取出</strong>每條指令、<strong>解碼</strong>，再讓它被<strong>執行</strong> &mdash; 也就是<a href="#sequential-execution">取指–解碼–執行</a>循環。',
          '控制單元 + <a href="#alu">ALU</a> = <a href="#cpu">CPU</a>。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Control Unit: Control operation of ALU, Memory and I/O</p>' }
        ],
        figure: { caption: 'The control unit directs the other three subsystems', svg: vn('cu') }
      },

      {
        id: 'io-subsystem',
        term: 'Input/output subsystem',
        abbr: 'I/O',
        zh: '輸入／輸出子系統',
        aliases: ['input', 'output', 'io', 'i/o', 'peripheral', '周邊', '輸入', '輸出'],
        tags: ['ch1.1', 'subsystems'],
        def:
          'The subsystem that connects the computer to the outside world. The ' +
          '<strong>input</strong> subsystem accepts input data <em>and the program</em> from ' +
          'outside; the <strong>output</strong> subsystem sends the result of processing back out.',
        notes: [
          'Note that the program comes in through input too — in a ' +
            '<a href="#von-neumann-model">von Neumann</a> machine it is loaded into memory just ' +
            'like data.',
          'Input devices: keyboard, mouse, scanner. Output devices: monitor, printer.',
          'Secondary storage such as disks is usually counted here too: it keeps programs and ' +
            'data when the power is off, unlike <a href="#memory">memory</a>.'
        ],
        defZh:
          '讓電腦和外界溝通的子系統。<strong>輸入</strong>子系統從外部接收輸入資料<em>和程式</em>；' +
          '<strong>輸出</strong>子系統把處理結果送回外界。',
        notesZh: [
          '注意程式也是從輸入進來的 &mdash; 在<a href="#von-neumann-model">馮紐曼</a>機器裡，它和資料一樣被載入記憶體。',
          '輸入裝置：鍵盤、滑鼠、掃描器。輸出裝置：螢幕、印表機。',
          '硬碟這類輔助儲存通常也算在這裡：和<a href="#memory">記憶體</a>不同，它斷電後仍保留程式與資料。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Input/Output: The input subsystem accepts input data and the program from ' +
              'outside the computer, while the output subsystem send the result of processing ' +
              'to the outside world.</p>'
          }
        ],
        figure: { caption: 'Input / output sits between the machine and the outside world', svg: vn('io') }
      },

      /* ============================================ supplements */
      {
        id: 'cpu',
        term: 'Central processing unit',
        abbr: 'CPU',
        zh: '中央處理器',
        zhAlt: '中央處理單元',
        aliases: ['processor', 'cpu', '處理器'],
        tags: ['ch1.1', 'subsystems'],
        added: true,
        def:
          'The <a href="#alu">ALU</a> and the <a href="#control-unit">control unit</a> taken ' +
          'together — the part of the computer that actually executes the program.',
        notes: [
          'Why this is here: the notes describe the ALU and the control unit separately, but ' +
            'the two are almost always referred to together as the CPU.',
          'Memory and I/O are outside the CPU.'
        ],
        defZh: '<a href="#alu">ALU</a> 與<a href="#control-unit">控制單元</a>合起來的稱呼 &mdash; 電腦中真正執行程式的部分。',
        notesZh: [
          '為什麼補這個：筆記把 ALU 和控制單元分開寫，但兩者幾乎總是合稱 CPU。',
          '記憶體與 I/O 都在 CPU 之外。'
        ],
        figure: { caption: 'The CPU is the ALU plus the control unit', svg: vn('cpu') }
      },

      {
        id: 'stored-program-concept',
        term: 'Stored-program concept',
        zh: '內儲程式概念',
        zhAlt: '儲存程式概念',
        aliases: ['stored program', '內儲程式', '程式儲存'],
        tags: ['ch1.1', 'models'],
        added: true,
        def:
          'The idea that a program is kept in <a href="#memory">memory</a> in the same way as ' +
          'data, so the computer can load and switch programs by itself instead of being ' +
          'rewired or fed a new program from outside.',
        notes: [
          'Why this is here: it is the name for exactly the difference the notes draw between ' +
            'the <a href="#turing-model">Turing</a> and ' +
            '<a href="#von-neumann-model">von Neumann</a> models, and it is what exam questions ' +
            'usually ask about.',
          'A consequence: in memory, programs and data are both just bit patterns.'
        ],
        defZh:
          '程式和資料一樣存放在<a href="#memory">記憶體</a>裡，因此電腦能自行載入、切換程式，' +
          '不必重新接線或從外部餵入新程式。',
        notesZh: [
          '為什麼補這個：筆記對照<a href="#turing-model">圖靈</a>與<a href="#von-neumann-model">馮紐曼</a>兩種模型時，' +
            '講的差別就是這個概念，考題也常直接問它。',
          '結果是：在記憶體裡，程式和資料都只是一串位元樣式（bit pattern）。'
        ]
      },

      {
        id: 'program',
        term: 'Program',
        zh: '程式',
        aliases: ['instructions', 'instruction', 'software', '指令', '軟體'],
        tags: ['ch1.2', 'models'],
        def:
          'A finite list of <strong>instructions</strong> that tells the computer, step by step, ' +
          'what to do with the data.',
        notes: [
          'The notes (ch1.2) show one: four instructions that input two numbers, add them, ' +
            'store the sum in memory and output it. The instructions are carried out one after ' +
            'another — <a href="#sequential-execution">sequential execution</a>.',
          'Where it lives is the whole difference between the two models: outside the machine ' +
            'in the <a href="#turing-model">Turing model</a>, in memory next to the data in the ' +
            '<a href="#von-neumann-model">von Neumann model</a>.',
          'Programs are the <em>software</em> component of a computer, alongside ' +
            '<a href="#computer-hardware">hardware</a> and <a href="#data">data</a>.'
        ],
        defZh: '一串有限的<strong>指令</strong>，一步一步告訴電腦要如何處理資料。',
        notesZh: [
          '筆記（ch1.2）給了一個例子：四條指令，輸入兩個數、相加、把和存進記憶體、再輸出。指令一條接一條執行 &mdash; <a href="#sequential-execution">循序執行</a>。',
          '它放在哪裡正是兩種模型的差別：<a href="#turing-model">圖靈模型</a>在機器外面，' +
            '<a href="#von-neumann-model">馮紐曼模型</a>放在記憶體裡、和資料在一起。',
          '程式就是電腦的「軟體」組成，和<a href="#computer-hardware">硬體</a>、<a href="#data">資料</a>並列。'
        ],
        examples: [
          {
            label: 'From the notes (ch1.2)',
            html:
              '<p>1. Input the first number into memory.</p>' +
              '<p>2. Input the second number into memory.</p>' +
              '<p>3. Add the two together and store the result in memory.</p>' +
              '<p>4. Output the result.</p>'
          }
        ]
      },

      /* ============================================ ch1.3 — components */
      {
        id: 'computer-hardware',
        term: 'Computer hardware',
        zh: '電腦硬體',
        aliases: ['hardware', 'computer components', 'I/O devices', 'processing devices', 'storage', '硬體', '電腦組成', '四個硬體'],
        tags: ['ch1.3', 'components'],
        def:
          'The physical parts of a computer. Today\'s hardware still follows the ' +
          '<a href="#von-neumann-model">von Neumann model</a> and has four components: ' +
          '<a href="#memory">memory</a>, the <a href="#alu">ALU</a>, the ' +
          '<a href="#control-unit">control unit</a> and <a href="#io-subsystem">input/output</a>.',
        notes: [
          'The notes say "four hardwares" but list three groups — I/O devices, processing devices ' +
            'and memory (storage). The count still works: the processing devices are two of the ' +
            'four, the ALU and the control unit, which together are the <a href="#cpu">CPU</a>.',
          'The heading in the notes is "computer components". In the textbook these are hardware, ' +
            '<a href="#data">data</a> and software — the <a href="#program">programs</a>.'
        ],
        defZh:
          '電腦的實體部分。今天的硬體仍然依照<a href="#von-neumann-model">馮紐曼模型</a>，分成四個組成：' +
          '<a href="#memory">記憶體</a>、<a href="#alu">ALU</a>、<a href="#control-unit">控制單元</a>、<a href="#io-subsystem">輸入／輸出</a>。',
        notesZh: [
          '筆記寫「four hardwares」卻只列了三類：I/O 裝置、處理裝置、記憶體（儲存）。數目其實對得上：處理裝置佔了四個中的兩個 &mdash; ALU 和控制單元，合起來就是 <a href="#cpu">CPU</a>。',
          '筆記的標題是「computer component（電腦的組成）」；課本裡的三個組成是硬體、<a href="#data">資料</a>、軟體（也就是<a href="#program">程式</a>）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>* Computer component</p>' +
              '<p>Hardware: Today have four hardwares under von Neumann models: I/O devices, ' +
              'processing devices and memory (storage)</p>'
          }
        ],
        figure: { caption: 'The four hardware components; the ALU and control unit are the processing devices', svg: vn('cpu') }
      },

      {
        id: 'data',
        term: 'Data',
        zh: '資料',
        aliases: ['input data', 'output data', 'data processing', '資料處理'],
        tags: ['ch1.3', 'components'],
        def:
          'What a computer works on. The <a href="#von-neumann-model">von Neumann model</a> ' +
          'defines a computer as a <strong>data-processing machine</strong>: it accepts input data, ' +
          'processes it, and outputs the result.',
        notes: [
          'The notes put it as: the von Neumann model defined a computer as processing data and ' +
            'I/O data.',
          'While it is being processed, data sits in <a href="#memory">memory</a> next to the ' +
            '<a href="#program">program</a>.',
          'Numbers, text, images, audio and video are all data; inside the machine every kind is ' +
            'kept in the same form — see <a href="#storing-data">storing data</a>.'
        ],
        defZh:
          '電腦處理的對象。<a href="#von-neumann-model">馮紐曼模型</a>把電腦定義成一台<strong>資料處理機器</strong>：接收輸入資料、處理它、再輸出結果。',
        notesZh: [
          '筆記的說法：馮紐曼模型把電腦定義為處理資料、輸入輸出資料的機器。',
          '處理過程中，資料和<a href="#program">程式</a>一起放在<a href="#memory">記憶體</a>裡。',
          '數字、文字、圖片、聲音、影片都是資料；在機器裡每一種都用同一種形式保存，見<a href="#storing-data">資料的儲存</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html: '<p>Data: Von Neumann model defined a computer as processing data and I/O data</p>'
          }
        ]
      },

      {
        id: 'storing-data',
        term: 'Storing data',
        zh: '資料的儲存',
        aliases: ['electrical signal', 'binary', 'bit', 'byte', '二進位', '位元', '電訊號'],
        tags: ['ch1.3', 'components'],
        def:
          'Electronic computers store data as <strong>electrical signals</strong>, and the most ' +
          'reliable signal has only two states, on and off. So data has to be kept in a numbering ' +
          'system with just two digits, 0 and 1 — <strong>binary</strong>.',
        notes: [
          'The notes\' sentence stops at "We have to change our numbering system from"; the ' +
            'textbook finishes it "from decimal (base 10) to binary (base 2)" — filled in here.',
          'One binary digit is a <a href="#bit">bit</a>; 8 bits make a <strong>byte</strong>. More on the system itself: <a href="#binary-system">binary system</a>.',
          'Binary is a <a href="#positional-number-system">positional number system</a> with base 2, ' +
            'just as <a href="#decimal-system">decimal</a> is one with base 10.'
        ],
        defZh:
          '電子計算裝置用<strong>電訊號</strong>儲存資料，而最可靠的訊號只有「開」「關」兩種狀態。' +
          '所以資料必須用只有 0 和 1 兩個數字的記數系統來存 &mdash; 也就是<strong>二進位</strong>。',
        notesZh: [
          '筆記的句子停在「We have to change our numbering system from」；課本的完整句子是「從十進位（base 10）改成二進位（base 2）」&mdash; 這裡補上的。',
          '一個二進位數字叫<strong>位元</strong>（bit），8 個位元是一個<strong>位元組</strong>（byte）。',
          '二進位是底數為 2 的<a href="#positional-number-system">位值進位制</a>，就像<a href="#decimal-system">十進位</a>的底數是 10。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Storing data: Electrical signal is the best way to store data for electronic ' +
              'computing devices. We have to change our numbering system from</p>' +
              '<p>&rarr; (sentence unfinished: … from decimal to binary)</p>'
          },
          {
            label: 'Decimal to binary',
            html: '<p>13 = 8 + 4 + 1 = 1&times;2³ + 1&times;2² + 0&times;2¹ + 1&times;2&#8304; = (1101)&#8322;</p>'
          }
        ]
      },

      /* ============================================ ch2.2 — number systems */
      {
        id: 'positional-number-system',
        term: 'Positional number system',
        zh: '位值進位制',
        zhAlt: '位置記數系統',
        aliases: ['positional', 'base', 'radix', '基數', '底數', '進位制', 'symbol', 'number system', '記數系統'],
        tags: ['ch2.2', 'number systems'],
        def:
          'A number system in which a symbol\'s value depends on its <strong>position</strong>. ' +
          'With base b, the number ±(S<sub>k&minus;1</sub> &hellip; S&#8321;S&#8320;.S<sub>&minus;1</sub> &hellip;)<sub>b</sub> ' +
          'has the value <span class="mono">n = &plusmn;(S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + &hellip; + ' +
          'S&#8320;&times;b&#8304; + S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> + &hellip;)</span>.',
        notes: [
          'S is a symbol (a digit) and b is the <strong>base</strong>, also called the ' +
            '<strong>radix</strong>. A base-b system uses b symbols, 0 to b &minus; 1.',
          'Left of the point the positions are worth b&#8304;, b¹, b², …; right of it, ' +
            'b<sup>&minus;1</sup>, b<sup>&minus;2</sup>, …. That weight is the ' +
            '<a href="#place-value">place value</a>.',
          '<a href="#decimal-system">Decimal</a> (b = 10) is the everyday one; binary (b = 2) is the one ' +
            'computers use — see <a href="#storing-data">storing data</a>.',
          'For contrast, Roman numerals are not positional: X means ten wherever it stands.'
        ],
        defZh:
          '符號的值取決於它所在<strong>位置</strong>的記數系統。底數為 b 時，數字 ±(S<sub>k&minus;1</sub> … S&#8321;S&#8320;.S<sub>&minus;1</sub> …)<sub>b</sub> 的值是 ' +
          'n = ±(S<sub>k&minus;1</sub>×b<sup>k&minus;1</sup> + … + S&#8320;×b&#8304; + S<sub>&minus;1</sub>×b<sup>&minus;1</sup> + …)。',
        notesZh: [
          'S 是符號（一個數字），b 是<strong>底數</strong>，也叫<strong>基數</strong>（radix）。底數 b 的系統用 b 個符號：0 到 b &minus; 1。',
          '小數點左邊各位的權重是 b&#8304;、b¹、b²…；右邊是 b<sup>&minus;1</sup>、b<sup>&minus;2</sup>…。這個權重就是<a href="#place-value">位值</a>。',
          '<a href="#decimal-system">十進位</a>（b = 10）是日常用的；二進位（b = 2）是電腦用的，見<a href="#storing-data">資料的儲存</a>。',
          '對照：羅馬數字不是位值制 &mdash; X 不管放在哪裡都代表十。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Positional Number System（位值進位制）: value represent</p>' +
              '<p>n = &plusmn; S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + S<sub>k&minus;2</sub>&times;b<sup>k&minus;2</sup> + &hellip; + S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> &hellip;</p>' +
              '<p>S is the symbol (number), b is the base (radix)</p>'
          },
          {
            label: 'Same digits, different base',
            html:
              '<p>(101)&#8321;&#8320; = 1&times;10² + 0&times;10¹ + 1&times;10&#8304; = 101</p>' +
              '<p>(101)&#8322; = 1&times;2² + 0&times;2¹ + 1&times;2&#8304; = 5</p>'
          }
        ]
      },

      {
        id: 'decimal-system',
        term: 'Decimal system',
        zh: '十進位系統',
        zhAlt: '十進制',
        aliases: ['decimal', 'base 10', 'base-10', '十進位', '(522.30)10'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The <a href="#positional-number-system">positional number system</a> with ' +
          '<strong>base 10</strong>, using the ten symbols 0 to 9.',
        notes: [
          'Written in full, a decimal number looks like +(522.30)&#8321;&#8320;. In everyday use we drop ' +
            'the parentheses, the base and the plus sign, and just write 522.30.',
          'The name comes from Latin <em>decem</em>, ten.'
        ],
        defZh: '底數為 <strong>10</strong>、使用 0 到 9 十個符號的<a href="#positional-number-system">位值進位制</a>。',
        notesZh: [
          '完整寫法像 +(522.30)&#8321;&#8320;；日常使用時省略括號、底數和正號，只寫 522.30。',
          '名稱來自拉丁文 decem（十）。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Decimal system: the base is 10 and the symbol is the set zero to nine</p>' +
              '<p>* In decimal system, the number is written as +(522.30)&#8321;&#8320;, but we dropped the ' +
              'parentheses, the base, the plus sign, thus we simplify it as 522.30</p>'
          },
          {
            label: 'Expanding 522.30',
            html:
              '<p>5&times;10² + 2&times;10¹ + 2&times;10&#8304; + 3&times;10<sup>&minus;1</sup> + 0&times;10<sup>&minus;2</sup></p>' +
              '<p>= 500 + 20 + 2 + 0.3 + 0 = 522.3</p>'
          }
        ]
      },

      {
        id: 'integer',
        term: 'Integer',
        zh: '整數',
        aliases: ['integers', 'whole number', 'integral number'],
        tags: ['ch2.2', 'number systems'],
        def:
          'A whole number with no fractional part. Written in decimal with digits ' +
          'S<sub>k&minus;1</sub> … S&#8321;S&#8320;, its value is ' +
          '<span class="mono">N = &plusmn;(S<sub>k&minus;1</sub>&times;10<sup>k&minus;1</sup> + &hellip; + ' +
          'S&#8321;&times;10¹ + S&#8320;&times;10&#8304;)</span>.',
        notes: [
          'The notes: "an integral number without fractions".',
          'Only non-negative powers of 10 appear — there are no digits after the point.',
          'The 9/17 notes write integers in <a href="#binary-system">binary</a> the same way, with ' +
            'place values 2<sup>k&minus;1</sup> … 2&#8304;: 0111 = 0&times;2³ + 1&times;2² + 1&times;2¹ + 1&times;2&#8304; = 7.',
          'How many digits you allow limits how big it can be — see ' +
            '<a href="#max-min-value">maximum / minimum value</a>.'
        ],
        defZh:
          '沒有小數部分的數。用十進位數字 S<sub>k&minus;1</sub> … S&#8321;S&#8320; 寫出時，它的值是 ' +
          'N = ±(S<sub>k&minus;1</sub>×10<sup>k&minus;1</sup> + … + S&#8321;×10¹ + S&#8320;×10&#8304;)。',
        notesZh: [
          '筆記的說法：沒有分數（小數）部分的整數。',
          '只會出現 10 的非負次方 &mdash; 小數點後面沒有數字。',
          '9/17 的筆記用同樣方式寫<a href="#binary-system">二進位</a>整數，位值是 2<sup>k&minus;1</sup> … 2&#8304;：0111 = 0×2³ + 1×2² + 1×2¹ + 1×2&#8304; = 7。',
          '允許幾位數，就決定它能多大，見<a href="#max-min-value">最大值／最小值</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Integers: An integral numbers without fractions, written as:</p>' +
              '<p>N = &plusmn; S<sub>k&minus;1</sub>&times;10<sup>k&minus;1</sup> &hellip; S&#8320;&times;10&#8304;</p>'
          },
          {
            label: 'From the notes (9/17, binary)',
            html: '<p>0111 = 0&times;2³ + 1&times;2² + 1&times;2¹ + 1&times;2&#8304; = 0 + 4 + 2 + 1 = 7</p>'
          }
        ]
      },

      {
        id: 'place-value',
        term: 'Place value',
        zh: '位值',
        aliases: ['place values', 'weight', 'digit position', '權重', '位數'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The weight that a position carries in a positional number. For a decimal integer the ' +
          'rightmost digit is worth 10&#8304;, the next 10¹, then 10², and so on. Multiply each digit by ' +
          'its place value and add the results to get the number.',
        notes: [
          'The notes call it "a number system to represent integer" and paste the textbook figure: ' +
            'place values 10<sup>k&minus;1</sup> … 10&#8304; above the digits S<sub>k&minus;1</sub> … S&#8320;, ' +
            'giving N = ±S<sub>k&minus;1</sub>&times;10<sup>k&minus;1</sup> + … + S&#8320;&times;10&#8304;.',
          'In base b the place values are b&#8304;, b¹, b², … — the same idea as in the ' +
            '<a href="#positional-number-system">positional number system</a>.'
        ],
        defZh:
          '位值制中每個位置的權重。十進位整數最右邊一位值 10&#8304;，往左依序是 10¹、10²…。' +
          '每個數字乘上它的位值再相加，就得到這個數。',
        notesZh: [
          '筆記寫「用來表示整數的記數方式」，並貼了課本的圖：位值 10<sup>k&minus;1</sup> … 10&#8304; 對應數字 S<sub>k&minus;1</sub> … S&#8320;，' +
            '得到 N = ±S<sub>k&minus;1</sub>×10<sup>k&minus;1</sup> + … + S&#8320;×10&#8304;。',
          '底數 b 時，位值就是 b&#8304;、b¹、b²… &mdash; 和<a href="#positional-number-system">位值進位制</a>是同一個概念。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>7 &times; 10³ + 2 &times; 10² + 4 &times; 10¹ + 0 &times; 10&#8304;</p>' +
              '<p>= 7000 + 200 + 40 + 0 = 7240</p>'
          }
        ],
        figure: {
          caption: 'Each digit of 7240 times the place value above it',
          svg:
            '<svg viewBox="0 0 320 150" role="img" aria-label="place values of 7240">' +
            '<g font-family="sans-serif" fill="currentColor" text-anchor="middle">' +
            '<g font-size="11" opacity=".8">' +
            '<text x="70" y="22">10<tspan dy="-5" font-size="8">3</tspan></text>' +
            '<text x="130" y="22">10<tspan dy="-5" font-size="8">2</tspan></text>' +
            '<text x="190" y="22">10<tspan dy="-5" font-size="8">1</tspan></text>' +
            '<text x="250" y="22">10<tspan dy="-5" font-size="8">0</tspan></text></g>' +
            '<rect x="45" y="30" width="230" height="32" rx="3" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>' +
            '<g stroke="var(--accent)" stroke-width="1" opacity=".6"><path d="M100 30 V62"/><path d="M160 30 V62"/><path d="M220 30 V62"/></g>' +
            '<g font-size="17" font-weight="700" fill="var(--accent)">' +
            '<text x="70" y="52">7</text><text x="130" y="52">2</text><text x="190" y="52">4</text><text x="250" y="52">0</text></g>' +
            '<g stroke="currentColor" stroke-width="1.3"><path d="M70 66 V82"/><path d="M130 66 V82"/><path d="M190 66 V82"/><path d="M250 66 V82"/></g>' +
            '<polygon points="70,88 66,80 74,80"/><polygon points="130,88 126,80 134,80"/>' +
            '<polygon points="190,88 186,80 194,80"/><polygon points="250,88 246,80 254,80"/>' +
            '<g font-size="12"><text x="70" y="104">7000</text><text x="130" y="104">200</text>' +
            '<text x="190" y="104">40</text><text x="250" y="104">0</text></g>' +
            '<text x="160" y="136" font-size="12">7000 + 200 + 40 + 0 = <tspan font-weight="700" fill="var(--accent)">7240</tspan></text>' +
            '</g></svg>'
        }
      },

      {
        id: 'max-min-value',
        term: 'Maximum / minimum value',
        zh: '最大值／最小值',
        aliases: ['maximum value', 'minimum value', 'range of values', 'Nmax', 'Nmin', '最大值', '最小值', 'b^k - 1'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The largest and smallest integers that can be written with a fixed number of digits. ' +
          'With k digits in base b the largest is <span class="mono">N<sub>max</sub> = b<sup>k</sup> &minus; 1</span>; ' +
          'allowing a sign, the smallest is <span class="mono">N<sub>min</sub> = &minus;(b<sup>k</sup> &minus; 1)</span>.',
        notes: [
          'The 9/17 notes give the decimal case: N<sub>max</sub> = 10<sup>k</sup> &minus; 1. They write ' +
            'N<sub>min</sub> as &minus;10<sup>k</sup> &minus; 1; it should be <strong>&minus;(10<sup>k</sup> &minus; 1)</strong> ' +
            '= &minus;10<sup>k</sup> + 1. With 3 digits the smallest is &minus;999, not &minus;1001.',
          'The 9/22 notes give the same rule in the other bases: <a href="#hexadecimal-system">hexadecimal</a> ' +
            '16<sup>k</sup> &minus; 1 (k = 5 &rarr; 1 048 575) and <a href="#octal-system">octal</a> 8<sup>k</sup> &minus; 1 ' +
            '(k = 5 &rarr; 32 767).',
          'Why b<sup>k</sup> &minus; 1: the largest k-digit number has every digit equal to b &minus; 1, ' +
            'and one more would need a (k + 1)-th digit — 999 + 1 = 1000 = 10³.',
          'The reverse question — how many digits a given value needs — is ' +
            '<a href="#number-of-digits">number of digits</a>; the two are set side by side in ' +
            '<a href="#digits-vs-max-min">number of digits vs. maximum / minimum</a>.'
        ],
        defZh:
          '固定位數下能寫出的最大、最小整數。底數 b、k 位數時，最大是 N<sub>max</sub> = b<sup>k</sup> &minus; 1；加上正負號，最小是 N<sub>min</sub> = &minus;(b<sup>k</sup> &minus; 1)。',
        notesZh: [
          '9/17 的筆記給了十進位的情形：N<sub>max</sub> = 10<sup>k</sup> &minus; 1。N<sub>min</sub> 筆記寫成 &minus;10<sup>k</sup> &minus; 1，' +
            '應為 <strong>&minus;(10<sup>k</sup> &minus; 1)</strong> = &minus;10<sup>k</sup> + 1。3 位數時最小是 &minus;999，不是 &minus;1001。',
          '9/22 的筆記給了其他進位的同一規則：<a href="#hexadecimal-system">十六進位</a> 16<sup>k</sup> &minus; 1（k = 5 &rarr; 1 048 575）、<a href="#octal-system">八進位</a> 8<sup>k</sup> &minus; 1（k = 5 &rarr; 32 767）。',
          '為什麼是 b<sup>k</sup> &minus; 1：k 位數最大的數每一位都是 b &minus; 1，再加 1 就要第 k + 1 位了 &mdash; 999 + 1 = 1000 = 10³。',
          '反過來問「一個數要幾位數」就是<a href="#number-of-digits">位數</a>；兩者的對照見<a href="#digits-vs-max-min">位數與最大／最小值的比較</a>。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>Maximum / Minimum Value: N<sub>max</sub> = 10<sup>k</sup> &minus; 1 / N<sub>min</sub> = &minus;10<sup>k</sup> &minus; 1 ' +
              '&nbsp;&rarr;&nbsp; should read &minus;(10<sup>k</sup> &minus; 1)</p>' +
              '<p>hexadecimal: N<sub>max</sub> = 16<sup>k</sup> &minus; 1; k = 5 &rarr; 16<sup>5</sup> &minus; 1 = 1 048 575</p>' +
              '<p>octal: N<sub>max</sub> = 8<sup>k</sup> &minus; 1; k = 5 &rarr; 8<sup>5</sup> &minus; 1 = 32 767</p>'
          },
          { label: 'k digits → largest value, in each base', html: DIGITS_MAX_TABLE }
        ]
      },

      {
        id: 'real-number',
        term: 'Real number (reals)',
        zh: '實數',
        aliases: ['reals', 'real', 'fraction', 'fractional part', 'integral part', '小數', '整數部分', '小數部分'],
        tags: ['ch2.2', 'number systems'],
        def:
          'A number with an <strong>integral part</strong> and a <strong>fractional part</strong>, ' +
          'separated by the point. In base b: <span class="mono">R = &plusmn;(S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + … + ' +
          'S&#8320;&times;b&#8304; . S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> + … + S<sub>&minus;ℓ</sub>&times;b<sup>&minus;ℓ</sup>)</span>.',
        notes: [
          'Digits right of the point carry negative powers of the base: 10<sup>&minus;1</sup> = 0.1, ' +
            '2<sup>&minus;1</sup> = 0.5.',
          'In the worked example the notes write 2 &times; 10&#8304; as <strong>20</strong>; it is 2. The ' +
            'total is still right: 30 + 2 + 0.4 + 0.07 = 32.47.',
          'The textbook figure for binary reals joins the integral-part terms with &times;; they should be ' +
            'added: S<sub>k&minus;1</sub>&times;2<sup>k&minus;1</sup> <strong>+</strong> … <strong>+</strong> S&#8320;&times;2&#8304;.'
        ],
        defZh:
          '有<strong>整數部分</strong>和<strong>小數部分</strong>、中間以小數點分開的數。底數 b 時：R = ±(S<sub>k&minus;1</sub>×b<sup>k&minus;1</sup> + … + S&#8320;×b&#8304; . S<sub>&minus;1</sub>×b<sup>&minus;1</sup> + … + S<sub>&minus;ℓ</sub>×b<sup>&minus;ℓ</sup>)。',
        notesZh: [
          '小數點右邊的位數用底數的負次方：10<sup>&minus;1</sup> = 0.1、2<sup>&minus;1</sup> = 0.5。',
          '例題裡筆記把 2 × 10&#8304; 寫成 <strong>20</strong>，應該是 2。總和還是對的：30 + 2 + 0.4 + 0.07 = 32.47。',
          '課本二進位實數的圖把整數部分各項用 × 連起來；應該用 + 相加：S<sub>k&minus;1</sub>×2<sup>k&minus;1</sup> <strong>+</strong> … <strong>+</strong> S&#8320;×2&#8304;。'
        ],
        examples: [
          {
            label: 'From the notes (9/17)',
            html:
              '<p>Reals: A number with whole part including fractional part</p>' +
              '<p>S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + … + S&#8320;&times;b&#8304; (integral part) . ' +
              'S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> + … + S<sub>&minus;ℓ</sub>&times;b<sup>&minus;ℓ</sup> (fractional part)</p>' +
              '<p>32.47 = 3&times;10¹ + 2&times;10&#8304; + 4&times;10<sup>&minus;1</sup> + 7&times;10<sup>&minus;2</sup> = 30 + <del>20</del> 2 + 0.4 + 0.07</p>'
          },
          { label: 'A binary real', html: '<p>(101.11)&#8322; = 4 + 0 + 1 + 0.5 + 0.25 = 5.75</p>' }
        ]
      },

      {
        id: 'binary-system',
        term: 'Binary system',
        zh: '二進位系統',
        zhAlt: '二進制',
        aliases: ['binary', 'base 2', 'base-2', '二進位', '0 and 1'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The <a href="#positional-number-system">positional number system</a> with <strong>base 2</strong>, ' +
          'using only two symbols, 0 and 1. Place values are powers of two: 2&#8304;, 2¹, 2², ….',
        notes: [
          'It is the system computers use, because a signal with two states is the most reliable — see ' +
            '<a href="#storing-data">storing data</a>. Each symbol is a <a href="#bit">bit</a>.',
          'With k bits the largest value is 2<sup>k</sup> &minus; 1 (<a href="#max-min-value">maximum value</a>).',
          'Binary numbers get long quickly, which is why <a href="#octal-system">octal</a> and ' +
            '<a href="#hexadecimal-system">hexadecimal</a> are used as shorthand.'
        ],
        defZh:
          '底數為 <strong>2</strong>、只用 0 和 1 兩個符號的<a href="#positional-number-system">位值進位制</a>。位值是 2 的次方：2&#8304;、2¹、2²…。',
        notesZh: [
          '電腦用的就是它，因為兩種狀態的訊號最可靠，見<a href="#storing-data">資料的儲存</a>。每個符號是一個<a href="#bit">位元</a>。',
          'k 個位元能表示的最大值是 2<sup>k</sup> &minus; 1（<a href="#max-min-value">最大值</a>）。',
          '二進位數字很快就變很長，所以會用<a href="#octal-system">八進位</a>和<a href="#hexadecimal-system">十六進位</a>來簡寫。'
        ],
        examples: [
          { label: 'From the notes (9/17)', html: '<p>Binary system (Base 2): use only two symbols: 0, 1</p>' },
          { label: 'Reading one', html: '<p>(0111)&#8322; = 0 + 4 + 2 + 1 = 7 &nbsp;&nbsp; (11101010)&#8322; = 128 + 64 + 32 + 8 + 2 = 234</p>' }
        ]
      },

      {
        id: 'bit',
        term: 'Bit (binary digit)',
        zh: '位元',
        zhAlt: '二進位數字',
        aliases: ['bits', 'binary digit', 'byte', '位元組'],
        tags: ['ch2.2', 'number systems'],
        def:
          'A single symbol of the <a href="#binary-system">binary system</a>: 0 or 1. The name is short ' +
          'for <strong>b</strong>inary dig<strong>it</strong>.',
        notes: [
          'Eight bits make a <strong>byte</strong>.',
          'A group of k bits can hold 2<sup>k</sup> different patterns — 8 bits give 256.'
        ],
        defZh: '<a href="#binary-system">二進位系統</a>的單一符號：0 或 1。名稱是 <strong>b</strong>inary dig<strong>it</strong> 的縮寫。',
        notesZh: ['8 個位元是一個<strong>位元組</strong>（byte）。', 'k 個位元一共有 2<sup>k</sup> 種排列 &mdash; 8 個位元有 256 種。'],
        examples: [{ label: 'From the notes (9/17)', html: '<p>Binary digits / bits: symbols of binary system.</p>' }]
      },

      {
        id: 'octal-system',
        term: 'Octal system',
        zh: '八進位系統',
        zhAlt: '八進制',
        aliases: ['octal', 'base 8', 'base-8', '八進位'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The positional number system with <strong>base 8</strong>, using the symbols ' +
          '{0, 1, 2, 3, 4, 5, 6, 7}. An integer ±S<sub>k&minus;1</sub>…S&#8321;S&#8320; has the value ' +
          '<span class="mono">N = &plusmn;(S<sub>k&minus;1</sub>&times;8<sup>k&minus;1</sup> + … + S&#8321;&times;8¹ + S&#8320;&times;8&#8304;)</span>.',
        notes: [
          'Largest k-digit value: 8<sup>k</sup> &minus; 1; with k = 5 that is 32 767.',
          'Because 8 = 2³, one octal digit is exactly three bits — see ' +
            '<a href="#binary-octal-hex-conversion">binary–octal–hexadecimal conversion</a>.'
        ],
        defZh:
          '底數為 <strong>8</strong>、符號是 {0, 1, 2, 3, 4, 5, 6, 7} 的位值進位制。整數的值是 N = ±(S<sub>k&minus;1</sub>×8<sup>k&minus;1</sup> + … + S&#8321;×8¹ + S&#8320;×8&#8304;)。',
        notesZh: [
          'k 位數最大值：8<sup>k</sup> &minus; 1；k = 5 時是 32 767。',
          '因為 8 = 2³，一個八進位數字剛好是三個位元，見<a href="#binary-octal-hex-conversion">二、八、十六進位互換</a>。'
        ],
        examples: [
          {
            label: 'From the notes (textbook)',
            html:
              '<p>Octal system: base 8, set of symbols is S = {0, 1, 2, 3, 4, 5, 6, 7}</p>' +
              '<p>N = &plusmn; S<sub>k&minus;1</sub>&times;8<sup>k&minus;1</sup> + … + S&#8321;&times;8¹ + S&#8320;&times;8&#8304;</p>' +
              '<p>maximum value with k digits: 8<sup>k</sup> &minus; 1; k = 5 &rarr; 32 767</p>'
          },
          { label: 'Reading one', html: '<p>(352)&#8328; = 3&times;64 + 5&times;8 + 2 = 234</p>' }
        ]
      },

      {
        id: 'hexadecimal-system',
        term: 'Hexadecimal system',
        zh: '十六進位系統',
        zhAlt: '十六進制',
        aliases: ['hexadecimal', 'hex', 'base 16', 'base-16', 'A B C D E F', '十六進位'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The positional number system with <strong>base 16</strong>. It needs sixteen symbols, so after ' +
          '0–9 it uses letters: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. An integer has the value ' +
          '<span class="mono">N = &plusmn;(S<sub>k&minus;1</sub>&times;16<sup>k&minus;1</sup> + … + S&#8321;&times;16¹ + S&#8320;&times;16&#8304;)</span>.',
        notes: [
          'Largest k-digit value: 16<sup>k</sup> &minus; 1; with k = 5 that is 1 048 575.',
          'Because 16 = 2&#8308;, one hex digit is exactly four bits, so a byte is two hex digits (00 to FF).',
          'The 9/17 notes give only the heading; the 9/22 notes fill it in.'
        ],
        defZh:
          '底數為 <strong>16</strong> 的位值進位制。需要十六個符號，所以 0–9 之後用字母：A = 10、B = 11、C = 12、D = 13、E = 14、F = 15。' +
          '整數的值是 N = ±(S<sub>k&minus;1</sub>×16<sup>k&minus;1</sup> + … + S&#8321;×16¹ + S&#8320;×16&#8304;)。',
        notesZh: [
          'k 位數最大值：16<sup>k</sup> &minus; 1；k = 5 時是 1 048 575。',
          '因為 16 = 2&#8308;，一個十六進位數字剛好是四個位元，所以一個位元組是兩個十六進位數字（00 到 FF）。',
          '9/17 的筆記只有標題，9/22 的筆記才補上內容。'
        ],
        examples: [
          {
            label: 'From the notes (9/22)',
            html:
              '<p>Hexadecimal system: base 16</p>' +
              '<p>0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 &rarr; 0 1 2 3 4 5 6 7 8 9 A B C D E F</p>' +
              '<p>maximum value with k digits: 16<sup>k</sup> &minus; 1; k = 5 &rarr; 1 048 575</p>'
          },
          { label: 'Reading one', html: '<p>(EA)&#8321;&#8326; = 14&times;16 + 10 = 234 &nbsp;&nbsp; (FF)&#8321;&#8326; = 255</p>' }
        ]
      },

      {
        id: 'number-system-comparison',
        term: 'Comparison of the four number systems',
        zh: '四種進位制的比較',
        aliases: ['comparison', 'table 2.2', 'decimal binary octal hexadecimal', '對照表'],
        tags: ['ch2.2', 'number systems'],
        def:
          'The same values written in <a href="#decimal-system">decimal</a>, <a href="#binary-system">binary</a>, ' +
          '<a href="#octal-system">octal</a> and <a href="#hexadecimal-system">hexadecimal</a> side by side ' +
          '(textbook Table 2.2).',
        notes: [
          'The pattern to notice: binary gains a digit at every power of two (2, 4, 8), octal rolls over ' +
            'at 8 (written 10), hex only at 16.',
          'Knowing 0–15 in all four by heart makes the <a href="#binary-octal-hex-conversion">grouping ' +
            'conversions</a> quick.'
        ],
        defZh: '同一組數值分別用<a href="#decimal-system">十進位</a>、<a href="#binary-system">二進位</a>、<a href="#octal-system">八進位</a>、<a href="#hexadecimal-system">十六進位</a>並排寫出（課本表 2.2）。',
        notesZh: [
          '要注意的規律：二進位每到 2 的次方（2、4、8）就多一位；八進位到 8 進位（寫成 10）；十六進位要到 16 才進位。',
          '把 0–15 的四種寫法記熟，<a href="#binary-octal-hex-conversion">分組換算</a>就會很快。'
        ],
        examples: [
          {
            label: 'From the notes (Table 2.2)',
            html:
              '<table><tr><th>Decimal</th><th>Binary</th><th>Octal</th><th>Hex</th><th></th>' +
              '<th>Decimal</th><th>Binary</th><th>Octal</th><th>Hex</th></tr>' +
              '<tr><td>0</td><td>0</td><td>0</td><td>0</td><td></td><td>8</td><td>1000</td><td>10</td><td>8</td></tr>' +
              '<tr><td>1</td><td>1</td><td>1</td><td>1</td><td></td><td>9</td><td>1001</td><td>11</td><td>9</td></tr>' +
              '<tr><td>2</td><td>10</td><td>2</td><td>2</td><td></td><td>10</td><td>1010</td><td>12</td><td>A</td></tr>' +
              '<tr><td>3</td><td>11</td><td>3</td><td>3</td><td></td><td>11</td><td>1011</td><td>13</td><td>B</td></tr>' +
              '<tr><td>4</td><td>100</td><td>4</td><td>4</td><td></td><td>12</td><td>1100</td><td>14</td><td>C</td></tr>' +
              '<tr><td>5</td><td>101</td><td>5</td><td>5</td><td></td><td>13</td><td>1101</td><td>15</td><td>D</td></tr>' +
              '<tr><td>6</td><td>110</td><td>6</td><td>6</td><td></td><td>14</td><td>1110</td><td>16</td><td>E</td></tr>' +
              '<tr><td>7</td><td>111</td><td>7</td><td>7</td><td></td><td>15</td><td>1111</td><td>17</td><td>F</td></tr></table>'
          }
        ]
      },

      {
        id: 'any-base-to-decimal',
        term: 'Converting any base to decimal',
        zh: '任意進位轉十進位',
        aliases: ['conversion', 'base conversion', 'to decimal', '進位轉換', '轉十進位'],
        tags: ['ch2.2', 'conversion'],
        def:
          'Multiply each digit by its <a href="#place-value">place value</a> in the source base and add: ' +
          '<span class="mono">S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + … + S&#8320;&times;b&#8304; + ' +
          'S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> + … + S<sub>&minus;ℓ</sub>&times;b<sup>&minus;ℓ</sup></span>.',
        notes: [
          'It is just the definition of a <a href="#positional-number-system">positional number</a> ' +
            'evaluated in decimal arithmetic.',
          'Digits after the point use negative powers of b.'
        ],
        defZh: '每一位乘上它在原進位中的<a href="#place-value">位值</a>再相加：S<sub>k&minus;1</sub>×b<sup>k&minus;1</sup> + … + S&#8320;×b&#8304; + S<sub>&minus;1</sub>×b<sup>&minus;1</sup> + … + S<sub>&minus;ℓ</sub>×b<sup>&minus;ℓ</sup>。',
        notesZh: ['就是把<a href="#positional-number-system">位值制</a>的定義用十進位算出來。', '小數點後的位數用 b 的負次方。'],
        examples: [
          {
            label: 'From the notes (9/22)',
            html: '<p>any base to decimal: S<sub>k&minus;1</sub>&times;b<sup>k&minus;1</sup> + … + S&#8320;&times;b&#8304; . S<sub>&minus;1</sub>&times;b<sup>&minus;1</sup> … S<sub>&minus;k</sub>&times;b<sup>&minus;k</sup></p>'
          },
          {
            label: 'Three bases',
            html:
              '<p>(10011.1)&#8322; = 16 + 2 + 1 + 0.5 = 19.5</p>' +
              '<p>(352)&#8328; = 192 + 40 + 2 = 234 &nbsp;&nbsp; (2A)&#8321;&#8326; = 32 + 10 = 42</p>'
          }
        ]
      },

      {
        id: 'decimal-to-any-base',
        term: 'Converting decimal to any base',
        zh: '十進位轉任意進位',
        aliases: ['repeated division', 'divide by b', 'multiply by b', 'remainder', 'quotient', '除法', '餘數', '連除法', '連乘法'],
        tags: ['ch2.2', 'conversion'],
        def:
          'Convert the two parts separately. <strong>Integral part:</strong> divide by b again and again; ' +
          'the remainders are the digits, from right to left. <strong>Fractional part:</strong> multiply ' +
          'by b again and again; the integral parts that appear are the digits, from left to right.',
        notes: [
          'Integral part: stop when the quotient reaches 0 (the textbook\'s "divide by b" figure).',
          'Fractional part: stop when the fraction becomes 0 — or, since it may never become zero ' +
            '(0.1 in binary repeats forever), when enough digits have been produced.'
        ],
        defZh:
          '整數部分和小數部分分開換。<strong>整數部分：</strong>一直除以 b，餘數就是各位數字，由右往左排。' +
          '<strong>小數部分：</strong>一直乘以 b，每次得到的整數部分就是各位數字，由左往右排。',
        notesZh: [
          '整數部分：商變成 0 就停（課本「Divide by b」的圖）。',
          '小數部分：小數變成 0 就停 &mdash; 但它可能永遠不會變 0（0.1 換成二進位會無限循環），所以產生夠多位數就停。'
        ],
        examples: [
          {
            label: 'From the notes (textbook figures)',
            html:
              '<p>decimal to any base — Integer: divide by b; the remainders R give the destination digits D&#8320;, D&#8321;, …</p>' +
              '<p>Fraction: multiply by b; the integral parts I give D<sub>&minus;1</sub>, D<sub>&minus;2</sub>, …</p>' +
              '<p>Note: the fraction may never become zero. Stop when enough digits have been created.</p>'
          },
          {
            label: '35.625 to binary',
            html:
              '<p>35 &divide; 2 &rarr; remainders 1, 1, 0, 0, 0, 1 &nbsp;&rArr;&nbsp; read upward: 100011</p>' +
              '<p>0.625 &times; 2 = 1.25 &rarr; 1; 0.25 &times; 2 = 0.5 &rarr; 0; 0.5 &times; 2 = 1.0 &rarr; 1 &nbsp;&rArr;&nbsp; .101</p>' +
              '<p>35.625 = (100011.101)&#8322;</p>'
          }
        ]
      },

      {
        id: 'binary-octal-hex-conversion',
        term: 'Binary–octal–hexadecimal conversion',
        zh: '二、八、十六進位互換',
        aliases: ['binary to hex', 'binary to octal', 'octal to hex', 'grouping bits', '分組', '四位一組', '三位一組'],
        tags: ['ch2.2', 'conversion'],
        def:
          'Group the bits instead of doing arithmetic. One <a href="#hexadecimal-system">hex</a> digit = ' +
          '<strong>4 bits</strong>; one <a href="#octal-system">octal</a> digit = <strong>3 bits</strong>. ' +
          'Octal &harr; hex goes through binary.',
        notes: [
          'Group from the point outward: from the right for the integral part, padding with 0s on the left ' +
            'if a group is short.',
          'Octal to hex: write each octal digit as 3 bits, regroup in fours, read off hex digits. Hex to ' +
            'octal: 4 bits each, regroup in threes.',
          'The textbook figure the notes paste is captioned "Figure 2.11 Binary to hexadecimal conversion", ' +
            'but it shows <strong>octal</strong> digits (3 bits each) — the caption should say binary to octal.'
        ],
        defZh:
          '不用計算，改用分組。一個<a href="#hexadecimal-system">十六進位</a>數字 = <strong>4 個位元</strong>；一個<a href="#octal-system">八進位</a>數字 = <strong>3 個位元</strong>。八進位與十六進位互換時，以二進位當中間站。',
        notesZh: [
          '從小數點往外分組：整數部分從右邊開始，最左邊一組不夠就補 0。',
          '八進位轉十六進位：每個八進位數字寫成 3 個位元，改成 4 個一組，再讀出十六進位數字。十六進位轉八進位則反過來：各寫成 4 位元，再 3 個一組。',
          '筆記貼的課本圖標題寫「Figure 2.11 Binary to hexadecimal conversion」，但圖裡畫的是<strong>八進位</strong>（每 3 位元一組）&mdash; 標題應為 binary to octal。'
        ],
        examples: [
          {
            label: 'From the notes (Figure 2.12)',
            html:
              '<p>(4116)&#8328; &rarr; 100 001 001 110 &rarr; 1000 0100 1110 &rarr; (84E)&#8321;&#8326;</p>' +
              '<p>To convert from octal to hexadecimal, first convert to binary, then rearrange the bits in groups of four. ' +
              'From hexadecimal to octal, rearrange in groups of three.</p>'
          },
          {
            label: 'Binary to both',
            html: '<p>(11101010)&#8322; = 1110 1010 = (EA)&#8321;&#8326; &nbsp;&nbsp; = 011 101 010 = (352)&#8328;</p>'
          }
        ]
      },

      {
        id: 'number-of-digits',
        term: 'Number of digits',
        abbr: 'k',
        zh: '位數',
        aliases: ['digits', 'how many digits', 'log', 'ceiling', '位數', '需要幾位'],
        tags: ['ch2.2', 'number systems'],
        def:
          'How many digits the integer N needs in base b. The notes give ' +
          '<span class="mono">k = &lceil;log<sub>b</sub> N&rceil;</span>, with N the value in decimal; the exact ' +
          'formula is <span class="mono">k = &lfloor;log<sub>b</sub> N&rfloor; + 1</span> (N ≥ 1).',
        notes: [
          'Correction: &lceil;log<sub>b</sub> N&rceil; is one short whenever N is an exact power of b. N = 100 ' +
            'in decimal gives &lceil;2&rceil; = 2, but 100 has 3 digits; N = 8 in binary gives 3, but 1000&#8322; has 4. ' +
            '&lfloor;log<sub>b</sub> N&rfloor; + 1, or equivalently &lceil;log<sub>b</sub>(N + 1)&rceil;, is right every time.',
          'It is the reverse of <a href="#max-min-value">maximum value</a>: k digits reach up to b<sup>k</sup> &minus; 1, ' +
            'so N needs the smallest k with b<sup>k</sup> &minus; 1 ≥ N. See ' +
            '<a href="#digits-vs-max-min">number of digits vs. maximum / minimum</a>.',
          'Small bases need many digits: the same value takes about 3.3 times as many bits as decimal digits.'
        ],
        defZh:
          '整數 N 在底數 b 下需要幾位數。筆記給的是 k = &lceil;log<sub>b</sub> N&rceil;（N 為十進位的值）；精確的公式是 k = &lfloor;log<sub>b</sub> N&rfloor; + 1（N ≥ 1）。',
        notesZh: [
          '修正：N 剛好是 b 的次方時，&lceil;log<sub>b</sub> N&rceil; 會少一位。十進位 N = 100 得 &lceil;2&rceil; = 2，但 100 是 3 位數；二進位 N = 8 得 3，但 1000&#8322; 是 4 位。' +
            '用 &lfloor;log<sub>b</sub> N&rfloor; + 1（或 &lceil;log<sub>b</sub>(N + 1)&rceil;）才每次都對。',
          '它是<a href="#max-min-value">最大值</a>的反問題：k 位數最多到 b<sup>k</sup> &minus; 1，所以 N 需要的是讓 b<sup>k</sup> &minus; 1 ≥ N 的最小 k。見<a href="#digits-vs-max-min">位數與最大／最小值的比較</a>。',
          '底數越小，位數越多：同一個數用二進位大約是十進位位數的 3.3 倍。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>We can find the number of digits of base b by using relation k = &lceil;log<sub>b</sub> N&rceil;, N is decimal symbol of integer</p>' +
              '<p>e.g. &lceil;log&#8321;&#8320; 234&rceil; = &lceil;2.37&rceil; = 3 &nbsp;&nbsp; &lceil;log&#8322; 234&rceil; = &lceil;7.87&rceil; = 8 &rArr; (11101010)&#8322;</p>'
          },
          { label: 'A value N → digits needed, in each base', html: NUM_DIGITS_TABLE }
        ]
      },

      {
        id: 'digits-for-conversion',
        term: 'Number of digits for conversion',
        zh: '換算所需位數',
        aliases: ['conversion digits', 'destination digits', 'k log b1 / log b2', '需要幾位', '轉換位數'],
        tags: ['ch2.2', 'conversion'],
        def:
          'When a k-digit number in base b&#8321; is converted to base b&#8322;, the destination needs at least ' +
          '<span class="mono">x = &lceil;k &middot; log b&#8321; / log b&#8322;&rceil;</span> digits, so that it can hold ' +
          'the source\'s largest value.',
        notes: [
          'Where it comes from: the largest k-digit source value is b&#8321;<sup>k</sup> &minus; 1 and the largest ' +
            'x-digit destination value is b&#8322;<sup>x</sup> &minus; 1. Require b&#8322;<sup>x</sup> &minus; 1 ≥ ' +
            'b&#8321;<sup>k</sup> &minus; 1 and take logs: x ≥ k &middot; log b&#8321; / log b&#8322;.',
          'The notes label b&#8322;<sup>x</sup> &minus; 1 as "minimum"; it is the destination\'s ' +
            '<em>maximum</em> value — x is the <em>minimum number of digits</em>.',
          'Too few destination digits and the value does not fit — <a href="#overflow">overflow</a>, which ' +
            'is why the notes stress finding this minimum.'
        ],
        defZh:
          '把底數 b&#8321; 的 k 位數換成底數 b&#8322; 時，目的端至少要 x = &lceil;k · log b&#8321; / log b&#8322;&rceil; 位，才裝得下來源的最大值。',
        notesZh: [
          '推導：來源 k 位數最大是 b&#8321;<sup>k</sup> &minus; 1，目的端 x 位數最大是 b&#8322;<sup>x</sup> &minus; 1。要求 b&#8322;<sup>x</sup> &minus; 1 ≥ b&#8321;<sup>k</sup> &minus; 1，取對數：x ≥ k · log b&#8321; / log b&#8322;。',
          '筆記把 b&#8322;<sup>x</sup> &minus; 1 標成「minimum」；它其實是目的端的<em>最大值</em> &mdash; x 才是<em>最少位數</em>。',
          '目的端位數不夠，值就放不下 &mdash; 也就是<a href="#overflow">溢位</a>，所以筆記強調要先算出這個最小值。'
        ],
        examples: [
          {
            label: 'From the notes',
            html:
              '<p>If we convert one base to another, we need to know the maximum number of digits of source system and ' +
              'minimum number of digits of destination system: maximum b&#8321;<sup>k</sup> &minus; 1, minimum b&#8322;<sup>x</sup> &minus; 1</p>' +
              '<p>then b&#8322;<sup>x</sup> &minus; 1 ≥ b&#8321;<sup>k</sup> &minus; 1 &rArr; x ≥ k &middot; (log b&#8321; / log b&#8322;), x = &lceil;k &middot; (log b&#8321; / log b&#8322;)&rceil;</p>'
          },
          {
            label: 'Working it out',
            html:
              '<p>5 decimal digits &rarr; binary: x = &lceil;5 &times; 3.32&rceil; = &lceil;16.6&rceil; = 17 bits (99 999 &lt; 2<sup>17</sup> = 131 072)</p>' +
              '<p>6 hex digits &rarr; decimal: x = &lceil;6 &times; 1.204&rceil; = 8 (16<sup>6</sup> &minus; 1 = 16 777 215)</p>'
          }
        ]
      },

      {
        id: 'overflow',
        term: 'Overflow',
        zh: '溢位',
        aliases: ['overflow error', 'too many digits', '溢出'],
        tags: ['ch2.2', 'conversion'],
        def:
          'What happens when a value needs more digits than are available: it cannot be stored, and the ' +
          'result is wrong (typically the extra high digits are lost).',
        notes: [
          'The notes mention it as the reason to find the <a href="#digits-for-conversion">minimum number of ' +
            'digits for conversion</a>; the definition is filled in here.',
          'Example: 8 bits hold at most 255 (<a href="#max-min-value">2<sup>8</sup> &minus; 1</a>); storing 256 ' +
            'would need a ninth bit.'
        ],
        defZh: '數值需要的位數超過可用的位數時發生的狀況：存不下，結果會出錯（通常是最高的幾位被截掉）。',
        notesZh: [
          '筆記提到它，是為了說明為何要算出<a href="#digits-for-conversion">換算所需的最少位數</a>；定義是這裡補上的。',
          '例：8 個位元最多存到 255（<a href="#max-min-value">2<sup>8</sup> &minus; 1</a>）；要存 256 就需要第 9 個位元。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>* We have to know the minimum number of digits we need to avoid overflow while conversing.</p>' }
        ]
      },

      {
        id: 'digits-vs-max-min',
        term: 'Number of digits vs. maximum / minimum value',
        zh: '位數與最大／最小值的比較',
        aliases: ['comparison', 'digits and range', 'how big', 'how many digits', '比較', '位數', '最大值'],
        tags: ['ch2.2', 'number systems'],
        added: true,
        def:
          'Two sides of one fact. <a href="#max-min-value">Maximum / minimum value</a> asks: with ' +
          '<strong>k digits</strong> in base b, what is the biggest value? (b<sup>k</sup> &minus; 1, and ' +
          '&minus;(b<sup>k</sup> &minus; 1) with a sign.) <a href="#number-of-digits">Number of digits</a> asks the ' +
          'reverse: for a <strong>value N</strong>, how many digits? (&lfloor;log<sub>b</sub> N&rfloor; + 1.)',
        notes: [
          'They are inverse functions of each other: N fits in k digits exactly when N ≤ b<sup>k</sup> &minus; 1, ' +
            'i.e. when k ≥ log<sub>b</sub>(N + 1).',
          'Crossing a maximum costs one more digit: 999 is the largest 3-digit decimal, 1000 already needs 4; ' +
            '255 = FF is the largest 2-digit hex, 256 = 100 needs 3.',
          'Signed values have the same digit count as their size; the sign is stored separately, so the range ' +
            'is symmetric: &minus;N<sub>max</sub> to +N<sub>max</sub>.',
          '<a href="#digits-for-conversion">Digits for conversion</a> combines both: take the source\'s maximum, ' +
            'then ask how many destination digits that value needs.'
        ],
        defZh:
          '同一件事的兩面。<a href="#max-min-value">最大／最小值</a>問：底數 b、<strong>k 位數</strong>最大能到多少？（b<sup>k</sup> &minus; 1，加正負號時最小是 &minus;(b<sup>k</sup> &minus; 1)。）' +
          '<a href="#number-of-digits">位數</a>反過來問：<strong>一個值 N</strong> 要幾位數？（&lfloor;log<sub>b</sub> N&rfloor; + 1。）',
        notesZh: [
          '兩者互為反函數：N 放得進 k 位數，恰好就是 N ≤ b<sup>k</sup> &minus; 1，也就是 k ≥ log<sub>b</sub>(N + 1)。',
          '一超過最大值就要多一位：999 是十進位 3 位數的最大值，1000 就要 4 位；255 = FF 是十六進位 2 位數的最大值，256 = 100 就要 3 位。',
          '有正負號時位數不變，符號另外存，所以範圍是對稱的：&minus;N<sub>max</sub> 到 +N<sub>max</sub>。',
          '<a href="#digits-for-conversion">換算所需位數</a>就是把兩者合起來：先取來源的最大值，再問這個值在目的端要幾位。'
        ],
        examples: [
          { label: 'k digits → largest value (maximum / minimum)', html: DIGITS_MAX_TABLE },
          { label: 'value N → digits needed (number of digits)', html: NUM_DIGITS_TABLE }
        ]
      }
    ]
  });
})();
