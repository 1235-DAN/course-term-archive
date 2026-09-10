/* ==========================================================================
   computer-science.js — 計算機概論 term data
   Source notes: 計算機概論9_10.pdf  (9/10, ch 1.1)

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

  GLOSSARY.register({
    id: 'computer-science',
    name: 'Introduction to Computer Science',
    nameZh: '計算機概論',
    page: 'computer-science/computer-science.html', // relative to index.html
    hue: 290, // violet
    // every source PDF sits in this same folder; the footer links to each one
    sources: [{ file: '計算機概論9_10.pdf', label: '計算機概論9_10.pdf（9/10 ch1.1）' }],
    blurb: '電腦的兩種基本模型 — 圖靈模型與馮紐曼模型，以及馮紐曼電腦裡的四個子系統。',

    terms: [
      /* ============================================ models */
      {
        id: 'turing-model',
        term: 'Turing model',
        zh: '圖靈模型',
        aliases: ['turing', 'alan turing', 'programmable data processor', '圖靈機'],
        tags: ['9/10 ch1.1', 'models'],
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
        tags: ['9/10 ch1.1', 'models'],
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
          'Instructions are fetched from memory and executed one after another (sequential ' +
            'execution).',
          'Background: proposed by John von Neumann around 1944–45.'
        ],
        defZh:
          '一種電腦設計：<strong>程式和資料存放在同一個記憶體裡</strong>。機器分成四個子系統 &mdash; ' +
          '<a href="#memory">記憶體</a>、<a href="#alu">算術邏輯單元</a>、<a href="#control-unit">控制單元</a>、' +
          '<a href="#io-subsystem">輸入／輸出</a> &mdash; 之後幾乎所有電腦都照這個架構。',
        notesZh: [
          '因為程式本身也只是記憶體裡的內容，要換工作只要載入另一個程式：不必重新接線、也不必從外部更換。' +
            '這個想法有自己的名字：<a href="#stored-program-concept">內儲程式概念</a>。',
          '指令從記憶體取出後一條接一條依序執行（sequential execution）。',
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

      /* ============================================ the four subsystems */
      {
        id: 'memory',
        term: 'Memory',
        zh: '記憶體',
        zhAlt: '主記憶體',
        aliases: ['main memory', 'ram', 'storage', '儲存'],
        tags: ['9/10 ch1.1', 'subsystems'],
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
        tags: ['9/10 ch1.1', 'subsystems'],
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
          { label: 'From the notes', html: '<p>Arithmetic logic unit (ALU): Doing calculate and logic operation</p>' },
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
        tags: ['9/10 ch1.1', 'subsystems'],
        def:
          'The subsystem that <strong>controls the operation of the ALU, the memory and the ' +
          'input/output subsystem</strong> — it decides what happens next, and when.',
        notes: [
          'It does no calculating itself. It fetches each instruction of the program from ' +
            'memory, works out what it asks for, and directs the other subsystems to carry it out.',
          'Control unit + <a href="#alu">ALU</a> = <a href="#cpu">CPU</a>.'
        ],
        defZh:
          '<strong>控制 ALU、記憶體與輸入／輸出子系統運作</strong>的子系統 &mdash; 由它決定下一步做什麼、什麼時候做。',
        notesZh: [
          '它本身不做計算。它從記憶體逐條取出程式指令，判斷指令要做什麼，再指揮其他子系統去執行。',
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
        tags: ['9/10 ch1.1', 'subsystems'],
        def:
          'The subsystem that connects the computer to the outside world: it accepts ' +
          '<strong>input data</strong> and delivers <strong>output data</strong>.',
        notes: [
          'The notes do not define it separately — it appears as "Input / output" in Figure 1.5 ' +
            'and as "I/O" in the control-unit definition. The definition is filled in here.',
          'Input devices: keyboard, mouse, scanner. Output devices: monitor, printer.',
          'Secondary storage such as disks is usually counted here too: it keeps programs and ' +
            'data when the power is off, unlike <a href="#memory">memory</a>.'
        ],
        defZh: '讓電腦和外界溝通的子系統：負責接收<strong>輸入資料</strong>、送出<strong>輸出資料</strong>。',
        notesZh: [
          '筆記沒有單獨定義它 &mdash; 它出現在 Figure 1.5 裡的「Input / output」，以及控制單元定義裡的「I/O」。定義是這裡補上的。',
          '輸入裝置：鍵盤、滑鼠、掃描器。輸出裝置：螢幕、印表機。',
          '硬碟這類輔助儲存通常也算在這裡：和<a href="#memory">記憶體</a>不同，它斷電後仍保留程式與資料。'
        ],
        examples: [
          { label: 'From the notes', html: '<p>Figure 1.5: "Input / output"</p><p>Control Unit: … ALU, Memory and I/O</p>' }
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
        tags: ['9/10 ch1.1', 'subsystems'],
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
        tags: ['9/10 ch1.1', 'models'],
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
        aliases: ['instructions', 'software', '指令', '軟體'],
        tags: ['9/10 ch1.1', 'models'],
        added: true,
        def: 'A set of instructions that tells the computer what to do with the data.',
        notes: [
          'Why this is here: the Turing-model diagram in the notes feeds a "Program" box into ' +
            'the computer without defining it.',
          'Where it lives is the whole difference between the two models: outside the machine ' +
            'in the <a href="#turing-model">Turing model</a>, in memory next to the data in the ' +
            '<a href="#von-neumann-model">von Neumann model</a>.'
        ],
        defZh: '一組告訴電腦要如何處理資料的指令。',
        notesZh: [
          '為什麼補這個：筆記裡的圖靈模型圖把一個「Program」方塊接進電腦，但沒有定義它。',
          '它放在哪裡正是兩種模型的差別：<a href="#turing-model">圖靈模型</a>在機器外面，' +
            '<a href="#von-neumann-model">馮紐曼模型</a>放在記憶體裡、和資料在一起。'
        ]
      }
    ]
  });
})();
