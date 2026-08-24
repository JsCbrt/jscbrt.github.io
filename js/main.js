/* Landing page: hero carousel + status filters + game grid */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */

  const rgba = (hex, a) => {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };

  const gameVars = (g) => ({
    '--ga':       g.accent,
    '--ga-deep':  g.accentDeep,
    '--ga-soft':  rgba(g.accent, .16),
    '--ga-line':  rgba(g.accent, .5),
    '--ga-faint': rgba(g.accent, .14),
  });
  const styleStr = (o) => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';');
  const pad = (n) => String(n).padStart(2, '0');
  const st = (s) => 'st-' + s;

  const dateLabel = (g) =>
    g.status === 'cancelled'  ? 'Cancelled · N/A' :
    g.status === 'released'   ? `Released · ${g.releaseDate}` :
                                `Planned · ${g.releaseDate}`;   // planned & in-development

  const pill = (g, sm = false) =>
    `<span class="pill ${sm ? 'sm' : ''} ${st(g.status)}"><span class="dot"></span>${STATUS[g.status].label}</span>`;

  /* scroll reveal (also triggers progress-bar animation) */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  const reveal = (el) => io.observe(el);

  /* ============================ HERO ============================ */

  const heroGames = GAMES.filter((g) =>
    g.status === 'in-development' || g.status === 'planned');

  const hero     = $('#hero');
  const heroMain = $('#heroMain');
  let heroIdx = -1;
  let timer = null;

  function setHero(g, i) {
    heroIdx = i;
    Object.assign(heroMain.style, gameVars(g));
    hero.style.setProperty('--hg', g.accent);          // ambient glow follows the game

    const art = $('#heroArt');
    art.className = 'hero-art m-' + g.motif;
    $('#heroNum').textContent = pad(i + 1);

    $('#heroCopy').innerHTML = `
      <p class="eyebrow">${g.status === 'in-development'
        ? 'In development'
        : 'Planned · ' + g.releaseDate}</p>
      <h1 class="hero-title">${g.title}</h1>
      <p class="hero-short">${g.short}</p>
      <div class="hero-meta">
        ${pill(g)}
        <span class="meta-date">${dateLabel(g)}</span>
      </div>
      <div class="hero-progress">
        <div class="meter ${st(g.status)}"><i style="--w:${g.progress}%"></i></div>
        <span class="meter-val ${st(g.status)}">${g.progress}%</span>
      </div>
      <span class="hero-cta">View details <span class="arr">→</span></span>`;

    heroMain.href = `game.html?game=${g.id}`;
    heroMain.removeAttribute('aria-disabled');
    heroMain.classList.remove('bars-in');
    requestAnimationFrame(() => requestAnimationFrame(() =>
      heroMain.classList.add('bars-in')));

    $$('.side-item').forEach((el, j) => {
      el.classList.toggle('active', j === i);
      el.setAttribute('aria-pressed', j === i);
    });
  }

  function renderSide() {
    const list = $('#sideList');
    const count = $('#heroCount');

    if (!heroGames.length) {
      $('#heroContent').hidden = true;
      $('#heroEmpty').hidden = false;
      heroMain.classList.add('disabled');
      heroMain.removeAttribute('href');
      heroMain.setAttribute('aria-disabled', 'true');
      $('#heroArt').className = 'hero-art';
      $('#heroNum').textContent = '';
      count.textContent = '';
      list.innerHTML = '<p class="side-none">Nothing in the lab right now.</p>';
      return;
    }

    $('#heroContent').hidden = false;
    $('#heroEmpty').hidden = true;
    count.textContent = heroGames.length === 1
      ? '1 game in the pipeline'
      : `${heroGames.length} games in the pipeline`;

    list.innerHTML = heroGames.map((g, i) => `
      <button class="side-item ${st(g.status)}" data-i="${i}"
              style="${styleStr(gameVars(g))}" aria-pressed="${i === 0}">
        <span class="thumb m-${g.motif}" aria-hidden="true">${returnFirstScreenshotIfPresent(g)}</span>
        <span class="side-mid">
          <span class="side-title">${g.title}</span>
          ${pill(g, true)}
          <span class="side-date">${dateLabel(g)}</span>
        </span>
        <span class="side-right">
          <span class="meter-val ${st(g.status)}">${g.progress}%</span>
          <span class="meter sm ${st(g.status)}"><i style="--w:${g.progress}%"></i></span>
        </span>
      </button>`).join('');

    $$('.side-item', list).forEach((btn) =>
      btn.addEventListener('click', () => {
        setHero(heroGames[+btn.dataset.i], +btn.dataset.i);
        restartTimer();
      }));

    setHero(heroGames[0], 0);
  }

  function returnFirstScreenshotIfPresent(g){
    if(!g || !g.shots || !g.shots.length || !g.shots[0].src){
      return "";
    }
    else {return "<img width='100%' src='"+ g.shots[0].src +"'>";}
  }

  function startTimer() {
    if (heroGames.length < 2 || reduced) return;
    stopTimer();
    timer = setInterval(() =>
      setHero(heroGames[(heroIdx + 1) % heroGames.length], (heroIdx + 1) % heroGames.length),
    9000);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function restartTimer() { startTimer(); }

  hero.addEventListener('mouseenter', stopTimer);
  hero.addEventListener('mouseleave', startTimer);

  /* ============================ FILTERS + GRID ============================ */

  const grid      = $('#grid');
  const emptyMsg  = $('#gridEmpty');
  const gridCount = $('#gridCount');
  let activeFilter = 'all';

  const FILTERS = [
    ['all', 'All'], ['released', 'Released'], ['in-development', 'In Development'],
    ['planned', 'Planned'], ['cancelled', 'Cancelled'],
  ];

  function buildFilters() {
    $('#filters').innerHTML = FILTERS.map(([key, label]) => {
      const n = key === 'all' ? GAMES.length : GAMES.filter((g) => g.status === key).length;
      return `<button class="filter ${key === 'all' ? 'st-all active' : st(key)}"
                data-f="${key}" aria-pressed="${key === 'all'}">
                ${label}<sup>${n}</sup></button>`;
    }).join('');

    $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
      activeFilter = btn.dataset.f;
      $$('.filter').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on);
      });
      renderGrid();
    }));
  }

  function cardHTML(g, i) {
    //
    var elementToAdd;
    if(g.shots[0].src != null){
        elementToAdd = "<img src=" + g.shots[0].src + " width=100%>";
    }
    else{
        elementToAdd = "<div class='card-art m-"+g.motif+"' aria-hidden='true'></div>"
    }
    return `
    <a class="card reveal ${g.status === 'cancelled' ? 'is-cancelled' : ''}"
       href="game.html?game=${g.id}" data-status="${g.status}"
       style="${styleStr(gameVars(g))}; --d:${(i % 6) * 70}ms">
        <div class="card-art aria-hidden="true">
        ${elementToAdd}
        <span class="card-num">${pad(i + 1)}</span>
        <span class="card-genres">${g.genres.map((x) => `<i>${x}</i>`).join('')}</span>
        ${g.status === 'cancelled' ? '<span class="stamp st-cancelled">Cancelled</span>' : ''}
        <span class="card-hint">Details →</span>
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${g.title}</h3>
          ${pill(g, true)}
        </div>
        <p class="card-tag">${g.tagline}</p>
        <p class="card-short">${g.short}</p>
        <div class="card-meter">
          <div class="meter ${st(g.status)}"><i style="--w:${g.progress}%"></i></div>
          <span class="meter-val ${st(g.status)}">${g.progress}%</span>
        </div>
        <div class="card-foot">
          <span class="meta-date">${dateLabel(g)}</span>
          <span class="meta-plat">${g.platform}</span>
        </div>
      </div>
    </a>`;
  }

  function renderGrid() {
    const list = activeFilter === 'all'
      ? GAMES
      : GAMES.filter((g) => g.status === activeFilter);

    grid.innerHTML = list.map((g) => cardHTML(g, GAMES.indexOf(g) + 1)).join('');
    gridCount.textContent = `${list.length} ${list.length === 1 ? 'game' : 'games'}`;
    emptyMsg.hidden = list.length > 0;
    $$('.card', grid).forEach(reveal);
  }

  /* ============================ INIT ============================ */

  $('#yr').textContent = new Date().getFullYear();
  renderSide();
  buildFilters();
  renderGrid();
  startTimer();
})();