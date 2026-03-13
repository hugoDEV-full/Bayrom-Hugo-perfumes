const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { authMiddleware } = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Address = require('../models/Address');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const sequelize = require('../config/database');

async function getUserCartItems(userId) {
    const items = await Cart.findAll({
        where: { user_id: userId },
        include: [{
            model: Product,
            as: 'product',
            where: { status: 'active' }
        }],
        order: [['added_at', 'ASC']]
    });

    return items.filter(i => i.product);
}

function calculateTotals(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
    const shipping = subtotal > 250 ? 0 : (cartItems.length > 0 ? 15.90 : 0);
    const tax = 0;
    const discount = 0;
    const total = subtotal + shipping + tax - discount;

    return {
        subtotal: Number(subtotal.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        total: Number(total.toFixed(2)),
        freeShipping: subtotal >= 250
    };
}

router.use(authMiddleware);

// Página de checkout
router.get('/', async (req, res) => {
    try {
        const cartItems = await getUserCartItems(req.user.id);

        if (!cartItems || cartItems.length === 0) {
            req.flash('error_msg', 'Seu carrinho está vazio');
            return res.redirect('/cart');
        }

        const totals = calculateTotals(cartItems);

        const defaultShippingAddress = await Address.findOne({
            where: { user_id: req.user.id, type: 'shipping', is_default: true }
        });

        res.render('client/checkout/index', {
            title: 'Finalizar Compra - Bayrom & Hugo Parfums',
            description: 'Complete seu pedido com segurança.',
            cartItems,
            totals,
            defaultShippingAddress
        });
    } catch (error) {
        console.error('Erro ao carregar checkout:', error);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o checkout');
        res.redirect('/cart');
    }
});

// Processar checkout (criar pedido)
router.post('/place-order', [
    body('recipient_name').trim().isLength({ min: 3, max: 100 }),
    body('postal_code').trim().matches(/^\d{5}-\d{3}$/),
    body('street').trim().isLength({ min: 5, max: 200 }),
    body('number').trim().notEmpty(),
    body('neighborhood').trim().isLength({ min: 3, max: 100 }),
    body('city').trim().isLength({ min: 3, max: 100 }),
    body('state').trim().matches(/^[A-Z]{2}$/),
    body('payment_method').isIn(['credit_card', 'debit_card', 'boleto', 'pix', 'mercadopago', 'stripe'])
], async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error_msg', 'Por favor, revise os dados do checkout');
            await transaction.rollback();
            return res.redirect('/checkout');
        }

        const cartItems = await getUserCartItems(req.user.id);
        if (!cartItems || cartItems.length === 0) {
            req.flash('error_msg', 'Seu carrinho está vazio');
            await transaction.rollback();
            return res.redirect('/cart');
        }

        // Validar estoque antes
        for (const item of cartItems) {
            const product = item.product;
            if (!product || product.status !== 'active') {
                req.flash('error_msg', 'Um item do seu carrinho não está mais disponível');
                await transaction.rollback();
                return res.redirect('/cart');
            }

            if (item.quantity > product.stock_quantity && !product.allow_backorder) {
                req.flash('error_msg', `Estoque insuficiente para ${product.name}`);
                await transaction.rollback();
                return res.redirect('/cart');
            }
        }

        const totals = calculateTotals(cartItems);

        // Criar endereço de entrega
        const shippingAddress = await Address.create({
            user_id: req.user.id,
            type: 'shipping',
            recipient_name: req.body.recipient_name,
            postal_code: req.body.postal_code,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement || null,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            state: req.body.state,
            country: 'Brasil',
            is_default: !!req.body.save_as_default
        }, { transaction });

        // Criar pedido
        const order = await Order.create({
            user_id: req.user.id,
            status: 'confirmed',
            payment_status: 'pending',
            payment_method: req.body.payment_method,
            shipping_address_id: shippingAddress.id,
            billing_address_id: null,
            shipping_method: 'pac',
            shipping_carrier: 'correios',
            subtotal: totals.subtotal,
            shipping_cost: totals.shipping,
            tax_amount: totals.tax,
            discount_amount: totals.discount,
            coupon_discount: 0,
            notes: req.body.notes || null,
            ip_address: req.ip,
            device_info: {
                userAgent: req.get('user-agent')
            }
        }, { transaction });

        // Criar itens
        for (const cartItem of cartItems) {
            const product = cartItem.product;

            await OrderItem.create({
                order_id: order.id,
                product_id: product.id,
                product_name: product.name,
                product_sku: product.sku,
                quantity: cartItem.quantity,
                unit_price: cartItem.unit_price,
                discount_amount: 0,
                product_snapshot: {
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    brand: product.brand,
                    size_ml: product.size_ml,
                    regular_price: product.regular_price,
                    sale_price: product.sale_price,
                    featured_image: product.featured_image
                }
            }, { transaction });

            // Baixar estoque e aumentar vendas
            if (!product.allow_backorder) {
                await Product.decrement('stock_quantity', {
                    by: cartItem.quantity,
                    where: { id: product.id },
                    transaction
                });
            }

            await Product.increment('sales_count', {
                by: cartItem.quantity,
                where: { id: product.id },
                transaction
            });
        }

        // Limpar carrinho
        await Cart.destroy({ where: { user_id: req.user.id }, transaction });

        await transaction.commit();

        req.flash('success_msg', `Pedido ${order.order_number} criado com sucesso!`);
        return res.redirect(`/orders/${order.order_number}`);
    } catch (error) {
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            console.error('Erro no rollback:', rollbackError);
        }

        console.error('Erro ao finalizar compra:', error);
        req.flash('error_msg', 'Ocorreu um erro ao finalizar sua compra');
        return res.redirect('/checkout');
    }
});

module.exports = router;
