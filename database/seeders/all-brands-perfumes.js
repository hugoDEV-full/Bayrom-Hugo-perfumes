// Catálogo completo de perfumes inspirados de todas as marcas
// Bayrom & Hugo Parfums - Versões inspiradas com composição milionária

const allBrandsPerfumes = [
    // CHANEL
    {
        name: "BP Chanel No. 5",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_aldehyde",
        inspiration: "Chanel No. 5",
        original_price: 380.00,
        sale_price: 180.00,
        description: "A fragrância icônica redefinida. Flores brancas com aldeídos para a mulher eterna.",
        notes: {
            top: ["Aldeídos", "Bergamota", "Laranja", "Neroli"],
            middle: ["Jasmim", "Rosa", "Lírio do Vale", "Iris"],
            base: ["Sândalo", "Vetiver", "Patchouli", "Baunilha"]
        },
        composition: {
            description: "Jasmim Grasse (€12.000/kg) e Rosa de Maio (€10.000/kg)",
            ingredients: ["Jasmim Grasse", "Rosa de Maio", "Aldeídos Sintéticos", "Sândalo Indiano"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.9,
        slug: "bp-chanel-no-5"
    },
    
    {
        name: "BP Chanel Coco Mademoiselle",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_floral",
        inspiration: "Chanel Coco Mademoiselle",
        original_price: 360.00,
        sale_price: 170.00,
        description: "Liberdade e audácia em frasco. Uma mulher moderna e independente.",
        notes: {
            top: ["Laranja", "Pêssego", "Bergamota", "Mandarina"],
            middle: ["Rosa", "Jasmim", "Lírio do Vale", "Pimenta Rosa"],
            base: ["Patchouli", "Vetiver", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Patchouli Premium (€18.000/kg) com Rosa Bulgária (€15.000/kg)",
            ingredients: ["Patchouli", "Rosa Bulgária", "Baunilha", "Vetiver"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 312,
        rating_average: 4.8,
        slug: "bp-chanel-coco-mademoiselle"
    },
    
    {
        name: "BP Chanel Bleu de Chanel",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_aromatic",
        inspiration: "Chanel Bleu de Chanel",
        original_price: 340.00,
        sale_price: 160.00,
        description: "A liberdade em movimento. Notas cítricas com madeiras nobres para o homem contemporâneo.",
        notes: {
            top: ["Limão", "Menta", "Grapefruit", "Pimenta Rosa"],
            middle: ["Jasmim", "Gengibre", "Nó Moscada", "Patchouli"],
            base: ["Cedro", "Sândalo", "Âmbar", "Incenso"]
        },
        composition: {
            description: "Cedro Atlas (€15.000/kg) com Grapefruit Premium (€12.000/kg)",
            ingredients: ["Cedro Atlas", "Grapefruit", "Incenso", "Sândalo"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 45,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.7,
        slug: "bp-chanel-bleu-de-chanel"
    },
    
    // CHRISTIAN DIOR
    {
        name: "BP Dior Sauvage",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Christian Dior Sauvage",
        original_price: 320.00,
        sale_price: 150.00,
        description: "A natureza selvagem em frasco. Força e elegância para homens autênticos.",
        notes: {
            top: ["Pimenta", "Bergamota", " Elemi", "Grapefruit"],
            middle: ["Lavanda", "Pimento", "Gerânio", "Violeta"],
            base: ["Ambroxan", "Cedro", "Patchouli", "Vetiver"]
        },
        composition: {
            description: "Ambroxan Sintético Premium (€20.000/kg) com Pimenta Rosa (€8.000/kg)",
            ingredients: ["Ambroxan", "Pimenta Rosa", "Cedro", "Patchouli"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 50,
        is_featured: true,
        sales_count: 445,
        rating_average: 4.8,
        slug: "bp-dior-sauvage"
    },
    
    {
        name: "BP Dior J'adore",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Christian Dior J'adore",
        original_price: 350.00,
        sale_price: 170.00,
        description: "O bouquet feminino por excelência. Flores nobres para mulheres de ouro.",
        notes: {
            top: ["Pêra", "Melancia", "Pêssego", "Mandarina"],
            middle: ["Jasmim", "Rosa", "Lírio", "Tuberose"],
            base: ["Baunilha", "Musk", "Cedro", "Âmbar"]
        },
        composition: {
            description: "Jasmim Sambac (€15.000/kg) com Tuberose (€18.000/kg)",
            ingredients: ["Jasmim Sambac", "Tuberose", "Baunilha", "Musk"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 298,
        rating_average: 4.9,
        slug: "bp-dior-jadore"
    },
    
    // TOM FORD
    {
        name: "BP Tom Ford Black Orchid",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "oriental_spicy",
        inspiration: "Tom Ford Black Orchid",
        original_price: 420.00,
        sale_price: 200.00,
        description: "A escuridão luxuosa. Notas negras e flores raras para personalidades únicas.",
        notes: {
            top: ["Trufa", "Ylang-Ylang", "Bergamota", "Jasmim Negro"],
            middle: ["Orquídea Negra", "Lótus", "Hibisco", "Especiarias"],
            base: ["Musk", "Patchouli", "Baunilha", "Chocolate"]
        },
        composition: {
            description: "Orquídea Negra Rara (€25.000/kg) com Trufa Premium (€30.000/kg)",
            ingredients: ["Orquídea Negra", "Trufa", "Patchouli", "Baunilha"],
            luxury_value: "Composição avaliada em €55.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 234,
        rating_average: 4.9,
        slug: "bp-tom-ford-black-orchid"
    },
    
    {
        name: "BP Tom Ford Oud Wood",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Tom Ford Oud Wood",
        original_price: 450.00,
        sale_price: 220.00,
        description: "O ouro líquido da perfumaria. Oud raro com madeiras preciosas.",
        notes: {
            top: ["Oud", "Rosa", "Cardamomo", "Pimenta"],
            middle: ["Sândalo", "Vetiver", "Pimento", "Noz Moscada"],
            base: ["Âmbar", "Musk", "Baunilha", "Couro"]
        },
        composition: {
            description: "Oud Cambodiano (€60.000/kg) com Sândalo Indiano (€25.000/kg)",
            ingredients: ["Oud Cambodiano", "Sândalo Indiano", "Âmbar", "Musk"],
            luxury_value: "Composição avaliada em €75.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 25,
        is_featured: true,
        sales_count: 189,
        rating_average: 4.8,
        slug: "bp-tom-ford-oud-wood"
    },
    
    // VERSACE
    {
        name: "BP Versace Eros",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_fresh",
        inspiration: "Versace Eros",
        original_price: 280.00,
        sale_price: 140.00,
        description: "O deus do amor em frasco. Paixão e intensidade para homens poderosos.",
        notes: {
            top: ["Menta", "Limão", "Maçã Verde", "Tonka"],
            middle: ["Gerânio", "Ambroxan", "Violeta", "Jasmim"],
            base: ["Vetiver", "Cedro", "Baunilha", "Musk"]
        },
        composition: {
            description: "Menta Peppermint (€10.000/kg) com Ambroxan (€20.000/kg)",
            ingredients: ["Menta Peppermint", "Ambroxan", "Vetiver", "Baunilha"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 55,
        is_featured: true,
        sales_count: 367,
        rating_average: 4.7,
        slug: "bp-versace-eros"
    },
    
    {
        name: "BP Versace Bright Crystal",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Versace Bright Crystal",
        original_price: 260.00,
        sale_price: 130.00,
        description: "A cristalina pureza. Frescor e brilho para mulheres vibrantes.",
        notes: {
            top: ["Yuzu", "Granada", "Gelo", "Acqua"],
            middle: ["Peônia", "Magnólia", "Lótus", "Lírio"],
            base: ["Musk", "Âmbar", "Açafrão", "Madeira"]
        },
        composition: {
            description: "Yuzu Japonês (€12.000/kg) com Peônia Premium (€10.000/kg)",
            ingredients: ["Yuzu Japonês", "Peônia", "Musk", "Âmbar"],
            luxury_value: "Composição avaliada em €25.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 48,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.6,
        slug: "bp-versace-bright-crystal"
    },
    
    // PACO RABANNE
    {
        name: "BP Paco Rabanne 1 Million",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "spicy_floral",
        inspiration: "Paco Rabanne 1 Million",
        original_price: 300.00,
        sale_price: 150.00,
        description: "O ouro em frasco. Luxo e poder para homens milionários.",
        notes: {
            top: ["Grapefruit", "Menta", "Laranja Vermelha", "Blood Mandarin"],
            middle: ["Rosa", "Canela", "Especiarias", "Noz Moscada"],
            base: ["Âmbar", "Couro", "Baunilha", "Musk"]
        },
        composition: {
            description: "Canela do Ceilão (€15.000/kg) com Âmbar Gris (€25.000/kg)",
            ingredients: ["Canela do Ceilão", "Âmbar Gris", "Couro", "Baunilha"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 42,
        is_featured: true,
        sales_count: 412,
        rating_average: 4.8,
        slug: "bp-paco-rabanne-1-million"
    },
    
    {
        name: "BP Paco Rabanne Olympéa",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_vanilla",
        inspiration: "Paco Rabanne Olympéa",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A deusa vitoriosa. Força e doçura para mulheres divinas.",
        notes: {
            top: ["Gingerlily", "Pêssego", "Jasmim", "Mandarina"],
            middle: ["Canela", "Baunilha", "Lótus", "Flor de Laranjeira"],
            base: ["Âmbar", "Musk", "Sal", "Madeira"]
        },
        composition: {
            description: "Baunilha de Madagascar (€15.000/kg) com Âmbar Solar (€20.000/kg)",
            ingredients: ["Baunilha de Madagascar", "Âmbar Solar", "Canela", "Musk"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 36,
        is_featured: true,
        sales_count: 334,
        rating_average: 4.7,
        slug: "bp-paco-rabanne-olympa"
    },
    
    // CREED
    {
        name: "BP Creed Aventus",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "fruity_chypre",
        inspiration: "Creed Aventus",
        original_price: 450.00,
        sale_price: 220.00,
        description: "A fragrância do sucesso. Notas de frutas pretas com musk para o homem vitorioso.",
        notes: {
            top: ["Maçã Preta", "Abacaxi", "Bergamota", "Limão Siciliano"],
            middle: ["Jasmim", "Patchouli", "Bétula", "Rosa"],
            base: ["Musk", "Baunilha", "Âmbar", "Carvalho"]
        },
        composition: {
            description: "Maçã Preta Premium (€18.000/kg) com Musk Branco (€22.000/kg)",
            ingredients: ["Maçã Preta", "Musk Branco", "Baunilha", "Patchouli"],
            luxury_value: "Composição avaliada em €50.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 28,
        is_featured: true,
        sales_count: 456,
        rating_average: 4.9,
        slug: "bp-creed-aventus"
    },
    
    {
        name: "BP Creed Green Irish Tweed",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "green_fougere",
        inspiration: "Creed Green Irish Tweed",
        original_price: 400.00,
        sale_price: 200.00,
        description: "A Irlanda em frasco. Verdes frescos com notas de campo para homens clássicos.",
        notes: {
            top: ["Verbena", "Limão Italiano", "Folha Violeta", "Menta"],
            middle: ["Iris", "Sândalo", "Pimento", "Noz Moscada"],
            base: ["Âmbar", "Musk", "Terra", "Carvalho"]
        },
        composition: {
            description: "Verbena Francesa (€12.000/kg) com Iris Florentina (€20.000/kg)",
            ingredients: ["Verbena Francesa", "Iris Florentina", "Sândalo", "Âmbar"],
            luxury_value: "Composição avaliada em €42.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 22,
        is_featured: true,
        sales_count: 178,
        rating_average: 4.8,
        slug: "bp-creed-green-irish-tweed"
    },
    
    // YVES SAINT LAURENT
    {
        name: "BP YSL Black Opium",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_spicy",
        inspiration: "Yves Saint Laurent Black Opium",
        original_price: 340.00,
        sale_price: 170.00,
        description: "A noite escura e vibrante. Café e baunilha para mulheres ousadas.",
        notes: {
            top: ["Pêra", "Laranja", "Flor de Laranjeira", "Pimenta Rosa"],
            middle: ["Café", "Jasmim", "Ameixa", "Lírio"],
            base: ["Baunilha", "Patchouli", "Cedro", "Couro"]
        },
        composition: {
            description: "Café Colombiano (€15.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Café Colombiano", "Baunilha de Madagascar", "Patchouli", "Couro"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 389,
        rating_average: 4.8,
        slug: "bp-ysl-black-opium"
    },
    
    {
        name: "BP YSL La Nuit de L'Homme",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Yves Saint Laurent La Nuit de L'Homme",
        original_price: 300.00,
        sale_price: 150.00,
        description: "A noite misteriosa. Cardamomo e pimenta para homens sedutores.",
        notes: {
            top: ["Cardamomo", "Pimenta", "Berinjela", "Bergamota"],
            middle: ["Lavanda", "Cedro", "Violeta", "Gerânio"],
            base: ["Vetiver", "Couro", "Baunilha", "Musk"]
        },
        composition: {
            description: "Cardamomo Premium (€20.000/kg) com Pimenta Negra (€8.000/kg)",
            ingredients: ["Cardamomo", "Pimenta Negra", "Vetiver", "Couro"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.7,
        slug: "bp-ysl-la-nuit-de-lhomme"
    },
    
    // GUERLAIN (Adicionando como extra)
    {
        name: "BP Guerlain Shalimar",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_vanilla",
        inspiration: "Guerlain Shalimar",
        original_price: 380.00,
        sale_price: 180.00,
        description: "O amor eterno. Baunilha e bergamota para mulheres românticas.",
        notes: {
            top: ["Bergamota", "Limão", "Cedro", "Laranja Amarga"],
            middle: ["Jasmim", "Rosa", "Iris", "Patchouli"],
            base: ["Baunilha", "Âmbar", "Musk", "Terra"]
        },
        composition: {
            description: "Baunilha Bourbon (€18.000/kg) com Bergamota Calabresa (€10.000/kg)",
            ingredients: ["Baunilha Bourbon", "Bergamota Calabresa", "Jasmim", "Âmbar"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 25,
        is_featured: true,
        sales_count: 156,
        rating_average: 4.9,
        slug: "bp-guerlain-shalimar"
    },
    
    // HERMÈS
    {
        name: "BP Hermès Terre d'Hermès",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_citrus",
        inspiration: "Hermès Terre d'Hermès",
        original_price: 350.00,
        sale_price: 170.00,
        description: "A terra em frasco. Laranja e terra para homens conectados à natureza.",
        notes: {
            top: ["Laranja", "Grapefruit", "Pimenta", "Baunilha"],
            middle: ["Pimento", "Gerânio", "Patchouli", "Violeta"],
            base: ["Cedro", "Vetiver", "Benjoin", "Musk"]
        },
        composition: {
            description: "Laranja Sanguínea (€12.000/kg) com Vetiver Haitiano (€20.000/kg)",
            ingredients: ["Laranja Sanguínea", "Vetiver Haitiano", "Cedro", "Patchouli"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 234,
        rating_average: 4.8,
        slug: "bp-hermes-terre-dhermes"
    },
    
    {
        name: "BP Hermès Twilly d'Hermès",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_spicy",
        inspiration: "Hermès Twilly d'Hermès",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A juventude audaciosa. Gengibre e tuberosa para mulheres livres.",
        notes: {
            top: ["Gengibre", "Tangerina", "Pimenta Rosa", "Bergamota"],
            middle: ["Tuberose", "Jasmim", "Lírio", "Rosa"],
            base: ["Sândalo", "Musk", "Baunilha", "Couro"]
        },
        composition: {
            description: "Gengibre Orgânico (€15.000/kg) com Tuberose (€18.000/kg)",
            ingredients: ["Gengibre Orgânico", "Tuberose", "Sândalo", "Musk"],
            luxury_value: "Composição avaliada em €36.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 28,
        is_featured: true,
        sales_count: 198,
        rating_average: 4.7,
        slug: "bp-hermes-twilly-dhermes"
    },
    
    // PRADA
    {
        name: "BP Prada Luna Rossa",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "aromatic_fougere",
        inspiration: "Prada Luna Rossa",
        original_price: 300.00,
        sale_price: 150.00,
        description: "A velocidade do mar. Notas marinhas para homens competitivos.",
        notes: {
            top: ["Lavanda", "Bergamota", "Menta", "Água Marinha"],
            middle: ["Clary Sage", "Gerânio", "Nó Moscada", "Pimento"],
            base: ["Âmbar", "Musk", "Couro", "Cedro"]
        },
        composition: {
            description: "Água Marinha Premium (€15.000/kg) com Lavanda Francesa (€10.000/kg)",
            ingredients: ["Água Marinha", "Lavanda Francesa", "Âmbar", "Musk"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 278,
        rating_average: 4.6,
        slug: "bp-prada-luna-rossa"
    },
    
    {
        name: "BP Prada Candy",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_vanilla",
        inspiration: "Prada Candy",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A doçura sedutora. Caramelo e baunilha para mulheres gulosas.",
        notes: {
            top: ["Caramelo", "Bergamota", "Musk", "Baunilha"],
            middle: ["Pó de Bebê", "Jasmim", "Rosa", "Lírio"],
            base: ["Benjoin", "Musk", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Caramelo Belga (€12.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Caramelo Belga", "Baunilha de Madagascar", "Musk", "Benjoin"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 42,
        is_featured: true,
        sales_count: 312,
        rating_average: 4.7,
        slug: "bp-prada-candy"
    },
    
    // GIORGIO ARMANI
    {
        name: "BP Armani Code",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_spicy",
        inspiration: "Giorgio Armani Code",
        original_price: 320.00,
        sale_price: 160.00,
        description: "O código da sedução. Oliveira negra e café para homens misteriosos.",
        notes: {
            top: ["Oliveira Negra", "Bergamota", "Limão", "Tangerina"],
            middle: ["Estrela de Anis", "Café", "Gengibre", "Noz Moscada"],
            base: ["Musk", "Tahiti Vetiver", "Cedro", "Baunilha"]
        },
        composition: {
            description: "Oliveira Negra (€18.000/kg) com Café Arábico (€15.000/kg)",
            ingredients: ["Oliveira Negra", "Café Arábico", "Musk", "Vetiver"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 356,
        rating_average: 4.8,
        slug: "bp-armani-code"
    },
    
    {
        name: "BP Armani Si",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "fruity_chypre",
        inspiration: "Giorgio Armani Si",
        original_price: 340.00,
        sale_price: 170.00,
        description: "A força feminina. Amora preta e rosa para mulheres poderosas.",
        notes: {
            top: ["Amora Preta", "Litchi", "Framboesa", "Pêssego"],
            middle: ["Rosa", "Jasmim", "Freesia", "Lírio"],
            base: ["Musk", "Baunilha", "Patchouli", "Âmbar"]
        },
        composition: {
            description: "Amora Preta (€12.000/kg) com Rosa Centifolia (€15.000/kg)",
            ingredients: ["Amora Preta", "Rosa Centifolia", "Musk", "Baunilha"],
            luxury_value: "Composição avaliada em €36.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.8,
        slug: "bp-armani-si"
    },
    
    // CALVIN KLEIN
    {
        name: "BP CK One",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "citrus_aromatic",
        inspiration: "Calvin Klein CK One",
        original_price: 220.00,
        sale_price: 110.00,
        description: "A liberdade de ser. Notas cítricas frescas para todos.",
        notes: {
            top: ["Limão", "Mandarina", "Papaia", "Abacaxi"],
            middle: ["Jasmim", "Lavanda", "Menta", "Néroli"],
            base: ["Musk", "Âmbar", "Cedro", "Sândalo"]
        },
        composition: {
            description: "Limão Siciliano (€8.000/kg) com Musk Branco (€15.000/kg)",
            ingredients: ["Limão Siciliano", "Musk Branco", "Cedro", "Âmbar"],
            luxury_value: "Composição avaliada em €25.000 por litro"
        },
        sizes: ["50ml", "100ml", "200ml"],
        stock: 60,
        is_featured: true,
        sales_count: 445,
        rating_average: 4.5,
        slug: "bp-ck-one"
    },
    
    {
        name: "BP CK Eternity",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "floral_fresh",
        inspiration: "Calvin Klein Eternity",
        original_price: 240.00,
        sale_price: 120.00,
        description: "O amor eterno. Flores brancas para romantes eternos.",
        notes: {
            top: ["Mandarina", "Lavanda", "Salvia", "Verduras"],
            middle: ["Jasmim", "Lírio", "Narciso", "Rosa"],
            base: ["Sândalo", "Musk", "Âmbar", "Patchouli"]
        },
        composition: {
            description: "Lírio do Vale (€10.000/kg) com Narciso (€12.000/kg)",
            ingredients: ["Lírio do Vale", "Narciso", "Sândalo", "Musk"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 45,
        is_featured: true,
        sales_count: 334,
        rating_average: 4.6,
        slug: "bp-ck-eternity"
    },
    
    // HUGO BOSS
    {
        name: "BP Hugo Boss The Scent",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_spicy",
        inspiration: "Hugo Boss The Scent",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A sedução intensa. Gengibre e manjericão para homens charmosos.",
        notes: {
            top: ["Gengibre", "Manjericão", "Menta", "Verduras"],
            middle: ["Lavanda", "Bergamota", "Cardamomo", "Jasmim"],
            base: ["Couro", "Musk", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Gengibre Orgânico (€15.000/kg) com Couro Premium (€20.000/kg)",
            ingredients: ["Gengibre Orgânico", "Couro Premium", "Musk", "Baunilha"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.6,
        slug: "bp-hugo-boss-the-scent"
    },
    
    {
        name: "BP Hugo Boss Ma Vie",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Hugo Boss Ma Vie",
        original_price: 260.00,
        sale_price: 130.00,
        description: "A vida em flor. Cactus flower e rosa para mulheres vibrantes.",
        notes: {
            top: ["Cactus Flower", "Pêra", "Pêssego", "Mandarina"],
            middle: ["Rosa", "Jasmim", "Lírio", "Freesia"],
            base: ["Musk", "Cedro", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Cactus Flower (€12.000/kg) com Rosa Damascena (€15.000/kg)",
            ingredients: ["Cactus Flower", "Rosa Damascena", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 223,
        rating_average: 4.5,
        slug: "bp-hugo-boss-ma-vie"
    },
    
    // DOLCE & GABBANA
    {
        name: "BP Dolce & Gabbana Light Blue",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "citrus_floral",
        inspiration: "Dolce & Gabbana Light Blue",
        original_price: 300.00,
        sale_price: 150.00,
        description: "O Mediterrâneo em frasco. Limão siciliano e jasmim para almas livres.",
        notes: {
            top: ["Limão Siciliano", "Maçã", "Cedro", "Bellflower"],
            middle: ["Jasmim", "Branca de Prata", "Rosa", "Bambu"],
            base: ["Musk", "Âmbar", "Cedro", "Madeira"]
        },
        composition: {
            description: "Limão Siciliano (€10.000/kg) com Jasmim Sambac (€15.000/kg)",
            ingredients: ["Limão Siciliano", "Jasmim Sambac", "Musk", "Âmbar"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 42,
        is_featured: true,
        sales_count: 389,
        rating_average: 4.7,
        slug: "bp-dolce-gabbana-light-blue"
    },
    
    {
        name: "BP Dolce & Gabbana The One",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_floral",
        inspiration: "Dolce & Gabbana The One",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A única e exclusiva. Âmbar e baunilha para mulheres únicas.",
        notes: {
            top: ["Pêssego", "Litchi", "Mandarina", "Bergamota"],
            middle: ["Lírio", "Jasmim", "Lótus", "Ameixa"],
            base: ["Âmbar", "Baunilha", "Musk", "Pimento"]
        },
        composition: {
            description: "Âmbar Gris (€25.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Âmbar Gris", "Baunilha de Madagascar", "Lírio", "Jasmim"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 298,
        rating_average: 4.8,
        slug: "bp-dolce-gabbana-the-one"
    },
    
    // JEAN PAUL GAULTIER
    {
        name: "BP Jean Paul Gaultier Le Male",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_fougere",
        inspiration: "Jean Paul Gaultier Le Male",
        original_price: 300.00,
        sale_price: 150.00,
        description: "O marinheiro sedutor. Lavanda e baunilha para homens ousados.",
        notes: {
            top: ["Menta", "Lavanda", "Artemísia", "Cardamomo"],
            middle: ["Canela", "Cumarina", "Laranja", "Flor de Laranjeira"],
            base: ["Baunilha", "Âmbar", "Couro", "Musk"]
        },
        composition: {
            description: "Lavanda Provençal (€10.000/kg) com Baunilha Bourbon (€18.000/kg)",
            ingredients: ["Lavanda Provençal", "Baunilha Bourbon", "Canela", "Âmbar"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 367,
        rating_average: 4.7,
        slug: "bp-jean-paul-gaultier-le-male"
    },
    
    {
        name: "BP Jean Paul Gaultier Scandal",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_gourmand",
        inspiration: "Jean Paul Gaultier Scandal",
        original_price: 320.00,
        sale_price: 160.00,
        description: "O escândalo doce. Caramelo e flor de laranjeira para mulheres provocadoras.",
        notes: {
            top: ["Caramelo", "Mandarina", "Pêra", "Pêssego"],
            middle: ["Flor de Laranjeira", "Jasmim", "Gardenia", "Lírio"],
            base: ["Musk", "Baunilha", "Cedro", "Patchouli"]
        },
        composition: {
            description: "Caramelo Francês (€12.000/kg) com Flor de Laranjeira (€8.000/kg)",
            ingredients: ["Caramelo Francês", "Flor de Laranjeira", "Musk", "Baunilha"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.6,
        slug: "bp-jean-paul-gaultier-scandal"
    },
    
    // ISSEY MIYAKE
    {
        name: "BP Issey Miyake L'Eau d'Issey",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_aquatic",
        inspiration: "Issey Miyake L'Eau d'Issey",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A água da vida. Lótus e rosa para mulheres puras.",
        notes: {
            top: ["Lótus", "Rosa", "Bergamota", "Melão"],
            middle: ["Lírio", "Jasmim", "Ameixa", "Freesia"],
            base: ["Musk", "Cedro", "Sândalo", "Âmbar"]
        },
        composition: {
            description: "Flor de Lótus (€12.000/kg) com Rosa de Damasco (€15.000/kg)",
            ingredients: ["Flor de Lótus", "Rosa de Damasco", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 256,
        rating_average: 4.6,
        slug: "bp-issey-miyake-leau-dissey"
    },
    
    {
        name: "BP Issey Miyake L'Eau d'Issey Pour Homme",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "citrus_aquatic",
        inspiration: "Issey Miyake L'Eau d'Issey Pour Homme",
        original_price: 260.00,
        sale_price: 130.00,
        description: "A água masculina. Yuzu e verbena para homens frescos.",
        notes: {
            top: ["Yuzu", "Menta", "Limão", "Verbena"],
            middle: ["Pimento", "Néroli", "Coração de Lótus", "Sálvia"],
            base: ["Cedro", "Sândalo", "Musk", "Tahiti Vetiver"]
        },
        composition: {
            description: "Yuzu Japonês (€12.000/kg) com Verbena Francesa (€10.000/kg)",
            ingredients: ["Yuzu Japonês", "Verbena Francesa", "Cedro", "Musk"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 45,
        is_featured: true,
        sales_count: 278,
        rating_average: 4.5,
        slug: "bp-issey-miyake-leau-dissey-pour-homme"
    },
    
    // MONTBLANC
    {
        name: "BP Montblanc Legend",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_aromatic",
        inspiration: "Montblanc Legend",
        original_price: 240.00,
        sale_price: 120.00,
        description: "A lenda em frasco. Pinho e carvalho para homens lendários.",
        notes: {
            top: ["Pineapple", "Bergamota", "Lavanda", "Verbena"],
            middle: ["Red Apple", "Gerânio", "Salvia", "Jasmim"],
            base: ["Sândalo", "Carvalho", "Musk", "Tahiti Vetiver"]
        },
        composition: {
            description: "Abacaxi Premium (€10.000/kg) com Sândalo Indiano (€20.000/kg)",
            ingredients: ["Abacaxi Premium", "Sândalo Indiano", "Carvalho", "Musk"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 48,
        is_featured: true,
        sales_count: 234,
        rating_average: 4.5,
        slug: "bp-montblanc-legend"
    },
    
    {
        name: "BP Montblanc Lady Emblem",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Montblanc Lady Emblem",
        original_price: 260.00,
        sale_price: 130.00,
        description: "A emblema feminina. Lichia e rosa para mulheres elegantes.",
        notes: {
            top: ["Lichia", "Pêra", "Maçã", "Rosa"],
            middle: ["Jasmim", "Lírio", "Peônia", "Freesia"],
            base: ["Musk", "Sândalo", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Lichia Chinesa (€12.000/kg) com Rosa Bulgária (€15.000/kg)",
            ingredients: ["Lichia Chinesa", "Rosa Bulgária", "Musk", "Sândalo"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 189,
        rating_average: 4.6,
        slug: "bp-montblanc-lady-emblem"
    },
    
    // LANCÔME
    {
        name: "BP Lancôme La Vie Est Belle",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Lancôme La Vie Est Belle",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A vida é bela. Pêra e íris para mulheres felizes.",
        notes: {
            top: ["Pêra", "Framboesa", "Amora Preta", "Pêssego"],
            middle: ["Jasmim", "Lírio", "Íris", "Laranja Amarga"],
            base: ["Praliné", "Baunilha", "Patchouli", "Musk"]
        },
        composition: {
            description: "Íris Florentina (€20.000/kg) com Praliné Francês (€12.000/kg)",
            ingredients: ["Íris Florentina", "Praliné Francês", "Baunilha", "Patchouli"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 412,
        rating_average: 4.8,
        slug: "bp-lancome-la-vie-est-belle"
    },
    
    {
        name: "BP Lancôme Trésor",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Lancôme Trésor",
        original_price: 300.00,
        sale_price: 150.00,
        description: "O tesouro feminino. Pêssego e rosa para mulheres preciosas.",
        notes: {
            top: ["Pêssego", "Pêra", "Litchi", "Freesia"],
            middle: ["Rosa", "Lírio", "Íris", "Jasmim"],
            base: ["Musk", "Baunilha", "Âmbar", "Sândalo"]
        },
        composition: {
            description: "Pêssego de Vence (€10.000/kg) com Rosa de Grasse (€15.000/kg)",
            ingredients: ["Pêssego de Vence", "Rosa de Grasse", "Musk", "Baunilha"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.7,
        slug: "bp-lancome-tresor"
    },
    
    // BVLGARI
    {
        name: "BP Bvlgari Man in Black",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_spicy",
        inspiration: "Bvlgari Man in Black",
        original_price: 340.00,
        sale_price: 170.00,
        description: "O homem em preto. Tabaco e rum para homens misteriosos.",
        notes: {
            top: ["Rum", "Pimenta", "Tangerina", "Cardamomo"],
            middle: ["Tuberosa", "Lírio", "Íris", "Jasmim"],
            base: ["Tabaco", "Baunilha", "Couro", "Musk"]
        },
        composition: {
            description: "Rum Jamaicano (€15.000/kg) com Tabaco Cubano (€20.000/kg)",
            ingredients: ["Rum Jamaicano", "Tabaco Cubano", "Baunilha", "Couro"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 198,
        rating_average: 4.7,
        slug: "bp-bvlgari-man-in-black"
    },
    
    {
        name: "BP Bvlgari Omnia Crystalline",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_woody",
        inspiration: "Bvlgari Omnia Crystalline",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A cristalina pureza. Bambu e lótus para mulheres serenas.",
        notes: {
            top: ["Bambu", "Nashi Pear", "Laranja", "Lótus"],
            middle: ["Lótus", "Tênia", "Crisântemo", "Freesia"],
            base: ["Musk", "Âmbar", "Madeira", "Baunilha"]
        },
        composition: {
            description: "Bambu Asiático (€12.000/kg) com Flor de Lótus (€12.000/kg)",
            ingredients: ["Bambu Asiático", "Flor de Lótus", "Musk", "Âmbar"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 223,
        rating_average: 4.6,
        slug: "bp-bvlgari-omnia-crystalline"
    },
    
    // AZZARO
    {
        name: "BP Azzaro Chrome",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "citrus_aromatic",
        inspiration: "Azzaro Chrome",
        original_price: 240.00,
        sale_price: 120.00,
        description: "A frescura cromada. Limão e ginestra para homens autênticos.",
        notes: {
            top: ["Limão", "Grapefruit", "Gengibre", "Pineapple"],
            middle: ["Jasmim", "Cardamomo", "Salvia", "Néroli"],
            base: ["Musk", "Cedro", "Sândalo", "Tahiti Vetiver"]
        },
        composition: {
            description: "Limão Amalfitano (€8.000/kg) com Ginestra Italiana (€10.000/kg)",
            ingredients: ["Limão Amalfitano", "Ginestra Italiana", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €25.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 45,
        is_featured: true,
        sales_count: 189,
        rating_average: 4.5,
        slug: "bp-azzaro-chrome"
    },
    
    {
        name: "BP Azzaro Pour Homme",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "aromatic_fougere",
        inspiration: "Azzaro Pour Homme",
        original_price: 260.00,
        sale_price: 130.00,
        description: "O clássico masculino. Lavanda e carvalho para homens tradicionais.",
        notes: {
            top: ["Lavanda", "Limoneto", "Bergamota", "Verbena"],
            middle: ["Cardamomo", "Gerânio", "Salvia", "Jasmim"],
            base: ["Carvalho", "Musk", "Cedro", "Sândalo"]
        },
        composition: {
            description: "Lavanda Provençal (€10.000/kg) com Carvalho Francês (€15.000/kg)",
            ingredients: ["Lavanda Provençal", "Carvalho Francês", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 234,
        rating_average: 4.6,
        slug: "bp-azzaro-pour-homme"
    },
    
    // FERRARI
    {
        name: "BP Ferrari Bright Neroli",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "citrus_aromatic",
        inspiration: "Ferrari Bright Neroli",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A velocidade fresca. Neroli e limão para homens velozes.",
        notes: {
            top: ["Neroli", "Limão", "Bergamota", "Grapefruit"],
            middle: ["Cardamomo", "Jasmim", "Gengibre", "Salvia"],
            base: ["Musk", "Cedro", "Sândalo", "Âmbar"]
        },
        composition: {
            description: "Neroli Italiano (€12.000/kg) com Limão Siciliano (€10.000/kg)",
            ingredients: ["Neroli Italiano", "Limão Siciliano", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 167,
        rating_average: 4.5,
        slug: "bp-ferrari-bright-neroli"
    },
    
    {
        name: "BP Ferrari Radical Essence",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Ferrari Radical Essence",
        original_price: 300.00,
        sale_price: 150.00,
        description: "A essência radical. Pimenta e madeira para homens intensos.",
        notes: {
            top: ["Pimenta", "Laranja", "Grapefruit", "Cardamomo"],
            middle: ["Lavanda", "Jasmim", "Nó Moscada", "Salvia"],
            base: ["Cedro", "Sândalo", "Vetiver", "Musk"]
        },
        composition: {
            description: "Pimenta Negra (€8.000/kg) com Cedro Atlas (€15.000/kg)",
            ingredients: ["Pimenta Negra", "Cedro Atlas", "Sândalo", "Vetiver"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 145,
        rating_average: 4.6,
        slug: "bp-ferrari-radical-essence"
    },
    
    // RALPH LAUREN
    {
        name: "BP Ralph Lauren Polo Blue",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "citrus_aromatic",
        inspiration: "Ralph Lauren Polo Blue",
        original_price: 260.00,
        sale_price: 130.00,
        description: "O azul do polo. Notas marinhas para homens livres.",
        notes: {
            top: ["Cucumber", "Melão", "Mandarina", "Verbena"],
            middle: ["Sálvia", "Gerânio", "Jasmim", "Basil"],
            base: ["Musk", "Sândalo", "Cedro", "Âmbar"]
        },
        composition: {
            description: "Pepino Japonês (€8.000/kg) com Melão Cantalupo (€6.000/kg)",
            ingredients: ["Pepino Japonês", "Melão Cantalupo", "Musk", "Sândalo"],
            luxury_value: "Composição avaliada em €25.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 42,
        is_featured: true,
        sales_count: 256,
        rating_average: 4.5,
        slug: "bp-ralph-lauren-polo-blue"
    },
    
    {
        name: "BP Ralph Lauren Romance",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Ralph Lauren Romance",
        original_price: 280.00,
        sale_price: 140.00,
        description: "O romance eterno. Rosa e gengibre para mulheres românticas.",
        notes: {
            top: ["Gengibre", "Pêra", "Lima", "Folha Violeta"],
            middle: ["Rosa", "Lírio", "Freesia", "Peônia"],
            base: ["Musk", "Sândalo", "Cedro", "Âmbar"]
        },
        composition: {
            description: "Rosa Inglesa (€12.000/kg) com Gengibre Orgânico (€15.000/kg)",
            ingredients: ["Rosa Inglesa", "Gengibre Orgânico", "Musk", "Sândalo"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 223,
        rating_average: 4.6,
        slug: "bp-ralph-lauren-romance"
    },
    
    // GIVENCHY
    {
        name: "BP Givenchy Gentleman",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "aromatic_woody",
        inspiration: "Givenchy Gentleman",
        original_price: 300.00,
        sale_price: 150.00,
        description: "O cavalheiro moderno. Noz moscada e couro para homens educados.",
        notes: {
            top: ["Noz Moscada", "Pimenta", "Bergamota", "Cardamomo"],
            middle: ["Iris", "Couro", "Salvia", "Gerânio"],
            base: ["Musk", "Cedro", "Sândalo", "Vetiver"]
        },
        composition: {
            description: "Noz Moscada de Grenada (€10.000/kg) com Couro Premium (€20.000/kg)",
            ingredients: ["Noz Moscada de Grenada", "Couro Premium", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 198,
        rating_average: 4.6,
        slug: "bp-givenchy-gentleman"
    },
    
    {
        name: "BP Givenchy Irresistible",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Givenchy Irresistible",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A irresistível feminina. Rosa e musk para mulheres encantadoras.",
        notes: {
            top: ["Pêra", "Pimenta Rosa", "Lichia", "Mandarina"],
            middle: ["Rosa", "Jasmim", "Lírio", "Peônia"],
            base: ["Musk", "Cedro", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Rosa Damascena (€15.000/kg) com Musk Branco (€15.000/kg)",
            ingredients: ["Rosa Damascena", "Musk Branco", "Pêra", "Cedro"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.7,
        slug: "bp-givenchy-irresistible"
    },
    
    // CAROLINA HERRERA
    {
        name: "BP Carolina Herrera Good Girl",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_floral",
        inspiration: "Carolina Herrera Good Girl",
        original_price: 340.00,
        sale_price: 170.00,
        description: "A garota má. Tuberosa e baunilha para mulheres ousadas.",
        notes: {
            top: ["Amêndoa", "Café", "Pêra", "Bergamota"],
            middle: ["Tuberose", "Jasmim", "Lírio", "Rosa"],
            base: ["Baunilha", "Cacau", "Musk", "Couro"]
        },
        composition: {
            description: "Tuberose Mexicana (€18.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Tuberose Mexicana", "Baunilha de Madagascar", "Café", "Cacau"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 356,
        rating_average: 4.8,
        slug: "bp-carolina-herrera-good-girl"
    },
    
    {
        name: "BP Carolina Herrera Bad Boy",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Carolina Herrera Bad Boy",
        original_price: 320.00,
        sale_price: 160.00,
        description: "O garoto mau. Pimenta e cacau para homens rebeldes.",
        notes: {
            top: ["Pimenta Preta", "Pimenta Branca", "Bergamota", "Cardamomo"],
            middle: ["Cacau", "Salvia", "Cedro", "Violeta"],
            base: ["Musk", "Vetiver", "Baunilha", "Couro"]
        },
        composition: {
            description: "Pimenta Preta (€8.000/kg) com Cacau Belga (€15.000/kg)",
            ingredients: ["Pimenta Preta", "Cacau Belga", "Musk", "Vetiver"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.7,
        slug: "bp-carolina-herrera-bad-boy"
    },
    
    // VIKTOR&ROLF
    {
        name: "BP Viktor&Rolf Flowerbomb",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_oriental",
        inspiration: "Viktor&Rolf Flowerbomb",
        original_price: 320.00,
        sale_price: 160.00,
        description: "A bomba floral. Centenas de flores para mulheres explosivas.",
        notes: {
            top: ["Bergamota", "Freesia", "Tea", "Osmanthus"],
            middle: ["Orquídea", "Rosa", "Jasmim", "Freesia"],
            base: ["Musk", "Âmbar", "Patchouli", "Baunilha"]
        },
        composition: {
            description: "Orquídea Phalaenopsis (€20.000/kg) com Rosa Centifolia (€15.000/kg)",
            ingredients: ["Orquídea Phalaenopsis", "Rosa Centifolia", "Musk", "Âmbar"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 378,
        rating_average: 4.8,
        slug: "bp-viktorrolf-flowerbomb"
    },
    
    {
        name: "BP Viktor&Rolf Spicebomb",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "spicy_woody",
        inspiration: "Viktor&Rolf Spicebomb",
        original_price: 300.00,
        sale_price: 150.00,
        description: "A bomba de especiarias. Canela e tabaco para homens intensos.",
        notes: {
            top: ["Pimenta", "Canela", "Laranja", "Bergamota"],
            middle: ["Couro", "Tabaco", "Cápsula", "Salvia"],
            base: ["Musk", "Vetiver", "Cedro", "Baunilha"]
        },
        composition: {
            description: "Canela do Ceilão (€15.000/kg) com Tabaco Virgínio (€18.000/kg)",
            ingredients: ["Canela do Ceilão", "Tabaco Virgínio", "Musk", "Vetiver"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.7,
        slug: "bp-viktorrolf-spicebomb"
    },
    
    // MUGLER
    {
        name: "BP Mugler Angel",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "oriental_gourmand",
        inspiration: "Mugler Angel",
        original_price: 340.00,
        sale_price: 170.00,
        description: "O anjo celestial. Chocolate e patchouli para mulheres divinas.",
        notes: {
            top: ["Red Fruits", "Melão", "Coco", "Peach"],
            middle: ["Honey", "Jasmim", "Lírio", "Orchid"],
            base: ["Chocolate", "Patchouli", "Baunilha", "Caramelo"]
        },
        composition: {
            description: "Chocolate Belga (€15.000/kg) com Patchouli da Indonésia (€18.000/kg)",
            ingredients: ["Chocolate Belga", "Patchouli da Indonésia", "Baunilha", "Mel"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 28,
        is_featured: true,
        sales_count: 334,
        rating_average: 4.8,
        slug: "bp-mugler-angel"
    },
    
    {
        name: "BP Mugler A*Men",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_spicy",
        inspiration: "Mugler A*Men",
        original_price: 320.00,
        sale_price: 160.00,
        description: "O homem estrela. Café e baunilha para homens únicos.",
        notes: {
            top: ["Menta", "Laranja", "Lavanda", "Bergamota"],
            middle: ["Café", "Caramelo", "Pimenta", "Salvia"],
            base: ["Baunilha", "Patchouli", "Couro", "Musk"]
        },
        composition: {
            description: "Café Colombiano (€15.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Café Colombiano", "Baunilha de Madagascar", "Patchouli", "Couro"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 32,
        is_featured: true,
        sales_count: 256,
        rating_average: 4.7,
        slug: "bp-mugler-amen"
    },
    
    // NARCISO RODRIGUEZ
    {
        name: "BP Narciso Rodriguez For Her",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_musky",
        inspiration: "Narciso Rodriguez For Her",
        original_price: 300.00,
        sale_price: 150.00,
        description: "A essência feminina. Musk e rosa para mulheres sensuais.",
        notes: {
            top: ["Rosa", "Pêssego", "Amêndoa", "Bergamota"],
            middle: ["Musk", "Jasmim", "Lírio", "Freesia"],
            base: ["Musk", "Cedro", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Musk Branco (€20.000/kg) com Rosa Damascena (€15.000/kg)",
            ingredients: ["Musk Branco", "Rosa Damascena", "Pêssego", "Cedro"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.7,
        slug: "bp-narciso-rodriguez-for-her"
    },
    
    {
        name: "BP Narciso Rodriguez For Him",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_musky",
        inspiration: "Narciso Rodriguez For Him",
        original_price: 280.00,
        sale_price: 140.00,
        description: "A essência masculina. Musk e violeta para homens charmosos.",
        notes: {
            top: ["Violeta", "Bergamota", "Cardamomo", "Pimenta"],
            middle: ["Musk", "Couro", "Salvia", "Gerânio"],
            base: ["Musk", "Cedro", "Vetiver", "Musk"]
        },
        composition: {
            description: "Violeta Africana (€12.000/kg) com Musk Branco (€20.000/kg)",
            ingredients: ["Violeta Africana", "Musk Branco", "Couro", "Cedro"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 198,
        rating_average: 4.6,
        slug: "bp-narciso-rodriguez-for-him"
    },
    
    // MARC JACOBS
    {
        name: "BP Marc Jacobs Daisy",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_fruity",
        inspiration: "Marc Jacobs Daisy",
        original_price: 260.00,
        sale_price: 130.00,
        description: "A margarida feliz. Morango e violeta para mulheres alegres.",
        notes: {
            top: ["Morango", "Grapefruit", "Violeta", "Margarida"],
            middle: ["Jasmim", "Rosa", "Lírio", "Freesia"],
            base: ["Musk", "Cedro", "Baunilha", "Âmbar"]
        },
        composition: {
            description: "Morango Selvagem (€8.000/kg) com Violeta Africana (€12.000/kg)",
            ingredients: ["Morango Selvagem", "Violeta Africana", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €28.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 312,
        rating_average: 4.6,
        slug: "bp-marc-jacobs-daisy"
    },
    
    {
        name: "BP Marc Jacobs Bang",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Marc Jacobs Bang",
        original_price: 240.00,
        sale_price: 120.00,
        description: "A explosão masculina. Pimenta e madeira para homens explosivos.",
        notes: {
            top: ["Pimenta Preta", "Pimenta Rosa", "Menta", "Bergamota"],
            middle: ["Couro", "Salvia", "Cedro", "Jasmim"],
            base: ["Musk", "Vetiver", "Sândalo", "Baunilha"]
        },
        composition: {
            description: "Pimenta Preta (€8.000/kg) com Couro Premium (€20.000/kg)",
            ingredients: ["Pimenta Preta", "Couro Premium", "Musk", "Vetiver"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 167,
        rating_average: 4.5,
        slug: "bp-marc-jacobs-bang"
    },
    
    // XERJOFF
    {
        name: "BP Xerjoff Naxos",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_spicy",
        inspiration: "Xerjoff Naxos",
        original_price: 500.00,
        sale_price: 250.00,
        description: "A ilha luxuosa. Tabaco e mel para homens nobres.",
        notes: {
            top: ["Lavanda", "Bergamota", "Cardamomo", "Pimenta"],
            middle: ["Honey", "Tobacco", "Canela", "Jasmim"],
            base: ["Musk", "Couro", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Mel Grego (€25.000/kg) com Tabaco Cubano (€22.000/kg)",
            ingredients: ["Mel Grego", "Tabaco Cubano", "Musk", "Couro"],
            luxury_value: "Composição avaliada em €60.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 20,
        is_featured: true,
        sales_count: 134,
        rating_average: 4.9,
        slug: "bp-xerjoff-naxos"
    },
    
    {
        name: "BP Xerjoff Alexandria II",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "woody_spicy",
        inspiration: "Xerjoff Alexandria II",
        original_price: 550.00,
        sale_price: 280.00,
        description: "A cidade antiga. Âmbar e madeira para personalidades históricas.",
        notes: {
            top: ["Canela", "Pimenta", "Bergamota", "Lavanda"],
            middle: ["Âmbar", "Couro", "Jasmim", "Rosa"],
            base: ["Musk", "Sândalo", "Cedro", "Baunilha"]
        },
        composition: {
            description: "Âmbar Gris (€30.000/kg) com Sândalo Indiano (€25.000/kg)",
            ingredients: ["Âmbar Gris", "Sândalo Indiano", "Couro", "Musk"],
            luxury_value: "Composição avaliada em €70.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 15,
        is_featured: true,
        sales_count: 98,
        rating_average: 4.9,
        slug: "bp-xerjoff-alexandria-ii"
    },
    
    // MAISON FRANCIS KURKDJIAN
    {
        name: "BP MFK Baccarat Rouge 540",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "floral_amber",
        inspiration: "Maison Francis Kurkdjian Baccarat Rouge 540",
        original_price: 600.00,
        sale_price: 300.00,
        description: "O cristal vermelho. Âmbar e jasmim para personalidades únicas.",
        notes: {
            top: ["Jasmim", "Açafrão", "Bergamota", "Groselha"],
            middle: ["Âmbergris", "Cedro", "Madeira", "Jasmim"],
            base: ["Musk", "Baunilha", "Couro", "Âmbar"]
        },
        composition: {
            description: "Âmbar Gris Natural (€35.000/kg) com Açafrão Iraniano (€40.000/kg)",
            ingredients: ["Âmbar Gris Natural", "Açafrão Iraniano", "Jasmim", "Musk"],
            luxury_value: "Composição avaliada em €80.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 12,
        is_featured: true,
        sales_count: 156,
        rating_average: 5.0,
        slug: "bp-mfk-baccarat-rouge-540"
    },
    
    {
        name: "BP MFK Grand Soir",
        brand: "Brian Peterson Inspired",
        category: "feminino",
        fragrance_family: "floral_amber",
        inspiration: "Maison Francis Kurkdjian Grand Soir",
        original_price: 550.00,
        sale_price: 280.00,
        description: "A grande noite. Baunilha e âmbar para mulheres noturnas.",
        notes: {
            top: ["Baunilha", "Âmbar", "Bergamota", "Laranja"],
            middle: ["Jasmim", "Rosa", "Lírio", "Freesia"],
            base: ["Musk", "Cedro", "Sândalo", "Baunilha"]
        },
        composition: {
            description: "Baunilha de Tahiti (€25.000/kg) com Âmbar Sólido (€30.000/kg)",
            ingredients: ["Baunilha de Tahiti", "Âmbar Sólido", "Jasmim", "Musk"],
            luxury_value: "Composição avaliada em €70.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 18,
        is_featured: true,
        sales_count: 112,
        rating_average: 4.9,
        slug: "bp-mfk-grand-soir"
    },
    
    // BDK PARFUMS
    {
        name: "BP BDK Parfums Tabac Rose",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "floral_spicy",
        inspiration: "BDK Parfums Tabac Rose",
        original_price: 480.00,
        sale_price: 240.00,
        description: "A rosa tabaco. Tabaco e rosa para personalidades sofisticadas.",
        notes: {
            top: ["Tabaco", "Rosa", "Pimenta", "Bergamota"],
            middle: ["Jasmim", "Lírio", "Canela", "Salvia"],
            base: ["Musk", "Couro", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Tabaco Turco (€25.000/kg) com Rosa de Grasse (€20.000/kg)",
            ingredients: ["Tabaco Turco", "Rosa de Grasse", "Musk", "Couro"],
            luxury_value: "Composição avaliada em €60.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 16,
        is_featured: true,
        sales_count: 89,
        rating_average: 4.8,
        slug: "bp-bdk-parfums-tabac-rose"
    },
    
    {
        name: "BP BDK Parfums Gris Charnel",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "floral_musky",
        inspiration: "BDK Parfums Gris Charnel",
        original_price: 520.00,
        sale_price: 260.00,
        description: "O cinza carnal. Peônia e musk para personalidades intensas.",
        notes: {
            top: ["Peônia", "Bergamota", "Cardamomo", "Pimenta"],
            middle: ["Musk", "Jasmim", "Lírio", "Rosa"],
            base: ["Musk", "Couro", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Peônia Imperial (€22.000/kg) com Musk Branco (€25.000/kg)",
            ingredients: ["Peônia Imperial", "Musk Branco", "Couro", "Baunilha"],
            luxury_value: "Composição avaliada em €65.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 14,
        is_featured: true,
        sales_count: 76,
        rating_average: 4.9,
        slug: "bp-bdk-parfums-gris-charnel"
    },
    
    // LOUIS VUITTON
    {
        name: "BP Louis Vuitton Imagination",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "woody_spicy",
        inspiration: "Louis Vuitton Imagination",
        original_price: 650.00,
        sale_price: 320.00,
        description: "A imaginação infinita. Âmbar e cactus para mentes criativas.",
        notes: {
            top: ["Cactus", "Bergamota", "Pimenta", "Cardamomo"],
            middle: ["Âmbar", "Jasmim", "Lírio", "Rosa"],
            base: ["Musk", "Couro", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Cactus Flower (€28.000/kg) com Âmbar Gris (€35.000/kg)",
            ingredients: ["Cactus Flower", "Âmbar Gris", "Musk", "Couro"],
            luxury_value: "Composição avaliada em €85.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 10,
        is_featured: true,
        sales_count: 67,
        rating_average: 4.9,
        slug: "bp-louis-vuitton-imagination"
    },
    
    {
        name: "BP Louis Vuitton On The Beach",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "citrus_floral",
        inspiration: "Louis Vuitton On The Beach",
        original_price: 600.00,
        sale_price: 300.00,
        description: "O dia na praia. Laranja e gengibre para almas livres.",
        notes: {
            top: ["Laranja", "Gengibre", "Bergamota", "Cardamomo"],
            middle: ["Jasmim", "Rosa", "Lírio", "Freesia"],
            base: ["Musk", "Cedro", "Sândalo", "Âmbar"]
        },
        composition: {
            description: "Laranja Sanguínea (€15.000/kg) com Gengibre Orgânico (€18.000/kg)",
            ingredients: ["Laranja Sanguínea", "Gengibre Orgânico", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €75.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 12,
        is_featured: true,
        sales_count: 78,
        rating_average: 4.8,
        slug: "bp-louis-vuitton-on-the-beach"
    },
    
    // NISHANE
    {
        name: "BP Nishane Hacivat",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "citrus_aromatic",
        inspiration: "Nishane Hacivat",
        original_price: 580.00,
        sale_price: 290.00,
        description: "O som da noite. Ananas e bergamota para homens charmosos.",
        notes: {
            top: ["Ananas", "Bergamota", "Grapefruit", "Laranja"],
            middle: ["Jasmim", "Salvia", "Gerânio", "Néroli"],
            base: ["Musk", "Cedro", "Sândalo", "Âmbar"]
        },
        composition: {
            description: "Ananas Premium (€20.000/kg) com Bergamota Calabresa (€12.000/kg)",
            ingredients: ["Ananas Premium", "Bergamota Calabresa", "Musk", "Cedro"],
            luxury_value: "Composição avaliada em €70.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 11,
        is_featured: true,
        sales_count: 89,
        rating_average: 4.9,
        slug: "bp-nishane-hacivat"
    },
    
    {
        name: "BP Nishane Ani",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "floral_vanilla",
        inspiration: "Nishane Ani",
        original_price: 620.00,
        sale_price: 310.00,
        description: "A cidade antiga. Baunilha e violeta para personalidades históricas.",
        notes: {
            top: ["Violeta", "Bergamota", "Cardamomo", "Pimenta"],
            middle: ["Baunilha", "Jasmim", "Lírio", "Rosa"],
            base: ["Musk", "Couro", "Baunilha", "Cedro"]
        },
        composition: {
            description: "Violeta Africana (€18.000/kg) com Baunilha de Madagascar (€20.000/kg)",
            ingredients: ["Violeta Africana", "Baunilha de Madagascar", "Musk", "Couro"],
            luxury_value: "Composição avaliada em €75.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 9,
        is_featured: true,
        sales_count: 72,
        rating_average: 5.0,
        slug: "bp-nishane-ani"
    }
];

module.exports = allBrandsPerfumes;
