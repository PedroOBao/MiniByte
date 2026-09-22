import { useState } from 'react';
import { createAccount, listAdmins } from '../componentes/users/localAccounts';
import { useUser } from '../componentes/users/UserContext';
import { formatCurrency } from '../componentes/data/gamesData';
import { saveProduct, setProductActive } from './productStore';
import { useProductState } from './useProducts';
import './admin.css';
import AdminGames from './AdminGames';
import { readImage } from './readImage';

const emptyProduct = { name: '', category: '', brand: '', description: '', price: '', stock: '', image: '' };
const emptyAdmin = { nome: '', email: '', senha: '', confirmation: '' };

export default function AdminPanel() {
    const { user } = useUser();
    const { products, error: catalogError } = useProductState();
    const [tab, setTab] = useState('products');
    const [catalogType, setCatalogType] = useState('hardware');
    const [form, setForm] = useState(emptyProduct);
    const [editing, setEditing] = useState(null);
    const [admin, setAdmin] = useState(emptyAdmin);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    if (user?.nivel_acesso !== 'admin') return null;

    let admins = [];
    let accountsError = '';
    try { admins = listAdmins(); } catch (error) { accountsError = error.message; }
    function act(action, success) {
        setError('');
        setMessage('');
        try { action(); setMessage(success); } catch (error) { setError(error.message); }
    }
    function submitProduct(event) {
        event.preventDefault();
        act(() => {
            saveProduct(form, editing);
            setEditing(null);
            setForm(emptyProduct);
        }, 'Produto salvo e publicado no catálogo.');
    }
    function edit(product) {
        setEditing(product.slug);
        setForm({ name: product.name, category: product.categories[0], brand: product.types[0].brand || product.brands[0],
            description: product.shortDescription, price: String(product.types[0].price),
            stock: String(product.stock ?? 10), image: product.image || '' });
        setMessage('');
        setError('');
    }
    async function upload(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageLoading(true);
        setError('');
        try {
            const image = await readImage(file);
            setForm((current) => ({ ...current, image }));
        } catch (error) { setError(error.message); }
        finally { setImageLoading(false); event.target.value = ''; }
    }
    function submitAdmin(event) {
        event.preventDefault();
        act(() => {
            if (admin.senha !== admin.confirmation) throw new Error('As senhas não coincidem.');
            createAccount(admin.nome, admin.email, admin.senha, '', true);
            setAdmin(emptyAdmin);
        }, 'Administrador cadastrado. Ele já pode entrar pelo login.');
    }
    return <section className="perfil-content-stack mini-admin">
        <div className="perfil-section-heading"><div><span className="perfil-eyebrow">Painel administrativo</span>
            <h2>Administração</h2><p>Gerencie os produtos, jogos e acessos da MiniByte.</p></div></div>
        <div className="mini-admin-tabs" aria-label="Áreas administrativas">
            <button type="button" className="perfil-action" aria-pressed={tab === 'products'} onClick={() => { setTab('products'); setError(''); setMessage(''); }}>Produtos</button>
            <button type="button" className="perfil-action" aria-pressed={tab === 'admins'} onClick={() => { setTab('admins'); setError(''); setMessage(''); }}>Administradores</button>
        </div>
        {(error || catalogError || accountsError) && <p role="alert" className="mini-admin-error">{error || catalogError || accountsError}</p>}
        {message && <p role="status">{message}</p>}
        {tab === 'products' && <label className="mini-admin-catalog-label">O que deseja cadastrar?
            <select value={catalogType} disabled={imageLoading} onChange={(event) => { setCatalogType(event.target.value); setError(''); setMessage(''); }}>
                <option value="hardware">Produto / hardware</option><option value="games">Jogo</option>
            </select>
        </label>}
        {tab === 'products' ? catalogType === 'games' ? <AdminGames /> : <>
            <form className="perfil-panel perfil-form" onSubmit={submitProduct}>
                <h3>{editing ? 'Editar produto' : 'Novo produto'}</h3>
                <p>Produtos desta área aparecem na página Produtos. Selecione Jogo acima para publicar na página Jogos.</p>
                <label>Foto (opcional)<input type="file" accept="image/jpeg,image/png,image/webp" disabled={imageLoading} onChange={upload} /></label>
                {form.image && <img className="mini-admin-preview" src={form.image} alt="Prévia do produto" />}
                {form.image && <button type="button" className="perfil-text-link" onClick={() => setForm({ ...form, image: '' })}>Remover foto</button>}
                {[['name', 'Nome'], ['brand', 'Marca'], ['category', 'Categoria']].map(([key, label]) =>
                    <label key={key}>{label}<input required value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}
                <label>Descrição<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
                <div className="perfil-form-grid">
                    <label>Preço da primeira variante (R$)<input type="number" min="0.01" step="0.01" required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
                    <label>Estoque disponível<input type="number" min="0" step="1" required value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} /></label>
                </div>
                <div className="mini-admin-tabs"><button className="perfil-action perfil-action--primary" disabled={imageLoading || !!catalogError}>{imageLoading ? 'Preparando foto...' : 'Publicar produto'}</button>
                    {editing && <button type="button" className="perfil-action" disabled={imageLoading} onClick={() => { setEditing(null); setForm(emptyProduct); }}>Cancelar edição</button>}</div>
            </form>
            <section className="perfil-panel"><h3>Catálogo ({products.length})</h3>
                {products.map((product) => <article className="mini-admin-row" key={product.slug}>
                    {product.image && <img src={product.image} alt="" />}
                    <div><strong>{product.name}</strong><p>{formatCurrency(product.types[0].price)} · {product.stock ?? 10} em estoque · {product.active === false ? 'Inativo' : 'Publicado'}</p></div>
                    <button type="button" disabled={imageLoading} className="perfil-text-link" onClick={() => edit(product)}>Editar</button>
                    <button type="button" className="perfil-text-link" onClick={() => act(() => setProductActive(product.slug, product.active === false), product.active === false ? 'Produto reativado.' : 'Produto retirado do catálogo.')}>{product.active === false ? 'Reativar' : 'Desativar'}</button>
                </article>)}
            </section>
        </> : <>
            <form className="perfil-panel perfil-form" onSubmit={submitAdmin}>
                <h3>Novo administrador</h3>
                {[['nome', 'Nome', 'text'], ['email', 'E-mail', 'email'], ['senha', 'Senha', 'password'], ['confirmation', 'Confirmar senha', 'password']].map(([key, label, type]) =>
                    <label key={key}>{label}<input type={type} required minLength={type === 'password' ? 6 : undefined} autoComplete={type === 'password' ? 'new-password' : undefined} value={admin[key]} onChange={(event) => setAdmin({ ...admin, [key]: event.target.value })} /></label>)}
                <button className="perfil-action perfil-action--primary">Criar administrador</button>
            </form>
            <section className="perfil-panel"><h3>Administradores cadastrados ({admins.length})</h3>
                {admins.map((account) => <article className="mini-admin-row" key={account.id}><div><strong>{account.nome}</strong><p>{account.email}</p></div><span>Administrador</span></article>)}
            </section>
        </>}
    </section>;
}