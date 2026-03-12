const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
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
    slug: {
        type: DataTypes.STRING(120),
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
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Ícone para display (FontAwesome ou similar)'
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    seo_title: {
        type: DataTypes.STRING(70),
        allowNull: true
    },
    seo_description: {
        type: DataTypes.STRING(160),
        allowNull: true
    },
    meta_keywords: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: (category) => {
            if (category.name && !category.slug) {
                category.slug = category.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
        },
        beforeUpdate: (category) => {
            if (category.changed('name') && !category.slug) {
                category.slug = category.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
        }
    },
    indexes: [
        {
            fields: ['slug']
        },
        {
            fields: ['parent_id']
        },
        {
            fields: ['sort_order']
        },
        {
            fields: ['is_active']
        }
    ]
});

// Associações
Category.associate = function(models) {
    Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
    Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });
    Category.belongsToMany(models.Product, { 
        through: models.ProductCategory,
        foreignKey: 'category_id',
        otherKey: 'product_id',
        as: 'products'
    });
};

// Métodos de instância
Category.prototype.getFullPath = async function() {
    const path = [this.name];
    let parent = await this.getParent();
    
    while (parent) {
        path.unshift(parent.name);
        parent = await parent.getParent();
    }
    
    return path.join(' > ');
};

module.exports = Category;
