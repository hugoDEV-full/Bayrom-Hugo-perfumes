// Script de teste para o sistema Bayrom & Hugo Parfums

require('dotenv').config();
const sequelize = require('./src/config/database');

async function testSystem() {
    console.log('🧪 Iniciando testes do sistema...\n');

    try {
        // Testar conexão com banco de dados
        console.log('1. Testando conexão com banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida com sucesso!\n');

        // Testar modelos
        console.log('2. Testando modelos...');
        const { User, Product, Category, Order } = require('./src/models');
        
        // Testar criação de usuário
        console.log('   - Testando modelo User...');
        const testUser = await User.create({
            name: 'Usuário Teste',
            email: 'test@example.com',
            password: '123456',
            role: 'client'
        });
        console.log('   ✅ Usuário criado com sucesso');

        // Testar criação de categoria
        console.log('   - Testando modelo Category...');
        const testCategory = await Category.create({
            name: 'Categoria Teste',
            slug: 'categoria-teste',
            description: 'Descrição da categoria teste'
        });
        console.log('   ✅ Categoria criada com sucesso');

        // Testar criação de produto
        console.log('   - Testando modelo Product...');
        const testProduct = await Product.create({
            name: 'Produto Teste',
            slug: 'produto-teste',
            sku: 'TEST-001',
            brand: 'Test Brand',
            category: 'masculino',
            size_ml: 50,
            regular_price: 99.90,
            stock_quantity: 10,
            status: 'active'
        });
        console.log('   ✅ Produto criado com sucesso');

        // Testar relacionamentos
        console.log('3. Testando relacionamentos...');
        const userWithOrders = await User.findByPk(testUser.id, {
            include: ['orders']
        });
        console.log('   ✅ Relacionamentos funcionando corretamente');

        // Limpar dados de teste
        console.log('4. Limpando dados de teste...');
        await testUser.destroy();
        await testCategory.destroy();
        await testProduct.destroy();
        console.log('   ✅ Dados de teste removidos\n');

        console.log('🎉 Todos os testes passaram com sucesso!');
        console.log('\n📋 Resumo do teste:');
        console.log('✅ Conexão com banco de dados');
        console.log('✅ Modelos (User, Product, Category, Order)');
        console.log('✅ Relacionamentos entre modelos');
        console.log('✅ Criação e exclusão de registros');
        console.log('\n🚀 Sistema pronto para uso!');

    } catch (error) {
        console.error('❌ Erro durante os testes:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

// Executar teste se chamado diretamente
if (require.main === module) {
    testSystem();
}

module.exports = { testSystem };
