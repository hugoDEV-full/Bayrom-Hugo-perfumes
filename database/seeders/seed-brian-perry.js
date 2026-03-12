// Script para popular o banco de dados com o catálogo Brian Perry
const { sequelize } = require('../../src/config/database');
const Product = require('../../src/models/Product');
const Category = require('../../src/models/Category');
const brianPerryPerfumes = require('./brian-perry-perfumes');

async function seedBrianPerryPerfumes() {
    try {
        console.log('🌟 Iniciando seed do catálogo Brian Perry Fragrances...');
        
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
        console.log('\n📊 RESUMO DO CATÁLOGO BRIAN PERRY:');
        console.log('='.repeat(50));
        
        const summary = {
            feminino: createdProducts.filter(p => p.category === 'feminino').length,
            masculino: createdProducts.filter(p => p.category === 'masculino').length,
            unisex: createdProducts.filter(p => p.category === 'unisex').length,
            featured: createdProducts.filter(p => p.is_featured).length,
            total: createdProducts.length
        };
        
        console.log(`🌸 Feminino: ${summary.feminino} produtos`);
        console.log(`👔 Masculino: ${summary.masculino} produtos`);
        console.log(`⚧️ Unisex: ${summary.unisex} produtos`);
        console.log(`⭐ Destaques: ${summary.featured} produtos`);
        console.log(`📦 Total: ${summary.total} produtos`);
        
        // Exibir produtos mais caros
        const mostExpensive = createdProducts
            .sort((a, b) => b.original_price - a.original_price)
            .slice(0, 3);
        
        console.log('\n💎 PRODUTOS MAIS PRECIOSOS:');
        mostExpensive.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - R$${product.original_price.toFixed(2)}`);
        });
        
        // Exibir composições milionárias
        const millionDollar = createdProducts.filter(p => 
            p.composition && p.composition.luxury_value.includes('$')
        );
        
        console.log(`\n💰 FRAGRÂNCIAS MILIONÁRIAS: ${millionDollar.length}`);
        millionDollar.forEach(product => {
            console.log(`   • ${product.name}: ${product.composition.luxury_value}`);
        });
        
        console.log('\n🎉 Catálogo Brian Perry populado com sucesso!');
        console.log('🌐 Site pronto para vender perfumes premium inspirados!');
        
        await sequelize.close();
        
    } catch (error) {
        console.error('❌ Erro ao popular catálogo:', error);
        process.exit(1);
    }
}

async function ensureCategories() {
    const categories = [
        { name: 'Feminino', slug: 'feminino', is_active: true },
        { name: 'Masculino', slug: 'masculino', is_active: true },
        { name: 'Unisex', slug: 'unisex', is_active: true }
    ];
    
    const createdCategories = {};
    
    for (const catData of categories) {
        const [category, created] = await Category.findOrCreate({
            where: { slug: catData.slug },
            defaults: catData
        });
        createdCategories[catData.slug] = category;
    }
    
    return createdCategories;
}

async function createProducts(categories) {
    const createdProducts = [];
    
    for (const perfumeData of brianPerryPerfumes) {
        try {
            // Preparar dados do produto
            const productData = {
                name: perfumeData.name,
                brand: perfumeData.brand,
                slug: generateSlug(perfumeData.name),
                category: perfumeData.category,
                fragrance_family: perfumeData.fragrance_family,
                inspiration: perfumeData.inspiration,
                original_price: perfumeData.original_price,
                sale_price: perfumeData.sale_price,
                description: perfumeData.description,
                notes_top: Array.isArray(perfumeData.notes.top) 
                    ? perfumeData.notes.top.join(', ') 
                    : perfumeData.notes.top,
                notes_middle: Array.isArray(perfumeData.notes.middle) 
                    ? perfumeData.notes.middle.join(', ') 
                    : perfumeData.notes.middle,
                notes_base: Array.isArray(perfumeData.notes.base) 
                    ? perfumeData.notes.base.join(', ') 
                    : perfumeData.notes.base,
                composition: perfumeData.composition ? JSON.stringify(perfumeData.composition) : null,
                sizes: JSON.stringify(perfumeData.sizes),
                stock: perfumeData.stock,
                is_featured: perfumeData.is_featured || false,
                status: perfumeData.status,
                image_url: perfumeData.image_url,
                rating_average: perfumeData.rating_average || 0,
                sales_count: perfumeData.sales_count || 0,
                created_at: new Date(),
                updated_at: new Date()
            };
            
            const [product, created] = await Product.findOrCreate({
                where: { slug: productData.slug },
                defaults: productData
            });
            
            if (created) {
                createdProducts.push(product);
                console.log(`✅ Produto criado: ${product.name}`);
            } else {
                // Atualizar produto existente
                await product.update(productData);
                createdProducts.push(product);
                console.log(`🔄 Produto atualizado: ${product.name}`);
            }
            
        } catch (error) {
            console.error(`❌ Erro ao criar produto ${perfumeData.name}:`, error.message);
        }
    }
    
    return createdProducts;
}

function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Executar seed
if (require.main === module) {
    seedBrianPerryPerfumes();
}

module.exports = { seedBrianPerryPerfumes };
