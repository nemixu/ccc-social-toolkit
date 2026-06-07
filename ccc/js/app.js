/* ═══════════════════════════════════════
   CCC Social Toolkit — app.js
   Clondalkin Cycling Club
═══════════════════════════════════════ */

// ── STATE ──────────────────────────────
let currentLogo = 'assets/ccc-logo.jpg';
let logoIsTransparent = false;

// ── INIT ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  switchTab('banner');
  initLogoUpload();
  renderHashtags();
});

// ── TAB SWITCHING ──────────────────────
function switchTab(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tpl').forEach(t => t.classList.remove('visible'));

  const btn = document.querySelector(`[data-tab="${name}"]`);
  if (btn) btn.classList.add('active');

  const panel = document.getElementById('panel-' + name);
  if (panel) panel.classList.add('active');

  const tpl = document.getElementById(name + '-tpl');
  if (tpl) tpl.classList.add('visible');
}

// ── LOGO UPLOAD ────────────────────────
function initLogoUpload() {
  const input = document.getElementById('logo-file-input');
  if (!input) return;
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      currentLogo = ev.target.result;
      // PNG = likely transparent
      logoIsTransparent = file.type === 'image/png';
      applyLogoEverywhere();
      // Update preview in sidebar
      const preview = document.getElementById('logo-preview');
      if (preview) preview.src = currentLogo;
      showToast('Logo updated!');
    };
    reader.readAsDataURL(file);
  });
}

function applyLogoEverywhere() {
  document.querySelectorAll('.logo-target').forEach(img => {
    img.src = currentLogo;
    if (logoIsTransparent) {
      img.classList.add('transparent');
    } else {
      img.classList.remove('transparent');
    }
  });
}

// ── LIVE UPDATE HELPERS ────────────────
const v    = id => (document.getElementById(id) || {}).value || '';
const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
const setHtml  = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML  = val; };

// ── BANNER ────────────────────────────
function updateBanner() {
  setHtml('b-name-out',
    `${v('b-line1')}<br><span class="accent">${v('b-line2')}</span>`
  );
  setText('b-tagline-out', v('b-tagline'));
  setText('b-handle-out',  v('b-handle'));
}

// ── SPIN ──────────────────────────────
function updateSpin() {
  setText('s-pill-out',   v('s-day'));
  setText('s-h1-out',     v('s-h1'));
  setText('s-h2-out',     v('s-h2'));
  setText('s-time-out',   v('s-time'));
  setText('s-loc-out',    v('s-loc'));
  setText('s-note-out',   v('s-note'));
  setText('s-handle-out', v('s-handle'));
}

// ── RESULT ────────────────────────────
function updateResult() {
  setText('r-pill-out',   v('r-pill'));
  setText('r-km-out',     v('r-km'));
  setText('r-route-out',  v('r-route').toUpperCase());
  setText('r-elev-out',   v('r-elev'));
  setText('r-time-out',   v('r-time'));
  setText('r-riders-out', v('r-riders'));
  setText('r-handle-out', v('r-handle'));
}

// ── SCHEDULE ──────────────────────────
function updateSchedule() {
  setText('sc-title-out',    v('sc-title'));
  setText('sc-tue-info-out', v('sc-tue-info'));
  setText('sc-tue-time-out', v('sc-tue-time'));
  setText('sc-thu-info-out', v('sc-thu-info'));
  setText('sc-thu-time-out', v('sc-thu-time'));
  setText('sc-sun-info-out', v('sc-sun-info'));
  setText('sc-sun-time-out', v('sc-sun-time'));
  setText('sc-web-out',      v('sc-web'));
  setText('sc-handle-out',   v('sc-handle'));
}

// ── HASHTAGS ──────────────────────────
const HASHTAG_SETS = [
  {
    name: 'Core Club',
    color: '#009246',
    tags: [
      '#clondalkincyclingclub', '#clondalkincycle', '#ccc', '#clondalkin',
      '#dublinbikes', '#dublinriding', '#irishcycling', '#cyclingireland'
    ]
  },
  {
    name: 'Road Cycling',
    color: '#CE2B37',
    tags: [
      '#roadcycling', '#roadbike', '#cyclinglife', '#cycling', '#cyclist',
      '#cyclingphotos', '#bikeporn', '#cyclistlife', '#peloton', '#ridemore'
    ]
  },
  {
    name: 'Weekend Spin',
    color: '#f5c518',
    tags: [
      '#sundayspin', '#morningride', '#weekendwarrior', '#groupride',
      '#ridewithfriends', '#cyclingclub', '#clubride', '#allabilitieswelcome'
    ]
  },
  {
    name: 'Dublin & Ireland',
    color: '#009246',
    tags: [
      '#dublin', '#ireland', '#wicklow', '#visitireland', '#irishsports',
      '#irelandsports', '#dublinsports', '#dublinlife', '#wicklowmountains'
    ]
  },
  {
    name: 'Sportive & Events',
    color: '#CE2B37',
    tags: [
      '#sportive', '#granfondo', '#racinglife', '#bikecommunity',
      '#cyclingcommunity', '#fitnessmotivation', '#trainhard', '#endurance'
    ]
  },
  {
    name: 'Full Set (all combined)',
    color: '#009246',
    tags: [
      '#clondalkincyclingclub', '#clondalkincycle', '#dublinbikes', '#irishcycling',
      '#cyclingireland', '#roadcycling', '#cyclist', '#cyclinglife', '#cycling',
      '#sundayspin', '#groupride', '#clubride', '#peloton', '#allabilitieswelcome',
      '#dublin', '#ireland', '#wicklow', '#irishsports', '#bikecommunity',
      '#cyclingcommunity', '#roadbike', '#ridewithfriends', '#morningride'
    ]
  }
];

function renderHashtags() {
  const container = document.getElementById('hashtag-container');
  if (!container) return;

  container.innerHTML = HASHTAG_SETS.map((set, i) => {
    const tagStr = set.tags.join(' ');
    const count = set.tags.length;
    return `
      <div class="hashtag-set">
        <div class="hashtag-set-title">
          <span style="background:${set.color};"></span>${set.name}
        </div>
        <div class="hashtag-tags">${set.tags.join(' ')}</div>
        <div class="hashtag-count">${count} tags</div>
        <button class="copy-btn" id="copy-btn-${i}" onclick="copyHashtags(${i}, '${tagStr.replace(/'/g, "\\'")}')">
          Copy All
        </button>
      </div>
    `;
  }).join('');
}

function copyHashtags(idx, tagStr) {
  navigator.clipboard.writeText(tagStr).then(() => {
    const btn = document.getElementById(`copy-btn-${idx}`);
    if (btn) {
      btn.classList.add('copied');
      btn.textContent = '✓  Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = 'Copy All';
      }, 2500);
    }
    showToast('Hashtags copied!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = tagStr;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Hashtags copied!');
  });
}

// ── PNG DOWNLOAD ──────────────────────
function downloadTemplate(tplId, filename) {
  const el = document.getElementById(tplId);
  if (!el) return;

  if (!window.html2canvas) {
    showToast('Loading... try again!');
    return;
  }

  showToast('Generating PNG...');

  html2canvas(el, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#090f09',
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = filename + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Saved!');
  }).catch(() => {
    showToast('Screenshot failed — try right-click > Save');
  });
}

// ── TOAST ─────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
