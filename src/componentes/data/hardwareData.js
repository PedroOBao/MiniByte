export const initialHardware = [
  {
    slug: "rtx-4070",
    name: "Placa de Vídeo RTX 4070",
    shortDescription:
      "Performance excepcional para jogos em 1440p e ray tracing.",
    brands: ["NVIDIA", "ASUS", "MSI"],
    categories: ["Placa de Vídeo", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Nova",
        price: 4500.0,
        brand: "ASUS",
        oldPrice: 4800.0,
      },
      {
        id: "usado",
        label: "Usada",
        price: 3200.0,
        brand: "MSI",
        oldPrice: null,
      },
    ],
  },
  {
    slug: "ryzen-7",
    name: "Processador Ryzen 7 7800X3D",
    shortDescription: "O melhor processador para gaming do mercado.",
    brands: ["AMD"],
    categories: ["Processador", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Novo",
        price: 2800.0,
        brand: "AMD",
        oldPrice: 3100.0,
      },
    ],
  },
  {
    slug: "memoria-ram-32gb",
    name: "Memória RAM DDR5 32GB",
    shortDescription: "Kit 2x16GB 6000MHz CL30 para máxima performance.",
    brands: ["Corsair", "Kingston", "G.Skill"],
    categories: ["Memória RAM", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Nova",
        price: 850.0,
        brand: "Corsair",
        oldPrice: 950.0,
      },
    ],
  },
  {
    slug: "ssd-nvme-1tb",
    name: "SSD NVMe 1TB Gen4",
    shortDescription:
      "Leitura de até 7000MB/s para carregamentos instantâneos.",
    brands: ["Samsung", "WD", "Crucial"],
    categories: ["Armazenamento", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Novo",
        price: 450.0,
        brand: "Samsung",
        oldPrice: 520.0,
      },
    ],
  },
  {
    slug: "placa-mae-b650",
    name: "Placa-Mãe B650M",
    shortDescription: "Suporte para Ryzen 7000 e DDR5, com PCIe 4.0.",
    brands: ["ASUS", "Gigabyte", "MSI"],
    categories: ["Placa-Mãe", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Nova",
        price: 1200.0,
        brand: "Gigabyte",
        oldPrice: null,
      },
    ],
  },
  {
    slug: "fonte-850w",
    name: "Fonte 850W 80 Plus Gold",
    shortDescription:
      "Modular, silenciosa e eficiente para setups de alto desempenho.",
    brands: ["Corsair", "XPG", "Seasonic"],
    categories: ["Fonte", "Componentes"],
    types: [
      {
        id: "novo",
        label: "Nova",
        price: 750.0,
        brand: "Corsair",
        oldPrice: 820.0,
      },
    ],
  },
];

