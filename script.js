/* ============================================================
   THEME — LIGHT IS DEFAULT
   ============================================================ */
try {
  const root   = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved  = localStorage.getItem('theme');
  root.setAttribute('data-theme', saved || 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
} catch (e) { console.warn('theme:', e); }

/* ============================================================
   BACKGROUND MUSIC — starts on first click
   ============================================================ */
let music = null;
try {
  music = document.getElementById('bgMusic');
  if (music) {
    music.volume = 0.35;
    const startMusic = () => {
      const p = music.play();
      if (p && p.catch) p.catch(err => console.warn('music:', err));
      window.removeEventListener('pointerdown', startMusic);
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
    window.addEventListener('pointerdown', startMusic);
    window.addEventListener('keydown', startMusic);
    window.addEventListener('touchstart', startMusic);

    const muteBtn = document.getElementById('muteToggle');
    if (muteBtn) {
      muteBtn.addEventListener('click', e => {
        e.stopPropagation();
        music.muted = !music.muted;
        muteBtn.classList.toggle('muted', music.muted);
      });
    }
  }
} catch (e) { console.warn('music setup:', e); }

/* ============================================================
   PARALLAX + TILT
   ============================================================ */
try {
  const bgLayer = document.getElementById('bgLayer');
  const tilts   = document.querySelectorAll('.tilt');
  let tx = 0, ty = 0, bx = 0, by = 0;

  document.addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth  - 0.5);
    ty = (e.clientY / innerHeight - 0.5);
  });

  function loopParallax() {
    bx += (tx - bx) * 0.08;
    by += (ty - by) * 0.08;
    if (bgLayer) {
      bgLayer.style.transform = `translate3d(${-bx*40}px, ${-by*40}px, 0) scale(1.10)`;
    }
    tilts.forEach(el => {
      el.style.transform =
        `perspective(900px) rotateX(${-by*6}deg) rotateY(${bx*6}deg) translateZ(0)`;
    });
    requestAnimationFrame(loopParallax);
  }
  loopParallax();
} catch (e) { console.warn('parallax:', e); }

/* ============================================================
   CURSOR + TRAIL
   ============================================================ */
try {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let lastTrail = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    const now = performance.now();
    if (now - lastTrail < 16) return;
    lastTrail = now;
    const t = document.createElement('div');
    t.className = 'trail';
    const hue = 185 + Math.random() * 80;
    const col = `hsl(${hue}, 100%, 74%)`;
    t.style.background = col;
    t.style.boxShadow  = `0 0 12px ${col}, 0 0 24px ${col}`;
    t.style.left = (mx + (Math.random() - .5) * 12) + 'px';
    t.style.top  = (my + (Math.random() - .5) * 12) + 'px';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1000);
  });

  (function animateRing(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (ring) { ring.style.width = '72px'; ring.style.height = '72px'; }
    });
    el.addEventListener('mouseleave', () => {
      if (ring) { ring.style.width = '44px'; ring.style.height = '44px'; }
    });
  });
} catch (e) { console.warn('cursor:', e); }

/* ============================================================
   POP SOUND — pitch 0.75 → 1.30
   ============================================================ */
const popSfx = new Audio('pop.mp3');
popSfx.preload = 'auto';

function playPop() {
  try {
    const s = popSfx.cloneNode();
    s.volume = 0.45 + Math.random() * 0.2;
    try {
      s.preservesPitch = false;
      s.mozPreservesPitch = false;
      s.webkitPreservesPitch = false;
    } catch(_) {}
    s.playbackRate = 0.75 + Math.random() * 0.55; // 0.75 → 1.30
    s.play().catch(err => console.warn('pop:', err));
  } catch (e) { console.warn('playPop:', e); }
}

/* ============================================================
   POPPABLE BUBBLES
   ============================================================ */
try {
  const bubbleEls = document.querySelectorAll('#bubbles span[data-bubble]');
  bubbleEls.forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      popBubble(b);
    });
  });

  function popBubble(b) {
    if (b.classList.contains('pop')) return;
    const rect = b.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    spawnDroplets(cx, cy, 16);
    playPop();
    b.classList.add('pop');
    setTimeout(() => {
      b.classList.remove('pop');
      b.style.animation = 'none';
      void b.offsetWidth;
      b.style.animation = '';
    }, 450);
  }

  function spawnDroplets(x, y, count) {
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'droplet';
      const size  = 4 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      const dist  = 40 + Math.random() * 80;
      d.style.width  = size + 'px';
      d.style.height = size + 'px';
      d.style.left   = x + 'px';
      d.style.top    = y + 'px';
      d.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      d.style.setProperty('--dy', (Math.sin(angle) * dist - 20) + 'px');
      d.style.animationDuration = (0.55 + Math.random() * 0.35) + 's';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 900);
    }
  }
} catch (e) { console.warn('bubbles:', e); }
