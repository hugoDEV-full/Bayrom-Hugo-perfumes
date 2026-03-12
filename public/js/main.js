// Main JavaScript file for Bayrom & Hugo Parfums

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeSearch();
    initializeCart();
    initializeProductGallery();
    initializeWishlist();
    initializeLazyLoading();
    initializeAnimations();
    initializeFormValidation();
    initializeTooltips();
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                if (searchResults) searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performQuickSearch(query);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && (!searchResults || !searchResults.contains(e.target))) {
                if (searchResults) searchResults.style.display = 'none';
            }
        });
    }
}

// Quick Search API
async function performQuickSearch(query) {
    try {
        const response = await fetch(`/products/api/search?q=${encodeURIComponent(query)}`);
        const products = await response.json();
        
        displaySearchResults(products);
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Display Search Results
function displaySearchResults(products) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (products.length === 0) {
        searchResults.innerHTML = '<div class="p-3 text-muted">Nenhum produto encontrado</div>';
    } else {
        searchResults.innerHTML = products.map(product => `
            <a href="/products/${product.slug}" class="search-result-item d-flex align-items-center p-3 text-decoration-none border-bottom">
                <img src="${product.featured_image || '/images/product-placeholder.jpg'}" 
                     alt="${product.name}" 
                     class="me-3" 
                     style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div class="flex-grow-1">
                    <div class="fw-semibold">${product.name}</div>
                    <div class="text-muted small">${product.brand}</div>
                    <div class="text-primary fw-bold">R$ ${formatPrice(product.sale_price || product.regular_price)}</div>
                </div>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Cart Functionality
function initializeCart() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.dataset.productId;
            const quantity = this.dataset.quantity || 1;
            
            await addToCart(productId, quantity, this);
        });
    });
    
    // Quantity controls in cart
    document.querySelectorAll('.quantity-control').forEach(control => {
        const decreaseBtn = control.querySelector('.decrease');
        const increaseBtn = control.querySelector('.increase');
        const input = control.querySelector('input');
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => updateQuantity(control, -1));
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => updateQuantity(control, 1));
        }
        
        if (input) {
            input.addEventListener('change', () => validateQuantity(control));
        }
    });
    
    // Remove from cart
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', async function() {
            const itemId = this.dataset.itemId;
            await removeFromCart(itemId, this);
        });
    });
}

// Add to Cart
async function addToCart(productId, quantity, button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adicionando...';
    button.disabled = true;
    
    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ product_id: productId, quantity })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update cart count
            updateCartCount(result.cartCount);
            
            // Show success message
            showNotification('success', result.message || 'Produto adicionado ao carrinho!');
            
            // Update button if on product page
            if (button.classList.contains('btn-add-cart')) {
                button.innerHTML = '<i class="fas fa-check"></i> Adicionado';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }
        } else {
            throw new Error(result.error || 'Erro ao adicionar ao carrinho');
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        showNotification('error', error.message || 'Ocorreu um erro. Tente novamente.');
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

// Update Quantity
async function updateQuantity(control, change) {
    const input = control.querySelector('input');
    const itemId = control.dataset.itemId;
    let newQuantity = parseInt(input.value) + change;
    
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    input.value = newQuantity;
    
    await updateCartItem(itemId, newQuantity, control);
}

// Update Cart Item
async function updateCartItem(itemId, quantity, control) {
    try {
        const response = await fetch(`/cart/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ quantity })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update item total
            const itemTotal = control.closest('tr').querySelector('.item-total');
            if (itemTotal) {
                itemTotal.textContent = `R$ ${formatPrice(result.itemTotal)}`;
            }
            
            // Update cart totals
            updateCartTotals();
        } else {
            throw new Error(result.error || 'Erro ao atualizar quantidade');
        }
    } catch (error) {
        console.error('Update quantity error:', error);
        showNotification('error', error.message);
    }
}

// Remove from Cart
async function removeFromCart(itemId, button) {
    if (!confirm('Tem certeza que deseja remover este item do carrinho?')) {
        return;
    }
    
    try {
        const response = await fetch(`/cart/remove/${itemId}`, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Remove row from table
            const row = button.closest('tr');
            row.style.transition = 'opacity 0.3s';
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 300);
            
            // Update cart totals
            updateCartTotals();
            
            // Update cart count
            updateCartCount();
            
            showNotification('success', result.message || 'Item removido do carrinho');
        } else {
            throw new Error(result.error || 'Erro ao remover item');
        }
    } catch (error) {
        console.error('Remove from cart error:', error);
        showNotification('error', error.message);
    }
}

// Update Cart Count
function updateCartCount(count) {
    const cartBadges = document.querySelectorAll('.badge-cart-count');
    cartBadges.forEach(badge => {
        if (count !== undefined) {
            badge.textContent = count;
        } else {
            // Fetch from server if count not provided
            fetch('/api/cart/count')
                .then(response => response.json())
                .then(data => {
                    badge.textContent = data.count;
                })
                .catch(console.error);
        }
    });
}

// Update Cart Totals
function updateCartTotals() {
    // This would typically fetch updated totals from the server
    // For now, we'll trigger a page reload for simplicity
    window.location.reload();
}

// Product Gallery
function initializeProductGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.image-thumbnails img');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src.replace('/thumb', '/large');
                
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Wishlist Functionality
function initializeWishlist() {
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.dataset.productId;
            await toggleWishlist(productId, this);
        });
    });
}

// Toggle Wishlist
async function toggleWishlist(productId, button) {
    const isInWishlist = button.classList.contains('active');
    
    try {
        const response = await fetch('/wishlist/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ product_id: productId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            button.classList.toggle('active');
            const icon = button.querySelector('i');
            
            if (isInWishlist) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('success', 'Removido dos favoritos');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('success', 'Adicionado aos favoritos');
            }
        } else {
            throw new Error(result.error || 'Erro ao atualizar favoritos');
        }
    } catch (error) {
        console.error('Wishlist error:', error);
        showNotification('error', error.message);
    }
}

// Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Animations
function initializeAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
}

// Tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Utility Functions
function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',');
}

function showNotification(type, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Loading States
function showLoading(element, text = 'Carregando...') {
    const originalContent = element.innerHTML;
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    element.disabled = true;
    return originalContent;
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
    element.disabled = false;
}

// API Helper
async function apiRequest(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Export functions for use in other scripts
window.BayromHugo = {
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    showNotification,
    formatPrice,
    apiRequest
};
