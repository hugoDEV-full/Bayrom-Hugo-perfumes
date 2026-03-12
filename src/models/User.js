const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 255]
        }
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique: true,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: /^\(\d{2}\) \d{5}-\d{4}$/
        }
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('M', 'F', 'O'),
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'client'),
        allowNull: false,
        defaultValue: 'client'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        allowNull: false,
        defaultValue: 'active'
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email_verification_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password_reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password_reset_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    preferences: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
            newsletter: true,
            promotions: true,
            new_products: true
        }
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        }
    },
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['cpf']
        }
    ]
});

// Métodos de instância
User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.email_verification_token;
    delete values.password_reset_token;
    delete values.password_reset_expires;
    return values;
};

// Associações
User.associate = function(models) {
    User.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
    User.hasMany(models.Cart, { foreignKey: 'user_id', as: 'cartItems' });
    User.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'wishlistItems' });
    User.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });
};

module.exports = User;
