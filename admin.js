// ==========================================================================
// ADMIN PANEL STATE
// ==========================================================================
let adminProducts = [];
let adminConfig = { coupons: [], promoTimer: {} };
const AUTH_KEY = 'use_hello_admin_authenticated';

// LocalStorage Keys
const PRODUCTS_KEY = 'use_hello_db_products';
const CONFIG_KEY = 'use_hello_db_config';

// ==========================================================================
// INITIALIZATION & SECURITY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initData();
  setupNav();
  setupFormsAndModals();
  renderAll();
});

function checkAuth() {
  const isAuth = sessionStorage.getItem(AUTH_KEY);
  const overlay = document.getElementById('login-overlay');
  const main = document.getElementById('admin-main-content');
  
  if (isAuth === 'true') {
    overlay.classList.add('hidden');
    main.classList.add('visible');
  } else {
    overlay.classList.remove('hidden');
    main.classList.remove('visible');
  }
}

function handleLogin(password) {
  if (password === 'hello1234') {
    sessionStorage.setItem(AUTH_KEY, 'true');
    checkAuth();
    showAdminToast('Login efetuado com sucesso! Welcome back 🎀');
  } else {
    alert('Senha incorreta! Tente novamente. Dica: hello1234');
  }
}

function handleLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.reload();
}

function initData() {
  // Load products: if not in localStorage, load from products.js (PRODUCTS global)
  const savedProducts = localStorage.getItem(PRODUCTS_KEY);
  if (savedProducts) {
    try {
      adminProducts = JSON.parse(savedProducts);
    } catch(e) {
      adminProducts = PRODUCTS || [];
    }
  } else {
    adminProducts = PRODUCTS || [];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(adminProducts));
  }

  // Load config: if not in localStorage, load from config.js (CONFIG global)
  const savedConfig = localStorage.getItem(CONFIG_KEY);
  if (savedConfig) {
    try {
      adminConfig = JSON.parse(savedConfig);
    } catch(e) {
      adminConfig = CONFIG || { coupons: [], promoTimer: {} };
    }
  } else {
    adminConfig = CONFIG || { coupons: [], promoTimer: {} };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(adminConfig));
  }
}

// Save back to localStorage
function saveProductsToStorage() {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(adminProducts));
  updateStats();
}

function saveConfigToStorage() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(adminConfig));
  updateStats();
}

// ==========================================================================
// RENDER METHODS
// ==========================================================================
function renderAll() {
  updateStats();
  renderProductsTable();
  renderCouponsTable();
  populatePromoForm();
}

function updateStats() {
  const prodCount = document.getElementById('stat-products-count');
  const coupCount = document.getElementById('stat-coupons-count');
  const timerStatus = document.getElementById('stat-timer-status');
  
  if (prodCount) prodCount.textContent = adminProducts.length;
  
  const activeCoupons = adminConfig.coupons.filter(c => c.active).length;
  if (coupCount) coupCount.textContent = activeCoupons;
  
  if (timerStatus) {
    if (adminConfig.promoTimer && adminConfig.promoTimer.active) {
      const date = new Date(adminConfig.promoTimer.endDate);
      if (date > new Date()) {
        timerStatus.innerHTML = `<span style="color: var(--success)">Ativo</span>`;
      } else {
        timerStatus.innerHTML = `<span style="color: var(--danger)">Expirado</span>`;
      }
    } else {
      timerStatus.innerHTML = `Inativo`;
    }
  }
}

function renderProductsTable() {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;
  
  const query = document.getElementById('admin-search-products').value.toLowerCase();
  
  const filtered = adminProducts.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum produto cadastrado.</td></tr>`;
    return;
  }
  
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><img src="${p.image}" class="table-thumbnail" alt="${p.title}"></td>
      <td><strong>${p.title}</strong><div style="font-size: 11px; color: var(--text-muted); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.description || ''}</div></td>
      <td><span class="badge" style="background-color: var(--bg-admin); color: var(--text-dark);">${p.category}</span></td>
      <td><strong>${p.price}</strong></td>
      <td>
        <div class="actions-cell">
          <button class="action-btn" onclick="editProduct('${p.id}')" title="Editar">✏️</button>
          <button class="action-btn btn-delete" onclick="deleteProduct('${p.id}')" title="Excluir">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderCouponsTable() {
  const tbody = document.getElementById('admin-coupons-tbody');
  if (!tbody) return;
  
  if (!adminConfig.coupons || adminConfig.coupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum cupom cadastrado.</td></tr>`;
    return;
  }
  
  tbody.innerHTML = adminConfig.coupons.map((c, idx) => `
    <tr>
      <td><code style="font-size: 14px; font-weight: 700; background: var(--bg-admin); padding: 4px 8px; border-radius: 4px;">${c.code}</code></td>
      <td>${c.type === 'percentage' ? 'Porcentagem' : 'Valor Fixo'}</td>
      <td><strong>${c.type === 'percentage' ? `${c.value}%` : `R$ ${c.value.toFixed(2)}`}</strong></td>
      <td>
        <span class="badge ${c.active ? 'badge-active' : 'badge-inactive'}">
          ${c.active ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="action-btn" onclick="toggleCoupon(${idx})" title="Ativar/Desativar">${c.active ? '⏸️' : '▶️'}</button>
          <button class="action-btn btn-delete" onclick="deleteCoupon(${idx})" title="Excluir">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populatePromoForm() {
  const form = document.getElementById('promo-timer-form');
  if (!form) return;
  
  const timer = adminConfig.promoTimer || { active: false, title: '', subtitle: '', endDate: '' };
  
  document.getElementById('promo-active-checkbox').checked = !!timer.active;
  document.getElementById('promo-title').value = timer.title || '';
  document.getElementById('promo-subtitle').value = timer.subtitle || '';
  
  // Format end date to fit local datetime picker input (YYYY-MM-DDThh:mm)
  if (timer.endDate) {
    try {
      const dt = new Date(timer.endDate);
      const tzOffset = dt.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(dt.getTime() - tzOffset)).toISOString().slice(0, 16);
      document.getElementById('promo-enddate').value = localISOTime;
    } catch(e) {
      document.getElementById('promo-enddate').value = '';
    }
  }
}

// ==========================================================================
// CRUD OPERATIONS
// ==========================================================================
window.editProduct = function(id) {
  const p = adminProducts.find(prod => prod.id === id);
  if (!p) return;
  
  document.getElementById('product-modal-title').textContent = 'Editar Produto';
  document.getElementById('form-product-id').value = p.id;
  document.getElementById('prod-title').value = p.title;
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-image').value = p.image;
  document.getElementById('prod-desc').value = p.description || '';
  
  openModal('product-modal-overlay');
};

window.deleteProduct = function(id) {
  const p = adminProducts.find(prod => prod.id === id);
  if (!p) return;
  
  if (confirm(`Deseja realmente excluir o produto "${p.title}"?`)) {
    adminProducts = adminProducts.filter(prod => prod.id !== id);
    saveProductsToStorage();
    renderProductsTable();
    showAdminToast('Produto excluído do catálogo! 🗑️');
  }
};

window.toggleCoupon = function(idx) {
  if (adminConfig.coupons && adminConfig.coupons[idx]) {
    adminConfig.coupons[idx].active = !adminConfig.coupons[idx].active;
    saveConfigToStorage();
    renderCouponsTable();
    showAdminToast('Status do cupom alterado!');
  }
};

window.deleteCoupon = function(idx) {
  if (confirm('Deseja realmente excluir este cupom?')) {
    adminConfig.coupons.splice(idx, 1);
    saveConfigToStorage();
    renderCouponsTable();
    showAdminToast('Cupom excluído com sucesso!');
  }
};

// ==========================================================================
// NAVIGATION & INTERACTION
// ==========================================================================
function setupNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.admin-section');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      item.classList.add('active');
      const targetId = item.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.classList.add('active');
      
      // Update titles
      switch(targetId) {
        case 'dashboard-section':
          pageTitle.textContent = 'Dashboard';
          pageSubtitle.textContent = 'Visão geral do catálogo e configurações da sua loja.';
          break;
        case 'products-section':
          pageTitle.textContent = 'Gerenciar Catálogo';
          pageSubtitle.textContent = 'Adicione, edite ou exclua peças do catálogo de roupas.';
          break;
        case 'coupons-section':
          pageTitle.textContent = 'Cupons de Desconto';
          pageSubtitle.textContent = 'Crie cupons para ativação na finalização de compras.';
          break;
        case 'promotions-section':
          pageTitle.textContent = 'Configurar Promoções';
          pageSubtitle.textContent = 'Defina banners de escassez e cronômetro regressivo.';
          break;
        case 'publish-section':
          pageTitle.textContent = 'Publicar Alterações';
          pageSubtitle.textContent = 'Exportar arquivos para upload no repositório de produção.';
          break;
      }
    });
  });
  
  // Logout trigger
  document.getElementById('logout-trigger-btn').addEventListener('click', handleLogout);
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function setupFormsAndModals() {
  // Login Form
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('login-password').value;
    handleLogin(pass);
  });
  
  // Modal Triggers (Product)
  document.getElementById('open-product-modal-btn').addEventListener('click', () => {
    document.getElementById('product-modal-title').textContent = 'Novo Produto';
    document.getElementById('product-form').reset();
    document.getElementById('form-product-id').value = '';
    openModal('product-modal-overlay');
  });
  
  document.getElementById('close-product-modal-btn').addEventListener('click', () => closeModal('product-modal-overlay'));
  document.getElementById('cancel-product-btn').addEventListener('click', () => closeModal('product-modal-overlay'));
  
  // Modal Triggers (Coupon)
  document.getElementById('open-coupon-modal-btn').addEventListener('click', () => {
    document.getElementById('coupon-form').reset();
    openModal('coupon-modal-overlay');
  });
  
  document.getElementById('close-coupon-modal-btn').addEventListener('click', () => closeModal('coupon-modal-overlay'));
  document.getElementById('cancel-coupon-btn').addEventListener('click', () => closeModal('coupon-modal-overlay'));
  
  // Product Form Submission
  document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('form-product-id').value;
    const title = document.getElementById('prod-title').value.trim();
    const price = document.getElementById('prod-price').value.trim();
    const category = document.getElementById('prod-category').value;
    const image = document.getElementById('prod-image').value.trim();
    const description = document.getElementById('prod-desc').value.trim();
    
    if (id) {
      // Editing
      const idx = adminProducts.findIndex(p => p.id === id);
      if (idx > -1) {
        adminProducts[idx] = { id, title, price, description, image, category };
        showAdminToast('Produto atualizado com sucesso! ✨');
      }
    } else {
      // Creating
      const newId = 'prod_' + Date.now();
      adminProducts.push({ id: newId, title, price, description, image, category });
      showAdminToast('Novo produto cadastrado com sucesso! 📦');
    }
    
    saveProductsToStorage();
    renderProductsTable();
    closeModal('product-modal-overlay');
  });

  // Coupon Form Submission
  document.getElementById('coupon-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const code = document.getElementById('coup-code').value.trim().toUpperCase();
    const type = document.getElementById('coup-type').value;
    const value = parseFloat(document.getElementById('coup-value').value);
    const active = document.getElementById('coup-active-checkbox').checked;
    
    // Check if code already exists
    if (adminConfig.coupons.some(c => c.code === code)) {
      alert('Já existe um cupom cadastrado com este código!');
      return;
    }
    
    adminConfig.coupons.push({ code, type, value, active });
    saveConfigToStorage();
    renderCouponsTable();
    closeModal('coupon-modal-overlay');
    showAdminToast('Novo cupom criado! 🎟️');
  });
  
  // Product Search listener
  document.getElementById('admin-search-products').addEventListener('input', renderProductsTable);
  
  // Promo Timer Form Submission
  document.getElementById('promo-timer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const active = document.getElementById('promo-active-checkbox').checked;
    const title = document.getElementById('promo-title').value.trim();
    const subtitle = document.getElementById('promo-subtitle').value.trim();
    const endDateVal = document.getElementById('promo-enddate').value;
    
    if (active && !endDateVal) {
      alert('Por favor, informe uma data de término para ativar o cronômetro!');
      return;
    }
    
    // Parse input date back to ISO format
    let endDate = '';
    if (endDateVal) {
      endDate = new Date(endDateVal).toISOString();
    }
    
    adminConfig.promoTimer = { active, title, subtitle, endDate };
    saveConfigToStorage();
    showAdminToast('Promoção e cronômetro configurados! ⏱️');
  });
  
  // Export buttons
  document.getElementById('export-products-js-btn').addEventListener('click', exportProductsJS);
  document.getElementById('export-config-js-btn').addEventListener('click', exportConfigJS);
  document.getElementById('quick-export-btn').addEventListener('click', () => {
    exportProductsJS();
    setTimeout(exportConfigJS, 500);
  });
}

// ==========================================================================
// EXPORTS DOWNLOAD LOGIC
// ==========================================================================
function exportProductsJS() {
  const content = `const PRODUCTS = ${JSON.stringify(adminProducts, null, 2)};`;
  downloadFile(content, 'products.js', 'application/javascript');
  showAdminToast('Banco products.js baixado com sucesso! 📦');
}

function exportConfigJS() {
  const content = `const CONFIG = ${JSON.stringify(adminConfig, null, 2)};`;
  downloadFile(content, 'config.js', 'application/javascript');
  showAdminToast('Configuração config.js baixada! ⚙️');
}

function downloadFile(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ==========================================================================
// ADMINISTRATIVE TOAST FEEDBACK
// ==========================================================================
function showAdminToast(message) {
  const existing = document.querySelector('.toast-admin');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-admin';
  toast.innerHTML = `<span>✨</span> ${message}`;
  
  // Style dynamically
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-lg)',
    zIndex: '10000',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-title)',
    fontWeight: '600',
    fontSize: '13px',
    animation: 'slideUpAdminToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards'
  });
  
  if (!document.getElementById('admin-toast-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'admin-toast-styles';
    styleSheet.innerHTML = `
      @keyframes slideUpAdminToast {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
