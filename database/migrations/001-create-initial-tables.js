const { sequelize } = require('../../src/models');

async function createTables() {
    try {
        console.log('🔄 Criando tabelas do banco de dados...');

        // Sincronizar todos os modelos
        await sequelize.sync({ force: false, alter: true });

        console.log('✅ Tabelas criadas com sucesso!');

        // Inserir dados iniciais
        await insertInitialData();

        console.log('🎉 Banco de dados configurado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao criar tabelas:', error);
        throw error;
    }
}

async function insertInitialData() {
    try {
        console.log('📝 Inserindo dados iniciais...');

        const { Category, Product, User } = require('../../src/models');

        // Criar categorias
        const categories = await Category.bulkCreate([
            {
                name: 'Perfumes Masculinos',
                slug: 'perfumes-masculinos',
                description: 'Coleção de perfumes masculinos com fragrâncias marcantes e sofisticadas.',
                icon: 'fa-male',
                sort_order: 1
            },
            {
                name: 'Perfumes Femininos',
                slug: 'perfumes-femininos',
                description: 'Perfumes femininos com notas delicadas e envolventes.',
                icon: 'fa-female',
                sort_order: 2
            },
            {
                name: 'Perfumes Unisex',
                slug: 'perfumes-unisex',
                description: 'Fragrâncias versáteis que podem ser usadas por qualquer pessoa.',
                icon: 'fa-venus-mars',
                sort_order: 3
            },
            {
                name: 'Kits de Presente',
                slug: 'kits-de-presente',
                description: 'Conjuntos especiais para presentear quem você ama.',
                icon: 'fa-gift',
                sort_order: 4
            }
        ]);

        // Criar usuário administrador
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 12);

        await User.findOrCreate({
            where: { email: 'admin@bayromhugoperfumes.com.br' },
            defaults: {
                name: 'Administrador',
                email: 'admin@bayromhugoperfumes.com.br',
                password: hashedPassword,
                role: 'admin',
                status: 'active',
                email_verified: true
            }
        });

        // Criar produtos de exemplo
        const products = await Product.bulkCreate([
            {
                name: 'BHP-001 - Inspiração Aventus',
                slug: 'bhp-001-inspiracao-aventus',
                description: 'Uma fragrância poderosa e sofisticada que combina notas de abacaxi, bergamota, patchouli e carvalho. Perfeita para homens que buscam elegância e destaque.',
                short_description: 'Fragrância inspirada em Creed Aventus - 50ml',
                sku: 'BHP-001',
                brand: 'Bayrom Parfums',
                inspiration: 'Creed Aventus',
                category: 'masculino',
                fragrance_family: 'frutal',
                size_ml: 50,
                regular_price: 189.90,
                sale_price: 159.90,
                stock_quantity: 50,
                min_stock: 5,
                is_featured: true,
                status: 'active',
                tags: ['aventus', 'masculino', 'frutal', 'sofisticado'],
                notes: {
                    top: ['Abacaxi', 'Bergamota', 'Maçã Verde'],
                    middle: ['Jasmim', 'Patchouli', 'Carvalho'],
                    base: ['Musgo', 'Vetiver', 'Âmbar']
                },
                season: 'todas',
                occasion: ['formal', 'casual', 'noite'],
                longevity: 'alta',
                intensity: 'intensa'
            },
            {
                name: 'BHP-002 - Inspiração Sauvage',
                slug: 'bhp-002-inspiracao-sauvage',
                description: 'Uma explosão de frescor com notas de bergamota, pimenta, ambroxan e notas aquáticas. Ideal para o homem moderno e confiante.',
                short_description: 'Fragrância inspirada em Dior Sauvage - 50ml',
                sku: 'BHP-002',
                brand: 'Hugo Parfums',
                inspiration: 'Dior Sauvage',
                category: 'masculino',
                fragrance_family: 'citrico',
                size_ml: 50,
                regular_price: 179.90,
                sale_price: 149.90,
                stock_quantity: 75,
                min_stock: 5,
                is_featured: true,
                status: 'active',
                tags: ['sauvage', 'masculino', 'citrico', 'moderno'],
                notes: {
                    top: ['Bergamota', 'Pimenta'],
                    middle: ['Lavanda', 'Gerânio'],
                    base: ['Ambroxan', 'Cedro', 'Vetiver']
                },
                season: 'verao',
                occasion: ['casual', 'dia', 'esporte'],
                longevity: 'media',
                intensity: 'moderada'
            },
            {
                name: 'BHP-003 - Inspiração Good Girl',
                slug: 'bhp-003-inspiracao-good-girl',
                description: 'Uma fragrância sedutora que combina notas de tuberosa, jasmim, amêndoa e baunilha. Representa a dualidade feminina: doce e poderosa.',
                short_description: 'Fragrância inspirada em Carolina Herrera Good Girl - 50ml',
                sku: 'BHP-003',
                brand: 'Bayrom Parfums',
                inspiration: 'Carolina Herrera Good Girl',
                category: 'feminino',
                fragrance_family: 'floral',
                size_ml: 50,
                regular_price: 199.90,
                sale_price: 169.90,
                stock_quantity: 40,
                min_stock: 5,
                is_featured: true,
                status: 'active',
                tags: ['good girl', 'feminino', 'floral', 'sedutor'],
                notes: {
                    top: ['Amêndoa', 'Café'],
                    middle: ['Tuberosa', 'Jasmim Sambac'],
                    base: ['Baunilha', 'Cacao', 'Patchouli']
                },
                season: 'outono',
                occasion: ['formal', 'noite', 'romantico'],
                longevity: 'alta',
                intensity: 'intensa'
            },
            {
                name: 'BHP-004 - Inspiração Black Opium',
                slug: 'bhp-004-inspiracao-black-opium',
                description: 'Uma fragrância viciante com notas de café, baunilha, flores brancas e pera. Perfeita para mulheres ousadas e carismáticas.',
                short_description: 'Fragrância inspirada em YSL Black Opium - 50ml',
                sku: 'BHP-004',
                brand: 'Hugo Parfums',
                inspiration: 'Yves Saint Laurent Black Opium',
                category: 'feminino',
                fragrance_family: 'oriental',
                size_ml: 50,
                regular_price: 189.90,
                sale_price: 159.90,
                stock_quantity: 60,
                min_stock: 5,
                is_featured: false,
                status: 'active',
                tags: ['black opium', 'feminino', 'oriental', 'viciante'],
                notes: {
                    top: ['Pera', 'Laranja Ameixa'],
                    middle: ['Jasmim', 'Café'],
                    base: ['Baunilha', 'Patchouli', 'Cedro']
                },
                season: 'inverno',
                occasion: ['noite', 'festa', 'romantico'],
                longevity: 'alta',
                intensity: 'intensa'
            },
            {
                name: 'BHP-005 - Inspiração Baccarat Rouge',
                slug: 'bhp-005-inspiracao-baccarat-rouge',
                description: 'Uma fragrância luxuosa e única com notas de açafrão, ambrroxan, cedro e resina de jasmim. Sofisticada e inesquecível.',
                short_description: 'Fragrância inspirada em Baccarat Rouge 540 - 50ml',
                sku: 'BHP-005',
                brand: 'Bayrom Parfums',
                inspiration: 'Maison Francis Kurkdjian Baccarat Rouge 540',
                category: 'unisex',
                fragrance_family: 'oriental',
                size_ml: 50,
                regular_price: 219.90,
                sale_price: 189.90,
                stock_quantity: 30,
                min_stock: 3,
                is_featured: true,
                status: 'active',
                tags: ['baccarat', 'unisex', 'luxo', 'sofisticado'],
                notes: {
                    top: ['Açafrão', 'Jasmim'],
                    middle: ['Resina de Ambraxan', 'Cedro'],
                    base: ['Musgo de Carvalho', 'Vetiver']
                },
                season: 'todas',
                occasion: ['formal', 'noite', 'especial'],
                longevity: 'alta',
                intensity: 'intensa'
            }
        ]);

        console.log('✅ Dados iniciais inseridos com sucesso!');
        console.log(`📊 ${categories.length} categorias criadas`);
        console.log(`📦 ${products.length} produtos criados`);
        console.log('👤 Usuário administrador criado (admin@bayromhugoperfumes.com.br / admin123)');

    } catch (error) {
        console.error('❌ Erro ao inserir dados iniciais:', error);
        throw error;
    }
}

// Executar migração se chamado diretamente
if (require.main === module) {
    createTables()
        .then(() => {
            console.log('🎉 Migração concluída com sucesso!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Erro na migração:', error);
            process.exit(1);
        });
}

module.exports = { createTables, insertInitialData };
