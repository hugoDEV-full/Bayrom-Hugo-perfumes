const sequelize = require('./src/config/database');
const bcrypt = require('bcrypt');

// Importar modelos
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Review = require('./src/models/Review');

async function setupSQLite() {
    try {
        console.log('🔧 Configurando banco de dados SQLite...');
        
        // Sincronizar banco de dados
        console.log('📊 Criando tabelas...');
        await sequelize.sync({ force: true });
        console.log('✅ Tabelas criadas com sucesso!');
        
        // Inserir categorias
        console.log('📂 Inserindo categorias...');
        await Category.bulkCreate([
            {
                name: 'Perfumes Masculinos',
                slug: 'perfumes-masculinos',
                description: 'Coleção de perfumes masculinos com fragrâncias marcantes e sofisticadas.',
                icon: 'fa-male',
                sort_order: 1,
                is_active: true
            },
            {
                name: 'Perfumes Femininos',
                slug: 'perfumes-femininos',
                description: 'Perfumes femininos com notas delicadas e envolventes.',
                icon: 'fa-female',
                sort_order: 2,
                is_active: true
            },
            {
                name: 'Perfumes Unisex',
                slug: 'perfumes-unisex',
                description: 'Fragrâncias versáteis que podem ser usadas por qualquer pessoa.',
                icon: 'fa-venus-mars',
                sort_order: 3,
                is_active: true
            },
            {
                name: 'Kits de Presente',
                slug: 'kits-de-presente',
                description: 'Conjuntos especiais para presentear quem você ama.',
                icon: 'fa-gift',
                sort_order: 4,
                is_active: true
            }
        ]);
        console.log('✅ Categorias inseridas!');
        
        // Inserir produtos
        console.log('📦 Inserindo produtos...');
        await Product.bulkCreate([
            {
                name: 'BP Chanel No. 5',
                slug: 'bp-chanel-no-5',
                brand: 'BP',
                category: 'feminino',
                price: 180.00,
                sale_price: 180.00,
                description: 'Clássico atemporal com notas florais elegantes de jasmim, rosa e sândalo.',
                short_description: 'Fragrância floral icônica e sofisticada.',
                inspiration: 'Chanel No. 5',
                fragrance_family: 'floral',
                size_ml: 100,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 50,
                sales_count: 25,
                rating_average: 4.5,
                rating_count: 12
            },
            {
                name: 'BP Bleu de Chanel',
                slug: 'bp-bleu-de-chanel',
                brand: 'BP',
                category: 'masculino',
                price: 220.00,
                sale_price: 220.00,
                description: 'Fragrância woody aromática para o homem moderno com notas de grapefruit, menta e sândalo.',
                short_description: 'Elegância masculina em frasco.',
                inspiration: 'Bleu de Chanel',
                fragrance_family: 'woody',
                size_ml: 100,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 30,
                sales_count: 18,
                rating_average: 4.8,
                rating_count: 8
            },
            {
                name: 'BP Creed Aventus',
                slug: 'bp-creed-aventus',
                brand: 'BP',
                category: 'masculino',
                price: 280.00,
                sale_price: 280.00,
                description: 'Laranja, bergamota, abacaxi e patchouli criam uma fragrância poderosa e sofisticada.',
                short_description: 'Sucesso em frasco.',
                inspiration: 'Creed Aventus',
                fragrance_family: 'frutal',
                size_ml: 100,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 20,
                sales_count: 32,
                rating_average: 4.9,
                rating_count: 15
            },
            {
                name: 'BP Black Opium',
                slug: 'bp-black-opium',
                brand: 'BP',
                category: 'feminino',
                price: 190.00,
                sale_price: 190.00,
                description: 'Café, baunilha e flores brancas criam uma fragrância viciante e misteriosa.',
                short_description: 'Paixão intensa.',
                inspiration: 'YSL Black Opium',
                fragrance_family: 'oriental',
                size_ml: 90,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 40,
                sales_count: 28,
                rating_average: 4.6,
                rating_count: 10
            },
            {
                name: 'BP Sauvage',
                slug: 'bp-sauvage',
                brand: 'BP',
                category: 'masculino',
                price: 200.00,
                sale_price: 180.00,
                description: 'Notas ambéreas intensas com pimenta, bergamota e âmbar para uma presença marcante.',
                short_description: 'Força selvagem.',
                inspiration: 'Dior Sauvage',
                fragrance_family: 'ambar',
                size_ml: 100,
                concentration: 'eau de toilette',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 35,
                sales_count: 22,
                rating_average: 4.7,
                rating_count: 9
            },
            {
                name: 'BP J\'adore',
                slug: 'bp-jadore',
                brand: 'BP',
                category: 'feminino',
                price: 160.00,
                sale_price: 160.00,
                description: 'Buquê floral com ylang-ylang, damasco e jasmim para uma fragrância radiante.',
                short_description: 'Feminilidade em flor.',
                inspiration: 'Dior J\'adore',
                fragrance_family: 'floral',
                size_ml: 100,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 45,
                sales_count: 15,
                rating_average: 4.4,
                rating_count: 7
            },
            {
                name: 'BP Good Girl',
                slug: 'bp-good-girl',
                brand: 'BP',
                category: 'feminino',
                price: 210.00,
                sale_price: 210.00,
                description: 'Amêndoa, café, baunilha e tuberosa em uma fragrância dual e sedutora.',
                short_description: 'Beleza poderosa.',
                inspiration: 'Carolina Herrera Good Girl',
                fragrance_family: 'oriental',
                size_ml: 80,
                concentration: 'eau de parfum',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 25,
                sales_count: 20,
                rating_average: 4.6,
                rating_count: 11
            },
            {
                name: 'BP Le Male',
                slug: 'bp-le-male',
                brand: 'BP',
                category: 'masculino',
                price: 170.00,
                sale_price: 170.00,
                description: 'Menta, lavanda e baunilha criam uma fragrância clássica e moderna.',
                short_description: 'O homem moderno.',
                inspiration: 'Jean Paul Gaultier Le Male',
                fragrance_family: 'ambar',
                size_ml: 125,
                concentration: 'eau de toilette',
                is_featured: true,
                is_active: true,
                status: 'active',
                stock_quantity: 30,
                sales_count: 12,
                rating_average: 4.3,
                rating_count: 6
            }
        ]);
        console.log('✅ Produtos inseridos!');
        
        // Criar usuário admin
        console.log('👤 Criando usuário admin...');
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
        
        // Inserir algumas avaliações
        console.log('⭐ Inserindo avaliações...');
        await Review.bulkCreate([
            {
                product_id: 1,
                name: 'Maria Silva',
                email: 'maria@email.com',
                rating: 5,
                title: 'Ameei!',
                comment: 'Fragrância maravilhosa, dura o dia todo!',
                is_approved: true
            },
            {
                product_id: 2,
                name: 'João Santos',
                email: 'joao@email.com',
                rating: 5,
                title: 'Excelente',
                comment: 'Muito bom, vale cada centavo.',
                is_approved: true
            },
            {
                product_id: 3,
                name: 'Carlos Oliveira',
                email: 'carlos@email.com',
                rating: 5,
                title: 'Incrível',
                comment: 'Perfume sofisticado e único.',
                is_approved: true
            }
        ]);
        console.log('✅ Avaliações inseridas!');
        
        await sequelize.close();
        
        console.log('');
        console.log('🎉 Banco de dados SQLite configurado com sucesso!');
        console.log('');
        console.log('📋 Resumo:');
        console.log('  • Banco: database.sqlite');
        console.log('  • 8 produtos de exemplo');
        console.log('  • 4 categorias');
        console.log('  • 3 avaliações');
        console.log('  • Usuário admin: admin@bayromhugo.com.br / admin123');
        console.log('');
        console.log('🚀 Execute "npm start" para iniciar o servidor!');
        
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error.message);
        process.exit(1);
    }
}

setupSQLite();
