const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando banco de dados MySQL...');

// Configurações do banco
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    charset: 'utf8mb4'
};

async function setupDatabase() {
    let connection;
    
    try {
        // Conectar sem especificar banco para criar o banco
        console.log('📡 Conectando ao MySQL...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Conectado ao MySQL com sucesso!');
        
        // Criar banco de dados se não existir
        console.log('📦 Criando banco de dados...');
        await connection.execute('CREATE DATABASE IF NOT EXISTS bayrom_hugo_perfumes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        console.log('✅ Banco de dados criado com sucesso!');
        
        // Fechar conexão inicial
        await connection.end();
        
        // Conectar ao banco específico
        console.log('📡 Conectando ao banco bayrom_hugo_perfumes...');
        connection = await mysql.createConnection({
            ...dbConfig,
            database: 'bayrom_hugo_perfumes'
        });
        console.log('✅ Conectado ao banco específico!');
        
        // Criar tabelas manualmente
        console.log('🏗️ Criando tabelas...');
        
        // Tabela de usuários
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                role ENUM('admin', 'customer') DEFAULT 'customer',
                status ENUM('active', 'inactive') DEFAULT 'active',
                email_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de categorias
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                icon VARCHAR(50),
                sort_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                parent_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de produtos
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                short_description TEXT,
                brand VARCHAR(255) NOT NULL,
                category VARCHAR(50),
                price DECIMAL(10,2) NOT NULL,
                sale_price DECIMAL(10,2),
                cost_price DECIMAL(10,2),
                sku VARCHAR(100) UNIQUE,
                stock_quantity INT DEFAULT 0,
                track_stock BOOLEAN DEFAULT TRUE,
                featured_image VARCHAR(500),
                images JSON,
                tags VARCHAR(500),
                fragrance_family VARCHAR(100),
                inspiration VARCHAR(255),
                size_ml INT,
                concentration VARCHAR(50),
                ingredients TEXT,
                usage_instructions TEXT,
                is_featured BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
                meta_title VARCHAR(255),
                meta_description TEXT,
                sales_count INT DEFAULT 0,
                rating_average DECIMAL(3,2) DEFAULT 0,
                rating_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de avaliações
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                user_id INT,
                name VARCHAR(255),
                email VARCHAR(255),
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                title VARCHAR(255),
                comment TEXT,
                is_approved BOOLEAN DEFAULT FALSE,
                helpful_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de carrinhos
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS carts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                session_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de itens do carrinho
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS cart_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cart_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de pedidos
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
                payment_method VARCHAR(50),
                subtotal DECIMAL(10,2) NOT NULL,
                shipping_cost DECIMAL(10,2) DEFAULT 0,
                tax_amount DECIMAL(10,2) DEFAULT 0,
                discount_amount DECIMAL(10,2) DEFAULT 0,
                total_amount DECIMAL(10,2) NOT NULL,
                currency VARCHAR(3) DEFAULT 'BRL',
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(20),
                shipping_address JSON,
                billing_address JSON,
                tracking_number VARCHAR(100),
                notes TEXT,
                shipped_at TIMESTAMP NULL,
                delivered_at TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Tabela de itens do pedido
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                product_sku VARCHAR(100),
                quantity INT NOT NULL,
                unit_price DECIMAL(10,2) NOT NULL,
                total_price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        console.log('✅ Tabelas criadas com sucesso!');
        
        // Inserir dados iniciais
        console.log('📊 Inserindo dados iniciais...');
        
        // Categorias
        await connection.execute(`
            INSERT IGNORE INTO categories (name, slug, description, icon, sort_order, is_active) VALUES
            ('Perfumes Masculinos', 'perfumes-masculinos', 'Coleção de perfumes masculinos com fragrâncias marcantes e sofisticadas.', 'fa-male', 1, 1),
            ('Perfumes Femininos', 'perfumes-femininos', 'Perfumes femininos com notas delicadas e envolventes.', 'fa-female', 2, 1),
            ('Perfumes Unisex', 'perfumes-unisex', 'Fragrâncias versáteis que podem ser usadas por qualquer pessoa.', 'fa-venus-mars', 3, 1),
            ('Kits de Presente', 'kits-de-presente', 'Conjuntos especiais para presentear quem você ama.', 'fa-gift', 4, 1)
        `);
        
        // Produtos de exemplo
        await connection.execute(`
            INSERT IGNORE INTO products (name, slug, brand, category, price, sale_price, description, short_description, inspiration, fragrance_family, size_ml, concentration, is_featured, is_active, status, stock_quantity, sales_count, rating_average, rating_count) VALUES
            ('BP Chanel No. 5', 'bp-chanel-no-5', 'BP', 'feminino', 180.00, 180.00, 'Clássico atemporal com notas florais elegantes de jasmim, rosa e sândalo.', 'Fragrância floral icônica e sofisticada.', 'Chanel No. 5', 'floral', 100, 'eau de parfum', 1, 1, 'active', 50, 25, 4.5, 12),
            ('BP Bleu de Chanel', 'bp-bleu-de-chanel', 'BP', 'masculino', 220.00, 220.00, 'Fragrância woody aromática para o homem moderno com notas de grapefruit, menta e sândalo.', 'Elegância masculina em frasco.', 'Bleu de Chanel', 'woody', 100, 'eau de parfum', 1, 1, 'active', 30, 18, 4.8, 8),
            ('BP Creed Aventus', 'bp-creed-aventus', 'BP', 'masculino', 280.00, 280.00, 'Laranja, bergamota, abacaxi e patchouli criam uma fragrância poderosa e sofisticada.', 'Sucesso em frasco.', 'Creed Aventus', 'frutal', 100, 'eau de parfum', 1, 1, 'active', 20, 32, 4.9, 15),
            ('BP Black Opium', 'bp-black-opium', 'BP', 'feminino', 190.00, 190.00, 'Café, baunilha e flores brancas criam uma fragrância viciante e misteriosa.', 'Paixão intensa.', 'YSL Black Opium', 'oriental', 90, 'eau de parfum', 1, 1, 'active', 40, 28, 4.6, 10),
            ('BP Sauvage', 'bp-sauvage', 'BP', 'masculino', 200.00, 180.00, 'Notas ambéreas intensas com pimenta, bergamota e âmbar para uma presença marcante.', 'Força selvagem.', 'Dior Sauvage', 'ambar', 100, 'eau de toilette', 1, 1, 'active', 35, 22, 4.7, 9),
            ('BP J''adore', 'bp-jadore', 'BP', 'feminino', 160.00, 160.00, 'Buquê floral com ylang-ylang, damasco e jasmim para uma fragrância radiante.', 'Feminilidade em flor.', 'Dior J''adore', 'floral', 100, 'eau de parfum', 1, 1, 'active', 45, 15, 4.4, 7),
            ('BP Good Girl', 'bp-good-girl', 'BP', 'feminino', 210.00, 210.00, 'Amêndoa, café, baunilha e tuberosa em uma fragrância dual e sedutora.', 'Beleza poderosa.', 'Carolina Herrera Good Girl', 'oriental', 80, 'eau de parfum', 1, 1, 'active', 25, 20, 4.6, 11),
            ('BP Le Male', 'bp-le-male', 'BP', 'masculino', 170.00, 170.00, 'Menta, lavanda e baunilha criam uma fragrância clássica e moderna.', 'O homem moderno.', 'Jean Paul Gaultier Le Male', 'ambar', 125, 'eau de toilette', 1, 1, 'active', 30, 12, 4.3, 6)
        `);
        
        console.log('✅ Dados iniciais inseridos com sucesso!');
        
        // Criar usuário admin
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await connection.execute(`
            INSERT IGNORE INTO users (name, email, password, role, status, email_verified) VALUES
            ('Administrador', 'admin@bayromhugo.com.br', ?, 'admin', 'active', 1)
        `, [hashedPassword]);
        
        console.log('✅ Usuário admin criado (admin@bayromhugo.com.br / admin123)');
        
        await connection.end();
        
        console.log('');
        console.log('🎉 Banco de dados configurado com sucesso!');
        console.log('');
        console.log('📋 Resumo:');
        console.log('  • Banco: bayrom_hugo_perfumes');
        console.log('  • 8 produtos de exemplo');
        console.log('  • 4 categorias');
        console.log('  • Usuário admin: admin@bayromhugo.com.br / admin123');
        console.log('');
        console.log('🚀 Execute "npm start" para iniciar o servidor!');
        
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('');
            console.log('💡 Dica: Verifique se o MySQL está instalado e rodando.');
            console.log('   • Instale XAMPP ou WAMP para MySQL local');
            console.log('   • Inicie o serviço MySQL');
            console.log('   • Execute este script novamente');
        }
        
        if (connection) {
            await connection.end();
        }
        process.exit(1);
    }
}

// Executar configuração
setupDatabase();
