const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User');
const Address = require('./Address');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Cart = require('./Cart');
const Wishlist = require('./Wishlist');
const Review = require('./Review');

// Modelos de junção
const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

// Modelos adicionais
const OrderStatusHistory = sequelize.define('OrderStatusHistory', {
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
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

const Transaction = sequelize.define('Transaction', {
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
    type: {
        type: DataTypes.ENUM('payment', 'refund'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_method: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    transaction_id: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    gateway_response: {
        type: DataTypes.JSON,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    min_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    max_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    used_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    starts_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    applicable_products: {
        type: DataTypes.JSON,
        allowNull: true
    },
    applicable_categories: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

const ProductVariant = sequelize.define('ProductVariant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    size_ml: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    regular_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definir associações
const models = {
    User,
    Address,
    Product,
    Category,
    Order,
    OrderItem,
    Cart,
    Wishlist,
    Review,
    ProductCategory,
    OrderStatusHistory,
    Transaction,
    Coupon,
    ProductVariant
};

// Executar associações
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sincronizar banco de dados
const syncDatabase = async (force = false) => {
    try {
        await sequelize.sync({ force });
        console.log('📊 Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao sincronizar banco de dados:', error);
    }
};

module.exports = {
    sequelize,
    syncDatabase,
    ...models
};
