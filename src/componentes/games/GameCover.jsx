function GameCover({ game, size = 'card' }) {
    if (game.image) return <div className={'game-cover game-cover--' + size}>
        <img src={game.image} alt={'Capa de ' + game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
    </div>;
    const style = {
        '--cover-primary': game.cover.primary,
        '--cover-secondary': game.cover.secondary,
        '--cover-glow': game.cover.glow
    };

    return (
        <div className={`game-cover game-cover--${size}`} style={style} role="img" aria-label={`Capa ilustrativa de ${game.title}`}>
            <span className="game-cover-grid" aria-hidden="true" />
            <span className="game-cover-orb game-cover-orb--one" aria-hidden="true" />
            <span className="game-cover-orb game-cover-orb--two" aria-hidden="true" />
            <span className="game-cover-kicker">{game.cover.kicker}</span>
            <div className="game-cover-center">
                <span className="game-cover-symbol" aria-hidden="true">{game.cover.symbol}</span>
                <strong>{game.title}</strong>
            </div>
            <span className="game-cover-badge">{game.cover.badge}</span>
        </div>
    );
}

export default GameCover;
