import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatOptions, getLowestPrice } from '../componentes/data/gamesData';
import { useCart } from '../componentes/cart/useCart';
import GameCard from '../componentes/games/GameCard';
import GameCover from '../componentes/games/GameCover';
import { useGameState } from '../admin/useGames';

const defaultFilters = {
    search: '',
    platform: 'Todos',
    genre: 'Todos',
    format: 'Todos',
    order: 'destaques'
};

function Jogos() {
    const { games: allGames, error } = useGameState();
    const games = useMemo(() => allGames.filter((game) => game.active !== false), [allGames]);
    const genreOptions = [...new Set(games.flatMap((game) => game.genres))];
    const platformOptions = [...new Set(games.flatMap((game) => game.platforms))];
    const [filters, setFilters] = useState(defaultFilters);
    const { addItem, openCart } = useCart();
    const featuredGame = games[0];
    const featuredFormat = featuredGame?.formats.find((format) => format.id === 'digital') || featuredGame?.formats[0];

    const filteredGames = useMemo(() => {
        const search = filters.search.trim().toLocaleLowerCase('pt-BR');
        const result = games.filter((game) => {
            const matchesSearch = !search || [game.title, game.shortDescription, ...game.genres, ...game.platforms]
                .join(' ')
                .toLocaleLowerCase('pt-BR')
                .includes(search);
            const matchesPlatform = filters.platform === 'Todos' || game.platforms.includes(filters.platform);
            const matchesGenre = filters.genre === 'Todos' || game.genres.includes(filters.genre);
            const matchesFormat = filters.format === 'Todos' || game.formats.some((format) => format.id === filters.format);

            return matchesSearch && matchesPlatform && matchesGenre && matchesFormat;
        });

        return [...result].sort((firstGame, secondGame) => {
            if (filters.order === 'menor-preco') return getLowestPrice(firstGame) - getLowestPrice(secondGame);
            if (filters.order === 'maior-preco') return getLowestPrice(secondGame) - getLowestPrice(firstGame);
            if (filters.order === 'a-z') return firstGame.title.localeCompare(secondGame.title, 'pt-BR');
            return 0;
        });
    }, [filters, games]);

    const updateFilter = (field, value) => {
        setFilters((currentFilters) => ({ ...currentFilters, [field]: value }));
    };

    const addFeaturedGame = () => {
        if (!featuredGame || featuredGame.stock === 0) return;
        addItem({
            cartId: `game-${featuredGame.slug}-${featuredFormat.id}`,
            type: 'game',
            kind: 'Jogo',
            title: featuredGame.title,
            subtitle: `${featuredFormat.label} · ${featuredFormat.platform}`,
            price: featuredFormat.price
        });
        openCart();
    };

    return (
        <main className="games-page animacao-entrada">
            {error && <p role="alert">{error}</p>}
            <section className="games-hero">
                <div className="games-hero-copy">
                    <span className="tag">Catálogo MiniByte</span>
                    <h1>Jogos para o seu próximo mundo</h1>
                    <p>
                        Escolha entre mídia digital e física, veja os requisitos de PC antes de comprar
                        e encontre o hardware ideal para a sua próxima sessão de jogo.
                    </p>
                    <div className="games-hero-pills" aria-label="Benefícios da loja">
                        <span>▣ Chaves originais</span>
                        <span>◈ Mídias lacradas</span>
                        <span>PC compatível</span>
                    </div>
                </div>
                {featuredGame && <div className="games-hero-feature">
                    <div className="featured-cover-wrap">
                        <GameCover game={featuredGame} size="featured" />
                    </div>
                    <div className="featured-game-info">
                        <span className="tag">Jogo da semana</span>
                        <h2 className="sem-linha">{featuredGame.title}</h2>
                        <p>{featuredGame.shortDescription}</p>
                        <div className="featured-price-row">
                            <div>
                                <span className="price-caption">{featuredFormat.label}</span>
                                {featuredFormat.oldPrice && <del>{formatCurrency(featuredFormat.oldPrice)}</del>}
                                <strong>{formatCurrency(featuredFormat.price)}</strong>
                            </div>
                            <span className="discount-chip">{featuredFormat.oldPrice ? 'Oferta especial' : 'Em destaque'}</span>
                        </div>
                        <div className="featured-actions">
                            <button type="button" className="btn" disabled={featuredGame.stock === 0} onClick={addFeaturedGame}>{featuredGame.stock === 0 ? 'Esgotado' : 'Adicionar ao carrinho'}</button>
                            <Link to={`/jogos/${featuredGame.slug}`} className="btn btn-outline">Ver requisitos</Link>
                        </div>
                    </div>
                </div>}
            </section>

            <section className="games-catalog" aria-labelledby="catalog-title">
                <div className="catalog-heading">
                    <div>
                        <span className="tag">Encontre seu jogo</span>
                        <h2 id="catalog-title">Catálogo de jogos</h2>
                    </div>
                    <p>{filteredGames.length} {filteredGames.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}</p>
                </div>

                <div className="game-filters">
                    <label className="game-search">
                        <span className="sr-only">Buscar jogo</span>
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={filters.search}
                            onChange={(event) => updateFilter('search', event.target.value)}
                            placeholder="Busque por jogo, gênero ou plataforma"
                        />
                    </label>
                    <label>
                        <span>Plataforma</span>
                        <select value={filters.platform} onChange={(event) => updateFilter('platform', event.target.value)}>
                            <option>Todos</option>
                            {platformOptions.map((platform) => <option key={platform}>{platform}</option>)}
                        </select>
                    </label>
                    <label>
                        <span>Gênero</span>
                        <select value={filters.genre} onChange={(event) => updateFilter('genre', event.target.value)}>
                            <option>Todos</option>
                            {genreOptions.map((genre) => <option key={genre}>{genre}</option>)}
                        </select>
                    </label>
                    <label>
                        <span>Formato</span>
                        <select value={filters.format} onChange={(event) => updateFilter('format', event.target.value)}>
                            <option>Todos</option>
                            {formatOptions.map((format) => <option key={format.id} value={format.id}>{format.label}</option>)}
                        </select>
                    </label>
                    <label>
                        <span>Ordenar</span>
                        <select value={filters.order} onChange={(event) => updateFilter('order', event.target.value)}>
                            <option value="destaques">Destaques</option>
                            <option value="menor-preco">Menor preço</option>
                            <option value="maior-preco">Maior preço</option>
                            <option value="a-z">A–Z</option>
                        </select>
                    </label>
                    <button type="button" className="filter-reset" onClick={() => setFilters(defaultFilters)}>Limpar filtros</button>
                </div>

                {filteredGames.length > 0 ? (
                    <div className="games-grid">
                        {filteredGames.map((game) => <GameCard key={game.slug} game={game} />)}
                    </div>
                ) : (
                    <div className="games-empty-result">
                        <span aria-hidden="true">⌁</span>
                        <h3>Nenhum jogo encontrado</h3>
                        <p>Tente remover um filtro ou procurar outro título.</p>
                        <button type="button" className="btn btn-outline" onClick={() => setFilters(defaultFilters)}>Ver todo o catálogo</button>
                    </div>
                )}
            </section>

            <section className="games-hardware-callout">
                <div>
                    <span className="tag">Compra consciente</span>
                    <h2 className="sem-linha">Seu PC roda o próximo jogo?</h2>
                    <p>
                        Em cada página você encontra requisitos mínimos, configuração recomendada e
                        sugestões de hardware da MiniByte para jogar com mais folga.
                    </p>
                </div>
                <div className="hardware-callout-items">
                    <span><b>01</b> Compare os requisitos</span>
                    <span><b>02</b> Escolha seu hardware</span>
                    <span><b>03</b> Adicione tudo ao carrinho</span>
                </div>
            </section>

            <p className="prototype-disclaimer">
                Protótipo acadêmico: preços, jogos, requisitos e estoque são dados ilustrativos e não representam uma venda real.
            </p>
        </main>
    );
}

export default Jogos;
