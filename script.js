/* ============================================================
   THEME — LIGHT IS DEFAULT
   ============================================================ */
const root   = document.documentElement;
const toggle = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
else root.setAttribute('data-theme', 'light');

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ============================================================
   BACKGROUND MUSIC — starts on first click (browser rule)
   ============================================================ */
const music = document.getElementById('bgMusic');
if (music) {
  music.volume = 0.35;

  const startMusic = () => {
    music.play().catch(() => {});
    window.removeEventListener('pointerdown', startMusic);
    window.removeEventListener('keydown', startMusic);
  };
  window.addEventListener('pointerdown', startMusic);
  window.addEventListener('keydown', startMusic);
}

/* Mute button */
const muteBtn = document.getElementById('muteToggle');
if (muteBtn && music) {
  muteBtn.addEventListener('click', e => {
    e.stopPropagation();
    music.muted = !music.muted;
    muteBtn.classList.toggle('muted', music.muted);
  });
}

/* ============================================================
   PARALLAX + TILT
   ============================================================ */
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

  bgLayer.style.transform = `translate3d(${-bx*40}px, ${-by*40}px, 0) scale(1.10)`;

  tilts.forEach(el => {
    el.style.transform =
      `perspective(900px) rotateX(${-by*6}deg) rotateY(${bx*6}deg) translateZ(0)`;
  });

  requestAnimationFrame(loopParallax);
}
loopParallax();

/* ============================================================
   CURSOR
   ============================================================ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = innerWidth / 2, my = innerHeight / 2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
  makeTrail(mx, my);
});

(function animateRing(){
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '72px';
    ring.style.height = '72px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '44px';
    ring.style.height = '44px';
  });
});

/* ============================================================
   TRAIL
   ============================================================ */
let last = 0;
function makeTrail(x, y) {
  const now = performance.now();
  if (now - last < 16) return;
  last = now;

  const t = document.createElement('div');
  t.className = 'trail';
  const hue = 185 + Math.random() * 80;
  const col = `hsl(${hue}, 100%, 74%)`;
  t.style.background = col;
  t.style.boxShadow  = `0 0 12px ${col}, 0 0 24px ${col}`;
  t.style.left = (x + (Math.random() - .5) * 12) + 'px';
  t.style.top  = (y + (Math.random() - .5) * 12) + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1000);
}

/* ============================================================
   POP SOUND — custom pop.mp3 with random pitch 0.75 → 1.3
   ============================================================ */
const popSfx = new Audio('pop.mp3');
popSfx.preload = 'auto';

function playPop() {
  try {
    // clone so rapid pops can overlap
    const s = popSfx.cloneNode();
    s.volume = 0.45 + Math.random() * 0.2;              // slight volume variation
    s.playbackRate = 0.75 + Math.random() * (1.3 - 0.75); // 0.75 → 1.30
    // some browsers need the pitch-preservation flag off to honor playbackRate
    s.preservesPitch = false;
    s.mozPreservesPitch = false;
    s.webkitPreservesPitch = false;
    s.play().catch(() => {});
  } catch (e) { /* silent fail */ }
}

/* ============================================================
   POPPABLE BUBBLES
   ============================================================ */
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
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 20;

    d.style.width  = size + 'px';
    d.style.height = size + 'px';
    d.style.left   = x + 'px';
    d.style.top    = y + 'px';
    d.style.setProperty('--dx', dx + 'px');
    d.style.setProperty('--dy', dy + 'px');
    d.style.animationDuration = (0.55 + Math.random() * 0.35) + 's';

    document.body.appendChild(d);
    setTimeout(() => d.remove(), 900);
  }
}
