@echo off
echo ========================================
echo  Iniciando Banco de Dados MySQL
echo  Bayrom & Hugo Parfums
echo ========================================
echo.

echo [1/3] Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker nao encontrado!
    echo.
    echo Por favor, instale o Docker Desktop primeiro:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)
echo ✅ Docker encontrado

echo.
echo [2/3] Iniciando container MySQL...
cd /d "%~dp0"
docker-compose up -d

echo.
echo [3/3] Aguardando MySQL inicializar...
timeout /t 10 >nul

echo.
echo [4/4] Inserindo usuario admin...
node create-admin.js

echo.
echo ========================================
echo  ✅ Banco de dados pronto!
echo ========================================
echo.
echo 📊 MySQL rodando em: localhost:3306
echo 👤 Usuario: bayrom_user
echo 🔑 Senha: bayrom_pass
echo 🗄️  Banco: bayrom_hugo_perfumes
echo.
echo 🚀 Execute "npm start" para iniciar o servidor
echo.
pause
