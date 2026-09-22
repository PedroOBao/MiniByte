import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createAccount, signIn, signOut, readSession, updateAccount, changePassword, listAdmins, readAccounts } from '../src/componentes/users/localAccounts.js';
import { readProducts, saveProduct, setProductActive, PRODUCT_KEY } from '../src/admin/productStore.js';

let data;
beforeEach(() => {
    data = new Map();
    globalThis.localStorage = {
        getItem: (key) => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, String(value)),
        removeItem: (key) => data.delete(key),
    };
    globalThis.window = new EventTarget();
});
const customer = () => createAccount('Cliente', 'cliente@example.com', 'senha123');
const admin = () => signIn('admin@email.com', 'admin123');
const product = { name: 'Teclado', category: 'Periféricos', brand: 'MiniByte', description: 'Teclado mecânico', price: '120.50', stock: '3', image: '' };

test('cadastro normaliza e-mail, preserva CPF e não retorna senha', () => {
    const account = createAccount(' Ana ', ' ANA@example.com ', 'senha123', '123');
    assert.equal(account.nome, 'Ana');
    assert.equal(account.email, 'ana@example.com');
    assert.equal(account.cpf, '123');
    assert.equal(account.senha, undefined);
    assert.equal(signIn('ANA@EXAMPLE.COM', 'senha123').id, account.id);
    assert.throws(() => createAccount('Outra', 'ana@example.com', 'senha123'), /já cadastrado/);
    assert.throws(() => signIn('ana@example.com', 'errada'), /inválidos/);
});

test('editar e-mail mantém vínculo e permite nova edição e troca de senha', () => {
    const account = customer();
    signIn(account.email, 'senha123');
    updateAccount({ email: 'novo@example.com', nome: 'Novo nome' });
    updateAccount({ nome: 'Segundo nome', nivel_acesso: 'admin' });
    changePassword('senha123', 'nova123');
    assert.equal(readSession().nome, 'Segundo nome');
    assert.equal(readSession().nivel_acesso, 'visualizador');
    signOut();
    assert.equal(readSession(), null);
    assert.throws(() => signIn(account.email, 'senha123'));
    assert.throws(() => signIn('novo@example.com', 'senha123'));
    assert.equal(signIn('novo@example.com', 'nova123').id, account.id);
});

test('duplicidade na edição não modifica a conta', () => {
    customer();
    createAccount('Outro', 'outro@example.com', 'senha123');
    signIn('cliente@example.com', 'senha123');
    assert.throws(() => updateAccount({ email: 'OUTRO@example.com' }), /já cadastrado/);
    assert.equal(readSession().email, 'cliente@example.com');
});

test('endereço, pagamento e preferências persistem isolados por conta', () => {
    customer();
    createAccount('Outro', 'outro@example.com', 'senha123');
    signIn('cliente@example.com', 'senha123');
    updateAccount({ address: { rua: 'Rua A' }, payment: 'pix', preferences: { news: false } });
    signOut();
    signIn('outro@example.com', 'senha123');
    assert.equal(readSession().address, undefined);
    signOut();
    signIn('cliente@example.com', 'senha123');
    assert.equal(readSession().address.rua, 'Rua A');
    assert.equal(readSession().payment, 'pix');
    assert.equal(readSession().preferences.news, false);
});

test('isAdmin antigo não autoriza visitante nem cliente', () => {
    localStorage.setItem('isAdmin', 'true');
    assert.equal(readSession(), null);
    assert.throws(listAdmins, /Entre novamente/);
    customer();
    signIn('cliente@example.com', 'senha123');
    localStorage.setItem('isAdmin', 'true');
    assert.throws(listAdmins, /exclusivo/);
    assert.throws(() => createAccount('Admin falso', 'falso@example.com', 'senha123', '', true), /exclusivo/);
    assert.throws(() => saveProduct(product), /exclusivo/);
    assert.throws(() => setProductActive('rtx-4070', false), /exclusivo/);
});

test('administrador pode criar outro e mudar o próprio acesso sem manter senha fixa', () => {
    admin();
    createAccount('Segundo ADM', 'segundo@example.com', 'senha456', '', true);
    assert.equal(listAdmins().length, 2);
    updateAccount({ email: 'principal@example.com' });
    changePassword('admin123', 'nova456');
    signOut();
    assert.throws(() => signIn('admin@email.com', 'admin123'), /inválidos/);
    assert.equal(signIn('principal@example.com', 'nova456').nivel_acesso, 'admin');
    signOut();
    assert.equal(signIn('segundo@example.com', 'senha456').nivel_acesso, 'admin');
});

test('sessão antiga de cliente migra para ID na edição', () => {
    const account = customer();
    localStorage.setItem('currentUser', JSON.stringify({ nome: account.nome, email: account.email }));
    updateAccount({ email: 'migrado@example.com' });
    assert.equal(readSession().id, account.id);
    assert.equal(readSession().email, 'migrado@example.com');
});

test('dados corrompidos não são sobrescritos pelo cadastro', () => {
    localStorage.setItem('registeredUsers', '{invalido');
    assert.throws(customer, /inválidos/);
    assert.equal(localStorage.getItem('registeredUsers'), '{invalido');
    assert.equal(readSession(), null);
    localStorage.setItem('registeredUsers', '{}');
    assert.throws(readAccounts, /inválidos/);
});

test('produto criado e editado persiste e pode ser desativado e reativado', () => {
    admin();
    const count = readProducts().length;
    const saved = saveProduct({ ...product, image: 'data:image/jpeg;base64,YQ==' });
    assert.equal(readProducts().find((item) => item.slug === saved.slug).image, 'data:image/jpeg;base64,YQ==');
    assert.equal(readProducts().length, count + 1);
    saveProduct({ ...product, name: 'Teclado atualizado', price: '99' }, saved.slug);
    assert.equal(readProducts().find((item) => item.slug === saved.slug).types[0].price, 99);
    setProductActive(saved.slug, false);
    assert.equal(readProducts().find((item) => item.slug === saved.slug).active, false);
    setProductActive(saved.slug, true);
    assert.equal(readProducts().find((item) => item.slug === saved.slug).active, true);
    for (const item of readProducts()) setProductActive(item.slug, false);
    assert.equal(readProducts().filter((item) => item.active).length, 0);
});

test('validação de produtos rejeita valores inválidos e preserva variantes', () => {
    admin();
    assert.throws(() => saveProduct({ ...product, price: '0' }));
    assert.throws(() => saveProduct({ ...product, stock: '1.5' }));
    assert.throws(() => saveProduct({ ...product, image: 'javascript:alert(1)' }));
    const original = readProducts()[0];
    const edited = saveProduct(product, original.slug);
    assert.equal(edited.types.length, original.types.length);
    assert.equal(edited.types[1].price, original.types[1].price);
    localStorage.setItem(PRODUCT_KEY, '{invalido');
    assert.throws(() => saveProduct(product));
    assert.equal(localStorage.getItem(PRODUCT_KEY), '{invalido');
});

test('falha ao salvar não emite confirmação nem altera os dados registrados', () => {
    customer();
    signIn('cliente@example.com', 'senha123');
    const previous = localStorage.getItem('registeredUsers');
    const setItem = localStorage.setItem;
    localStorage.setItem = (key, value) => {
        if (key === 'registeredUsers') throw new Error('QuotaExceededError');
        setItem(key, value);
    };
    assert.throws(() => updateAccount({ nome: 'Não salvo' }), /Não foi possível salvar/);
    assert.equal(localStorage.getItem('registeredUsers'), previous);
    assert.equal(readSession().nome, 'Cliente');
});