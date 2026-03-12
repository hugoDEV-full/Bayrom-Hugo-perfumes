// Encyclopedia JavaScript - Bayrom & Hugo Parfums

// Database de perfumes simulado
const perfumeDatabase = [
    // Perfumes Femininos
    {
        id: 1,
        name: "Chanel No. 5",
        brand: "Chanel",
        category: "feminino",
        family: "floral",
        year: 1921,
        perfumer: "Ernest Beaux",
        notes: {
            top: ["Bergamota", "Limão", "Neroli", "Aldeídos"],
            middle: ["Jasmim", "Rosa", "Lírio do Vale", "Íris"],
            base: ["Patchouli", "Sândalo", "Vétiver", "Musgo"]
        },
        description: "O perfume icônico que revolucionou a perfumaria moderna com uso massivo de aldeídos.",
        image: "chanel-no5",
        rating: 4.5,
        longevity: "longa",
        sillage: "pesado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Chanel/Chanel-No-5-266.html",
        priceRange: "luxury",
        inspiration: "Floral Romântico"
    },
    {
        id: 2,
        name: "Black Opium",
        brand: "Yves Saint Laurent",
        category: "feminino",
        family: "oriental",
        year: 2014,
        perfumer: "Nathalie Lorson, Marie Salamagne, Olivier Cresp, Honorine Blanc",
        notes: {
            top: ["Pera", "Laranja", "Bergamota", "Pimenta Rosa"],
            middle: ["Jasmim", "Café", "Flor de Laranjeira", "Ameixa"],
            base: ["Baunilha", "Patchouli", "Caxemira", "Almíscar"]
        },
        description: "Fragrância viciante que captura a energia da noite urbana com notas de café e baunilha.",
        image: "black-opium",
        rating: 4.2,
        longevity: "muito longa",
        sillage: "moderado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Yves-Saint-Laurent/Black-Opium-37899.html",
        priceRange: "luxury",
        inspiration: "Oriental Sedutor"
    },
    {
        id: 3,
        name: "Good Girl",
        brand: "Carolina Herrera",
        category: "feminino",
        family: "oriental",
        year: 2016,
        perfumer: "Louise Turner, Anne Flipo",
        notes: {
            top: ["Amêndoa", "Café", "Pimenta Rosa"],
            middle: ["Tuberosa", "Jasmim Sambac", "Ylang-Ylang"],
            base: ["Baunilha", "Cacau", "Sândalo", "Musgo"]
        },
        description: "Dualidade entre doçura e poder em uma fragrância amadeirada floral.",
        image: "good-girl",
        rating: 4.0,
        longevity: "longa",
        sillage: "moderado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Carolina-Herrera/Good-Girl-42500.html",
        priceRange: "luxury",
        inspiration: "Amadeirado Elegante"
    },
    
    // Perfumes Masculinos
    {
        id: 4,
        name: "Aventus",
        brand: "Creed",
        category: "masculino",
        family: "fruity",
        year: 2010,
        perfumer: "Erwin Creed, Olivier Creed",
        notes: {
            top: ["Abacaxi", "Bergamota", "Maçã Verde", "Pimenta Preta"],
            middle: ["Patchouli", "Jasmim", "Rosa"],
            base: ["Musgo de Carvalho", "Vétiver", "Âmbar", "Baunilha"]
        },
        description: "Fragrância que define sucesso e poder, inspirada em espíritos conquistadores.",
        image: "aventus",
        rating: 4.7,
        longevity: "muito longa",
        sillage: "pesado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Creed/Aventus-16133.html",
        priceRange: "niche",
        inspiration: "Frutal Poderoso"
    },
    {
        id: 5,
        name: "Sauvage",
        brand: "Dior",
        category: "masculino",
        family: "fresh",
        year: 2015,
        perfumer: "François Demachy",
        notes: {
            top: ["Bergamota", "Pimenta Sichuan", "Elemi"],
            middle: ["Lavanda", "Gerânio", "Pimenta Rosa", "Anis Estrelado"],
            base: ["Ambroxan", "Cedro Atlas", "Papiro", "Lábano"]
        },
        description: "Liberdade selvagem em uma fragrância poderosa e instintiva.",
        image: "sauvage",
        rating: 4.1,
        longevity: "longa",
        sillage: "moderado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Dior/Sauvage-36486.html",
        priceRange: "luxury",
        inspiration: "Cítrico Fresco"
    },
    {
        id: 6,
        name: "Bleu de Chanel",
        brand: "Chanel",
        category: "masculino",
        family: "woody",
        year: 2010,
        perfumer: "Jacques Polge",
        notes: {
            top: ["Limão", "Menta", "Toranja Rosa", "Jenipapo"],
            middle: ["Gengibre", "Jasmim", "Noz Moscada"],
            base: ["Íris", "Sândalo", "Âmbar", "Cedro", "Vétiver"]
        },
        description: "Profundidade do oceano em uma fragrância misteriosa e irreverente.",
        image: "bleu-de-chanel",
        rating: 4.3,
        longevity: "muito longa",
        sillage: "moderado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Chanel/Bleu-de-Chanel-67217.html",
        priceRange: "luxury",
        inspiration: "Aquático Intenso"
    },
    
    // Perfumes Unisex
    {
        id: 7,
        name: "Baccarat Rouge 540",
        brand: "Maison Francis Kurkdjian",
        category: "unisex",
        family: "oriental",
        year: 2015,
        perfumer: "Francis Kurkdjian",
        notes: {
            top: ["Açafrão", "Jasmim Sambac"],
            middle: ["Resina de Ambraxan", "Flor de Laranjeira"],
            base: ["Musgo de Carvalho", "Vétiver", "Cedro", "Fir"]
        },
        description: "Joia líquida que transcende gêneros com sua composição única e memorável.",
        image: "baccarat-rouge",
        rating: 4.6,
        longevity: "muito longa",
        sillage: "extremo",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-39845.html",
        priceRange: "niche",
        inspiration: "Oriental Luxuoso"
    },
    {
        id: 8,
        name: "Santal 33",
        brand: "Le Labo",
        category: "unisex",
        family: "woody",
        year: 2011,
        perfumer: "Frank Voelkl",
        notes: {
            top: ["Cardamomo", "Pimenta", "Violeta"],
            middle: ["Sândalo Australiano", "Papiro", "Cedro"],
            base: ["Couro Russo", "Vétiver", "Ambroxan"]
        },
        description: "Espírito de Nova York em uma fragrância única e autêntica.",
        image: "santal-33",
        rating: 4.4,
        longevity: "longa",
        sillage: "moderado",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Le-Labo/Santal-33-15864.html",
        priceRange: "niche",
        inspiration: "Verde Fresco"
    },
    {
        id: 9,
        name: "Mojave Ghost",
        brand: "Byredo",
        category: "unisex",
        family: "woody",
        year: 2014,
        perfumer: "Jerome Epinette",
        notes: {
            top: ["Ambrette", "Cacto", "Madeira de Cacto"],
            middle: ["Flor de Cacto", "Jasmim"],
            base: ["Sândalo", "Musk Branco", "Cedro"]
        },
        description: "Beleza do deserto em uma fragrância etérea e misteriosa.",
        image: "mojave-ghost",
        rating: 4.2,
        longevity: "moderada",
        sillage: "leve",
        fragranticaUrl: "https://www.fragrantica.com.br/perfumes/Byredo/Mojave-Ghost-32478.html",
        priceRange: "niche",
        inspiration: "Clean Minimalista"
    }
];

// Variáveis globais
let currentFilter = 'all';
let currentFamily = 'all';
let currentView = 'grid';
let displayedPerfumes = 6;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedPerfumes();
    loadAllPerfumes();
    setupEventListeners();
    setupAnimations();
});

// Configurar event listeners
function setupEventListeners() {
    // Busca
    document.getElementById('perfumeSearch').addEventListener('input', debounce(searchPerfumes, 300));
    
    // Filtros de categoria
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterAndDisplayPerfumes();
        });
    });
    
    // Filtros de família
    document.querySelectorAll('.family-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.family-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFamily = this.dataset.family;
            filterAndDisplayPerfumes();
        });
    });
    
    // View options
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            updateViewMode();
        });
    });
}

// Carregar perfumes em destaque
function loadFeaturedPerfumes() {
    const featuredContainer = document.getElementById('featuredPerfumes');
    const featuredPerfumes = perfumeDatabase.filter(p => p.rating >= 4.5).slice(0, 3);
    
    featuredContainer.innerHTML = featuredPerfumes.map(perfume => createPerfumeCard(perfume, 'featured')).join('');
}

// Carregar todos os perfumes
function loadAllPerfumes() {
    const container = document.getElementById('allPerfumesGrid');
    const perfumesToShow = perfumeDatabase.slice(0, displayedPerfumes);
    
    container.innerHTML = perfumesToShow.map(perfume => createPerfumeCard(perfume, currentView)).join('');
}

// Criar card de perfume
function createPerfumeCard(perfume, viewType = 'grid') {
    const familyIcons = {
        floral: '🌸',
        citrus: '🍋',
        woody: '🌲',
        oriental: '🌙',
        fresh: '💧',
        gourmand: '🍮',
        fruity: '🍍'
    };
    
    const categoryIcons = {
        feminino: '♀️',
        masculino: '♂️',
        unisex: '⚧️'
    };
    
    if (viewType === 'list') {
        return `
            <div class="col-lg-12">
                <div class="perfume-card-list">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <div class="perfume-image-list">
                                <img src="/images/perfumes/${perfume.image}.jpg" alt="${perfume.name}" 
                                     onerror="this.src='/images/perfume-placeholder.jpg'">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="perfume-info">
                                <h4>${perfume.name}</h4>
                                <p class="brand">${perfume.brand} • ${perfume.year}</p>
                                <p class="description">${perfume.description}</p>
                                <div class="notes-preview">
                                    <span class="note-badge">${familyIcons[perfume.family]} ${perfume.family}</span>
                                    <span class="note-badge">${categoryIcons[perfume.category]} ${perfume.category}</span>
                                    <span class="note-badge">⏱️ ${perfume.longevity}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="perfume-actions">
                                <a href="${perfume.fragranticaUrl}" target="_blank" 
                                   class="btn btn-outline-primary btn-sm mb-2">
                                    <i class="fas fa-external-link-alt"></i> Fragrantica
                                </a>
                                ${perfume.inspiration ? `
                                    <a href="/products?search=${encodeURIComponent(perfume.inspiration)}" 
                                       class="btn btn-primary btn-sm">
                                        <i class="fas fa-shopping-bag"></i> Comprar
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="col-lg-4 col-md-6">
            <div class="perfume-card" data-category="${perfume.category}" data-family="${perfume.family}">
                <div class="perfume-image">
                    <img src="/images/perfumes/${perfume.image}.jpg" alt="${perfume.name}" 
                         onerror="this.src='/images/perfume-placeholder.jpg'">
                    <div class="perfume-overlay">
                        <div class="rating">
                            ${generateStars(perfume.rating)}
                            <span>${perfume.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="perfume-content">
                    <div class="perfume-header">
                        <h4>${perfume.name}</h4>
                        <p class="brand">${perfume.brand}</p>
                    </div>
                    <div class="perfume-meta">
                        <span class="meta-item">${familyIcons[perfume.family]} ${perfume.family}</span>
                        <span class="meta-item">${categoryIcons[perfume.category]} ${perfume.category}</span>
                        <span class="meta-item">${perfume.year}</span>
                    </div>
                    <div class="perfume-notes">
                        <div class="notes-section">
                            <strong>Topo:</strong> ${perfume.notes.top.join(', ')}
                        </div>
                        <div class="notes-section">
                            <strong>Coração:</strong> ${perfume.notes.middle.join(', ')}
                        </div>
                        <div class="notes-section">
                            <strong>Fundo:</strong> ${perfume.notes.base.join(', ')}
                        </div>
                    </div>
                    <div class="perfume-actions">
                        <a href="${perfume.fragranticaUrl}" target="_blank" 
                           class="btn btn-outline-primary btn-sm">
                            <i class="fas fa-external-link-alt"></i> Fragrantica
                        </a>
                        ${perfume.inspiration ? `
                            <a href="/products?search=${encodeURIComponent(perfume.inspiration)}" 
                               class="btn btn-primary btn-sm">
                                <i class="fas fa-shopping-bag"></i> Inspirado
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Gerar estrelas de avaliação
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Buscar perfumes
function searchPerfumes() {
    const searchTerm = document.getElementById('perfumeSearch').value.toLowerCase();
    
    if (!searchTerm) {
        filterAndDisplayPerfumes();
        return;
    }
    
    const filteredPerfumes = perfumeDatabase.filter(perfume => {
        return perfume.name.toLowerCase().includes(searchTerm) ||
               perfume.brand.toLowerCase().includes(searchTerm) ||
               perfume.notes.top.some(note => note.toLowerCase().includes(searchTerm)) ||
               perfume.notes.middle.some(note => note.toLowerCase().includes(searchTerm)) ||
               perfume.notes.base.some(note => note.toLowerCase().includes(searchTerm)) ||
               perfume.family.toLowerCase().includes(searchTerm) ||
               perfume.category.toLowerCase().includes(searchTerm);
    });
    
    displayFilteredPerfumes(filteredPerfumes);
}

// Filtrar e exibir perfumes
function filterAndDisplayPerfumes() {
    let filteredPerfumes = perfumeDatabase;
    
    // Filtrar por categoria
    if (currentFilter !== 'all') {
        filteredPerfumes = filteredPerfumes.filter(p => p.category === currentFilter);
    }
    
    // Filtrar por família
    if (currentFamily !== 'all') {
        filteredPerfumes = filteredPerfumes.filter(p => p.family === currentFamily);
    }
    
    displayFilteredPerfumes(filteredPerfumes);
}

// Exibir perfumes filtrados
function displayFilteredPerfumes(perfumes) {
    const container = document.getElementById('allPerfumesGrid');
    
    if (perfumes.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="no-results">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h4>Nenhum perfume encontrado</h4>
                    <p>Tente ajustar seus filtros ou termos de busca</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = perfumes.map(perfume => createPerfumeCard(perfume, currentView)).join('');
    
    // Adicionar animação
    animateCards();
}

// Carregar mais perfumes
function loadMorePerfumes() {
    displayedPerfumes += 3;
    loadAllPerfumes();
    
    if (displayedPerfumes >= perfumeDatabase.length) {
        document.querySelector('.btn-luxury').style.display = 'none';
    }
}

// Atualizar modo de visualização
function updateViewMode() {
    const container = document.getElementById('allPerfumesGrid');
    const currentPerfumes = Array.from(container.children).length > 0 ? 
        perfumeDatabase.slice(0, displayedPerfumes) : [];
    
    container.innerHTML = currentPerfumes.map(perfume => createPerfumeCard(perfume, currentView)).join('');
}

// Configurar animações
function setupAnimations() {
    // Animação de scroll
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
    
    // Observar cards de perfume
    document.querySelectorAll('.perfume-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Animar cards
function animateCards() {
    const cards = document.querySelectorAll('.perfume-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Debounce para busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função utilitária para destacar termo de busca
function highlightTerm(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Exportar funções para uso global
window.searchPerfumes = searchPerfumes;
window.loadMorePerfumes = loadMorePerfumes;
