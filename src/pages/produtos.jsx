import { useMemo, useState } from "react";
import { useProductState } from "../admin/useProducts";
import { useCart } from "../componentes/cart/useCart";
import image4070 from "../assets/images/Produtos/4070.png";
import imageRam from "../assets/images/Produtos/RAM.png";
import imageProcessor from "../assets/images/Produtos/Processador.png";
import imageMotherboard from "../assets/images/Produtos/Placa-mae.png";
import imageSsd from "../assets/images/Produtos/SSD.png";
import imagePowerSupply from "../assets/images/Produtos/Fonte.png";

// ==========================================
// 1. OPÇÕES DO CATÁLOGO LOCAL
// ==========================================
const conditionOptions = [
  { id: "novo", label: "Novo" },
  { id: "usado", label: "Usado" },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getLowestPrice = (product) => {
  return Math.min(...product.types.map((t) => t.price));
};

const defaultHardwareImages = {
  "rtx-4070": image4070,
  "ryzen-7": imageProcessor,
  "memoria-ram-32gb": imageRam,
  "ssd-nvme-1tb": imageSsd,
  "placa-mae-b650": imageMotherboard,
  "fonte-850w": imagePowerSupply,
};

// ==========================================
// 2. COMPONENTES INTERNOS
// ==========================================
const HardwareCover = ({ hardware, size }) => {
  const isFeatured = size === "featured";
  const image = hardware.image || defaultHardwareImages[hardware.slug];

  return (
    <div className={`hardware-cover${isFeatured ? " hardware-cover--featured" : ""}`}>
      {image ? <img src={image} alt={hardware.name} /> : hardware.name}
    </div>
  );
};

const HardwareCard = ({ hardware, onAddToCart }) => {
  const cheapestType = hardware.types.reduce((prev, current) =>
    prev.price < current.price ? prev : current,
  );

  return (
    <div className="game-card">
      <HardwareCover hardware={hardware} size="card" />
      <div className="game-card-info">
        <h3
          className="sem-linha"
          style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          {hardware.name}
        </h3>
        <p
          style={{
            color: "#aaa",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            minHeight: "40px",
          }}
        >
          {hardware.shortDescription}
        </p>

        <div className="price-row">
          <div>
            <span className="price-caption">{cheapestType.label}</span>
            {cheapestType.oldPrice && (
              <del>{formatCurrency(cheapestType.oldPrice)}</del>
            )}
            <strong>{formatCurrency(cheapestType.price)}</strong>
          </div>
          <span className="discount-chip">
            {cheapestType.oldPrice ? "Oferta" : "Destaque"}
          </span>
        </div>

        <button
          className="btn"
          style={{ width: "100%", marginTop: "1rem" }}
          disabled={hardware.stock === 0}
          onClick={() => onAddToCart(hardware, cheapestType)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
const defaultFilters = {
  search: "",
  brand: "Todas",
  category: "Todas",
  type: "Todos",
  order: "destaques",
};

export default function HardwarePage() {
  const { products: allProducts, error: catalogError } = useProductState();
  const hardwareData = useMemo(() => allProducts.filter((product) => product.active !== false), [allProducts]);
  const brandOptions = ['Todas', ...new Set(hardwareData.flatMap((product) => product.brands))];
  const categoryOptions = ['Todas', ...new Set(hardwareData.flatMap((product) => product.categories))];
  const [filters, setFilters] = useState(defaultFilters);
  const [cartMessage, setCartMessage] = useState("");
  const { addItem, openCart } = useCart();

  // Simula o "Jogo da Semana" (Produto em Destaque)
  const featuredProduct = hardwareData[0];
  const featuredType =
    featuredProduct?.types.find((type) => type.id === "novo") ||
    featuredProduct?.types[0];

  const filteredProducts = useMemo(() => {
    const search = filters.search.trim().toLocaleLowerCase("pt-BR");

    const result = hardwareData.filter((product) => {
      const matchesSearch =
        !search ||
        [
          product.name,
          product.shortDescription,
          ...product.categories,
          ...product.brands,
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(search);

      const matchesBrand =
        filters.brand === "Todas" || product.brands.includes(filters.brand);
      const matchesCategory =
        filters.category === "Todas" ||
        product.categories.includes(filters.category);
      const matchesType =
        filters.type === "Todos" ||
        product.types.some((type) => type.id === filters.type);

      return matchesSearch && matchesBrand && matchesCategory && matchesType;
    });

    return [...result].sort((firstProduct, secondProduct) => {
      if (filters.order === "menor-preco")
        return getLowestPrice(firstProduct) - getLowestPrice(secondProduct);
      if (filters.order === "maior-preco")
        return getLowestPrice(secondProduct) - getLowestPrice(firstProduct);
      if (filters.order === "a-z")
        return firstProduct.name.localeCompare(secondProduct.name, "pt-BR");
      return 0;
    });
  }, [filters, hardwareData]);

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [field]: value }));
  };

  const handleAddToCart = (product, type) => {
    if (!product || product.stock === 0) return;
    addItem({
      cartId: `hardware-${product.slug}-${type.id}`,
      type: "hardware",
      kind: product.categories[0],
      title: product.name,
      subtitle: type.label,
      price: type.price,
    });
    openCart();
    setCartMessage(`${product.name} (${type.label}) adicionado ao carrinho!`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  const addFeaturedProduct = () => {
    handleAddToCart(featuredProduct, featuredType);
  };

  const scrollToCatalog = () => {
    document.getElementById("catalog-title")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Estilos CSS embutidos para garantir o visual idêntico à imagem */}
      <style>{`
        .games-page {
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
        }
        .games-hero {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
          align-items: stretch;
        }
        .games-hero-copy {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .tag {
          color: #ff6b00;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          display: inline-block;
        }
        .games-hero h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
        }
        .games-hero p {
          color: #aaa;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .games-hero-pills {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .games-hero-pills span {
          background: #1e1e1e;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #ccc;
          border: 1px solid #333;
        }
        .games-hero-feature {
          flex: 1;
          background: #1e1e1e;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          border: 1px solid #333;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .featured-cover-wrap {
          width: 40%;
          display: flex;
          align-items: center;
        }
        .featured-game-info {
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .featured-game-info h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
        .featured-game-info p {
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 1rem;
        }
        .featured-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .price-caption {
          font-size: 0.8rem;
          color: #aaa;
          display: block;
        }
        .price-row del {
          color: #777;
          font-size: 0.9rem;
          margin-right: 0.5rem;
        }
        .price-row strong, .featured-price-row strong {
          font-size: 1.5rem;
          color: #fff;
          display: block;
        }
        .discount-chip {
          background: #333;
          color: #ff6b00;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .featured-actions {
          display: flex;
          gap: 1rem;
        }
        .btn {
          background: #ff6b00;
          color: #fff;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s;
          text-align: center;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .btn:hover {
          opacity: 0.9;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #ff6b00;
          color: #ff6b00;
        }
        .btn-outline:hover {
          background: rgba(255, 107, 0, 0.1);
        }
        .games-catalog {
          margin-bottom: 3rem;
        }
        .catalog-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
        }
        .catalog-heading h2 {
          font-size: 2rem;
          margin: 0.5rem 0 0;
        }
        .catalog-heading p {
          color: #aaa;
          font-size: 0.9rem;
        }
        .hardware-page .game-filters {
          display: grid;
          grid-template-columns: minmax(245px, 2fr) repeat(4, minmax(130px, 1fr)) auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 2rem;
          background: #1e1e1e;
          padding: 14px;
          border-radius: 15px;
          border: 1px solid #333;
        }
        .hardware-page .game-filters label:not(.game-search) {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }
        .hardware-page .game-filters label > span:not(.sr-only) {
          padding-left: 3px;
          color: #aaa;
          font-size: 0.64rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .hardware-page .game-search {
          display: flex;
          align-items: center;
          gap: 9px;
          height: 39px;
          padding: 0 11px;
          background: #121212;
          border: 1px solid #333;
          border-radius: 9px;
          color: #ff6b00;
        }
        .hardware-page .game-search input,
        .hardware-page .game-filters select {
          width: 100%;
          min-width: 0;
          height: 39px;
          background: #121212;
          border: 1px solid #333;
          border-radius: 9px;
          color: #fff;
          font: inherit;
          font-size: 0.77rem;
          outline: none;
        }
        .hardware-page .game-search input {
          height: auto;
          background: transparent;
          border: none;
          color: inherit;
          padding: 0;
          width: 100%;
        }
        .hardware-page .game-filters select {
          padding: 0 8px;
          cursor: pointer;
        }
        .hardware-page .game-search:focus-within,
        .hardware-page .game-filters select:focus {
          border-color: #ff6b00;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
        }
        .hardware-page .filter-reset {
          height: 39px;
          padding: 0 11px;
          background: #121212;
          color: #ff6b00;
          border: none;
          cursor: pointer;
          font: inherit;
          font-size: 0.72rem;
          font-weight: bold;
          white-space: nowrap;
        }
        @media (max-width: 1120px) {
          .hardware-page .game-filters {
            grid-template-columns: minmax(260px, 2fr) repeat(3, minmax(130px, 1fr));
          }
          .hardware-page .filter-reset {
            justify-self: end;
          }
        }
        @media (max-width: 700px) {
          .hardware-page .game-filters {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 11px;
            padding: 12px;
          }
          .hardware-page .game-search {
            grid-column: 1 / -1;
          }
          .hardware-page .filter-reset {
            justify-self: start;
            padding-left: 3px;
          }
        }
        @media (max-width: 500px) {
          .hardware-page .game-filters {
            grid-template-columns: 1fr;
          }
          .hardware-page .game-search {
            grid-column: auto;
          }
        }
        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .hardware-cover {
          width: 100%;
          height: 160px;
          box-sizing: border-box;
          padding: 12px;
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
          border: 1px solid #333;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff6b00;
          font-weight: bold;
          text-align: center;
        }
        .hardware-cover img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .hardware-cover--featured {
          height: 220px;
          font-size: 1.2rem;
        }
        .game-card {
          background: #1e1e1e;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #333;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
        }
        .game-card:hover {
          transform: translateY(-5px);
          border-color: #ff6b00;
        }
        .game-card-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .games-empty-result {
          text-align: center;
          padding: 4rem 2rem;
          background: #1e1e1e;
          border-radius: 12px;
          border: 1px dashed #333;
        }
        .games-empty-result span {
          font-size: 3rem;
          color: #ff6b00;
        }
        .games-hardware-callout {
          background: #1e1e1e;
          border-radius: 16px;
          padding: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #333;
          margin-bottom: 2rem;
        }
        .games-hardware-callout div:first-child {
          max-width: 50%;
        }
        .games-hardware-callout h2 {
          font-size: 2rem;
          margin: 0.5rem 0;
        }
        .games-hardware-callout p {
          color: #aaa;
          line-height: 1.6;
        }
        .hardware-callout-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .hardware-callout-items span {
          display: flex;
          gap: 1rem;
          align-items: center;
          font-size: 1.1rem;
        }
        .hardware-callout-items b {
          color: #ff6b00;
          font-size: 1.3rem;
        }
        .prototype-disclaimer {
          text-align: center;
          color: #555;
          font-size: 0.8rem;
          margin-top: 2rem;
        }
        .cart-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #ff6b00;
          color: #fff;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          .games-hero, .games-hardware-callout {
            flex-direction: column;
          }
          .games-hero-feature {
            flex-direction: column;
          }
          .featured-cover-wrap, .featured-game-info {
            width: 100%;
          }
          .games-hardware-callout div:first-child {
            max-width: 100%;
            margin-bottom: 2rem;
          }
        }
      `}</style>

      {/* NOTIFICAÇÃO DE CARRINHO */}
      {cartMessage && <div className="cart-toast">{cartMessage}</div>}
      {catalogError && <p role="alert">{catalogError}</p>}

      <main className="games-page hardware-page animacao-entrada">
        {/* HERO SECTION */}
        <section className="games-hero">
          <div className="games-hero-copy">
            <span className="tag">Catálogo MiniByte</span>
            <h1>Peças para o seu setup dos sonhos</h1>
            <p>
              Encontre processadores, placas de vídeo e periféricos de alta
              performance. Verifique a compatibilidade e monte o PC ideal para
              trabalho ou gaming.
            </p>
            <div className="games-hero-pills" aria-label="Benefícios da loja">
              <span>▣ Peças originais</span>
              <span>◈ Garantia estendida</span>
              <span>Compatibilidade garantida</span>
            </div>
          </div>
          {featuredProduct && <div className="games-hero-feature">
            <div className="featured-cover-wrap">
              <HardwareCover hardware={featuredProduct} size="featured" />
            </div>
            <div className="featured-game-info">
              <span className="tag">Produto em destaque</span>
              <h2 className="sem-linha">{featuredProduct.name}</h2>
              <p>{featuredProduct.shortDescription}</p>
              <div className="featured-price-row">
                <div>
                  <span className="price-caption">
                    Modelo {featuredType.label}
                  </span>
                  {featuredType.oldPrice && (
                    <del>{formatCurrency(featuredType.oldPrice)}</del>
                  )}
                  <strong>{formatCurrency(featuredType.price)}</strong>
                </div>
                <span className="discount-chip">
                  {featuredType.oldPrice ? "Oferta especial" : "Em destaque"}
                </span>
              </div>
              <div className="featured-actions">
                <button
                  type="button"
                  className="btn"
                  disabled={featuredProduct.stock === 0} onClick={addFeaturedProduct}
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={scrollToCatalog}
                >
                  Ver catálogo
                </button>
              </div>
            </div>
          </div>}
        </section>

        {/* CATALOG SECTION */}
        <section className="games-catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <span className="tag">Encontre sua peça</span>
              <h2 id="catalog-title">Catálogo de Hardware</h2>
            </div>
            <p>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>

          <div className="game-filters">
            <label className="game-search">
              <span className="sr-only">Buscar produto</span>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Busque por peça, marca ou categoria"
              />
            </label>
            <label>
              <span>Marca</span>
              <select
                value={filters.brand}
                onChange={(event) => updateFilter("brand", event.target.value)}
              >
                {brandOptions.map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Categoria</span>
              <select
                value={filters.category}
                onChange={(event) =>
                  updateFilter("category", event.target.value)
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Condição</span>
              <select
                value={filters.type}
                onChange={(event) => updateFilter("type", event.target.value)}
              >
                <option value="Todos">Todos</option>
                {conditionOptions.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Ordenar</span>
              <select
                value={filters.order}
                onChange={(event) => updateFilter("order", event.target.value)}
              >
                <option value="destaques">Destaques</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="a-z">A–Z</option>
              </select>
            </label>
            <button
              type="button"
              className="filter-reset"
              onClick={() => setFilters(defaultFilters)}
            >
              Limpar filtros
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="games-grid">
              {filteredProducts.map((product) => (
                <HardwareCard
                  key={product.slug}
                  hardware={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="games-empty-result">
              <span aria-hidden="true">⌁</span>
              <h3>Nenhum produto encontrado</h3>
              <p>Tente remover um filtro ou procurar outro componente.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setFilters(defaultFilters)}
              >
                Ver todo o catálogo
              </button>
            </div>
          )}
        </section>

        {/* CALLOUT SECTION */}
        <section className="games-hardware-callout">
          <div>
            <span className="tag">Compra consciente</span>
            <h2 className="sem-linha">
              As peças são compatíveis com o seu PC?
            </h2>
            <p>
              Em cada página de produto você encontra especificações técnicas
              detalhadas, requisitos de fonte e sugestões de upgrades para o seu
              setup.
            </p>
          </div>
          <div className="hardware-callout-items">
            <span>
              <b>01</b> Verifique a compatibilidade
            </span>
            <span>
              <b>02</b> Escolha seus componentes
            </span>
            <span>
              <b>03</b> Monte o seu setup
            </span>
          </div>
        </section>

        <p className="prototype-disclaimer">
          Protótipo acadêmico: preços, produtos, especificações e estoque são
          dados ilustrativos e não representam uma venda real.
        </p>
      </main>
    </>
  );
}
