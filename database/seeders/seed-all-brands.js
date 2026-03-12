// Script para popular o banco de dados com todas as marcas de perfumes
const { sequelize } = require('../../src/config/database');
const Product = require('../../src/models/Product');
const Category = require('../../src/models/Category');
const allBrandsPerfumes = require('./all-brands-perfumes');

async function seedAllBrandsPerfumes() {
    try {
        console.log('🌟 Iniciando seed do catálogo completo de marcas...');
        
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
        
        // Exibir resumo detalhado
        console.log('\n📊 RESUMO COMPLETO DO CATÁLOGO:');
        console.log('='.repeat(80));
        
        // Agrupar por marca
        const marcas = {};
        createdProducts.forEach(product => {
            const marca = product.inspiration || product.brand;
            if (!marcas[marca]) {
                marcas[marca] = [];
            }
            marcas[marca].push(product);
        });
        
        // Exibir estatísticas por marca
        console.log('\n🏭 PRODUTOS POR MARCA:');
        Object.keys(marcas).sort().forEach(marca => {
            const produtos = marcas[marca];
            const valorTotal = produtos.reduce((sum, p) => sum + (p.sale_price || 0), 0);
            const mediaVendas = produtos.reduce((sum, p) => sum + (p.sales_count || 0), 0) / produtos.length;
            console.log(`\n📌 ${marca}:`);
            console.log(`   • Produtos: ${produtos.length}`);
            console.log(`   • Valor total: R$ ${valorTotal.toFixed(2)}`);
            console.log(`   • Média vendas: ${mediaVendas.toFixed(0)}`);
            console.log(`   • Produtos em destaque: ${produtos.filter(p => p.is_featured).length}`);
            
            // Top 3 produtos da marca
            const topProdutos = produtos
                .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
                .slice(0, 3);
            
            topProdutos.forEach((produto, index) => {
                console.log(`     ${index + 1}. ${produto.name} - R$ ${produto.sale_price} (${produto.sales_count} vendas)`);
            });
        });
        
        // Estatísticas gerais
        const resumo = {
            'masculino': createdProducts.filter(p => p.category === 'masculino').length,
            'feminino': createdProducts.filter(p => p.category === 'feminino').length,
            'unisex': createdProducts.filter(p => p.category === 'unisex').length,
            'total': createdProducts.length
        };
        
        console.log('\n📈 ESTATÍSTICAS GERAIS:');
        console.log(`👔 Masculino: ${resumo.masculino} produtos`);
        console.log(`👗 Feminino: ${resumo.feminino} produtos`);
        console.log(`⚧️ Unisex: ${resumo.unisex} produtos`);
        console.log(`📦 Total: ${resumo.total} produtos`);
        console.log(`🏷️ Marcas: ${Object.keys(marcas).length}`);
        
        const valorTotal = createdProducts.reduce((sum, p) => sum + (p.sale_price || 0), 0);
        const totalVendas = createdProducts.reduce((sum, p) => sum + (p.sales_count || 0), 0);
        console.log(`💰 Valor total do catálogo: R$ ${valorTotal.toFixed(2)}`);
        console.log(`🔥 Total de vendas: ${totalVendas}`);
        
        // Top 10 produtos mais vendidos
        console.log('\n🏆 TOP 10 PRODUTOS MAIS VENDIDOS:');
        const maisVendidos = createdProducts
            .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
            .slice(0, 10);
        
        maisVendidos.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.name} - ${produto.sales_count} vendas - R$ ${produto.sale_price}`);
        });
        
        // Top 10 produtos mais caros
        console.log('\n💎 TOP 10 PRODUTOS MAIS VALIOSOS:');
        const maisCaros = createdProducts
            .sort((a, b) => (b.sale_price || 0) - (a.sale_price || 0))
            .slice(0, 10);
        
        maisCaros.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.name} - R$ ${produto.sale_price} (${produto.inspiration})`);
        });
        
        // Produtos por faixa de preço
        const faixas = {
            'Econômico (R$ 100-150)': 0,
            'Intermediário (R$ 151-200)': 0,
            'Premium (R$ 201-300)': 0,
            'Luxo (R$ 301-400)': 0,
            'Ultra Luxo (R$ 401+)': 0
        };
        
        createdProducts.forEach(produto => {
            const preco = produto.sale_price || 0;
            if (preco <= 150) faixas['Econômico (R$ 100-150)']++;
            else if (preco <= 200) faixas['Intermediário (R$ 151-200)']++;
            else if (preco <= 300) faixas['Premium (R$ 201-300)']++;
            else if (preco <= 400) faixas['Luxo (R$ 301-400)']++;
            else faixas['Ultra Luxo (R$ 401+)']++;
        });
        
        console.log('\n💵 DISTRIBUIÇÃO POR FAIXA DE PREÇO:');
        Object.entries(faixas).forEach(([faixa, quantidade]) => {
            const percentual = (quantidade / resumo.total * 100).toFixed(1);
            console.log(`${faixa}: ${quantidade} produtos (${percentual}%)`);
        });
        
        // Famílias olfativas
        const familias = {};
        createdProducts.forEach(produto => {
            const familia = produto.fragrance_family || 'Não classificado';
            familias[familia] = (familias[familia] || 0) + 1;
        });
        
        console.log('\n🌸 FAMÍLIAS OL FATIVAS:');
        Object.entries(familias)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([familia, quantidade]) => {
                const percentual = (quantidade / resumo.total * 100).toFixed(1);
                console.log(`${familia}: ${quantidade} produtos (${percentual}%)`);
            });
        
        console.log('\n🎉 Catálogo completo de marcas populado com sucesso!');
        console.log(`📍 Total de ${resumo.total} produtos de ${Object.keys(marcas).length} marcas disponíveis!`);
        
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
    
    for (const perfumeData of allBrandsPerfumes) {
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
    seedAllBrandsPerfumes()
        .then(() => {
            console.log('\n🎉 Processo concluído com sucesso!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Falha no processo:', error);
            process.exit(1);
        });
}

module.exports = { seedAllBrandsPerfumes };
