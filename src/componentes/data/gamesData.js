const hardware = {
    ryzen7600: {
        id: 'ryzen-5-7600',
        category: 'Processador',
        name: 'AMD Ryzen 5 7600',
        spec: '6 núcleos, até 5,1 GHz',
        price: 1299.90,
        note: 'Equilíbrio excelente para jogos atuais.'
    },
    rtx4060: {
        id: 'rtx-4060',
        category: 'Placa de vídeo',
        name: 'GeForce RTX 4060 8 GB',
        spec: 'Ray tracing e DLSS 3',
        price: 1999.90,
        note: 'Ideal para jogar em Full HD com qualidade alta.'
    },
    rx7600: {
        id: 'rx-7600',
        category: 'Placa de vídeo',
        name: 'Radeon RX 7600 8 GB',
        spec: 'Arquitetura RDNA 3',
        price: 1849.90,
        note: 'Desempenho fluido em campanhas e mundos abertos.'
    },
    kingston16: {
        id: 'kingston-fury-16gb',
        category: 'Memória RAM',
        name: 'Kingston Fury 16 GB DDR5',
        spec: '6000 MHz, dual channel',
        price: 529.90,
        note: 'Mais folga para jogos, navegador e Discord.'
    },
    ssd1tb: {
        id: 'ssd-nvme-1tb',
        category: 'Armazenamento',
        name: 'SSD NVMe 1 TB',
        spec: 'Leitura de até 5.000 MB/s',
        price: 459.90,
        note: 'Carregamentos muito mais rápidos e espaço para a biblioteca.'
    },
    i5: {
        id: 'intel-i5-14400f',
        category: 'Processador',
        name: 'Intel Core i5-14400F',
        spec: '10 núcleos, até 4,7 GHz',
        price: 1199.90,
        note: 'Ótima escolha para FPS e jogos competitivos.'
    },
    rtx4070: {
        id: 'rtx-4070-super',
        category: 'Placa de vídeo',
        name: 'GeForce RTX 4070 Super 12 GB',
        spec: 'Ray tracing e DLSS 3.5',
        price: 4599.90,
        note: 'Potência extra para resolução QHD e efeitos avançados.'
    }
};

export const platformOptions = ['PC', 'PlayStation 5', 'Xbox Series X|S', 'Nintendo Switch'];
export const genreOptions = ['Ação', 'Aventura', 'Corrida', 'Estratégia', 'Indie', 'RPG'];
export const formatOptions = [
    { id: 'digital', label: 'Digital' },
    { id: 'fisica', label: 'Mídia física' }
];

export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(value);

export const getLowestPrice = (game) => Math.min(...game.formats.map((format) => format.price));

export const games = [
    {
        slug: 'astral-odyssey',
        title: 'Astral Odyssey',
        shortDescription: 'Explore sistemas esquecidos e escolha o destino de uma tripulação perdida entre as estrelas.',
        description: 'Astral Odyssey é uma aventura de RPG em mundo aberto, com combate ágil, escolhas que mudam alianças e planetas inteiros para explorar. Monte a sua tripulação, encontre civilizações antigas e descubra o que existe além da última fronteira.',
        genres: ['RPG', 'Aventura'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        release: 'Lançamento',
        cover: {
            badge: 'Aventura espacial',
            symbol: '✦',
            kicker: 'Além da fronteira',
            primary: '#ffc45d',
            secondary: '#401f72',
            glow: '255, 189, 82'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam / Xbox / PlayStation',
                description: 'Código original enviado por e-mail após a confirmação.',
                price: 149.90,
                oldPrice: 179.90
            },
            {
                id: 'fisica',
                label: 'Mídia física',
                platform: 'PlayStation 5',
                description: 'Disco lacrado com envio rastreado para todo o Brasil.',
                price: 189.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i5-8400 ou AMD Ryzen 5 2600'],
                ['Placa de vídeo', 'GTX 1060 6 GB ou RX 580 8 GB'],
                ['Memória', '12 GB RAM'],
                ['Armazenamento', '70 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'AMD Ryzen 5 7600 ou Intel Core i5-14400F'],
                ['Placa de vídeo', 'RTX 4060 ou Radeon RX 7600'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', 'SSD NVMe com 70 GB livres']
            ]
        },
        recommendedHardware: [hardware.ryzen7600, hardware.rtx4060, hardware.kingston16, hardware.ssd1tb]
    },
    {
        slug: 'neon-rift',
        title: 'Neon Rift',
        shortDescription: 'Um FPS veloz em uma megacidade vertical, onde reflexos e estratégia valem cada segundo.',
        description: 'Em Neon Rift, a cidade nunca dorme e cada arena pode ser atravessada de uma forma diferente. Combine parkour, habilidades táticas e equipamentos experimentais em partidas rápidas, competitivas e cheias de movimento.',
        genres: ['Ação'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        release: 'Mais jogado',
        cover: {
            badge: 'FPS competitivo',
            symbol: '↯',
            kicker: 'Velocidade sem pausa',
            primary: '#fc5896',
            secondary: '#172b7c',
            glow: '252, 88, 150'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam / Xbox / PlayStation',
                description: 'Código original e ativação imediata na sua plataforma.',
                price: 99.90,
                oldPrice: 129.90
            },
            {
                id: 'fisica',
                label: 'Mídia física',
                platform: 'PlayStation 5',
                description: 'Disco lacrado com entrega rastreada.',
                price: 139.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i5-9600K ou AMD Ryzen 5 3600'],
                ['Placa de vídeo', 'GTX 1660 Super ou RX 5600 XT'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', '45 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'Intel Core i5-14400F ou AMD Ryzen 5 7600'],
                ['Placa de vídeo', 'RTX 4060 ou superior'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', 'SSD NVMe com 45 GB livres']
            ]
        },
        recommendedHardware: [hardware.i5, hardware.rtx4060, hardware.kingston16]
    },
    {
        slug: 'verdant-echoes',
        title: 'Verdant Echoes',
        shortDescription: 'Redescubra um arquipélago vivo em uma jornada tranquila de exploração, música e memória.',
        description: 'Verdant Echoes mistura exploração, quebra-cabeças ambientais e uma narrativa intimista. Navegue por ilhas que se transformam ao longo das estações, restaure jardins antigos e acompanhe os ecos de quem viveu ali antes de você.',
        genres: ['Aventura', 'Indie'],
        platforms: ['PC', 'Nintendo Switch'],
        release: 'Indie em destaque',
        cover: {
            badge: 'Aventura indie',
            symbol: '❋',
            kicker: 'Um mundo para respirar',
            primary: '#a8df78',
            secondary: '#155c55',
            glow: '168, 223, 120'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam / Nintendo eShop',
                description: 'Código original entregue no e-mail.',
                price: 69.90
            },
            {
                id: 'fisica',
                label: 'Mídia física',
                platform: 'Nintendo Switch',
                description: 'Cartucho lacrado com envio rastreado.',
                price: 109.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i3-8100 ou AMD Ryzen 3 1200'],
                ['Placa de vídeo', 'GTX 1050 Ti ou RX 560'],
                ['Memória', '8 GB RAM'],
                ['Armazenamento', '18 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'Intel Core i5-10400 ou AMD Ryzen 5 3600'],
                ['Placa de vídeo', 'GTX 1660 Super ou RX 6600'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', 'SSD com 18 GB livres']
            ]
        },
        recommendedHardware: [hardware.rx7600, hardware.kingston16, hardware.ssd1tb]
    },
    {
        slug: 'iron-signal',
        title: 'Iron Signal',
        shortDescription: 'Gerencie uma colônia industrial em um planeta hostil e mantenha sua cadeia de produção viva.',
        description: 'Iron Signal é um jogo de estratégia e automação sobre decisões grandes e recursos finitos. Planeje rotas, construa sua infraestrutura, proteja a colônia de tempestades solares e mantenha os sistemas funcionando sob pressão.',
        genres: ['Estratégia'],
        platforms: ['PC'],
        release: 'Estratégia',
        cover: {
            badge: 'Estratégia e gestão',
            symbol: '◈',
            kicker: 'A indústria não para',
            primary: '#e0aa66',
            secondary: '#4f3022',
            glow: '224, 170, 102'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam',
                description: 'Chave original com ativação imediata.',
                price: 79.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i5-7500 ou AMD Ryzen 3 3100'],
                ['Placa de vídeo', 'GTX 1060 6 GB ou RX 580'],
                ['Memória', '12 GB RAM'],
                ['Armazenamento', '35 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'Intel Core i5-12400F ou AMD Ryzen 5 5600'],
                ['Placa de vídeo', 'RTX 3060 ou Radeon RX 6700 XT'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', 'SSD NVMe com 35 GB livres']
            ]
        },
        recommendedHardware: [hardware.ryzen7600, hardware.rx7600, hardware.ssd1tb]
    },
    {
        slug: 'crown-of-ashes',
        title: 'Crown of Ashes',
        shortDescription: 'Enfrente criaturas antigas e reconstrua um reino em ruínas com cada escolha no seu caminho.',
        description: 'Crown of Ashes é um RPG de ação sombrio que coloca você diante de masmorras, criaturas monumentais e cidades devastadas. Crie a sua build, domine armas diferentes e escolha o que proteger em um reino que já perdeu tudo.',
        genres: ['RPG', 'Ação'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        release: 'Pré-venda',
        cover: {
            badge: 'RPG de ação',
            symbol: '♜',
            kicker: 'O reino ainda chama',
            primary: '#e8734d',
            secondary: '#421b28',
            glow: '232, 115, 77'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam / Xbox / PlayStation',
                description: 'Pré-venda com código enviado na data de lançamento.',
                price: 199.90
            },
            {
                id: 'fisica',
                label: 'Mídia física',
                platform: 'PlayStation 5',
                description: 'Disco lacrado enviado a partir do lançamento.',
                price: 229.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i5-10400F ou AMD Ryzen 5 3600'],
                ['Placa de vídeo', 'RTX 2060 ou Radeon RX 6600'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', '80 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'Intel Core i5-14400F ou AMD Ryzen 5 7600'],
                ['Placa de vídeo', 'RTX 4070 Super ou Radeon RX 7800 XT'],
                ['Memória', '32 GB RAM'],
                ['Armazenamento', 'SSD NVMe com 80 GB livres']
            ]
        },
        recommendedHardware: [hardware.i5, hardware.rtx4070, hardware.ssd1tb]
    },
    {
        slug: 'orbitbreakers',
        title: 'Orbitbreakers',
        shortDescription: 'Corridas impossíveis, naves customizáveis e pistas que desafiam a gravidade.',
        description: 'Orbitbreakers leva corridas arcade para circuitos espaciais imprevisíveis. Domine derrapagens magnéticas, use atalhos em gravidade zero e personalize sua nave para disputar campeonatos online ou a campanha solo.',
        genres: ['Corrida', 'Ação'],
        platforms: ['PC', 'Xbox Series X|S'],
        release: 'Oferta da semana',
        cover: {
            badge: 'Corrida arcade',
            symbol: '◉',
            kicker: 'Sem freio no vazio',
            primary: '#75c7ff',
            secondary: '#273a85',
            glow: '117, 199, 255'
        },
        formats: [
            {
                id: 'digital',
                label: 'Edição digital',
                platform: 'Steam / Xbox',
                description: 'Código original com ativação imediata.',
                price: 89.90,
                oldPrice: 119.90
            },
            {
                id: 'fisica',
                label: 'Mídia física',
                platform: 'Xbox Series X|S',
                description: 'Disco lacrado com envio rastreado.',
                price: 119.90
            }
        ],
        requirements: {
            minimum: [
                ['Processador', 'Intel Core i5-8400 ou AMD Ryzen 5 2600'],
                ['Placa de vídeo', 'GTX 1650 Super ou RX 5500 XT'],
                ['Memória', '12 GB RAM'],
                ['Armazenamento', '40 GB disponíveis']
            ],
            recommended: [
                ['Processador', 'Intel Core i5-12400F ou AMD Ryzen 5 5600'],
                ['Placa de vídeo', 'RTX 4060 ou Radeon RX 7600'],
                ['Memória', '16 GB RAM'],
                ['Armazenamento', 'SSD NVMe com 40 GB livres']
            ]
        },
        recommendedHardware: [hardware.i5, hardware.rx7600, hardware.kingston16]
    }
];
