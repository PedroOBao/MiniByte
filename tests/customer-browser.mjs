import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdtemp } from 'node:fs/promises';
import { resolve, extname, join } from 'node:path';
import { spawn } from 'node:child_process';
const root = resolve('dist');
const profile = await mkdtemp(resolve('../.tools/customer-browser-'));
const delay = (ms) => new Promise((done) => setTimeout(done, ms));
const server = createServer(async (req, res) => {
    try {
        const path = new URL(req.url, 'http://localhost').pathname;
        const file = extname(path) ? resolve(root, '.' + path) : join(root, 'index.html');
        if (!file.startsWith(root + '\\') && !file.startsWith(root + '/')) { res.writeHead(403).end(); return; }
        const content = await readFile(file);
        res.writeHead(200, { 'Content-Type': { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png' }[extname(file)] || 'application/octet-stream' }).end(content);
    } catch { res.writeHead(404).end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = 'http://127.0.0.1:' + server.address().port;
const child = spawn(process.env.CHROME_BIN || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const clients = [];
const errors = [];
let browser;
async function connect(url) {
    const socket = new WebSocket(url);
    await new Promise((done, reject) => { socket.addEventListener('open', done, { once: true }); socket.addEventListener('error', reject, { once: true }); });
    let next = 0;
    const pending = new Map();
    socket.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
        if (msg.id && pending.has(msg.id)) {
            const task = pending.get(msg.id);
            clearTimeout(task.timer);
            pending.delete(msg.id);
            if (msg.error) task.reject(new Error(msg.error.message)); else task.resolve(msg.result);
        }
    });
    const client = {
        socket,
        send(method, params = {}) {
            const id = ++next;
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(new Error('Timeout: ' + method)), 10000);
                pending.set(id, { resolve, reject, timer });
                socket.send(JSON.stringify({ id, method, params }));
            });
        },
        async evaluate(expression) {
            const result = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
            if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
            return result.result.value;
        },
    };
    clients.push(client);
    return client;
}
async function waitFor(page, expression) {
    for (let i = 0; i < 80; i++) {
        if (await page.evaluate('!!(' + expression + ')')) return;
        await delay(100);
    }
    throw new Error('Não apareceu: ' + expression);
}
async function navigate(page, path, ready) {
    await page.send('Page.navigate', { url: origin + path });
    await waitFor(page, 'location.pathname === ' + JSON.stringify(path) + ' && (' + ready + ')');
}
async function click(page, text) {
    await page.evaluate('(() => { const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim().endsWith(' + JSON.stringify(text) + ')); if (!b) throw Error("Botão ausente"); b.click(); })()');
    await delay(80);
}
async function fill(page, selector, value) {
    await page.evaluate('(() => { const input = document.querySelector(' + JSON.stringify(selector) + '); if (!input) throw Error("Campo ausente"); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, ' + JSON.stringify(value) + '); input.dispatchEvent(new Event("input", { bubbles: true })); })()');
}
async function login(page, email, password) {
    await navigate(page, '/login', 'document.querySelector("input[type=email]")');
    await fill(page, 'input[type=email]', email);
    await fill(page, 'input[type=password]', password);
    await click(page, 'Entrar');
    await waitFor(page, 'location.pathname === "/perfil" && document.querySelector(".navbar-profile")');
}
const value = (page, selector) => page.evaluate('document.querySelector(' + JSON.stringify(selector) + ').value');
const navName = (page) => page.evaluate('document.querySelector(".navbar-profile-copy strong").textContent');
try {
    let port;
    for (let i = 0; i < 100; i++) {
        try { port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); break; }
        catch { await delay(100); }
    }
    if (!port) throw new Error('Chrome não iniciou.');
    const endpoint = 'http://127.0.0.1:' + port;
    browser = await connect((await (await fetch(endpoint + '/json/version')).json()).webSocketDebuggerUrl);
    const targets = await (await fetch(endpoint + '/json')).json();
    const a = await connect(targets.find((target) => target.type === 'page').webSocketDebuggerUrl);
    await a.send('Runtime.enable');
    await navigate(a, '/login', 'document.querySelector("input[type=email]")');
    const accounts = [
        { id: 'cliente-a', nome: 'Ana Inicial', email: 'ana@example.com', senha: 'senha123', nivel_acesso: 'visualizador', cpf: '11111111111', address: { rua: 'Rua A', numero: '10', cidade: 'Recife', cep: '50000-000' }, payment: 'card' },
        { id: 'cliente-b', nome: 'Bruno Individual', email: 'bruno@example.com', senha: 'senha456', nivel_acesso: 'visualizador' },
    ];
    await a.evaluate('localStorage.clear(); localStorage.setItem("registeredUsers", ' + JSON.stringify(JSON.stringify(accounts)) + ');');
    for (const [id, quantity] of [['a', 1], ['b', 3]]) {
        const cart = [{ cartId: id, title: 'Jogo ' + id, price: 10, quantity }];
        await a.evaluate('localStorage.setItem("minibyte-cart-user-cliente-' + id + '", ' + JSON.stringify(JSON.stringify(cart)) + ')');
    }
    await login(a, 'ana@example.com', 'senha123');
    await click(a, 'Meus dados');
    await fill(a, 'input[name=nome]', 'Ana Atualizada');
    assert.equal(await navName(a), 'Ana Inicial');
    await fill(a, 'input[name=email]', 'nova@example.com');
    await click(a, 'Salvar alterações');
    await waitFor(a, 'document.querySelector(".navbar-profile-copy strong").textContent === "Ana Atualizada"');
    assert.equal(await a.evaluate('JSON.parse(localStorage.registeredUsers)[1].nome'), 'Bruno Individual');
    assert.equal(await a.evaluate('JSON.parse(localStorage.registeredUsers)[1].email'), 'bruno@example.com');
    console.log('PASS: salvar atualiza navbar e preserva outro cliente; rascunho não é publicado.');
    await navigate(a, '/perfil', 'document.querySelector(".perfil-sidebar")');
    await click(a, 'Meus dados');
    assert.equal(await value(a, 'input[name=email]'), 'nova@example.com');
    const target = await (await fetch(endpoint + '/json/new?' + encodeURIComponent(origin + '/perfil'), { method: 'PUT' })).json();
    const b = await connect(target.webSocketDebuggerUrl);
    await b.send('Runtime.enable');
    await waitFor(b, 'document.querySelector(".perfil-sidebar")');
    await click(b, 'Meus dados');
    await fill(b, 'input[name=nome]', 'Ana Entre Abas');
    await click(b, 'Salvar alterações');
    await waitFor(a, 'document.querySelector("input[name=nome]").value === "Ana Entre Abas"');
    assert.equal(await navName(a), 'Ana Entre Abas');
    console.log('PASS: recarregar mantém dados; edição em outra aba atualiza formulário e navbar.');
    await navigate(a, '/checkout', 'document.querySelector("input[name=nome]")');
    assert.equal(await value(a, 'input[name=nome]'), 'Ana Entre Abas');
    assert.equal(await value(a, 'input[name=email]'), 'nova@example.com');
    assert.equal(await value(a, 'input[name=endereco]'), 'Rua A, 10');
    await fill(b, 'input[name=email]', 'final@example.com');
    await click(b, 'Salvar alterações');
    await waitFor(a, 'document.querySelector("input[name=email]").value === "final@example.com"');
    console.log('PASS: checkout recebe dados da conta e sincroniza edição de outra aba.');
    await navigate(a, '/perfil', 'document.querySelector(".perfil-sidebar")');
    await click(a, 'Configurações');
    await click(a, 'Sair');
    await login(a, 'bruno@example.com', 'senha456');
    assert.equal(await navName(a), 'Bruno Individual');
    assert.equal(await a.evaluate('document.querySelector(".navbar-cart-count").textContent'), '3');
    await navigate(a, '/checkout', 'document.querySelector("input[name=nome]")');
    assert.equal(await value(a, 'input[name=endereco]'), '');
    assert.equal(await value(a, 'input[name=email]'), 'bruno@example.com');
    await navigate(a, '/perfil', 'document.querySelector(".perfil-sidebar")');
    await click(a, 'Configurações');
    await click(a, 'Sair');
    await login(a, 'final@example.com', 'senha123');
    assert.equal(await a.evaluate('document.querySelector(".navbar-cart-count").textContent'), '1');
    assert.equal(await navName(a), 'Ana Entre Abas');
    console.log('PASS: trocar cliente isola perfil, checkout e carrinho; novo email permite login.');
    assert.deepEqual(errors, []);
    console.log('PASS: nenhum erro JavaScript nas duas abas.');
} finally {
    if (browser) { try { await browser.send('Browser.close'); } catch { /* já encerrado */ } }
    for (const client of clients) client.socket.close();
    child.kill();
    await new Promise((done) => server.close(done));
}