const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'RESTRICT'
    },
    product_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    product_sku: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    total_price: {
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
    product_snapshot: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Snapshot do produto no momento da compra'
    }
}, {
    hooks: {
        beforeCreate: (orderItem) => {
            orderItem.total_price = (orderItem.quantity * orderItem.unit_price - orderItem.discount_amount).toFixed(2);
        },
        beforeUpdate: (orderItem) => {
            if (orderItem.changed('quantity') || 
                orderItem.changed('unit_price') || 
                orderItem.changed('discount_amount')) {
                orderItem.total_price = (orderItem.quantity * orderItem.unit_price - orderItem.discount_amount).toFixed(2);
            }
        }
    },
    indexes: [
        {
            fields: ['order_id']
        },
        {
            fields: ['product_id']
        }
    ]
});

// Associações
OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};

module.exports = OrderItem;
