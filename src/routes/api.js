const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Cart = require('../models/Cart');
const { optionalAuthMiddleware } = require('../middleware/auth');

// API Routes - todas retornam JSON

// Busca rápida de produtos
router.get('/products/search', async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        
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
            limit: parseInt(limit),
            order: [['sales_count', 'DESC']]
        });

        res.json(products);
    } catch (error) {
        console.error('Erro na busca de produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Lista de categorias
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { is_active: true },
            order: [['sort_order', 'ASC'], ['name', 'ASC']],
            attributes: ['id', 'name', 'slug', 'icon', 'description']
        });

        res.json(categories);
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Lista de marcas
router.get('/brands', async (req, res) => {
    try {
        const brands = await Product.findAll({
            attributes: [[Product.sequelize.Sequelize.fn('DISTINCT', Product.sequelize.Sequelize.col('brand')), 'brand']],
            where: { status: 'active' },
            order: [['brand', 'ASC']]
        });

        res.json(brands.map(b => b.brand));
    } catch (error) {
        console.error('Erro ao carregar marcas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Detalhes do produto
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByPk(id, {
            attributes: ['id', 'name', 'slug', 'brand', 'description', 'short_description', 
                        'featured_image', 'images', 'regular_price', 'sale_price', 'stock_quantity',
                        'size_ml', 'category', 'fragrance_family', 'rating_average', 'rating_count']
        });

        if (!product || product.status !== 'active') {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Contagem de itens no carrinho
router.get('/cart/count', optionalAuthMiddleware, async (req, res) => {
    try {
        let count = 0;
        
        if (req.user) {
            // Usuário logado
            const cartItems = await Cart.findAll({
                where: { user_id: req.user.id }
            });
            count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            // Usuário não logado - usar sessão
            if (req.session.cart) {
                count = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
            }
        }

        res.json({ count });
    } catch (error) {
        console.error('Erro ao contar itens do carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Newsletter signup
router.post('/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        // Aqui você implementaria a lógica de newsletter
        // Por enquanto, apenas simulamos sucesso
        
        res.json({ 
            success: true, 
            message: 'Email cadastrado com sucesso!' 
        });
    } catch (error) {
        console.error('Erro ao cadastrar newsletter:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Verificação de CEP
router.get('/cep/:cep', async (req, res) => {
    try {
        const { cep } = req.params;
        const cleanCep = cep.replace(/\D/g, '');
        
        if (cleanCep.length !== 8) {
            return res.status(400).json({ error: 'CEP inválido' });
        }

        // Usar uma API de CEP (ex: ViaCEP)
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        res.json({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            postal_code: data.cep
        });
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        res.status(500).json({ error: 'Erro ao consultar CEP' });
    }
});

// Cálculo de frete
router.post('/shipping/calculate', async (req, res) => {
    try {
        const { postal_code, items } = req.body;
        
        if (!postal_code || !items || items.length === 0) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        // Calcular peso e dimensões totais
        let totalWeight = 0;
        let totalValue = 0;
        
        for (const item of items) {
            const product = await Product.findByPk(item.product_id);
            if (product) {
                totalWeight += (product.weight || 100) * item.quantity;
                totalValue += product.getDisplayPrice() * item.quantity;
            }
        }

        // Simular cálculo de frete (substituir com API real dos Correios)
        const shippingOptions = [
            {
                method: 'pac',
                name: 'PAC',
                price: totalValue > 250 ? 0 : 15.90,
                delivery_days: 7,
                delivery_time: '7 dias úteis'
            },
            {
                method: 'sedex',
                name: 'SEDEX',
                price: totalValue > 250 ? 0 : 25.90,
                delivery_days: 3,
                delivery_time: '3 dias úteis'
            }
        ];

        res.json({
            postal_code,
            total_weight: totalWeight,
            shipping_options
        });
    } catch (error) {
        console.error('Erro ao calcular frete:', error);
        res.status(500).json({ error: 'Erro ao calcular frete' });
    }
});

// Aplicar cupom de desconto
router.post('/coupon/validate', async (req, res) => {
    try {
        const { code, subtotal } = req.body;
        
        if (!code || !subtotal) {
            return res.status(400).json({ error: 'Código ou subtotal não informados' });
        }

        // Aqui você implementaria a validação real de cupons
        // Por enquanto, simulamos alguns cupons
        
        const coupons = {
            'NOVO10': { type: 'percentage', value: 10, min_amount: 100 },
            'FRETEGRATIS': { type: 'shipping', value: 0, min_amount: 200 },
            'PROMO20': { type: 'percentage', value: 20, min_amount: 300 }
        };

        const coupon = coupons[code.toUpperCase()];
        
        if (!coupon) {
            return res.status(404).json({ error: 'Cupom inválido' });
        }

        if (coupon.min_amount && parseFloat(subtotal) < coupon.min_amount) {
            return res.status(400).json({ 
                error: `Compra mínima de R$ ${coupon.min_amount.toFixed(2)} para este cupom` 
            });
        }

        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = (parseFloat(subtotal) * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
            discount = coupon.value;
        }

        res.json({
            valid: true,
            coupon: {
                code: code.toUpperCase(),
                type: coupon.type,
                value: coupon.value,
                discount: discount.toFixed(2)
            }
        });
    } catch (error) {
        console.error('Erro ao validar cupom:', error);
        res.status(500).json({ error: 'Erro ao validar cupom' });
    }
});

// Estatísticas do site (pública)
router.get('/stats', async (req, res) => {
    try {
        const totalProducts = await Product.count({ where: { status: 'active' } });
        const totalCategories = await Category.count({ where: { is_active: true } });
        
        // Produtos em destaque
        const featuredProducts = await Product.count({
            where: { is_featured: true, status: 'active' }
        });

        // Produtos em promoção
        const saleProducts = await Product.count({
            where: { 
                sale_price: { [Product.sequelize.Sequelize.Op.ne]: null },
                status: 'active' 
            }
        });

        res.json({
            total_products: totalProducts,
            total_categories: totalCategories,
            featured_products: featuredProducts,
            sale_products: saleProducts
        });
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Health check para Railway
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
    });
});

module.exports = router;
