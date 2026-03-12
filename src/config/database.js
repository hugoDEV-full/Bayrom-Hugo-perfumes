const { Sequelize } = require('sequelize');

// Configuração para Railway (DATABASE_URL) ou ambiente local
let sequelize;

// Detectar ambiente de produção (Railway, Heroku, etc.)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;

if (isProduction && process.env.DATABASE_URL) {
    // Em produção com DATABASE_URL, usar MySQL
    console.log('🌍 Usando MySQL em produção');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: console.log,
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
    // Configuração local ou produção sem DATABASE_URL - usar SQLite
    console.log('💻 Usando SQLite');
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
}

module.exports = sequelize;
