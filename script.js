/* ============================================================
   THEME
   ============================================================ */
const root   = document.documentElement;
const toggle = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ============================================================
   PARALLAX + TILT
   ============================================================ */
const bgLayer = document.getElementById('bgLayer');
const tilts   = document.querySelectorAll('.tilt');
let tx = 0, ty = 0;
let bx = 0, by = 0;

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
   POPPABLE BUBBLES
   ============================================================ */
const bubbles = document.querySelectorAll('#bubbles span[data-bubble]');

bubbles.forEach(b => {
  b.addEventListener('click', e => {
    if (b.classList.contains('pop')) return;

    const rect = b.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;

    spawnDroplets(cx, cy, 14);
    b.classList.add('pop');

    setTimeout(() => {
      b.classList.remove('pop');
      b.style.animation = 'none';
      void b.offsetWidth;
      b.style.animation = '';
    }, 400);
  });
});

function spawnDroplets(x, y, count) {
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'droplet';

    const size  = 4 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 70;
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
