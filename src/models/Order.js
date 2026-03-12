const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM(
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'delivered',
            'cancelled',
            'refunded'
        ),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_status: {
        type: DataTypes.ENUM(
            'pending',
            'paid',
            'failed',
            'refunded',
            'partially_refunded'
        ),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_method: {
        type: DataTypes.ENUM(
            'credit_card',
            'debit_card',
            'boleto',
            'pix',
            'mercadopago',
            'stripe'
        ),
        allowNull: false
    },
    payment_details: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Detalhes do pagamento (ID da transação, etc.)'
    },
    shipping_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        },
        onDelete: 'RESTRICT'
    },
    billing_address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'addresses',
            key: 'id'
        },
        onDelete: 'RESTRICT'
    },
    shipping_method: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pac'
    },
    shipping_carrier: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'correios'
    },
    tracking_code: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tracking_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    estimated_delivery: {
        type: DataTypes.DATE,
        allowNull: true
    },
    actual_delivery: {
        type: DataTypes.DATE,
        allowNull: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    coupon_code: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    coupon_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    internal_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Notas internas da equipe'
    },
    customer_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Notas do cliente no pedido'
    },
    invoice_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    invoice_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    label_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL da etiqueta dos Correios'
    },
    label_data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Dados da etiqueta para impressão'
    },
    cancellation_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cancellation_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refund_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    refund_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refund_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    affiliate_code: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    source: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'website'
    },
    device_info: {
        type: DataTypes.JSON,
        allowNull: true
    },
    ip_address: {
        type: DataTypes.INET,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: (order) => {
            if (!order.order_number) {
                const date = new Date();
                const timestamp = date.getTime().toString().slice(-6);
                order.order_number = `BHP${date.getFullYear()}${timestamp}`;
            }
            
            // Calcular total
            order.total_amount = (
                parseFloat(order.subtotal || 0) +
                parseFloat(order.shipping_cost || 0) +
                parseFloat(order.tax_amount || 0) -
                parseFloat(order.discount_amount || 0) -
                parseFloat(order.coupon_discount || 0)
            ).toFixed(2);
        },
        beforeUpdate: (order) => {
            // Recalcular total se necessário
            if (order.changed('subtotal') || 
                order.changed('shipping_cost') || 
                order.changed('tax_amount') || 
                order.changed('discount_amount') || 
                order.changed('coupon_discount')) {
                
                order.total_amount = (
                    parseFloat(order.subtotal || 0) +
                    parseFloat(order.shipping_cost || 0) +
                    parseFloat(order.tax_amount || 0) -
                    parseFloat(order.discount_amount || 0) -
                    parseFloat(order.coupon_discount || 0)
                ).toFixed(2);
            }
        }
    },
    indexes: [
        {
            fields: ['order_number']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['status']
        },
        {
            fields: ['payment_status']
        },
        {
            fields: ['created_at']
        },
        {
            fields: ['tracking_code']
        }
    ]
});

// Métodos de instância
Order.prototype.canBeCancelled = function() {
    return ['pending', 'confirmed'].includes(this.status);
};

Order.prototype.canBeRefunded = function() {
    return ['paid', 'processing', 'shipped', 'delivered'].includes(this.payment_status);
};

Order.prototype.getPaymentStatusText = function() {
    const statusMap = {
        'pending': 'Pendente',
        'paid': 'Pago',
        'failed': 'Falhou',
        'refunded': 'Reembolsado',
        'partially_refunded': 'Parcialmente reembolsado'
    };
    return statusMap[this.payment_status] || this.payment_status;
};

Order.prototype.getStatusText = function() {
    const statusMap = {
        'pending': 'Pendente',
        'confirmed': 'Confirmado',
        'processing': 'Em processamento',
        'shipped': 'Enviado',
        'delivered': 'Entregue',
        'cancelled': 'Cancelado',
        'refunded': 'Reembolsado'
    };
    return statusMap[this.status] || this.status;
};

// Associações
Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Order.belongsTo(models.Address, { foreignKey: 'shipping_address_id', as: 'shippingAddress' });
    Order.belongsTo(models.Address, { foreignKey: 'billing_address_id', as: 'billingAddress' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
    Order.hasMany(models.OrderStatusHistory, { foreignKey: 'order_id', as: 'statusHistory' });
    Order.hasMany(models.Transaction, { foreignKey: 'order_id', as: 'transactions' });
};

module.exports = Order;
