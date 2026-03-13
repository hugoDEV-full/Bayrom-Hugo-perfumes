require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar URL base para Railway
const BASE_URL = process.env.RAILWAY_URL?.replace(/\/$/, '') || process.env.BASE_URL || 'http://localhost:3000';
process.env.BASE_URL = BASE_URL;

console.log('🚀 Iniciando servidor...');
console.log(`📍 URL Base: ${BASE_URL}`);
console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);

// Configuração de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://js.stripe.com", "https://sdk.mercadopago.com"],
            fontSrc: ["'self'", "data:", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.stripe.com", "https://api.mercadopago.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"]
        }
    }
}));

// Compressão de resposta
app.use(compression());

// Endpoint de healthcheck para Railway
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por IP
});
app.use('/api/', limiter);

// Logs (reduzir custo/ruído em produção)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev', { stream: { write: message => console.log(message.trim()) } }));
}

// CORS
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'bayrom-hugo-perfumes-secret-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Flash messages
app.use(flash());

// Arquivos estáticos
const staticOptions = process.env.NODE_ENV === 'production'
    ? { maxAge: '7d', etag: true }
    : undefined;

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), staticOptions));
app.use(express.static(path.join(__dirname, 'public'), staticOptions));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variáveis globais para templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    res.locals.cart = req.session.cart || [];
    next();
});

// Middleware de produtos mock para teste (descomentar para usar sem banco)
// const mockProductsMiddleware = require('./test-products');
// app.use(mockProductsMiddleware);

// Importação de rotas
const indexRoutes = require('./src/routes/index');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/cart');
const checkoutRoutes = require('./src/routes/checkout');
const orderRoutes = require('./src/routes/orders');
const adminRoutes = require('./src/routes/admin');
const apiRoutes = require('./src/routes/api');

// Uso das rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Tratamento de erros 404
app.use((req, res, next) => {
    res.status(404).render('errors/404', {
        title: 'Página não encontrada',
        description: 'A página que você procura não foi encontrada.'
    });
});

// Tratamento de erros 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', {
        title: 'Erro do servidor',
        description: 'Ocorreu um erro interno no servidor.'
    });
});

// Inicialização do servidor
async function startServer() {
    try {
        // Em produção (Railway) evite rodar sync/seed a cada boot (custo/tempo).
        // A criação do schema deve acontecer no deploy via postinstall.
        const shouldSetupDb =
            process.env.NODE_ENV !== 'production' ||
            process.env.RUN_DB_SETUP === 'true';

        if (shouldSetupDb) {
            console.log('🔄 Configurando banco de dados...');
            const buildDatabase = require('./build-database');
            await buildDatabase();
            console.log('✅ Banco de dados configurado!');
        }
        
        // Iniciar servidor
        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor Bayrom & Hugo Parfums rodando na porta ${PORT}`);
            console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
            console.log(`📍 URL: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
            console.log(`🗄️  Banco: ${process.env.DATABASE_URL ? 'MySQL' : 'SQLite'}`);
        });

        return server;
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
