const { createTables } = require('../migrations/001-create-initial-tables');

async function runSeeds() {
    try {
        console.log('🌱 Iniciando seeds do banco de dados...');
        
        // Executar migração e seeds
        await createTables();
        
        console.log('✅ Seeds executados com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao executar seeds:', error);
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    runSeeds();
}

module.exports = { runSeeds };
