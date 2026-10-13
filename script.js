const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = window.innerWidth / 2;
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

// Grow ring on hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '65px';
    ring.style.height = '65px';
    ring.style.borderColor = '#ffffff';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '38px';
    ring.style.height = '38px';
    ring.style.borderColor = 'rgba(255,255,255,.6)';
  });
});

// White trail
let lastTrail = 0;
function makeTrail(x, y) {
  const now = performance.now();
  if (now - lastTrail < 18) return;
  lastTrail = now;

  const t = document.createElement('div');
  t.className = 'trail';
  t.style.left = (x + (Math.random() - 0.5) * 10) + 'px';
  t.style.top  = (y + (Math.random() - 0.5) * 10) + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 900);
}
