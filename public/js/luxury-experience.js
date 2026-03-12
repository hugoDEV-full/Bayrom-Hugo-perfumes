// Bayrom & Hugo Parfums - Experiência de Luxo Interativa
class LuxuryExperience {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupMagneticButtons();
        this.setupParallaxEffects();
        this.setupSoundEffects();
        this.setupVirtualPerfumeTry();
        this.setupPersonalizedRecommendations();
        this.setupLuxuryAnimations();
        this.setupInteractiveTimeline();
        this.setupAIScentMatch();
        this.setupExclusiveContent();
    }

    // Sistema de Partículas Avançado
    setupParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'luxury-particles';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = `rgba(212, 175, 55, ${this.opacity})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Botões Magnéticos
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-hero, .btn-luxury');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Efeitos Parallax Avançados
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Sistema de Áudio Ambiente
    setupSoundEffects() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const createLuxurySound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 432; // Frequência de cura
            oscillator.type = 'sine';
            gainNode.gain.value = 0.01;
            
            oscillator.start();
            setTimeout(() => oscillator.stop(), 100);
        };

        // Som ao passar o mouse em produtos premium
        document.querySelectorAll('.perfume-card-premium').forEach(card => {
            card.addEventListener('mouseenter', createLuxurySound);
        });
    }

    // Teste Virtual de Perfumes
    setupVirtualPerfumeTry() {
        const modal = document.createElement('div');
        modal.id = 'virtual-try-modal';
        modal.innerHTML = `
            <div class="virtual-try-container">
                <div class="virtual-try-header">
                    <h3>Teste Virtual de Perfume</h3>
                    <button class="close-virtual-try">&times;</button>
                </div>
                <div class="virtual-try-content">
                    <div class="perfume-visualizer">
                        <canvas id="spectrum-canvas"></canvas>
                    </div>
                    <div class="scent-notes">
                        <h4>Notas Olfativas</h4>
                        <div class="notes-timeline">
                            <div class="note-layer top-notes">
                                <span>Notas de Saída</span>
                                <div class="note-bar"></div>
                            </div>
                            <div class="note-layer middle-notes">
                                <span>Notas de Coração</span>
                                <div class="note-bar"></div>
                            </div>
                            <div class="note-layer base-notes">
                                <span>Notas de Fundo</span>
                                <div class="note-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="intensity-control">
                        <label>Intensidade da Fragrância</label>
                        <input type="range" min="1" max="10" value="5" id="intensity-slider">
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        `;
        
        document.body.appendChild(modal);

        // Adicionar botão de teste virtual em cada produto
        document.querySelectorAll('.perfume-card-premium').forEach(card => {
            const tryButton = document.createElement('button');
            tryButton.className = 'virtual-try-btn';
            tryButton.innerHTML = '<i class="fas fa-spray-can"></i> Testar Virtual';
            tryButton.style.cssText = `
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: linear-gradient(135deg, #d4af37, #b8941f);
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.8rem;
                z-index: 10;
            `;
            
            tryButton.addEventListener('click', () => {
                modal.style.display = 'flex';
                this.startVirtualTry();
            });
            
            card.appendChild(tryButton);
        });

        // Fechar modal
        modal.querySelector('.close-virtual-try').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    startVirtualTry() {
        const canvas = document.getElementById('spectrum-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;

        let time = 0;
        
        function drawSpectrum() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Criar espectro visual da fragrância
            for (let i = 0; i < 50; i++) {
                const x = (canvas.width / 50) * i;
                const height = Math.sin(time + i * 0.1) * 50 + 50;
                const hue = (i * 7 + time * 10) % 360;
                
                ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
                ctx.fillRect(x, canvas.height - height, canvas.width / 50 - 2, height);
            }
            
            time += 0.05;
            requestAnimationFrame(drawSpectrum);
        }
        
        drawSpectrum();

        // Animar barras de notas
        const noteBars = document.querySelectorAll('.note-bar');
        noteBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'fillBar 2s ease-in-out infinite';
            }, index * 200);
        });
    }

    // Sistema de Recomendações Personalizadas
    setupPersonalizedRecommendations() {
        const preferences = {
            occasion: '',
            intensity: '',
            season: '',
            personality: ''
        };

        const quizModal = document.createElement('div');
        quizModal.innerHTML = `
            <div class="quiz-modal">
                <h3>Descubra Sua Fragrância Perfeita</h3>
                <div class="quiz-questions">
                    <div class="question" data-question="occasion">
                        <h4>Ocasião de Uso</h4>
                        <div class="options">
                            <button data-value="daily">Uso Diário</button>
                            <button data-value="special">Eventos Especiais</button>
                            <button data-value="romantic">Encontros Românticos</button>
                            <button data-value="business">Ambiente Corporativo</button>
                        </div>
                    </div>
                    <div class="question" data-question="intensity">
                        <h4>Intensidade Preferida</h4>
                        <div class="options">
                            <button data-value="light">Leve e Sutil</button>
                            <button data-value="moderate">Moderada</button>
                            <button data-value="intense">Intensa</button>
                            <button data-value="bold">Ousada</button>
                        </div>
                    </div>
                    <div class="question" data-question="season">
                        <h4>Estação do Ano</h4>
                        <div class="options">
                            <button data-value="spring">Primavera</button>
                            <button data-value="summer">Verão</button>
                            <button data-value="fall">Outono</button>
                            <button data-value="winter">Inverno</button>
                        </div>
                    </div>
                </div>
                <button class="get-recommendations">Descobrir Recomendações</button>
            </div>
        `;
        
        // Adicionar estilos do quiz
        const style = document.createElement('style');
        style.textContent = `
            .quiz-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                max-width: 500px;
                width: 90%;
                display: none;
            }
            
            .quiz-modal h3 {
                color: #d4af37;
                margin-bottom: 30px;
                text-align: center;
                font-family: 'Playfair Display', serif;
            }
            
            .quiz-questions .question {
                margin-bottom: 25px;
            }
            
            .quiz-questions h4 {
                margin-bottom: 15px;
                color: #333;
            }
            
            .options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            
            .options button {
                padding: 12px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .options button:hover {
                border-color: #d4af37;
                background: #f8f9fa;
            }
            
            .options button.selected {
                background: #d4af37;
                color: white;
                border-color: #d4af37;
            }
            
            .get-recommendations {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #d4af37, #b8941f);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1.1rem;
                cursor: pointer;
                margin-top: 20px;
            }
            
            @keyframes fillBar {
                0%, 100% { width: 0%; }
                50% { width: 100%; }
            }
            
            .note-bar {
                height: 4px;
                background: #d4af37;
                border-radius: 2px;
                width: 0%;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(quizModal);

        // Botão para abrir quiz
        const quizButton = document.createElement('button');
        quizButton.innerHTML = '<i class="fas fa-magic"></i> Encontrar Fragrância Perfeita';
        quizButton.className = 'quiz-trigger-btn';
        quizButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
        `;
        
        quizButton.addEventListener('click', () => {
            quizModal.style.display = 'block';
        });
        
        document.body.appendChild(quizButton);

        // Lógica do quiz
        document.querySelectorAll('.options button').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.closest('.question').dataset.question;
                const value = e.target.dataset.value;
                
                // Remover seleção anterior
                e.target.closest('.options').querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                e.target.classList.add('selected');
                preferences[question] = value;
            });
        });

        document.querySelector('.get-recommendations').addEventListener('click', () => {
            this.generateRecommendations(preferences);
            quizModal.style.display = 'none';
        });
    }

    generateRecommendations(preferences) {
        // Lógica de recomendação baseada nas preferências
        const recommendations = {
            'daily-light-spring': ['BP CK One', 'BP Chanel Chance', 'BP Dior J\'adore'],
            'special-intense-fall': ['BP Tom Ford Black Orchid', 'BP Creed Aventus', 'BP MFK Baccarat Rouge'],
            'romantic-moderate-summer': ['BP Chanel Coco Mademoiselle', 'BP YSL Black Opium', 'BP Viktor&Rolf Flowerbomb'],
            'business-bold-winter': ['BP Creed Green Irish Tweed', 'BP Xerjoff Naxos', 'BP Louis Vuitton Imagination']
        };

        const key = `${preferences.occasion}-${preferences.intensity}-${preferences.season}`;
        const recommendedPerfumes = recommendations[key] || ['BP Chanel No. 5', 'BP Creed Aventus', 'BP Tom Ford Oud Wood'];

        this.showRecommendations(recommendedPerfumes);
    }

    showRecommendations(perfumes) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        modal.innerHTML = `
            <h3 style="color: #d4af37; margin-bottom: 20px;">Suas Recomendações Personalizadas</h3>
            <div class="recommendations-list">
                ${perfumes.map(perfume => `
                    <div class="recommendation-item" style="padding: 15px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="color: #333; margin-bottom: 5px;">${perfume}</h4>
                        <p style="color: #666; margin: 0;">Perfeito para seu perfil!</p>
                        <button class="view-perfume-btn" data-perfume="${perfume}" style="margin-top: 10px; padding: 8px 15px; background: #d4af37; color: white; border: none; border-radius: 5px; cursor: pointer;">Ver Detalhes</button>
                    </div>
                `).join('')}
            </div>
            <button class="close-recommendations" style="width: 100%; padding: 15px; background: #333; color: white; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">Fechar</button>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-recommendations').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Animações de Luxo
    setupLuxuryAnimations() {
        // Efeito de brilho em elementos dourados
        const goldenElements = document.querySelectorAll('.stat-icon, .brand-logo');
        
        goldenElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'goldShine 1s ease-in-out';
            });
            
            element.addEventListener('animationend', () => {
                element.style.animation = '';
            });
        });

        // Adicionar animação de brilho
        const shineStyle = document.createElement('style');
        shineStyle.textContent = `
            @keyframes goldShine {
                0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
                50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4); }
            }
        `;
        document.head.appendChild(shineStyle);
    }

    // Linha do Tempo Interativa
    setupInteractiveTimeline() {
        const timelineSection = document.createElement('section');
        timelineSection.className = 'interactive-timeline';
        timelineSection.innerHTML = `
            <div class="container">
                <h2 class="text-center mb-5">Nossa Jornada de Luxo</h2>
                <div class="timeline">
                    <div class="timeline-item" data-year="2020">
                        <div class="timeline-content">
                            <h3>Fundação</h3>
                            <p>Início da nossa busca pela perfeição olfativa</p>
                        </div>
                    </div>
                    <div class="timeline-item" data-year="2022">
                        <div class="timeline-content">
                            <h3>Primeira Coleção</h3>
                           >Lançamento de 20 fragrâncias exclusivas</p>
                        </div>
                    </div>
                    <div class="timeline-item" data-year="2023">
                        <div class="timeline-content">
                            <h3>Expansão Global</h3>
                           >Presença em 15 países</p>
                        </div>
                    </div>
                    <div class="timeline-item" data-year="2024">
                        <div class="timeline-content">
                            <h3>Inovação</h3>
                            >100 perfumes premium disponíveis</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Estilos da timeline
        const timelineStyle = document.createElement('style');
        timelineStyle.textContent = `
            .interactive-timeline {
                padding: 80px 0;
                background: #f8f9fa;
            }
            
            .timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .timeline::before {
                content: '';
                position: absolute;
                left: 50%;
                top: 0;
                bottom: 0;
                width: 2px;
                background: #d4af37;
                transform: translateX(-50%);
            }
            
            .timeline-item {
                position: relative;
                margin-bottom: 50px;
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .timeline-item.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .timeline-item:nth-child(odd) .timeline-content {
                margin-right: 52%;
                text-align: right;
            }
            
            .timeline-item:nth-child(even) .timeline-content {
                margin-left: 52%;
            }
            
            .timeline-content {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                position: relative;
            }
            
            .timeline-item::before {
                content: attr(data-year);
                position: absolute;
                top: 20px;
                width: 40px;
                height: 40px;
                background: #d4af37;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 0.8rem;
            }
            
            .timeline-item:nth-child(odd)::before {
                right: -21px;
            }
            
            .timeline-item:nth-child(even)::before {
                left: -21px;
            }
        `;
        document.head.appendChild(timelineStyle);

        // Adicionar ao final da página
        document.body.insertBefore(timelineSection, document.body.lastElementChild);

        // Animar timeline ao scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }

    // AI de Match de Fragrâncias
    setupAIScentMatch() {
        const aiButton = document.createElement('button');
        aiButton.innerHTML = '<i class="fas fa-robot"></i> IA Scent Match';
        aiButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        `;

        aiButton.addEventListener('click', () => {
            this.startScentAI();
        });

        document.body.appendChild(aiButton);
    }

    startScentAI() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 500px;
            width: 90%;
        `;

        modal.innerHTML = `
            <h3 style="color: #667eea; margin-bottom: 20px;">🤖 IA Scent Match</h3>
            <div class="ai-interface">
                <div class="ai-status" style="text-align: center; padding: 20px;">
                    <div class="ai-thinking" style="font-size: 3rem; margin-bottom: 20px;">🧠</div>
                    <p style="color: #666;">Analisando suas preferências...</p>
                    <div class="progress-bar" style="background: #f0f0f0; height: 10px; border-radius: 5px; overflow: hidden; margin-top: 20px;">
                        <div class="progress-fill" style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; width: 0%; transition: width 3s ease;"></div>
                    </div>
                </div>
                <div class="ai-result" style="display: none;">
                    <h4 style="color: #333; margin-bottom: 15px;">Sua Assinatura Olfativa:</h4>
                    <div class="scent-profile" style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p><strong>Família Olfativa:</strong> <span id="olfactive-family">Oriental Especiaria</span></p>
                        <p><strong>Intensidade:</strong> <span id="intensity">Moderada a Intensa</span></p>
                        <p><strong>Personalidade:</strong> <span id="personality">Sofisticada e Misteriosa</span></p>
                    </div>
                    <h4 style="color: #333; margin-bottom: 15px;">Matches Perfeitos:</h4>
                    <div id="ai-matches"></div>
                </div>
            </div>
            <button class="close-ai" style="width: 100%; padding: 15px; background: #333; color: white; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">Fechar</button>
        `;

        document.body.appendChild(modal);

        // Simular processamento da IA
        setTimeout(() => {
            modal.querySelector('.ai-thinking').style.display = 'none';
            modal.querySelector('.ai-result').style.display = 'block';
            
            // Gerar resultados
            const profiles = [
                { family: 'Oriental Especiaria', intensity: 'Moderada a Intensa', personality: 'Sofisticada e Misteriosa' },
                { family: 'Floral Frutal', intensity: 'Leve a Moderada', personality: 'Romântica e Alegre' },
                { family: 'Woody Aromática', intensity: 'Intensa', personality: 'Elegante e Poderosa' }
            ];
            
            const profile = profiles[Math.floor(Math.random() * profiles.length)];
            document.getElementById('olfactive-family').textContent = profile.family;
            document.getElementById('intensity').textContent = profile.intensity;
            document.getElementById('personality').textContent = profile.personality;

            const matches = ['BP MFK Baccarat Rouge 540', 'BP Creed Aventus', 'BP Tom Ford Black Orchid'];
            document.getElementById('ai-matches').innerHTML = matches.map(match => `
                <div style="padding: 10px; background: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                    <strong>${match}</strong> - 98% de compatibilidade
                </div>
            `).join('');
        }, 3000);

        // Animação da barra de progresso
        setTimeout(() => {
            modal.querySelector('.progress-fill').style.width = '100%';
        }, 100);

        modal.querySelector('.close-ai').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Conteúdo Exclusivo para Membros
    setupExclusiveContent() {
        const vipBadge = document.createElement('div');
        vipBadge.innerHTML = '<i class="fas fa-crown"></i> VIP';
        vipBadge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #d4af37, #b8941f);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(212, 175, 55, 0.3);
            cursor: pointer;
            animation: pulse 2s infinite;
        `;

        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(pulseStyle);

        vipBadge.addEventListener('click', () => {
            this.showVIPContent();
        });

        document.body.appendChild(vipBadge);
    }

    showVIPContent() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            max-width: 600px;
            width: 90%;
            border: 2px solid #d4af37;
        `;

        modal.innerHTML = `
            <h3 style="color: #d4af37; margin-bottom: 20px;">👑 Área VIP Exclusiva</h3>
            <div class="vip-features">
                <div class="vip-feature" style="margin-bottom: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                    <h4 style="color: #d4af37;">🎁 Lançamentos Antecipados</h4>
                    <p>Acesso exclusivo às novas coleções 30 dias antes do lançamento oficial.</p>
                </div>
                <div class="vip-feature" style="margin-bottom: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                    <h4 style="color: #d4af37;">👨‍🎨 Perfume Personalizado</h4>
                    <p>Crie sua fragrância única com nossos perfumistas mestres.</p>
                </div>
                <div class="vip-feature" style="margin-bottom: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                    <h4 style="color: #d4af37;">🚀 Entrega Expressa Gratuita</h4>
                    <p>Entrega em 24h para todo o Brasil sem custo adicional.</p>
                </div>
                <div class="vip-feature" style="margin-bottom: 20px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                    <h4 style="color: #d4af37;">📞 Consultoria Particular</h4>
                    <p>Sessão individual de consultoria olfativa com nossos especialistas.</p>
                </div>
            </div>
            <button class="become-vip" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #d4af37, #b8941f); color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; margin-bottom: 15px;">Tornar-se Membro VIP</button>
            <button class="close-vip" style="width: 100%; padding: 15px; background: transparent; color: white; border: 1px solid #d4af37; border-radius: 8px; cursor: pointer;">Fechar</button>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.become-vip').addEventListener('click', () => {
            // Redirecionar para página de VIP
            window.location.href = '/vip';
        });

        modal.querySelector('.close-vip').addEventListener('click', () => {
            modal.remove();
        });
    }
}

// Inicializar experiência quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new LuxuryExperience();
});
