const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 200]
        }
    },
    slug: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    short_description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    inspiration: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: 'Marca inspirada (ex: Creed, Dior, etc.)'
    },
    category: {
        type: DataTypes.ENUM('masculino', 'feminino', 'unisex'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fragrance_family: {
        type: DataTypes.ENUM('citrico', 'floral', 'amadeirado', 'oriental', 'aquatico', 'fores', 'especiarias', 'doce'),
        allowNull: true
    },
    size_ml: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 500
        }
    },
    regular_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    min_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        validate: {
            min: 0
        }
    },
    weight: {
        type: DataTypes.DECIMAL(8, 3),
        allowNull: true,
        comment: 'Peso em gramas para cálculo de frete'
    },
    dimensions: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Dimensões: {length, width, height} em cm'
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de URLs das imagens'
    },
    featured_image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'draft'),
        allowNull: false,
        defaultValue: 'active'
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_digital: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    requires_shipping: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    track_quantity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    allow_backorder: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    seo_title: {
        type: DataTypes.STRING(70),
        allowNull: true
    },
    seo_description: {
        type: DataTypes.STRING(160),
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    notes: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Notas olfativas: {top, middle, base}'
    },
    season: {
        type: DataTypes.ENUM('primavera', 'verao', 'outono', 'inverno', 'todas'),
        allowNull: true,
        defaultValue: 'todas'
    },
    occasion: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Ocasiões de uso: casual, formal, noite, dia, etc.'
    },
    longevity: {
        type: DataTypes.ENUM('baixa', 'media', 'alta'),
        allowNull: true
    },
    intensity: {
        type: DataTypes.ENUM('suave', 'moderada', 'intensa'),
        allowNull: true
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sales_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rating_average: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    hooks: {
        beforeCreate: (product) => {
            if (product.name && !product.slug) {
                product.slug = product.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '') + '-' + Date.now();
            }
        },
        beforeUpdate: (product) => {
            if (product.changed('name') && !product.slug) {
                product.slug = product.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '') + '-' + Date.now();
            }
        }
    },
    indexes: [
        {
            fields: ['sku']
        },
        {
            fields: ['slug']
        },
        {
            fields: ['brand']
        },
        {
            fields: ['category']
        },
        {
            fields: ['status']
        },
        {
            fields: ['is_featured']
        },
        {
            fields: ['sale_price']
        },
        {
            fields: ['created_at']
        }
    ]
});

// Métodos de instância
Product.prototype.getDisplayPrice = function() {
    return this.sale_price || this.regular_price;
};

Product.prototype.getDiscountPercentage = function() {
    if (!this.sale_price || this.sale_price >= this.regular_price) {
        return 0;
    }
    return Math.round(((this.regular_price - this.sale_price) / this.regular_price) * 100);
};

Product.prototype.isInStock = function() {
    return this.stock_quantity > 0 || this.allow_backorder;
};

Product.prototype.getStockStatus = function() {
    if (this.stock_quantity === 0) {
        return this.allow_backorder ? 'Sob encomenda' : 'Fora de estoque';
    } else if (this.stock_quantity <= this.min_stock) {
        return 'Últimas unidades';
    } else {
        return 'Em estoque';
    }
};

// Associações
Product.associate = function(models) {
    Product.hasMany(models.Cart, { foreignKey: 'product_id', as: 'cartItems' });
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
    Product.hasMany(models.Wishlist, { foreignKey: 'product_id', as: 'wishlistItems' });
    Product.hasMany(models.Review, { foreignKey: 'product_id', as: 'reviews' });
    Product.hasMany(models.ProductVariant, { foreignKey: 'product_id', as: 'variants' });
    Product.belongsToMany(models.Category, { 
        through: models.ProductCategory,
        foreignKey: 'product_id',
        otherKey: 'category_id',
        as: 'categories'
    });
};

module.exports = Product;
