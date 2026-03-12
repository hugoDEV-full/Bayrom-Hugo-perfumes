const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { optionalAuthMiddleware, authMiddleware } = require('../middleware/auth');

// Middleware para obter ou criar carrinho
const getCart = async (req, res, next) => {
    try {
        let cartItems = [];
        
        if (req.user) {
            // Usuário logado - buscar carrinho do banco
            cartItems = await Cart.findAll({
                where: { user_id: req.user.id },
                include: [{
                    model: Product,
                    as: 'product',
                    where: { status: 'active' }
                }]
            });
        } else {
            // Usuário não logado - usar sessão
            if (!req.session.cart) {
                req.session.cart = [];
            }
            
            // Converter carrinho da sessão para formato similar ao do banco
            const productIds = req.session.cart.map(item => item.product_id);
            if (productIds.length > 0) {
                const products = await Product.findAll({
                    where: {
                        id: productIds,
                        status: 'active'
                    }
                });
                
                cartItems = req.session.cart.map(item => {
                    const product = products.find(p => p.id === item.product_id);
                    return {
                        ...item,
                        product,
                        total_price: (item.quantity * item.unit_price).toFixed(2)
                    };
                }).filter(item => item.product); // Remover itens com produtos inexistentes
            }
        }
        
        req.cart = cartItems;
        res.locals.cart = cartItems;
        next();
    } catch (error) {
        console.error('Erro ao obter carrinho:', error);
        req.cart = [];
        res.locals.cart = [];
        next();
    }
};

// Aplicar middleware em todas as rotas
router.use(getCart);

// Página do carrinho
router.get('/', (req, res) => {
    try {
        // Calcular totais
        const subtotal = req.cart.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
        const shipping = subtotal > 250 ? 0 : (req.cart.length > 0 ? 15.90 : 0);
        const total = subtotal + shipping;

        res.render('client/cart/index', {
            title: 'Carrinho de Compras - Bayrom & Hugo Parfums',
            description: 'Revise os itens no seu carrinho de compras.',
            cartItems: req.cart,
            totals: {
                subtotal: subtotal.toFixed(2),
                shipping: shipping.toFixed(2),
                total: total.toFixed(2),
                freeShipping: subtotal >= 250
            }
        });
    } catch (error) {
        console.error('Erro ao exibir carrinho:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar seu carrinho');
        res.redirect('/products');
    }
});

// Adicionar produto ao carrinho
router.post('/add', async (req, res) => {
    try {
        const { product_id, quantity = 1 } = req.body;

        if (!product_id) {
            if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                return res.status(400).json({ error: 'Produto não informado' });
            }
            req.flash('error_msg', 'Produto não informado');
            return res.redirect('/products');
        }

        // Verificar produto
        const product = await Product.findByPk(product_id);
        if (!product || product.status !== 'active') {
            if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            req.flash('error_msg', 'Produto não encontrado');
            return res.redirect('/products');
        }

        // Verificar estoque
        if (!product.isInStock()) {
            if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                return res.status(400).json({ error: 'Produto fora de estoque' });
            }
            req.flash('error_msg', 'Produto fora de estoque');
            return res.redirect(`/products/${product.slug}`);
        }

        const quantityNum = parseInt(quantity);
        if (quantityNum <= 0 || quantityNum > 10) {
            if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                return res.status(400).json({ error: 'Quantidade inválida' });
            }
            req.flash('error_msg', 'Quantidade inválida');
            return res.redirect(`/products/${product.slug}`);
        }

        if (req.user) {
            // Usuário logado - salvar no banco
            const existingItem = await Cart.findOne({
                where: {
                    user_id: req.user.id,
                    product_id: product_id
                }
            });

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantityNum;
                if (newQuantity > product.stock_quantity && !product.allow_backorder) {
                    if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                        return res.status(400).json({ error: 'Quantidade indisponível em estoque' });
                    }
                    req.flash('error_msg', 'Quantidade indisponível em estoque');
                    return res.redirect(`/products/${product.slug}`);
                }
                
                await existingItem.update({ quantity: newQuantity });
            } else {
                await Cart.create({
                    user_id: req.user.id,
                    product_id: product_id,
                    quantity: quantityNum,
                    unit_price: product.getDisplayPrice()
                });
            }
        } else {
            // Usuário não logado - salvar na sessão
            if (!req.session.cart) {
                req.session.cart = [];
            }

            const existingItemIndex = req.session.cart.findIndex(
                item => item.product_id === parseInt(product_id)
            );

            if (existingItemIndex >= 0) {
                const newQuantity = req.session.cart[existingItemIndex].quantity + quantityNum;
                if (newQuantity > product.stock_quantity && !product.allow_backorder) {
                    if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
                        return res.status(400).json({ error: 'Quantidade indisponível em estoque' });
                    }
                    req.flash('error_msg', 'Quantidade indisponível em estoque');
                    return res.redirect(`/products/${product.slug}`);
                }
                
                req.session.cart[existingItemIndex].quantity = newQuantity;
                req.session.cart[existingItemIndex].total_price = 
                    newQuantity * req.session.cart[existingItemIndex].unit_price;
            } else {
                req.session.cart.push({
                    product_id: parseInt(product_id),
                    quantity: quantityNum,
                    unit_price: product.getDisplayPrice(),
                    total_price: quantityNum * product.getDisplayPrice(),
                    added_at: new Date()
                });
            }
        }

        if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
            const cartCount = req.cart.reduce((sum, item) => sum + item.quantity, 0);
            return res.json({ 
                success: true, 
                message: 'Produto adicionado ao carrinho!',
                cartCount
            });
        }

        req.flash('success_msg', 'Produto adicionado ao carrinho!');
        res.redirect('/cart');
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        req.flash('error_msg', 'Ocorreu um erro ao adicionar o produto ao carrinho');
        res.redirect('/products');
    }
});

// Atualizar quantidade do item
router.put('/update/:item_id', authMiddleware, async (req, res) => {
    try {
        const { item_id } = req.params;
        const { quantity } = req.body;

        const quantityNum = parseInt(quantity);
        if (quantityNum <= 0 || quantityNum > 10) {
            return res.status(400).json({ error: 'Quantidade inválida' });
        }

        let cartItem;

        if (req.user) {
            // Usuário logado - atualizar no banco
            cartItem = await Cart.findOne({
                where: {
                    id: item_id,
                    user_id: req.user.id
                },
                include: [{
                    model: Product,
                    as: 'product'
                }]
            });

            if (!cartItem) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }

            // Verificar estoque
            if (quantityNum > cartItem.product.stock_quantity && !cartItem.product.allow_backorder) {
                return res.status(400).json({ error: 'Quantidade indisponível em estoque' });
            }

            await cartItem.update({ quantity: quantityNum });
        } else {
            // Usuário não logado - atualizar na sessão
            if (!req.session.cart) {
                return res.status(404).json({ error: 'Carrinho não encontrado' });
            }

            const itemIndex = req.session.cart.findIndex(
                item => item.product_id === parseInt(item_id)
            );

            if (itemIndex === -1) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }

            // Verificar estoque
            const product = await Product.findByPk(req.session.cart[itemIndex].product_id);
            if (quantityNum > product.stock_quantity && !product.allow_backorder) {
                return res.status(400).json({ error: 'Quantidade indisponível em estoque' });
            }

            req.session.cart[itemIndex].quantity = quantityNum;
            req.session.cart[itemIndex].total_price = 
                quantityNum * req.session.cart[itemIndex].unit_price;
            
            cartItem = req.session.cart[itemIndex];
        }

        res.json({
            success: true,
            itemTotal: cartItem.total_price.toFixed(2),
            message: 'Quantidade atualizada'
        });
    } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Remover item do carrinho
router.delete('/remove/:item_id', authMiddleware, async (req, res) => {
    try {
        const { item_id } = req.params;

        if (req.user) {
            // Usuário logado - remover do banco
            const deleted = await Cart.destroy({
                where: {
                    id: item_id,
                    user_id: req.user.id
                }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }
        } else {
            // Usuário não logado - remover da sessão
            if (!req.session.cart) {
                return res.status(404).json({ error: 'Carrinho não encontrado' });
            }

            const itemIndex = req.session.cart.findIndex(
                item => item.product_id === parseInt(item_id)
            );

            if (itemIndex === -1) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }

            req.session.cart.splice(itemIndex, 1);
        }

        res.json({
            success: true,
            message: 'Item removido do carrinho'
        });
    } catch (error) {
        console.error('Erro ao remover item:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Limpar carrinho
router.delete('/clear', authMiddleware, async (req, res) => {
    try {
        if (req.user) {
            await Cart.destroy({
                where: { user_id: req.user.id }
            });
        } else {
            req.session.cart = [];
        }

        res.json({
            success: true,
            message: 'Carrinho limpo com sucesso'
        });
    } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Sincronizar carrinho da sessão para o banco quando usuário faz login
router.post('/sync', authMiddleware, async (req, res) => {
    try {
        if (req.session.cart && req.session.cart.length > 0) {
            for (const sessionItem of req.session.cart) {
                const existingItem = await Cart.findOne({
                    where: {
                        user_id: req.user.id,
                        product_id: sessionItem.product_id
                    }
                });

                if (existingItem) {
                    await existingItem.update({
                        quantity: existingItem.quantity + sessionItem.quantity
                    });
                } else {
                    await Cart.create({
                        user_id: req.user.id,
                        product_id: sessionItem.product_id,
                        quantity: sessionItem.quantity,
                        unit_price: sessionItem.unit_price
                    });
                }
            }

            // Limpar carrinho da sessão
            req.session.cart = [];
        }

        res.json({
            success: true,
            message: 'Carrinho sincronizado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao sincronizar carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
