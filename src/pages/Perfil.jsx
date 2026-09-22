import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../componentes/cart/useCart';
import { useUser } from '../componentes/users/UserContext';
import { formatCurrency } from '../componentes/data/gamesData';
import '../styles/Pages/perfil.css';
import AdminPanel from '../admin/AdminPanel';

const tabs = [
	{ id: 'visao-geral', label: 'Visão geral', icon: '⌂' },
	{ id: 'dados', label: 'Meus dados', icon: '◉' },
	{ id: 'pedidos', label: 'Pedidos', icon: '▣' },
	{ id: 'carrinho', label: 'Carrinho', icon: '◌' },
	{ id: 'enderecos', label: 'Endereços', icon: '⌖' },
	{ id: 'pagamentos', label: 'Pagamentos', icon: '▱' },
	{ id: 'seguranca', label: 'Segurança', icon: '◇' },
	{ id: 'configuracoes', label: 'Configurações', icon: '⚙' },
];

const initialAddress = {
	apelido: 'Casa',
	rua: '',
	numero: '',
	cidade: '',
	estado: '',
	cep: '',
};

function ProfileContent() {
	const { user, logout, updateProfile, changePassword } = useUser();
	const { items, totalItems, totalPrice, decrementItem, removeItem } = useCart();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState(user.nivel_acesso === 'admin' ? 'admin' : 'visao-geral');
	const [profile, setProfile] = useState(() => ({ nome: user.nome, email: user.email }));
	const [address, setAddress] = useState(user.address || initialAddress);
	const savedAddress = user.address || null;
	const savedPayment = user.payment || null;
	const [status, setStatus] = useState('');
	const [securityForm, setSecurityForm] = useState({ current: '', next: '', confirmation: '' });

	const initials = useMemo(() => profile.nome.trim().split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'M', [profile.nome]);
	const firstName = profile.nome.trim().split(' ')[0] || 'cliente';

	if (!user) return <Navigate to="/login" replace />;

	const showStatus = (message) => {
		setStatus(message);
		window.setTimeout(() => setStatus(''), 3000);
	};

	const handleProfileChange = (event) => {
		const { name, value } = event.target;
		setProfile((current) => ({ ...current, [name]: value }));
	};

	const persist = (changes, message) => {
        try {
            updateProfile(changes);
            if (message) showStatus(message);
        } catch (error) {
            showStatus(error.message);
        }
    };

    const setSavedAddress = (address) => persist({ address });
    const setSavedPayment = (payment) => persist({ payment }, 'Preferência de pagamento atualizada.');
    const setPreference = (key, value) => persist({
        preferences: { ...user.preferences, [key]: value },
    }, 'Preferência salva.');

    const saveProfile = (event) => {
        event.preventDefault();
        try {
            const updated = updateProfile(profile);
            setProfile({ nome: updated.nome, email: updated.email });
            showStatus('Seus dados foram atualizados.');
        } catch (error) {
            showStatus(error.message);
        }
    };

    const saveAddress = (event) => {
        event.preventDefault();
        persist({ address }, 'Endereço salvo com sucesso.');
    };

    const handleSecuritySubmit = (event) => {
        event.preventDefault();
        if (securityForm.next !== securityForm.confirmation) {
            showStatus('As novas senhas não coincidem.');
            return;
        }
        try {
            changePassword(securityForm.current, securityForm.next);
            setSecurityForm({ current: '', next: '', confirmation: '' });
            showStatus('Senha atualizada com sucesso.');
        } catch (error) {
            showStatus(error.message);
        }
    };

    const renderOverview = () => (
		<div className="perfil-content-stack">
			<div className="perfil-section-heading">
				<div>
					<span className="perfil-eyebrow">Seu espaço MiniByte</span>
					<h2>Olá, {firstName}.</h2>
					<p>Tudo o que você precisa para cuidar da sua conta, em um só lugar.</p>
				</div>
				<button type="button" className="perfil-action perfil-action--primary" onClick={() => setActiveTab('dados')}>Editar perfil</button>
			</div>

			<div className="perfil-stat-grid">
				<button type="button" className="perfil-stat" onClick={() => setActiveTab('pedidos')}>
					<span className="perfil-stat-icon">▣</span><strong>0</strong><span>Pedidos realizados</span>
				</button>
				<button type="button" className="perfil-stat" onClick={() => setActiveTab('carrinho')}>
					<span className="perfil-stat-icon">◌</span><strong>{totalItems}</strong><span>Itens no carrinho</span>
				</button>
				<button type="button" className="perfil-stat" onClick={() => setActiveTab('enderecos')}>
					<span className="perfil-stat-icon">⌖</span><strong>{savedAddress ? '01' : '00'}</strong><span>Endereços salvos</span>
				</button>
			</div>

			<div className="perfil-overview-grid">
				<section className="perfil-panel perfil-panel--highlight">
					<div className="perfil-panel-title"><span>Compra em andamento</span><span className="perfil-status-dot">Ativo</span></div>
					{items.length ? <><h3>{totalItems} {totalItems === 1 ? 'item' : 'itens'} esperando por você</h3><p>Seu carrinho está pronto para a próxima aventura.</p><button type="button" className="perfil-text-link" onClick={() => setActiveTab('carrinho')}>Revisar carrinho <span>→</span></button></> : <><h3>Seu carrinho está leve</h3><p>Explore jogos e produtos para montar seu próximo setup.</p><Link className="perfil-text-link" to="/jogos">Explorar catálogo <span>→</span></Link></>}
				</section>
				<section className="perfil-panel">
					<div className="perfil-panel-title"><span>Conta</span><span className="perfil-security-label">Local</span></div>
					<div className="perfil-account-line"><span className="perfil-avatar perfil-avatar--small">{initials}</span><div><strong>{profile.nome}</strong><span>{profile.email}</span></div><button type="button" aria-label="Editar dados" onClick={() => setActiveTab('dados')}>✎</button></div>
					<div className="perfil-progress"><span style={{ width: savedAddress ? '85%' : '65%' }} /></div><p className="perfil-completion">Perfil {savedAddress ? '85%' : '65%'} completo</p>
				</section>
			</div>

			<section className="perfil-panel perfil-shortcuts"><div><span className="perfil-eyebrow">Acesso rápido</span><h3>O que você procura?</h3></div><div className="perfil-shortcut-list"><button type="button" onClick={() => setActiveTab('enderecos')}>⌖<span>Endereços</span></button><button type="button" onClick={() => setActiveTab('pagamentos')}>▱<span>Pagamento</span></button><button type="button" onClick={() => setActiveTab('seguranca')}>◇<span>Segurança</span></button></div></section>
		</div>
	);

	const renderData = () => (
		<section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Informações pessoais</span><h2>Meus dados</h2><p>Atualize como devemos falar com você.</p></div></div><form className="perfil-form" onSubmit={saveProfile}><label>Nome completo<input name="nome" value={profile.nome} onChange={handleProfileChange} required /></label><label>E-mail<input name="email" type="email" value={profile.email} onChange={handleProfileChange} required /></label><label>Perfil de acesso<input value={user.nivel_acesso === 'admin' ? 'Administrador' : 'Cliente MiniByte'} disabled /></label><div className="perfil-form-actions"><button type="submit" className="perfil-action perfil-action--primary">Salvar alterações</button></div></form></section>
	);

	const renderCart = () => (
		<section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Sua seleção</span><h2>Carrinho</h2><p>{items.length ? 'Revise seus itens antes de finalizar.' : 'Você ainda não adicionou produtos.'}</p></div>{items.length > 0 && <button type="button" className="perfil-action perfil-action--primary" onClick={() => navigate('/checkout')}>Finalizar compra</button>}</div>{items.length ? <div className="perfil-cart-list">{items.map((item) => <div className="perfil-cart-row" key={item.cartId}><div className="perfil-cart-mark">{item.type === 'hardware' ? 'HW' : 'VG'}</div><div className="perfil-cart-info"><strong>{item.title || item.name}</strong><span>{item.subtitle || item.format || item.kind || 'Produto'} · {item.quantity} un.</span></div><strong>{formatCurrency(item.price * item.quantity)}</strong><div className="perfil-cart-controls"><button type="button" onClick={() => decrementItem(item.cartId)} aria-label={`Diminuir quantidade de ${item.title || item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => removeItem(item.cartId)} aria-label={`Remover ${item.title || item.name}`}>×</button></div></div>)}<div className="perfil-cart-total"><span>Total estimado</span><strong>{formatCurrency(totalPrice)}</strong></div></div> : <div className="perfil-empty"><span className="perfil-empty-icon">◌</span><h3>Seu carrinho está vazio</h3><p>Encontre seu próximo jogo ou acessório no catálogo.</p><Link to="/jogos" className="perfil-action perfil-action--primary">Ver jogos</Link></div>}</section>
	);

	const renderOrders = () => <section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Acompanhe suas compras</span><h2>Pedidos</h2><p>Seu histórico de pedidos aparecerá aqui.</p></div></div><div className="perfil-empty"><span className="perfil-empty-icon">▣</span><h3>Nenhum pedido ainda</h3><p>Assim que sua primeira compra for confirmada, você poderá acompanhar tudo por aqui.</p><Link to="/jogos" className="perfil-action perfil-action--primary">Começar a comprar</Link></div></section>;

	const renderAddresses = () => <section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Entrega sem complicação</span><h2>Endereços</h2><p>Salve um endereço para agilizar o checkout.</p></div></div>{savedAddress && <div className="perfil-saved-card"><span className="perfil-saved-icon">⌖</span><div><strong>{savedAddress.apelido}</strong><span>{savedAddress.rua}, {savedAddress.numero} · {savedAddress.cidade} - {savedAddress.estado}</span><small>CEP {savedAddress.cep}</small></div><button type="button" onClick={() => setSavedAddress(null)}>Remover</button></div>}<form className="perfil-form" onSubmit={saveAddress}><div className="perfil-form-grid"><label>Apelido<input value={address.apelido} onChange={(event) => setAddress({ ...address, apelido: event.target.value })} placeholder="Casa, trabalho..." required /></label><label>CEP<input value={address.cep} onChange={(event) => setAddress({ ...address, cep: event.target.value })} placeholder="00000-000" required /></label><label className="perfil-field-wide">Rua<input value={address.rua} onChange={(event) => setAddress({ ...address, rua: event.target.value })} required /></label><label>Número<input value={address.numero} onChange={(event) => setAddress({ ...address, numero: event.target.value })} required /></label><label>Cidade<input value={address.cidade} onChange={(event) => setAddress({ ...address, cidade: event.target.value })} required /></label><label>Estado<input value={address.estado} onChange={(event) => setAddress({ ...address, estado: event.target.value })} maxLength={2} required /></label></div><button type="submit" className="perfil-action perfil-action--primary">Salvar endereço</button></form></section>;

	const renderPayments = () => <section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Checkout mais rápido</span><h2>Meios de pagamento</h2><p>Escolha como prefere pagar suas próximas compras.</p></div></div>{savedPayment ? <div className="perfil-payment-card"><span className="perfil-payment-brand">{savedPayment === 'pix' ? 'PIX' : 'CARD'}</span><div><strong>{savedPayment === 'pix' ? 'PIX' : 'Cartão de crédito'}</strong><span>{savedPayment === 'pix' ? 'Pagamento instantâneo' : 'Método preferido, sem dados de cartão salvos'}</span></div><button type="button" onClick={() => setSavedPayment(null)}>Remover</button></div> : <div className="perfil-payment-options"><button type="button" onClick={() => { setSavedPayment('pix'); }}> <span>◆</span><div><strong>PIX</strong><small>Instantâneo e sem cobrança extra</small></div><b>→</b></button><button type="button" onClick={() => { setSavedPayment('card'); }}><span>▱</span><div><strong>Cartão de crédito</strong><small>Parcele em até 12x sem juros</small></div><b>→</b></button></div>}</section>;

	const renderSecurity = () => <section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Mantenha tudo protegido</span><h2>Segurança</h2><p>Troque sua senha sempre que precisar.</p></div><span className="perfil-security-badge">● Conta local</span></div><form className="perfil-form" onSubmit={handleSecuritySubmit}><label>Senha atual<input type="password" value={securityForm.current} onChange={(event) => setSecurityForm({ ...securityForm, current: event.target.value })} required /></label><label>Nova senha<input type="password" value={securityForm.next} onChange={(event) => setSecurityForm({ ...securityForm, next: event.target.value })} minLength={6} required /></label><label>Confirmar nova senha<input type="password" value={securityForm.confirmation} onChange={(event) => setSecurityForm({ ...securityForm, confirmation: event.target.value })} minLength={6} required /></label><button type="submit" className="perfil-action perfil-action--primary">Atualizar senha</button></form></section>;

	const renderSettings = () => <section className="perfil-panel perfil-form-panel"><div className="perfil-section-heading"><div><span className="perfil-eyebrow">Do seu jeito</span><h2>Configurações</h2><p>Preferências da sua experiência MiniByte.</p></div></div><div className="perfil-settings-list"><label><span><strong>Novidades por e-mail</strong><small>Receba lançamentos e ofertas especiais.</small></span><input type="checkbox" checked={user.preferences?.news ?? true} onChange={(event) => setPreference("news", event.target.checked)} /></label><label><span><strong>Atualizações de pedidos</strong><small>Seja avisado sobre cada etapa da entrega.</small></span><input type="checkbox" checked={user.preferences?.orders ?? true} onChange={(event) => setPreference("orders", event.target.checked)} /></label><label><span><strong>Modo compacto</strong><small>Mostre mais itens nas listas do catálogo.</small></span><input type="checkbox" checked={user.preferences?.compact ?? false} onChange={(event) => setPreference("compact", event.target.checked)} /></label></div><div className="perfil-danger-zone"><div><strong>Sair da conta</strong><small>Você poderá entrar novamente quando quiser.</small></div><button type="button" onClick={() => { logout(); navigate('/'); }}>Sair</button></div></section>;

	const visibleTabs = user.nivel_acesso === 'admin' ? [{ id: 'admin', label: 'Administração', icon: '◇' }, ...tabs] : tabs;
const content = { admin: user.nivel_acesso === 'admin' ? <AdminPanel /> : null, 'visao-geral': renderOverview(), dados: renderData(), pedidos: renderOrders(), carrinho: renderCart(), enderecos: renderAddresses(), pagamentos: renderPayments(), seguranca: renderSecurity(), configuracoes: renderSettings() };

	return <main className="perfil-page animacao-entrada"><section className="perfil-hero"><div className="perfil-avatar">{initials}</div><div className="perfil-hero-copy"><span className="perfil-eyebrow">{user.nivel_acesso === 'admin' ? 'Administrador' : 'Área do cliente'}</span><h1>Meu perfil</h1><p>Gerencie sua conta e deixe sua próxima compra ainda mais simples.</p></div><div className="perfil-hero-meta"><span className="perfil-member-label">Membro desde</span><strong>MiniByte</strong><span className="perfil-online"><i /> Conta ativa</span></div></section><div className="perfil-layout"><aside className="perfil-sidebar"><div className="perfil-sidebar-label">Minha conta</div><nav aria-label="Seções do perfil">{visibleTabs.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? 'is-active' : ''} onClick={() => setActiveTab(tab.id)}><span className="perfil-tab-icon">{tab.icon}</span><span>{tab.label}</span>{tab.id === 'carrinho' && totalItems > 0 && <b>{totalItems}</b>}</button>)}</nav><Link to="/" className="perfil-back-link">← Voltar para a loja</Link></aside><div className="perfil-main-content">{content[activeTab]}</div></div>{status && <div className="perfil-toast" role="status">{status}</div>}</main>;
}

export default function Perfil() {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" replace />;
    return <ProfileContent key={user.id} />;
}
