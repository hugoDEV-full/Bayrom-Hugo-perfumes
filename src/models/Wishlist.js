const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wishlist = sequelize.define('Wishlist', {
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
    added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['product_id']
        }
    ]
});

// Associações
Wishlist.associate = function(models) {
    Wishlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Wishlist.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};

module.exports = Wishlist;
