<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monitor Antrean Cetak - Twibbon CAI Lombok</title>
  
  <!-- FontAwesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Google Fonts Outfit -->
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-dark: #050714;
      --panel-bg: #0b0f26;
      --panel-border: rgba(96, 165, 250, 0.15);
      --primary: #ea580c;
      --primary-hover: #f97316;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --success: #10b981;
      --info: #3b82f6;
      --danger: #ef4444;
      --radius-lg: 16px;
      --radius-md: 12px;
      --radius-sm: 8px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 24px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--panel-border);
      padding-bottom: 16px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .brand-title {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      background: linear-gradient(135deg, var(--primary), var(--primary-hover));
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
      box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);
    }

    .brand-text h1 {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .brand-text p {
      font-size: 12px;
      color: var(--text-muted);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn {
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: var(--radius-sm);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--panel-border);
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .auth-badge {
      font-size: 11px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: var(--success);
      padding: 4px 10px;
      border-radius: 99px;
      font-weight: 600;
    }

    .tab-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--panel-border);
      padding-bottom: 8px;
    }

    .tab-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      transition: color 0.2s;
    }

    .tab-btn.active {
      color: var(--primary-hover);
    }

    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -9px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-hover);
      border-radius: 99px;
    }

    .badge-count {
      font-size: 10px;
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 99px;
      color: var(--text-main);
    }

    .tab-btn.active .badge-count {
      background: var(--primary);
    }

    .queue-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      flex-grow: 1;
    }

    .queue-card {
      background: var(--panel-bg);
      border: 1px solid var(--panel-border);
      border-radius: var(--radius-lg);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      transition: transform 0.2s, border-color 0.2s;
    }

    .queue-card:hover {
      transform: translateY(-2px);
      border-color: rgba(96, 165, 250, 0.3);
    }

    .queue-card.pending {
      border-left: 4px solid var(--primary);
    }

    .queue-card.completed {
      border-left: 4px solid var(--success);
      opacity: 0.85;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .customer-info h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .customer-info p {
      font-size: 12px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .time-badge {
      font-size: 11px;
      color: var(--text-muted);
      background: rgba(255,255,255,0.03);
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 500;
    }

    .media-preview-row {
      display: flex;
      gap: 12px;
    }

    .preview-box {
      flex: 1;
      aspect-ratio: 1/1;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.05);
      cursor: pointer;
      position: relative;
    }

    .preview-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .preview-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.7);
      padding: 4px 8px;
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      color: white;
    }

    .payment-tag {
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      align-self: flex-start;
    }

    .payment-tag.cash {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }

    .payment-tag.qris {
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
    }

    .card-footer {
      display: flex;
      gap: 8px;
      margin-top: auto;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 12px;
    }

    .card-footer .btn {
      flex: 1;
      justify-content: center;
      padding: 8px;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 80px 24px;
      color: var(--text-muted);
      background: var(--panel-bg);
      border: 1px dashed var(--panel-border);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .empty-state i {
      font-size: 48px;
      color: rgba(96, 165, 250, 0.2);
    }

    /* Modal Image Lightbox */
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(5, 7, 20, 0.95);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
    }

    .lightbox-content {
      max-width: 90vw;
      max-height: 80vh;
      border-radius: var(--radius-lg);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .lightbox-close {
      position: absolute;
      top: 24px;
      right: 24px;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .lightbox-actions {
      display: flex;
      gap: 12px;
    }

    /* Operator Login Overlay */
    .login-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(5, 7, 20, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .login-card {
      background: var(--panel-bg);
      border: 1px solid var(--panel-border);
      border-radius: var(--radius-lg);
      padding: 30px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      text-align: center;
    }

    .login-card h2 {
      margin-bottom: 8px;
      font-weight: 700;
    }

    .login-card p {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 20px;
    }

    .login-card input {
      width: 100%;
      padding: 12px;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--panel-border);
      color: white;
      border-radius: var(--radius-sm);
      margin-bottom: 16px;
      outline: none;
      text-align: center;
      font-size: 16px;
      font-family: inherit;
    }

    /* Auto-refresh control */
    .refresh-badge {
      font-size: 11px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: 99px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .refresh-badge span {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.6; }
    }
  </style>
</head>
<body>

  <header>
    <div class="brand-title">
      <div class="brand-logo">
        <i class="fa-solid fa-print"></i>
      </div>
      <div class="brand-text">
        <h1>Monitor Antrean Cetak</h1>
        <p>Pengelolaan antrean cetak twibbon & verifikasi pembayaran</p>
      </div>
    </div>
    
    <div class="header-actions">
      <div class="refresh-badge">
        <span></span> Auto Refresh (10s)
      </div>
      <div id="loginStatus" class="auth-badge" style="display:none;">
        <i class="fa-solid fa-user-shield"></i> Operator Aktif
      </div>
      <button id="btnAuth" class="btn btn-secondary">
        <i class="fa-solid fa-lock"></i> Login Operator
      </button>
    </div>
  </header>

  <nav class="tab-nav">
    <button class="tab-btn active" data-tab="pending">
      <i class="fa-solid fa-clock"></i> Belum Dicetak
      <span class="badge-count" id="pendingCount">0</span>
    </button>
    <button class="tab-btn" data-tab="completed">
      <i class="fa-solid fa-circle-check"></i> Selesai Cetak
      <span class="badge-count" id="completedCount">0</span>
    </button>
  </nav>

  <main class="queue-grid" id="queueContainer">
    <!-- Dynanically populated from API -->
    <div class="empty-state">
      <div class="spinner-box"><i class="fa-solid fa-spinner fa-spin"></i></div>
      <p>Menghubungkan ke database antrean...</p>
    </div>
  </main>

  <!-- Lightbox Modal -->
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose"><i class="fa-solid fa-xmark"></i></button>
    <img class="lightbox-content" id="lightboxImg" src="" alt="View Fullsize">
    <div class="lightbox-actions">
      <a id="lightboxDownloadBtn" href="" class="btn btn-primary" download><i class="fa-solid fa-download"></i> Download Gambar</a>
      <button id="lightboxPrintBtn" class="btn btn-secondary"><i class="fa-solid fa-print"></i> Cetak Sekarang</button>
    </div>
  </div>

  <!-- Login Modal -->
  <div class="login-modal" id="loginModal">
    <div class="login-card">
      <h2>Otorisasi Operator</h2>
      <p>Masukkan password admin untuk mengelola status antrean cetak.</p>
      <input type="password" id="operatorPasswordInput" placeholder="Password Operator...">
      <div style="display: flex; gap: 8px;">
        <button id="btnCancelLogin" class="btn btn-secondary" style="flex:1; justify-content:center;">Batal</button>
        <button id="btnSubmitLogin" class="btn btn-primary" style="flex:1; justify-content:center;">Masuk</button>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let orders = [];
      let activeTab = 'pending'; // 'pending' | 'completed'
      let checkInterval = null;

      const queueContainer = document.getElementById('queueContainer');
      const pendingCount = document.getElementById('pendingCount');
      const completedCount = document.getElementById('completedCount');
      const tabButtons = document.querySelectorAll('.tab-btn');
      
      const btnAuth = document.getElementById('btnAuth');
      const loginStatus = document.getElementById('loginStatus');
      const loginModal = document.getElementById('loginModal');
      const operatorPasswordInput = document.getElementById('operatorPasswordInput');
      const btnCancelLogin = document.getElementById('btnCancelLogin');
      const btnSubmitLogin = document.getElementById('btnSubmitLogin');

      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxClose = document.getElementById('lightboxClose');
      const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
      const lightboxPrintBtn = document.getElementById('lightboxPrintBtn');

      // Helper to format Indonesian WhatsApp numbers
      function formatWhatsappUrl(number, name) {
        let clean = number.replace(/[^0-9]/g, '');
        if (clean.startsWith('0')) {
          clean = '62' + clean.slice(1);
        }
        const text = encodeURIComponent(`Halo Kak ${name}, twibbon kakak sudah selesai dicetak. Silakan diambil di meja panitia ya! Terima kasih.`);
        return `https://wa.me/${clean}?text=${text}`;
      }

      // Check Saved Login state
      function getPassword() {
        return localStorage.getItem('operator_password') || '';
      }

      function updateAuthUI() {
        const pass = getPassword();
        if (pass === '354313') {
          loginStatus.style.display = 'block';
          btnAuth.innerHTML = '<i class="fa-solid fa-lock-open"></i> Logout';
          btnAuth.classList.add('btn-primary');
          btnAuth.classList.remove('btn-secondary');
        } else {
          loginStatus.style.display = 'none';
          btnAuth.innerHTML = '<i class="fa-solid fa-lock"></i> Login Operator';
          btnAuth.classList.remove('btn-primary');
          btnAuth.classList.add('btn-secondary');
        }
      }

      // Load Orders from API
      async function loadOrders() {
        try {
          const res = await fetch('../api.php?action=get_orders');
          if (!res.ok) throw new Error('API return non-200');
          orders = await res.json();
          renderQueue();
        } catch (err) {
          console.error(err);
          queueContainer.innerHTML = `
            <div class="empty-state">
              <i class="fa-solid fa-circle-exclamation" style="color:var(--danger);"></i>
              <p>Gagal memuat data dari server. Pastikan server aktif.</p>
              <button class="btn btn-secondary btn-sm" onclick="location.reload()"><i class="fa-solid fa-rotate"></i> Coba Lagi</button>
            </div>
          `;
        }
      }

      // Render Queue List based on Active Tab
      function renderQueue() {
        queueContainer.innerHTML = '';
        
        // Count totals
        const pendingList = orders.filter(o => o.status === 'pending');
        const completedList = orders.filter(o => o.status === 'completed');
        
        pendingCount.textContent = pendingList.length;
        completedCount.textContent = completedList.length;

        const currentList = activeTab === 'pending' ? pendingList : completedList;

        if (currentList.length === 0) {
          queueContainer.innerHTML = `
            <div class="empty-state">
              <i class="fa-solid fa-box-open"></i>
              <p>Tidak ada antrean cetak dalam kategori ini.</p>
            </div>
          `;
          return;
        }

        // Sort descending by date (most recent first)
        currentList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        currentList.forEach(order => {
          const card = document.createElement('div');
          card.className = `queue-card ${order.status}`;
          
          const timeFormatted = new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          
          let previewHTML = `
            <div class="preview-box" onclick="viewImage('../${order.twibbon_image}')">
              <img src="../${order.twibbon_image}" alt="Twibbon">
              <div class="preview-label">🖼️ Twibbon</div>
            </div>
          `;

          if (order.payment_method === 'qris' && order.payment_proof) {
            previewHTML += `
              <div class="preview-box" onclick="viewImage('../${order.payment_proof}')">
                <img src="../${order.payment_proof}" alt="Bukti Transfer">
                <div class="preview-label" style="background:rgba(59,130,246,0.8);">🧾 Bukti QRIS</div>
              </div>
            `;
          }

          const methodTag = order.payment_method === 'qris' 
            ? '<span class="payment-tag qris"><i class="fa-solid fa-qrcode"></i> QRIS</span>'
            : '<span class="payment-tag cash"><i class="fa-solid fa-money-bill-1-wave"></i> Tunai</span>';

          const actionBtn = order.status === 'pending'
            ? `<button class="btn btn-primary" onclick="markStatus('${order.id}', 'completed')"><i class="fa-solid fa-print"></i> Cetak Selesai</button>`
            : `<button class="btn btn-secondary" onclick="markStatus('${order.id}', 'pending')"><i class="fa-solid fa-clock-rotate-left"></i> Antrekan Lagi</button>`;

          card.innerHTML = `
            <div class="card-header">
              <div class="customer-info">
                <h3>${escapeHTML(order.name)}</h3>
                <p><i class="fa-solid fa-circle"></i> ${escapeHTML(order.whatsapp)}</p>
              </div>
              <span class="time-badge">${timeFormatted}</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center;">
              ${methodTag}
            </div>

            <div class="media-preview-row">
              ${previewHTML}
            </div>

            <div class="card-footer" style="flex-wrap: wrap; gap: 6px;">
              <button class="btn btn-secondary" onclick="sendWaAuto('${order.id}')" title="Kirim WA Otomatis via API Gateway" style="background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); font-size: 12px; padding: 6px 12px;">
                <i class="fa-brands fa-whatsapp" style="font-size:15px;"></i> Kirim WA (API)
              </button>
              <a href="${formatWhatsappUrl(order.whatsapp, order.name)}" target="_blank" class="btn btn-secondary" title="Buka WA Web (Manual)" style="opacity: 0.65; font-size: 11px; padding: 6px 8px;">
                <i class="fa-solid fa-up-right-from-square"></i> Manual
              </a>
              ${actionBtn}
              <button class="btn btn-secondary" onclick="deleteOrder('${order.id}')" style="flex:0; padding:6px 10px; color:var(--danger);" title="Hapus Dari Monitor">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `;
          
          queueContainer.appendChild(card);
        });
      }

      function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
          tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
      }

      // View Image Lightbox
      window.viewImage = function(src) {
        lightboxImg.src = src;
        lightboxDownloadBtn.href = src;
        lightbox.style.display = 'flex';
      };

      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });

      lightboxPrintBtn.addEventListener('click', () => {
        // Open print view for this image
        const win = window.open('');
        win.document.write(`
          <html>
            <head>
              <title>Cetak Gambar</title>
              <style>
                body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: white; }
                img { max-width: 100%; max-height: 100%; object-fit: contain; }
                @media print {
                  img { width: 100%; height: auto; page-break-inside: avoid; }
                  @page { margin: 0; }
                }
              </style>
            </head>
            <body onload="window.print();window.close();">
              <img src="${lightboxImg.src}">
            </body>
          </html>
        `);
        win.document.close();
      });

      // Send WA Automatically via Gateway API
      window.sendWaAuto = async function(id) {
        const pass = getPassword();
        if (pass !== '354313') {
          openLoginModal();
          return;
        }

        if (!confirm('Kirim notifikasi & foto Twibbon ke WhatsApp pelanggan secara otomatis via Gateway API?')) {
          return;
        }

        try {
          const res = await fetch('../api.php?action=send_wa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, send_media: true, password: pass })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            alert('✅ Pesan WhatsApp & gambar Twibbon berhasil terkirim ke WhatsApp pelanggan!');
          } else {
            alert('⚠️ Gagal mengirim WA via API: ' + (data.error || JSON.stringify(data)));
          }
        } catch (e) {
          alert('Gagal menghubungi server.');
        }
      };

      // Update Order Status (Pending <-> Completed)
      window.markStatus = async function(id, newStatus) {
        const pass = getPassword();
        if (pass !== '354313') {
          openLoginModal();
          return;
        }

        try {
          const res = await fetch('../api.php?action=update_order_status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus, password: pass })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            if (newStatus === 'completed') {
              if (data.wa_result && data.wa_result.success) {
                alert('✅ Status diperbarui menjadi SELESAI, dan foto Twibbon telah dikirim otomatis ke WhatsApp pelanggan!');
              } else if (data.wa_result && data.wa_result.error) {
                alert('Status diperbarui menjadi SELESAI, namun pengiriman WA otomatis gagal: ' + data.wa_result.error);
              }
            }
            loadOrders();
          } else {
            alert('Gagal memperbarui status: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (e) {
          alert('Gagal menghubungi server.');
        }
      };

      // Delete Order
      window.deleteOrder = async function(id) {
        const pass = getPassword();
        if (pass !== '354313') {
          openLoginModal();
          return;
        }

        if (!confirm('Apakah Anda yakin ingin menghapus antrean ini secara permanen dari server?')) {
          return;
        }

        try {
          const res = await fetch('../api.php?action=delete_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password: pass })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            loadOrders();
          } else {
            alert('Gagal menghapus antrean: ' + (data.error || 'Terjadi kesalahan.'));
          }
        } catch (e) {
          alert('Gagal menghubungi server.');
        }
      };

      // Tab selection
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeTab = btn.getAttribute('data-tab');
          renderQueue();
        });
      });

      // --- LOGIN OPERATOR MODAL ACTIONS ---
      function openLoginModal() {
        operatorPasswordInput.value = '';
        loginModal.style.display = 'flex';
        operatorPasswordInput.focus();
      }

      btnAuth.addEventListener('click', () => {
        if (getPassword() === '354313') {
          localStorage.removeItem('operator_password');
          updateAuthUI();
          alert('Berhasil Keluar dari mode Operator.');
        } else {
          openLoginModal();
        }
      });

      btnCancelLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
      });

      btnSubmitLogin.addEventListener('click', doLogin);
      operatorPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doLogin();
      });

      function doLogin() {
        const val = operatorPasswordInput.value.trim();
        if (val === '354313') {
          localStorage.setItem('operator_password', val);
          loginModal.style.display = 'none';
          updateAuthUI();
          alert('Login Operator sukses! Sekarang Anda bisa mengelola antrean.');
        } else {
          alert('Password Operator salah.');
        }
      }

      // Init and Auto-polling
      updateAuthUI();
      loadOrders();
      checkInterval = setInterval(loadOrders, 10000); // Poll every 10 seconds
    });
  </script>
</body>
</html>
