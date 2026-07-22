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
  const newFrameGDriveFolderId = document.getElementById('newFrameGDriveFolderId');
  const newFrameGDriveScriptUrl = document.getElementById('newFrameGDriveScriptUrl');
  const btnShowGDriveGuide = document.getElementById('btnShowGDriveGuide');
  const gdriveGuideModal = document.getElementById('gdriveGuideModal');
  const btnCloseGDriveGuide = document.getElementById('btnCloseGDriveGuide');
  const gdriveCard = document.getElementById('gdriveCard');
  const gdriveSelectorModal = document.getElementById('gdriveSelectorModal');
  const btnCloseGDriveSelector = document.getElementById('btnCloseGDriveSelector');
  const gdriveLoader = document.getElementById('gdriveLoader');
  const gdriveError = document.getElementById('gdriveError');
  const gdriveErrorMessage = document.getElementById('gdriveErrorMessage');
  const gdrivePhotoGrid = document.getElementById('gdrivePhotoGrid');
  const canvasLoadingOverlay = document.getElementById('canvasLoadingOverlay');
  const gdriveEditModal = document.getElementById('gdriveEditModal');
  const btnCloseGDriveEdit = document.getElementById('btnCloseGDriveEdit');
  const editGDriveFrameId = document.getElementById('editGDriveFrameId');
  const editGDriveFolderId = document.getElementById('editGDriveFolderId');
  const editGDriveScriptUrl = document.getElementById('editGDriveScriptUrl');
  const btnSaveGDriveEdit = document.getElementById('btnSaveGDriveEdit');

  const gdriveBreadcrumb = document.getElementById('gdriveBreadcrumb');
  const globalGDriveFolderId = document.getElementById('globalGDriveFolderId');
  const globalGDriveScriptUrl = document.getElementById('globalGDriveScriptUrl');
  const btnSaveGlobalGDrive = document.getElementById('btnSaveGlobalGDrive');
  const globalGdriveStatus = document.getElementById('globalGdriveStatus');

  const printOrderModal = document.getElementById('printOrderModal');
  const btnClosePrintOrderModal = document.getElementById('btnClosePrintOrderModal');
  const printOrderName = document.getElementById('printOrderName');
  const printOrderWhatsapp = document.getElementById('printOrderWhatsapp');
  const printOrderPaymentMethod = document.getElementById('printOrderPaymentMethod');
  const printOrderQrisContainer = document.getElementById('printOrderQrisContainer');
  const printOrderQrisImg = document.getElementById('printOrderQrisImg');
  const printOrderPaymentProofInput = document.getElementById('printOrderPaymentProofInput');
  const printOrderPaymentProofFileName = document.getElementById('printOrderPaymentProofFileName');
  const btnSubmitPrintOrder = document.getElementById('btnSubmitPrintOrder');
  const btnExportPrint = document.getElementById('btnExportPrint');
  const btnQuickExportPrint = document.getElementById('btnQuickExportPrint');
  const adminQrisStatus = document.getElementById('adminQrisStatus');
  const adminQrisPreviewContainer = document.getElementById('adminQrisPreviewContainer');
  const adminQrisPreviewImg = document.getElementById('adminQrisPreviewImg');
  const adminQrisFileInput = document.getElementById('adminQrisFileInput');
  const adminQrisFileName = document.getElementById('adminQrisFileName');
  const btnSaveQrisConfig = document.getElementById('btnSaveQrisConfig');
  const togglePrintFeature = document.getElementById('togglePrintFeature');
  const adminPrintStatusBadge = document.getElementById('adminPrintStatusBadge');

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

  // Multiple Slots Configuration
  const slots = [
    { mediaType: null, mediaElement: null, mediaWidth: 0, mediaHeight: 0, posX: 0, posY: 0, scale: 1.0, rotateAngle: 0, flipHorizontal: false, name: '', typeLabel: '' },
    { mediaType: null, mediaElement: null, mediaWidth: 0, mediaHeight: 0, posX: 0, posY: 0, scale: 1.0, rotateAngle: 0, flipHorizontal: false, name: '', typeLabel: '' },
    { mediaType: null, mediaElement: null, mediaWidth: 0, mediaHeight: 0, posX: 0, posY: 0, scale: 1.0, rotateAngle: 0, flipHorizontal: false, name: '', typeLabel: '' },
    { mediaType: null, mediaElement: null, mediaWidth: 0, mediaHeight: 0, posX: 0, posY: 0, scale: 1.0, rotateAngle: 0, flipHorizontal: false, name: '', typeLabel: '' }
  ];
  let activeSlotIndex = 0;
  let activeTabId = 'tab-media';
  let activeFrame = null;
  let globalConfig = { gdrive_folder_id: '', gdrive_script_url: '', print_enabled: true };

  function applyPrintFeatureConfig(enabled) {
    if (btnQuickExportPrint) {
      btnQuickExportPrint.style.display = enabled ? 'flex' : 'none';
    }
    if (btnExportPrint) {
      btnExportPrint.style.display = enabled ? 'block' : 'none';
    }
    if (togglePrintFeature) {
      togglePrintFeature.checked = enabled;
    }
    if (adminPrintStatusBadge) {
      adminPrintStatusBadge.textContent = enabled ? 'Aktif' : 'Nonaktif';
      adminPrintStatusBadge.style.background = enabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
      adminPrintStatusBadge.style.color = enabled ? '#4ade80' : '#f87171';
    }
  }
  // GDrive folder navigation stack: [{id, name}]
  let gdriveFolderStack = [];

  // Admin Drag & Resize Layout State
  let adminActiveDragBox = null;
  let adminDragMode = null; // 'move' | 'resize'
  let adminDragStartMouseX = 0;
  let adminDragStartMouseY = 0;
  let adminDragStartInputX = 0;
  let adminDragStartInputY = 0;
  let adminDragStartInputW = 0;
  let adminDragStartInputH = 0;
  let adminDragScaleFactor = 1.0;
  let adminActiveGroupEl = null;
  let adminFrameNaturalWidth = 1080;
  let adminFrameNaturalHeight = 1080;
  
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
  
  // Interactive Drag & Touch Pinch Zoom State
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startTouchDistance = 0;
  let startTouchScale = 1.0;
  
  // Camera State
  let cameraStream = null;
  let cameraMode = 'live'; // 'live' | 'captured'
  
  // Video Playback/Rendering Loop
  let drawLoopActive = false;
  
  // Recording State
  let mediaRecorder = null;
  let recordedChunks = [];
  let isRecording = false;
  let isExporting = false; // suppresses guide lines during canvas export
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

  // --- DATABASE HELPER FUNCTIONS (API Fetch) ---
  async function getAllFrames() {
    try {
      const response = await fetch('api.php');
      if (response.ok) {
        const frames = await response.json();
        // Always enforce slots coordinates for default frame
        frames.forEach(frame => {
          if (frame.id === 'default_cai_2026' || frame.isDefault) {
            frame.slots_count = 4;
            frame.slots = [
              {"x": 92, "y": 153, "width": 896, "height": 413},
              {"x": 92, "y": 582, "width": 442, "height": 498},
              {"x": 546, "y": 582, "width": 442, "height": 243},
              {"x": 546, "y": 837, "width": 442, "height": 243}
            ];
          }
        });
        return frames;
      }
      return getFallbackFramesList();
    } catch (err) {
      console.warn('API connection failed, using fallback list:', err);
      return getFallbackFramesList();
    }
  }

  function getFallbackFramesList() {
    return [{
      id: 'default_cai_2026',
      name: 'CAI Lombok 2026',
      src: 'twibonze CAI26 (1).png',
      order: 0,
      isDefault: true,
      slots_count: 4,
      slots: [
        {"x": 92, "y": 153, "width": 896, "height": 413},
        {"x": 92, "y": 582, "width": 442, "height": 498},
        {"x": 546, "y": 582, "width": 442, "height": 243},
        {"x": 546, "y": 837, "width": 442, "height": 243}
      ]
    }];
  }

  async function initDBAndFrames() {
    // Handled on backend side now
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

  // Central helper: always checks BOTH frame-specific and global GDrive config
  function updateGDriveCardVisibility(frame) {
    if (!gdriveCard) return;
    const f = frame || activeFrame || {};
    const hasLocal = f.gdrive_folder_id && f.gdrive_script_url;
    const hasGlobal = globalConfig && globalConfig.gdrive_folder_id && globalConfig.gdrive_script_url;
    gdriveCard.style.display = (hasLocal || hasGlobal) ? 'flex' : 'none';
  }

  function selectFrame(frame) {
    activeFrame = frame;
    frameImage.src = frame.src;
    
    customFrameInfo.style.display = 'none';
    fileFrameInput.value = '';
    
    updateEditorSelectorActive(frame.id);
    
    const slotsCount = frame.slots_count !== undefined ? parseInt(frame.slots_count) : 4;
    updateSlotsVisibility(slotsCount);
    recalculateAllSlotsFitScale();

    updateGDriveCardVisibility(frame);
  }

  function recalculateAllSlotsFitScale() {
    slots.forEach((slot, idx) => {
      if (slot.mediaElement && slot.mediaWidth > 0 && slot.mediaHeight > 0) {
        let slotW = canvas.width;
        let slotH = canvas.height;
        if (activeFrame && activeFrame.slots && activeFrame.slots[idx]) {
          slotW = activeFrame.slots[idx].width || canvas.width;
          slotH = activeFrame.slots[idx].height || canvas.height;
        }
        
        slot.scale = Math.max(slotW / slot.mediaWidth, slotH / slot.mediaHeight);
        slot.posX = 0;
        slot.posY = 0;
        slot.rotateAngle = 0;
        slot.flipHorizontal = false;
      }
    });
    
    const activeSlot = slots[activeSlotIndex];
    if (activeSlot) {
      scale = activeSlot.scale;
      posX = activeSlot.posX;
      posY = activeSlot.posY;
      rotateAngle = activeSlot.rotateAngle;
      flipHorizontal = activeSlot.flipHorizontal;
      
      sliderScale.value = scale;
      valScale.textContent = Math.round(scale * 100) + '%';
      if (quickSliderScale) {
        quickSliderScale.value = scale;
        quickValScale.textContent = Math.round(scale * 100) + '%';
      }
      sliderRotate.value = 0;
      valRotate.textContent = '0°';
    }
    
    draw();
  }

  function updateSlotsVisibility(slotsCount) {
    // Hide or show slot buttons based on slotsCount
    document.querySelectorAll('.slot-btn').forEach((btn, idx) => {
      if (idx < slotsCount) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    });

    // Clean up any slots beyond the new limit
    for (let i = slotsCount; i < slots.length; i++) {
      if (slots[i].mediaElement) {
        if (slots[i].mediaType === 'video') {
          slots[i].mediaElement.pause();
          slots[i].mediaElement.src = '';
        }
        slots[i].mediaType = null;
        slots[i].mediaElement = null;
        slots[i].mediaWidth = 0;
        slots[i].mediaHeight = 0;
        slots[i].name = '';
        slots[i].typeLabel = '';
      }
    }

    // Reset active slot if it falls outside the range
    if (activeSlotIndex >= slotsCount) {
      loadActiveSlotState(0);
    } else {
      // Just load current active slot to refresh UI
      loadActiveSlotState(activeSlotIndex);
    }
    
    updateSlotThumbnails();
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
      const itemContainer = document.createElement('div');
      itemContainer.className = 'admin-frame-item-container';
      itemContainer.style.borderBottom = '1px solid var(--panel-border)';
      itemContainer.style.padding = '12px 0';
      
      itemContainer.innerHTML = `
        <div class="admin-frame-item" style="display: flex; align-items: center; justify-content: space-between;">
          <img src="${frame.src}" alt="${frame.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; border: 1px solid var(--panel-border);">
          <span class="frame-name" style="flex: 1; margin-left: 12px; font-weight: 600; font-size: 13px;">${frame.name}</span>
          <div class="actions" style="display: flex; gap: 4px;">
            <button class="btn-action btn-edit-gdrive" title="Set Google Drive" style="color: #10b981; background: none; border: none; cursor: pointer; padding: 6px;">
              <i class="fa-brands fa-google-drive"></i>
            </button>
            <button class="btn-action btn-move-up" title="Pindahkan Ke Atas" ${idx === 0 ? 'disabled style="opacity: 0.3;"' : ''} style="background: none; border: none; cursor: pointer; padding: 6px; color: var(--text-muted);">
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button class="btn-action btn-move-down" title="Pindahkan Ke Bawah" ${idx === frames.length - 1 ? 'disabled style="opacity: 0.3;"' : ''} style="background: none; border: none; cursor: pointer; padding: 6px; color: var(--text-muted);">
              <i class="fa-solid fa-arrow-down"></i>
            </button>
            <button class="btn-action text-danger btn-delete" title="Hapus Bingkai" style="background: none; border: none; cursor: pointer; padding: 6px;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        
        <!-- Inline GDrive Edit Form (hidden by default) -->
        <div class="inline-gdrive-form" style="display: none; background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; margin-top: 8px; border: 1px solid var(--panel-border);">
          <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px; color: #34d399; display: flex; align-items: center; gap: 6px;">
            <i class="fa-brands fa-google-drive"></i> Pengaturan Google Drive
          </div>
          <div class="form-group" style="margin-bottom: 8px;">
            <label style="font-size: 11px; color: var(--text-muted); display:block; margin-bottom: 4px; font-weight: 600;">ID Folder Google Drive:</label>
            <input type="text" class="input-inline-folder-id form-control" style="font-size: 12px; padding: 8px; width: 100%; border-radius: 4px; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--panel-border); color: var(--text-primary); box-sizing: border-box; outline: none;" value="${frame.gdrive_folder_id || ''}" placeholder="Contoh: 17691tD48Q1x4n...">
          </div>
          <div class="form-group" style="margin-bottom: 8px;">
            <label style="font-size: 11px; color: var(--text-muted); display:block; margin-bottom: 4px; font-weight: 600;">URL Web App Google Apps Script:</label>
            <input type="text" class="input-inline-script-url form-control" style="font-size: 12px; padding: 8px; width: 100%; border-radius: 4px; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--panel-border); color: var(--text-primary); box-sizing: border-box; outline: none;" value="${frame.gdrive_script_url || ''}" placeholder="Contoh: https://script.google.com/...">
          </div>
          <button class="btn btn-primary btn-sm btn-save-inline-gdrive" style="font-size: 11px; padding: 8px 12px; width: 100%; font-weight: 700; cursor: pointer; border-radius: 4px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px;"><i class="fa-solid fa-floppy-disk"></i> Simpan Google Drive</button>
        </div>
      `;
      
      const btnEditGDrive = itemContainer.querySelector('.btn-edit-gdrive');
      const inlineForm = itemContainer.querySelector('.inline-gdrive-form');
      const btnSaveInline = itemContainer.querySelector('.btn-save-inline-gdrive');
      const inputFolderId = itemContainer.querySelector('.input-inline-folder-id');
      const inputScriptUrl = itemContainer.querySelector('.input-inline-script-url');
      
      const btnUp = itemContainer.querySelector('.btn-move-up');
      const btnDown = itemContainer.querySelector('.btn-move-down');
      const btnDel = itemContainer.querySelector('.btn-delete');
      
      // Toggle form inline
      btnEditGDrive.addEventListener('click', () => {
        const isHidden = inlineForm.style.display === 'none';
        inlineForm.style.display = isHidden ? 'block' : 'none';
        
        if (isHidden && !inputScriptUrl.value) {
          inputScriptUrl.value = localStorage.getItem('last_gdrive_script_url') || '';
        }
      });
      
      btnSaveInline.addEventListener('click', async () => {
        const folderId = inputFolderId.value.trim();
        const scriptUrl = inputScriptUrl.value.trim();
        
        if (scriptUrl) {
          localStorage.setItem('last_gdrive_script_url', scriptUrl);
        }
        
        try {
          const response = await fetch('api.php?action=edit_gdrive', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: frame.id,
              gdrive_folder_id: folderId,
              gdrive_script_url: scriptUrl,
              password: '354313'
            })
          });
          const data = await response.json();
          if (response.ok && data.success) {
            alert('Pengaturan Google Drive berhasil disimpan!');
            inlineForm.style.display = 'none';
            
            const frames = await getAllFrames();
            if (activeFrame && activeFrame.id === frame.id) {
              const updated = frames.find(f => f.id === frame.id);
              if (updated) {
                activeFrame = updated;
                updateGDriveCardVisibility(updated);
              }
            }
            await renderAdminFrameList();
            await renderEditorFrameSelector();
          } else {
            alert('Gagal menyimpan pengaturan: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (err) {
          console.error(err);
          alert('Gagal menghubungkan ke server.');
        }
      });

      if (idx > 0) {
        btnUp.addEventListener('click', () => moveFrameOrder(frame.id, -1));
      }
      if (idx < frames.length - 1) {
        btnDown.addEventListener('click', () => moveFrameOrder(frame.id, 1));
      }
      btnDel.addEventListener('click', () => handleDeleteFrame(frame.id));
      
      adminFrameItemsList.appendChild(itemContainer);
    });
  }

  async function moveFrameOrder(frameId, direction) {
    const frames = await getAllFrames();
    const currentIndex = frames.findIndex(f => f.id === frameId);
    if (currentIndex === -1) return;
    
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= frames.length) return;
    
    const temp = frames[currentIndex];
    frames[currentIndex] = frames[targetIndex];
    frames[targetIndex] = temp;
    
    const frameIds = frames.map(f => f.id);
    
    try {
      const response = await fetch('api.php?action=reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          frame_ids: frameIds,
          password: '354313'
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        await renderAdminFrameList();
        await renderEditorFrameSelector();
      } else {
        alert('Gagal mengubah urutan: ' + (data.error || 'Terjadi kesalahan.'));
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungkan ke server.');
    }
  }

  async function handleDeleteFrame(frameId) {
    if (confirm('Apakah Anda yakin ingin menghapus bingkai ini?')) {
      try {
        const response = await fetch('api.php?action=delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: frameId,
            password: '354313'
          })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          if (activeFrame && activeFrame.id === frameId) {
            const remainingFrames = await getAllFrames();
            if (remainingFrames.length > 0) {
              selectFrame(remainingFrames[0]);
            } else {
              activeFrame = null;
              frameImage.src = '';
            }
          }
          await renderAdminFrameList();
          await renderEditorFrameSelector();
        } else {
          alert('Gagal menghapus bingkai: ' + (data.error || 'Terjadi kesalahan.'));
        }
      } catch (err) {
        console.error(err);
        alert('Gagal menghubungkan ke server.');
      }
    }
  }

  async function handleAdminSaveFrame() {
    const name = newFrameName.value.trim();
    if (!name) {
      alert('Masukkan nama bingkai terlebih dahulu!');
      return;
    }
    const file = newFrameFileInput.files[0];
    if (!file) {
      alert('Pilih file gambar PNG transparan bingkai terlebih dahulu!');
      return;
    }
    
    const slotsCountEl = document.getElementById('newFrameSlotsCount');
    const slotsCount = slotsCountEl ? parseInt(slotsCountEl.value) : 4;
    
    // Read the slots coordinates config from the form
    const slotsArr = [];
    for (let i = 0; i < slotsCount; i++) {
      const group = document.querySelector(`.slot-coord-group[data-slot-idx="${i}"]`);
      if (group) {
        slotsArr.push({
          x: parseInt(group.querySelector('.slot-x').value || 0),
          y: parseInt(group.querySelector('.slot-y').value || 0),
          width: parseInt(group.querySelector('.slot-w').value || 1080),
          height: parseInt(group.querySelector('.slot-h').value || 1080)
        });
      }
    }
    
    const gdriveFolderId = newFrameGDriveFolderId ? newFrameGDriveFolderId.value.trim() : '';
    const gdriveScriptUrl = newFrameGDriveScriptUrl ? newFrameGDriveScriptUrl.value.trim() : '';
    
    if (gdriveScriptUrl) {
      localStorage.setItem('last_gdrive_script_url', gdriveScriptUrl);
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('frame_image', file);
    formData.append('slots_count', slotsCount);
    formData.append('slots', JSON.stringify(slotsArr));
    formData.append('gdrive_folder_id', gdriveFolderId);
    formData.append('gdrive_script_url', gdriveScriptUrl);
    formData.append('password', '354313');
    
    try {
      const response = await fetch('api.php?action=save', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert('Bingkai berhasil disimpan!');
        
        // Clear inputs
        newFrameName.value = '';
        newFrameFileInput.value = '';
        newFrameFileName.textContent = 'Belum ada file terpilih';
        newFrameFileBase64 = null;
        if (newFrameGDriveFolderId) newFrameGDriveFolderId.value = '';
        // Keep the script URL pre-filled from localStorage for convenience, no need to clear it
        
        // Hide preview containers
        const previewContainer = document.getElementById('adminLayoutPreviewContainer');
        const configWrapper = document.getElementById('adminSlotsConfigWrapper');
        if (previewContainer) previewContainer.style.display = 'none';
        if (configWrapper) configWrapper.style.display = 'none';
        
        await renderAdminFrameList();
        await renderEditorFrameSelector();
      } else {
        alert('Gagal menyimpan bingkai: ' + (data.error || 'Terjadi kesalahan.'));
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungkan ke server.');
    }
  }

  function updateAdminPreviewOverlay() {
    const overlay = document.getElementById('adminPreviewSlotsOverlay');
    const newFrameSlotsCount = document.getElementById('newFrameSlotsCount');
    if (!overlay || !newFrameSlotsCount) return;
    overlay.innerHTML = '';
    
    const count = parseInt(newFrameSlotsCount.value || 4);
    const colors = [
      { bg: 'rgba(96, 165, 250, 0.25)', border: '#60a5fa' },
      { bg: 'rgba(16, 185, 129, 0.25)', border: '#10b981' },
      { bg: 'rgba(245, 158, 11, 0.25)', border: '#f59e0b' },
      { bg: 'rgba(239, 68, 68, 0.25)', border: '#ef4444' }
    ];
    
    for (let i = 0; i < count; i++) {
      const group = document.querySelector(`.slot-coord-group[data-slot-idx="${i}"]`);
      if (!group) continue;
      
      const xVal = parseFloat(group.querySelector('.slot-x').value || 0);
      const yVal = parseFloat(group.querySelector('.slot-y').value || 0);
      const wVal = parseFloat(group.querySelector('.slot-w').value || adminFrameNaturalWidth);
      const hVal = parseFloat(group.querySelector('.slot-h').value || adminFrameNaturalHeight);
      
      const leftPct = (xVal / adminFrameNaturalWidth * 100).toFixed(2) + '%';
      const topPct = (yVal / adminFrameNaturalHeight * 100).toFixed(2) + '%';
      const widthPct = (wVal / adminFrameNaturalWidth * 100).toFixed(2) + '%';
      const heightPct = (hVal / adminFrameNaturalHeight * 100).toFixed(2) + '%';
      
      const color = colors[i];
      const box = document.createElement('div');
      box.className = 'admin-preview-box';
      box.dataset.slotIdx = i;
      box.style.position = 'absolute';
      box.style.left = leftPct;
      box.style.top = topPct;
      box.style.width = widthPct;
      box.style.height = heightPct;
      box.style.background = color.bg;
      box.style.border = `2px solid ${color.border}`;
      box.style.boxSizing = 'border-box';
      box.style.display = 'flex';
      box.style.alignItems = 'center';
      box.style.justifyContent = 'center';
      box.style.color = '#fff';
      box.style.fontSize = '11px';
      box.style.fontWeight = 'bold';
      box.style.textShadow = '0 1px 3px rgba(0,0,0,0.8)';
      box.style.cursor = 'move';
      box.style.userSelect = 'none';
      box.textContent = `Foto ${i+1}`;
      
      // Resize handle at bottom right corner
      const handle = document.createElement('div');
      handle.className = 'resize-handle';
      handle.style.position = 'absolute';
      handle.style.right = '-4px';
      handle.style.bottom = '-4px';
      handle.style.width = '12px';
      handle.style.height = '12px';
      handle.style.background = color.border;
      handle.style.border = '2px solid #fff';
      handle.style.borderRadius = '50%';
      handle.style.cursor = 'se-resize';
      handle.style.zIndex = '10';
      box.appendChild(handle);
      
      overlay.appendChild(box);
    }
    
    // Bind overlay interactive dragging listeners if they haven't been bound yet
    if (!overlay.dataset.listenersBound) {
      overlay.dataset.listenersBound = 'true';
      
      let adminDragScaleFactorX = 1.0;
      let adminDragScaleFactorY = 1.0;

      // Mouse dragging / resizing events
      const handleStart = (clientX, clientY, targetEl) => {
        const handle = targetEl.closest('.resize-handle');
        const box = targetEl.closest('.admin-preview-box');
        if (!box) return;
        
        const idx = parseInt(box.dataset.slotIdx);
        const group = document.querySelector(`.slot-coord-group[data-slot-idx="${idx}"]`);
        if (!group) return;
        
        adminActiveDragBox = box;
        adminActiveGroupEl = group;
        adminDragStartMouseX = clientX;
        adminDragStartMouseY = clientY;
        
        adminDragStartInputX = parseInt(group.querySelector('.slot-x').value || 0);
        adminDragStartInputY = parseInt(group.querySelector('.slot-y').value || 0);
        adminDragStartInputW = parseInt(group.querySelector('.slot-w').value || adminFrameNaturalWidth);
        adminDragStartInputH = parseInt(group.querySelector('.slot-h').value || adminFrameNaturalHeight);
        
        const rect = overlay.getBoundingClientRect();
        adminDragScaleFactorX = adminFrameNaturalWidth / rect.width;
        adminDragScaleFactorY = adminFrameNaturalHeight / rect.height;
        
        if (handle) {
          adminDragMode = 'resize';
        } else {
          adminDragMode = 'move';
        }
      };
      
      const handleMove = (clientX, clientY) => {
        if (!adminActiveDragBox || !adminActiveGroupEl) return;
        
        const dx = clientX - adminDragStartMouseX;
        const dy = clientY - adminDragStartMouseY;
        const canvasDx = dx * adminDragScaleFactorX;
        const canvasDy = dy * adminDragScaleFactorY;
        
        const xInput = adminActiveGroupEl.querySelector('.slot-x');
        const yInput = adminActiveGroupEl.querySelector('.slot-y');
        const wInput = adminActiveGroupEl.querySelector('.slot-w');
        const hInput = adminActiveGroupEl.querySelector('.slot-h');
        
        if (adminDragMode === 'move') {
          let nextX = adminDragStartInputX + canvasDx;
          let nextY = adminDragStartInputY + canvasDy;
          
          nextX = Math.min(adminFrameNaturalWidth - adminDragStartInputW, Math.max(0, nextX));
          nextY = Math.min(adminFrameNaturalHeight - adminDragStartInputH, Math.max(0, nextY));
          
          xInput.value = Math.round(nextX);
          yInput.value = Math.round(nextY);
        } else if (adminDragMode === 'resize') {
          let nextW = adminDragStartInputW + canvasDx;
          let nextH = adminDragStartInputH + canvasDy;
          
          nextW = Math.min(adminFrameNaturalWidth - adminDragStartInputX, Math.max(10, nextW));
          nextH = Math.min(adminFrameNaturalHeight - adminDragStartInputY, Math.max(10, nextH));
          
          wInput.value = Math.round(nextW);
          hInput.value = Math.round(nextH);
        }
        
        updateAdminPreviewOverlay();
      };
      
      const handleEnd = () => {
        adminActiveDragBox = null;
        adminActiveGroupEl = null;
        adminDragMode = null;
      };
      
      overlay.addEventListener('mousedown', (e) => {
        handleStart(e.clientX, e.clientY, e.target);
        e.preventDefault();
      });
      
      window.addEventListener('mousemove', (e) => {
        handleMove(e.clientX, e.clientY);
      });
      
      window.addEventListener('mouseup', handleEnd);
      
      overlay.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY, e.target);
        if (e.cancelable) e.preventDefault();
      }, { passive: false });
      
      window.addEventListener('touchmove', (e) => {
        if (!adminActiveDragBox) return;
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
        if (e.cancelable) e.preventDefault();
      }, { passive: false });
      
      window.addEventListener('touchend', handleEnd);
    }
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
    
    // Load global GDrive config first so it's loaded before we select a frame
    try {
      const configRes = await fetch('api.php?action=get_config');
      const configData = await configRes.json();
      globalConfig = configData;
      if (globalGDriveFolderId) globalGDriveFolderId.value = configData.gdrive_folder_id || '';
      if (globalGDriveScriptUrl) globalGDriveScriptUrl.value = configData.gdrive_script_url || '';
      if (globalGdriveStatus) {
        globalGdriveStatus.textContent = configData.gdrive_folder_id ? '✅ Aktif' : 'Belum disetel';
        globalGdriveStatus.style.color = configData.gdrive_folder_id ? '#34d399' : 'var(--text-muted)';
      }

      // Load global QRIS config info
      if (configData.qris_image) {
        if (adminQrisStatus) adminQrisStatus.textContent = '✅ Aktif';
        if (adminQrisPreviewContainer && adminQrisPreviewImg) {
          adminQrisPreviewImg.src = configData.qris_image;
          adminQrisPreviewContainer.style.display = 'block';
        }
        if (printOrderQrisImg) printOrderQrisImg.src = configData.qris_image;
      }

      // Apply Print Feature Toggle Config
      applyPrintFeatureConfig(configData.print_enabled !== false);
    } catch (e) {
      console.warn('Could not load global config:', e);
    }
    
    // Initialize Database
    await initDBAndFrames();
    
    // Load default frame or list from database
    const frames = await getAllFrames();
    if (frames.length > 0) {
      selectFrame(frames[0]);
    } else {
      loadDefaultFrame();
    }
    
    // Render selectors
    await renderEditorFrameSelector();
    
    resetMediaTransformations();
    updateSlotThumbnails();
    startCanvasLoop();

    // Admin: save global GDrive config
    if (btnSaveGlobalGDrive) {
      btnSaveGlobalGDrive.addEventListener('click', async () => {
        const folderId = globalGDriveFolderId ? globalGDriveFolderId.value.trim() : '';
        const scriptUrl = globalGDriveScriptUrl ? globalGDriveScriptUrl.value.trim() : '';
        try {
          const res = await fetch('api.php?action=save_config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gdrive_folder_id: folderId, gdrive_script_url: scriptUrl, password: '354313' })
          });
          const data = await res.json();
          if (data.success) {
            globalConfig.gdrive_folder_id = folderId;
            globalConfig.gdrive_script_url = scriptUrl;
            if (globalGdriveStatus) {
              globalGdriveStatus.textContent = folderId ? '✅ Aktif' : 'Belum disetel';
              globalGdriveStatus.style.color = folderId ? '#34d399' : 'var(--text-muted)';
            }
            updateGDriveCardVisibility();
            alert('Pengaturan Google Drive Global berhasil disimpan! Semua bingkai kini bisa menggunakan Google Drive.');
            if (scriptUrl) localStorage.setItem('last_gdrive_script_url', scriptUrl);
          } else {
            alert('Gagal menyimpan: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (e) {
          alert('Gagal menghubungkan ke server.');
        }
      });
    }

    // Admin: toggle print feature
    if (togglePrintFeature) {
      togglePrintFeature.addEventListener('change', async () => {
        const isEnabled = togglePrintFeature.checked;
        try {
          const res = await fetch('api.php?action=save_config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ print_enabled: isEnabled, password: '354313' })
          });
          const data = await res.json();
          if (data.success) {
            globalConfig.print_enabled = isEnabled;
            applyPrintFeatureConfig(isEnabled);
            if (!isEnabled && printOrderModal && !printOrderModal.classList.contains('hidden')) {
              printOrderModal.classList.add('hidden');
            }
          } else {
            togglePrintFeature.checked = !isEnabled;
            alert('Gagal mengubah status fitur cetak: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (e) {
          togglePrintFeature.checked = !isEnabled;
          alert('Gagal menghubungkan ke server.');
        }
      });
    }
    
    // Pre-populate last used Google Apps Script URL
    if (newFrameGDriveScriptUrl) {
      const savedUrl = localStorage.getItem('last_gdrive_script_url');
      if (savedUrl) {
        newFrameGDriveScriptUrl.value = savedUrl;
      }
    }
    
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
        activeTabId = targetTab;
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

        // Redraw to show/hide selection dashed border!
        draw();
      });
    });
  }

  // --- FRAME LOADING ---
  function loadDefaultFrame() {
    defaultFrameUrl = 'twibonze CAI26 (1).png';
    activeFrame = {
      id: 'default_cai_2026',
      name: 'CAI Lombok 2026',
      src: defaultFrameUrl,
      isDefault: true,
      slots_count: 4,
      slots: [
        {"x": 92, "y": 153, "width": 896, "height": 413},
        {"x": 92, "y": 582, "width": 442, "height": 498},
        {"x": 546, "y": 582, "width": 442, "height": 243},
        {"x": 546, "y": 837, "width": 442, "height": 243}
      ]
    };
    frameImage.src = defaultFrameUrl;
    updateSlotsVisibility(4);
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // File inputs
    fileFrameInput.addEventListener('change', handleCustomFrameUpload);
    btnUploadFrame.addEventListener('click', () => fileFrameInput.click());
    btnClearCustomFrame.addEventListener('click', removeCustomFrame);

    // Media inputs
    uploadGalleryCard.addEventListener('click', () => {
      fileMediaInput.value = '';
      fileMediaInput.click();
    });
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
          
          const img = new Image();
          img.onload = () => {
            adminFrameNaturalWidth = img.naturalWidth;
            adminFrameNaturalHeight = img.naturalHeight;
            
            const previewImg = document.getElementById('adminPreviewImage');
            const previewContainer = document.getElementById('adminLayoutPreviewContainer');
            const configWrapper = document.getElementById('adminSlotsConfigWrapper');
            const scaleHeading = document.getElementById('adminScaleHeading');
            
            if (previewImg && previewContainer && configWrapper) {
              previewImg.src = event.target.result;
              previewContainer.style.display = 'block';
              configWrapper.style.display = 'flex';
              
              if (scaleHeading) {
                scaleHeading.textContent = `Atur Posisi Area Foto (Skala ${adminFrameNaturalWidth}x${adminFrameNaturalHeight})`;
              }
              
              document.querySelectorAll('.slot-coord-group').forEach(group => {
                const xIn = group.querySelector('.slot-x');
                const yIn = group.querySelector('.slot-y');
                const wIn = group.querySelector('.slot-w');
                const hIn = group.querySelector('.slot-h');
                
                if (xIn && xIn.value === '0') xIn.value = '0';
                if (yIn && yIn.value === '0') yIn.value = '0';
                if (wIn && (wIn.value === '1080' || wIn.value === '')) wIn.value = adminFrameNaturalWidth;
                if (hIn && (hIn.value === '1080' || hIn.value === '')) hIn.value = adminFrameNaturalHeight;
              });
              
              const slotsCountEl = document.getElementById('newFrameSlotsCount');
              if (slotsCountEl) {
                slotsCountEl.dispatchEvent(new Event('change'));
              }
            }
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    // Slots Count dropdown listener to toggle inputs and preview overlay
    const newFrameSlotsCount = document.getElementById('newFrameSlotsCount');
    if (newFrameSlotsCount) {
      newFrameSlotsCount.addEventListener('change', () => {
        const count = parseInt(newFrameSlotsCount.value || 4);
        document.querySelectorAll('.slot-coord-group').forEach((group, idx) => {
          if (idx < count) {
            group.style.display = 'block';
          } else {
            group.style.display = 'none';
          }
        });
        updateAdminPreviewOverlay();
      });
    }

    // Input listeners to update the layout overlay live
    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('slot-x') || 
          e.target.classList.contains('slot-y') || 
          e.target.classList.contains('slot-w') || 
          e.target.classList.contains('slot-h')) {
        updateAdminPreviewOverlay();
      }
    });

    if (btnAdminSaveFrame) {
      btnAdminSaveFrame.addEventListener('click', handleAdminSaveFrame);
    }

    // Google Drive Event Listeners
    if (btnShowGDriveGuide) {
      btnShowGDriveGuide.addEventListener('click', (e) => {
        e.preventDefault();
        gdriveGuideModal.classList.remove('hidden');
      });
    }
    if (btnCloseGDriveGuide) {
      btnCloseGDriveGuide.addEventListener('click', () => {
        gdriveGuideModal.classList.add('hidden');
      });
    }
    if (btnCloseGDriveSelector) {
      btnCloseGDriveSelector.addEventListener('click', () => {
        gdriveSelectorModal.classList.add('hidden');
      });
    }

    if (btnCloseGDriveEdit) {
      btnCloseGDriveEdit.addEventListener('click', () => {
        gdriveEditModal.classList.add('hidden');
      });
    }
    if (btnSaveGDriveEdit) {
      btnSaveGDriveEdit.addEventListener('click', async () => {
        const frameId = editGDriveFrameId.value;
        const folderId = editGDriveFolderId.value.trim();
        const scriptUrl = editGDriveScriptUrl.value.trim();
        
        if (scriptUrl) {
          localStorage.setItem('last_gdrive_script_url', scriptUrl);
        }
        
        try {
          const response = await fetch('api.php?action=edit_gdrive', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: frameId,
              gdrive_folder_id: folderId,
              gdrive_script_url: scriptUrl,
              password: '354313'
            })
          });
          const data = await response.json();
          if (response.ok && data.success) {
            alert('Pengaturan Google Drive berhasil disimpan!');
            gdriveEditModal.classList.add('hidden');
            
            await renderAdminFrameList();
            const frames = await getAllFrames();
            if (activeFrame && activeFrame.id === frameId) {
              const updated = frames.find(f => f.id === frameId);
              if (updated) {
                activeFrame = updated;
                updateGDriveCardVisibility(updated);
              }
            }
            await renderEditorFrameSelector();
          } else {
            alert('Gagal menyimpan pengaturan: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (err) {
          console.error(err);
          alert('Gagal menghubungkan ke server.');
        }
      });
    }

    if (gdriveCard) {
      gdriveCard.addEventListener('click', async () => {
        // Use per-frame config, fall back to global config
        const folderId = (activeFrame && activeFrame.gdrive_folder_id) || globalConfig.gdrive_folder_id;
        const scriptUrl = (activeFrame && activeFrame.gdrive_script_url) || globalConfig.gdrive_script_url;

        if (!folderId || !scriptUrl) {
          alert('Google Drive belum dikonfigurasi. Silakan isi ID Folder dan URL Apps Script di bagian Admin.');
          return;
        }

        // Reset navigation stack to root folder
        gdriveFolderStack = [{ id: folderId, name: 'Drive Saya' }];
        gdriveSelectorModal.classList.remove('hidden');
        await loadGDriveFolder(folderId, scriptUrl);
      });
    }

    async function loadGDriveFolder(folderId, scriptUrl) {
      gdrivePhotoGrid.innerHTML = '';
      gdriveLoader.style.display = 'flex';
      gdriveError.style.display = 'none';

      // Render breadcrumb
      renderGDriveBreadcrumb(scriptUrl);

      const fetchUrl = `api.php?action=gdrive_files&folder_id=${encodeURIComponent(folderId)}&script_url=${encodeURIComponent(scriptUrl)}`;

      try {
        const response = await fetch(fetchUrl);
        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (jsonErr) {
          console.error('Non-JSON response:', text);
          throw new Error('Respons server tidak valid (bukan format JSON). Silakan periksa URL Apps Script Anda.');
        }

        gdriveLoader.style.display = 'none';

        if (data && data.success) {
          const folders = data.folders || [];
          const files = data.files || [];

          if (folders.length === 0 && files.length === 0) {
            gdriveError.style.display = 'block';
            gdriveErrorMessage.textContent = 'Folder ini kosong (tidak ada subfolder atau foto).';
            return;
          }

          // Render subfolder buttons
          if (folders.length > 0) {
            const folderRow = document.createElement('div');
            folderRow.style.cssText = 'display:flex; flex-direction:column; gap:8px; margin-bottom: 12px;';

            const folderLabel = document.createElement('div');
            folderLabel.style.cssText = 'font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;';
            folderLabel.textContent = `📁 ${folders.length} Folder`;
            folderRow.appendChild(folderLabel);

            const folderGrid = document.createElement('div');
            folderGrid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:8px;';

            folders.forEach(folder => {
              const btn = document.createElement('button');
              btn.style.cssText = 'display:flex; align-items:center; gap:8px; padding:10px 12px; background:rgba(255,255,255,0.04); border:1px solid var(--panel-border); border-radius:8px; cursor:pointer; color:var(--text-primary); font-size:12px; font-weight:600; text-align:left; transition:background 0.2s; width:100%; overflow:hidden;';
              btn.innerHTML = `<i class="fa-solid fa-folder" style="color:#fbbf24; font-size:16px; flex-shrink:0;"></i><span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${folder.name}</span>`;
              btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(255,255,255,0.08)');
              btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(255,255,255,0.04)');
              btn.addEventListener('click', async () => {
                gdriveFolderStack.push({ id: folder.id, name: folder.name });
                await loadGDriveFolder(folder.id, scriptUrl);
              });
              folderGrid.appendChild(btn);
            });
            folderRow.appendChild(folderGrid);
            gdrivePhotoGrid.appendChild(folderRow);
          }

          // Render photo grid
          if (files.length > 0) {
            const photoSection = document.createElement('div');

            const photoLabel = document.createElement('div');
            photoLabel.style.cssText = 'font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;';
            photoLabel.textContent = `🖼️ ${files.length} Foto`;
            photoSection.appendChild(photoLabel);

            const photoGrid = document.createElement('div');
            photoGrid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(100px, 1fr)); gap:8px;';

            files.forEach(file => {
              const item = document.createElement('div');
              item.style.cssText = 'cursor:pointer; border:2px solid transparent; border-radius:8px; overflow:hidden; transition:border-color 0.2s, transform 0.15s; background:rgba(0,0,0,0.2);';
              const thumbUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w200`;
              item.innerHTML = `
                <img src="${thumbUrl}" alt="${file.name}" style="width:100%; aspect-ratio:1/1; object-fit:cover; display:block;">
                <div style="font-size:10px; padding:4px 6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text-muted);">${file.name}</div>
              `;
              item.addEventListener('mouseenter', () => { item.style.borderColor = '#10b981'; item.style.transform = 'scale(1.03)'; });
              item.addEventListener('mouseleave', () => { item.style.borderColor = 'transparent'; item.style.transform = 'scale(1)'; });
              item.addEventListener('click', () => {
                const proxyImageUrl = `api.php?action=gdrive_proxy&file_id=${file.id}`;
                closeCamera();
                mediaType = 'image';
                gdriveSelectorModal.classList.add('hidden');

                // Show canvas loading overlay while proxy downloads image
                if (canvasLoadingOverlay) canvasLoadingOverlay.style.display = 'flex';

                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                  if (canvasLoadingOverlay) canvasLoadingOverlay.style.display = 'none';
                  mediaElement = img;
                  mediaWidth = img.naturalWidth;
                  mediaHeight = img.naturalHeight;
                  slots[activeSlotIndex].mediaType = 'image';
                  slots[activeSlotIndex].mediaElement = img;
                  slots[activeSlotIndex].mediaWidth = img.naturalWidth;
                  slots[activeSlotIndex].mediaHeight = img.naturalHeight;
                  slots[activeSlotIndex].name = file.name;
                  slots[activeSlotIndex].typeLabel = 'FOTO';
                  showActiveMediaBadge(file.name, 'FOTO');
                  resetMediaTransformations();
                  showQuickPanels();
                  updateSlotThumbnails();
                  // Tetap di tab Media — user bisa langsung geser/zoom di canvas
                };
                img.onerror = () => {
                  if (canvasLoadingOverlay) canvasLoadingOverlay.style.display = 'none';
                  alert('Gagal mengunduh foto dari Google Drive. Silakan coba lagi.');
                };
                img.src = proxyImageUrl;
              });
              photoGrid.appendChild(item);
            });
            photoSection.appendChild(photoGrid);
            gdrivePhotoGrid.appendChild(photoSection);
          }
        } else {
          gdriveError.style.display = 'block';
          gdriveErrorMessage.textContent = 'Gagal memuat: ' + (data.error || 'Terjadi kesalahan.');
        }
      } catch (err) {
        console.error(err);
        gdriveLoader.style.display = 'none';
        gdriveError.style.display = 'block';
        gdriveErrorMessage.textContent = err.message || 'Gagal menghubungkan ke Google Drive proxy.';
      }
    }

    function renderGDriveBreadcrumb(scriptUrl) {
      if (!gdriveBreadcrumb) return;
      gdriveBreadcrumb.innerHTML = '';
      gdriveFolderStack.forEach((crumb, idx) => {
        const span = document.createElement('span');
        span.style.cssText = 'cursor:pointer; display:flex; align-items:center; gap:3px;';
        if (idx === gdriveFolderStack.length - 1) {
          span.style.color = 'var(--text-primary)';
          span.style.fontWeight = '600';
          span.style.cursor = 'default';
        } else {
          span.style.color = '#34d399';
          span.style.textDecoration = 'underline';
          span.addEventListener('click', async () => {
            gdriveFolderStack = gdriveFolderStack.slice(0, idx + 1);
            await loadGDriveFolder(crumb.id, scriptUrl);
          });
        }
        if (idx === 0) {
          span.innerHTML = `<i class="fa-solid fa-house" style="font-size:10px;"></i> ${crumb.name}`;
        } else {
          span.textContent = crumb.name;
        }
        gdriveBreadcrumb.appendChild(span);
        if (idx < gdriveFolderStack.length - 1) {
          const sep = document.createElement('span');
          sep.textContent = '›';
          sep.style.color = 'var(--text-muted)';
          gdriveBreadcrumb.appendChild(sep);
        }
      });
    }

    // Slot selector buttons
    document.querySelectorAll('.slot-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        loadActiveSlotState(idx);
      });
    });

    // --- PRINT ORDER (CETAK FOTO) EVENTS ---
    const openPrintOrderModal = () => {
      if (globalConfig && globalConfig.print_enabled === false) {
        alert('Fitur cetak foto saat ini sedang dinonaktifkan oleh administrator.');
        return;
      }

      const hasMedia = slots.some(s => s.mediaElement);
      if (!hasMedia) {
        alert('Unggah foto/video atau gunakan kamera terlebih dahulu!');
        return;
      }
      
      if (printOrderName) printOrderName.value = '';
      if (printOrderWhatsapp) printOrderWhatsapp.value = '';
      if (printOrderPaymentMethod) printOrderPaymentMethod.value = 'cash';
      if (printOrderQrisContainer) printOrderQrisContainer.style.display = 'none';
      if (printOrderPaymentProofInput) printOrderPaymentProofInput.value = '';
      if (printOrderPaymentProofFileName) printOrderPaymentProofFileName.textContent = 'Belum ada bukti pembayaran terpilih';

      if (globalConfig && globalConfig.qris_image) {
        if (printOrderQrisImg) printOrderQrisImg.src = globalConfig.qris_image;
      }

      if (printOrderModal) printOrderModal.classList.remove('hidden');
    };

    if (btnExportPrint) btnExportPrint.addEventListener('click', openPrintOrderModal);
    if (btnQuickExportPrint) btnQuickExportPrint.addEventListener('click', openPrintOrderModal);

    if (btnClosePrintOrderModal) {
      btnClosePrintOrderModal.addEventListener('click', () => {
        if (printOrderModal) printOrderModal.classList.add('hidden');
      });
    }

    if (printOrderPaymentMethod) {
      printOrderPaymentMethod.addEventListener('change', (e) => {
        if (printOrderQrisContainer) {
          if (e.target.value === 'qris') {
            printOrderQrisContainer.style.display = 'flex';
          } else {
            printOrderQrisContainer.style.display = 'none';
          }
        }
      });
    }

    if (printOrderPaymentProofInput) {
      printOrderPaymentProofInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (printOrderPaymentProofFileName) {
          printOrderPaymentProofFileName.textContent = file ? file.name : 'Belum ada bukti pembayaran terpilih';
        }
      });
    }

    if (btnSubmitPrintOrder) {
      btnSubmitPrintOrder.addEventListener('click', async () => {
        const name = printOrderName ? printOrderName.value.trim() : '';
        const whatsapp = printOrderWhatsapp ? printOrderWhatsapp.value.trim() : '';
        const paymentMethod = printOrderPaymentMethod ? printOrderPaymentMethod.value : 'cash';
        
        if (!name || !whatsapp) {
          alert('Nama dan No WhatsApp wajib diisi.');
          return;
        }

        const proofFile = (paymentMethod === 'qris' && printOrderPaymentProofInput) ? printOrderPaymentProofInput.files[0] : null;
        if (paymentMethod === 'qris' && !proofFile) {
          alert('Silakan pilih file bukti pembayaran QRIS (foto/tangkapan layar) terlebih dahulu.');
          return;
        }

        btnSubmitPrintOrder.disabled = true;
        const originalText = btnSubmitPrintOrder.innerHTML;
        btnSubmitPrintOrder.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesanan...';

        try {
          isExporting = true;
          draw(); // clean redraw without guides
          
          canvas.toBlob(async (blob) => {
            isExporting = false;
            draw(); // restore guides

            if (!blob) {
              alert('Gagal menghasilkan gambar twibbon.');
              btnSubmitPrintOrder.disabled = false;
              btnSubmitPrintOrder.innerHTML = originalText;
              return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('whatsapp', whatsapp);
            formData.append('payment_method', paymentMethod);
            formData.append('twibbon_image', blob, 'twibbon.png');
            if (proofFile) {
              formData.append('payment_proof', proofFile);
            }

            try {
              const response = await fetch('api.php?action=create_order', {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (response.ok && data.success) {
                alert('Pesanan cetak berhasil dikirim! Silakan tunggu antrian Anda di monitor.');
                if (printOrderModal) printOrderModal.classList.add('hidden');
              } else {
                alert('Gagal mengirim pesanan: ' + (data.error || 'Terjadi kesalahan.'));
              }
            } catch (err) {
              console.error(err);
              alert('Gagal menghubungi server.');
            } finally {
              btnSubmitPrintOrder.disabled = false;
              btnSubmitPrintOrder.innerHTML = originalText;
            }
          }, 'image/png');

        } catch (e) {
          isExporting = false;
          draw();
          alert('Terjadi kesalahan saat memproses gambar.');
          btnSubmitPrintOrder.disabled = false;
          btnSubmitPrintOrder.innerHTML = originalText;
        }
      });
    }

    // Admin: QRIS file input and upload
    if (adminQrisFileInput) {
      adminQrisFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (adminQrisFileName) {
          adminQrisFileName.textContent = file ? file.name : 'Belum ada QRIS terpilih';
        }
      });
    }

    if (btnSaveQrisConfig) {
      btnSaveQrisConfig.addEventListener('click', async () => {
        const file = adminQrisFileInput ? adminQrisFileInput.files[0] : null;
        if (!file) {
          alert('Silakan pilih file QRIS terlebih dahulu.');
          return;
        }

        const formData = new FormData();
        formData.append('qris_image', file);
        formData.append('password', '354313');

        btnSaveQrisConfig.disabled = true;
        const originalText = btnSaveQrisConfig.innerHTML;
        btnSaveQrisConfig.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengunggah...';

        try {
          const res = await fetch('api.php?action=upload_qris', {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          if (res.ok && data.success) {
            alert('Gambar QRIS Toko berhasil diperbarui!');
            if (globalConfig) globalConfig.qris_image = data.qris_image;
            if (adminQrisStatus) adminQrisStatus.textContent = '✅ Aktif';
            if (adminQrisPreviewContainer && adminQrisPreviewImg) {
              adminQrisPreviewImg.src = data.qris_image;
              adminQrisPreviewContainer.style.display = 'block';
            }
            if (printOrderQrisImg) printOrderQrisImg.src = data.qris_image;
            adminQrisFileInput.value = '';
            adminQrisFileName.textContent = 'Belum ada QRIS terpilih';
          } else {
            alert('Gagal mengunggah QRIS: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (e) {
          console.error(e);
          alert('Gagal menghubungi server.');
        } finally {
          btnSaveQrisConfig.disabled = false;
          btnSaveQrisConfig.innerHTML = originalText;
        }
      });
    }
  }

  // --- SLOT MANAGEMENT HELPERS ---
  function saveActiveSlotState() {
    const slot = slots[activeSlotIndex];
    if (!slot) return;
    slot.mediaType = mediaType;
    slot.mediaElement = mediaElement;
    slot.mediaWidth = mediaWidth;
    slot.mediaHeight = mediaHeight;
    slot.posX = posX;
    slot.posY = posY;
    slot.scale = scale;
    slot.rotateAngle = rotateAngle;
    slot.flipHorizontal = flipHorizontal;
  }

  function loadActiveSlotState(index) {
    // First save current active slot state
    saveActiveSlotState();
    
    // Set the new slot index
    activeSlotIndex = index;
    
    // Load state from slot
    const slot = slots[activeSlotIndex];
    mediaType = slot.mediaType;
    mediaElement = slot.mediaElement;
    mediaWidth = slot.mediaWidth;
    mediaHeight = slot.mediaHeight;
    posX = slot.posX;
    posY = slot.posY;
    scale = slot.scale;
    rotateAngle = slot.rotateAngle;
    flipHorizontal = slot.flipHorizontal;
    
    // Update UI controls
    sliderScale.value = scale;
    valScale.textContent = Math.round(scale * 100) + '%';
    if (quickSliderScale) {
      quickSliderScale.value = scale;
      quickValScale.textContent = Math.round(scale * 100) + '%';
    }
    const deg = Math.round(rotateAngle * 180 / Math.PI);
    sliderRotate.value = deg;
    valRotate.textContent = deg + '°';
    
    if (mediaElement) {
      showActiveMediaBadge(slot.name, slot.typeLabel);
      showQuickPanels();
    } else {
      activeMediaCard.style.display = 'none';
      hideQuickPanels();
    }
    
    // Update active slot button highlight
    document.querySelectorAll('.slot-btn').forEach((btn, idx) => {
      if (idx === activeSlotIndex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    draw();
  }

  function updateSlotThumbnails() {
    slots.forEach((slot, idx) => {
      const btn = document.querySelector(`.slot-btn[data-slot="${idx}"]`);
      if (btn) {
        const thumb = btn.querySelector('.slot-thumb');
        if (slot.mediaElement) {
          if (slot.mediaType === 'image') {
            thumb.innerHTML = `<img src="${slot.mediaElement.src}" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />`;
          } else if (slot.mediaType === 'video') {
            thumb.innerHTML = `<i class="fa-solid fa-video text-success" style="font-size:18px;"></i>`;
          } else if (slot.mediaType === 'camera') {
            thumb.innerHTML = `<i class="fa-solid fa-camera text-success" style="font-size:18px;"></i>`;
          }
        } else {
          thumb.innerHTML = `<i class="fa-solid fa-image"></i>`;
        }
      }
    });
  }

  // --- TRANSFORMATION MANAGEMENT ---
  function resetMediaTransformations() {
    posX = 0;
    posY = 0;
    
    // Calculate default fit scale if media is present
    if (mediaElement && mediaWidth > 0 && mediaHeight > 0) {
      // Find the slot width and height
      let slotW = canvas.width;
      let slotH = canvas.height;
      if (activeFrame && activeFrame.slots && activeFrame.slots[activeSlotIndex]) {
        slotW = activeFrame.slots[activeSlotIndex].width || canvas.width;
        slotH = activeFrame.slots[activeSlotIndex].height || canvas.height;
      }
      scale = Math.max(slotW / mediaWidth, slotH / mediaHeight);
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
        updateSlotsVisibility(4); // Custom uploaded frames default to 4 slots
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
        
        slots[activeSlotIndex].mediaType = 'image';
        slots[activeSlotIndex].mediaElement = img;
        slots[activeSlotIndex].mediaWidth = img.naturalWidth;
        slots[activeSlotIndex].mediaHeight = img.naturalHeight;
        slots[activeSlotIndex].name = file.name;
        slots[activeSlotIndex].typeLabel = 'FOTO';
        
        showActiveMediaBadge(file.name, 'FOTO');
        resetMediaTransformations();
        showQuickPanels();
        updateSlotThumbnails();
        // Tetap di tab Media — user bisa langsung geser/zoom canvas
      };
      img.src = URL.createObjectURL(file);
    } else if (file.type.startsWith('video/')) {
      mediaType = 'video';
      
      const slotVideo = document.createElement('video');
      slotVideo.style.display = 'none';
      slotVideo.loop = true;
      slotVideo.crossOrigin = 'anonymous';
      slotVideo.playsInline = true;
      slotVideo.muted = true;
      slotVideo.src = URL.createObjectURL(file);
      slotVideo.load();
      slotVideo.onloadedmetadata = () => {
        mediaElement = slotVideo;
        mediaWidth = slotVideo.videoWidth;
        mediaHeight = slotVideo.videoHeight;
        
        slots[activeSlotIndex].mediaType = 'video';
        slots[activeSlotIndex].mediaElement = slotVideo;
        slots[activeSlotIndex].mediaWidth = slotVideo.videoWidth;
        slots[activeSlotIndex].mediaHeight = slotVideo.videoHeight;
        slots[activeSlotIndex].name = file.name;
        slots[activeSlotIndex].typeLabel = 'VIDEO';
        
        showActiveMediaBadge(file.name, 'VIDEO');
        resetMediaTransformations();
        showQuickPanels();
        updateSlotThumbnails();
        
        slotVideo.play().catch(err => console.log('Autoplay blocked:', err));
        // Tetap di tab Media — user bisa langsung geser/zoom canvas
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
    if (mediaType === 'video' && mediaElement) {
      mediaElement.pause();
      mediaElement.src = '';
    }
    
    mediaType = null;
    mediaElement = null;
    mediaWidth = 0;
    mediaHeight = 0;
    
    const slot = slots[activeSlotIndex];
    if (slot) {
      slot.mediaType = null;
      slot.mediaElement = null;
      slot.mediaWidth = 0;
      slot.mediaHeight = 0;
      slot.name = '';
      slot.typeLabel = '';
    }
    
    activeMediaCard.style.display = 'none';
    fileMediaInput.value = '';
    resetMediaTransformations();
    hideQuickPanels();
    updateSlotThumbnails();
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
        
        slots[activeSlotIndex].mediaType = 'camera';
        slots[activeSlotIndex].mediaElement = cameraVideo;
        slots[activeSlotIndex].mediaWidth = cameraVideo.videoWidth || 1080;
        slots[activeSlotIndex].mediaHeight = cameraVideo.videoHeight || 1080;
        slots[activeSlotIndex].name = 'Kamera Langsung';
        slots[activeSlotIndex].typeLabel = 'KAMERA';
        slots[activeSlotIndex].flipHorizontal = flipHorizontal;
        
        resetMediaTransformations();
        if (quickAdjustPanel) quickAdjustPanel.style.display = 'block';
        if (quickCameraControls) quickCameraControls.style.display = 'block';
        updateSlotThumbnails();
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
          
          slots[activeSlotIndex].mediaType = 'camera';
          slots[activeSlotIndex].mediaElement = cameraVideo;
          slots[activeSlotIndex].mediaWidth = cameraVideo.videoWidth || 640;
          slots[activeSlotIndex].mediaHeight = cameraVideo.videoHeight || 480;
          slots[activeSlotIndex].name = 'Kamera Langsung';
          slots[activeSlotIndex].typeLabel = 'KAMERA';
          slots[activeSlotIndex].flipHorizontal = flipHorizontal;
          
          resetMediaTransformations();
          if (quickAdjustPanel) quickAdjustPanel.style.display = 'block';
          if (quickCameraControls) quickCameraControls.style.display = 'block';
          updateSlotThumbnails();
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
      
      const fileName = 'foto-kamera-' + Date.now() + '.jpg';
      slots[activeSlotIndex].mediaType = 'image';
      slots[activeSlotIndex].mediaElement = capturedImg;
      slots[activeSlotIndex].mediaWidth = capturedImg.width;
      slots[activeSlotIndex].mediaHeight = capturedImg.height;
      slots[activeSlotIndex].name = fileName;
      slots[activeSlotIndex].typeLabel = 'FOTO';
      
      showActiveMediaBadge(fileName, 'FOTO');
      resetMediaTransformations();
      showQuickPanels();
      updateSlotThumbnails();
      
      // Close the stream — tetap di tab Media, user bisa langsung geser/zoom
      closeCamera();
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
    
    // Check if it is a dual touch (pinch to zoom)
    if (e.touches && e.touches.length === 2) {
      startTouchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startTouchScale = scale;
      if (e.cancelable) e.preventDefault();
      return;
    }
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Convert client coordinates to 1080x1080 canvas coordinates
    const clickX = (clientX - rect.left) * scaleX;
    const clickY = (clientY - rect.top) * scaleY;

    // If slots are defined, check if click is inside any slot's bounding box
    if (activeFrame && activeFrame.slots && activeFrame.slots.length > 0) {
      const clickedSlotIdx = activeFrame.slots.findIndex((slot, idx) => {
        // Only check slots that are within the current slots count of the frame
        const count = activeFrame.slots_count || 4;
        if (idx >= count) return false;
        
        const x = slot.x !== undefined ? slot.x : 0;
        const y = slot.y !== undefined ? slot.y : 0;
        const w = slot.width !== undefined ? slot.width : canvas.width;
        const h = slot.height !== undefined ? slot.height : canvas.height;
        return (clickX >= x && clickX <= x + w && clickY >= y && clickY <= y + h);
      });
      
      if (clickedSlotIdx !== -1 && clickedSlotIdx !== activeSlotIndex) {
        loadActiveSlotState(clickedSlotIdx);
      }
    }

    startX = (clientX * scaleX) - posX;
    startY = (clientY * scaleY) - posY;
    
    if (e.cancelable) e.preventDefault();
  }

  function drag(e) {
    if (!isDragging || !mediaElement) return;
    
    // Check if it is a dual touch (pinch to zoom)
    if (e.touches && e.touches.length === 2) {
      if (startTouchDistance > 0) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = currentDistance / startTouchDistance;
        // Limit scale between 0.1 and 3.0
        scale = Math.min(3, Math.max(0.1, startTouchScale * ratio));
        
        // Sync sliders and display values
        sliderScale.value = scale;
        valScale.textContent = Math.round(scale * 100) + '%';
        if (quickSliderScale) {
          quickSliderScale.value = scale;
          quickValScale.textContent = Math.round(scale * 100) + '%';
        }
        
        draw();
      }
      if (e.cancelable) e.preventDefault();
      return;
    }
    
    // Ignore single touch drag updates if the user is in pinch mode
    if (e.touches && e.touches.length !== 1) {
      return;
    }
    
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
    startTouchDistance = 0;
  }

  // --- DRAW ROUTINE ---
  function draw() {
    // 1. Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#050714'; // Matching brand theme background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Auto-save the active slot state before rendering all
    saveActiveSlotState();
    
    // 2. Draw all slot media in order
    slots.forEach((slot, idx) => {
      if (slot.mediaElement) {
        // Retrieve slot coordinate from activeFrame metadata
        let clipX = 0;
        let clipY = 0;
        let clipW = canvas.width;
        let clipH = canvas.height;
        let hasSlotCoords = false;
        
        if (activeFrame && activeFrame.slots && activeFrame.slots[idx]) {
          const frameSlot = activeFrame.slots[idx];
          clipX = frameSlot.x !== undefined ? frameSlot.x : 0;
          clipY = frameSlot.y !== undefined ? frameSlot.y : 0;
          clipW = frameSlot.width !== undefined ? frameSlot.width : canvas.width;
          clipH = frameSlot.height !== undefined ? frameSlot.height : canvas.height;
          hasSlotCoords = true;
        }
        
        const slotCenterX = clipX + clipW / 2;
        const slotCenterY = clipY + clipH / 2;
        
        // Draw the image with clipping mask
        ctx.save();
        
        if (hasSlotCoords) {
          ctx.beginPath();
          ctx.rect(clipX, clipY, clipW, clipH);
          ctx.clip();
        }
        
        // Move to the slot's center + offset, then rotate & scale
        ctx.translate(slotCenterX + slot.posX, slotCenterY + slot.posY);
        ctx.rotate(slot.rotateAngle);
        
        // Mirror horizontal scale if activated
        const currentScaleX = slot.flipHorizontal ? -slot.scale : slot.scale;
        ctx.scale(currentScaleX, slot.scale);
        
        // Draw centered around origin
        ctx.drawImage(
          slot.mediaElement, 
          -slot.mediaWidth / 2, 
          -slot.mediaHeight / 2, 
          slot.mediaWidth, 
          slot.mediaHeight
        );
        
        ctx.restore();
        
        // Draw outline aids ONLY during editing (never during export)
        if (idx === activeSlotIndex && (activeTabId === 'tab-adjust' || activeTabId === 'tab-media') && !isExporting) {
          // A. Draw a faint outline of the FULL photo boundaries (even cropped parts)
          ctx.save();
          ctx.translate(slotCenterX + slot.posX, slotCenterY + slot.posY);
          ctx.rotate(slot.rotateAngle);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(-slot.mediaWidth * slot.scale / 2, -slot.mediaHeight * slot.scale / 2, slot.mediaWidth * slot.scale, slot.mediaHeight * slot.scale);
          ctx.restore();
          
          // B. Draw a bright dashed blue border on the visible crop box (the slot itself)
          ctx.save();
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 4;
          ctx.setLineDash([12, 8]);
          ctx.strokeRect(clipX, clipY, clipW, clipH);
          ctx.restore();
        }
      }
    });
    
    // 3. Draw frame OVER the media
    if (frameImage.complete && frameImage.naturalWidth > 0) {
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
    }
  }

  // Canvas loop rendering for videos and live cameras
  function startCanvasLoop() {
    function loop() {
      let needsRedraw = false;
      slots.forEach(slot => {
        if (slot.mediaType === 'video' && slot.mediaElement && !slot.mediaElement.paused) {
          needsRedraw = true;
        } else if (slot.mediaType === 'camera') {
          needsRedraw = true;
        }
      });
      
      if (needsRedraw) {
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
    
    // Find the first video slot that has media
    const videoSlot = slots.find(s => s.mediaType === 'video' && s.mediaElement);
    if (videoSlot) {
      const vEl = videoSlot.mediaElement;
      const stream = vEl.captureStream ? vEl.captureStream() : vEl.mozCaptureStream();
      if (stream && stream.getAudioTracks().length > 0) {
        sourceAudioTrack = stream.getAudioTracks()[0];
      }
    } else {
      // Fallback to camera
      const cameraSlot = slots.find(s => s.mediaType === 'camera' && s.mediaElement);
      if (cameraSlot && cameraStream && cameraStream.getAudioTracks().length > 0) {
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
    const hasMedia = slots.some(s => s.mediaElement);
    if (!hasMedia) {
      alert('Unggah foto/video atau gunakan kamera terlebih dahulu!');
      return;
    }
    
    const hasVideo = slots.some(s => s.mediaType === 'video' || s.mediaType === 'camera');
    
    if (!hasVideo) {
      // Photo export — redraw clean (no guides) then export
      try {
        isExporting = true;
        draw(); // clean redraw without guides
        const dataUrl = canvas.toDataURL('image/png');
        isExporting = false;
        draw(); // restore guides
        const link = document.createElement('a');
        link.download = `twibbon-cai-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        isExporting = false;
        draw();
        alert('Gagal mengekspor foto. Hubungi administrator.');
        console.error(err);
      }
    } else {
      // Video export requires rendering/recording loop
      if (isRecording) {
        alert('Video sedang dalam proses perekaman!');
        return;
      }
      
      const videoSlot = slots.find(s => s.mediaType === 'video' && s.mediaElement);
      
      if (!videoSlot) {
        // If it's only camera, we export the recorded camera blob (which was saved on stop recording)
        if (window.lastExportedUrl && window.lastExportedBlob) {
          const link = document.createElement('a');
          link.download = window.lastExportedName;
          link.href = window.lastExportedUrl;
          link.click();
        } else {
          alert('Silakan ambil foto atau rekam video terlebih dahulu sebelum mengunduh hasil!');
        }
        return;
      }
      
      exportStatusPanel.style.display = 'block';
      exportProgressBar.style.width = '0%';
      exportStatusText.textContent = 'Mulai memproses video...';
      
      // Pause all videos and reset currentTime to 0
      slots.forEach(s => {
        if (s.mediaType === 'video' && s.mediaElement) {
          s.mediaElement.currentTime = 0;
          s.mediaElement.pause();
        }
      });
      
      // Track duration using the first video
      const vEl = videoSlot.mediaElement;
      const duration = vEl.duration;
      
      let progressInterval = setInterval(() => {
        const pct = (vEl.currentTime / duration) * 100;
        exportProgressBar.style.width = `${Math.min(pct, 98)}%`;
        exportStatusText.textContent = `Memproses video: ${Math.round(pct)}%`;
      }, 250);
      
      // Start recording frame sequence
      startCanvasRecording();
      
      // Trigger all videos to play
      try {
        const playPromises = slots
          .filter(s => s.mediaType === 'video' && s.mediaElement)
          .map(s => s.mediaElement.play());
        
        await Promise.all(playPromises);
        
        // Set event hook to stop recording when the main video ends
        vEl.onended = () => {
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
    }
  }

  async function shareMedia() {
    const hasMedia = slots.some(s => s.mediaElement);
    if (!hasMedia) {
      alert('Silakan masukkan media terlebih dahulu!');
      return;
    }
    
    let fileToShare = null;
    const hasVideo = slots.some(s => s.mediaType === 'video' || s.mediaType === 'camera');
    
    if (!hasVideo) {
      // Convert canvas to blob — clean render without guides
      isExporting = true;
      draw();
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      isExporting = false;
      draw(); // restore guides
      fileToShare = new File([blob], `twibbon-cai-${Date.now()}.png`, { type: 'image/png' });
    } else if (hasVideo || window.lastExportedBlob) {
      if (window.lastExportedBlob) {
        fileToShare = new File([window.lastExportedBlob], window.lastExportedName, { type: window.lastExportedBlob.type });
      } else {
        alert('Silakan klik "Download Hasil" terlebih dahulu untuk mengekspor video sebelum dibagikan.');
        return;
      }
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
