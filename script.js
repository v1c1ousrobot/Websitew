/* ============================================================
   THEME
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
   MUSIC + SOUND MENU
   ============================================================ */
try {
  const music     = document.getElementById('bgMusic');
  const soundBtn  = document.getElementById('soundBtn');
  const soundMenu = document.getElementById('soundDropdown');

  if (music && soundBtn && soundMenu) {

    // Default = 0.5 (Medium). Remember last choice.
    const savedVol = localStorage.getItem('volume');
    const startVol = savedVol !== null ? parseFloat(savedVol) : 0.5;
    music.volume = startVol;
    soundBtn.classList.toggle('muted', startVol === 0);

    function updateActive(vol) {
      soundMenu.querySelectorAll('button').forEach(btn => {
        const v = parseFloat(btn.dataset.volume);
        btn.classList.toggle('active', Math.abs(v - vol) < 0.01);
      });
    }
    updateActive(startVol);

    // Autoplay on first user interaction (browser rule)
    const startMusic = () => {
      music.play().catch(() => {});
      window.removeEventListener('pointerdown', startMusic);
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
    window.addEventListener('pointerdown', startMusic);
    window.addEventListener('keydown', startMusic);
    window.addEventListener('touchstart', startMusic);

    // Toggle dropdown
    soundBtn.addEventListener('click', e => {
      e.stopPropagation();
      soundMenu.classList.toggle('open');
    });

    // Pick a level
    soundMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const vol = parseFloat(btn.dataset.volume);
        music.volume = vol;
        localStorage.setItem('volume', vol);
        soundBtn.classList.toggle('muted', vol === 0);
        updateActive(vol);
        soundMenu.classList.remove('open');
        music.play().catch(() => {});
      });
    });

    // Click outside closes
    document.addEventListener('click', e => {
      if (!soundMenu.contains(e.target) && !soundBtn.contains(e.target)) {
        soundMenu.classList.remove('open');
      }
    });
  }
} catch (e) { console.warn('sound menu:', e); }

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

  (function loopParallax() {
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
  })();
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
   POP SFX — pitch 0.75 → 1.30
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
    } catch (_) {}
    s.playbackRate = 0.75 + Math.random() * 0.55;
    s.play().catch(() => {});
  } catch (e) { console.warn('pop:', e); }
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
