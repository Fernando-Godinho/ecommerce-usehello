// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================
let cart = [];
let selectedCategory = 'Todos';
let searchQuery = '';
let currentProduct = null; // For Quick View Modal
let appliedCoupon = null; // Applied coupon configuration

// Dynamic data loading (CMS Integration)
let STORE_PRODUCTS = PRODUCTS || [];
let STORE_CONFIG = CONFIG || { coupons: [], promoTimer: { active: false } };

// LocalStorage Keys
const STORAGE_KEY = 'use_hello_cart';
const PRODUCTS_KEY = 'use_hello_db_products';
const CONFIG_KEY = 'use_hello_db_config';

// WhatsApp Configuration
const WHATSAPP_PHONE = '5551991310075'; // Store's WhatsApp (51) 99131-0075

// ==========================================================================
// DOM ELEMENTS & INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Load dynamic store catalog & settings
  loadDynamicStoreData();

  // Load cart from storage
  loadCart();
  
  // Initialize grid
  renderProducts();
  
  // Setup event listeners
  setupEventListeners();
  updateCartUI();

  // Initialize promo countdown timer
  initPromoTimer();
});

function loadDynamicStoreData() {
  const localProducts = localStorage.getItem(PRODUCTS_KEY);
  if (localProducts) {
    try {
      STORE_PRODUCTS = JSON.parse(localProducts);
    } catch (e) {
      STORE_PRODUCTS = PRODUCTS || [];
    }
  }
  
  const localConfig = localStorage.getItem(CONFIG_KEY);
  if (localConfig) {
    try {
      STORE_CONFIG = JSON.parse(localConfig);
    } catch (e) {
      STORE_CONFIG = CONFIG || { coupons: [], promoTimer: { active: false } };
    }
  }
}

// ==========================================================================
// CART OPERATIONS
// ==========================================================================
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      cart = jsonParseSafe(saved, []);
    } catch (e) {
      cart = [];
    }
  }
}

// Safe JSON Parse Helper
function jsonParseSafe(str, fallback) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

function addToCart(product, size = 'M', quantity = 1) {
  const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      product: product,
      size: size,
      quantity: quantity
    });
  }
  
  saveCart();
  updateCartUI();
  showToast(`${product.title} (${size}) adicionado ao carrinho! 🎀`);
}

function updateQuantity(productId, size, change) {
  const index = cart.findIndex(item => item.product.id === productId && item.size === size);
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.product.id === productId && item.size === size));
  saveCart();
  updateCartUI();
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    // Parse price string like "R$ 219,90"
    const priceVal = parseFloat(item.product.price.replace('R$', '').replace('.', '').replace(',', '.').trim());
    return total + (priceVal * item.quantity);
  }, 0);
}

function getCartDiscount() {
  if (!appliedCoupon) return 0;
  const subtotal = getCartSubtotal();
  if (appliedCoupon.type === 'percentage') {
    return subtotal * (appliedCoupon.value / 100);
  } else if (appliedCoupon.type === 'fixed') {
    return Math.min(appliedCoupon.value, subtotal);
  }
  return 0;
}

function getCartTotal() {
  return Math.max(0, getCartSubtotal() - getCartDiscount());
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// ==========================================================================
// USER INTERFACE UPDATES (UI)
// ==========================================================================
function updateCartUI() {
  const badgeCount = document.getElementById('cart-count-badge');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const checkoutItemsList = document.getElementById('checkout-summary-items');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  
  const count = getCartCount();
  badgeCount.textContent = count;
  
  if (count === 0) {
    badgeCount.style.display = 'none';
    itemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p>Seu carrinho está vazio.</p>
        <button class="btn btn-primary" id="start-shopping-btn-inner">Começar a Comprar</button>
      </div>
    `;
    
    // Add listener to the dynamic start shopping button
    const startShoppingBtn = document.getElementById('start-shopping-btn-inner');
    if (startShoppingBtn) {
      startShoppingBtn.addEventListener('click', () => {
        closeCartDrawer();
        document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    subtotalVal.textContent = 'R$ 0,00';
    
    // Reset coupon input state
    appliedCoupon = null;
    const discountRow = document.getElementById('cart-discount-row');
    if (discountRow) discountRow.style.display = 'none';
  } else {
    badgeCount.style.display = 'flex';
    
    let html = '';
    cart.forEach(item => {
      html += `
        <div class="cart-item">
          <div class="cart-item-img-wrapper">
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.title}">
          </div>
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.product.title}</h3>
            <span class="cart-item-meta">Tamanho: ${item.size}</span>
            <div class="cart-item-action-row">
              <div class="quantity-control">
                <button class="qty-btn minus" data-id="${item.product.id}" data-size="${item.size}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn plus" data-id="${item.product.id}" data-size="${item.size}">+</button>
              </div>
              <button class="remove-item-btn" data-id="${item.product.id}" data-size="${item.size}">Remover</button>
            </div>
          </div>
          <span class="cart-item-price">${item.product.price}</span>
        </div>
      `;
    });
    
    itemsContainer.innerHTML = html;
    
    // Bind click events on cart elements
    itemsContainer.querySelectorAll('.qty-btn.minus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQuantity(btn.dataset.id, btn.dataset.size, -1);
      });
    });
    
    itemsContainer.querySelectorAll('.qty-btn.plus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQuantity(btn.dataset.id, btn.dataset.size, 1);
      });
    });
    
    itemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id, btn.dataset.size);
      });
    });
    
    // Calculate final totals and discounts
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const total = getCartTotal();
    
    subtotalVal.textContent = formatCurrency(subtotal);
    
    const discountRow = document.getElementById('cart-discount-row');
    const discountVal = document.getElementById('cart-discount-val');
    const discountName = document.getElementById('applied-coupon-name');
    
    if (appliedCoupon) {
      discountRow.style.display = 'flex';
      discountName.textContent = appliedCoupon.code;
      discountVal.textContent = '-' + formatCurrency(discount);
    } else {
      discountRow.style.display = 'none';
    }
    
    // Update Checkout Modal Summary if open
    if (checkoutItemsList) {
      let summaryHtml = '';
      cart.forEach(item => {
        summaryHtml += `
          <div class="summary-item-row">
            <span>${item.quantity}x ${item.product.title} (${item.size})</span>
            <span>${item.product.price}</span>
          </div>
        `;
      });
      
      if (appliedCoupon) {
        summaryHtml += `
          <div class="summary-item-row" style="color: var(--accent); font-weight: 700;">
            <span>Cupom: ${appliedCoupon.code} (-${appliedCoupon.value}${appliedCoupon.type === 'percentage' ? '%' : ''})</span>
            <span>-${formatCurrency(discount)}</span>
          </div>
        `;
      }
      
      checkoutItemsList.innerHTML = summaryHtml;
    }
    
    if (checkoutTotalPrice) {
      checkoutTotalPrice.textContent = formatCurrency(total);
    }
  }
}

function formatCurrency(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================================================
// PRODUCT RENDERING, SEARCH & FILTERS
// ==========================================================================
function renderProducts() {
  const container = document.getElementById('products-grid-container');
  if (!container) return;
  
  // Filter products based on active filters
  const filtered = STORE_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="loading-spinner">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-light); margin-bottom: 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <p>Nenhuma peça encontrada para "${searchQuery}". Tente buscar outro modelo.</p>
      </div>
    `;
    return;
  }
  
  let gridHtml = '';
  filtered.forEach(product => {
    const isBestSeller = product.title.includes('Julia') || product.title.includes('Zara') || product.title.includes('Poliamida');
    const badgeText = isBestSeller ? '<span class="product-badge">Queridinho 🔥</span>' : '';
    
    gridHtml += `
      <article class="product-card" id="product-${product.id}">
        ${badgeText}
        <div class="product-card-img-wrapper" onclick="openQuickView('${product.id}')">
          <img class="product-card-img" src="${product.image}" alt="${product.title}" loading="lazy">
          <div class="card-actions-overlay">
            <button class="btn btn-card btn-card-outline" onclick="event.stopPropagation(); openQuickView('${product.id}')">Espiar</button>
            <button class="btn btn-card btn-card-primary" onclick="event.stopPropagation(); addToCartDirect('${product.id}')">Adicionar</button>
          </div>
        </div>
        <div class="product-card-info">
          <span class="product-card-category">${product.category}</span>
          <h3 class="product-card-title" onclick="openQuickView('${product.id}')">${product.title}</h3>
          <div class="product-card-price-row">
            <span class="product-card-price">${product.price}</span>
            <button class="product-card-add-direct" aria-label="Adicionar ${product.title} ao carrinho" onclick="addToCartDirect('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>
        <button class="mobile-card-buy-btn" onclick="openQuickView('${product.id}')">
          COMPRAR / ESCOLHER TAMANHO
        </button>
      </article>
    `;
  });
  
  container.innerHTML = gridHtml;
}

// Helper to add directly using default size M
function addToCartDirect(productId) {
  const prod = STORE_PRODUCTS.find(p => p.id === productId);
  if (prod) {
    addToCart(prod, 'M', 1);
  }
}

// ==========================================================================
// MODALS & DRAWER CONTROLLERS
// ==========================================================================
function openCartDrawer() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-drawer-overlay').classList.remove('open');
  document.body.style.overflow = ''; // Unlock scroll
}

function openQuickView(productId) {
  const prod = STORE_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;
  
  currentProduct = prod;
  
  document.getElementById('qv-product-img').src = prod.image;
  document.getElementById('qv-product-img').alt = prod.title;
  document.getElementById('qv-product-title').textContent = prod.title;
  document.getElementById('qv-product-price').textContent = prod.price;
  
  // Set description
  document.getElementById('qv-product-desc').textContent = prod.description || 
    "Peça confeccionada com tecido de alta tecnologia, ideal para treinos e atividades diárias. Proporciona excelente suporte muscular, modela o corpo com extremo conforto e toque suave na pele.";
  
  // Reset size options - select M by default
  const sizeBtns = document.querySelectorAll('#qv-size-options .size-option-btn');
  sizeBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.size === 'M') {
      btn.classList.add('active');
    }
  });
  
  document.getElementById('quickview-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quickview-modal-overlay').classList.remove('open');
  if (!document.getElementById('cart-drawer').classList.contains('open') && 
      !document.getElementById('checkout-modal-overlay').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Adicione peças ao carrinho antes de finalizar! 🛍️');
    return;
  }
  
  closeCartDrawer();
  updateCartUI(); // Update checkout totals
  document.getElementById('checkout-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function openSizeChart() {
  document.getElementById('size-chart-overlay').classList.add('open');
}

function closeSizeChart() {
  document.getElementById('size-chart-overlay').classList.remove('open');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast-notification');
  if (existing) {
    existing.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Add CSS styles dynamically if they aren't fully processed
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.backgroundColor = '#111111';
  toast.style.color = '#FFFFFF';
  toast.style.padding = '14px 24px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
  toast.style.zIndex = '9999';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.fontSize = '14px';
  toast.style.fontFamily = 'Outfit, sans-serif';
  toast.style.fontWeight = '600';
  toast.style.animation = 'slideInToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards';
  
  // Add keyframes dynamically
  if (!document.getElementById('toast-animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'toast-animation-styles';
    styleSheet.innerHTML = `
      @keyframes slideInToast {
        from { transform: translateY(100px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes slideOutToast {
        from { transform: translateY(0) scale(1); opacity: 1; }
        to { transform: translateY(50px) scale(0.9); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.3s ease-in forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// ==========================================================================
// COUPON APPLICATION LOGIC
// ==========================================================================
function handleCouponApplication(code) {
  const feedback = document.getElementById('coupon-feedback-message');
  if (!feedback) return;
  
  if (!code) {
    feedback.textContent = 'Por favor, digite um código de cupom.';
    feedback.style.color = 'var(--text-muted)';
    return;
  }
  
  if (cart.length === 0) {
    feedback.textContent = 'Seu carrinho está vazio para aplicar o cupom.';
    feedback.style.color = 'var(--accent)';
    return;
  }
  
  if (!STORE_CONFIG.coupons || STORE_CONFIG.coupons.length === 0) {
    feedback.textContent = 'Nenhum cupom disponível nesta loja.';
    feedback.style.color = 'var(--accent)';
    return;
  }
  
  const coupon = STORE_CONFIG.coupons.find(c => c.code === code);
  
  if (coupon && coupon.active) {
    appliedCoupon = coupon;
    updateCartUI();
    feedback.textContent = `Cupom ${code} aplicado com sucesso! 🎉`;
    feedback.style.color = 'var(--success)';
  } else {
    appliedCoupon = null;
    updateCartUI();
    feedback.textContent = 'Cupom inválido ou expirado.';
    feedback.style.color = 'var(--accent)';
  }
}

// ==========================================================================
// PROMOTION COUNTDOWN TIMER
// ==========================================================================
let promoInterval = null;

function initPromoTimer() {
  const banner = document.getElementById('promo-countdown-banner');
  if (!banner) return;
  
  const timer = STORE_CONFIG.promoTimer;
  if (!timer || !timer.active || !timer.endDate) {
    banner.style.display = 'none';
    return;
  }
  
  const bannerTitle = document.getElementById('promo-banner-title');
  const bannerSubtitle = document.getElementById('promo-banner-subtitle');
  if (bannerTitle) bannerTitle.textContent = timer.title;
  if (bannerSubtitle) bannerSubtitle.textContent = timer.subtitle;
  
  const endDate = new Date(timer.endDate).getTime();
  
  if (isNaN(endDate) || endDate <= Date.now()) {
    banner.style.display = 'none';
    return;
  }
  
  banner.style.display = 'block';
  
  if (promoInterval) clearInterval(promoInterval);
  
  updateClock();
  promoInterval = setInterval(updateClock, 1000);
  
  function updateClock() {
    const now = Date.now();
    const diff = endDate - now;
    
    if (diff <= 0) {
      banner.style.display = 'none';
      clearInterval(promoInterval);
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0') + 'd';
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0') + 'h';
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0') + 'm';
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0') + 's';
  }
}

// ==========================================================================
// EVENT LISTENERS CONFIGURATION
// ==========================================================================
function setupEventListeners() {
  // Search Events
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }
  
  // Category Tab Selection
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedCategory = tab.dataset.category;
      renderProducts();
    });
  });
  
  // Cart Drawer open/close triggers
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  if (cartTrigger) {
    cartTrigger.addEventListener('click', openCartDrawer);
  }
  
  const closeCartBtn = document.getElementById('close-cart-btn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }
  
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }
  
  // Coupon Application Events
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  const couponInput = document.getElementById('cart-coupon-input');
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      handleCouponApplication(code);
    });
    
    couponInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const code = couponInput.value.trim().toUpperCase();
        handleCouponApplication(code);
      }
    });
  }

  // Quick View triggers
  const closeQvBtn = document.getElementById('close-qv-btn');
  if (closeQvBtn) {
    closeQvBtn.addEventListener('click', closeQuickView);
  }
  
  const qvOverlay = document.getElementById('quickview-modal-overlay');
  if (qvOverlay) {
    qvOverlay.addEventListener('click', (e) => {
      if (e.target === qvOverlay) closeQuickView();
    });
  }
  
  // Size selection in Quick View
  const sizeOptionContainer = document.getElementById('qv-size-options');
  if (sizeOptionContainer) {
    sizeOptionContainer.querySelectorAll('.size-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizeOptionContainer.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
  
  // Add to cart from Quick View Modal
  const qvAddToCartBtn = document.getElementById('qv-add-to-cart-btn');
  if (qvAddToCartBtn) {
    qvAddToCartBtn.addEventListener('click', () => {
      if (!currentProduct) return;
      
      const activeSizeBtn = sizeOptionContainer.querySelector('.size-option-btn.active');
      const size = activeSizeBtn ? activeSizeBtn.dataset.size : 'M';
      
      addToCart(currentProduct, size, 1);
      closeQuickView();
      setTimeout(openCartDrawer, 400); // Smooth transition opening the cart
    });
  }
  
  // Size Chart toggling
  const sizeChartBtn = document.getElementById('size-chart-btn');
  if (sizeChartBtn) {
    sizeChartBtn.addEventListener('click', openSizeChart);
  }
  
  const closeSizeChartBtn = document.getElementById('close-size-chart-btn');
  if (closeSizeChartBtn) {
    closeSizeChartBtn.addEventListener('click', closeSizeChart);
  }
  
  const sizeChartOverlay = document.getElementById('size-chart-overlay');
  if (sizeChartOverlay) {
    sizeChartOverlay.addEventListener('click', (e) => {
      if (e.target === sizeChartOverlay) closeSizeChart();
    });
  }
  
  // Checkout triggers
  const checkoutTrigger = document.getElementById('checkout-trigger-btn');
  if (checkoutTrigger) {
    checkoutTrigger.addEventListener('click', openCheckoutModal);
  }
  
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }
  
  const checkoutOverlay = document.getElementById('checkout-modal-overlay');
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }
  
  // Form submission / WhatsApp redirection
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

// ==========================================================================
// WHATSAPP ORDER SUBMISSION
// ==========================================================================
function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const number = document.getElementById('checkout-number').value.trim();
  const bairro = document.getElementById('checkout-bairro').value.trim();
  const city = document.getElementById('checkout-city').value.trim();
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  if (cart.length === 0) return;
  
  // Build formatted text message
  let message = `Olá, Use Hello! Gostaria de fazer um pedido: 🛍️\n\n`;
  message += `*Cliente:* ${name}\n`;
  message += `*Contato:* ${phone}\n\n`;
  
  message += `*--- ITENS DO PEDIDO ---*\n`;
  
  cart.forEach(item => {
    message += `• *${item.quantity}x* ${item.product.title} (Tam: *${item.size}*) - ${item.product.price}\n`;
  });
  
  message += `\n*Subtotal:* ${formatCurrency(getCartSubtotal())}\n`;
  if (appliedCoupon) {
    message += `*Cupom Aplicado:* ${appliedCoupon.code} (-${formatCurrency(getCartDiscount())})\n`;
    message += `*Total Final:* ${formatCurrency(getCartTotal())}\n`;
  } else {
    message += `*Total Final:* ${formatCurrency(getCartTotal())}\n`;
  }
  message += `*Entrega:* A combinar (Frete Grátis em POA)\n`;
  message += `*Forma de Pagamento:* ${paymentMethod}\n\n`;
  
  message += `*--- ENDEREÇO DE ENTREGA ---*\n`;
  message += `Rua: ${address}, nº ${number}\n`;
  message += `Bairro: ${bairro}\n`;
  message += `Cidade: ${city}\n\n`;
  message += `Aguardo as instruções para pagamento e prazo de entrega. Obrigada! ✨`;
  
  // URL Encode
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;
  
  // Open in new tab
  window.open(waUrl, '_blank');
  
  // Post-purchase cleanup
  cart = [];
  appliedCoupon = null;
  saveCart();
  updateCartUI();
  closeCheckoutModal();
  showToast('Pedido enviado com sucesso! Abrindo WhatsApp... 🚀');
}
