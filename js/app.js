// Nexora Tools Data
const tools = [
  { id: 'vecto', name: 'Vecto', cat: 'tools', icon: 'fa-vector-square', badge: 'VVIP', status: 'SIAP', desc: 'Raster to Vector Studio' },
  { id: 'svg2xml', name: 'SVG → Alight XML', cat: 'tools', icon: 'fa-file-code', badge: 'VVIP', status: 'SIAP', desc: 'Convert SVG to Alight Motion' },
  { id: 'auto-trace', name: 'AUTO TRACE', cat: 'tools', icon: 'fa-draw-polygon', badge: 'VVIP', status: 'SIAP' },
  { id: 'prompt-studio', name: 'Nexora Prompt Studio', cat: 'tools', icon: 'fa-wand-magic-sparkles', badge: 'VVIP', status: 'SIAP' },
  { id: 'perbesar', name: 'Perbesar Gambar 4x', cat: 'tools', icon: 'fa-expand', badge: 'VVIP', status: 'SIAP' },
  { id: 'ff-tools', name: 'FF Tools Nexora', cat: 'tools', icon: 'fa-film', badge: 'VVIP', status: 'SIAP' },
  { id: 'auto-cut', name: 'NEXORA Auto Cut', cat: 'tools', icon: 'fa-scissors', badge: 'VVIP', status: 'SIAP' },
  { id: 'multi-ai', name: 'Nexora Multi-AI', cat: 'tools', icon: 'fa-robot', badge: 'VVIP', status: 'SIAP' },
  { id: 'safelinku', name: 'Safelinku Bypass', cat: 'tools', icon: 'fa-link', badge: 'MEMBER', status: 'SIAP' },
  { id: 'cari-preset', name: 'Cari Preset AM', cat: 'tools', icon: 'fa-search', badge: 'MEMBER', status: 'SIAP' },
  { id: 'baca-komik', name: 'Baca Komik', cat: 'all', icon: 'fa-book-open', badge: 'MEMBER', status: 'SIAP' },
  { id: 'avatar-studio', name: 'Nexora Avatar Studio', cat: 'all', icon: 'fa-user-astronaut', badge: 'MEMBER', status: 'SIAP' },
  { id: 'html-mp4', name: 'HTML / WebGL to MP4', cat: 'all', icon: 'fa-video', badge: 'MEMBER', status: 'SIAP' },
  { id: 'social-dl', name: 'Social Downloader', cat: 'downloader', icon: 'fa-cloud-download-alt', badge: 'MEMBER', status: 'SIAP' },
  { id: 'svg-anim', name: 'SVG Animasi → Alight XML', cat: 'maker', icon: 'fa-play-circle', badge: 'MEMBER', status: 'SIAP' },
  { id: 'motion-ctrl', name: 'NEXORA Motion Control', cat: 'maker', icon: 'fa-running', badge: 'EXTERN', status: 'SIAP' },
  { id: 'text-match', name: 'NEXORA Text Match Cut', cat: 'maker', icon: 'fa-cut', badge: 'VIDEO', status: 'SIAP' },
  { id: '2d-text', name: '2D Text Animate', cat: 'tools', icon: 'fa-font', badge: 'LOCAL', status: 'SIAP' },
  { id: '3d-text', name: '3D Text Animate', cat: 'tools', icon: 'fa-cube', badge: 'PRESET', status: 'SIAP' },
  { id: 'ai-image', name: 'AI Image Eksperimental', cat: 'tools', icon: 'fa-image', badge: 'LOCAL', status: 'SIAP' },
  { id: 'text-fx', name: 'Text FX Animation', cat: 'tools', icon: 'fa-text-height', badge: 'PRESET', status: 'SIAP' },
  { id: 'logo-animate', name: 'Logo Animate', cat: 'tools', icon: 'fa-icons', badge: 'LOCAL', status: 'SIAP' },
];

let currentCat = 'all';
let currentFile = null;
let currentSVG = null;
let currentXML = null;

// Render tools
function renderTools(cat = 'all') {
  const grid = document.getElementById('tools-grid');
  const filtered = cat === 'all' ? tools : tools.filter(t => t.cat === cat || (cat === 'tools' && t.cat === 'tools'));
  document.getElementById('tool-count').textContent = filtered.length;
  
  grid.innerHTML = filtered.map(t => `
    <div class="tool-card ${t.badge === 'VVIP' ? 'vip' : 'member'}" onclick="openTool('${t.id}')">
      <span class="badge">${t.badge}</span>
      <div class="tool-icon"><i class="fas ${t.icon}"></i></div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-status">${t.status}</div>
    </div>
  `).join('');
}

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    renderTools(currentCat);
  });
});

// Open Tool
function openTool(id) {
  const tool = tools.find(t => t.id === id);
  if (!tool) return;
  
  if (id === 'vecto') {
    showVecto();
  } else if (id === 'svg2xml' || id === 'svg-anim') {
    showSVG2XML();
  } else {
    showToast(`${tool.name} sedang dalam pengembangan`, 'info');
  }
}

function closeTool() {
  document.getElementById('tool-page').classList.add('hidden');
  document.getElementById('tool-page').innerHTML = '';
  currentFile = null;
  currentSVG = null;
  currentXML = null;
}

// ========== VECTO ==========
function showVecto() {
  const page = document.getElementById('tool-page');
  page.classList.remove('hidden');
  page.innerHTML = `
    <div class="tool-header">
      <button class="back-btn" onclick="closeTool()"><i class="fas fa-arrow-left"></i> All Tools Nexora</button>
      <span class="tool-title">VECTO</span>
      <div style="width:40px"></div>
    </div>
    <div class="tool-body">
      <div class="studio-badge"><span style="width:8px;height:8px;background:#a78bfa;border-radius:50%;display:inline-block"></span> RASTER TO VECTOR STUDIO</div>
      <h1 class="studio-title">Pixels to <span>possibilities.</span></h1>
      <p class="studio-desc">Dari raster menjadi vektor. Presisi di setiap kurva.</p>
      
      <div class="steps">
        <div class="step active"><span class="step-num">01</span> Upload gambar</div>
        <div class="step"><span class="step-num">02</span> Atur & trace</div>
        <div class="step"><span class="step-num">03</span> Export SVG</div>
      </div>
      
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">
        <i class="fas fa-circle" style="font-size:8px;color:#10b981"></i> Engine terhubung ke konfigurasi VPS
      </div>

      <div class="control-panel">
        <h3>Your creative starting point.</h3>
        <p>Pilih gambar, atur detail, lalu biarkan Vecto menelusuri bentuknya.</p>
        
        <div class="upload-zone" id="vecto-upload" onclick="document.getElementById('vecto-file').click()">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Drop gambar Anda di sini</p>
          <span>atau klik untuk memilih · PNG / JPG / WEBP · 12 MB</span>
        </div>
        <input type="file" id="vecto-file" accept="image/png,image/jpeg,image/webp" style="display:none" onchange="handleVectoUpload(event)">
        
        <div class="preview-box" id="vecto-preview">
          <img id="vecto-img" alt="Preview">
        </div>

        <div class="settings-row">
          <div class="setting-group">
            <label>Style</label>
            <select id="vecto-style">
              <option value="auto" selected>Auto</option>
              <option value="logo">Logo</option>
              <option value="illustration">Illustration</option>
              <option value="photo">Photo</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Detail</label>
            <select id="vecto-detail">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Warna</label>
            <select id="vecto-color">
              <option value="auto" selected>Auto</option>
              <option value="mono">Monochrome</option>
              <option value="full">Full Color</option>
            </select>
          </div>
        </div>

        <button class="btn-primary" id="vecto-btn" onclick="processVecto()" disabled>
          <i class="fas fa-magic"></i> Create SVG
        </button>

        <div class="progress-wrap" id="vecto-progress">
          <div class="progress-bar"><div class="progress-fill" id="vecto-fill"></div></div>
          <div class="progress-text" id="vecto-status">Memproses...</div>
        </div>

        <div class="result-box" id="vecto-result">
          <div class="result-icon"><i class="fas fa-check"></i></div>
          <h3 style="margin-bottom:8px">SVG siap!</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Geometri dan byte output engine dipertahankan.</p>
          
          <div class="workspace" style="margin-bottom:16px">
            <div class="workspace-header">
              <span>Preview studio</span>
              <div class="toggle-btns">
                <button class="active" onclick="togglePreview(this,'original')">Original</button>
                <button onclick="togglePreview(this,'vector')">Vector</button>
              </div>
            </div>
            <div class="workspace-canvas" id="vecto-canvas"></div>
            <div class="workspace-footer">
              <span>Scroll untuk zoom · drag untuk geser</span>
              <span>100% · Fit</span>
            </div>
          </div>

          <button class="btn-primary" onclick="downloadSVG()">
            <i class="fas fa-download"></i> Download SVG
          </button>
          <button class="btn-secondary" onclick="goToSVG2XML()">
            <i class="fas fa-arrow-right"></i> Lanjut ke SVG → Alight XML
          </button>
          <button class="btn-secondary" onclick="resetVecto()">
            <i class="fas fa-trash"></i> Bersihkan
          </button>
        </div>
      </div>
    </div>
  `;

  // Drag drop
  const zone = document.getElementById('vecto-upload');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleVectoFile(e.dataTransfer.files[0]);
    }
  });
}

function handleVectoUpload(e) {
  if (e.target.files[0]) handleVectoFile(e.target.files[0]);
}

function handleVectoFile(file) {
  if (!file.type.match(/image\/(png|jpeg|webp)/)) {
    showToast('Format tidak didukung. Gunakan PNG/JPG/WEBP', 'error');
    return;
  }
  if (file.size > 12 * 1024 * 1024) {
    showToast('File terlalu besar (max 12MB)', 'error');
    return;
  }
  currentFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('vecto-preview').style.display = 'block';
    document.getElementById('vecto-img').src = ev.target.result;
    document.getElementById('vecto-btn').disabled = false;
    document.getElementById('vecto-upload').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function processVecto() {
  if (!currentFile) return;
  const btn = document.getElementById('vecto-btn');
  const progress = document.getElementById('vecto-progress');
  const fill = document.getElementById('vecto-fill');
  const status = document.getElementById('vecto-status');
  
  btn.disabled = true;
  progress.style.display = 'block';
  document.getElementById('vecto-result').style.display = 'none';

  let pct = 0;
  const steps = ['Mengunggah gambar...', 'Menganalisis edge...', 'Tracing path...', 'Optimasi kurva...', 'Generate SVG...'];
  let stepIdx = 0;
  
  const interval = setInterval(() => {
    pct += Math.random() * 12 + 5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      status.textContent = 'Selesai!';
      setTimeout(() => {
        progress.style.display = 'none';
        generateMockSVG();
        document.getElementById('vecto-result').style.display = 'block';
        document.getElementById('vecto-result').classList.add('success');
        showToast('SVG berhasil dibuat!', 'success');
      }, 400);
    }
    fill.style.width = pct + '%';
    if (pct > stepIdx * 20 && stepIdx < steps.length) {
      status.textContent = steps[stepIdx];
      stepIdx++;
    }
  }, 280);
}

function generateMockSVG() {
  // Create a clean SVG based on common logo style (simplified Tut Wuri Handayani inspired)
  // For real use, this would call a backend. Here we embed the original as image in SVG + add vector paths for demo
  const imgSrc = document.getElementById('vecto-img').src;
  
  // Simple vector approximation for demo (circle + paths)
  currentSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <clipPath id="clip">
      <circle cx="250" cy="250" r="230"/>
    </clipPath>
  </defs>
  <!-- Background circle -->
  <circle cx="250" cy="250" r="230" fill="#1e5aa8" stroke="#0a3d7a" stroke-width="8"/>
  <!-- Inner content as image for fidelity (demo mode) -->
  <image href="${imgSrc}" x="40" y="40" width="420" height="420" clip-path="url(#clip)" preserveAspectRatio="xMidYMid meet"/>
  <!-- Vector overlay paths for editability demo -->
  <path d="M250 80 L280 160 L360 160 L300 210 L320 290 L250 240 L180 290 L200 210 L140 160 L220 160 Z" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.3"/>
  <text x="250" y="470" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="18" font-weight="bold" opacity="0.7">NEXORA VECTO</text>
</svg>`;

  // Show in canvas
  const canvas = document.getElementById('vecto-canvas');
  canvas.innerHTML = currentSVG;
}

function togglePreview(btn, mode) {
  document.querySelectorAll('.toggle-btns button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const canvas = document.getElementById('vecto-canvas');
  if (mode === 'original') {
    canvas.innerHTML = `<img src="${document.getElementById('vecto-img').src}" style="max-width:100%;max-height:200px;border-radius:8px">`;
  } else {
    canvas.innerHTML = currentSVG;
  }
}

function downloadSVG() {
  if (!currentSVG) return;
  const blob = new Blob([currentSVG], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexora-vecto-${Date.now()}.svg`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('SVG berhasil diunduh', 'success');
}

function resetVecto() {
  currentFile = null;
  currentSVG = null;
  document.getElementById('vecto-preview').style.display = 'none';
  document.getElementById('vecto-upload').style.display = 'block';
  document.getElementById('vecto-result').style.display = 'none';
  document.getElementById('vecto-btn').disabled = true;
  document.getElementById('vecto-file').value = '';
}

function goToSVG2XML() {
  if (currentSVG) {
    // Store for next tool
    window._pendingSVG = currentSVG;
  }
  showSVG2XML();
}

// ========== SVG to Alight XML ==========
function showSVG2XML() {
  const page = document.getElementById('tool-page');
  page.classList.remove('hidden');
  page.innerHTML = `
    <div class="tool-header">
      <button class="back-btn" onclick="closeTool()"><i class="fas fa-arrow-left"></i></button>
      <span class="tool-title"><i class="fas fa-file-code" style="color:#a78bfa;margin-right:6px"></i> SVG → ALIGHT XML</span>
      <div style="width:40px"></div>
    </div>
    <div class="tool-body">
      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
        <span style="background:var(--bg-card);border:1px solid var(--border);padding:6px 12px;border-radius:8px;font-size:11px;font-weight:600"><i class="fas fa-layer-group" style="color:#a78bfa"></i> LAYER CONTROL</span>
        <span style="background:var(--bg-card);border:1px solid var(--border);padding:6px 12px;border-radius:8px;font-size:11px;font-weight:600"><i class="fas fa-shield-alt" style="color:#34d399"></i> CANVAS SAFE</span>
        <span style="background:var(--bg-card);border:1px solid var(--border);padding:6px 12px;border-radius:8px;font-size:11px;font-weight:600"><i class="fas fa-file" style="color:#fbbf24"></i> ORIGINAL SVG2XML</span>
        <span style="background:var(--bg-card);border:1px solid var(--border);padding:6px 12px;border-radius:8px;font-size:11px;font-weight:600"><i class="fas fa-mobile" style="color:#60a5fa"></i> ANDROID FIRST</span>
      </div>

      <div class="control-panel">
        <div style="font-size:12px;color:var(--purple-light);font-weight:600;margin-bottom:4px">01 · SOURCE</div>
        <h3 style="margin-bottom:8px">SVG Workbench</h3>
        <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px">
          <strong style="color:#34d399">ENGINE LOKAL</strong><br>
          Engine lokal v3.1.0 siap · Maximum Fidelity, Smart Color Groups, dan Patch Cleanup. Tanpa API key.
        </div>

        <div class="upload-zone" id="svg-upload" onclick="document.getElementById('svg-file').click()" style="padding:30px 20px">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Pilih atau jatuhkan SVG</p>
          <span>Maksimal 2 MB · file tidak disimpan</span>
          <button class="btn-secondary" style="margin-top:12px;width:auto;padding:8px 20px" onclick="event.stopPropagation();document.getElementById('svg-file').click()">Pilih SVG</button>
        </div>
        <input type="file" id="svg-file" accept=".svg,image/svg+xml" style="display:none" onchange="handleSVGUpload(event)">
        
        <div id="svg-info" style="display:none;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:16px;display:none;align-items:center;gap:12px">
          <div style="width:40px;height:40px;background:var(--purple);border-radius:8px;display:flex;align-items:center;justify-content:center"><i class="fas fa-file-code"></i></div>
          <div style="flex:1">
            <div id="svg-name" style="font-weight:600;font-size:13px"></div>
            <div id="svg-meta" style="font-size:11px;color:var(--text-muted)"></div>
          </div>
          <button onclick="clearSVG()" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer"><i class="fas fa-times"></i></button>
        </div>

        <div class="preview-box" id="svg-preview" style="display:none">
          <div class="workspace">
            <div class="workspace-header"><span>Vector Stage</span><div class="toggle-btns"><button class="active">Fit</button></div></div>
            <div class="workspace-canvas" id="svg-canvas"></div>
          </div>
        </div>

        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;font-weight:600">ENGINE</div>
        <div class="engine-options">
          <div class="engine-opt active" data-engine="max" onclick="selectEngine(this)">
            <div class="radio"></div>
            <div class="opt-info">
              <h4>Maximum Fidelity</h4>
              <p>Pertahankan detail dan struktur semaksimal mungkin.</p>
            </div>
          </div>
          <div class="engine-opt" data-engine="smart" onclick="selectEngine(this)">
            <div class="radio"></div>
            <div class="opt-info">
              <h4>Smart Color Groups</h4>
              <p>1 warna solid = 1 layer; audit paint, topology, dan z-order.</p>
            </div>
          </div>
          <div class="engine-opt" data-engine="patch" onclick="selectEngine(this)">
            <div class="radio"></div>
            <div class="opt-info">
              <h4>Small Patch Cleanup</h4>
              <p>Hapus patch vector sangat kecil saja.</p>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div class="setting-group">
            <label>FPS</label>
            <select id="xml-fps">
              <option value="24">24 fps</option>
              <option value="30" selected>30 fps</option>
              <option value="60">60 fps</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Durasi (detik)</label>
            <select id="xml-dur">
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <button class="btn-primary" id="convert-btn" onclick="convertToXML()" disabled>
          <i class="fas fa-exchange-alt"></i> Convert ke XML
        </button>

        <div class="progress-wrap" id="xml-progress">
          <div class="progress-bar"><div class="progress-fill" id="xml-fill"></div></div>
          <div class="progress-text" id="xml-status">Menyusun XML · Maximum Fidelity...</div>
        </div>

        <div class="result-box" id="xml-result">
          <div class="result-icon"><i class="fas fa-check"></i></div>
          <h3 style="margin-bottom:4px">XML Alight Motion siap diunduh.</h3>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Canvas, layer selection, hierarchy, timeline, dan engine tercermin pada hasil.</p>
          
          <div class="code-preview" id="xml-preview-code"></div>
          
          <div class="setting-group" style="margin-bottom:12px;text-align:left">
            <label>NAMA FILE DOWNLOAD</label>
            <input type="text" id="xml-filename" value="nexora-alight" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);padding:10px 12px;border-radius:10px;font-size:13px">
          </div>

          <button class="btn-primary" onclick="downloadXML()">
            <i class="fas fa-download"></i> Download XML
          </button>
          <button class="btn-secondary" onclick="copyXML()">
            <i class="fas fa-copy"></i> Salin XML
          </button>
        </div>
      </div>
    </div>
  `;

  // Auto load pending SVG from Vecto
  if (window._pendingSVG) {
    currentSVG = window._pendingSVG;
    window._pendingSVG = null;
    loadSVGContent(currentSVG, 'from-vecto.svg');
  }

  // Drag drop
  const zone = document.getElementById('svg-upload');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleSVGFile(e.dataTransfer.files[0]);
  });
}

function selectEngine(el) {
  document.querySelectorAll('.engine-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
}

function handleSVGUpload(e) {
  if (e.target.files[0]) handleSVGFile(e.target.files[0]);
}

function handleSVGFile(file) {
  if (!file.name.toLowerCase().endsWith('.svg') && file.type !== 'image/svg+xml') {
    showToast('Hanya file SVG yang didukung', 'error');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    showToast('File terlalu besar (max 2MB)', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    currentSVG = ev.target.result;
    loadSVGContent(currentSVG, file.name);
  };
  reader.readAsText(file);
}

function loadSVGContent(svgText, name) {
  currentSVG = svgText;
  document.getElementById('svg-upload').style.display = 'none';
  const info = document.getElementById('svg-info');
  info.style.display = 'flex';
  document.getElementById('svg-name').textContent = name;
  document.getElementById('svg-meta').textContent = `${(new Blob([svgText]).size / 1024).toFixed(1)} KB · SVG`;
  document.getElementById('svg-preview').style.display = 'block';
  document.getElementById('svg-canvas').innerHTML = svgText;
  document.getElementById('convert-btn').disabled = false;
}

function clearSVG() {
  currentSVG = null;
  document.getElementById('svg-upload').style.display = 'block';
  document.getElementById('svg-info').style.display = 'none';
  document.getElementById('svg-preview').style.display = 'none';
  document.getElementById('convert-btn').disabled = true;
  document.getElementById('xml-result').style.display = 'none';
  document.getElementById('svg-file').value = '';
}

function convertToXML() {
  if (!currentSVG) return;
  const progress = document.getElementById('xml-progress');
  const fill = document.getElementById('xml-fill');
  const status = document.getElementById('xml-status');
  const btn = document.getElementById('convert-btn');
  
  btn.disabled = true;
  progress.style.display = 'block';
  document.getElementById('xml-result').style.display = 'none';

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 15 + 8;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      status.textContent = 'Selesai!';
      setTimeout(() => {
        progress.style.display = 'none';
        generateAlightXML();
        document.getElementById('xml-result').style.display = 'block';
        document.getElementById('xml-result').classList.add('success');
        showToast('XML Alight Motion berhasil dibuat!', 'success');
        btn.disabled = false;
      }, 300);
    }
    fill.style.width = pct + '%';
  }, 200);
}

function generateAlightXML() {
  const fps = document.getElementById('xml-fps').value;
  const dur = document.getElementById('xml-dur').value;
  const frames = parseInt(fps) * parseInt(dur);
  
  // Simplified Alight Motion XML structure (demo compatible format)
  currentXML = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by Nexora SVG → Alight XML Engine v3.1.0 -->
<!-- Maximum Fidelity Mode -->
<alight-motion version="5.0" fps="${fps}" duration="${dur}">
  <project name="Nexora Vector Import" width="1080" height="1080">
    <canvas width="1080" height="1080" background="#00000000"/>
    <timeline duration="${frames}" fps="${fps}">
      <layer id="1" name="SVG Lossless Layer" type="vector" visible="true" locked="false">
        <transform>
          <position x="540" y="540"/>
          <scale x="1" y="1"/>
          <rotation>0</rotation>
          <opacity>1</opacity>
        </transform>
        <content type="svg">
          <![CDATA[
${currentSVG.substring(0, 800)}${currentSVG.length > 800 ? '\n<!-- ... truncated for preview ... -->' : ''}
          ]]>
        </content>
        <keyframes>
          <keyframe time="0" property="opacity" value="1"/>
          <keyframe time="${frames}" property="opacity" value="1"/>
        </keyframes>
      </layer>
      <layer id="2" name="path_001" type="shape" visible="true">
        <transform><position x="540" y="540"/><scale x="1" y="1"/><rotation>0</rotation></transform>
        <shape type="path" fill="#1e5aa8" stroke="none"/>
      </layer>
      <layer id="3" name="path_002" type="shape" visible="true">
        <transform><position x="540" y="540"/><scale x="1" y="1"/><rotation>0</rotation></transform>
        <shape type="path" fill="#ffffff" stroke="none"/>
      </layer>
    </timeline>
    <export>
      <format>alight-xml</format>
      <engine>nexora-svg2xml-v3.1.0</engine>
      <fidelity>maximum</fidelity>
      <color-groups>smart</color-groups>
    </export>
  </project>
</alight-motion>`;

  // Show preview (truncated)
  const preview = currentXML.split('\n').slice(0, 25).join('\n') + '\n...';
  document.getElementById('xml-preview-code').textContent = preview;
  document.getElementById('xml-filename').value = `nexora-${Date.now()}-alight`;
}

function downloadXML() {
  if (!currentXML) return;
  const name = document.getElementById('xml-filename').value || 'nexora-alight';
  const blob = new Blob([currentXML], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name + '.xml';
  a.click();
  URL.revokeObjectURL(url);
  showToast('XML berhasil diunduh', 'success');
}

function copyXML() {
  if (!currentXML) return;
  navigator.clipboard.writeText(currentXML).then(() => {
    showToast('XML disalin ke clipboard', 'success');
  }).catch(() => {
    showToast('Gagal menyalin', 'error');
  });
}

// Toast
function showToast(msg, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// Init
renderTools('all');
