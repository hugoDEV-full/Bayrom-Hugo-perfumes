const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Address = sequelize.define('Address', {
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
    type: {
        type: DataTypes.ENUM('shipping', 'billing'),
        allowNull: false,
        defaultValue: 'shipping'
    },
    recipient_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    postal_code: {
        type: DataTypes.STRING(9),
        allowNull: false,
        validate: {
            is: /^\d{5}-\d{3}$/
        }
    },
    street: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 200]
        }
    },
    number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    complement: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            is: /^[A-Z]{2}$/
        }
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Brasil'
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    coordinates: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Latitude e longitude para entrega'
    }
}, {
    indexes: [
        {
            fields: ['user_id']
        },
        {
            fields: ['postal_code']
        },
        {
            fields: ['is_default']
        }
    ]
});

// Hooks
Address.beforeCreate(async (address) => {
    if (address.is_default) {
        await Address.update(
            { is_default: false },
            { 
                where: { 
                    user_id: address.user_id,
                    type: address.type 
                } 
            }
        );
    }
});

Address.beforeUpdate(async (address) => {
    if (address.changed('is_default') && address.is_default) {
        await Address.update(
            { is_default: false },
            { 
                where: { 
                    user_id: address.user_id,
                    type: address.type,
                    id: { [sequelize.Sequelize.Op.ne]: address.id }
                } 
            }
        );
    }
});

// Associações
Address.associate = function(models) {
    Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Address.hasMany(models.Order, { foreignKey: 'shipping_address_id', as: 'shippingOrders' });
    Address.hasMany(models.Order, { foreignKey: 'billing_address_id', as: 'billingOrders' });
};

module.exports = Address;
