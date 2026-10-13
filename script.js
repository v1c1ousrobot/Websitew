/* ============================================================
   THEME SWITCHER
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
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '68px';
    ring.style.height = '68px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '42px';
    ring.style.height = '42px';
  });
});

/* ============================================================
   AERO TRAIL (aqua → purple gradient particles)
   ============================================================ */
let last = 0;
function makeTrail(x, y) {
  const now = performance.now();
  if (now - last < 16) return;
  last = now;

  const t = document.createElement('div');
  t.className = 'trail';

  const hue = 190 + Math.random() * 70;       // 190 = cyan, 260 = purple
  const col = `hsl(${hue}, 100%, 72%)`;

  t.style.background = col;
  t.style.boxShadow  = `0 0 12px ${col}, 0 0 22px ${col}`;

  t.style.left = (x + (Math.random() - .5) * 12) + 'px';
  t.style.top  = (y + (Math.random() - .5) * 12) + 'px';

  document.body.appendChild(t);
  setTimeout(() => t.remove(), 950);
}
