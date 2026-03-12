const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'orders',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_verified_purchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    helpful_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            fields: ['product_id']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['rating']
        },
        {
            fields: ['is_approved']
        },
        {
            fields: ['created_at']
        },
        {
            unique: true,
            fields: ['user_id', 'product_id']
        }
    ]
});

// Associações
Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Review.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    Review.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
};

module.exports = Review;
