const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Review = require('../models/Review');
const { optionalAuthMiddleware } = require('../middleware/auth');

// Catálogo de inspirações (leve, focado em busca e filtros)
router.get('/inspiracoes', optionalAuthMiddleware, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 24,
            category,
            brand,
            fragrance_family,
            inspiration,
            search,
            sort = 'sales_count',
            order = 'DESC'
        } = req.query;

        let whereClause = { status: 'active' };
        let orderClause = [];

        if (category) whereClause.category = category;

        if (brand) {
            whereClause.brand = { [Product.sequelize.Sequelize.Op.like]: `%${brand}%` };
        }

        if (fragrance_family) whereClause.fragrance_family = fragrance_family;

        if (inspiration) {
            whereClause.inspiration = { [Product.sequelize.Sequelize.Op.like]: `%${inspiration}%` };
        }

        if (search) {
            whereClause[Product.sequelize.Sequelize.Op.or] = [
                { name: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { brand: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { inspiration: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { short_description: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } }
            ];
        }

        const validSortFields = ['created_at', 'sales_count', 'rating_average', 'sale_price', 'name'];
        const sortField = validSortFields.includes(sort) ? sort : 'sales_count';
        const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        orderClause.push([sortField, sortOrder]);

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: parseInt(limit),
            offset,
            attributes: [
                'id',
                'name',
                'slug',
                'brand',
                'category',
                'fragrance_family',
                'inspiration',
                'size_ml',
                'regular_price',
                'sale_price',
                'featured_image',
                'stock_quantity',
                'sales_count',
                'rating_average',
                'rating_count'
            ]
        });

        const brands = await Product.findAll({
            attributes: [[Product.sequelize.Sequelize.fn('DISTINCT', Product.sequelize.Sequelize.col('brand')), 'brand']],
            where: { status: 'active' },
            order: [['brand', 'ASC']]
        });

        const inspirations = await Product.findAll({
            attributes: [[Product.sequelize.Sequelize.fn('DISTINCT', Product.sequelize.Sequelize.col('inspiration')), 'inspiration']],
            where: {
                status: 'active',
                inspiration: { [Product.sequelize.Sequelize.Op.ne]: null }
            },
            order: [['inspiration', 'ASC']]
        });

        const families = await Product.findAll({
            attributes: [[Product.sequelize.Sequelize.fn('DISTINCT', Product.sequelize.Sequelize.col('fragrance_family')), 'fragrance_family']],
            where: {
                status: 'active',
                fragrance_family: { [Product.sequelize.Sequelize.Op.ne]: null }
            },
            order: [['fragrance_family', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.render('client/inspirations/index', {
            title: 'Catálogo de Inspirações - Bayrom & Hugo Parfums',
            description: 'Pesquise e filtre perfumes por inspiração, marca, família olfativa e categoria.',
            products,
            filterOptions: {
                brands: brands.map((b) => b.brand).filter(Boolean),
                inspirations: inspirations.map((i) => i.inspiration).filter(Boolean),
                families: families.map((f) => f.fragrance_family).filter(Boolean)
            },
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                hasNextPage: parseInt(page) < totalPages,
                hasPrevPage: parseInt(page) > 1,
                totalItems: count,
                itemsPerPage: parseInt(limit)
            },
            filters: {
                category,
                brand,
                fragrance_family,
                inspiration,
                search,
                sort,
                order
            }
        });
    } catch (error) {
        console.error('Erro no catálogo de inspirações:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o catálogo de inspirações');
        res.redirect('/products');
    }
});

// Listagem de produtos
router.get('/', optionalAuthMiddleware, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            category,
            brand,
            price_min,
            price_max,
            sort = 'created_at',
            order = 'DESC',
            search
        } = req.query;

        let whereClause = { status: 'active' };
        let orderClause = [];

        // Filtros
        if (category) {
            whereClause.category = category;
        }

        if (brand) {
            whereClause.brand = { [Product.sequelize.Sequelize.Op.like]: `%${brand}%` };
        }

        if (price_min || price_max) {
            whereClause.sale_price = {};
            if (price_min) whereClause.sale_price[Product.sequelize.Sequelize.Op.gte] = parseFloat(price_min);
            if (price_max) whereClause.sale_price[Product.sequelize.Sequelize.Op.lte] = parseFloat(price_max);
        }

        if (search) {
            whereClause[Product.sequelize.Sequelize.Op.or] = [
                { name: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { description: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { brand: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { inspiration: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } }
            ];
        }

        // Ordenação
        const validSortFields = ['name', 'created_at', 'sale_price', 'rating_average', 'sales_count'];
        const sortField = validSortFields.includes(sort) ? sort : 'created_at';
        const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        orderClause.push([sortField, sortOrder]);

        // Paginação
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: parseInt(limit),
            offset: offset,
            include: [{
                model: Review,
                as: 'reviews',
                attributes: ['rating'],
                required: false
            }]
        });

        // Calcular rating para cada produto
        products.forEach(product => {
            if (product.reviews && product.reviews.length > 0) {
                const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
                product.dataValues.averageRating = (totalRating / product.reviews.length).toFixed(1);
            } else {
                product.dataValues.averageRating = 0;
            }
        });

        // Buscar marcas e categorias para filtros
        const brands = await Product.findAll({
            attributes: [[Product.sequelize.Sequelize.fn('DISTINCT', Product.sequelize.Sequelize.col('brand')), 'brand']],
            where: { status: 'active' },
            order: [['brand', 'ASC']]
        });

        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        // Configurar paginação
        const totalPages = Math.ceil(count / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.render('client/products/list', {
            title: 'Produtos - Bayrom & Hugo Parfums',
            description: 'Navegue por nossa coleção de perfumes premium.',
            products,
            brands: brands.map(b => b.brand),
            categories,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                hasNextPage,
                hasPrevPage,
                totalItems: count,
                itemsPerPage: parseInt(limit)
            },
            filters: {
                category,
                brand,
                price_min,
                price_max,
                sort,
                order,
                search
            }
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os produtos');
        res.redirect('/');
    }
});

// Detalhes do produto
router.get('/:slug', optionalAuthMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({
            where: { 
                slug, 
                status: 'active' 
            },
            include: [{
                model: Review,
                as: 'reviews',
                include: [{
                    model: require('../models/User'),
                    as: 'user',
                    attributes: ['name']
                }],
                where: { is_approved: true },
                required: false
            }]
        });

        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/products');
        }

        // Incrementar visualizações
        await product.increment('view_count');

        // Produtos relacionados
        const relatedProducts = await Product.findAll({
            where: {
                id: { [Product.sequelize.Sequelize.Op.ne]: product.id },
                [Product.sequelize.Sequelize.Op.or]: [
                    { category: product.category },
                    { brand: product.brand },
                    { fragrance_family: product.fragrance_family }
                ],
                status: 'active'
            },
            limit: 8,
            order: [['sales_count', 'DESC']]
        });

        // Verificar se produto está nos favoritos
        let isInWishlist = false;
        if (req.user) {
            const Wishlist = require('../models/Wishlist');
            const wishlistItem = await Wishlist.findOne({
                where: {
                    user_id: req.user.id,
                    product_id: product.id
                }
            });
            isInWishlist = !!wishlistItem;
        }

        // Calcular estatísticas de avaliações
        const reviews = product.reviews || [];
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
            : 0;

        // Distribuição de ratings
        const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
            rating,
            count: reviews.filter(r => r.rating === rating).length,
            percentage: totalReviews > 0 
                ? Math.round((reviews.filter(r => r.rating === rating).length / totalReviews) * 100)
                : 0
        }));

        res.render('client/products/detail', {
            title: `${product.name} - Bayrom & Hugo Parfums`,
            description: product.short_description || product.description?.substring(0, 160),
            product,
            relatedProducts,
            isInWishlist,
            reviews,
            totalReviews,
            averageRating,
            ratingDistribution
        });
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o produto');
        res.redirect('/products');
    }
});

// Adicionar avaliação
router.post('/:slug/review', [
    require('../middleware/auth').clientMiddleware,
    require('express-validator').body('rating').isInt({ min: 1, max: 5 }).withMessage('Avaliação deve ser entre 1 e 5'),
    require('express-validator').body('comment').optional().isLength({ max: 1000 }).withMessage('Comentário muito longo')
], async (req, res) => {
    try {
        const { slug } = req.params;
        const { rating, title, comment } = req.body;

        const product = await Product.findOne({ where: { slug, status: 'active' } });
        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/products');
        }

        // Verificar se usuário já avaliou este produto
        const existingReview = await Review.findOne({
            where: {
                user_id: req.user.id,
                product_id: product.id
            }
        });

        if (existingReview) {
            req.flash('error_msg', 'Você já avaliou este produto');
            return res.redirect(`/products/${slug}`);
        }

        // Verificar se usuário comprou o produto (opcional)
        const Order = require('../models/Order');
        const OrderItem = require('../models/OrderItem');
        const hasPurchased = await OrderItem.findOne({
            include: [{
                model: Order,
                where: {
                    user_id: req.user.id,
                    status: 'delivered'
                }
            }],
            where: { product_id: product.id }
        });

        // Criar avaliação
        await Review.create({
            user_id: req.user.id,
            product_id: product.id,
            rating: parseInt(rating),
            title,
            comment,
            is_verified_purchase: !!hasPurchased,
            is_approved: true
        });

        // Atualizar rating do produto
        const allReviews = await Review.findAll({
            where: { 
                product_id: product.id,
                is_approved: true 
            }
        });

        const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / allReviews.length;

        await product.update({
            rating_average: avgRating.toFixed(2),
            rating_count: allReviews.length
        });

        req.flash('success_msg', 'Avaliação enviada com sucesso!');
        res.redirect(`/products/${slug}#reviews`);
    } catch (error) {
        console.error('Erro ao adicionar avaliação:', error);
        req.flash('error_msg', 'Ocorreu um erro ao enviar sua avaliação');
        res.redirect(`/products/${req.params.slug}`);
    }
});

// API para busca rápida de produtos
router.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.length < 2) {
            return res.json([]);
        }

        const products = await Product.findAll({
            where: {
                [Product.sequelize.Sequelize.Op.and]: [
                    { status: 'active' },
                    {
                        [Product.sequelize.Sequelize.Op.or]: [
                            { name: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } },
                            { brand: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } },
                            { inspiration: { [Product.sequelize.Sequelize.Op.like]: `%${q}%` } }
                        ]
                    }
                ]
            },
            attributes: ['id', 'name', 'slug', 'brand', 'featured_image', 'sale_price', 'regular_price'],
            limit: 10
        });

        res.json(products);
    } catch (error) {
        console.error('Erro na busca rápida:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
