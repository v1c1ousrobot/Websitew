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
   PARALLAX WALLPAPER + TILT
   ============================================================ */
const bgLayer = document.getElementById('bgLayer');
const tilts   = document.querySelectorAll('.tilt');
let tx = 0, ty = 0;        // target from mouse
let bx = 0, by = 0;        // current (smoothed) for bg

document.addEventListener('mousemove', e => {
  const w = innerWidth, h = innerHeight;
  tx = (e.clientX / w - 0.5);   // -0.5 … 0.5
  ty = (e.clientY / h - 0.5);
});

function loopParallax() {
  // Smooth follow
  bx += (tx - bx) * 0.08;
  by += (ty - by) * 0.08;

  // Wallpaper drifts opposite to cursor
  const bgX = -bx * 40;   // max ±20px
  const bgY = -by * 40;
  bgLayer.style.transform = `translate3d(${bgX}px, ${bgY}px, 0) scale(1.10)`;

  // Glass cards tilt slightly
  tilts.forEach(el => {
    const rotY =  bx * 6;   // ±3deg
    const rotX = -by * 6;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
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
   AERO TRAIL
   ============================================================ */
let last = 0;
function makeTrail(x, y) {
  const now = performance.now();
  if (now - last < 16) return;
  last = now;

  const t = document.createElement('div');
  t.className = 'trail';

  const hue = 185 + Math.random() * 80;   // cyan → violet
  const col = `hsl(${hue}, 100%, 74%)`;
  t.style.background = col;
  t.style.boxShadow  = `0 0 12px ${col}, 0 0 24px ${col}`;

  t.style.left = (x + (Math.random() - .5) * 12) + 'px';
  t.style.top  = (y + (Math.random() - .5) * 12) + 'px';

  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1000);
}
