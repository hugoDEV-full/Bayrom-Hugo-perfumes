const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

console.log('🔧 Build Database - Iniciando configuração automática...');

// Detectar ambiente e configurar banco
let sequelize;

if (process.env.DATABASE_URL) {
    // Produção (Railway, Heroku, etc.) - MySQL
    console.log('🌍 Ambiente de produção detectado - Configurando MySQL...');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    });
} else {
    // Desenvolvimento local - SQLite
    console.log('💻 Ambiente local detectado - Configurando SQLite...');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
}

// Definir modelos
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
    regular_price: DataTypes.DECIMAL(10, 2),
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
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    title: DataTypes.STRING,
    comment: DataTypes.TEXT,
    is_approved: DataTypes.BOOLEAN
});

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    session_id: DataTypes.STRING
});

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
});

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    order_number: DataTypes.STRING,
    status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    subtotal: DataTypes.DECIMAL(10, 2),
    shipping_cost: DataTypes.DECIMAL(10, 2),
    tax_amount: DataTypes.DECIMAL(10, 2),
    discount_amount: DataTypes.DECIMAL(10, 2),
    total_amount: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    customer_email: DataTypes.STRING,
    customer_phone: DataTypes.STRING,
    shipping_address: DataTypes.TEXT,
    billing_address: DataTypes.TEXT,
    tracking_number: DataTypes.STRING,
    notes: DataTypes.TEXT
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_sku: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
    total_price: DataTypes.DECIMAL(10, 2)
});

// Configurar relacionamentos
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

async function buildDatabase() {
    try {
        console.log('📊 Conectando ao banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão estabelecida!');

        console.log('🏗️ Criando tabelas...');
        await sequelize.sync({ force: true });
        console.log('✅ Tabelas criadas com sucesso!');

        // Verificar se já existem dados
        const existingCategories = await Category.count();
        const existingProducts = await Product.count();
        const existingUsers = await User.count();

        if (existingCategories > 0 || existingProducts > 0 || existingUsers > 0) {
            console.log('📋 Banco de dados já contém dados. Pulando inserção inicial.');
            console.log(`   • Categorias: ${existingCategories}`);
            console.log(`   • Produtos: ${existingProducts}`);
            console.log(`   • Usuários: ${existingUsers}`);
        } else {
            console.log('📂 Inserindo dados iniciais...');

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
                    regular_price: 180.00, sale_price: 180.00,
                    description: 'Clássico atemporal com notas florais elegantes de jasmim, rosa e sândalo. Uma fragrância icônica que representa elegância e sofisticação.',
                    short_description: 'Fragrância floral icônica e sofisticada.',
                    inspiration: 'Chanel No. 5', fragrance_family: 'floral', size_ml: 100,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 50, sales_count: 25,
                    rating_average: 4.5, rating_count: 12
                },
                {
                    name: 'BP Bleu de Chanel', slug: 'bp-bleu-de-chanel', brand: 'BP', category: 'masculino',
                    regular_price: 220.00, sale_price: 220.00,
                    description: 'Fragrância woody aromática para o homem moderno com notas de grapefruit, menta e sândalo. Elegância masculina em um frasco.',
                    short_description: 'Elegância masculina em frasco.',
                    inspiration: 'Bleu de Chanel', fragrance_family: 'woody', size_ml: 100,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 30, sales_count: 18,
                    rating_average: 4.8, rating_count: 8
                },
                {
                    name: 'BP Creed Aventus', slug: 'bp-creed-aventus', 'brand': 'BP', category: 'masculino',
                    regular_price: 280.00, sale_price: 280.00,
                    description: 'Laranja, bergamota, abacaxi e patchouli criam uma fragrância poderosa e sofisticada. Sucesso em frasco para homens determinados.',
                    short_description: 'Sucesso em frasco.',
                    inspiration: 'Creed Aventus', fragrance_family: 'frutal', size_ml: 100,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 20, sales_count: 32,
                    rating_average: 4.9, rating_count: 15
                },
                {
                    name: 'BP Black Opium', slug: 'bp-black-opium', brand: 'BP', category: 'feminino',
                    regular_price: 190.00, sale_price: 190.00,
                    description: 'Café, baunilha e flores brancas criam uma fragrância viciante e misteriosa. Paixão intensa em cada gota.',
                    short_description: 'Paixão intensa.',
                    inspiration: 'YSL Black Opium', fragrance_family: 'oriental', size_ml: 90,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 40, sales_count: 28,
                    rating_average: 4.6, rating_count: 10
                },
                {
                    name: 'BP Sauvage', slug: 'bp-sauvage', brand: 'BP', category: 'masculino',
                    regular_price: 200.00, sale_price: 180.00,
                    description: 'Notas ambéreas intensas com pimenta, bergamota e âmbar para uma presença marcante. Força selvagem em essência.',
                    short_description: 'Força selvagem.',
                    inspiration: 'Dior Sauvage', fragrance_family: 'ambar', size_ml: 100,
                    concentration: 'eau de toilette', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 35, sales_count: 22,
                    rating_average: 4.7, rating_count: 9
                },
                {
                    name: 'BP J\'adore', slug: 'bp-jadore', brand: 'BP', category: 'feminino',
                    regular_price: 160.00, sale_price: 160.00,
                    description: 'Buquê floral com ylang-ylang, damasco e jasmim para uma fragrância radiante. Feminilidade em flor.',
                    short_description: 'Feminilidade em flor.',
                    inspiration: 'Dior J\'adore', fragrance_family: 'floral', size_ml: 100,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 45, sales_count: 15,
                    rating_average: 4.4, rating_count: 7
                },
                {
                    name: 'BP Good Girl', slug: 'bp-good-girl', brand: 'BP', category: 'feminino',
                    regular_price: 210.00, sale_price: 210.00,
                    description: 'Amêndoa, café, baunilha e tuberosa em uma fragrância dual e sedutora. Beleza poderosa e misteriosa.',
                    short_description: 'Beleza poderosa.',
                    inspiration: 'Carolina Herrera Good Girl', fragrance_family: 'oriental', size_ml: 80,
                    concentration: 'eau de parfum', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 25, sales_count: 20,
                    rating_average: 4.6, rating_count: 11
                },
                {
                    name: 'BP Le Male', slug: 'bp-le-male', brand: 'BP', category: 'masculino',
                    regular_price: 170.00, sale_price: 170.00,
                    description: 'Menta, lavanda e baunilha criam uma fragrância clássica e moderna. O homem moderno em essência.',
                    short_description: 'O homem moderno.',
                    inspiration: 'Jean Paul Gaultier Le Male', fragrance_family: 'ambar', size_ml: 125,
                    concentration: 'eau de toilette', is_featured: true, is_active: true,
                    status: 'active', stock_quantity: 30, sales_count: 12,
                    rating_average: 4.3, rating_count: 6
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
                    product_id: 1, user_id: null, name: 'Maria Silva', email: 'maria@email.com',
                    rating: 5, title: 'Amei!', comment: 'Fragrância maravilhosa! Dura o dia todo e recebe muitos elogios.',
                    is_approved: true
                },
                {
                    product_id: 2, user_id: null, name: 'João Santos', email: 'joao@email.com',
                    rating: 5, title: 'Excelente', comment: 'Muito bom, vale cada centavo. Nota masculina elegante.',
                    is_approved: true
                },
                {
                    product_id: 3, user_id: null, name: 'Carlos Oliveira', email: 'carlos@email.com',
                    rating: 5, title: 'Incrível', comment: 'Perfume sofisticado e único. Sucesso garantido!',
                    is_approved: true
                },
                {
                    product_id: 4, user_id: null, name: 'Ana Costa', email: 'ana@email.com',
                    rating: 5, title: 'Perfeito', comment: 'Adorei essa fragrância! Misteriosa e envolvente.',
                    is_approved: true
                },
                {
                    product_id: 5, user_id: null, name: 'Pedro Lima', email: 'pedro@email.com',
                    rating: 5, title: 'Potente', comment: 'Fragrância forte e marcante. Perfeito para noite.',
                    is_approved: true
                }
            ]);
            console.log('✅ Avaliações inseridas!');
        }

        await sequelize.close();

        console.log('');
        console.log('🎉 Banco de dados configurado com sucesso!');
        console.log('');
        console.log('📋 Resumo:');
        console.log(`   • Ambiente: ${process.env.DATABASE_URL ? 'Produção (MySQL)' : 'Local (SQLite)'}`);
        console.log(`   • Produtos: 8`);
        console.log(`   • Categorias: 4`);
        console.log(`   • Usuários: 1`);
        console.log(`   • Avaliações: 5`);
        console.log('');
        console.log('👤 Admin: admin@bayromhugo.com.br / admin123');
        console.log('🚀 Sistema pronto para uso!');

    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('');
            console.log('💡 Dica: Verifique se o banco de dados está acessível.');
            console.log('   • Em produção: Verifique DATABASE_URL');
            console.log('   • Em local: SQLite não requer configuração');
        }
        
        if (sequelize) {
            await sequelize.close();
        }
        
        // Em produção, não falhar o build por erro no banco
        if (process.env.NODE_ENV === 'production') {
            console.log('⚠️  Continuando build em produção...');
            return;
        }
        
        process.exit(1);
    }
}

// Executar apenas se não for em ambiente de teste
if (require.main === module) {
    buildDatabase();
}

module.exports = buildDatabase;
