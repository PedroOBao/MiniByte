import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { signIn, signOut, createAccount } from '../src/componentes/users/localAccounts.js';
import { emptyGame, saveGame, readGames, setGameActive, gameToForm, GAME_KEY } from '../src/admin/gameStore.js';
import { readProducts } from '../src/admin/productStore.js';

beforeEach(() => {
    const data = new Map();
    globalThis.localStorage = {
        getItem: (key) => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, String(value)),
        removeItem: (key) => data.delete(key),
    };
    globalThis.window = new EventTarget();
});
const admin = () => signIn('admin@email.com', 'admin123');
function form() {
    return { ...emptyGame, title: 'Jogo de teste', shortDescription: 'Resumo', description: 'Descrição completa',
        genres: 'RPG, Aventura', platforms: 'PC, Console novo', image: 'data:image/jpeg;base64,YQ==',
        minimum: 'Processador: Core i5', recommended: 'Memória: 16 GB',
        formats: emptyGame.formats.map((format) => ({ ...format, enabled: true, price: format.id === 'digital' ? '50' : '80', platform: format.id === 'digital' ? 'PC / Steam' : 'Console novo' })) };
}

test('publica jogo completo e preserva catálogo de hardware', () => {
    admin();
    const before = readProducts();
    const initialCount = readGames().length;
    const saved = saveGame(form());
    const persisted = readGames().find((game) => game.slug === saved.slug);
    assert.equal(readGames().length, initialCount + 1);
    assert.equal(persisted.title, 'Jogo de teste');
    assert.deepEqual(persisted.platforms, ['PC', 'Console novo']);
    assert.equal(persisted.formats[0].price, 50);
    assert.equal(persisted.formats[1].price, 80);
    assert.equal(persisted.image, 'data:image/jpeg;base64,YQ==');
    assert.deepEqual(persisted.requirements.minimum, [['Processador', 'Core i5']]);
    assert.ok(persisted.cover);
    assert.deepEqual(persisted.recommendedHardware, []);
    assert.deepEqual(readProducts(), before);
    signOut();
    assert.equal(readGames().find((game) => game.slug === saved.slug).title, 'Jogo de teste');
});

test('edita jogo original sem mudar URL nem perder recomendações e requisitos', () => {
    admin();
    const original = readGames()[0];
    const edit = gameToForm(original);
    edit.title = 'Título atualizado';
    edit.formats[0].price = '99.90';
    const updated = saveGame(edit, original.slug);
    assert.equal(updated.slug, original.slug);
    assert.equal(updated.formats[0].price, 99.9);
    assert.deepEqual(updated.requirements, original.requirements);
    assert.deepEqual(updated.recommendedHardware, original.recommendedHardware);
    assert.deepEqual(updated.cover, original.cover);
    assert.equal(updated.formats[1].price, original.formats[1].price);
});

test('publica somente mídia física sem requisitos e permite estoque zero', () => {
    admin();
    const input = form();
    input.minimum = '';
    input.recommended = '';
    input.stock = '0';
    input.formats[0].enabled = false;
    const saved = saveGame(input);
    assert.equal(saved.formats.length, 1);
    assert.equal(saved.formats[0].id, 'fisica');
    assert.equal(saved.stock, 0);
    assert.deepEqual(saved.requirements, { minimum: [], recommended: [] });
});

test('desativa, reativa e permite catálogo totalmente vazio', () => {
    admin();
    const game = saveGame(form());
    setGameActive(game.slug, false);
    assert.equal(readGames().find((item) => item.slug === game.slug).active, false);
    setGameActive(game.slug, true);
    assert.equal(readGames().find((item) => item.slug === game.slug).active, true);
    for (const item of readGames()) setGameActive(item.slug, false);
    assert.equal(readGames().filter((item) => item.active !== false).length, 0);
});

test('visitante e cliente não podem alterar jogos', () => {
    assert.throws(() => saveGame(form()), /Entre novamente/);
    createAccount('Cliente', 'cliente@example.com', 'senha123');
    signIn('cliente@example.com', 'senha123');
    assert.throws(() => saveGame(form()), /exclusivo/);
    assert.throws(() => setGameActive(readGames()[0].slug, false), /exclusivo/);
});

test('valida dados, formatos e requisitos sem alterar catálogo', () => {
    admin();
    const initial = readGames();
    assert.throws(() => saveGame({ ...form(), title: ' ' }));
    assert.throws(() => saveGame({ ...form(), platforms: ', ' }));
    assert.throws(() => saveGame({ ...form(), stock: '-1' }));
    assert.throws(() => saveGame({ ...form(), minimum: 'linha sem separador' }));
    assert.throws(() => saveGame({ ...form(), formats: [] }));
    assert.throws(() => saveGame({ ...form(), formats: [{ ...form().formats[0], price: '0' }] }));
    assert.throws(() => saveGame({ ...form(), image: 'https://exemplo.com/imagem.svg' }));
    assert.deepEqual(readGames(), initial);
});

test('preserva dados corrompidos e reporta falha de armazenamento', () => {
    admin();
    localStorage.setItem(GAME_KEY, '{invalido');
    assert.throws(() => saveGame(form()), /catálogo de jogos/);
    assert.equal(localStorage.getItem(GAME_KEY), '{invalido');
    localStorage.removeItem(GAME_KEY);
    const setItem = localStorage.setItem;
    localStorage.setItem = (key, value) => {
        if (key === GAME_KEY) throw new Error('QuotaExceededError');
        setItem(key, value);
    };
    assert.throws(() => saveGame(form()), /Não foi possível salvar/);
    assert.equal(localStorage.getItem(GAME_KEY), null);
});