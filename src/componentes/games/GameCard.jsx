import { Link } from 'react-router-dom';
import { formatCurrency, getLowestPrice } from '../data/gamesData';
import { useCart } from '../cart/useCart';
import GameCover from './GameCover';

function GameCard({ game }) {
    const { addItem, openCart } = useCart();
    const defaultFormat = game.formats.find((format) => format.id === 'digital') || game.formats[0];
    const lowestPrice = getLowestPrice(game);

    const addDefaultGame = () => {
        if (game.stock === 0) return;
        addItem({
            cartId: `game-${game.slug}-${defaultFormat.id}`,
            type: 'game',
            kind: 'Jogo',
            title: game.title,
            subtitle: `${defaultFormat.label} · ${defaultFormat.platform}`,
            price: defaultFormat.price
        });
        openCart();
    };

    return (
        <article className="game-card">
            <Link to={`/jogos/${game.slug}`} className="game-card-cover-link" aria-label={`Ver detalhes de ${game.title}`}>
                <GameCover game={game} />
            </Link>
            <div className="game-card-body">
                <div className="game-card-topline">
                    <span className="game-status">{game.release}</span>
                    <span className="game-format">{game.formats.map((format) => format.label).join(' e ')}</span>
                </div>
                <h3>{game.title}</h3>
                <p className="game-card-description">{game.shortDescription}</p>
                <div className="game-tags">
                    {game.genres.map((genre) => <span key={genre}>{genre}</span>)}
                </div>
                <div className="game-card-footer">
                    <div>
                        <span className="price-caption">A partir de</span>
                        <strong className="game-price">{formatCurrency(lowestPrice)}</strong>
                    </div>
                    <div className="game-card-actions">
                        <Link to={`/jogos/${game.slug}`} className="btn btn-outline">Detalhes</Link>
                        <button type="button" className="game-add-button" disabled={game.stock === 0} title={game.stock === 0 ? "Esgotado" : "Adicionar ao carrinho"} onClick={addDefaultGame} aria-label={`Adicionar ${game.title} ao carrinho`}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default GameCard;
