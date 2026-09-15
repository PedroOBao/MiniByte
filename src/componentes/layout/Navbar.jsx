import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../users/UserContext';
import { useCart } from '../cart/useCart';
import logo from '../../assets/images/Especificos/Logo_MiniByte.png';
import iconeSair from '../../assets/images/Icons/Nav_Footer/btn-sair.png';
import iconeCarrinho from '../../assets/images/Especificos/Icon_Carrinho.png';

import iconHome from '../../assets/images/Icons/Nav_Footer/icon-home.png';
import iconSobre from '../../assets/images/Icons/Nav_Footer/icon-sobre.png';
import iconJogos from '../../assets/images/Icons/Home/Jogos.png';
import iconContato from '../../assets/images/Icons/Nav_Footer/icon-contato.png';
import iconAdmin from '../../assets/images/Icons/Nav_Footer/icon-admin.png';

function Navbar() {
    const { user, logout } = useUser();
    const { totalItems, openCart } = useCart();
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="Logo" />
            </Link>

            <nav className="navbar-nav">
                <ul className="navbar-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <img src={iconHome} alt="" className="navbar-icon" />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <img src={iconSobre} alt="" className="navbar-icon" />
                            <span>Sobre</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/jogos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <img src={iconJogos} alt="" className="navbar-icon" />
                            <span>Jogos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contato" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <img src={iconContato} alt="" className="navbar-icon" />
                            <span>Contato</span>
                        </NavLink>
                    </li>
                    {isAdmin && (
                        <li>
                            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                                <img src={iconAdmin} alt="" className="navbar-icon" />
                                <span>Admin</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>

            <button
                type="button"
                className="navbar-cart"
                onClick={openCart}
                aria-label={`Abrir carrinho, ${totalItems} item(ns)`}
            >
                <img src={iconeCarrinho} alt="" className="navbar-cart-icon" />
                <span className="navbar-cart-label">Carrinho</span>
                {totalItems > 0 && <span className="navbar-cart-count">{totalItems}</span>}
            </button>

            <div className="navbar-user">
                {user ? (
                    <>
                        <span className="user-nome">{user.nome}</span>
                        <button onClick={handleLogout} className="btn-sair">
                            <img src={iconeSair} alt="Sair" className="btn-sair-icone" />
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn-sair" style={{ textDecoration: 'none' }}>
                        Entrar
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar;
