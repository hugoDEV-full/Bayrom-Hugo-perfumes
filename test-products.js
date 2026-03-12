// Script simples para testar produtos sem banco de dados
const express = require('express');
const path = require('path');

// Dados mock de produtos para teste
const mockProducts = [
    {
        id: 1,
        name: 'BP Chanel No. 5',
        brand: 'BP',
        category: 'feminino',
        price: 180.00,
        sale_price: 180.00,
        description: 'Clássico atemporal com notas florais elegantes',
        inspiration: 'Chanel No. 5',
        featured_image: '/images/products/chanel-no5.jpg',
        averageRating: 4.5,
        status: 'active'
    },
    {
        id: 2,
        name: 'BP Bleu de Chanel',
        brand: 'BP',
        category: 'masculino',
        price: 220.00,
        sale_price: 220.00,
        description: 'Fragrância woody aromática para o homem moderno',
        inspiration: 'Bleu de Chanel',
        featured_image: '/images/products/bleu-de-chanel.jpg',
        averageRating: 4.8,
        status: 'active'
    },
    {
        id: 3,
        name: 'BP Creed Aventus',
        brand: 'BP',
        category: 'masculino',
        price: 280.00,
        sale_price: 280.00,
        description: 'Laranja, bergamota, abacaxi e patchouli',
        inspiration: 'Creed Aventus',
        featured_image: '/images/products/creed-aventus.jpg',
        averageRating: 4.9,
        status: 'active'
    },
    {
        id: 4,
        name: 'BP Black Opium',
        brand: 'BP',
        category: 'feminino',
        price: 190.00,
        sale_price: 190.00,
        description: 'Café, baunilha e flores brancas',
        inspiration: 'YSL Black Opium',
        featured_image: '/images/products/black-opium.jpg',
        averageRating: 4.6,
        status: 'active'
    },
    {
        id: 5,
        name: 'BP Sauvage',
        brand: 'BP',
        category: 'masculino',
        price: 200.00,
        sale_price: 180.00,
        description: 'Notas ambéreas intensas com pimenta e bergamota',
        inspiration: 'Dior Sauvage',
        featured_image: '/images/products/sauvage.jpg',
        averageRating: 4.7,
        status: 'active'
    },
    {
        id: 6,
        name: 'BP J\'adore',
        brand: 'BP',
        category: 'feminino',
        price: 160.00,
        sale_price: 160.00,
        description: 'Buquê floral com ylang-ylang e damasco',
        inspiration: 'Dior J\'adore',
        featured_image: '/images/products/jadore.jpg',
        averageRating: 4.4,
        status: 'active'
    }
];

// Criar middleware para injetar produtos mock
const mockProductsMiddleware = (req, res, next) => {
    // Mockar o modelo Product para retornar dados de teste
    const originalRequire = require;
    require = function(id) {
        if (id.includes('models/Product')) {
            return {
                findAll: async (options = {}) => {
                    let filteredProducts = [...mockProducts];
                    
                    // Aplicar filtros
                    if (options.where) {
                        if (options.where.category) {
                            filteredProducts = filteredProducts.filter(p => p.category === options.where.category);
                        }
                        if (options.where.brand) {
                            filteredProducts = filteredProducts.filter(p => 
                                p.brand.toLowerCase().includes(options.where.brand[originalRequire('sequelize').Op.like].replace(/%/g, '').toLowerCase())
                            );
                        }
                        if (options.where.status) {
                            filteredProducts = filteredProducts.filter(p => p.status === options.where.status);
                        }
                    }
                    
                    // Aplicar ordenação
                    if (options.order && options.order.length > 0) {
                        const [field, direction] = options.order[0];
                        filteredProducts.sort((a, b) => {
                            if (direction === 'ASC') {
                                return a[field] > b[field] ? 1 : -1;
                            } else {
                                return a[field] < b[field] ? 1 : -1;
                            }
                        });
                    }
                    
                    // Aplicar paginação
                    const limit = options.limit || filteredProducts.length;
                    const offset = options.offset || 0;
                    const paginatedProducts = filteredProducts.slice(offset, offset + limit);
                    
                    return {
                        count: filteredProducts.length,
                        rows: paginatedProducts
                    };
                },
                findOne: async (options) => {
                    return mockProducts.find(p => p.id === options.where.id) || null;
                },
                sequelize: {
                    Sequelize: {
                        Op: {
                            like: 'like',
                            gte: 'gte',
                            lte: 'lte',
                            or: 'or'
                        }
                    }
                }
            };
        }
        if (id.includes('models/Category')) {
            return {
                findAll: async () => [
                    { id: 1, name: 'Perfumes Masculinos', slug: 'masculino', is_active: true },
                    { id: 2, name: 'Perfumes Femininos', slug: 'feminino', is_active: true },
                    { id: 3, name: 'Perfumes Unisex', slug: 'unisex', is_active: true }
                ]
            };
        }
        if (id.includes('models/Review')) {
            return {
                findAll: async () => []
            };
        }
        return originalRequire.apply(this, arguments);
    };
    
    next();
};

console.log('✅ Script de teste de produtos criado com sucesso!');
console.log('📦 Produtos mock disponíveis:', mockProducts.length);
console.log('🔧 Para usar, adicione o middleware mockProductsMiddleware antes das rotas');
console.log('');
console.log('Exemplo de uso no server.js:');
console.log('const mockProductsMiddleware = require("./test-products");');
console.log('app.use(mockProductsMiddleware);');
