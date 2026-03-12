# Bayrom & Hugo Parfums - Loja Virtual de Perfumes

Uma plataforma de e-commerce completa para venda de perfumes premium, desenvolvida com Node.js, EJS, Bootstrap e MySQL.

## 🌟 Features

### 📦 Gestão de Produtos
- Catálogo completo de perfumes com categorias
- Sistema de variedades (tamanhos, fragrâncias)
- Controle de estoque automatizado
- Preços promocionais e descontos
- Sistema de avaliações e rating

### 🛒 Carrinho e Pedidos
- Carrinho de compras persistente
- Múltiplos métodos de pagamento
- Cálculo automático de frete
- Histórico completo de pedidos
- Status de rastreamento

### 👥 Gestão de Clientes
- Sistema de registro e login
- Perfis de cliente completos
- Lista de desejos (wishlist)
- Múltiplos endereços de entrega
- Histórico de compras

### 💳 Pagamentos
- Integração com Stripe
- Integração com Mercado Pago
- Pagamento via Boleto
- PIX
- Cartão de crédito/débito

### 📦 Logística
- Integração com Correios
- Cálculo de frete automático
- Geração de etiquetas
- Rastreamento de encomendas
- Múltiplos métodos de envio

### 📊 Painel Administrativo
- Dashboard completo com estatísticas
- Gestão de produtos e categorias
- Gestão de pedidos e clientes
- Relatórios de vendas
- Controle financeiro

### 🎨 Design e UX
- Interface responsiva e moderna
- Otimizada para mobile
- Busca avançada com filtros
- Página de detalhes do produto
- Processo de checkout simplificado

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Multer** - Upload de arquivos
- **Nodemailer** - Envio de emails

### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Ícones
- **JavaScript Vanilla** - Interatividade

### APIs e Integrações
- **Stripe** - Pagamentos internacionais
- **Mercado Pago** - Pagamentos locais
- **Correios** - Cálculo de frete e envio
- **Puppeteer** - Geração de PDFs
- **PDFKit** - Criação de documentos

## 📋 Pré-requisitos

- Node.js 16+ 
- MySQL 8.0+
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/hugoDEV-full/Bayrom-Hugo-perfumes.git
cd Bayrom-Hugo-perfumes
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
- Crie um banco de dados MySQL chamado `bayrom_hugo_perfumes`
- Copie `.env.example` para `.env`
- Configure as variáveis de ambiente no arquivo `.env`

4. **Execute as migrações**
```bash
npm run migrate
```

5. **Inicie o servidor**
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

6. **Acesse a aplicação**
- Site: http://localhost:3000
- Painel Admin: http://localhost:3000/admin

## 🔐 Credenciais Padrão

**Usuário Administrador:**
- Email: admin@bayromhugoperfumes.com.br
- Senha: admin123

## 📁 Estrutura do Projeto

```
Bayrom-Hugo-perfumes/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── models/         # Modelos do banco de dados
│   ├── routes/         # Rotas da API
│   ├── middleware/     # Middleware personalizado
│   ├── config/         # Arquivos de configuração
│   └── utils/          # Funções utilitárias
├── views/
│   ├── client/         # Views do site
│   ├── admin/          # Views do painel admin
│   ├── emails/         # Templates de email
│   └── partials/       # Componentes reutilizáveis
├── public/
│   ├── css/            # Arquivos CSS
│   ├── js/             # Arquivos JavaScript
│   └── images/         # Imagens estáticas
├── database/
│   ├── migrations/     # Migrações do banco
│   └── seeders/        # Dados iniciais
├── uploads/            # Arquivos enviados
└── logs/               # Logs da aplicação
```

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# Servidor
NODE_ENV=development
PORT=3000
SESSION_SECRET=sua-chave-secreta

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bayrom_hugo_perfumes
DB_USER=root
DB_PASSWORD=sua-senha

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-app

# Pagamentos
STRIPE_SECRET_KEY=sk_test_...
MERCADO_PAGO_ACCESS_TOKEN=TEST-...

# Correios
CORREIOS_TOKEN=seu-token
CORREIOS_CARTAO_POSTAGEM=seu-cartao
```

### Configuração de Email

1. Configure um email Gmail
2. Ative a verificação em duas etapas
3. Gere uma senha de aplicativo
4. Use essa senha na variável `EMAIL_PASS`

### Configuração de Pagamento

**Stripe:**
1. Crie uma conta no Stripe
2. Obtenha as chaves de API
3. Configure as variáveis `STRIPE_PUBLIC_KEY` e `STRIPE_SECRET_KEY`

**Mercado Pago:**
1. Crie uma conta no Mercado Pago
2. Obtenha o access token
3. Configure a variável `MERCADO_PAGO_ACCESS_TOKEN`

## 📦 Deploy no Railway

1. **Prepare o projeto**
```bash
# Instale dependências de produção
npm install --production

# Crie o arquivo railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Configure as variáveis de ambiente no Railway**
- Todas as variáveis do arquivo `.env`
- `DATABASE_URL` (formato MySQL)
- `NODE_ENV=production`

3. **Configure o banco de dados**
- Use o banco de dados provisionado pelo Railway
- Configure a variável `DATABASE_URL`

4. **Execute migrações automaticamente**
Adicione ao package.json:
```json
"scripts": {
  "postinstall": "npm run migrate"
}
```

## 🧪 Testes

### Testes Manuais

1. **Teste de registro de usuário**
   - Acesse `/auth/register`
   - Preencha o formulário
   - Verifique o email de confirmação

2. **Teste de login**
   - Acesse `/auth/login`
   - Use credenciais válidas
   - Verifique redirecionamento

3. **Teste de produtos**
   - Navegue pelo catálogo
   - Use filtros e busca
   - Adicione ao carrinho

4. **Teste de checkout**
   - Complete um pedido de teste
   - Use modo sandbox do pagamento
   - Verifique geração de pedido

### Testes Automatizados

```bash
# Instale dependências de teste
npm install --save-dev jest supertest

# Execute os testes
npm test
```

## 📊 Monitoramento e Logs

### Logs da Aplicação
- Logs de acesso: `logs/access.log`
- Logs de erro: `logs/error.log`
- Logs de pagamento: `logs/payment.log`

### Métricas
- Tempo de resposta
- Taxa de conversão
- Valor médio do pedido
- Produtos mais vendidos

## 🔒 Segurança

### Implementado
- Hash de senhas com bcrypt
- Proteção CSRF
- Rate limiting
- Validação de entrada
- Headers de segurança
- HTTPS em produção

### Recomendações
- Manter dependências atualizadas
- Usar variáveis de ambiente
- Implementar backup diário
- Monitorar atividades suspeitas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add new feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- Email: contato@bayromhugoperfumes.com.br
- WhatsApp: (11) 94220-0022
- Issues: [GitHub Issues](https://github.com/hugoDEV-full/Bayrom-Hugo-perfumes/issues)

## 🎯 Roadmap

- [ ] App mobile (React Native)
- [ ] Sistema de afiliados
- [ ] Integração com marketplaces
- [ ] Chat online com clientes
- [ ] Sistema de assinatura
- [ ] Análise preditiva de vendas
- [ ] Integração com ERP

---

**Desenvolvido com ❤️ por Bayrom & Hugo Parfums**
