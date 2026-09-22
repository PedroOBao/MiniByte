import { games as initialGames } from '../componentes/data/gamesData.js';
import { requireAdmin } from '../componentes/users/localAccounts.js';

export const GAME_KEY = 'minibyte-games';
export const GAME_EVENT = 'minibyte:games';
export const emptyGame = {
    title: '', shortDescription: '', description: '', genres: '', platforms: '', release: 'Disponível',
    stock: '10', image: '', minimum: '', recommended: '',
    formats: [
        { id: 'digital', label: 'Edição digital', enabled: true, price: '', platform: '', description: '' },
        { id: 'fisica', label: 'Mídia física', enabled: false, price: '', platform: '', description: '' },
    ],
};
export function readGames() {
    const raw = localStorage.getItem(GAME_KEY);
    if (!raw) return initialGames.map((game) => ({ ...game, active: true, stock: 10, image: '' }));
    try {
        const games = JSON.parse(raw);
        if (!Array.isArray(games) || games.some((game) => !game?.slug || typeof game.title !== 'string' ||
            !Array.isArray(game.genres) || !Array.isArray(game.platforms) ||
            !Array.isArray(game.formats) || !game.formats.length ||
            game.formats.some((format) => !format?.id || !Number.isFinite(format.price) || format.price <= 0) ||
            !game.cover || !Array.isArray(game.requirements?.minimum) || !Array.isArray(game.requirements?.recommended) ||
            !Array.isArray(game.recommendedHardware))) throw new Error();
        return games;
    } catch {
        throw new Error('Não foi possível ler o catálogo de jogos. Preserve os dados antes de restaurá-los.');
    }
}
function writeGames(games) {
    try { localStorage.setItem(GAME_KEY, JSON.stringify(games)); }
    catch { throw new Error('Não foi possível salvar os jogos. Reduza a imagem ou libere espaço no navegador.'); }
    window.dispatchEvent(new Event(GAME_EVENT));
}
const splitList = (value) => [...new Set(value.split(',').map((item) => item.trim()).filter(Boolean))];
function parseRequirements(value) {
    return value.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
        const separator = line.indexOf(':');
        if (separator < 1 || !line.slice(separator + 1).trim()) throw new Error('Informe os requisitos no formato Componente: especificação, um por linha.');
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    });
}
export function gameToForm(game) {
    return {
        title: game.title, shortDescription: game.shortDescription, description: game.description,
        genres: game.genres.join(', '), platforms: game.platforms.join(', '), release: game.release,
        stock: String(game.stock ?? 10), image: game.image || '',
        minimum: game.requirements.minimum.map((row) => row.join(': ')).join('\n'),
        recommended: game.requirements.recommended.map((row) => row.join(': ')).join('\n'),
        formats: emptyGame.formats.map((base) => {
            const format = game.formats.find((item) => item.id === base.id);
            return format ? { ...format, enabled: true, price: String(format.price) } : { ...base, enabled: false };
        }),
    };
}
export function saveGame(form, slug = null) {
    requireAdmin();
    const games = readGames();
    const previous = slug ? games.find((game) => game.slug === slug) : null;
    if (slug && !previous) throw new Error('Jogo não encontrado.');
    const genres = splitList(form.genres);
    const platforms = splitList(form.platforms);
    if (!form.title.trim() || !form.shortDescription.trim() || !form.description.trim() || !genres.length || !platforms.length) {
        throw new Error('Preencha título, resumo, descrição, gêneros e plataformas.');
    }
    const stock = Number(form.stock);
    if (!String(form.stock).trim() || !Number.isSafeInteger(stock) || stock < 0) throw new Error('Informe um estoque inteiro a partir de zero.');
    if (form.image && !/^data:image\/(jpeg|png|webp);base64,/.test(form.image)) throw new Error('Escolha uma capa JPG, PNG ou WebP.');
    const formats = form.formats.filter((format) => format.enabled).map((format) => {
        const price = Number(format.price);
        if (!['digital', 'fisica'].includes(format.id) || !Number.isFinite(price) || price <= 0 || !format.platform.trim()) {
            throw new Error('Informe um preço maior que zero e a plataforma de cada formato selecionado.');
        }
        const oldFormat = previous?.formats.find((item) => item.id === format.id);
        return { id: format.id, label: format.id === 'digital' ? 'Edição digital' : 'Mídia física',
            price, platform: format.platform.trim(), description: format.description.trim(),
            oldPrice: oldFormat?.price === price ? oldFormat.oldPrice : null };
    });
    if (!formats.length || new Set(formats.map((format) => format.id)).size !== formats.length) throw new Error('Selecione pelo menos um formato, sem duplicados.');
    const game = {
        ...previous, slug: slug || crypto.randomUUID(), title: form.title.trim(),
        shortDescription: form.shortDescription.trim(), description: form.description.trim(),
        genres, platforms, release: form.release.trim() || 'Disponível', stock, image: form.image || '', formats,
        requirements: { minimum: parseRequirements(form.minimum), recommended: parseRequirements(form.recommended) },
        recommendedHardware: previous?.recommendedHardware || [],
        cover: previous?.cover || { primary: '#ffb454', secondary: '#242448', glow: '255, 180, 84', symbol: '✦', kicker: 'MiniByte', badge: 'Jogos' },
        active: true,
    };
    writeGames(previous ? games.map((item) => item.slug === slug ? game : item) : [...games, game]);
    return game;
}
export function setGameActive(slug, active) {
    requireAdmin();
    const games = readGames();
    if (!games.some((game) => game.slug === slug)) throw new Error('Jogo não encontrado.');
    writeGames(games.map((game) => game.slug === slug ? { ...game, active } : game));
}