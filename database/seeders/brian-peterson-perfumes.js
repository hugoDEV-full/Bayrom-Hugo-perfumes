// Catálogo completo de perfumes do Brian Peterson
// Bayrom & Hugo Parfums - Versões inspiradas com composição milionária

const brianPetersonPerfumes = [
    // PRODUTOS EM DESTAQUE
    {
        name: "XVI - Inspiração Olfativa Mango Kiss",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "frutal",
        inspiration: "Stephane Humbert Lucas | Soleil de Jeddah",
        original_price: 280.00,
        sale_price: 170.00,
        description: "Uma fragrância tropical exótica que combina manga doce com notas solares vibrantes. Inspirada na luxúria dos mercados árabes.",
        notes: {
            top: ["Manga Doce", "Pêssego", "Laranja", "Coco"],
            middle: ["Jasmim", "Flor de Laranjeira", "Mel", "Baunilha"],
            base: ["Sândalo", "Musk", "Âmbar", "Cedro"]
        },
        composition: {
            description: "Essência de Manga Premium (€8.000/kg) combinada com Mel de Jasmim (€12.000/kg)",
            ingredients: ["Óleo de Manga", "Absoluto de Jasmim", "Mel de Acácia", "Sândalo Indiano"],
            luxury_value: "Composição avaliada em €25.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 50,
        is_featured: true,
        sales_count: 245,
        rating_average: 4.8,
        slug: "xvi-mango-kiss-stephane-humbert-lucas-soleil-de-jeddah"
    },
    
    {
        name: "LIII - Inspiração Olfativa Layton",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Parfums de Marly - Layton",
        original_price: 320.00,
        sale_price: 180.00,
        description: "Elegância britânica em frasco. Uma fragrância poderosa para homens sofisticados que não passam despercebidos.",
        notes: {
            top: ["Maçã", "Abacaxi", "Bergamota", "Noz Moscada"],
            middle: ["Jasmim", "Gerânio", "Patchouli", "Cardamomo"],
            base: ["Baunilha", "Vetiver", "Couro", "Musk"]
        },
        composition: {
            description: "Óleo de Baunilha de Madagascar (€15.000/kg) com Couro Premium (€25.000/kg)",
            ingredients: ["Baunilha de Madagascar", "Couro Italiano", "Vetiver Haitiano", "Patchouli"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 45,
        is_featured: true,
        sales_count: 312,
        rating_average: 4.9,
        slug: "liii-layton-parfums-de-marly"
    },
    
    {
        name: "LIX - Inspiração Olfativa Aventus",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "fruity_chypre",
        inspiration: "Creed - Aventus",
        original_price: 380.00,
        sale_price: 170.00,
        description: "A fragrância do sucesso. Notas de frutas pretas combinadas com musk e baunilha para o homem vitorioso.",
        notes: {
            top: ["Maçã Preta", "Abacaxi", "Bergamota", "Limão Siciliano"],
            middle: ["Jasmim", "Patchouli", "Bétula", "Rosa"],
            base: ["Musk", "Baunilha", "Âmbar", "Carvalho"]
        },
        composition: {
            description: "Essência de Maçã Preta Premium (€18.000/kg) com Musk Branco (€22.000/kg)",
            ingredients: ["Óleo de Maçã Preta", "Musk Branco", "Baunilha de Madagascar", "Patchouli"],
            luxury_value: "Composição avaliada em €45.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 60,
        is_featured: true,
        sales_count: 456,
        rating_average: 4.9,
        slug: "lix-aventus-creed"
    },
    
    {
        name: "CVII - Inspiração Olfativa Kalan",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Parfums de Marly - Kalan",
        original_price: 320.00,
        sale_price: 170.00,
        description: "Modernidade e sofisticação em perfeita harmonia. Uma fragrância contemporânea para o homem urbano.",
        notes: {
            top: ["Laranja Sangue", "Especiarias", "Baunilha", "Tabaco"],
            middle: ["Lavanda", "Jasmim", "Canela", "Nóz Moscada"],
            base: ["Sândalo", "Couro", "Musk", "Patchouli"]
        },
        composition: {
            description: "Óleo de Laranja Sangue (€12.000/kg) com Tabaco Premium (€20.000/kg)",
            ingredients: ["Laranja Sangue", "Tabaco Virgínia", "Sândalo Indiano", "Couro"],
            luxury_value: "Composição avaliada em €38.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 40,
        is_featured: true,
        sales_count: 189,
        rating_average: 4.7,
        slug: "cvii-kalan-parfums-de-marly"
    },
    
    {
        name: "LXVIII - Inspiração Olfativa Blessed Baraka",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "oriental_spicy",
        inspiration: "Initio Parfums Prives - Blessed Baraka",
        original_price: 300.00,
        sale_price: 160.00,
        description: "A bênção divina em fragrância. Poder espiritual e magnetismo em uma composição mística e envolvente.",
        notes: {
            top: ["Açafrão", "Canela", "Noz Moscada", "Pimenta"],
            middle: ["Rosa", "Jasmim", "Praliné", "Mel"],
            base: ["Âmbar", "Musk", "Baunilha", "Couro"]
        },
        composition: {
            description: "Açafrão Iraniano Premium (€40.000/kg) com Âmbar Gris Natural (€25.000/kg)",
            ingredients: ["Açafrão Iraniano", "Âmbar Gris", "Rosa Bulgária", "Baunilha"],
            luxury_value: "Composição avaliada em €65.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 35,
        is_featured: true,
        sales_count: 267,
        rating_average: 4.8,
        slug: "lxviii-blessed-baraka-initio-parfums-prives"
    },
    
    {
        name: "XLIII - Inspiração Creed Aventus Absolu",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "fruity_chypre",
        inspiration: "Creed - Aventus Absolu",
        original_price: 280.00,
        sale_price: 150.00,
        description: "A evolução do clássico. Mais intensa, mais duradoura, mais poderosa. O sucesso em sua forma absoluta.",
        notes: {
            top: ["Grapefruit", "Lima", "Maçã Verde", "Pimenta Rosa"],
            middle: ["Jasmim", "Patchouli", "Violeta", "Gengibre"],
            base: ["Musk", "Baunilha", "Cedro", "Carvalho"]
        },
        composition: {
            description: "Grapefruit Premium (€15.000/kg) com Patchouli Raro (€18.000/kg)",
            ingredients: ["Grapefruit", "Patchouli", "Baunilha", "Cedro Atlas"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 55,
        is_featured: true,
        sales_count: 334,
        rating_average: 4.8,
        slug: "xliii-aventus-absolu-creed"
    },
    
    {
        name: "CIX - Inspiração Side Effect",
        brand: "Brian Peterson Inspired",
        category: "unisex",
        fragrance_family: "oriental_vanilla",
        inspiration: "Initio Parfums Prives - Side Effect",
        original_price: 350.00,
        sale_price: 180.00,
        description: "O efeito colateral do desejo. Uma fragrância viciante que desperta os sentidos mais profundos.",
        notes: {
            top: ["Baunilha", "Canela", "Nóz Moscada", "Pimenta"],
            middle: ["Rosa", "Jasmim", "Cacau", "Tabaco"],
            base: ["Musk", "Âmbar", "Baunilha", "Couro"]
        },
        composition: {
            description: "Baunilha de Madagascar Premium (€15.000/kg) com Cacau Belga (€20.000/kg)",
            ingredients: ["Baunilha de Madagascar", "Cacau Belga", "Rosa Bulgária", "Musk"],
            luxury_value: "Composição avaliada em €45.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 30,
        is_featured: true,
        sales_count: 412,
        rating_average: 4.9,
        slug: "cix-side-effect-initio-parfums-prives"
    },
    
    {
        name: "CXIII - Inspiração Olfativa Layton Exclusif",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Parfums de Marly - Layton Exclusif",
        original_price: 350.00,
        sale_price: 180.00,
        description: "A exclusividade em sua forma mais pura. Uma edição limitada para homens que exigem o melhor.",
        notes: {
            top: ["Maçã", "Abacaxi", "Cardamomo", "Noz Moscada"],
            middle: ["Jasmim", "Gerânio", "Patchouli", "Canela"],
            base: ["Baunilha", "Vetiver", "Couro", "Musk"]
        },
        composition: {
            description: "Cardamomo Premium (€25.000/kg) com Couro Exótico (€30.000/kg)",
            ingredients: ["Cardamomo", "Couro de Crocodilo", "Baunilha", "Vetiver"],
            luxury_value: "Composição avaliada em €55.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 25,
        is_featured: true,
        sales_count: 198,
        rating_average: 4.9,
        slug: "cxiii-layton-exclusif-parfums-de-marly"
    },
    
    {
        name: "CXIV - Inspiração Olfativa Percival",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_fresh",
        inspiration: "Parfums de Marly - Percival",
        original_price: 280.00,
        sale_price: 150.00,
        description: "O cavaleiro moderno. Frescor e força em uma fragrância para homens de coragem e honra.",
        notes: {
            top: ["Menta", "Lavanda", "Mandarina", "Gengibre"],
            middle: ["Jasmim", "Cardamomo", "Gerânio", "Noz Moscada"],
            base: ["Vetiver", "Sândalo", "Cedro", "Musk"]
        },
        composition: {
            description: "Menta Peppermint Premium (€10.000/kg) com Vetiver Haitiano (€20.000/kg)",
            ingredients: ["Menta Peppermint", "Vetiver Haitiano", "Sândalo Indiano", "Cedro"],
            luxury_value: "Composição avaliada em €32.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 50,
        is_featured: true,
        sales_count: 276,
        rating_average: 4.7,
        slug: "cxiv-percival-parfums-de-marly"
    },
    
    {
        name: "LXXV - Inspiração Olfativa Haltane",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Parfums de Marly - Haltane",
        original_price: 320.00,
        sale_price: 170.00,
        description: "A nobreza árabe em frasco. Uma fragrância poderosa para homens de sangue real.",
        notes: {
            top: ["Pimenta", "Cardamomo", "Noz Moscada", "Açafrão"],
            middle: ["Jasmim", "Rosa", "Praliné", "Mel"],
            base: ["Couro", "Musk", "Âmbar", "Baunilha"]
        },
        composition: {
            description: "Açafrão Premium (€40.000/kg) com Couro Árabe (€28.000/kg)",
            ingredients: ["Açafrão Iraniano", "Couro Árabe", "Rosa Damascena", "Baunilha"],
            luxury_value: "Composição avaliada em €50.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 38,
        is_featured: true,
        sales_count: 223,
        rating_average: 4.8,
        slug: "lxxv-haltane-parfums-de-marly"
    },
    
    {
        name: "LIV - Inspiração Olfativa Herod",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "oriental_vanilla",
        inspiration: "Parfums de Marly - Herod",
        original_price: 280.00,
        sale_price: 150.00,
        description: "O rei dos reis. Uma fragrância imperial com baunilha e tabaco para governantes.",
        notes: {
            top: ["Pimenta", "Canela", "Tangerina", "Cardamomo"],
            middle: ["Tobacco", "Violeta", "Jasmim", "Rosa"],
            base: ["Baunilha", "Âmbar", "Musk", "Patchouli"]
        },
        composition: {
            description: "Tabaco Virgínio Premium (€22.000/kg) com Baunilha de Madagascar (€15.000/kg)",
            ingredients: ["Tabaco Virgínio", "Baunilha de Madagascar", "Pimenta Rosa", "Âmbar"],
            luxury_value: "Composição avaliada em €40.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 42,
        is_featured: true,
        sales_count: 289,
        rating_average: 4.8,
        slug: "liv-herod-parfums-de-marly"
    },
    
    {
        name: "LX - Inspiração Olfativa Sauvage Elixir",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Christian Dior - Sauvage Elixir",
        original_price: 280.00,
        sale_price: 150.00,
        description: "A essência do selvagem em sua forma mais concentrada. Poder e intensidade em gotas.",
        notes: {
            top: ["Grapefruit", "Especiarias", "Pimenta", "Cardamomo"],
            middle: ["Lavanda", "Jasmim", "Gerânio", "Noz Moscada"],
            base: ["Cedro", "Sândalo", "Musk", "Âmbar"]
        },
        composition: {
            description: "Grapefruit Premium (€15.000/kg) com Especiarias Raras (€18.000/kg)",
            ingredients: ["Grapefruit", "Pimenta Rosa", "Cedro Atlas", "Musk Branco"],
            luxury_value: "Composição avaliada em €35.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 48,
        is_featured: true,
        sales_count: 367,
        rating_average: 4.8,
        slug: "lx-sauvage-elixir-christian-dior"
    },
    
    {
        name: "VII - Inspiração Olfativa Althair",
        brand: "Brian Peterson Inspired",
        category: "masculino",
        fragrance_family: "woody_spicy",
        inspiration: "Parfums de Marly - Althair",
        original_price: 260.00,
        sale_price: 140.00,
        description: "O ouro líquido em fragrância. Luxo e sofisticação para homens que brilham.",
        notes: {
            top: ["Laranja", "Cardamomo", "Noz Moscada", "Pimenta"],
            middle: ["Jasmim", "Rosa", "Praliné", "Canela"],
            base: ["Baunilha", "Sândalo", "Musk", "Âmbar"]
        },
        composition: {
            description: "Óleo de Laranja Premium (€12.000/kg) com Baunilha Dourada (€18.000/kg)",
            ingredients: ["Laranja Siciliana", "Baunilha Dourada", "Sândalo Indiano", "Musk"],
            luxury_value: "Composição avaliada em €30.000 por litro"
        },
        sizes: ["50ml", "100ml"],
        stock: 52,
        is_featured: true,
        sales_count: 156,
        rating_average: 4.6,
        slug: "vii-althair-parfums-de-marly"
    }
];

module.exports = brianPetersonPerfumes;
