/* ==========================================================================
   glossary.js — shared engine for the course term archive (檔案庫)
   --------------------------------------------------------------------------
   Load order in every page:
       1. assets/glossary.js      (this file — defines GLOSSARY + helpers)
       2. data/<subject>.js       (one call to GLOSSARY.register per subject)
       3. GLOSSARY.mountSubject('<id>')  or  GLOSSARY.mountPortal()

   TERM SCHEMA (see data/*.js for live examples) — every field is optional
   except id / term / zh.

   The CARD FACE IS ENGLISH ONLY. Everything Chinese (zh, zhAlt, defZh,
   notesZh) is rendered collapsed inside the 中文翻譯 <details> dropdown, so
   keep def / notes / example labels / figure captions in English.

     {
       id:     'augmented-matrix',      // unique, used for the #anchor
       term:   'Augmented matrix',      // English headword
       abbr:   'ERO',                   // optional abbreviation / symbol
       aliases:['bar', '分隔線'],        // extra words the search should hit
       tags:   ['9/8 ch1.1', 'matrix'], // first tag becomes the chapter chip

       // --- shown on the card face (English) ---
       def:    'Plain-English definition. Limited HTML is allowed.',
       notes:  ['extra bullet', 'another bullet'],
       examples:[ { label:'From the notes', html:'…' } ],
       figure: { svg:'<svg …>', caption:'English caption' },

       // --- inside the 中文翻譯 dropdown ---
       zh:     '增廣矩陣',               // Chinese translation (required)
       zhAlt:  '擴增矩陣',               // other accepted translation
       defZh:  '中文說明。',
       notesZh:['中文補充一', '中文補充二'],

       added:  true                     // true => not in the original notes
     }
   ========================================================================== */

(function () {
  'use strict';

  var SUBJECTS = [];
  var BY_ID = {};

  /* ---------- small helpers exposed to the data files ------------------- */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* M([[1,2],[3,4]])                 -> a bracketed matrix
     M([[1,1,1],[2,3,1]], [[2],[3]])  -> an augmented matrix with a divider */
  function M(rows, rhs) {
    function grid(r) {
      var cols = r[0] ? r[0].length : 0;
      var cells = r
        .map(function (row) {
          return row
            .map(function (v) {
              return '<span>' + v + '</span>';
            })
            .join('');
        })
        .join('');
      return (
        '<span class="mat__grid" style="grid-template-columns:repeat(' +
        cols +
        ',auto)">' +
        cells +
        '</span>'
      );
    }
    var inner = grid(rows);
    if (rhs) inner += '<span class="mat__bar"></span>' + grid(rhs);
    return '<span class="mat">' + inner + '</span>';
  }

  /* SYS(['a x + b y = c', 'd x + e y = f']) -> a brace-wrapped system.
     Rows are block-level <span>s, not <div>s: a <div> would break out of a
     surrounding <p> during HTML parsing and empty the brace wrapper. */
  function SYS(lines) {
    return (
      '<span class="sys">' +
      lines
        .map(function (l) {
          return '<span class="sys__row">' + l + '</span>';
        })
        .join('') +
      '</span>'
    );
  }

  /* ---------- registration ---------------------------------------------- */

  function register(subject) {
    subject.terms = subject.terms || [];
    subject.terms.forEach(function (t) {
      /* the Chinese half is indexed separately too, so a hit there can
         auto-open the collapsed translation */
      t._zhBlob = [
        stripTags(t.zh || ''),
        stripTags(t.zhAlt || ''),
        stripTags(t.defZh || ''),
        stripTags((t.notesZh || []).join(' '))
      ]
        .join('  ')
        .toLowerCase();

      t._blob = [
        stripTags(t.term || ''),
        stripTags(t.abbr || ''),
        t._zhBlob,
        (t.aliases || []).join(' '),
        (t.tags || []).join(' '),
        stripTags(t.def || ''),
        stripTags((t.notes || []).join(' ')),
        stripTags(
          (t.examples || [])
            .map(function (e) {
              return (e.label || '') + ' ' + (e.html || '');
            })
            .join(' ')
        )
      ]
        .join('  ')
        .toLowerCase();
    });
    SUBJECTS.push(subject);
    BY_ID[subject.id] = subject;
  }

  function stripTags(html) {
    return String(html).replace(/<[^>]*>/g, ' ');
  }

  /* ---------- search ---------------------------------------------------- */

  /* Every whitespace-separated token must appear somewhere in the term. */
  function tokens(q) {
    return String(q).toLowerCase().trim().split(/\s+/).filter(Boolean);
  }

  function matches(term, toks) {
    for (var i = 0; i < toks.length; i++) {
      if (term._blob.indexOf(toks[i]) === -1) return false;
    }
    return true;
  }

  /* does any token land in the Chinese half? */
  function matchesZh(term, toks) {
    for (var i = 0; i < toks.length; i++) {
      if (term._zhBlob.indexOf(toks[i]) !== -1) return true;
    }
    return false;
  }

  /* Highlight the tokens without ever touching the inside of an HTML tag. */
  function mark(html, toks) {
    if (!toks.length) return html;
    var re = new RegExp(
      '(' + toks.map(escRe).sort(byLenDesc).join('|') + ')',
      'gi'
    );
    return String(html)
      .split(/(<[^>]*>)/)
      .map(function (part) {
        if (part.charAt(0) === '<') return part;
        return part.replace(re, '<mark>$1</mark>');
      })
      .join('');
  }
  function escRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function byLenDesc(a, b) {
    return b.length - a.length;
  }

  /* ---------- rendering ------------------------------------------------- */

  var ICON_SEARCH =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.2-4.2"/></svg>';
  var ICON_BACK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';

  /* The Chinese half of a term, rendered collapsed inside a <details>.
     The card face stays entirely English; this is what the reader opens. */
  function zhHtml(t, toks) {
    var parts = [];

    if (t.zh) {
      parts.push('<p class="zh__term">' + mark(t.zh, toks));
      if (t.zhAlt)
        parts.push(' <span class="zh__alt">／' + mark(t.zhAlt, toks) + '</span>');
      parts.push('</p>');
    }
    if (t.defZh) parts.push('<p class="zh__def">' + mark(t.defZh, toks) + '</p>');
    if (t.notesZh && t.notesZh.length) {
      parts.push('<ul class="zh__notes">');
      t.notesZh.forEach(function (n) {
        parts.push('<li>' + mark(n, toks) + '</li>');
      });
      parts.push('</ul>');
    }
    if (!parts.length) return '';

    /* if the search hit lands in the Chinese half, open it so the match
       the reader searched for is actually visible */
    var open = toks.length && matchesZh(t, toks) ? ' open' : '';

    return (
      '<details class="zh"' +
      open +
      '><summary class="zh__sum">中文翻譯<span class="zh__en">Chinese</span>' +
      '</summary><div class="zh__body">' +
      parts.join('') +
      '</div></details>'
    );
  }

  /* One term = one full-width horizontal row: a left rail carrying the
     headword, and a body carrying the English explanation, then the
     collapsed Chinese translation. */
  function cardHtml(t, toks) {
    var h = ['<article class="card" id="' + esc(t.id) + '">'];

    /* ---- left rail ---- */
    h.push('<div class="card__side">');

    /* term / abbr may contain entities and light markup (I<sub>n</sub>,
       &lfloor;x&rfloor;, A&#7488;), so they go through mark() but not esc(). */
    h.push('<h2 class="card__term">' + mark(t.term, toks));
    if (t.abbr)
      h.push(' <span class="card__abbr">' + mark(t.abbr, toks) + '</span>');
    h.push('</h2>');

    h.push('<div class="card__tags">');
    if (t.tags && t.tags[0])
      h.push('<span class="tag">' + esc(t.tags[0]) + '</span>');
    if (t.added) h.push('<span class="tag tag--new">Supplement</span>');
    h.push('</div>');

    h.push('</div>');

    /* ---- body: English only ---- */
    h.push('<div class="card__body">');

    if (t.def) h.push('<p class="card__def">' + mark(t.def, toks) + '</p>');

    if (t.notes && t.notes.length) {
      h.push('<ul class="card__notes">');
      t.notes.forEach(function (n) {
        h.push('<li>' + mark(n, toks) + '</li>');
      });
      h.push('</ul>');
    }

    /* examples and figure sit side by side while the row is wide enough */
    if ((t.examples && t.examples.length) || t.figure) {
      h.push('<div class="card__extras">');

      if (t.examples && t.examples.length) {
        h.push('<div class="block block--ex">');
        h.push('<p class="block__label">Example</p>');
        t.examples.forEach(function (e) {
          h.push('<div class="ex">');
          if (e.label)
            h.push('<p class="ex__label">' + mark(e.label, toks) + '</p>');
          h.push('<div class="ex__body">' + e.html + '</div>');
          h.push('</div>');
        });
        h.push('</div>');
      }

      if (t.figure) {
        h.push('<figure class="figure">' + t.figure.svg);
        if (t.figure.caption)
          h.push('<figcaption>' + esc(t.figure.caption) + '</figcaption>');
        h.push('</figure>');
      }

      h.push('</div>');
    }

    h.push(zhHtml(t, toks));

    h.push('</div>');

    h.push('</article>');
    return h.join('');
  }

  /* ---------- theme ----------------------------------------------------- */

  var THEME_KEY = 'notes-glossary-theme';

  function readTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }
  function applyTheme(v) {
    if (v === 'dark' || v === 'light')
      document.documentElement.setAttribute('data-theme', v);
    else document.documentElement.removeAttribute('data-theme');
  }
  function initTheme() {
    applyTheme(readTheme());
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    var next;
    if (cur === 'dark') next = 'light';
    else if (cur === 'light') next = 'dark';
    else
      next = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'light'
        : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* private mode — the choice just won't stick */
    }
  }

  function themeButton() {
    var b = document.createElement('button');
    b.className = 'btn';
    b.type = 'button';
    b.innerHTML = '◐ <span>Theme</span>';
    b.title = '切換淺色／深色';
    b.addEventListener('click', toggleTheme);
    return b;
  }

  /* ---------- subject page --------------------------------------------- */

  function mountSubject(id) {
    initTheme();
    var s = BY_ID[id];
    var root = document.getElementById('app');
    if (!s) {
      root.innerHTML =
        '<div class="wrap"><p class="empty"><strong>找不到科目資料</strong>' +
        '請確認 data/ 底下的檔案已在此頁載入。</p></div>';
      return;
    }

    document.documentElement.style.setProperty('--hue', s.hue);
    document.title = s.nameZh + ' 名詞檔案庫 · ' + s.name;

    /* chapter chips come from the first tag of every term */
    var chapters = [];
    s.terms.forEach(function (t) {
      var c = t.tags && t.tags[0];
      if (c && chapters.indexOf(c) === -1) chapters.push(c);
    });

    root.innerHTML = [
      '<header class="topbar">',
      '<div class="topbar__rule"></div>',
      '<div class="wrap topbar__row">',
      '<div class="brand"><span class="brand__zh">',
      esc(s.nameZh),
      '</span><span class="brand__en">',
      esc(s.name),
      '</span></div>',
      '<div class="topbar__spacer"></div>',
      /* every subject page lives in its own folder, one level below index.html */
      '<a class="btn" href="../index.html">',
      ICON_BACK,
      '<span>科目列表</span></a>',
      '<span id="themeSlot"></span>',
      '</div>',
      '<div class="wrap tools">',
      '<label class="search">',
      ICON_SEARCH,
      '<input id="q" type="search" autocomplete="off" spellcheck="false" ',
      'placeholder="搜尋名詞、中譯、定義或範例…（例：matrix、值域、ERO）">',
      '<button class="search__clear" id="clear" type="button" title="清除" hidden>✕</button>',
      '<span class="search__kbd">/</span>',
      '</label>',
      '<div class="filters" id="filters"></div>',
      '</div>',
      '</header>',
      '<main class="wrap"><div class="cards" id="cards"></div></main>',
      '<footer class="wrap foot">',
      esc(s.nameZh),
      ' · ',
      s.terms.length,
      ' 個名詞 · 來源：',
      /* the source PDFs live in this same folder, so link straight to them */
      s.sources && s.sources.length
        ? s.sources
            .map(function (src) {
              return (
                '<a href="' +
                esc(src.file) +
                '">' +
                esc(src.label || src.file) +
                '</a>'
              );
            })
            .join('、')
        : esc(s.source || '課堂筆記'),
      '　標示「補充」者為筆記之外的補齊內容。',
      '</footer>'
    ].join('');

    document.getElementById('themeSlot').appendChild(themeButton());

    /* --- filter chips --- */
    var state = { q: '', chapter: null, addedOnly: null };
    var filters = document.getElementById('filters');
    var chips = [];

    function chip(label, onClick, pressed) {
      var b = document.createElement('button');
      b.className = 'chip';
      b.type = 'button';
      b.textContent = label;
      b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      b.addEventListener('click', onClick);
      filters.appendChild(b);
      chips.push(b);
      return b;
    }

    chip('全部', function () {
      state.chapter = null;
      sync();
    }, true);
    chapters.forEach(function (c) {
      chip(c, function () {
        state.chapter = state.chapter === c ? null : c;
        sync();
      });
    });

    var sep = document.createElement('span');
    sep.className = 'filters__sep';
    filters.appendChild(sep);

    var chipNotes = chip('只看筆記原文', function () {
      state.addedOnly = state.addedOnly === false ? null : false;
      sync();
    });
    var chipAdded = chip('只看補充', function () {
      state.addedOnly = state.addedOnly === true ? null : true;
      sync();
    });

    var count = document.createElement('span');
    count.className = 'filters__count';
    filters.appendChild(count);

    /* --- render loop --- */
    var cards = document.getElementById('cards');
    var input = document.getElementById('q');
    var clearBtn = document.getElementById('clear');

    function sync() {
      var toks = tokens(state.q);
      var list = s.terms.filter(function (t) {
        if (state.chapter && !(t.tags && t.tags[0] === state.chapter))
          return false;
        if (state.addedOnly === true && !t.added) return false;
        if (state.addedOnly === false && t.added) return false;
        return matches(t, toks);
      });

      cards.innerHTML = list.length
        ? list
            .map(function (t) {
              return cardHtml(t, toks);
            })
            .join('')
        : '<p class="empty"><strong>沒有符合的名詞</strong>' +
          '試試別的關鍵字，或改用中文／英文再找一次。</p>';

      count.textContent = list.length + ' / ' + s.terms.length + ' 個名詞';
      clearBtn.hidden = !state.q;

      chips[0].setAttribute('aria-pressed', state.chapter ? 'false' : 'true');
      chapters.forEach(function (c, i) {
        chips[i + 1].setAttribute(
          'aria-pressed',
          state.chapter === c ? 'true' : 'false'
        );
      });
      chipNotes.setAttribute(
        'aria-pressed',
        state.addedOnly === false ? 'true' : 'false'
      );
      chipAdded.setAttribute(
        'aria-pressed',
        state.addedOnly === true ? 'true' : 'false'
      );
    }

    input.addEventListener('input', function () {
      state.q = input.value;
      sync();
    });
    clearBtn.addEventListener('click', function () {
      input.value = '';
      state.q = '';
      input.focus();
      sync();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        state.q = '';
        sync();
      }
    });

    sync();

    /* deep link: subject.html#term-id */
    if (location.hash.length > 1) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView();
    }
  }

  /* ---------- portal --------------------------------------------------- */

  function mountPortal() {
    initTheme();
    var root = document.getElementById('app');

    var cards = SUBJECTS.map(function (s) {
      var added = s.terms.filter(function (t) {
        return t.added;
      }).length;
      var chapters = [];
      s.terms.forEach(function (t) {
        var c = t.tags && t.tags[0];
        if (c && chapters.indexOf(c) === -1) chapters.push(c);
      });
      return [
        '<a class="subject" style="--hue:' + s.hue + '" href="' + esc(s.page) + '">',
        '<h2 class="subject__zh">' + esc(s.nameZh) + '</h2>',
        '<p class="subject__en">' + esc(s.name) + '</p>',
        '<p class="subject__blurb">' + esc(s.blurb || '') + '</p>',
        '<div class="subject__meta">',
        '<span class="tag">' + s.terms.length + ' 個名詞</span>',
        added ? '<span class="tag tag--new">含 ' + added + ' 則補充</span>' : '',
        chapters
          .map(function (c) {
            return '<span class="tag">' + esc(c) + '</span>';
          })
          .join(''),
        '</div>',
        '<p class="subject__go">進入檔案庫 &rarr;</p>',
        '</a>'
      ].join('');
    }).join('');

    var total = SUBJECTS.reduce(function (n, s) {
      return n + s.terms.length;
    }, 0);

    root.innerHTML = [
      '<header class="topbar">',
      '<div class="topbar__rule"></div>',
      '<div class="wrap topbar__row">',
      '<div class="brand"><span class="brand__zh">課堂名詞檔案庫</span>',
      '<span class="brand__en">Course Term Archive</span></div>',
      '<div class="topbar__spacer"></div>',
      '<span id="themeSlot"></span>',
      '</div>',
      '</header>',
      '<main class="wrap">',
      '<section class="hero">',
      '<h1>選擇科目</h1>',
      '<p>每個科目都是一座獨立的名詞檔案庫：收錄筆記裡出現的專有名詞，',
      '以英文為主、附上中譯，並用文字、圖示與範例說明。',
      '進入後可用上方搜尋欄以任何關鍵字（英文、中文、符號）即時篩選。</p>',
      '</section>',
      '<section class="subjects">',
      cards ||
        '<p class="empty"><strong>還沒有任何科目</strong>在 index.html 加入該科目的 data 檔即可。</p>',
      '</section>',
      '<p class="note"><strong>要再加東西？</strong> ',
      '新增名詞：打開該科目資料夾裡的 <code>&lt;科目&gt;/&lt;科目&gt;.js</code>，',
      '複製一筆 term 物件改內容即可。',
      '新增科目：開一個新資料夾放它的 PDF，複製一份 ',
      '<code>calculus/calculus.js</code> 換掉 id／name／page／hue／terms，',
      '再複製一份科目頁 HTML，並把一行 <code>&lt;script&gt;</code> 加進 ',
      '<code>index.html</code>。詳細步驟見 <code>README.md</code>。</p>',
      '</main>',
      '<footer class="wrap foot">',
      SUBJECTS.length + ' 個科目 · 共 ' + total + ' 個名詞　·　完全離線可用，無需網路。',
      '</footer>'
    ].join('');

    document.getElementById('themeSlot').appendChild(themeButton());
  }

  /* ---------- public API ------------------------------------------------ */

  window.GLOSSARY = {
    register: register,
    mountSubject: mountSubject,
    mountPortal: mountPortal,
    subjects: SUBJECTS,
    M: M,
    SYS: SYS,
    esc: esc
  };
})();
