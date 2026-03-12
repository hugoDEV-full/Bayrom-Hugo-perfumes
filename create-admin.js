const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function createAdmin() {
    let connection;
    
    try {
        // Conectar ao MySQL
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'bayrom_user',
            password: 'bayrom_pass',
            database: 'bayrom_hugo_perfumes'
        });
        
        console.log('📡 Conectado ao banco de dados');
        
        // Hash da senha
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        // Inserir usuário admin
        await connection.execute(`
            INSERT IGNORE INTO users (name, email, password, role, status, email_verified) VALUES
            ('Administrador', 'admin@bayromhugo.com.br', ?, 'admin', 'active', 1)
        `, [hashedPassword]);
        
        console.log('✅ Usuário admin criado com sucesso!');
        console.log('   📧 Email: admin@bayromhugo.com.br');
        console.log('   🔑 Senha: admin123');
        
        await connection.end();
        
    } catch (error) {
        console.error('❌ Erro ao criar usuário admin:', error.message);
        if (connection) {
            await connection.end();
        }
    }
}

createAdmin();
