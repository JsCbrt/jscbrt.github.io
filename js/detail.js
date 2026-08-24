/* Game detail page: header, status panel, screenshot carousel, more games */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  const rgba = (hex, a) => {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const gameVars = (g) => ({
    '--ga': g.accent, '--ga-deep': g.accentDeep,
    '--ga-soft': rgba(g.accent, .16), '--ga-line': rgba(g.accent, .5),
    '--ga-faint': rgba(g.accent, .14),
  });
  const styleStr = (o) => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';');
  const pad = (n) => String(n).padStart(2, '0');
  const st = (s) => 'st-' + s;

  const dateLabel = (g) =>
    g.status === 'cancelled'  ? 'Cancelled · N/A' :
    g.status === 'released'   ? `Released · ${g.releaseDate}` :
                                `Planned · ${g.releaseDate}`;
  const pill = (g, sm = false) =>
    `<span class="pill ${sm ? 'sm' : ''} ${st(g.status)}"><span class="dot"></span>${STATUS[g.status].label}</span>`;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });

  $('#yr').textContent = new Date().getFullYear();

  const id = new URLSearchParams(location.search).get('game');
  const g = getGame(id);
  const main = $('#main');

  if (!g) {
    document.title = 'Game not found — Bouncebyte Studios';
    main.innerHTML = `
      <section class="nf">
        <h1>Game not found</h1>
        <p>We couldn't find that game in the lab. It may have been moved or the link is broken.</p>
        <a class="btn-store" href="index.html">← Back to all games</a>
      </section>`;
    return;
  }

  /* ---- theme the whole page with this game's accent ---- */
  document.title = `${g.title} — Bouncebyte Studios`;
  Object.assign(document.documentElement.style, {
    '--game': g.accent,
    '--game-soft': rgba(g.accent, .16),
    '--game-line': rgba(g.accent, .5),
    '--game-deep': g.accentDeep,
    '--game-faint': rgba(g.accent, .14),
  });
  main.style.cssText = styleStr(gameVars(g));

  const index = GAMES.indexOf(g) + 1;

  /* ---- screenshots ---- */
  const slides = g.shots.map((s, i) => {
    const portrait = s.ratio === 'portrait';
    const media = s.src
      ? `<img class="shot ${portrait ? 'portrait' : 'landscape'}"
              src="${s.src}" alt="${g.title} screenshot ${i + 1}">`
      : `<div class="shot placeholder ${portrait ? 'portrait' : 'landscape'} m-${g.motif}"
              role="img" aria-label="${g.title} placeholder screenshot ${i + 1}">
           <span class="shot-num">${pad(i + 1)}</span>
           <span class="shot-label">Screenshot ${pad(i + 1)}</span>
           <span class="shot-ratio">${portrait ? '9:16' : '16:9'}</span>
         </div>`;
    return `<figure class="shot-slide">${media}</figure>`;
  }).join('');

  /* ---- more from the studio ---- */
  const more = GAMES.filter((x) => x.id !== g.id).map((x) => `
    <a class="more-card" href="game.html?game=${x.id}" style="${styleStr(gameVars(x))}">
      <span class="more-art m-${x.motif}" aria-hidden="true"></span>
      <span class="more-title">${x.title}</span>
      ${pill(x, true)}
    </a>`).join('');

  main.innerHTML = `
    <section class="d-hero">
      <div class="d-art m-${g.motif}" aria-hidden="true"><span class="d-num">${pad(index)}</span></div>
      <div class="d-head">
        <p class="eyebrow">Bouncebyte Studios</p>
        <h1 class="d-title">${g.title}</h1>
        <p class="d-tag">${g.tagline}</p>
      </div>
    </section>

    <section class="d-body">
      <div class="d-about reveal">
        <h2 class="sec-title">About</h2>
        <p class="d-desc" style="margin-top:14px">${g.description}</p>
        <div class="d-chips">
          ${g.genres.map((x) => `<span class="chip">${x}</span>`).join('')}
          <span class="chip plat">${g.platform}</span>
        </div>
      </div>

      <aside class="d-status reveal" id="dStatus">
        <div class="ds-row">
          <span class="ds-label">Status</span>
          ${pill(g)}
        </div>
        <div class="ds-row">
          <span class="ds-label">Release</span>
          <span class="ds-val">${dateLabel(g)}</span>
        </div>
        <div class="ds-row">
          <span class="ds-label">Platform</span>
          <span class="ds-val">${g.platform}</span>
        </div>
        <div class="ds-prog">
          <span class="ds-label">Progress</span>
          <div class="ds-bar">
            <div class="meter ${st(g.status)}"><i style="--w:${g.progress}%"></i></div>
            <span class="meter-val ${st(g.status)}">${g.progress}%</span>
          </div>
        </div>
        ${g.link && g.status === 'released'
          ? `<a class="btn-store" href="${g.link}" target="_blank" rel="noopener">
               Visit In Store <span class="arr">↗</span></a>`
          : ''}
      </aside>
    </section>

    <section class="d-shots reveal">
      <div class="shots-head">
        <h2>Screenshots</h2>
        <span class="shots-count" id="shotCount">1 / ${g.shots.length}</span>
        <div class="shots-nav">
          <button id="shotPrev" aria-label="Previous screenshot">←</button>
          <button id="shotNext" aria-label="Next screenshot">→</button>
        </div>
      </div>
      <div class="shots-viewport" id="shotsVp">
        <div class="shots-track" id="shotsTrack">${slides}</div>
      </div>
      <div class="shots-dots" id="shotsDots">
        ${g.shots.map((_, i) =>
          `<button class="dot-b ${i === 0 ? 'on' : ''}" data-i="${i}"
                   aria-label="Go to screenshot ${i + 1}"></button>`).join('')}
      </div>
    </section>

    <section class="d-more reveal">
      <h2>More from Bouncebyte</h2>
      <div class="more-row">${more}</div>
    </section>`;

  /* ---- reveals + progress animation ---- */
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  requestAnimationFrame(() => requestAnimationFrame(() =>
    $('#dStatus').classList.add('bars-in')));

  /* ---- carousel ---- */
  const track   = $('#shotsTrack');
  const vp      = $('#shotsVp');
  const dots    = Array.from(document.querySelectorAll('#shotsDots .dot-b'));

  const countEl = $('#shotCount');
  const total   = g.shots.length;
  let idx = 0;

  function go(i) {
    idx = (i + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    countEl.textContent = `${idx + 1} / ${total}`;
    dots.forEach((d, j) => d.classList.toggle('on', j === idx));
  }

  $('#shotPrev').addEventListener('click', () => go(idx - 1));
  $('#shotNext').addEventListener('click', () => go(idx + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(+d.dataset.i)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  go(idx - 1);
    if (e.key === 'ArrowRight') go(idx + 1);
  });

  /* swipe */
  let x0 = null;
  vp.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  vp.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  vp.addEventListener('pointercancel', () => { x0 = null; });
})();