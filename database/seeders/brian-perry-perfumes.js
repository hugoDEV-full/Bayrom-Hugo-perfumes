// Catálogo completo de perfumes inspirados em Brian Perry Fragrances
// Bayrom & Hugo Parfums - Versões inspiradas com composição milionária

const brianPerryPerfumes = [
    // COLEÇÃO BRIAN PERRY - FEMININO
    {
        name: "BP Royal Elixir Feminino",
        brand: "Brian Perry Inspired",
        category: "feminino",
        fragrance_family: "floral",
        inspiration: "Brian Perry Royal Elixir",
        original_price: 890.00,
        sale_price: 189.90,
        description: "Uma fragrância real que combina notas florais exclusivas com um toque de luxo absoluto. Inspirada na elegância da realeza europeia.",
        notes: {
            top: ["Pêra Bergamota", "Litchi Rosa", "Rosa Damascena"],
            middle: ["Jasmim Sambac", "Rosas Bulgárias", "Orquídea Negra"],
            base: ["Baunilha de Madagascar", "Âmbar Gris", "Musk Branco"]
        },
        composition: {
            luxury_value: "$1.200/ml - Fragrância Real",
            ingredients: [
                "Óleo de Rosa Bulgária: 5.000 rosas/kg - €15.000/kg",
                "Absoluto de Jasmim Sambac: 8.000 flores/kg - €18.000/kg", 
                "Baunilha Bourbon Premium: 2.000 vagens/kg - €12.000/kg",
                "Âmbar Gris Natural: €25.000/kg",
                "Litchi Rosa Importado: €8.000/kg"
            ],
            description: "Criada com as mais raras flores do mundo, esta fragrância representa o ápice da perfumaria feminina."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 50,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-royal-elixir-fem.jpg",
        rating_average: 4.8,
        sales_count: 245
    },
    
    {
        name: "BP Diamond Dreams Feminino", 
        brand: "Brian Perry Inspired",
        category: "feminino",
        fragrance_family: "oriental",
        inspiration: "Brian Perry Diamond Dreams",
        original_price: 750.00,
        sale_price: 169.90,
        description: "O brilho dos diamantes em uma fragrância que captura a essência do luxo e da sofisticação feminina.",
        notes: {
            top: ["Pêssego Branco", "Amora Silvestre", "Cassis"],
            middle: ["Jasmim Arbóreo", "Flor de Laranjeira", "Rosa de Maio"],
            base: ["Prata Líquida", "Sândalo Australiano", "Baunilha Caramelo"]
        },
        composition: {
            luxury_value: "$950/ml - Joia Líquida",
            ingredients: [
                "Essência de Prata Líquida: €22.000/kg",
                "Absoluto de Flor de Laranjeira: €6.000/kg",
                "Sândalo Australiano: €20.000/kg",
                "Pêssego Branco de Grasse: €10.000/kg",
                "Baunilha Caramelo: €14.000/kg"
            ],
            description: "Uma criação única que transforma a preciosidade dos diamantes em fragrância."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 45,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-diamond-dreams-fem.jpg",
        rating_average: 4.7,
        sales_count: 198
    },
    
    {
        name: "BP Midnight Rose Feminino",
        brand: "Brian Perry Inspired", 
        category: "feminino",
        fragrance_family: "floral",
        inspiration: "Brian Perry Midnight Rose",
        original_price: 680.00,
        sale_price: 149.90,
        description: "A rosa da meia-noite revela seu mistério em uma fragrância envolvente e sedutora.",
        notes: {
            top: ["Rosa Negra", "Pimenta Rosa", "Bergamota Italiana"],
            middle: ["Rosa Centifolia", "Jasmim Egípcio", "Violeta Africana"],
            base: ["Patchouli Premium", "Vetiver Haitiano", "Musk de Ambrette"]
        },
        composition: {
            luxury_value: "$850/ml - Rosa Noturna",
            ingredients: [
                "Rosa Negra de Grasse: 3.000 rosas/kg - €20.000/kg",
                "Patchouli Premium de Bali: €8.000/kg",
                "Vetiver Haitiano: €12.000/kg",
                "Musk de Ambrette: €18.000/kg",
                "Jasmim Egípcio: €10.000/kg"
            ],
            description: "A rosa mais rara e misteriosa capturada em sua essência mais pura."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 60,
        status: "active",
        image_url: "/images/perfumes/bp-midnight-rose-fem.jpg",
        rating_average: 4.6,
        sales_count: 167
    },
    
    // COLEÇÃO BRIAN PERRY - MASCULINO
    {
        name: "BP Imperial Leather Masculino",
        brand: "Brian Perry Inspired",
        category: "masculino", 
        fragrance_family: "amadeirado",
        inspiration: "Brian Perry Imperial Leather",
        original_price: 920.00,
        sale_price: 199.90,
        description: "A força do couro imperial combinada com madeiras nobres para o homem que comanda respeito.",
        notes: {
            top: "Açafrão, Limão Siciliano, Bergamota, Cardamomo",
            middle: "Couro Russo, Praliné, Canela, Íris Florentina",
            base: "Cedro Atlas, Sândalo Indiano, Couro de Bezerro, Musk"
        },
        composition: {
            luxury_value: "$1.500/ml - Couro Imperial",
            ingredients: [
                "Couro Russo Premium: €35.000/kg",
                "Íris Florentina: €45.000/kg",
                "Sândalo Indiano: €28.000/kg",
                "Açafrão Iraniano: €40.000/kg",
                "Couro de Bezerro Francês: €30.000/kg"
            ],
            description: "O couro mais exclusivo do mundo combinado com as madeiras mais nobres."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 40,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-imperial-leather-masc.jpg",
        rating_average: 4.9,
        sales_count: 289
    },
    
    {
        name: "BP Noble Spirit Masculino",
        brand: "Brian Perry Inspired",
        category: "masculino",
        fragrance_family: "oriental",
        inspiration: "Brian Perry Noble Spirit", 
        original_price: 850.00,
        sale_price: 189.90,
        description: "O espírito nobre em uma fragrância que define poder, elegância e tradição.",
        notes: {
            top: "Gin Juniperus, Laranja Amarga, Angélica, Pimenta Negra",
            middle: "Tília, Noz Moscada, Coriandro, Gerânio",
            base: "Couro, Cedro, Vetiver, Âmbar"
        },
        composition: {
            luxury_value: "$1.200/ml - Espírito Nobre",
            ingredients: [
                "Gin Juniperus Premium: €15.000/kg",
                "Angélica da Dinamarca: €12.000/kg",
                "Couro Nobre: €25.000/kg",
                "Vetiver de Java: €18.000/kg",
                "Âmbar Cinzento: €20.000/kg"
            ],
            description: "Inspirada nos melhores gins escoceses e na tradição da perfumaria nobre."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 55,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-noble-spirit-masc.jpg",
        rating_average: 4.8,
        sales_count: 224
    },
    
    {
        name: "BP Urban Knight Masculino",
        brand: "Brian Perry Inspired",
        category: "masculino",
        fragrance_family: "citrico",
        inspiration: "Brian Perry Urban Knight",
        original_price: 720.00,
        sale_price: 159.90,
        description: "O cavaleiro urbano que domina a cidade com estilo e confiança inabalável.",
        notes: {
            top: "Lima da Pérsia, Bergamota Calabresa, Mandarina, Gengibre",
            middle: "Cardamomo, Lavandin, Gerânio, Pimenta Rosa",
            base: "Vetiver, Sândalo, Patchouli, Musk"
        },
        composition: {
            luxury_value: "$900/ml - Cavaleiro Urbano",
            ingredients: [
                "Lima da Pérsia Rara: €18.000/kg",
                "Bergamota Calabresa DOP: €12.000/kg",
                "Vetiver de Haiti: €15.000/kg",
                "Cardamomo de Guatemala: €10.000/kg",
                "Gengibre Orgânico: €8.000/kg"
            ],
            description: "A energia das grandes cidades capturada em notas cítricas e amadeiradas."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 65,
        status: "active",
        image_url: "/images/perfumes/bp-urban-knight-masc.jpg",
        rating_average: 4.7,
        sales_count: 189
    },
    
    // COLEÇÃO BRIAN PERRY - UNISEX
    {
        name: "BP Crystal Waters Unisex",
        brand: "Brian Perry Inspired",
        category: "unisex",
        fragrance_family: "aquatico",
        inspiration: "Brian Perry Crystal Waters",
        original_price: 780.00,
        sale_price: 179.90,
        description: "A pureza das águas cristalinas em uma fragrância que transcende gêneros e fronteiras.",
        notes: {
            top: "Água de Coco, Bergamota, Limão Siciliano, Mandarina",
            middle: "Jasmim, Sal Marinho, Algas Marinhas, Flor de Laranjeira",
            base: "Musk Branco, Âmbar, Madeira de Cedro, Algas"
        },
        composition: {
            luxury_value: "$1.100/ml - Águas Cristalinas",
            ingredients: [
                "Água de Coco de Fiji: €14.000/kg",
                "Sal Marinho do Himalaia: €6.000/kg",
                "Algas Marinhas Raras: €20.000/kg",
                "Musk Branco Sintético: €12.000/kg",
                "Âmbar do Báltico: €16.000/kg"
            ],
            description: "A essência dos oceanos mais puros do mundo em uma fragrância única."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 50,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-crystal-waters-unisex.jpg",
        rating_average: 4.8,
        sales_count: 201
    },
    
    {
        name: "BP Golden Sunset Unisex",
        brand: "Brian Perry Inspired",
        category: "unisex",
        fragrance_family: "oriental",
        inspiration: "Brian Perry Golden Sunset",
        original_price: 820.00,
        sale_price: 189.90,
        description: "O dourado do pôr do sol capturado em uma fragrância quente e envolvente.",
        notes: {
            top: "Manga, Laranja Blood, Pêssego, Bergamota",
            middle: "Açafrão, Jasmim, Rosa, Flor de Lis",
            base: "Baunilha, Sândalo, Patchouli, Âmbar"
        },
        composition: {
            luxury_value: "$1.300/ml - Pôr do Sol Dourado",
            ingredients: [
                "Manga Alphonso Rara: €15.000/kg",
                "Laranja Blood da Sicília: €12.000/kg",
                "Açafrão Cachemira: €40.000/kg",
                "Flor de Lis Premium: €18.000/kg",
                "Baunilha de Madagascar: €14.000/kg"
            ],
            description: "A beleza do pôr do sol transformada em fragrância dourada e preciosa."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 45,
        status: "active",
        image_url: "/images/perfumes/bp-golden-sunset-unisex.jpg",
        rating_average: 4.7,
        sales_count: 176
    },
    
    {
        name: "BP Mystic Forest Unisex",
        brand: "Brian Perry Inspired",
        category: "unisex",
        fragrance_family: "amadeirado",
        inspiration: "Brian Perry Mystic Forest",
        original_price: 750.00,
        sale_price: 169.90,
        description: "A floresta mística revela seus segredos em uma fragrância profunda e enigmática.",
        notes: {
            top: "Pinho Siberiano, Eucalipto, Hortelã, Limão",
            middle: "Cipreste, Tea Tree, Jasmim, Pimenta",
            base: "Cedro, Vetiver, Musk, Patchouli"
        },
        composition: {
            luxury_value: "$1.000/ml - Floresta Mística",
            ingredients: [
                "Pinho Siberiano: €10.000/kg",
                "Cipreste do Mediterrâneo: €14.000/kg",
                "Cedro do Líbano: €22.000/kg",
                "Vetiver de Java: €16.000/kg",
                "Patchouli de Bali: €12.000/kg"
            ],
            description: "As árvores mais antigas e misteriosas do mundo em harmonia perfeita."
        },
        sizes: ["30ml", "50ml", "100ml"],
        stock: 55,
        status: "active",
        image_url: "/images/perfumes/bp-mystic-forest-unisex.jpg",
        rating_average: 4.6,
        sales_count: 154
    },
    
    // COLEÇÃO EXCLUSIVA BRIAN PERRY - LIMITED EDITION
    {
        name: "BP Platinum Elite Masculino",
        brand: "Brian Perry Inspired",
        category: "masculino",
        fragrance_family: "oriental",
        inspiration: "Brian Perry Platinum Elite",
        original_price: 1200.00,
        sale_price: 299.90,
        description: "A elite platina em uma fragrância exclusiva para homens que exigem o máximo.",
        notes: {
            top: "Açafrão, Bergamota, Maçã Verde, Noz Moscada",
            middle: "Prata Líquida, Jasmim, Rosa, Canela",
            base: "Ouro Líquido, Sândalo, Vetiver, Couro"
        },
        composition: {
            luxury_value: "$2.000/ml - Elite Platina",
            ingredients: [
                "Essência de Prata Líquida: €50.000/kg",
                "Essência de Ouro Líquido: €80.000/kg",
                "Açafrão Premium: €45.000/kg",
                "Sândalo Real: €35.000/kg",
                "Couro Exótico: €40.000/kg"
            ],
            description: "A joia mais preciosa transformada na fragrância mais exclusiva."
        },
        sizes: ["50ml", "100ml"],
        stock: 25,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-platinum-elite-masc.jpg",
        rating_average: 5.0,
        sales_count: 89
    },
    
    {
        name: "BP Diamond Queen Feminino",
        brand: "Brian Perry Inspired",
        category: "feminino",
        fragrance_family: "floral",
        inspiration: "Brian Perry Diamond Queen",
        original_price: 1100.00,
        sale_price: 279.90,
        description: "A rainha dos diamantes em uma fragrância que brilha com intensidade real.",
        notes: {
            top: "Diamante Líquido, Pêra, Litchi, Bergamota",
            middle: "Jasmim, Rosa, Orquídea, Tulipa",
            base: "Âmbar Branco, Baunilha, Musk, Prata"
        },
        composition: {
            luxury_value: "$1.800/ml - Rainha dos Diamantes",
            ingredients: [
                "Essência Diamante Líquido: €60.000/kg",
                "Orquídea Rara Negra: €35.000/kg",
                "Tulipa Preta: €25.000/kg",
                "Âmbar Branco Premium: €30.000/kg",
                "Baunilha Real: €20.000/kg"
            ],
            description: "A fragrância mais rara e valiosa criada para a verdadeira rainha."
        },
        sizes: ["50ml", "100ml"],
        stock: 20,
        is_featured: true,
        status: "active",
        image_url: "/images/perfumes/bp-diamond-queen-fem.jpg",
        rating_average: 4.9,
        sales_count: 76
    }
];

module.exports = brianPerryPerfumes;
