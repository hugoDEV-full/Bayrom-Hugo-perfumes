const { Sequelize } = require('sequelize');

// Configuração para Railway (DATABASE_URL) ou ambiente local
let sequelize;

if (process.env.DATABASE_URL) {
    console.log('🌍 Ambiente de produção detectado - Configurando MySQL via DATABASE_URL');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 3,
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
    console.log('💻 Ambiente local detectado - Configurando SQLite');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    });
}

module.exports = sequelize;
