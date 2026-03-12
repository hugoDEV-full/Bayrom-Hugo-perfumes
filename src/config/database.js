const { Sequelize } = require('sequelize');

// Configuração para Railway (DATABASE_URL) ou ambiente local
let sequelize;

if (process.env.DATABASE_URL) {
    // Railway usa DATABASE_URL no formato: mysql://user:password@host:port/database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 10,
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
    // Configuração local com SQLite para desenvolvimento
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    });
}

module.exports = sequelize;
