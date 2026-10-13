/* ---------- Themes ---------- */
:root {
  --bg:            #0d1117;   /* GitHub dark */
  --bg-2:          #161b22;
  --panel:         rgba(255,255,255,.03);
  --panel-border:  rgba(255,255,255,.08);
  --text:          #e6edf3;
  --text-dim:      #8b949e;
  --accent:        #ffffff;
  --accent-soft:   rgba(255,255,255,.08);
  --accent-glow:   rgba(255,255,255,.35);
  --shadow:        0 0 0 1px rgba(255,255,255,.06), 0 10px 40px rgba(0,0,0,.6);
}

[data-theme="light"] {
  --bg:            #f6f8fa;
  --bg-2:          #ffffff;
  --panel:         rgba(0,0,0,.02);
  --panel-border:  rgba(0,0,0,.08);
  --text:          #0d1117;
  --text-dim:      #57606a;
  --accent:        #0d1117;
  --accent-soft:   rgba(0,0,0,.06);
  --accent-glow:   rgba(0,0,0,.2);
  --shadow:        0 0 0 1px rgba(0,0,0,.06), 0 10px 40px rgba(0,0,0,.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
  cursor: none;
  overflow-x: hidden;
  transition: background .35s ease, color .35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
}

/* Subtle radial glow behind everything */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, var(--accent-soft), transparent 60%),
    radial-gradient(circle at 50% 100%, var(--accent-soft), transparent 60%);
  pointer-events: none;
  z-index: 0;
}

/* ---------- Theme switcher ---------- */
.theme-toggle {
  position: fixed;
  top: 18px;
  left: 18px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--bg-2);
  border: 1px solid var(--panel-border);
  color: var(--text);
  font-size: 20px;
  cursor: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform .2s ease, box-shadow .25s ease, background .35s ease, color .35s ease;
  box-shadow: var(--shadow);
}
.theme-toggle:hover { transform: scale(1.1); box-shadow: 0 0 25px var(--accent-glow); }
.theme-toggle .icon { position: absolute; transition: opacity .25s ease, transform .35s ease; }
.theme-toggle .sun   { opacity: 0; transform: rotate(-90deg) scale(.5); }
.theme-toggle .moon  { opacity: 1; transform: rotate(0)      scale(1); }
[data-theme="light"] .theme-toggle .sun  { opacity: 1; transform: rotate(0)     scale(1); }
[data-theme="light"] .theme-toggle .moon { opacity: 0; transform: rotate(90deg) scale(.5); }

/* ---------- Layout ---------- */
.wrapper {
  position: relative;
  z-index: 2;
  max-width: 520px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  text-align: center;
}

/* Profile */
.profile { display: flex; flex-direction: column; align-items: center; gap: 6px; }

.avatar {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--panel-border);
  box-shadow: 0 0 30px var(--accent-glow), 0 0 60px rgba(255,255,255,.08);
  margin-bottom: 8px;
  transition: box-shadow .35s ease;
}

.name {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--text);
  text-shadow: 0 0 25px var(--accent-glow);
}

.handle {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-dim);
}

/* Bio card */
.bio {
  padding: 22px 26px;
  border-radius: 14px;
  background: var(--panel);
  border: 1px solid var(--panel-border);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--text);
  transition: background .35s, border .35s, box-shadow .35s;
}

/* Buttons */
.buttons { display: flex; flex-direction: column; gap: 11px; }

.btn {
  display: block;
  padding: 15px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: .5px;
  text-decoration: none;
  color: var(--text);
  background: var(--bg-2);
  border: 1px solid var(--panel-border);
  transition: transform .15s ease, box-shadow .25s ease, background .25s ease, border-color .25s;
  box-shadow: var(--shadow);
}
.btn:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 0 25px var(--accent-glow);
}

/* Primary (Posh Launcher) — inverted color scheme */
.btn.primary {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}
.btn.primary:hover {
  box-shadow: 0 0 35px var(--accent-glow);
}

/* Discord */
.btn.discord {
  color: #fff;
  background: #5865f2;
  border-color: #5865f2;
}
.btn.discord:hover {
  background: #4752c4;
  border-color: #4752c4;
  box-shadow: 0 0 30px rgba(88,101,242,.6);
}

/* ---------- Cursor (white in dark, black in light) ---------- */
.cursor-dot, .cursor-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: background .35s, box-shadow .35s, border-color .35s;
}

.cursor-dot {
  width: 8px; height: 8px;
  background: #ffffff;
  box-shadow: 0 0 12px #ffffff, 0 0 22px rgba(255,255,255,.6);
}
[data-theme="light"] .cursor-dot {
  background: #0d1117;
  box-shadow: 0 0 12px #0d1117, 0 0 22px rgba(0,0,0,.4);
}

.cursor-ring {
  width: 38px; height: 38px;
  border: 2px solid rgba(255,255,255,.6);
  box-shadow: 0 0 15px rgba(255,255,255,.35);
  transition: width .15s, height .15s, border-color .35s, box-shadow .35s;
}
[data-theme="light"] .cursor-ring {
  border-color: rgba(0,0,0,.5);
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.trail {
  position: fixed;
  width: 6px; height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9998;
  animation: fadeTrail .9s ease-out forwards;
}

@keyframes fadeTrail {
  0%   { opacity: .9; transform: translate(-50%,-50%) scale(1); }
  100% { opacity: 0;  transform: translate(-50%,-50%) scale(0.2); }
}

/* Mobile */
@media (pointer: coarse) {
  .cursor-dot, .cursor-ring { display: none; }
  body, .theme-toggle { cursor: auto; }
}
