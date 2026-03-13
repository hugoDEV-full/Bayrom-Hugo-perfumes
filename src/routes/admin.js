const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User');
const Category = require('../models/Category');

// Middleware para garantir acesso apenas a administradores
router.use(authMiddleware);
router.use(adminMiddleware);

function normalizeProductPayload(body) {
    const productData = { ...body };

    const numberFields = ['size_ml', 'stock_quantity', 'min_stock', 'regular_price', 'sale_price', 'cost_price', 'weight'];
    for (const field of numberFields) {
        if (productData[field] === '' || typeof productData[field] === 'undefined') continue;
        const value = Number(productData[field]);
        if (!Number.isNaN(value)) productData[field] = value;
    }

    const boolFields = ['is_featured', 'is_digital', 'requires_shipping', 'track_quantity', 'allow_backorder'];
    for (const field of boolFields) {
        productData[field] = productData[field] === 'true' || productData[field] === 'on' || productData[field] === true;
    }

    const jsonArrayFields = ['tags', 'occasion', 'images'];
    for (const field of jsonArrayFields) {
        if (typeof productData[field] !== 'string') continue;
        const raw = productData[field].trim();
        if (!raw) continue;
        try {
            const parsed = JSON.parse(raw);
            productData[field] = parsed;
        } catch {
            productData[field] = raw
                .split(/\r?\n|,/)
                .map((s) => s.trim())
                .filter(Boolean);
        }
    }

    if (typeof productData.notes === 'string') {
        const raw = productData.notes.trim();
        if (raw) {
            try {
                productData.notes = JSON.parse(raw);
            } catch {
                productData.notes = null;
            }
        }
    }

    if (typeof productData.status === 'undefined' || productData.status === '') {
        productData.status = 'active';
    }

    return productData;
}

// Dashboard
router.get('/', async (req, res) => {
    try {
        // Estatísticas gerais
        const stats = {
            totalOrders: await Order.count(),
            totalRevenue: await Order.sum('total_amount', { where: { payment_status: 'paid' } }),
            totalUsers: await User.count({ where: { role: 'client' } }),
            totalProducts: await Product.count({ where: { status: 'active' } })
        };

        // Pedidos recentes
        const recentOrders = await Order.findAll({
            limit: 10,
            order: [['created_at', 'DESC']],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        });

        // Produtos mais vendidos
        const topProducts = await Product.findAll({
            where: { status: 'active' },
            order: [['sales_count', 'DESC']],
            limit: 5,
            attributes: ['id', 'name', 'sales_count', 'regular_price', 'sale_price']
        });

        // Pedidos por status
        const ordersByStatus = await Order.findAll({
            attributes: [
                'status',
                [Order.sequelize.Sequelize.fn('COUNT', Order.sequelize.Sequelize.col('id')), 'count']
            ],
            group: ['status']
        });

        // Receita dos últimos 30 dias
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentRevenue = await Order.sum('total_amount', {
            where: {
                payment_status: 'paid',
                created_at: { [Order.sequelize.Sequelize.Op.gte]: thirtyDaysAgo }
            }
        });

        res.render('admin/dashboard', {
            title: 'Dashboard - Admin',
            stats,
            recentOrders,
            topProducts,
            ordersByStatus,
            recentRevenue: recentRevenue || 0
        });
    } catch (error) {
        console.error('Erro no dashboard:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o dashboard');
        res.redirect('/admin');
    }
});

// Gestão de Produtos
router.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, category, status } = req.query;
        
        let whereClause = {};
        
        if (search) {
            whereClause[Product.sequelize.Sequelize.Op.or] = [
                { name: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { sku: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { brand: { [Product.sequelize.Sequelize.Op.like]: `%${search}%` } }
            ];
        }
        
        if (category) {
            whereClause.category = category;
        }
        
        if (status) {
            whereClause.status = status;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['created_at', 'DESC']]
        });

        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        res.render('admin/products/index', {
            title: 'Produtos - Admin',
            products,
            categories,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalItems: count,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1
            },
            filters: { search, category, status }
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os produtos');
        res.redirect('/admin');
    }
});

// Formulário de criação de produto
router.get('/products/new', async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        res.render('admin/products/form', {
            title: 'Novo Produto - Admin',
            product: {},
            categories,
            action: 'create'
        });
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o formulário');
        res.redirect('/admin/products');
    }
});

// Criar produto
router.post('/products', async (req, res) => {
    try {
        const productData = normalizeProductPayload(req.body);
        
        // Validações básicas
        if (!productData.name || !productData.sku || !productData.regular_price) {
            req.flash('error_msg', 'Preencha todos os campos obrigatórios');
            return res.redirect('/admin/products/new');
        }

        await Product.create(productData);
        
        req.flash('success_msg', 'Produto criado com sucesso!');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        req.flash('error_msg', 'Ocorreu um erro ao criar o produto');
        res.redirect('/admin/products/new');
    }
});

// Editar produto
router.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/admin/products');
        }

        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['name', 'ASC']]
        });

        res.render('admin/products/form', {
            title: 'Editar Produto - Admin',
            product,
            categories,
            action: 'edit'
        });
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o produto');
        res.redirect('/admin/products');
    }
});

// Atualizar produto
router.post('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/admin/products');
        }

        const productData = normalizeProductPayload(req.body);
        await product.update(productData);
        
        req.flash('success_msg', 'Produto atualizado com sucesso!');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        req.flash('error_msg', 'Ocorreu um erro ao atualizar o produto');
        res.redirect(`/admin/products/${req.params.id}/edit`);
    }
});

// Desativar produto (soft delete)
router.post('/products/:id/deactivate', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/admin/products');
        }

        await product.update({ status: 'inactive' });
        
        req.flash('success_msg', 'Produto desativado com sucesso!');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Erro ao desativar produto:', error);
        req.flash('error_msg', 'Erro ao desativar produto');
        res.redirect('/admin/products');
    }
});

// Reativar produto
router.post('/products/:id/activate', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/admin/products');
        }

        await product.update({ status: 'active' });

        req.flash('success_msg', 'Produto ativado com sucesso!');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Erro ao ativar produto:', error);
        req.flash('error_msg', 'Erro ao ativar produto');
        res.redirect('/admin/products');
    }
});

// Gestão de Pedidos
router.get('/orders', async (req, res) => {
    try {
        const { page = 1, limit = 20, status, payment_status } = req.query;
        
        let whereClause = {};
        
        if (status) {
            whereClause.status = status;
        }
        
        if (payment_status) {
            whereClause.payment_status = payment_status;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows: orders } = await Order.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['created_at', 'DESC']],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        });

        res.render('admin/orders/index', {
            title: 'Pedidos - Admin',
            orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalItems: count,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1
            },
            filters: { status, payment_status }
        });
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os pedidos');
        res.redirect('/admin');
    }
});

// Detalhes do pedido
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                },
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: require('../models/Address'),
                    as: 'shippingAddress'
                }
            ]
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/admin/orders');
        }

        res.render('admin/orders/detail', {
            title: `Pedido #${order.order_number} - Admin`,
            order
        });
    } catch (error) {
        console.error('Erro ao carregar pedido:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o pedido');
        res.redirect('/admin/orders');
    }
});

// Atualizar status do pedido
router.post('/orders/:id/status', async (req, res) => {
    try {
        const { status, tracking_code, notes } = req.body;
        
        const order = await Order.findByPk(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        const updateData = { status };
        
        if (tracking_code) {
            updateData.tracking_code = tracking_code;
            updateData.tracking_url = `https://www.linkcorreios.com.br/?id=${tracking_code}`;
        }
        
        if (notes) {
            updateData.internal_notes = notes;
        }

        await order.update(updateData);
        
        // Registrar no histórico
        const OrderStatusHistory = require('../models/OrderStatusHistory');
        await OrderStatusHistory.create({
            order_id: order.id,
            status,
            comments: notes,
            created_by: req.user.id
        });

        res.json({ success: true, message: 'Status atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
});

// Gestão de Usuários
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, role, status } = req.query;
        
        let whereClause = { role: 'client' };
        
        if (search) {
            whereClause[User.sequelize.Sequelize.Op.or] = [
                { name: { [User.sequelize.Sequelize.Op.like]: `%${search}%` } },
                { email: { [User.sequelize.Sequelize.Op.like]: `%${search}%` } }
            ];
        }
        
        if (status) {
            whereClause.status = status;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['created_at', 'DESC']]
        });

        res.render('admin/users/index', {
            title: 'Usuários - Admin',
            users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalItems: count,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1
            },
            filters: { search, role, status }
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os usuários');
        res.redirect('/admin');
    }
});

// Gestão de Categorias
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['sort_order', 'ASC'], ['name', 'ASC']]
        });

        res.render('admin/categories/index', {
            title: 'Categorias - Admin',
            categories
        });
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar as categorias');
        res.redirect('/admin');
    }
});

// Relatórios
router.get('/reports', (req, res) => {
    res.render('admin/reports/index', {
        title: 'Relatórios - Admin'
    });
});

// Configurações
router.get('/settings', (req, res) => {
    res.render('admin/settings/index', {
        title: 'Configurações - Admin'
    });
});

module.exports = router;
