// Contas de demonstração: armazenamento exclusivo deste navegador.
export const ACCOUNT_EVENT = 'minibyte:accounts';
export const normalizeEmail = (value) => String(value || '').trim().toLowerCase();
const ADMIN_ID = 'minibyte-demo-admin';

export function readAccounts() {
    try {
        const accounts = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (!Array.isArray(accounts) || accounts.some((account) => !account?.id || !account.email)) throw new Error();
        return accounts;
    } catch {
        throw new Error('Os dados locais de contas estão inválidos. Preserve uma cópia antes de restaurá-los.');
    }
}

function writeAccounts(accounts) {
    try {
        localStorage.setItem('registeredUsers', JSON.stringify(accounts));
    } catch {
        throw new Error('Não foi possível salvar. Verifique o espaço e as permissões do navegador.');
    }
    window.dispatchEvent(new Event(ACCOUNT_EVENT));
}

function publicAccount(account) {
    if (!account) return null;
    const { senha: _, ...profile } = account;
    return profile;
}

export function readSession() {
    try {
        const session = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!session) return null;
        const accounts = readAccounts();
        const account = session.id
            ? accounts.find((item) => item.id === session.id)
            : accounts.find((item) => normalizeEmail(item.email) === normalizeEmail(session.email));
        return publicAccount(account);
    } catch {
        return null;
    }
}

function requireAccount() {
    const account = readSession();
    if (!account) throw new Error('Entre novamente para continuar.');
    return account;
}

export function requireAdmin() {
    const account = requireAccount();
    if (account.nivel_acesso !== 'admin') throw new Error('Acesso exclusivo para administradores.');
    return account;
}

function validateIdentity(nome, email, accounts, id) {
    if (!nome.trim()) throw new Error('Informe seu nome.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Informe um e-mail válido.');
    if (accounts.some((account) => account.id !== id && normalizeEmail(account.email) === email)) throw new Error('E-mail já cadastrado.');
    if (email === 'admin@email.com' && id !== ADMIN_ID) throw new Error('Este e-mail é reservado ao administrador de demonstração.');
}

export function createAccount(nome, email, senha, cpf = '', admin = false) {
    if (admin) requireAdmin();
    const accounts = readAccounts();
    email = normalizeEmail(email);
    validateIdentity(nome, email, accounts);
    if (senha.length < 6) throw new Error('Use uma senha com pelo menos 6 caracteres.');
    const account = { id: crypto.randomUUID(), nome: nome.trim(), email, senha, cpf,
        nivel_acesso: admin ? 'admin' : 'visualizador' };
    writeAccounts([...accounts, account]);
    return publicAccount(account);
}

export function signIn(email, senha) {
    email = normalizeEmail(email);
    let accounts = readAccounts();
    // Criação única: mudar a senha do administrador elimina o acesso inicial.
    if (!accounts.some((account) => account.id === ADMIN_ID) && email === 'admin@email.com' && senha === 'admin123') {
        if (accounts.some((account) => normalizeEmail(account.email) === email)) {
            throw new Error('O e-mail de demonstração já pertence a uma conta local. Preserve os dados antes de resolver esse conflito.');
        }
        accounts = [...accounts, { id: ADMIN_ID, nome: 'Admin', email, senha, nivel_acesso: 'admin' }];
        writeAccounts(accounts);
    }
    const account = accounts.find((item) => normalizeEmail(item.email) === email && item.senha === senha);
    if (!account) throw new Error('E-mail ou senha inválidos.');
    localStorage.setItem('currentUser', JSON.stringify({ id: account.id }));
    localStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event(ACCOUNT_EVENT));
    return publicAccount(account);
}

export function signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event(ACCOUNT_EVENT));
}

export function updateAccount(changes) {
    const current = requireAccount();
    const accounts = readAccounts();
    const nome = String(changes.nome ?? current.nome).trim();
    const email = normalizeEmail(changes.email ?? current.email);
    validateIdentity(nome, email, accounts, current.id);
    const allowed = {};
    for (const key of ['cpf', 'address', 'payment', 'preferences']) {
        if (Object.hasOwn(changes, key)) allowed[key] = changes[key];
    }
    // Migra a sessão antiga para id antes de permitir alterar o e-mail.
    localStorage.setItem('currentUser', JSON.stringify({ id: current.id }));
    const updated = accounts.map((account) => account.id === current.id ? { ...account, ...allowed, nome, email } : account);
    writeAccounts(updated);
    return publicAccount(updated.find((account) => account.id === current.id));
}

export function changePassword(currentPassword, nextPassword) {
    const current = requireAccount();
    const accounts = readAccounts();
    const account = accounts.find((item) => item.id === current.id);
    if (account.senha !== currentPassword) throw new Error('A senha atual está incorreta.');
    if (nextPassword.length < 6) throw new Error('Use uma senha com pelo menos 6 caracteres.');
    writeAccounts(accounts.map((item) => item.id === current.id ? { ...item, senha: nextPassword } : item));
}

export function listAdmins() {
    requireAdmin();
    return readAccounts().filter((account) => account.nivel_acesso === 'admin').map(publicAccount);
}
