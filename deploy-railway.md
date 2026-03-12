# Deploy no Railway - Bayrom & Hugo Parfums

## 🚀 Como Fazer o Deploy

### Passo 1: Preparar Repositório Git
```bash
# O repositório já está preparado com:
git init
git add .
git commit -m "Implementacao completa do site"
```

### Passo 2: Fazer Deploy no Railway

#### Opção A: Via Interface Web (Recomendado)
1. Acesse: https://railway.app/new
2. Conecte sua conta GitHub
3. Selecione o repositório `Bayrom-Hugo-perfumes`
4. Railway detectará automaticamente o projeto Node.js
5. Configure as variáveis de ambiente:
   ```
   NODE_ENV=production
   DATABASE_URL=mysql://root:password@containers-us-west-xxx.railway.app:7913/railway
   SESSION_SECRET=sua-chave-secreta-aqui
   ```
6. Clique em "Deploy"

#### Opção B: Via CLI
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Criar projeto
railway new

- Fazer deploy
railway up
```

### Passo 3: Configurar Variáveis de Ambiente

No painel do Railway, vá em Settings → Variables e adicione:

```
NODE_ENV=production
SESSION_SECRET=bayrom-hugo-perfumes-secret-2024
```

### Passo 4: Configurar Banco de Dados

O Railway criará automaticamente um banco MySQL. Você precisa:

1. Copiar a URL do banco (disponível em Settings → Variables)
2. Adicionar ao .env ou variáveis de produção:
   ```
   DATABASE_URL=mysql://usuario:senha@host:porta/nome_banco
   ```

### Passo 5: Executar Migrations

Após o deploy, você precisa criar as tabelas:

1. Abra o Railway Console (Settings → Console)
2. Execute:
   ```bash
   node quick-setup.js
   ```

Ou configure para executar automaticamente no deploy adicionando ao package.json:
```json
{
  "scripts": {
    "start": "node server.js",
    "deploy": "node quick-setup.js && npm start"
  }
}
```

## 📋 Arquivos de Deploy Configurados

### ✅ railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10,
    "healthcheckPath": "/health"
  }
}
```

### ✅ nixpacks.toml
```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.build]
cmds = ["npm install --omit=dev"]

[start]
cmd = "npm start"
```

### ✅ Procfile
```
web: npm start
```

## 🔍 Verificação

Após o deploy, verifique:

1. **Health Check**: `https://seu-app.railway.app/health`
2. **Site Principal**: `https://seu-app.railway.app/`
3. **Lista de Produtos**: `https://seu-app.railway.app/products`
4. **Painel Admin**: `https://seu-app.railway.app/admin`

## 🚨 Problemas Comuns

### Erro: "Database connection failed"
- Verifique se DATABASE_URL está configurada corretamente
- Execute as migrations no console

### Erro: "Application not starting"
- Verifique os logs no Railway
- Confirme se todas as dependências estão instaladas

### Erro: "Static files not found"
- Verifique se a pasta `public` está sendo servida corretamente
- Confirme o caminho dos arquivos estáticos

## 📊 Monitoramento

- **Logs**: Disponíveis no painel do Railway
- **Métricas**: Uso de CPU, memória e tráfego
- **Health Check**: Endpoint `/health` para monitoramento

## 🔄 Deploy Automático

Configure deploy automático:
1. No GitHub, vá para Settings → Webhooks
2. Adicione webhook do Railway
3. Toda push para main fará deploy automático

## 💡 Dicas

- Use variáveis de ambiente para dados sensíveis
- Mantenha o banco de dados atualizado
- Monitore os logs regularmente
- Configure domínio personalizado se necessário

---

## 🎯 Status Atual

✅ **Projeto pronto para deploy**
✅ **Arquivos de configuração criados**
✅ **Git configurado e commitado**
✅ **Banco de dados SQLite local funcionando**
✅ **Sistema completo testado localmente**

**Próximo passo:** Fazer upload para GitHub e deploy no Railway!
