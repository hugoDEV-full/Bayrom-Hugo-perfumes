const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Address = require('../models/Address');
const { authMiddleware } = require('../middleware/auth');

// Middleware para verificar autenticação em todas as rotas
router.use(authMiddleware);

// Listagem de pedidos do usuário
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'slug', 'featured_image']
                    }]
                },
                {
                    model: Address,
                    as: 'shippingAddress',
                    attributes: ['recipient_name', 'street', 'number', 'neighborhood', 'city', 'state', 'postal_code']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.render('client/orders/index', {
            title: 'Meus Pedidos - Bayrom & Hugo Parfums',
            description: 'Acompanhe seus pedidos e histórico de compras.',
            orders
        });
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar seus pedidos');
        res.redirect('/account/profile');
    }
});

// Detalhes do pedido
router.get('/:orderNumber', async (req, res) => {
    try {
        const { orderNumber } = req.params;

        const order = await Order.findOne({
            where: { 
                order_number: orderNumber,
                user_id: req.user.id 
            },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'slug', 'featured_image', 'size_ml']
                    }]
                },
                {
                    model: Address,
                    as: 'shippingAddress'
                },
                {
                    model: Address,
                    as: 'billingAddress'
                }
            ]
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/orders');
        }

        res.render('client/orders/detail', {
            title: `Pedido ${order.orderNumber} - Bayrom & Hugo Parfums`,
            description: `Detalhes do pedido ${order.orderNumber}`,
            order
        });
    } catch (error) {
        console.error('Erro ao carregar detalhes do pedido:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar os detalhes do pedido');
        res.redirect('/orders');
    }
});

// Cancelar pedido
router.post('/:orderNumber/cancel', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { reason } = req.body;

        const order = await Order.findOne({
            where: { 
                order_number: orderNumber,
                user_id: req.user.id 
            }
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/orders');
        }

        if (!order.canBeCancelled()) {
            req.flash('error_msg', 'Este pedido não pode ser cancelado');
            return res.redirect(`/orders/${orderNumber}`);
        }

        await order.update({
            status: 'cancelled',
            cancellation_reason: reason,
            cancellation_date: new Date()
        });

        // Restaurar estoque
        const orderItems = await OrderItem.findAll({
            where: { order_id: order.id }
        });

        for (const item of orderItems) {
            await Product.increment('stock_quantity', {
                by: item.quantity,
                where: { id: item.product_id }
            });
        }

        req.flash('success_msg', 'Pedido cancelado com sucesso');
        res.redirect(`/orders/${orderNumber}`);
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        req.flash('error_msg', 'Ocorreu um erro ao cancelar o pedido');
        res.redirect(`/orders/${req.params.orderNumber}`);
    }
});

// Reorder (comprar novamente)
router.post('/:orderNumber/reorder', async (req, res) => {
    try {
        const { orderNumber } = req.params;

        const order = await Order.findOne({
            where: { 
                order_number: orderNumber,
                user_id: req.user.id 
            },
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/orders');
        }

        // Adicionar itens ao carrinho
        const Cart = require('../models/Cart');
        
        for (const item of order.items) {
            if (item.product && item.product.status === 'active' && item.product.isInStock()) {
                const existingItem = await Cart.findOne({
                    where: {
                        user_id: req.user.id,
                        product_id: item.product_id
                    }
                });

                if (existingItem) {
                    await existingItem.increment('quantity', { by: item.quantity });
                } else {
                    await Cart.create({
                        user_id: req.user.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: item.product.getDisplayPrice()
                    });
                }
            }
        }

        req.flash('success_msg', 'Itens adicionados ao carrinho com sucesso!');
        res.redirect('/cart');
    } catch (error) {
        console.error('Erro ao fazer reorder:', error);
        req.flash('error_msg', 'Ocorreu um erro ao adicionar itens ao carrinho');
        res.redirect(`/orders/${req.params.orderNumber}`);
    }
});

// Download da fatura
router.get('/:orderNumber/invoice', async (req, res) => {
    try {
        const { orderNumber } = req.params;

        const order = await Order.findOne({
            where: { 
                order_number: orderNumber,
                user_id: req.user.id 
            },
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
                    model: Address,
                    as: 'shippingAddress'
                }
            ]
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/orders');
        }

        // Gerar PDF da fatura
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=fatura-${orderNumber}.pdf`);

        doc.pipe(res);

        // Cabeçalho
        doc.fontSize(20).text('Fatura - Bayrom & Hugo Parfums', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(12).text(`Pedido: ${order.orderNumber}`);
        doc.text(`Data: ${order.created_at.toLocaleDateString('pt-BR')}`);
        doc.text(`Status: ${order.getStatusText()}`);
        doc.moveDown();

        // Endereço de entrega
        doc.fontSize(14).text('Endereço de Entrega:');
        doc.fontSize(12);
        if (order.shippingAddress) {
            doc.text(`${order.shippingAddress.recipient_name}`);
            doc.text(`${order.shippingAddress.street}, ${order.shippingAddress.number}`);
            doc.text(`${order.shippingAddress.neighborhood}`);
            doc.text(`${order.shippingAddress.city} - ${order.shippingAddress.state}`);
            doc.text(`CEP: ${order.shippingAddress.postal_code}`);
        }
        doc.moveDown();

        // Itens do pedido
        doc.fontSize(14).text('Itens do Pedido:');
        doc.fontSize(12);
        
        let yPosition = doc.y;
        order.items.forEach(item => {
            if (yPosition > 650) {
                doc.addPage();
                yPosition = 50;
            }
            
            doc.text(`${item.product_name} - ${item.quantity}x R$ ${item.unit_price.toFixed(2)}`);
            doc.text(`Subtotal: R$ ${item.total_price.toFixed(2)}`);
            yPosition = doc.y + 20;
        });

        doc.moveDown();

        // Totais
        doc.fontSize(14).text('Resumo Financeiro:');
        doc.fontSize(12);
        doc.text(`Subtotal: R$ ${order.subtotal.toFixed(2)}`);
        doc.text(`Frete: R$ ${order.shipping_cost.toFixed(2)}`);
        doc.text(`Desconto: R$ ${order.discount_amount.toFixed(2)}`);
        doc.fontSize(16).text(`Total: R$ ${order.total_amount.toFixed(2)}`);

        doc.end();
    } catch (error) {
        console.error('Erro ao gerar fatura:', error);
        req.flash('error_msg', 'Ocorreu um erro ao gerar a fatura');
        res.redirect(`/orders/${req.params.orderNumber}`);
    }
});

// Rastreamento do pedido
router.get('/:orderNumber/tracking', async (req, res) => {
    try {
        const { orderNumber } = req.params;

        const order = await Order.findOne({
            where: { 
                order_number: orderNumber,
                user_id: req.user.id 
            }
        });

        if (!order) {
            req.flash('error_msg', 'Pedido não encontrado');
            return res.redirect('/orders');
        }

        if (!order.tracking_code) {
            req.flash('error_msg', 'Código de rastreamento não disponível');
            return res.redirect(`/orders/${orderNumber}`);
        }

        // Aqui você poderia integrar com a API dos Correios
        // para obter informações detalhadas do rastreamento
        
        res.render('client/orders/tracking', {
            title: `Rastreamento - ${orderNumber}`,
            description: `Acompanhe a entrega do pedido ${orderNumber}`,
            order,
            trackingInfo: {
                // Mock data - substituir com API real
                events: [
                    {
                        date: order.created_at,
                        status: 'Pedido confirmado',
                        location: 'São Paulo, SP',
                        description: 'Seu pedido foi confirmado e está em preparação'
                    }
                ]
            }
        });
    } catch (error) {
        console.error('Erro ao carregar rastreamento:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o rastreamento');
        res.redirect(`/orders/${req.params.orderNumber}`);
    }
});

module.exports = router;
