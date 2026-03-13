console.log('🔧 Build Database - Iniciando configuração automática...');

// Usar a MESMA instância/config do app para evitar divergência de schema
const sequelize = require('./src/config/database');
const { User, Product, Category, Review } = require('./src/models');

async function syncSchemaWithFallback() {
    try {
        await sequelize.sync({ alter: true });
        return { rebuilt: false };
    } catch (error) {
        const isSqlite = sequelize.getDialect && sequelize.getDialect() === 'sqlite';
        const isUniqueAlterIssue =
            typeof error?.message === 'string' &&
            error.message.includes('SQLITE_ERROR: Cannot add a UNIQUE column');

        if (isSqlite && isUniqueAlterIssue) {
            console.log('⚠️  SQLite não consegue adicionar coluna UNIQUE via ALTER. Recriando tabelas...');
            await sequelize.drop();
            await sequelize.sync({ force: true });
            return { rebuilt: true };
        }

        throw error;
    }
}

async function buildDatabase(options = {}) {
    const {
        closeConnection = (require.main === module),
        tolerateProductionErrors = (require.main === module)
    } = options;

    try {
        console.log('📊 Conectando ao banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão estabelecida!');

        console.log('🏗️ Criando tabelas...');
        const { rebuilt } = await syncSchemaWithFallback();
        console.log('✅ Tabelas criadas com sucesso!');

        // Verificar se já existem dados
        const existingCategories = await Category.count();
        const existingProducts = await Product.count();
        const existingUsers = await User.count();

        if (!rebuilt && (existingCategories > 0 || existingProducts > 0 || existingUsers > 0)) {
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
                    sku: 'BP-CHANEL5-100',
                    regular_price: 180.00, sale_price: 180.00,
                    description: 'Clássico atemporal com notas florais elegantes de jasmim, rosa e sândalo. Uma fragrância icônica que representa elegância e sofisticação.',
                    short_description: 'Fragrância floral icônica e sofisticada.',
                    inspiration: 'Chanel No. 5', fragrance_family: 'floral', size_ml: 100,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 50,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 25,
                    rating_average: 4.5, rating_count: 12
                },
                {
                    name: 'BP Bleu de Chanel', slug: 'bp-bleu-de-chanel', brand: 'BP', category: 'masculino',
                    sku: 'BP-BLEU-100',
                    regular_price: 220.00, sale_price: 220.00,
                    description: 'Fragrância woody aromática para o homem moderno com notas de grapefruit, menta e sândalo. Elegância masculina em um frasco.',
                    short_description: 'Elegância masculina em frasco.',
                    inspiration: 'Bleu de Chanel', fragrance_family: 'woody', size_ml: 100,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 30,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 18,
                    rating_average: 4.8, rating_count: 8
                },
                {
                    name: 'BP Creed Aventus', slug: 'bp-creed-aventus', 'brand': 'BP', category: 'masculino',
                    sku: 'BP-AVENTUS-100',
                    regular_price: 280.00, sale_price: 280.00,
                    description: 'Laranja, bergamota, abacaxi e patchouli criam uma fragrância poderosa e sofisticada. Sucesso em frasco para homens determinados.',
                    short_description: 'Sucesso em frasco.',
                    inspiration: 'Creed Aventus', fragrance_family: 'frutal', size_ml: 100,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 20,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 32,
                    rating_average: 4.9, rating_count: 15
                },
                {
                    name: 'BP Black Opium', slug: 'bp-black-opium', brand: 'BP', category: 'feminino',
                    sku: 'BP-BLACKOPIUM-90',
                    regular_price: 190.00, sale_price: 190.00,
                    description: 'Café, baunilha e flores brancas criam uma fragrância viciante e misteriosa. Paixão intensa em cada gota.',
                    short_description: 'Paixão intensa.',
                    inspiration: 'YSL Black Opium', fragrance_family: 'oriental', size_ml: 90,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 40,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 28,
                    rating_average: 4.6, rating_count: 10
                },
                {
                    name: 'BP Sauvage', slug: 'bp-sauvage', brand: 'BP', category: 'masculino',
                    sku: 'BP-SAUVAGE-100',
                    regular_price: 200.00, sale_price: 180.00,
                    description: 'Notas ambéreas intensas com pimenta, bergamota e âmbar para uma presença marcante. Força selvagem em essência.',
                    short_description: 'Força selvagem.',
                    inspiration: 'Dior Sauvage', fragrance_family: 'ambar', size_ml: 100,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 35,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 22,
                    rating_average: 4.7, rating_count: 9
                },
                {
                    name: 'BP J\'adore', slug: 'bp-jadore', brand: 'BP', category: 'feminino',
                    sku: 'BP-JADORE-100',
                    regular_price: 160.00, sale_price: 160.00,
                    description: 'Buquê floral com ylang-ylang, damasco e jasmim para uma fragrância radiante. Feminilidade em flor.',
                    short_description: 'Feminilidade em flor.',
                    inspiration: 'Dior J\'adore', fragrance_family: 'floral', size_ml: 100,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 45,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 15,
                    rating_average: 4.4, rating_count: 7
                },
                {
                    name: 'BP Good Girl', slug: 'bp-good-girl', brand: 'BP', category: 'feminino',
                    sku: 'BP-GOODGIRL-80',
                    regular_price: 210.00, sale_price: 210.00,
                    description: 'Amêndoa, café, baunilha e tuberosa em uma fragrância dual e sedutora. Beleza poderosa e misteriosa.',
                    short_description: 'Beleza poderosa.',
                    inspiration: 'Carolina Herrera Good Girl', fragrance_family: 'oriental', size_ml: 80,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 25,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 20,
                    rating_average: 4.6, rating_count: 11
                },
                {
                    name: 'BP Le Male', slug: 'bp-le-male', brand: 'BP', category: 'masculino',
                    sku: 'BP-LEMALE-125',
                    regular_price: 170.00, sale_price: 170.00,
                    description: 'Menta, lavanda e baunilha criam uma fragrância clássica e moderna. O homem moderno em essência.',
                    short_description: 'O homem moderno.',
                    inspiration: 'Jean Paul Gaultier Le Male', fragrance_family: 'ambar', size_ml: 125,
                    is_featured: true,
                    status: 'active',
                    stock_quantity: 30,
                    min_stock: 5,
                    images: [],
                    is_digital: false,
                    requires_shipping: true,
                    track_quantity: true,
                    allow_backorder: false,
                    view_count: 0,
                    sales_count: 12,
                    rating_average: 4.3, rating_count: 6
                }
            ]);
            console.log('✅ Produtos inseridos!');

            // Criar usuário admin
            await User.create({
                name: 'Administrador',
                email: 'admin@bayromhugo.com.br',
                password: 'admin123',
                role: 'admin',
                status: 'active',
                email_verified: true
            });
            console.log('✅ Usuário admin criado!');

            // Inserir avaliações
            const adminUser = await User.findOne({ where: { email: 'admin@bayromhugo.com.br' } });
            const products = await Product.findAll({ order: [['id', 'ASC']], limit: 5 });
            if (adminUser && products.length > 0) {
                await Review.bulkCreate(products.map((p, idx) => ({
                    product_id: p.id,
                    user_id: adminUser.id,
                    rating: idx % 2 === 0 ? 5 : 4,
                    title: idx % 2 === 0 ? 'Perfeito!' : 'Muito bom',
                    comment: 'Excelente experiência e ótima fixação.',
                    is_verified_purchase: false,
                    is_approved: true
                })));
            }
            console.log('✅ Avaliações inseridas!');
        }

        console.log('\n🎉 Banco de dados configurado com sucesso!');
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
        
        if (closeConnection && sequelize) {
            await sequelize.close();
        }

        // Se foi chamado pelo servidor (RUN_DB_SETUP), não engolir erro
        // (precisa falhar fast para não iniciar com DB inconsistente)
        if (process.env.RUN_DB_SETUP === 'true') {
            throw error;
        }

        // Em produção, quando executado no build (postinstall), não falhar o deploy por erro de DB
        if (tolerateProductionErrors && process.env.NODE_ENV === 'production') {
            console.log('⚠️  Continuando build em produção...');
            return;
        }

        throw error;
    } finally {
        if (closeConnection && sequelize) {
            await sequelize.close();
        }
    }
}

// Executar apenas se não for em ambiente de teste
if (require.main === module && process.env.NODE_ENV !== 'test') {
    buildDatabase();
}

module.exports = buildDatabase;
