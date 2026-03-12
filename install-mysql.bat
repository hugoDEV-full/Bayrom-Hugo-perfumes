@echo off
echo ========================================
echo  Instalador MySQL para Bayrom Hugo
echo ========================================
echo.

echo [1/3] Verificando se XAMPP esta instalado...
if exist "C:\xampp\mysql\bin\mysqld.exe" (
    echo ✅ XAMPP encontrado em C:\xampp\
    set MYSQL_PATH=C:\xampp\mysql\bin
) else if exist "D:\xampp\mysql\bin\mysqld.exe" (
    echo ✅ XAMPP encontrado em D:\xampp\
    set MYSQL_PATH=D:\xampp\mysql\bin
) else (
    echo ❌ XAMPP nao encontrado!
    echo.
    echo Por favor, instale o XAMPP primeiro:
    echo https://www.apachefriends.org/pt_br/download.html
    echo.
    echo Depois de instalar, execute este script novamente.
    pause
    exit /b 1
)

echo.
echo [2/3] Iniciando servico MySQL...
cd /d "%MYSQL_PATH%"
start /B mysqld --console
timeout /t 3 >nul

echo.
echo [3/3] Configurando banco de dados...
cd /d "%~dp0"
node setup-mysql.js

echo.
echo ========================================
echo  Instalacao concluida!
echo ========================================
echo.
echo 🚀 Execute "npm start" para iniciar o servidor
echo.
pause
