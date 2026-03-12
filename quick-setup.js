const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

console.log('🚀 Configuração rápida do banco de dados...');

// Configurar SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

// Definir modelos simples
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    sale_price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.TEXT,
    short_description: DataTypes.TEXT,
    inspiration: DataTypes.STRING,
    fragrance_family: DataTypes.STRING,
    size_ml: DataTypes.INTEGER,
    concentration: DataTypes.STRING,
    is_featured: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    stock_quantity: DataTypes.INTEGER,
    sales_count: DataTypes.INTEGER,
    rating_average: DataTypes.DECIMAL(3, 2),
    rating_count: DataTypes.INTEGER
});

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.STRING,
    sort_order: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN
});

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    title: DataTypes.STRING,
    comment: DataTypes.TEXT,
    is_approved: DataTypes.BOOLEAN
});

async function quickSetup() {
    try {
        // Sincronizar banco
        await sequelize.sync({ force: true });
        console.log('✅ Tabelas criadas!');
        
        // Inserir categorias
        await Category.bulkCreate([
            { name: 'Perfumes Masculinos', slug: 'perfumes-masculinos', description: 'Coleção masculina', icon: 'fa-male', sort_order: 1, is_active: true },
            { name: 'Perfumes Femininos', slug: 'perfumes-femininos', description: 'Coleção feminina', icon: 'fa-female', sort_order: 2, is_active: true },
            { name: 'Perfumes Unisex', slug: 'perfumes-unisex', description: 'Coleção unisex', icon: 'fa-venus-mars', sort_order: 3, is_active: true },
            { name: 'Kits de Presente', slug: 'kits-de-presente', description: 'Kits especiais', icon: 'fa-gift', sort_order: 4, is_active: true }
        ]);
        console.log('✅ Categorias inseridas!');
        
        // Inserir produtos
        await Product.bulkCreate([
            {
                name: 'BP Chanel No. 5', slug: 'bp-chanel-no-5', brand: 'BP', category: 'feminino',
                price: 180.00, sale_price: 180.00,
                description: 'Clássico atemporal com notas florais elegantes.',
                short_description: 'Fragrância floral icônica.',
                inspiration: 'Chanel No. 5', fragrance_family: 'floral', size_ml: 100,
                concentration: 'eau de parfum', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 50, sales_count: 25,
                rating_average: 4.5, rating_count: 12
            },
            {
                name: 'BP Bleu de Chanel', slug: 'bp-bleu-de-chanel', brand: 'BP', category: 'masculino',
                price: 220.00, sale_price: 220.00,
                description: 'Fragrância woody aromática para o homem moderno.',
                short_description: 'Elegância masculina.',
                inspiration: 'Bleu de Chanel', fragrance_family: 'woody', size_ml: 100,
                concentration: 'eau de parfum', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 30, sales_count: 18,
                rating_average: 4.8, rating_count: 8
            },
            {
                name: 'BP Creed Aventus', slug: 'bp-creed-aventus', brand: 'BP', category: 'masculino',
                price: 280.00, sale_price: 280.00,
                description: 'Laranja, bergamota, abacaxi e patchouli.',
                short_description: 'Sucesso em frasco.',
                inspiration: 'Creed Aventus', fragrance_family: 'frutal', size_ml: 100,
                concentration: 'eau de parfum', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 20, sales_count: 32,
                rating_average: 4.9, rating_count: 15
            },
            {
                name: 'BP Black Opium', slug: 'bp-black-opium', brand: 'BP', category: 'feminino',
                price: 190.00, sale_price: 190.00,
                description: 'Café, baunilha e flores brancas.',
                short_description: 'Paixão intensa.',
                inspiration: 'YSL Black Opium', fragrance_family: 'oriental', size_ml: 90,
                concentration: 'eau de parfum', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 40, sales_count: 28,
                rating_average: 4.6, rating_count: 10
            },
            {
                name: 'BP Sauvage', slug: 'bp-sauvage', brand: 'BP', category: 'masculino',
                price: 200.00, sale_price: 180.00,
                description: 'Notas ambéreas com pimenta e bergamota.',
                short_description: 'Força selvagem.',
                inspiration: 'Dior Sauvage', fragrance_family: 'ambar', size_ml: 100,
                concentration: 'eau de toilette', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 35, sales_count: 22,
                rating_average: 4.7, rating_count: 9
            },
            {
                name: 'BP J\'adore', slug: 'bp-jadore', brand: 'BP', category: 'feminino',
                price: 160.00, sale_price: 160.00,
                description: 'Buquê floral com ylang-ylang e jasmim.',
                short_description: 'Feminilidade em flor.',
                inspiration: 'Dior J\'adore', fragrance_family: 'floral', size_ml: 100,
                concentration: 'eau de parfum', is_featured: true, is_active: true,
                status: 'active', stock_quantity: 45, sales_count: 15,
                rating_average: 4.4, rating_count: 7
            }
        ]);
        console.log('✅ Produtos inseridos!');
        
        // Criar usuário admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Administrador',
            email: 'admin@bayromhugo.com.br',
            password: hashedPassword,
            role: 'admin',
            status: 'active',
            email_verified: true
        });
        console.log('✅ Usuário admin criado!');
        
        // Inserir avaliações
        await Review.bulkCreate([
            {
                product_id: 1, name: 'Maria Silva', email: 'maria@email.com',
                rating: 5, title: 'Ameei!', comment: 'Fragrância maravilhosa!',
                is_approved: true
            },
            {
                product_id: 2, name: 'João Santos', email: 'joao@email.com',
                rating: 5, title: 'Excelente', comment: 'Muito bom!',
                is_approved: true
            }
        ]);
        console.log('✅ Avaliações inseridas!');
        
        await sequelize.close();
        
        console.log('');
        console.log('🎉 Banco de dados configurado com sucesso!');
        console.log('');
        console.log('📋 Dados criados:');
        console.log('  • 6 produtos');
        console.log('  • 4 categorias');
        console.log('  • 2 avaliações');
        console.log('  • 1 usuário admin');
        console.log('');
        console.log('👤 Admin: admin@bayromhugo.com.br / admin123');
        console.log('🚀 Execute "npm start" para iniciar!');
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

quickSetup();
