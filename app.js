/**
 * Twibbon CAI Lombok Generator - app.js
 * Comprehensive, premium client-side Twibbon system supporting photos, videos,
 * live camera capture, and Web Share API.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS ---
  const canvas = document.getElementById('twibbonCanvas');
  const ctx = canvas.getContext('2d');
  const canvasContainer = document.getElementById('canvasContainer');
  const outputVideoPreview = document.getElementById('outputVideoPreview');
  const overlayInstruction = document.getElementById('overlayInstruction');
  const recordingBadge = document.getElementById('recordingBadge');
  const recTimerEl = document.getElementById('recTimer');
  
  // Tab Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Frame Elements
  const frameDefaultOpt = document.getElementById('frameDefaultOpt');
  const btnUploadFrame = document.getElementById('btnUploadFrame');
  const fileFrameInput = document.getElementById('fileFrameInput');
  const customFrameInfo = document.getElementById('customFrameInfo');
  const customFrameName = document.getElementById('customFrameName');
  const customFrameSize = document.getElementById('customFrameSize');
  const btnClearCustomFrame = document.getElementById('btnClearCustomFrame');
  const frameDefaultThumb = document.getElementById('frameDefaultThumb');
  
  // Media Input Elements
  const uploadGalleryCard = document.getElementById('uploadGalleryCard');
  const fileMediaInput = document.getElementById('fileMediaInput');
  const cameraCard = document.getElementById('cameraCard');
  const cameraPanel = document.getElementById('cameraPanel');
  const cameraVideo = document.getElementById('cameraVideo');
  const cameraLoader = document.getElementById('cameraLoader');
  const btnCapturePhoto = document.getElementById('btnCapturePhoto');
  const btnRecordVideo = document.getElementById('btnRecordVideo');
  const btnSwitchCamera = document.getElementById('btnSwitchCamera');
  const btnCloseCamera = document.getElementById('btnCloseCamera');
  const activeMediaCard = document.getElementById('activeMediaCard');
  const activeMediaIcon = document.getElementById('activeMediaIcon');
  const activeMediaName = document.getElementById('activeMediaName');
  const activeMediaType = document.getElementById('activeMediaType');
  const btnRemoveMedia = document.getElementById('btnRemoveMedia');
  const sourceVideo = document.getElementById('sourceVideo');

  // Adjustment Controls
  const sliderScale = document.getElementById('sliderScale');
  const valScale = document.getElementById('valScale');
  const sliderRotate = document.getElementById('sliderRotate');
  const valRotate = document.getElementById('valRotate');
  
  const btnPadUp = document.getElementById('btnPadUp');
  const btnPadDown = document.getElementById('btnPadDown');
  const btnPadLeft = document.getElementById('btnPadLeft');
  const btnPadRight = document.getElementById('btnPadRight');
  const btnPadCenter = document.getElementById('btnPadCenter');
  
  const btnFlip = document.getElementById('btnFlip');
  const btnRotateCcw = document.getElementById('btnRotateCcw');
  const btnRotateCw = document.getElementById('btnRotateCw');
  const btnReset = document.getElementById('btnReset');

  // Export & Share Elements
  const exportStatusPanel = document.getElementById('exportStatusPanel');
  const exportProgressBar = document.getElementById('exportProgressBar');
  const exportStatusText = document.getElementById('exportStatusText');
  const btnExportDownload = document.getElementById('btnExportDownload');
  const btnExportShare = document.getElementById('btnExportShare');

  // Quick Mobile Controls (Directly below canvas)
  const quickAdjustPanel = document.getElementById('quickAdjustPanel');
  const quickSliderScale = document.getElementById('quickSliderScale');
  const quickValScale = document.getElementById('quickValScale');
  const quickExportPanel = document.getElementById('quickExportPanel');
  const btnQuickExportDownload = document.getElementById('btnQuickExportDownload');
  const btnQuickExportShare = document.getElementById('btnQuickExportShare');

  // Quick Camera Controls (Directly below canvas)
  const quickCameraControls = document.getElementById('quickCameraControls');
  const btnQuickCapturePhoto = document.getElementById('btnQuickCapturePhoto');
  const btnQuickRecordVideo = document.getElementById('btnQuickRecordVideo');
  const btnQuickSwitchCamera = document.getElementById('btnQuickSwitchCamera');
  const btnQuickCloseCamera = document.getElementById('btnQuickCloseCamera');

  // Admin & Modal Elements
  const frameStartModal = document.getElementById('frameStartModal');
  const modalFrameGrid = document.getElementById('modalFrameGrid');
  const adminAuthPanel = document.getElementById('adminAuthPanel');
  const adminDashboardPanel = document.getElementById('adminDashboardPanel');
  const adminPasswordInput = document.getElementById('adminPasswordInput');
  const btnAdminLogin = document.getElementById('btnAdminLogin');
  const adminLoginError = document.getElementById('adminLoginError');
  const btnAdminLogout = document.getElementById('btnAdminLogout');
  const adminFrameItemsList = document.getElementById('adminFrameItemsList');
  const newFrameName = document.getElementById('newFrameName');
  const newFrameFileInput = document.getElementById('newFrameFileInput');
  const newFrameFileName = document.getElementById('newFrameFileName');
  const btnAdminSaveFrame = document.getElementById('btnAdminSaveFrame');

  // --- STATE ---
  let frameImage = new Image();
  let defaultFrameUrl = null;
  let customFrameImage = null;
  let isAdminAuthenticated = false;
  let newFrameFileBase64 = null;

  // IndexedDB Config
  const DB_NAME = 'TwibbonAppDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'frames';
  
  let mediaType = null; // 'image' | 'video' | 'camera'
  let cameraFacingMode = 'user'; // 'user' (front camera) or 'environment' (back camera)
  let mediaElement = null; // HTMLImageElement or HTMLVideoElement
  let mediaWidth = 0;
  let mediaHeight = 0;
  
  // Transformations
  let posX = 0;
  let posY = 0;
  let scale = 1.0;
  let rotateAngle = 0; // In radians
  let flipHorizontal = false;
  
  // Interactive Drag State
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  
  // Camera State
  let cameraStream = null;
  let cameraMode = 'live'; // 'live' | 'captured'
  
  // Video Playback/Rendering Loop
  let drawLoopActive = false;
  
  // Recording State
  let mediaRecorder = null;
  let recordedChunks = [];
  let isRecording = false;
  let recordStartTime = 0;
  let recordTimerInterval = null;
  
  // Audio node variables for video merging
  let audioContext = null;
  let audioDestination = null;
  
  // Default Frame SVG String (Matching CAI Lombok details)
  const defaultFrameSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
    <defs>
      <!-- Deep luxury dark blue base -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f2b87"/>
        <stop offset="50%" stop-color="#0b1b59"/>
        <stop offset="100%" stop-color="#04092b"/>
      </linearGradient>
      <!-- Premium metallic-like text gradient -->
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f0f4ff"/>
      </linearGradient>
      <!-- Circular masking hole in the center (900px canvas scale) -->
      <mask id="holeMask">
        <rect width="1080" height="1080" fill="white"/>
        <circle cx="540" cy="500" r="390" fill="black"/>
      </mask>
    </defs>

    <!-- Outer frame body with central hole -->
    <rect width="1080" height="1080" fill="url(#bgGrad)" mask="url(#holeMask)"/>

    <!-- Top Left batik decoration -->
    <g opacity="0.22" fill="#ffffff" mask="url(#holeMask)">
      <path d="M 0,0 L 320,0 Q 260,140 180,200 Q 100,260 0,320 Z"/>
      <circle cx="70" cy="70" r="45" stroke="#ffffff" stroke-width="4" fill="none"/>
      <circle cx="170" cy="170" r="25" stroke="#ffffff" stroke-width="3" fill="none"/>
      <path d="M 0,0 L 400,400 M 0,80 L 320,400 M 80,0 L 400,320" stroke="#ffffff" stroke-width="2" stroke-dasharray="12,12"/>
    </g>
    
    <!-- Top Right batik decoration -->
    <g opacity="0.18" fill="#ffffff" mask="url(#holeMask)">
      <path d="M 1080,0 L 760,0 Q 820,140 900,200 Q 980,260 1080,320 Z"/>
      <circle cx="1010" cy="70" r="45" stroke="#ffffff" stroke-width="4" fill="none"/>
      <circle cx="910" cy="170" r="25" stroke="#ffffff" stroke-width="3" fill="none"/>
    </g>

    <!-- Arched text path "WE ARE READY" (concave curved path) -->
    <path id="textPath" d="M 160,480 A 400,400 0 0,1 920,480" fill="none"/>
    
    <text font-family="'Montserrat', 'Inter', sans-serif" font-weight="900" font-size="76" fill="url(#textGrad)" letter-spacing="8" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.4))">
      <textPath href="#textPath" startOffset="50%" text-anchor="middle">
        WE ARE READY
      </textPath>
    </text>

    <!-- Wavy White container at the bottom -->
    <path d="M 0,860 C 200,800 400,920 620,840 C 850,750 980,820 1080,800 L 1080,1080 L 0,1080 Z" fill="#ffffff"/>

    <!-- Bottom Left CAI Lombok Logo Info -->
    <g transform="translate(80, 895)">
      <!-- Symbol representation with batik details -->
      <path d="M 0,0 L 50,0 C 70,0 80,10 80,25 C 80,40 70,50 50,50 L 25,50 L 25,90 L 0,90 Z" fill="#0f2b87" opacity="0.15"/>
      <text font-family="'Montserrat', 'Inter', sans-serif" font-weight="900" font-size="90" fill="#0f2b87" letter-spacing="-3">
        cai<tspan fill="#ef4444">47</tspan>
      </text>
      
      <!-- Descriptions -->
      <text y="42" font-family="'Inter', sans-serif" font-weight="800" font-size="22" fill="#0b1b59" letter-spacing="3.5">
        CINTA ALAM INDONESIA
      </text>
      <text y="70" font-family="'Inter', sans-serif" font-weight="700" font-size="18" fill="#ef4444" letter-spacing="1">
        DAERAH LOMBOK
      </text>
      <text y="92" font-family="'Inter', sans-serif" font-weight="500" font-size="14" fill="#64748b" letter-spacing="0.5">
        NUSA TENGGARA BARAT • 1979-2026
      </text>
    </g>

    <!-- Lombok Map silhouette decorated in batik inside white area (Bottom Right) -->
    <g transform="translate(780, 840)">
      <!-- White base mapping outline -->
      <path d="M 60,30 C 90,20 130,25 150,55 C 170,85 180,110 155,140 C 130,170 100,165 80,185 C 60,205 30,195 15,165 C 0,135 15,95 20,75 C 25,55 35,40 60,30 Z" fill="#0f2b87" opacity="0.1"/>
      <path d="M 60,30 C 90,20 130,25 150,55 C 170,85 180,110 155,140 C 130,170 100,165 80,185 C 60,205 30,195 15,165 C 0,135 15,95 20,75 C 25,55 35,40 60,30 Z" stroke="#0f2b87" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Internal batik map style lines -->
      <path d="M 40,75 L 140,135 M 65,55 L 155,115 M 25,120 C 60,120 80,80 120,100" stroke="#0f2b87" stroke-width="2" opacity="0.4" stroke-dasharray="4,4"/>
      <circle cx="95" cy="100" r="16" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.6"/>
    </g>
  </svg>
  `;

  // --- CANVAS DIMENSIONS UPDATE ---
  function updateCanvasDimensions() {
    if (frameImage.complete && frameImage.naturalWidth > 0) {
      const width = frameImage.naturalWidth;
      const height = frameImage.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Update container's aspect ratio so the container doesn't force a square ratio
      canvasContainer.style.aspectRatio = `${width} / ${height}`;
      
      // Also update the output video preview's aspect ratio
      if (outputVideoPreview) {
        outputVideoPreview.style.aspectRatio = `${width} / ${height}`;
      }

      // Automatically recalculate fit scale if we have media loaded
      if (mediaElement && mediaWidth > 0 && mediaHeight > 0) {
        scale = Math.max(canvas.width / mediaWidth, canvas.height / mediaHeight);
        
        sliderScale.value = scale;
        valScale.textContent = Math.round(scale * 100) + '%';
        if (quickSliderScale) {
          quickSliderScale.value = scale;
          quickValScale.textContent = Math.round(scale * 100) + '%';
        }
      }
    }
  }

  // --- DATABASE HELPER FUNCTIONS (IndexedDB) ---
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async function getAllFrames() {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => {
          let list = request.result;
          list.sort((a, b) => a.order - b.order);
          resolve(list);
        };
        request.onerror = () => {
          resolve(getFallbackFramesList());
        };
      });
    } catch (err) {
      console.warn('IndexedDB not supported or blocked, using fallback list:', err);
      return getFallbackFramesList();
    }
  }

  function getFallbackFramesList() {
    return [{
      id: 'default_cai_2026',
      name: 'CAI Lombok 2026',
      src: 'twibonze CAI26 (1).png',
      order: 0,
      isDefault: true
    }];
  }

  async function saveFrame(frame) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(frame);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteFrame(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Default Permanent Frames list
  // If you copy new PNG frame files into the project folder, you can register them here
  // so they are visible to ALL users, on all devices, and in Incognito mode automatically!
  const DEFAULT_FRAMES = [
    {
      id: 'default_cai_2026',
      name: 'CAI Lombok 2026',
      src: 'twibonze CAI26 (1).png',
      order: 0,
      isDefault: true
    }
    // To add more default permanent frames, register them here, example:
    // {
    //   id: 'default_fas_2025',
    //   name: 'FAS 2025 & Bazar Remaja',
    //   src: 'nama-file-bingkai-anda.png',
    //   order: 1,
    //   isDefault: true
    // }
  ];

  async function initDBAndFrames() {
    try {
      const dbFrames = await getAllFrames();
      // Add default frames to the database if they don't already exist
      for (const defFrame of DEFAULT_FRAMES) {
        const exists = dbFrames.some(f => f.id === defFrame.id);
        if (!exists) {
          await saveFrame(defFrame);
        }
      }
    } catch (err) {
      console.error('Failed to initialize frames database:', err);
    }
  }

  // --- MODAL SELECTION SYSTEM (First load) ---
  async function showStartModal() {
    const startModal = document.getElementById('frameStartModal');
    const modalGrid = document.getElementById('modalFrameGrid');
    
    modalGrid.innerHTML = '';
    const frames = await getAllFrames();
    
    frames.forEach(frame => {
      const item = document.createElement('div');
      item.className = 'modal-frame-item';
      item.innerHTML = `
        <div class="modal-frame-thumb">
          <img src="${frame.src}" alt="${frame.name}">
        </div>
        <h4>${frame.name}</h4>
      `;
      item.addEventListener('click', () => {
        selectFrame(frame);
        startModal.classList.add('hidden');
      });
      modalGrid.appendChild(item);
    });
    
    startModal.classList.remove('hidden');
  }

  function selectFrame(frame) {
    frameImage.src = frame.src;
    
    customFrameInfo.style.display = 'none';
    fileFrameInput.value = '';
    
    updateEditorSelectorActive(frame.id);
  }

  function updateEditorSelectorActive(activeId) {
    document.querySelectorAll('.frame-selector-grid .frame-option').forEach(opt => {
      opt.classList.remove('active');
    });
    const activeOpt = document.getElementById(`frame-opt-${activeId}`);
    if (activeOpt) {
      activeOpt.classList.add('active');
    }
  }

  async function renderEditorFrameSelector() {
    const grid = document.querySelector('.frame-selector-grid');
    if (!grid) return;
    
    const uploadCard = btnUploadFrame;
    grid.innerHTML = '';
    
    const frames = await getAllFrames();
    
    frames.forEach(frame => {
      const option = document.createElement('div');
      option.className = 'frame-option';
      option.id = `frame-opt-${frame.id}`;
      if (frameImage.src === frame.src || (frame.isDefault && frameImage.src.endsWith(frame.src))) {
        option.classList.add('active');
      }
      
      option.innerHTML = `
        <div class="frame-preview-thumb">
          <img src="${frame.src}" alt="${frame.name}">
        </div>
        <div class="frame-details">
          <span class="frame-title">${frame.name}</span>
          ${frame.isDefault ? '<span class="frame-badge">Bawaan</span>' : ''}
        </div>
      `;
      
      option.addEventListener('click', () => {
        selectFrame(frame);
      });
      
      grid.appendChild(option);
    });
    
    grid.appendChild(uploadCard);
  }

  // --- ADMIN PANEL FUNCTIONS ---
  function handleAdminLogin() {
    const enteredPassword = adminPasswordInput.value.trim();
    if (enteredPassword === '354313') {
      isAdminAuthenticated = true;
      adminLoginError.style.display = 'none';
      adminAuthPanel.style.display = 'none';
      adminDashboardPanel.style.display = 'block';
      renderAdminFrameList();
    } else {
      adminLoginError.style.display = 'block';
    }
  }

  function handleAdminLogout() {
    isAdminAuthenticated = false;
    adminPasswordInput.value = '';
    adminAuthPanel.style.display = 'block';
    adminDashboardPanel.style.display = 'none';
  }

  async function renderAdminFrameList() {
    adminFrameItemsList.innerHTML = '';
    const frames = await getAllFrames();
    
    frames.forEach((frame, idx) => {
      const item = document.createElement('div');
      item.className = 'admin-frame-item';
      
      item.innerHTML = `
        <img src="${frame.src}" alt="${frame.name}">
        <span class="frame-name">${frame.name}</span>
        <div class="actions">
          <button class="btn-action btn-move-up" title="Pindahkan Ke Atas" ${idx === 0 ? 'disabled style="opacity: 0.3;"' : ''}>
            <i class="fa-solid fa-arrow-up"></i>
          </button>
          <button class="btn-action btn-move-down" title="Pindahkan Ke Bawah" ${idx === frames.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>
            <i class="fa-solid fa-arrow-down"></i>
          </button>
          <button class="btn-action text-danger btn-delete" title="Hapus Bingkai" ${frame.isDefault ? 'disabled style="opacity: 0.3;"' : ''}>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      
      const btnUp = item.querySelector('.btn-move-up');
      const btnDown = item.querySelector('.btn-move-down');
      const btnDel = item.querySelector('.btn-delete');
      
      if (idx > 0) {
        btnUp.addEventListener('click', () => moveFrameOrder(frame.id, -1));
      }
      if (idx < frames.length - 1) {
        btnDown.addEventListener('click', () => moveFrameOrder(frame.id, 1));
      }
      if (!frame.isDefault) {
        btnDel.addEventListener('click', () => handleDeleteFrame(frame.id));
      }
      
      adminFrameItemsList.appendChild(item);
    });
  }

  async function moveFrameOrder(frameId, direction) {
    const frames = await getAllFrames();
    const currentIndex = frames.findIndex(f => f.id === frameId);
    if (currentIndex === -1) return;
    
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= frames.length) return;
    
    const currentFrame = frames[currentIndex];
    const targetFrame = frames[targetIndex];
    
    const tempOrder = currentFrame.order;
    currentFrame.order = targetFrame.order;
    targetFrame.order = tempOrder;
    
    await saveFrame(currentFrame);
    await saveFrame(targetFrame);
    
    await renderAdminFrameList();
    await renderEditorFrameSelector();
  }

  async function handleDeleteFrame(frameId) {
    if (confirm('Apakah Anda yakin ingin menghapus bingkai ini?')) {
      await deleteFrame(frameId);
      
      // Re-order
      const frames = await getAllFrames();
      for (let i = 0; i < frames.length; i++) {
        frames[i].order = i;
        await saveFrame(frames[i]);
      }
      
      await renderAdminFrameList();
      await renderEditorFrameSelector();
    }
  }

  async function handleAdminSaveFrame() {
    const name = newFrameName.value.trim();
    if (!name) {
      alert('Masukkan nama bingkai terlebih dahulu!');
      return;
    }
    if (!newFrameFileBase64) {
      alert('Pilih file gambar PNG transparan bingkai terlebih dahulu!');
      return;
    }
    
    const frames = await getAllFrames();
    const nextOrder = frames.length > 0 ? Math.max(...frames.map(f => f.order)) + 1 : 0;
    
    const newFrame = {
      id: 'custom_' + Date.now(),
      name: name,
      src: newFrameFileBase64,
      order: nextOrder,
      isDefault: false
    };
    
    await saveFrame(newFrame);
    
    // Clear inputs
    newFrameName.value = '';
    newFrameFileInput.value = '';
    newFrameFileName.textContent = 'Belum ada file terpilih';
    newFrameFileBase64 = null;
    
    alert('Bingkai berhasil disimpan!');
    
    await renderAdminFrameList();
    await renderEditorFrameSelector();
  }

  // --- INITIALIZATION ---
  async function init() {
    // Setup frameImage onload handler first to handle dynamic scaling
    frameImage.onload = () => {
      updateCanvasDimensions();
      draw();
    };

    setupTabNavigation();
    setupEventListeners();
    
    // Initialize Database
    await initDBAndFrames();
    
    // Load default frame or list from database
    const frames = await getAllFrames();
    if (frames.length > 0) {
      frameImage.src = frames[0].src;
    } else {
      loadDefaultFrame();
    }
    
    // Render selectors
    await renderEditorFrameSelector();
    
    resetMediaTransformations();
    startCanvasLoop();
    
    // Show start screen selector modal
    await showStartModal();
  }

  // --- TAB NAVIGATION ---
  function setupTabNavigation() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle tab buttons
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Toggle contents
        const targetTab = btn.getAttribute('data-tab');
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === targetTab) {
            content.classList.add('active');
          }
        });

        // Add tab admin auth check
        if (targetTab === 'tab-admin') {
          if (isAdminAuthenticated) {
            adminAuthPanel.style.display = 'none';
            adminDashboardPanel.style.display = 'block';
            renderAdminFrameList();
          } else {
            adminAuthPanel.style.display = 'block';
            adminDashboardPanel.style.display = 'none';
            adminPasswordInput.value = '';
            adminLoginError.style.display = 'none';
          }
        }
      });
    });
  }

  // --- FRAME LOADING ---
  function loadDefaultFrame() {
    defaultFrameUrl = 'twibonze CAI26 (1).png';
    frameImage.src = defaultFrameUrl;
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // File inputs
    fileFrameInput.addEventListener('change', handleCustomFrameUpload);
    btnUploadFrame.addEventListener('click', () => fileFrameInput.click());
    btnClearCustomFrame.addEventListener('click', removeCustomFrame);

    // Media inputs
    uploadGalleryCard.addEventListener('click', () => fileMediaInput.click());
    fileMediaInput.addEventListener('change', handleMediaUpload);
    cameraCard.addEventListener('click', openCamera);
    btnCloseCamera.addEventListener('click', closeCamera);
    btnRemoveMedia.addEventListener('click', removeActiveMedia);

    // Camera actions
    btnCapturePhoto.addEventListener('click', captureCameraPhoto);
    btnRecordVideo.addEventListener('click', handleCameraVideoRecording);
    if (btnSwitchCamera) {
      btnSwitchCamera.addEventListener('click', toggleCameraFacing);
    }

    // Transformation controls
    sliderScale.addEventListener('input', (e) => {
      scale = parseFloat(e.target.value);
      valScale.textContent = Math.round(scale * 100) + '%';
      
      // Sync quick slider
      if (quickSliderScale) {
        quickSliderScale.value = scale;
        quickValScale.textContent = Math.round(scale * 100) + '%';
      }
      draw();
    });
    sliderRotate.addEventListener('input', (e) => {
      const deg = parseInt(e.target.value);
      rotateAngle = deg * Math.PI / 180;
      valRotate.textContent = deg + '°';
      draw();
    });

    // D-Pad Adjustments
    btnPadUp.addEventListener('click', () => { posY -= 15; draw(); });
    btnPadDown.addEventListener('click', () => { posY += 15; draw(); });
    btnPadLeft.addEventListener('click', () => { posX -= 15; draw(); });
    btnPadRight.addEventListener('click', () => { posX += 15; draw(); });
    btnPadCenter.addEventListener('click', () => { posX = 0; posY = 0; draw(); });

    // Quick Actions
    btnFlip.addEventListener('click', () => {
      flipHorizontal = !flipHorizontal;
      draw();
    });
    btnRotateCcw.addEventListener('click', () => {
      let deg = Math.round(rotateAngle * 180 / Math.PI) - 90;
      if (deg < -180) deg += 360;
      rotateAngle = deg * Math.PI / 180;
      sliderRotate.value = deg;
      valRotate.textContent = deg + '°';
      draw();
    });
    btnRotateCw.addEventListener('click', () => {
      let deg = Math.round(rotateAngle * 180 / Math.PI) + 90;
      if (deg > 180) deg -= 360;
      rotateAngle = deg * Math.PI / 180;
      sliderRotate.value = deg;
      valRotate.textContent = deg + '°';
      draw();
    });
    btnReset.addEventListener('click', resetMediaTransformations);

    // Canvas Mouse/Touch Interaction for drag & drop
    canvasContainer.addEventListener('mousedown', startDrag);
    canvasContainer.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);

    canvasContainer.addEventListener('touchstart', startDrag, { passive: false });
    canvasContainer.addEventListener('touchmove', drag, { passive: false });
    window.addEventListener('touchend', endDrag);

    // Export & Share
    btnExportDownload.addEventListener('click', exportMedia);
    btnExportShare.addEventListener('click', shareMedia);

    // Quick Mobile Controls
    if (quickSliderScale) {
      quickSliderScale.addEventListener('input', (e) => {
        scale = parseFloat(e.target.value);
        quickValScale.textContent = Math.round(scale * 100) + '%';
        
        // Sync main slider
        sliderScale.value = scale;
        valScale.textContent = Math.round(scale * 100) + '%';
        
        draw();
      });
    }

    if (btnQuickExportDownload) {
      btnQuickExportDownload.addEventListener('click', exportMedia);
    }
    if (btnQuickExportShare) {
      btnQuickExportShare.addEventListener('click', shareMedia);
    }

    // Quick Camera Controls (Directly below canvas)
    if (btnQuickCapturePhoto) {
      btnQuickCapturePhoto.addEventListener('click', captureCameraPhoto);
    }
    if (btnQuickRecordVideo) {
      btnQuickRecordVideo.addEventListener('click', handleCameraVideoRecording);
    }
    if (btnQuickSwitchCamera) {
      btnQuickSwitchCamera.addEventListener('click', toggleCameraFacing);
    }
    if (btnQuickCloseCamera) {
      btnQuickCloseCamera.addEventListener('click', closeCamera);
    }

    // Admin Panel Actions
    if (btnAdminLogin) {
      btnAdminLogin.addEventListener('click', handleAdminLogin);
    }
    if (adminPasswordInput) {
      adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdminLogin();
      });
    }
    if (btnAdminLogout) {
      btnAdminLogout.addEventListener('click', handleAdminLogout);
    }
    if (newFrameFileInput) {
      newFrameFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'image/png') {
          alert('Hanya diperbolehkan format bingkai PNG transparan!');
          newFrameFileInput.value = '';
          newFrameFileName.textContent = 'Belum ada file terpilih';
          newFrameFileBase64 = null;
          return;
        }
        newFrameFileName.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          newFrameFileBase64 = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
    if (btnAdminSaveFrame) {
      btnAdminSaveFrame.addEventListener('click', handleAdminSaveFrame);
    }
  }

  // --- TRANSFORMATION MANAGEMENT ---
  function resetMediaTransformations() {
    posX = 0;
    posY = 0;
    
    // Calculate default fit scale if media is present
    if (mediaElement && mediaWidth > 0 && mediaHeight > 0) {
      scale = Math.max(canvas.width / mediaWidth, canvas.height / mediaHeight);
    } else {
      scale = 1.0;
    }
    
    rotateAngle = 0;
    flipHorizontal = false;
    
    sliderScale.value = scale;
    valScale.textContent = Math.round(scale * 100) + '%';
    if (quickSliderScale) {
      quickSliderScale.value = scale;
      quickValScale.textContent = Math.round(scale * 100) + '%';
    }
    sliderRotate.value = 0;
    valRotate.textContent = '0°';
    
    resetOutputPreview();
    draw();
  }

  // --- QUICK MOBILE PANELS VISIBILITY ---
  function showQuickPanels() {
    if (quickAdjustPanel) quickAdjustPanel.style.display = 'block';
    if (quickExportPanel) quickExportPanel.style.display = 'block';
  }

  function hideQuickPanels() {
    if (quickAdjustPanel) quickAdjustPanel.style.display = 'none';
    if (quickExportPanel) quickExportPanel.style.display = 'none';
  }

  // Helper to reset the video preview player and show the interactive canvas again
  function resetOutputPreview() {
    if (canvas) canvas.style.display = 'block';
    if (outputVideoPreview) {
      outputVideoPreview.style.display = 'none';
      outputVideoPreview.src = '';
    }
    // Restore drag helper instruction if media is active
    if (overlayInstruction && mediaElement) {
      overlayInstruction.style.opacity = '0.85';
    }
  }

  // --- CUSTOM FRAME HANDLERS ---
  function handleCustomFrameUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'image/png') {
      alert('Hanya diperbolehkan format bingkai PNG transparan!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        customFrameImage = img;
        frameImage.src = event.target.result;
        
        // Show info panel
        customFrameName.textContent = file.name;
        customFrameSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
        customFrameInfo.style.display = 'flex';
        
        // Update active UI cards
        document.querySelectorAll('.frame-selector-grid .frame-option').forEach(opt => opt.classList.remove('active'));
        btnUploadFrame.classList.add('active');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function removeCustomFrame() {
    customFrameImage = null;
    customFrameInfo.style.display = 'none';
    fileFrameInput.value = '';
    
    // Revert to first frame from database
    const frames = await getAllFrames();
    if (frames.length > 0) {
      selectFrame(frames[0]);
    } else {
      frameImage.src = defaultFrameUrl;
    }
  }

  // --- MEDIA HANDLING (GALLERY) ---
  function handleMediaUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    closeCamera(); // Shut off camera stream if active
    
    if (file.type.startsWith('image/')) {
      mediaType = 'image';
      const img = new Image();
      img.onload = () => {
        mediaElement = img;
        mediaWidth = img.naturalWidth;
        mediaHeight = img.naturalHeight;
        
        showActiveMediaBadge(file.name, 'FOTO');
        resetMediaTransformations();
        showQuickPanels();
        
        // Direct to adjustment tab
        document.querySelector('.tab-btn[data-tab="tab-adjust"]').click();
      };
      img.src = URL.createObjectURL(file);
    } else if (file.type.startsWith('video/')) {
      mediaType = 'video';
      
      sourceVideo.src = URL.createObjectURL(file);
      sourceVideo.load();
      sourceVideo.onloadedmetadata = () => {
        mediaElement = sourceVideo;
        mediaWidth = sourceVideo.videoWidth;
        mediaHeight = sourceVideo.videoHeight;
        
        showActiveMediaBadge(file.name, 'VIDEO');
        resetMediaTransformations();
        showQuickPanels();
        
        sourceVideo.play().catch(err => console.log('Autoplay blocked:', err));
        
        document.querySelector('.tab-btn[data-tab="tab-adjust"]').click();
      };
    }
  }

  function showActiveMediaBadge(name, type) {
    activeMediaName.textContent = name;
    activeMediaType.textContent = type;
    
    if (type === 'VIDEO') {
      activeMediaIcon.innerHTML = '<i class="fa-solid fa-video text-success"></i>';
    } else {
      activeMediaIcon.innerHTML = '<i class="fa-solid fa-image text-success"></i>';
    }
    
    activeMediaCard.style.display = 'flex';
  }

  function removeActiveMedia() {
    mediaType = null;
    mediaElement = null;
    sourceVideo.pause();
    sourceVideo.src = '';
    activeMediaCard.style.display = 'none';
    fileMediaInput.value = '';
    resetMediaTransformations();
    hideQuickPanels();
  }

  // --- CAMERA HANDLING ---
  async function openCamera() {
    cameraPanel.style.display = 'block';
    cameraLoader.style.display = 'flex';
    uploadGalleryCard.style.pointerEvents = 'none';
    cameraCard.style.pointerEvents = 'none';
    
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1080 },
          height: { ideal: 1080 },
          facingMode: cameraFacingMode
        },
        audio: true // Request audio for live video twibbon recording!
      });
      
      cameraVideo.srcObject = cameraStream;
      cameraVideo.onloadedmetadata = () => {
        cameraLoader.style.display = 'none';
        cameraVideo.play();
        
        // Render webcam video feed to editor dynamically
        mediaType = 'camera';
        mediaElement = cameraVideo;
        mediaWidth = cameraVideo.videoWidth || 1080; // Ideal dimensions
        mediaHeight = cameraVideo.videoHeight || 1080;
        flipHorizontal = (cameraFacingMode === 'user'); // Mirror only for front camera
        
        resetMediaTransformations();
        if (quickAdjustPanel) quickAdjustPanel.style.display = 'block';
        if (quickCameraControls) quickCameraControls.style.display = 'block';
      };
    } catch (err) {
      console.error('Kamera gagal diakses:', err);
      // Fallback request just video if audio access is denied or unavailable
      try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacingMode }
        });
        cameraVideo.srcObject = cameraStream;
        cameraVideo.onloadedmetadata = () => {
          cameraLoader.style.display = 'none';
          cameraVideo.play();
          mediaType = 'camera';
          mediaElement = cameraVideo;
          mediaWidth = cameraVideo.videoWidth || 640; 
          mediaHeight = cameraVideo.videoHeight || 480;
          flipHorizontal = (cameraFacingMode === 'user'); // Mirror only for front camera
          resetMediaTransformations();
          if (quickAdjustPanel) quickAdjustPanel.style.display = 'block';
          if (quickCameraControls) quickCameraControls.style.display = 'block';
        };
      } catch (innerErr) {
        alert('Gagal mengakses kamera. Mohon berikan izin kamera atau gunakan file galeri.');
        closeCamera();
      }
    }
  }

  function closeCamera() {
    cameraFacingMode = 'user'; // Reset default to front camera on exit
    if (quickCameraControls) quickCameraControls.style.display = 'none';
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    cameraStream = null;
    cameraVideo.srcObject = null;
    cameraPanel.style.display = 'none';
    uploadGalleryCard.style.pointerEvents = 'auto';
    cameraCard.style.pointerEvents = 'auto';
    
    if (mediaType === 'camera') {
      removeActiveMedia();
    }
  }

  async function toggleCameraFacing() {
    cameraFacingMode = (cameraFacingMode === 'user') ? 'environment' : 'user';
    
    if (cameraStream) {
      const prevUploadState = uploadGalleryCard.style.pointerEvents;
      const prevCameraState = cameraCard.style.pointerEvents;
      
      // Stop current camera stream
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
      cameraVideo.srcObject = null;
      
      // Open camera with new facingMode
      await openCamera();
      
      uploadGalleryCard.style.pointerEvents = prevUploadState;
      cameraCard.style.pointerEvents = prevCameraState;
    }
  }

  function captureCameraPhoto() {
    if (!cameraStream || mediaType !== 'camera') return;

    // Freeze camera frame as a static image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cameraVideo.videoWidth;
    tempCanvas.height = cameraVideo.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw mirrored video state to canvas
    tempCtx.translate(tempCanvas.width, 0);
    tempCtx.scale(-1, 1);
    tempCtx.drawImage(cameraVideo, 0, 0, tempCanvas.width, tempCanvas.height);
    
    const photoDataUrl = tempCanvas.toDataURL('image/jpeg');
    const capturedImg = new Image();
    
    capturedImg.onload = () => {
      // Set the frozen photo as the new image media
      mediaType = 'image';
      mediaElement = capturedImg;
      mediaWidth = capturedImg.width;
      mediaHeight = capturedImg.height;
      flipHorizontal = false; // Mirroring was already baked in above
      
      showActiveMediaBadge('foto-kamera-' + Date.now() + '.jpg', 'FOTO');
      resetMediaTransformations();
      showQuickPanels();
      
      // Close the stream
      closeCamera();
      
      // Navigate to adjustment tab
      document.querySelector('.tab-btn[data-tab="tab-adjust"]').click();
    };
    capturedImg.src = photoDataUrl;
  }

  // Live Canvas Recording of webcam
  function handleCameraVideoRecording() {
    if (!cameraStream || mediaType !== 'camera') return;
    
    if (!isRecording) {
      // Start Recording
      btnRecordVideo.innerHTML = '<i class="fa-solid fa-stop"></i> Berhenti Rekam';
      btnRecordVideo.className = 'btn btn-danger btn-sm';
      btnCapturePhoto.style.display = 'none';
      if (btnSwitchCamera) btnSwitchCamera.style.display = 'none';
      btnCloseCamera.style.display = 'none';
      
      if (btnQuickRecordVideo) {
        btnQuickRecordVideo.innerHTML = '<i class="fa-solid fa-stop"></i> Berhenti';
        btnQuickRecordVideo.className = 'btn btn-danger';
      }
      if (btnQuickCapturePhoto) btnQuickCapturePhoto.style.display = 'none';
      if (btnQuickSwitchCamera) btnQuickSwitchCamera.style.display = 'none';
      if (btnQuickCloseCamera) btnQuickCloseCamera.style.display = 'none';
      
      startCanvasRecording();
    } else {
      // Stop Recording
      stopCanvasRecording();
    }
  }

  // --- CANVAS INTERACTION (DRAG & PAN) ---
  function startDrag(e) {
    if (!mediaElement) return;
    isDragging = true;
    overlayInstruction.style.opacity = '0';
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    startX = (clientX * scaleX) - posX;
    startY = (clientY * scaleY) - posY;
    
    if (e.cancelable) e.preventDefault();
  }

  function drag(e) {
    if (!isDragging || !mediaElement) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    posX = (clientX * scaleX) - startX;
    posY = (clientY * scaleY) - startY;
    
    draw();
    if (e.cancelable) e.preventDefault();
  }

  function endDrag() {
    isDragging = false;
  }

  // --- DRAW ROUTINE ---
  function draw() {
    // 1. Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#050714'; // Matching brand theme background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Draw user media behind the frame
    if (mediaElement) {
      ctx.save();
      
      // Move to center to perform user-defined transformations
      ctx.translate(canvas.width / 2 + posX, canvas.height / 2 + posY);
      ctx.rotate(rotateAngle);
      
      // Mirror horizontal scale if activated
      const currentScaleX = flipHorizontal ? -scale : scale;
      ctx.scale(currentScaleX, scale);
      
      // Draw centered around origin
      ctx.drawImage(
        mediaElement, 
        -mediaWidth / 2, 
        -mediaHeight / 2, 
        mediaWidth, 
        mediaHeight
      );
      
      ctx.restore();
    }
    
    // 3. Draw frame OVER the media
    if (frameImage.complete && frameImage.naturalWidth > 0) {
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
    }
  }

  // Canvas loop rendering for videos and live cameras
  function startCanvasLoop() {
    function loop() {
      if (mediaType === 'video' && !sourceVideo.paused) {
        draw();
      } else if (mediaType === 'camera') {
        draw();
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // --- CANVAS RECORDING SYSTEM (For Videos) ---
  function startCanvasRecording() {
    recordedChunks = [];
    isRecording = true;
    recordingBadge.style.display = 'flex';
    
    // Capture Canvas stream at 30 fps
    const canvasStream = canvas.captureStream(30);
    const tracks = [];
    
    // Push canvas video track
    tracks.push(canvasStream.getVideoTracks()[0]);
    
    // Audio merging: grab audio track from source if available
    let sourceAudioTrack = null;
    
    if (mediaType === 'video') {
      // Fetch audio track from uploaded video file
      const stream = sourceVideo.captureStream ? sourceVideo.captureStream() : sourceVideo.mozCaptureStream();
      if (stream && stream.getAudioTracks().length > 0) {
        sourceAudioTrack = stream.getAudioTracks()[0];
      }
    } else if (mediaType === 'camera' && cameraStream) {
      // Fetch live audio track from microphone stream
      if (cameraStream.getAudioTracks().length > 0) {
        sourceAudioTrack = cameraStream.getAudioTracks()[0];
      }
    }
    
    if (sourceAudioTrack) {
      tracks.push(sourceAudioTrack);
    }
    
    // Combine tracks to composite stream
    const compositeStream = new MediaStream(tracks);
    
    // Initialize MediaRecorder with high quality options (HD / 6 Mbps bitrate)
    const BITRATE = 6000000; // 6 Mbps
    let options = { mimeType: 'video/webm;codecs=vp9,opus', videoBitsPerSecond: BITRATE };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8,opus', videoBitsPerSecond: BITRATE };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm', videoBitsPerSecond: BITRATE };
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/mp4', videoBitsPerSecond: BITRATE };
    }
    
    try {
      mediaRecorder = new MediaRecorder(compositeStream, options);
    } catch (e) {
      console.error('MediaRecorder initialization failed, trying default options', e);
      mediaRecorder = new MediaRecorder(compositeStream, { videoBitsPerSecond: BITRATE });
    }
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      clearInterval(recordTimerInterval);
      recordingBadge.style.display = 'none';
      
      const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'video/webm' });
      
      // Save recorded video as local state for download / share
      const videoURL = URL.createObjectURL(blob);
      
      // Complete state callback
      finalizeRecording(blob, videoURL);
    };
    
    // Setup UI and timer
    recordStartTime = Date.now();
    updateRecordTimer();
    recordTimerInterval = setInterval(updateRecordTimer, 1000);
    
    mediaRecorder.start(100); // chunk size in ms
    
    // If it's camera recording, automatically stop after 30 seconds limit
    if (mediaType === 'camera') {
      setTimeout(() => {
        if (isRecording) stopCanvasRecording();
      }, 30000);
    }
  }

  function stopCanvasRecording() {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
    mediaRecorder.stop();
    isRecording = false;
    
    // Reset camera controls if we recorded from camera
    if (mediaType === 'camera') {
      btnRecordVideo.innerHTML = '<i class="fa-solid fa-circle"></i> Rekam Video (Maks 30s)';
      btnRecordVideo.className = 'btn btn-danger btn-sm';
      btnCapturePhoto.style.display = 'inline-flex';
      if (btnSwitchCamera) btnSwitchCamera.style.display = 'inline-flex';
      btnCloseCamera.style.display = 'inline-flex';
      
      if (btnQuickRecordVideo) {
        btnQuickRecordVideo.innerHTML = '<i class="fa-solid fa-circle"></i> Rekam Video';
        btnQuickRecordVideo.className = 'btn btn-danger';
      }
      if (btnQuickCapturePhoto) btnQuickCapturePhoto.style.display = 'inline-flex';
      if (btnQuickSwitchCamera) btnQuickSwitchCamera.style.display = 'inline-flex';
      if (btnQuickCloseCamera) btnQuickCloseCamera.style.display = 'inline-flex';
    }
  }

  function updateRecordTimer() {
    const elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    recTimerEl.textContent = `${mins}:${secs}`;
  }

  function finalizeRecording(blob, url) {
    // Generate a temporary file reference
    const extension = blob.type.includes('mp4') ? 'mp4' : 'webm';
    const videoFileName = `twibbon-video-${Date.now()}.${extension}`;
    
    exportStatusPanel.style.display = 'none';
    
    // Save to window globally for the download/share listeners to tap into
    window.lastExportedBlob = blob;
    window.lastExportedUrl = url;
    window.lastExportedName = videoFileName;
    
    // Show recorded video preview directly in the preview container
    if (canvas) canvas.style.display = 'none';
    if (overlayInstruction) overlayInstruction.style.opacity = '0';
    if (outputVideoPreview) {
      outputVideoPreview.style.display = 'block';
      outputVideoPreview.src = url;
      outputVideoPreview.play().catch(e => console.log("Auto-preview play blocked:", e));
    }
    
    // Set UI tab to export tab automatically
    document.querySelector('.tab-btn[data-tab="tab-export"]').click();
    showQuickPanels();
  }

  // --- EXPORT TRIGGERS (DOWNLOAD & SHARE) ---
  async function exportMedia() {
    if (!mediaElement) {
      alert('Unggah foto/video atau gunakan kamera terlebih dahulu!');
      return;
    }
    
    if (mediaType === 'image') {
      // Photo export is direct
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `twibbon-cai-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        alert('Gagal mengekspor foto. Hubungi administrator.');
        console.error(err);
      }
    } else if (mediaType === 'video') {
      // Video export requires rendering/recording loop
      if (isRecording) {
        alert('Video sedang dalam proses perekaman!');
        return;
      }
      
      exportStatusPanel.style.display = 'block';
      exportProgressBar.style.width = '0%';
      exportStatusText.textContent = 'Mulai memproses video...';
      
      // Reset play state
      sourceVideo.currentTime = 0;
      sourceVideo.pause();
      
      // Create progress reporter
      const duration = sourceVideo.duration;
      let progressInterval = setInterval(() => {
        const pct = (sourceVideo.currentTime / duration) * 100;
        exportProgressBar.style.width = `${Math.min(pct, 98)}%`;
        exportStatusText.textContent = `Memproses video: ${Math.round(pct)}%`;
      }, 250);
      
      // Start recording frame sequence
      startCanvasRecording();
      
      // Trigger source video play
      try {
        await sourceVideo.play();
        
        // Set event hook to stop recording when video ends
        sourceVideo.onended = () => {
          clearInterval(progressInterval);
          exportProgressBar.style.width = '100%';
          exportStatusText.textContent = 'Menyelesaikan ekspor...';
          stopCanvasRecording();
        };
      } catch (err) {
        clearInterval(progressInterval);
        exportStatusPanel.style.display = 'none';
        alert('Gagal memutar video untuk render canvas.');
      }
    } else if (mediaType === 'camera') {
      if (window.lastExportedUrl && window.lastExportedBlob) {
        const link = document.createElement('a');
        link.download = window.lastExportedName;
        link.href = window.lastExportedUrl;
        link.click();
      } else {
        alert('Silakan ambil foto atau rekam video terlebih dahulu sebelum mengunduh hasil!');
      }
    }
  }

  async function shareMedia() {
    if (!mediaElement) {
      alert('Silakan masukkan media terlebih dahulu!');
      return;
    }
    
    let fileToShare = null;
    
    if (mediaType === 'image') {
      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      fileToShare = new File([blob], `twibbon-cai-${Date.now()}.png`, { type: 'image/png' });
    } else if (mediaType === 'video' || window.lastExportedBlob) {
      if (window.lastExportedBlob) {
        fileToShare = new File([window.lastExportedBlob], window.lastExportedName, { type: window.lastExportedBlob.type });
      } else {
        alert('Silakan klik "Download Hasil" terlebih dahulu untuk mengekspor video sebelum dibagikan.');
        return;
      }
    } else if (mediaType === 'camera') {
      alert('Silakan ambil foto atau rekam video terlebih dahulu sebelum membagikan hasil!');
      return;
    }
    
    if (!fileToShare) return;
    
    // Check for Native Web Share API support
    if (navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
      try {
        await navigator.share({
          files: [fileToShare],
          title: 'Twibbon CAI Lombok',
          text: 'Ayo buat twibbon Cinta Alam Indonesia Daerah Lombok milikmu sekarang!'
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Gagal membagikan berkas:', err);
          fallbackShareDownload(fileToShare);
        }
      }
    } else {
      // Fallback
      fallbackShareDownload(fileToShare);
    }
  }

  function fallbackShareDownload(file) {
    // Generate temporary download
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    alert('Browser Anda tidak mendukung berbagi file secara langsung. Berkas telah diunduh otomatis, silakan bagikan ke WhatsApp/Instagram secara manual.');
  }

  // --- RUN INITIALIZER ---
  init();
});
