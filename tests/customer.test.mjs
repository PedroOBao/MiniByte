import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { createAccount, signIn, signOut, readSession, updateAccount, readAccounts, ACCOUNT_EVENT } from '../src/componentes/users/localAccounts.js';
import { readCart, updateCart } from '../src/componentes/cart/localCart.js';
import { checkoutProfile, checkoutPayment } from '../src/componentes/users/checkoutProfile.js';

beforeEach(() => {
    const data = new Map();
    globalThis.localStorage = {
        getItem: (key) => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, String(value)),
        removeItem: (key) => data.delete(key),
    };
    globalThis.window = new EventTarget();
});
const item = { cartId: 'teste', title: 'Jogo teste', price: 10, quantity: 2 };
test('editar A mantém B intacto e notifica consumidores somente após salvar', () => {
    const a = createAccount('Ana', 'ana@example.com', 'senha123');
    const b = createAccount('Bruno', 'bruno@example.com', 'senha456');
    const originalB = readAccounts().find((account) => account.id === b.id);
    signIn(a.email, 'senha123');
    let observed;
    window.addEventListener(ACCOUNT_EVENT, () => { observed = readSession(); });
    updateAccount({ nome: 'Ana atualizada', email: 'nova@example.com', address: { rua: 'Rua A', numero: '10', cidade: 'Recife', cep: '50000-000' }, payment: 'card' });
    assert.equal(observed.nome, 'Ana atualizada');
    assert.equal(observed.email, 'nova@example.com');
    assert.deepEqual(readAccounts().find((account) => account.id === b.id), originalB);
    assert.equal(checkoutProfile(readSession()).endereco, 'Rua A, 10');
    assert.equal(checkoutProfile(readSession()).email, 'nova@example.com');
    assert.equal(checkoutPayment(readSession()), 'cartao');
    signOut();
    signIn(b.email, 'senha456');
    assert.equal(checkoutProfile(readSession()).nome, 'Bruno');
    assert.equal(checkoutProfile(readSession()).endereco, '');
    assert.equal(checkoutPayment(readSession()), 'pix');
});

test('carrinhos de A, B e visitante ficam isolados e sobrevivem à troca de email', () => {
    const a = createAccount('Ana', 'ana@example.com', 'senha123');
    const b = createAccount('Bruno', 'bruno@example.com', 'senha456');
    updateCart(undefined, () => [item]);
    assert.deepEqual(readCart(a.id), []);
    updateCart(a.id, () => [{ ...item, quantity: 1 }]);
    updateCart(b.id, () => [{ ...item, quantity: 3 }]);
    signIn(a.email, 'senha123');
    updateAccount({ email: 'nova@example.com' });
    assert.equal(readCart(readSession().id)[0].quantity, 1);
    signOut();
    signIn(b.email, 'senha456');
    assert.equal(readCart(readSession().id)[0].quantity, 3);
    updateCart(b.id, () => []);
    assert.deepEqual(readCart(b.id), []);
    assert.equal(readCart(a.id)[0].quantity, 1);
    assert.equal(readCart()[0].quantity, 2);
});