const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  makeTrail(mx, my);
});

function loop() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(loop);
}
loop();

let last = 0;
function makeTrail(x, y) {
  if (performance.now() - last < 20) return;
  last = performance.now();
  const t = document.createElement('div');
  t.className = 'trail';
  const hue = 180 + Math.random() * 100;
  t.style.background = 'hsl(' + hue + ', 100%, 60%)';
  t.style.boxShadow = '0 0 10px hsl(' + hue + ', 100%, 60%)';
  t.style.left = x + 'px';
  t.style.top = y + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 900);
}