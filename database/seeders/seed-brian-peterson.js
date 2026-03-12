// Script para popular o banco de dados com o catálogo Brian Peterson
const { sequelize } = require('../../src/config/database');
const Product = require('../../src/models/Product');
const Category = require('../../src/models/Category');
const brianPetersonPerfumes = require('./brian-peterson-perfumes');

async function seedBrianPetersonPerfumes() {
    try {
        console.log('🌟 Iniciando seed do catálogo Brian Peterson...');
        
        // Conectar ao banco de dados
        await sequelize.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida');
        
        // Sincronizar modelos
        await sequelize.sync({ force: false });
        console.log('✅ Modelos sincronizados');
        
        // Verificar se as categorias existem
        const categories = await ensureCategories();
        console.log('✅ Categorias verificadas/criadas');
        
        // Popular produtos
        const createdProducts = await createProducts(categories);
        console.log(`✅ ${createdProducts.length} produtos criados com sucesso`);
        
        // Exibir resumo
        console.log('\n📊 RESUMO DO CATÁLOGO BRIAN PETERSON:');
        console.log('='.repeat(60));
        
        const resumo = {
            'masculino': createdProducts.filter(p => p.category === 'masculino').length,
            'feminino': createdProducts.filter(p => p.category === 'feminino').length,
            'unisex': createdProducts.filter(p => p.category === 'unisex').length,
            'total': createdProducts.length
        };
        
        console.log(`👔 Masculino: ${resumo.masculino} produtos`);
        console.log(`👗 Feminino: ${resumo.feminino} produtos`);
        console.log(`⚧️ Unisex: ${resumo.unisex} produtos`);
        console.log(`📦 Total: ${resumo.total} produtos`);
        
        const valorTotal = createdProducts.reduce((sum, p) => sum + (p.sale_price || 0), 0);
        console.log(`💰 Valor total do catálogo: R$ ${valorTotal.toFixed(2)}`);
        
        // Exibir produtos mais caros
        console.log('\n💎 PRODUTOS MAIS VALIOSOS:');
        const maisCaros = createdProducts
            .sort((a, b) => (b.sale_price || 0) - (a.sale_price || 0))
            .slice(0, 5);
        
        maisCaros.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.name} - R$ ${produto.sale_price}`);
        });
        
        // Exibir produtos mais vendidos
        console.log('\n🔥 PRODUTOS MAIS VENDIDOS:');
        const maisVendidos = createdProducts
            .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
            .slice(0, 5);
        
        maisVendidos.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.name} - ${produto.sales_count} vendas`);
        });
        
        console.log('\n🎉 Catálogo Brian Peterson populado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao popular catálogo:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

async function ensureCategories() {
    const categories = [
        { name: 'Masculino', slug: 'masculino', is_active: true },
        { name: 'Feminino', slug: 'feminino', is_active: true },
        { name: 'Unisex', slug: 'unisex', is_active: true }
    ];
    
    const createdCategories = {};
    
    for (const catData of categories) {
        const [category, created] = await Category.findOrCreate({
            where: { slug: catData.slug },
            defaults: catData
        });
        
        createdCategories[catData.slug] = category;
        console.log(`${created ? '✓' : '◦'} Categoria: ${category.name}`);
    }
    
    return createdCategories;
}

async function createProducts(categories) {
    const createdProducts = [];
    
    for (const perfumeData of brianPetersonPerfumes) {
        try {
            // Verificar se o produto já existe pelo slug
            const existingProduct = await Product.findOne({
                where: { slug: perfumeData.slug }
            });
            
            if (existingProduct) {
                // Atualizar produto existente
                await existingProduct.update(perfumeData);
                createdProducts.push(existingProduct);
                console.log(`◦ Produto atualizado: ${perfumeData.name}`);
            } else {
                // Criar novo produto
                const product = await Product.create({
                    ...perfumeData,
                    status: 'active',
                    created_at: new Date(),
                    updated_at: new Date()
                });
                
                createdProducts.push(product);
                console.log(`✓ Produto criado: ${perfumeData.name}`);
            }
        } catch (error) {
            console.error(`❌ Erro ao criar produto ${perfumeData.name}:`, error.message);
        }
    }
    
    return createdProducts;
}

// Executar o seed
if (require.main === module) {
    seedBrianPetersonPerfumes()
        .then(() => {
            console.log('\n🎉 Processo concluído com sucesso!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Falha no processo:', error);
            process.exit(1);
        });
}

module.exports = { seedBrianPetersonPerfumes };
