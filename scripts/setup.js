// Script de setup inicial do projeto

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando projeto Bayrom & Hugo Parfums...\n');

// Criar diretórios necessários
const directories = [
    'public/images/products',
    'public/images/categories',
    'public/images/banners',
    'public/images/logos',
    'uploads/products',
    'uploads/orders',
    'uploads/temp',
    'logs'
];

console.log('1. Criando diretórios...');
directories.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`   ✅ Criado: ${dir}`);
    } else {
        console.log(`   ℹ️  Já existe: ${dir}`);
    }
});

// Criar arquivo .env se não existir
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('   ✅ Arquivo .env criado a partir do exemplo');
} else if (fs.existsSync(envPath)) {
    console.log('   ℹ️  Arquivo .env já existe');
}

// Criar arquivo .gitignore se não existir
const gitignorePath = path.join(__dirname, '..', '.gitignore');
const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output/

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Uploads
uploads/
!uploads/.gitkeep

# Database
*.sqlite
*.db

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
tmp/
temp/
`;

if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('   ✅ Arquivo .gitignore criado');
} else {
    console.log('   ℹ️  Arquivo .gitignore já existe');
}

// Criar arquivos .gitkeep em diretórios vazios
const keepDirs = [
    'public/images/products',
    'public/images/categories',
    'public/images/banners',
    'public/images/logos',
    'uploads/products',
    'uploads/orders',
    'uploads/temp',
    'logs'
];

console.log('\n2. Criando arquivos .gitkeep...');
keepDirs.forEach(dir => {
    const keepFile = path.join(__dirname, '..', dir, '.gitkeep');
    if (!fs.existsSync(keepFile)) {
        fs.writeFileSync(keepFile, '');
        console.log(`   ✅ Criado: ${dir}/.gitkeep`);
    }
});

// Verificar configurações
console.log('\n3. Verificando configurações...');

// Verificar se o MySQL está disponível (opcional)
try {
    const mysql = require('mysql2');
    console.log('   ✅ MySQL2 instalado');
} catch (error) {
    console.log('   ⚠️  MySQL2 não encontrado. Execute: npm install mysql2');
}

// Verificar se as dependências principais estão instaladas
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredDeps = ['express', 'ejs', 'sequelize', 'mysql2'];
    
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`   ✅ ${dep} instalado`);
        } else {
            console.log(`   ⚠️  ${dep} não encontrado em package.json`);
        }
    });
}

// Instruções finais
console.log('\n🎉 Setup concluído!\n');
console.log('📋 Próximos passos:');
console.log('1. Configure as variáveis de ambiente no arquivo .env');
console.log('2. Crie o banco de dados MySQL:');
console.log('   CREATE DATABASE bayrom_hugo_perfumes;');
console.log('3. Execute as migrações:');
console.log('   npm run migrate');
console.log('4. Inicie o servidor:');
console.log('   npm run dev');
console.log('\n🌐 Acesse:');
console.log('   Site: http://localhost:3000');
console.log('   Admin: http://localhost:3000/admin');
console.log('   Email: admin@bayromhugoperfumes.com.br');
console.log('   Senha: admin123');
console.log('\n📚 Para mais informações, consulte o README.md');
