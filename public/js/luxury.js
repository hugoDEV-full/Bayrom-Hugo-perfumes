// Luxury Navigation JavaScript Functions

function toggleLuxuryMenu() {
    const menu = document.getElementById('luxuryNavMenu');
    menu.classList.toggle('show');
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id + '-dropdown');
    const allDropdowns = document.querySelectorAll('.luxury-dropdown');
    
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('show');
        }
    });
    
    dropdown.classList.toggle('show');
}

function toggleSearch() {
    const search = document.getElementById('luxurySearch');
    const allDropdowns = document.querySelectorAll('.luxury-dropdown');
    
    allDropdowns.forEach(d => {
        d.classList.remove('show');
    });
    
    search.classList.toggle('show');
    if (search.classList.contains('show')) {
        search.querySelector('input').focus();
    }
}

function performLuxurySearch(event) {
    event.preventDefault();
    const query = event.target.querySelector('input').value;
    if (query) {
        window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-luxury') && !event.target.closest('.luxury-search')) {
        document.querySelectorAll('.luxury-dropdown').forEach(d => {
            d.classList.remove('show');
        });
        document.getElementById('luxurySearch').classList.remove('show');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('luxuryNavMenu');
    const toggle = document.querySelector('.luxury-mobile-toggle');
    
    if (menu.classList.contains('show') && 
        !menu.contains(event.target) && 
        !toggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// Add smooth scroll behavior for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-luxury');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
});

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe inspiration cards and product cards
    const animatedElements = document.querySelectorAll('.inspiration-card, .product-luxury-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add parallax effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-luxury');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Add hover effect for luxury cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.inspiration-card, .product-luxury-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
