const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    session_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Para carrinhos de usuários não logados'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    hooks: {
        beforeCreate: (cart) => {
            cart.total_price = (cart.quantity * cart.unit_price).toFixed(2);
        },
        beforeUpdate: (cart) => {
            if (cart.changed('quantity') || cart.changed('unit_price')) {
                cart.total_price = (cart.quantity * cart.unit_price).toFixed(2);
            }
        }
    },
    indexes: [
        {
            fields: ['user_id']
        },
        {
            fields: ['session_id']
        },
        {
            fields: ['product_id']
        },
        {
            unique: true,
            fields: ['user_id', 'product_id']
        },
        {
            unique: true,
            fields: ['session_id', 'product_id']
        }
    ]
});

// Associações
Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Cart.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};

module.exports = Cart;
