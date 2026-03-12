// Bayrom & Hugo Parfums - Sistema de Materiais Preciosos
class MaterialSystem {
    constructor() {
        this.materialAssignments = this.initializeMaterialAssignments();
        this.init();
    }

    initializeMaterialAssignments() {
        return {
            // Chanel - Ouro Branco e Diamante
            'bp-chanel-no-5': {
                primary: 'diamond',
                secondary: 'platinum',
                accent: 'gold-rose',
                particles: ['diamond', 'gold'],
                badge: 'diamond',
                price: 'diamond'
            },
            'bp-chanel-coco-mademoiselle': {
                primary: 'gold-rose',
                secondary: 'diamond',
                accent: 'platinum',
                particles: ['gold', 'diamond'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },
            'bp-chanel-bleu-de-chanel': {
                primary: 'platinum',
                secondary: 'sapphire',
                accent: 'silver',
                particles: ['diamond', 'sapphire'],
                badge: 'platinum',
                price: 'platinum'
            },

            // Christian Dior - Ouro e Rubi
            'bp-dior-sauvage': {
                primary: 'gold',
                secondary: 'ruby',
                accent: 'copper',
                particles: ['gold', 'ruby'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-dior-jadore': {
                primary: 'gold-rose',
                secondary: 'emerald',
                accent: 'diamond',
                particles: ['gold', 'emerald'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Tom Ford - Ônix e Platina
            'bp-tom-ford-black-orchid': {
                primary: 'onyx',
                secondary: 'platinum',
                accent: 'ruby',
                particles: ['diamond', 'onyx'],
                badge: 'platinum',
                price: 'platinum'
            },
            'bp-tom-ford-oud-wood': {
                primary: 'gold',
                secondary: 'onyx',
                accent: 'copper',
                particles: ['gold', 'onyx'],
                badge: 'gold',
                price: 'gold'
            },

            // Versace - Ouro e Safira
            'bp-versace-eros': {
                primary: 'gold',
                secondary: 'sapphire',
                accent: 'diamond',
                particles: ['gold', 'sapphire'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-versace-bright-crystal': {
                primary: 'diamond',
                secondary: 'aquamarine',
                accent: 'silver',
                particles: ['diamond', 'aquamarine'],
                badge: 'diamond',
                price: 'diamond'
            },

            // Paco Rabanne - Ouro e Topázio
            'bp-paco-rabanne-1-million': {
                primary: 'gold',
                secondary: 'topaz',
                accent: 'diamond',
                particles: ['gold', 'topaz'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-paco-rabanne-olympa': {
                primary: 'gold-rose',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['gold', 'ruby'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Creed - Platina e Esmeralda
            'bp-creed-aventus': {
                primary: 'platinum',
                secondary: 'emerald',
                accent: 'gold',
                particles: ['diamond', 'emerald'],
                badge: 'platinum',
                price: 'platinum'
            },
            'bp-creed-green-irish-tweed': {
                primary: 'emerald',
                secondary: 'gold',
                accent: 'jade',
                particles: ['emerald', 'gold'],
                badge: 'emerald',
                price: 'emerald'
            },

            // Yves Saint Laurent - Ouro e Ametista
            'bp-ysl-black-opium': {
                primary: 'amethyst',
                secondary: 'gold',
                accent: 'ruby',
                particles: ['amethyst', 'gold'],
                badge: 'amethyst',
                price: 'amethyst'
            },
            'bp-ysl-la-nuit-de-lhomme': {
                primary: 'gold',
                secondary: 'amethyst',
                accent: 'onyx',
                particles: ['gold', 'amethyst'],
                badge: 'gold',
                price: 'gold'
            },

            // Hermès - Ouro Rosa e Turquesa
            'bp-hermes-terre-dhermes': {
                primary: 'gold-rose',
                secondary: 'turquoise',
                accent: 'copper',
                particles: ['gold', 'turquoise'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },
            'bp-hermes-twilly-dhermes': {
                primary: 'gold-rose',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['gold', 'ruby'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Prada - Prata e Ametista
            'bp-prada-luna-rossa': {
                primary: 'silver',
                secondary: 'amethyst',
                accent: 'platinum',
                particles: ['silver', 'amethyst'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-prada-candy': {
                primary: 'gold-rose',
                secondary: 'amethyst',
                accent: 'diamond',
                particles: ['gold', 'amethyst'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Giorgio Armani - Platina e Safira
            'bp-armani-code': {
                primary: 'platinum',
                secondary: 'sapphire',
                accent: 'silver',
                particles: ['diamond', 'sapphire'],
                badge: 'platinum',
                price: 'platinum'
            },
            'bp-armani-si': {
                primary: 'gold-rose',
                secondary: 'amethyst',
                accent: 'diamond',
                particles: ['gold', 'amethyst'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Calvin Klein - Prata e Água-Marinha
            'bp-ck-one': {
                primary: 'silver',
                secondary: 'aquamarine',
                accent: 'diamond',
                particles: ['silver', 'aquamarine'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-ck-eternity': {
                primary: 'silver',
                secondary: 'diamond',
                accent: 'platinum',
                particles: ['silver', 'diamond'],
                badge: 'silver',
                price: 'silver'
            },

            // Hugo Boss - Ouro e Cobre
            'bp-hugo-boss-the-scent': {
                primary: 'gold',
                secondary: 'copper',
                accent: 'bronze',
                particles: ['gold', 'copper'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-hugo-boss-ma-vie': {
                primary: 'gold-rose',
                secondary: 'emerald',
                accent: 'diamond',
                particles: ['gold', 'emerald'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Dolce & Gabbana - Ouro e Coral
            'bp-dolce-gabbana-light-blue': {
                primary: 'silver',
                secondary: 'aquamarine',
                accent: 'diamond',
                particles: ['silver', 'aquamarine'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-dolce-gabbana-the-one': {
                primary: 'gold',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['gold', 'ruby'],
                badge: 'gold',
                price: 'gold'
            },

            // Jean Paul Gaultier - Prata e Rubi
            'bp-jean-paul-gaultier-le-male': {
                primary: 'silver',
                secondary: 'ruby',
                accent: 'gold',
                particles: ['silver', 'ruby'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-jean-paul-gaultier-scandal': {
                primary: 'ruby',
                secondary: 'gold-rose',
                accent: 'diamond',
                particles: ['ruby', 'gold'],
                badge: 'ruby',
                price: 'ruby'
            },

            // Issey Miyake - Prata e Jade
            'bp-issey-miyake-leau-dissey': {
                primary: 'silver',
                secondary: 'jade',
                accent: 'aquamarine',
                particles: ['silver', 'jade'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-issey-miyake-leau-dissey-pour-homme': {
                primary: 'silver',
                secondary: 'aquamarine',
                accent: 'platinum',
                particles: ['silver', 'aquamarine'],
                badge: 'silver',
                price: 'silver'
            },

            // Montblanc - Platina e Ônix
            'bp-montblanc-legend': {
                primary: 'platinum',
                secondary: 'onyx',
                accent: 'silver',
                particles: ['diamond', 'onyx'],
                badge: 'platinum',
                price: 'platinum'
            },
            'bp-montblanc-lady-emblem': {
                primary: 'platinum',
                secondary: 'diamond',
                accent: 'ruby',
                particles: ['diamond', 'platinum'],
                badge: 'platinum',
                price: 'platinum'
            },

            // Lancôme - Ouro Rosa e Diamante
            'bp-lancome-la-vie-est-belle': {
                primary: 'gold-rose',
                secondary: 'diamond',
                accent: 'platinum',
                particles: ['gold', 'diamond'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },
            'bp-lancome-tresor': {
                primary: 'gold',
                secondary: 'diamond',
                accent: 'ruby',
                particles: ['gold', 'diamond'],
                badge: 'gold',
                price: 'gold'
            },

            // Bvlgari - Ouro e Esmeralda
            'bp-bvlgari-man-in-black': {
                primary: 'gold',
                secondary: 'onyx',
                accent: 'ruby',
                particles: ['gold', 'onyx'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-bvlgari-omnia-crystalline': {
                primary: 'diamond',
                secondary: 'aquamarine',
                accent: 'platinum',
                particles: ['diamond', 'aquamarine'],
                badge: 'diamond',
                price: 'diamond'
            },

            // Azzaro - Ouro e Bronze
            'bp-azzaro-chrome': {
                primary: 'silver',
                secondary: 'aquamarine',
                accent: 'platinum',
                particles: ['silver', 'aquamarine'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-azzaro-pour-homme': {
                primary: 'gold',
                secondary: 'bronze',
                accent: 'copper',
                particles: ['gold', 'bronze'],
                badge: 'gold',
                price: 'gold'
            },

            // Ferrari - Rubi e Prata
            'bp-ferrari-bright-neroli': {
                primary: 'silver',
                secondary: 'ruby',
                accent: 'gold',
                particles: ['silver', 'ruby'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-ferrari-radical-essence': {
                primary: 'ruby',
                secondary: 'silver',
                accent: 'onyx',
                particles: ['ruby', 'silver'],
                badge: 'ruby',
                price: 'ruby'
            },

            // Ralph Lauren - Ouro e Safira
            'bp-ralph-lauren-polo-blue': {
                primary: 'silver',
                secondary: 'sapphire',
                accent: 'diamond',
                particles: ['silver', 'sapphire'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-ralph-lauren-romance': {
                primary: 'gold-rose',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['gold', 'ruby'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Givenchy - Ouro e Ametista
            'bp-givenchy-gentleman': {
                primary: 'gold',
                secondary: 'amethyst',
                accent: 'onyx',
                particles: ['gold', 'amethyst'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-givenchy-irresistible': {
                primary: 'gold-rose',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['gold', 'ruby'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },

            // Carolina Herrera - Rubi e Ouro Rosa
            'bp-carolina-herrera-good-girl': {
                primary: 'ruby',
                secondary: 'gold-rose',
                accent: 'diamond',
                particles: ['ruby', 'gold'],
                badge: 'ruby',
                price: 'ruby'
            },
            'bp-carolina-herrera-bad-boy': {
                primary: 'onyx',
                secondary: 'gold',
                accent: 'ruby',
                particles: ['onyx', 'gold'],
                badge: 'gold',
                price: 'gold'
            },

            // Viktor&Rolf - Diamante e Ametista
            'bp-viktorrolf-flowerbomb': {
                primary: 'diamond',
                secondary: 'amethyst',
                accent: 'ruby',
                particles: ['diamond', 'amethyst'],
                badge: 'diamond',
                price: 'diamond'
            },
            'bp-viktorrolf-spicebomb': {
                primary: 'ruby',
                secondary: 'gold',
                accent: 'copper',
                particles: ['ruby', 'gold'],
                badge: 'ruby',
                price: 'ruby'
            },

            // Mugler - Ônix e Prata
            'bp-mugler-angel': {
                primary: 'onyx',
                secondary: 'silver',
                accent: 'gold',
                particles: ['onyx', 'silver'],
                badge: 'silver',
                price: 'silver'
            },
            'bp-mugler-amen': {
                primary: 'gold',
                secondary: 'onyx',
                accent: 'copper',
                particles: ['gold', 'onyx'],
                badge: 'gold',
                price: 'gold'
            },

            // Narciso Rodriguez - Ouro Rosa e Diamante
            'bp-narciso-rodriguez-for-her': {
                primary: 'gold-rose',
                secondary: 'diamond',
                accent: 'platinum',
                particles: ['gold', 'diamond'],
                badge: 'rose-gold',
                price: 'rose-gold'
            },
            'bp-narciso-rodriguez-for-him': {
                primary: 'silver',
                secondary: 'amethyst',
                accent: 'platinum',
                particles: ['silver', 'amethyst'],
                badge: 'silver',
                price: 'silver'
            },

            // Marc Jacobs - Diamante e Safira
            'bp-marc-jacobs-daisy': {
                primary: 'diamond',
                secondary: 'sapphire',
                accent: 'gold-rose',
                particles: ['diamond', 'sapphire'],
                badge: 'diamond',
                price: 'diamond'
            },
            'bp-marc-jacobs-bang': {
                primary: 'silver',
                secondary: 'onyx',
                accent: 'gold',
                particles: ['silver', 'onyx'],
                badge: 'silver',
                price: 'silver'
            },

            // Xerjoff - Ouro e Tanzanita
            'bp-xerjoff-naxos': {
                primary: 'gold',
                secondary: 'tanzanite',
                accent: 'copper',
                particles: ['gold', 'tanzanite'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-xerjoff-alexandria-ii': {
                primary: 'platinum',
                secondary: 'tanzanite',
                accent: 'diamond',
                particles: ['diamond', 'tanzanite'],
                badge: 'platinum',
                price: 'platinum'
            },

            // Maison Francis Kurkdjian - Platina e Diamante
            'bp-mfk-baccarat-rouge-540': {
                primary: 'platinum',
                secondary: 'ruby',
                accent: 'diamond',
                particles: ['diamond', 'ruby'],
                badge: 'platinum',
                price: 'platinum'
            },
            'bp-mfk-grand-soir': {
                primary: 'gold',
                secondary: 'amethyst',
                accent: 'diamond',
                particles: ['gold', 'amethyst'],
                badge: 'gold',
                price: 'gold'
            },

            // BDK Parfums - Ouro e Ametista
            'bp-bdk-parfums-tabac-rose': {
                primary: 'gold',
                secondary: 'ruby',
                accent: 'amethyst',
                particles: ['gold', 'ruby'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-bdk-parfums-gris-charnel': {
                primary: 'platinum',
                secondary: 'amethyst',
                accent: 'diamond',
                particles: ['diamond', 'amethyst'],
                badge: 'platinum',
                price: 'platinum'
            },

            // Louis Vuitton - Ouro e Diamante
            'bp-louis-vuitton-imagination': {
                primary: 'gold',
                secondary: 'diamond',
                accent: 'platinum',
                particles: ['gold', 'diamond'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-louis-vuitton-on-the-beach': {
                primary: 'silver',
                secondary: 'aquamarine',
                accent: 'diamond',
                particles: ['silver', 'aquamarine'],
                badge: 'silver',
                price: 'silver'
            },

            // Nishane - Ouro e Esmeralda
            'bp-nishane-hacivat': {
                primary: 'gold',
                secondary: 'emerald',
                accent: 'diamond',
                particles: ['gold', 'emerald'],
                badge: 'gold',
                price: 'gold'
            },
            'bp-nishane-ani': {
                primary: 'platinum',
                secondary: 'amethyst',
                accent: 'diamond',
                particles: ['diamond', 'amethyst'],
                badge: 'platinum',
                price: 'platinum'
            }
        };
    }

    init() {
        this.applyMaterialsToProducts();
        this.setupMaterialAnimations();
        this.createMaterialParticles();
        this.setupMaterialInteractions();
    }

    applyMaterialsToProducts() {
        const productCards = document.querySelectorAll('.product-card-enhanced, .perfume-card-premium');
        
        productCards.forEach(card => {
            const perfumeName = this.extractPerfumeName(card);
            const materials = this.materialAssignments[perfumeName];
            
            if (materials) {
                this.applyMaterialToCard(card, materials);
            }
        });
    }

    extractPerfumeName(card) {
        // Tentar extrair o nome do perfume do card
        const nameElement = card.querySelector('.product-name, .perfume-name-premium');
        if (nameElement) {
            return nameElement.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        }
        
        // Fallback: tentar do dataset ou ID
        return card.dataset.perfume || card.id || '';
    }

    applyMaterialToCard(card, materials) {
        // Aplicar material principal ao card
        card.classList.add(`material-${materials.primary}`);
        card.classList.add('material-shine');
        
        // Aplicar material à imagem
        const imageContainer = card.querySelector('.product-image-enhanced, .perfume-image-premium');
        if (imageContainer) {
            imageContainer.classList.add(`material-${materials.primary}`);
            this.createMaterialParticles(imageContainer, materials.particles);
        }
        
        // Aplicar material ao badge
        const badges = card.querySelectorAll('.product-badge, .perfume-badge');
        badges.forEach(badge => {
            badge.classList.add(`material-badge-${materials.badge}`);
        });
        
        // Aplicar material ao preço
        const priceElements = card.querySelectorAll('.current-price, .perfume-price-premium');
        priceElements.forEach(price => {
            price.classList.add(`price-material-${materials.price}`);
        });
        
        // Aplicar material aos botões
        const buttons = card.querySelectorAll('.btn-add-to-cart, .btn-luxury');
        buttons.forEach(button => {
            button.classList.add(`btn-material-${materials.primary}`);
        });
        
        // Adicionar ícone de material
        this.addMaterialIcon(card, materials.primary);
        
        // Adicionar partículas flutuantes
        this.addFloatingParticles(card, materials.particles);
    }

    addMaterialIcon(card, material) {
        const existingIcon = card.querySelector('.material-icon-container');
        if (existingIcon) return;
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'material-icon-container';
        iconContainer.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 10;
        `;
        
        const icon = document.createElement('div');
        icon.className = `material-icon material-icon-${material}`;
        icon.innerHTML = this.getMaterialIcon(material);
        
        iconContainer.appendChild(icon);
        card.appendChild(iconContainer);
    }

    getMaterialIcon(material) {
        const icons = {
            'gold': '♦',
            'diamond': '◆',
            'ruby': '♥',
            'emerald': '♣',
            'sapphire': '♠',
            'amethyst': '✦',
            'platinum': '○',
            'silver': '◇',
            'copper': '▪',
            'bronze': '▫',
            'onyx': '●',
            'turquoise': '✧',
            'aquamarine': '✤',
            'topaz': '✥',
            'tanzanite': '✦',
            'citrine': '✶',
            'jade': '✷',
            'peridot': '✸',
            'garnet': '✹',
            'gold-rose': '✺',
            'pearl': '✻',
            'moonstone': '✼',
            'lapis-lazuli': '✽',
            'bloodstone': '✾',
            'alexandrite': '✿'
        };
        
        return icons[material] || '♦';
    }

    createMaterialParticles(container, particleTypes) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'material-particles';
        
        particleTypes.forEach((type, index) => {
            for (let i = 0; i < 3; i++) {
                const particle = document.createElement('div');
                particle.className = `material-particle ${type}-particle`;
                particle.style.cssText = `
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 4}s;
                    animation-duration: ${4 + Math.random() * 2}s;
                `;
                particlesContainer.appendChild(particle);
            }
        });
        
        container.appendChild(particlesContainer);
    }

    addFloatingParticles(card, particleTypes) {
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-material-particles';
        floatingContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        
        particleTypes.forEach((type, index) => {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = `floating-particle ${type}-particle`;
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 6 + 3}px;
                    height: ${Math.random() * 6 + 3}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatParticle ${6 + Math.random() * 4}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 6}s;
                    opacity: 0.6;
                `;
                floatingContainer.appendChild(particle);
            }
        });
        
        card.appendChild(floatingContainer);
    }

    setupMaterialAnimations() {
        // Adicionar CSS para animações flutuantes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) rotate(0deg);
                    opacity: 0.3;
                }
                25% {
                    transform: translateY(-20px) translateX(10px) rotate(90deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-10px) translateX(-10px) rotate(180deg);
                    opacity: 0.6;
                }
                75% {
                    transform: translateY(-30px) translateX(5px) rotate(270deg);
                    opacity: 0.9;
                }
            }
            
            @keyframes shimmer {
                0% {
                    background-position: -200% center;
                }
                100% {
                    background-position: 200% center;
                }
            }
            
            .material-shine::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(255, 255, 255, 0.7) 50%,
                    transparent 60%
                );
                animation: shimmer 3s infinite;
                pointer-events: none;
            }
            
            .floating-particle {
                border-radius: 50%;
                filter: blur(0.5px);
            }
            
            .material-icon-container {
                animation: materialPulse 2s ease-in-out infinite;
            }
            
            @keyframes materialPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupMaterialInteractions() {
        // Efeito de brilho ao passar o mouse
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.material-shine');
            if (card) {
                card.classList.add('material-glow');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.material-shine');
            if (card) {
                card.classList.remove('material-glow');
            }
        });
        
        // Efeito de clique nos cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.material-shine');
            if (card && !e.target.closest('button')) {
                this.createMaterialBurst(card);
            }
        });
    }

    createMaterialBurst(card) {
        const materials = this.getCardMaterials(card);
        if (!materials) return;
        
        const burst = document.createElement('div');
        burst.className = 'material-burst';
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
        `;
        
        materials.particles.forEach((type, index) => {
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = `burst-particle ${type}-particle`;
                particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: burstParticle 1s ease-out forwards;
                    animation-delay: ${index * 0.1}s;
                `;
                
                const angle = (i * 45) * Math.PI / 180;
                const distance = 50 + Math.random() * 50;
                particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
                
                burst.appendChild(particle);
            }
        });
        
        card.appendChild(burst);
        
        setTimeout(() => burst.remove(), 2000);
    }

    getCardMaterials(card) {
        const perfumeName = this.extractPerfumeName(card);
        return this.materialAssignments[perfumeName];
    }

    // Método público para atualizar materiais
    updateMaterials() {
        this.applyMaterialsToProducts();
    }

    // Método para obter informações de material
    getMaterialInfo(perfumeSlug) {
        return this.materialAssignments[perfumeSlug];
    }

    // Método para criar cards de material personalizados
    createMaterialCard(material, title, description) {
        const card = document.createElement('div');
        card.className = `material-card material-${material}`;
        card.innerHTML = `
            <div class="material-card-content">
                <div class="material-icon material-icon-${material}">
                    ${this.getMaterialIcon(material)}
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        return card;
    }
}

// Inicializar o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.materialSystem = new MaterialSystem();
    
    // Adicionar CSS para animação de burst
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        @keyframes burstParticle {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--end-x), var(--end-y)) scale(0);
                opacity: 0;
            }
        }
        
        .material-burst {
            animation: burstFade 2s ease-out forwards;
        }
        
        @keyframes burstFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(burstStyle);
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaterialSystem;
}
