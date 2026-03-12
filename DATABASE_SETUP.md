# Configuração do Banco de Dados - Bayrom & Hugo Parfums

## 🚀 Início Rápido (Recomendado)

### Opção 1: Usar Docker (Mais Fácil)

1. **Instale o Docker Desktop**
   - Baixe em: https://www.docker.com/products/docker-desktop
   - Instale e inicie o Docker Desktop

2. **Execute o script de inicialização**
   ```bash
   # No Windows
   start-database.bat
   
   # Ou manualmente:
   docker-compose up -d
   node create-admin.js
   ```

3. **Inicie o servidor**
   ```bash
   npm start
   ```

4. **Acesse o sistema**
   - Site: http://localhost:3000
   - Admin: admin@bayromhugo.com.br / admin123

---

## 📋 Configurações do Banco

### MySQL via Docker
- **Host:** localhost
- **Porta:** 3306
- **Usuário:** bayrom_user
- **Senha:** bayrom_pass
- **Banco:** bayrom_hugo_perfumes

### Dados Incluídos
- ✅ 8 produtos de exemplo
- ✅ 4 categorias
- ✅ Usuário administrador
- ✅ Estrutura completa de tabelas

---

## 🔧 Configuração Manual

### Se preferir usar MySQL local:

1. **Instale XAMPP ou WAMP**
   - XAMPP: https://www.apachefriends.org/pt_br/download.html
   - WAMP: https://www.wampserver.com/

2. **Inicie o serviço MySQL**

3. **Execute o script de configuração**
   ```bash
   node setup-mysql.js
   ```

4. **Atualize as credenciais** (se necessário)
   Edite `src/config/database.js` com suas credenciais MySQL

---

## 🗄️ Estrutura do Banco

### Tabelas Principais
- `users` - Usuários e administradores
- `categories` - Categorias de produtos
- `products` - Produtos e perfumes
- `reviews` - Avaliações de produtos
- `carts` - Carrinhos de compras
- `cart_items` - Itens do carrinho
- `orders` - Pedidos
- `order_items` - Itens dos pedidos

### Relacionamentos
- Usuários → Pedidos (1:N)
- Categorias → Produtos (1:N)
- Produtos → Avaliações (1:N)
- Pedidos → Itens do Pedido (1:N)
- Carrinhos → Itens do Carrinho (1:N)

---

## 🛠️ Comandos Úteis

### Docker
```bash
# Iniciar banco
docker-compose up -d

# Parar banco
docker-compose down

# Ver logs
docker-compose logs mysql

# Acessar MySQL diretamente
docker exec -it bayrom-mysql mysql -u bayrom_user -p bayrom_hugo_perfumes
```

### Backup e Restore
```bash
# Backup
docker exec bayrom-mysql mysqldump -u bayrom_user -p'bayrom_pass' bayrom_hugo_perfumes > backup.sql

# Restore
docker exec -i bayrom-mysql mysql -u bayrom_user -p'bayrom_pass' bayrom_hugo_perfumes < backup.sql
```

---

## 🔍 Verificação

### Testar conexão
```bash
node -e "
const sequelize = require('./src/config/database');
sequelize.authenticate()
  .then(() => console.log('✅ Conexão bem-sucedida!'))
  .catch(err => console.error('❌ Erro de conexão:', err.message));
"
```

### Verificar dados
```bash
# Contar produtos
docker exec bayrom-mysql mysql -u bayrom_user -p'bayrom_pass' -e "SELECT COUNT(*) as total FROM bayrom_hugo_perfumes.products;"

# Listar categorias
docker exec bayrom-mysql mysql -u bayrom_user -p'bayrom_pass' -e "SELECT * FROM bayrom_hugo_perfumes.categories;"
```

---

## 🚨 Solução de Problemas

### Erro: "Access denied"
- Verifique se o Docker está rodando
- Execute `docker-compose up -d` novamente
- Aguarde 30 segundos para o MySQL inicializar

### Erro: "Port 3306 already in use"
- Outro MySQL está rodando
- Pare o serviço MySQL local ou use outra porta

### Erro: "Container not found"
- Execute `docker-compose down` e depois `docker-compose up -d`

### Erro: "Node modules not found"
- Execute `npm install` antes dos outros comandos

---

## 📞 Suporte

Se tiver problemas:
1. Verifique se o Docker Desktop está rodando
2. Execute `docker-compose ps` para verificar containers
3. Execute `docker-compose logs mysql` para ver erros
4. Reinicie tudo: `docker-compose down && docker-compose up -d`

---

## 🔄 Ambiente de Produção

Para produção (Railway, Heroku, etc.):
- Use variável de ambiente `DATABASE_URL`
- Formato: `mysql://user:password@host:port/database`
- Não precisa de Docker local

Exemplo:
```bash
export DATABASE_URL="mysql://user:password@host:port/bayrom_hugo_perfumes"
npm start
```
