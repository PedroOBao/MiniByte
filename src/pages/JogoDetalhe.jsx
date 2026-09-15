import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency, games } from '../componentes/data/gamesData';
import { useCart } from '../componentes/cart/useCart';
import GameCard from '../componentes/games/GameCard';
import GameCover from '../componentes/games/GameCover';

function JogoDetalhe() {
    const { slug } = useParams();
    const game = games.find((currentGame) => currentGame.slug === slug);
    const [selectedFormatId, setSelectedFormatId] = useState('');
    const { addItem, openCart } = useCart();

    if (!game) {
        return (
            <main className="game-not-found animacao-entrada">
                <span className="tag">Catálogo MiniByte</span>
                <h1>Jogo não encontrado</h1>
                <p>Esse item pode ter saído do catálogo ou o endereço pode estar incorreto.</p>
                <Link to="/jogos" className="btn">Voltar ao catálogo</Link>
            </main>
        );
    }

    const selectedFormat = game.formats.find((format) => format.id === selectedFormatId) || game.formats[0];
    const relatedGames = games
        .filter((currentGame) => currentGame.slug !== game.slug && currentGame.genres.some((genre) => game.genres.includes(genre)))
        .slice(0, 3);

    const addGameToCart = () => {
        addItem({
            cartId: `game-${game.slug}-${selectedFormat.id}`,
            type: 'game',
            kind: 'Jogo',
            title: game.title,
            subtitle: `${selectedFormat.label} · ${selectedFormat.platform}`,
            price: selectedFormat.price
        });
        openCart();
    };

    const addHardwareToCart = (hardware) => {
        addItem({
            cartId: `hardware-${game.slug}-${hardware.id}`,
            type: 'hardware',
            kind: hardware.category,
            title: hardware.name,
            subtitle: `Recomendado para ${game.title}`,
            price: hardware.price
        });
        openCart();
    };

    return (
        <main className="game-detail-page animacao-entrada">
            <Link to="/jogos" className="detail-back-link">← Voltar ao catálogo</Link>

            <section className="game-detail-hero">
                <div className="game-detail-cover-wrap">
                    <GameCover game={game} size="detail" />
                </div>
                <div className="game-detail-copy">
                    <div className="detail-badges">
                        <span>{game.release}</span>
                        <span>{game.formats.some((format) => format.id === 'fisica') ? 'Digital e mídia física' : 'Digital'}</span>
                    </div>
                    <h1>{game.title}</h1>
                    <p className="game-detail-lead">{game.description}</p>

                    <div className="game-platforms" aria-label="Plataformas disponíveis">
                        <span className="detail-label">Disponível em</span>
                        {game.platforms.map((platform) => <span key={platform}>{platform}</span>)}
                    </div>

                    <div className="game-purchase-box">
                        <div className="purchase-box-heading">
                            <div>
                                <span className="detail-label">Escolha seu formato</span>
                                <p>Selecione a opção que combina com a sua plataforma.</p>
                            </div>
                            <div className="purchase-price">
                                {selectedFormat.oldPrice && <del>{formatCurrency(selectedFormat.oldPrice)}</del>}
                                <strong>{formatCurrency(selectedFormat.price)}</strong>
                            </div>
                        </div>
                        <div className="format-options" role="radiogroup" aria-label="Formato do jogo">
                            {game.formats.map((format) => (
                                <button
                                    key={format.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={selectedFormat.id === format.id}
                                    className={`format-option ${selectedFormat.id === format.id ? 'is-selected' : ''}`}
                                    onClick={() => setSelectedFormatId(format.id)}
                                >
                                    <span className="format-option-name">{format.label}</span>
                                    <span>{format.platform}</span>
                                    <small>{format.description}</small>
                                </button>
                            ))}
                        </div>
                        <button type="button" className="btn detail-buy-button" onClick={addGameToCart}>
                            Adicionar {selectedFormat.label.toLocaleLowerCase('pt-BR')} ao carrinho
                        </button>
                    </div>
                </div>
            </section>

            <section className="detail-section requirements-section" aria-labelledby="requirements-title">
                <div className="section-heading-detail">
                    <span className="tag">Compatibilidade de PC</span>
                    <h2 id="requirements-title">Seu computador está pronto?</h2>
                    <p>Compare sua máquina com as especificações abaixo antes de comprar a versão de PC.</p>
                </div>
                <div className="requirements-grid">
                    <article className="requirements-card">
                        <div className="requirements-card-heading">
                            <span>01</span>
                            <div>
                                <h3>Configuração mínima</h3>
                                <p>Para jogar com os recursos básicos.</p>
                            </div>
                        </div>
                        <dl>
                            {game.requirements.minimum.map(([label, value]) => (
                                <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </article>
                    <article className="requirements-card requirements-card--recommended">
                        <div className="requirements-card-heading">
                            <span>02</span>
                            <div>
                                <h3>Configuração recomendada</h3>
                                <p>Para uma experiência mais estável e bonita.</p>
                            </div>
                        </div>
                        <dl>
                            {game.requirements.recommended.map(([label, value]) => (
                                <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </article>
                </div>
                <p className="requirements-disclaimer">
                    Requisitos demonstrativos para este protótipo. Em uma loja real, eles seriam conferidos diretamente com a publicadora do jogo.
                </p>
            </section>

            <section className="detail-section hardware-section" aria-labelledby="hardware-title">
                <div className="section-heading-detail hardware-heading">
                    <div>
                        <span className="tag">Upgrade inteligente</span>
                        <h2 id="hardware-title">Hardware recomendado para {game.title}</h2>
                        <p>Peças selecionadas para se aproximar da configuração recomendada do jogo.</p>
                    </div>
                    <Link to="/contato" className="btn btn-outline">Precisa de ajuda?</Link>
                </div>
                <div className="hardware-grid">
                    {game.recommendedHardware.map((hardware) => (
                        <article key={hardware.id} className="hardware-card">
                            <div className="hardware-card-icon" aria-hidden="true">{hardware.category === 'Placa de vídeo' ? 'GPU' : hardware.category === 'Processador' ? 'CPU' : hardware.category === 'Memória RAM' ? 'RAM' : 'SSD'}</div>
                            <div className="hardware-card-content">
                                <span>{hardware.category}</span>
                                <h3>{hardware.name}</h3>
                                <p className="hardware-spec">{hardware.spec}</p>
                                <p>{hardware.note}</p>
                            </div>
                            <div className="hardware-card-buy">
                                <strong>{formatCurrency(hardware.price)}</strong>
                                <button type="button" onClick={() => addHardwareToCart(hardware)}>Adicionar</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {relatedGames.length > 0 && (
                <section className="detail-section related-section" aria-labelledby="related-title">
                    <div className="section-heading-detail">
                        <span className="tag">Continue explorando</span>
                        <h2 id="related-title">Você também pode gostar</h2>
                    </div>
                    <div className="games-grid games-grid--related">
                        {relatedGames.map((relatedGame) => <GameCard key={relatedGame.slug} game={relatedGame} />)}
                    </div>
                </section>
            )}
        </main>
    );
}

export default JogoDetalhe;
