/* ---------- Theme switcher ---------- */
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

// Load saved theme
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ---------- Cursor ---------- */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = window.innerWidth  / 2;
let my = window.innerHeight / 2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
  makeTrail(mx, my);
});

(function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '64px';
    ring.style.height = '64px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '38px';
    ring.style.height = '38px';
  });
});

/* ---------- White trail ---------- */
let last = 0;
function makeTrail(x, y) {
  const now = performance.now();
  if (now - last < 18) return;
  last = now;

  const t = document.createElement('div');
  t.className = 'trail';

  // Color depends on theme: white in dark, dark in light
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  const col   = light ? '#0d1117' : '#ffffff';
  t.style.background = col;
  t.style.boxShadow  = `0 0 10px ${col}, 0 0 18px ${col}`;

  t.style.left = (x + (Math.random() - .5) * 10) + 'px';
  t.style.top  = (y + (Math.random() - .5) * 10) + 'px';

  document.body.appendChild(t);
  setTimeout(() => t.remove(), 900);
}
