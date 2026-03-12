const { Sequelize } = require('sequelize');

// Configuração para Railway (DATABASE_URL) ou ambiente local
let sequelize;

// Detectar ambiente de produção (Railway, Heroku, etc.)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT || process.env.DATABASE_URL;

if (isProduction) {
    // Em produção, sempre usar MySQL
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
        console.log('⚠️  DATABASE_URL não encontrada, usando configuração padrão MySQL');
        // Fallback para MySQL padrão do Railway
        sequelize = new Sequelize('railway', 'root', '', {
            host: 'containers-us-west-xxx.railway.app',
            port: 7913,
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
        // Railway usa DATABASE_URL no formato: mysql://user:password@host:port/database
        sequelize = new Sequelize(databaseUrl, {
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
    }
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
