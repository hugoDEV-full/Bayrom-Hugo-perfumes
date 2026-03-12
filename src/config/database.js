const { Sequelize } = require('sequelize');

// Configuração para Railway (DATABASE_URL) ou ambiente local
let sequelize;

// Forçar SQLite para garantir funcionamento
console.log('💻 Forçando SQLite para garantir compatibilidade');

sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log,
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
    }
});

module.exports = sequelize;
