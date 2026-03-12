# Sistema de Materiais Preciosos

## Visão Geral

O Sistema de Materiais Preciosos é uma implementação visual e interativa que associa perfumes a metais e gemas preciosas, criando uma experiência de luxo única para os usuários. Cada perfume recebe atributos visuais baseados em materiais como ouro, diamante, rubi, esmeralda, safira, ametista, platina e ouro rosa.

## Estrutura dos Arquivos

### CSS
- `public/css/luxury-materials.css` - Estilos principais dos materiais
- `public/css/material-extensions.css` - Extensões e animações avançadas

### JavaScript
- `public/js/material-system.js` - Sistema dinâmico de atribuição de materiais

### Views
- `views/client/materials-demo.ejs` - Página de demonstração interativa
- `views/client/home.ejs` - Integração dos materiais na home page
- `views/client/products/enhanced-list.ejs` - Lista de produtos com materiais

### Rotas
- `src/routes/index.js` - Rota `/materiais-preciosos`

## Materiais Disponíveis

### Metais
- **Ouro 24k** - Pureza, sofisticação, poder
- **Platina** - Raridade, prestígio, exclusividade
- **Prata** - Elegância, modernidade, refinamento
- **Cobre** - Calor, autenticidade, terra
- **Ouro Rosa** - Delicadeza, romance, modernidade

### Gemas
- **Diamante** - Pureza, eternidade, exclusividade
- **Rubi** - Paixão, intensidade, amor
- **Esmeralda** - Natureza, renovação, frescor
- **Safira** - Sabedoria, verdade, elegância
- **Ametista** - Misticismo, intuição, transformação
- **Ônix** - Mistério, poder, proteção
- **Topázio** - Energia, criatividade, alegria
- **Tanzanita** - Raridade, espiritualidade, luxo

## Funcionalidades

### 1. Atribuição Dinâmica de Materiais
O sistema atribui automaticamente materiais aos perfumes baseado em:
- Nome do perfume
- Categoria (masculino, feminino, unisex)
- Notas olfativas
- Marca

### 2. Classes CSS Automáticas
- `.material-{material}` - Classe principal do material
- `.material-badge-{material}` - Badges de material
- `.price-material-{material}` - Preços com estilo do material
- `.btn-material-{material}` - Botões temáticos

### 3. Animações e Efeitos
- **Shimmer** - Efeito de brilho passante
- **Glow** - Brilho pulsante
- **Floating Particles** - Partículas flutuantes
- **Burst Effect** - Explosão de partículas no clique
- **Hover Effects** - Efeitos de hover personalizados

### 4. Sistema de Partículas
Partículas animadas representando cada material:
- Cores específicas para cada material
- Animações flutuantes
- Efeitos de brilho e sombra

## Implementação

### CSS Variables
```css
:root {
    --material-gold: #FFD700;
    --material-diamond: #FFFFFF;
    --material-ruby: #E0115F;
    --material-emerald: #50C878;
    --material-sapphire: #0F52BA;
    --material-amethyst: #9966CC;
    --material-platinum: #E5E4E2;
    --material-rose-gold: #E0BFB8;
}
```

### Classes de Material
```html
<div class="material-card material-masculine-gold">
    <div class="material-icon-large">♦</div>
    <h4>Ouro 24k</h4>
</div>
```

### JavaScript Integration
```javascript
// Inicializar sistema
const materialSystem = new MaterialSystem();

// Aplicar materiais aos produtos
materialSystem.applyMaterialsToProducts();

// Criar efeito de explosão
materialSystem.createMaterialBurst(element);
```

## Página de Demonstração

Acesse `/materiais-preciosos` para ver:
- Showcase de todos os materiais
- Demonstrações interativas
- Sistema de combinação de materiais
- Estatísticas e informações
- Exemplos de perfumes por material

## Personalização

### Adicionar Novo Material
1. Definir cores em `luxury-materials.css`
2. Criar classes CSS específicas
3. Adicionar ao sistema de atribuição em `material-system.js`
4. Atualizar partículas e animações

### Modificar Atribuições
Edite o objeto `materialAssignments` em `material-system.js`:
```javascript
materialAssignments: {
    'bp-nome-do-perfume': {
        primary: 'gold',
        secondary: 'diamond',
        category: 'masculine'
    }
}
```

## Performance

### Otimizações Implementadas
- CSS animations otimizadas
- Lazy loading de partículas
- Event delegation
- Throttling em animações

### Recomendações
- Limitar partículas simultâneas
- Usar transform em vez de position
- Implementar virtual scrolling em listas grandes

## Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Features Utilizadas
- CSS Custom Properties
- CSS Grid e Flexbox
- ES6 Classes
- Intersection Observer API

## Manutenção

### Atualizações Recentes
- v1.0 - Sistema base implementado
- v1.1 - Adicionadas animações avançadas
- v1.2 - Página de demonstração interativa
- v1.3 - Sistema de combinação de materiais

### Roadmap
- [ ] Sistema de recomendação baseado em materiais
- [ ] Integração com realidade aumentada
- [ ] Animações 3D para materiais
- [ ] API para customização de materiais

## Suporte

Para dúvidas ou sugestões sobre o Sistema de Materiais Preciosos, consulte:
- Documentação técnica nos arquivos CSS/JS
- Exemplos na página de demonstração
- Código comentado nos arquivos fonte

---

**Bayrom & Hugo Parfums** - Sistema de Materiais Preciosos v1.3
