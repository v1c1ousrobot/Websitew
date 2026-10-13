/* ============================================================
   THEME — LIGHT IS DEFAULT
   ============================================================ */
const root   = document.documentElement;
const toggle = document.getElementById('themeToggle');

// Only override default if the user has previously chosen one
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
else root.setAttribute('data-theme', 'light');   // default = light

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
   POPPABLE BUBBLES
   ============================================================ */
const bubbleEls = document.querySelectorAll('#bubbles span[data-bubble]');

/* --- pop sound --- */
let audioCtx = null;
function playPop() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const t = audioCtx.currentTime;

    // short "pop" — sine sweep + tiny noise burst
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900 + Math.random() * 400, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.12);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.25, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  } catch (e) { /* silent fail */ }
}

/* --- click = pop --- */
bubbleEls.forEach(b => {
  // hitbox grows on touch too (whole visible bubble clickable)
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

  // Respawn after pop finishes
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
