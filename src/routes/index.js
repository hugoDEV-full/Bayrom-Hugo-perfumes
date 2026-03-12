const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Página de demonstração de materiais preciosos
router.get('/materiais-preciosos', (req, res) => {
    res.render('client/materials-demo', {
        title: 'Materiais Preciosos - Bayrom & Hugo Parfums',
        description: 'Descubra a conexão entre perfumes e gemas raras. Ouço, diamantes, rubis, esmeraldas e muito mais.'
    });
});

// Página inicial
router.get('/', async (req, res) => {
    try {
        // Produtos em destaque
        const featuredProducts = await Product.findAll({
            where: { 
                is_featured: true, 
                status: 'active' 
            },
            limit: 8,
            order: [['created_at', 'DESC']]
        });

        // Produtos mais vendidos
        const bestSellers = await Product.findAll({
            where: { 
                status: 'active' 
            },
            order: [['sales_count', 'DESC']],
            limit: 8
        });

        // Categorias
        const categories = await Category.findAll({
            where: { 
                is_active: true,
                parent_id: null 
            },
            order: [['sort_order', 'ASC']]
        });

        // Produtos em oferta
        const saleProducts = await Product.findAll({
            where: { 
                status: 'active',
                sale_price: { [Product.sequelize.Sequelize.Op.ne]: null }
            },
            limit: 8,
            order: [['updated_at', 'DESC']]
        });

        res.render('client/home', {
            title: 'Bayrom & Hugo Parfums - Perfumes Premium',
            description: 'Descubra os melhores perfumes inspirados nas grandes marcas. Qualidade excepcional com preços imbatíveis.',
            featuredProducts,
            bestSellers,
            saleProducts,
            categories
        });
    } catch (error) {
        console.error('Erro na página inicial:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar a página inicial');
        res.render('client/home', {
            title: 'Bayrom & Hugo Parfums',
            featuredProducts: [],
            bestSellers: [],
            saleProducts: [],
            categories: []
        });
    }
});

// Página de enciclopédia de perfumes
router.get('/encyclopedia', (req, res) => {
    res.render('client/encyclopedia', {
        title: 'Enciclopédia de Perfumes - Bayrom & Hugo Parfums',
        description: 'Explore nossa enciclopédia completa de perfumes com notas olfativas, informações detalhadas e busca de inspirações.',
        keywords: 'enciclopedia perfumes, notas olfativas, fragrâncias, perfume guide, fragrantica'
    });
});

// Página sobre nós
router.get('/sobre-nos', (req, res) => {
    res.render('client/about', {
        title: 'Sobre Nós - Bayrom & Hugo Parfums',
        description: 'Conheça a história da Bayrom & Hugo Parfums e nossa paixão por fragrâncias excepcionais.'
    });
});

// Página de contato
router.get('/contato', (req, res) => {
    res.render('client/contact', {
        title: 'Contato - Bayrom & Hugo Parfums',
        description: 'Entre em contato conosco. Estamos sempre prontos para ajudar você a encontrar a fragrância perfeita.'
    });
});

// Processar formulário de contato
router.post('/contato', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validação básica
        if (!name || !email || !message) {
            req.flash('error_msg', 'Por favor, preencha todos os campos obrigatórios');
            return res.redirect('/contato');
        }

        // Aqui você implementaria o envio de email
        // await sendContactEmail({ name, email, subject, message });
        
        req.flash('success_msg', 'Mensagem enviada com sucesso! Responderemos em breve.');
        res.redirect('/contato');
    } catch (error) {
        console.error('Erro ao enviar contato:', error);
        req.flash('error_msg', 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        res.redirect('/contato');
    }
});

// Página de políticas de privacidade
router.get('/politica-de-privacidade', (req, res) => {
    res.render('client/privacy', {
        title: 'Política de Privacidade - Bayrom & Hugo Parfums',
        description: 'Nossa política de privacidade e proteção de dados.'
    });
});

// Página de termos e condições
router.get('/termos-e-condicoes', (req, res) => {
    res.render('client/terms', {
        title: 'Termos e Condições - Bayrom & Hugo Parfums',
        description: 'Termos de uso e condições de compra.'
    });
});

// Página de política de troca
router.get('/politica-de-troca', (req, res) => {
    res.render('client/return-policy', {
        title: 'Política de Troca - Bayrom & Hugo Parfums',
        description: 'Nossa política de troca e devolução de produtos.'
    });
});

// Página de como comprar
router.get('/como-comprar', (req, res) => {
    res.render('client/how-to-buy', {
        title: 'Como Comprar - Bayrom & Hugo Parfums',
        description: 'Aprenda como comprar em nossa loja de forma segura e fácil.'
    });
});

// Página de frete e entrega
router.get('/frete-e-entrega', (req, res) => {
    res.render('client/shipping', {
        title: 'Frete e Entrega - Bayrom & Hugo Parfums',
        description: 'Informações sobre frete, prazos e métodos de entrega.'
    });
});

// Página de pagamento
router.get('/formas-de-pagamento', (req, res) => {
    res.render('client/payment', {
        title: 'Formas de Pagamento - Bayrom & Hugo Parfums',
        description: 'Conheça todas as formas de pagamento aceitas.'
    });
});

// Busca de produtos
router.get('/buscar', async (req, res) => {
    try {
        const { q, category, price_min, price_max, sort = 'relevance' } = req.query;
        
        let whereClause = { status: 'active' };
        let orderClause = [];

        // Filtro de busca
        if (q) {
            whereClause[Product.sequelize.Sequelize.Op.or] = [
                { name: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } },
                { description: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } },
                { brand: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } },
                { inspiration: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } }
            ];
        }

        // Filtro de categoria
        if (category) {
            whereClause.category = category;
        }

        // Filtro de preço
        if (price_min || price_max) {
            whereClause.sale_price = {};
            if (price_min) whereClause.sale_price[Product.sequelize.Sequelize.Op.gte] = parseFloat(price_min);
            if (price_max) whereClause.sale_price[Product.sequelize.Sequelize.Op.lte] = parseFloat(price_max);
        }

        // Ordenação
        switch (sort) {
            case 'price-low':
                orderClause.push(['sale_price', 'ASC']);
                break;
            case 'price-high':
                orderClause.push(['sale_price', 'DESC']);
                break;
            case 'newest':
                orderClause.push(['created_at', 'DESC']);
                break;
            case 'bestselling':
                orderClause.push(['sales_count', 'DESC']);
                break;
            case 'rating':
                orderClause.push(['rating_average', 'DESC']);
                break;
            default:
                orderClause.push(['created_at', 'DESC']);
        }

        const products = await Product.findAll({
            where: whereClause,
            order: orderClause,
            limit: 20
        });

        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        res.render('client/search', {
            title: q ? `Resultados para "${q}"` : 'Buscar Produtos',
            description: 'Encontre os melhores perfumes em nossa loja.',
            products,
            categories,
            searchQuery: q,
            filters: { category, price_min, price_max, sort }
        });
    } catch (error) {
        console.error('Erro na busca:', error);
        req.flash('error_msg', 'Ocorreu um erro ao buscar produtos');
        res.redirect('/');
    }
});

// Página de produtos
router.get('/products', async (req, res) => {
    try {
        const { category, brand, sort = 'newest' } = req.query;
        
        let whereClause = { status: 'active' };
        let orderClause = [];

        // Filtros
        if (category) {
            whereClause.category = category;
        }
        
        if (brand) {
            whereClause.brand = { [Product.sequelize.Sequelize.Op.like]: `%${brand}%` };
        }

        // Ordenação
        switch (sort) {
            case 'price-low':
                orderClause.push(['sale_price', 'ASC']);
                break;
            case 'price-high':
                orderClause.push(['sale_price', 'DESC']);
                break;
            case 'newest':
                orderClause.push(['created_at', 'DESC']);
                break;
            case 'bestselling':
                orderClause.push(['sales_count', 'DESC']);
                break;
            case 'rating':
                orderClause.push(['rating_average', 'DESC']);
                break;
            default:
                orderClause.push(['created_at', 'DESC']);
        }

        const products = await Product.findAll({
            where: whereClause,
            order: orderClause,
            limit: 20
        });

        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        res.render('client/products/list', {
            title: 'Produtos - Bayrom & Hugo Parfums',
            description: 'Conheça nossa coleção completa de perfumes premium.',
            products,
            categories,
            filters: { category, brand, sort }
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os produtos');
        res.redirect('/');
    }
});

// Página de detalhes do produto
router.get('/products/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { 
                slug: req.params.slug,
                status: 'active' 
            }
        });

        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/products');
        }

        // Produtos relacionados
        const relatedProducts = await Product.findAll({
            where: { 
                category: product.category,
                status: 'active',
                id: { [Product.sequelize.Sequelize.Op.ne]: product.id }
            },
            limit: 4,
            order: [['sales_count', 'DESC']]
        });

        res.render('client/products/detail', {
            title: `${product.name} - Bayrom & Hugo Parfums`,
            description: product.description,
            product,
            relatedProducts
        });
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o produto');
        res.redirect('/products');
    }
});

module.exports = router;
