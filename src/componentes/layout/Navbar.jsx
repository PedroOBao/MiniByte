import { Link, NavLink } from "react-router-dom";
import iconeCarrinho from "../../assets/images/Especificos/Icon_Carrinho.png";
import logo from "../../assets/images/Especificos/Logo_MiniByte.png";
import { useCart } from "../cart/useCart";
import { useUser } from "../users/UserContext";

import iconJogos from "../../assets/images/Icons/Home/Jogos.png";
import iconProdutos from "../../assets/images/Icons/Home/hardware.png";
import iconAdmin from "../../assets/images/Icons/Nav_Footer/icon-admin.png";
import iconContato from "../../assets/images/Icons/Nav_Footer/icon-contato.png";
import iconHome from "../../assets/images/Icons/Nav_Footer/icon-home.png";
import iconSobre from "../../assets/images/Icons/Nav_Footer/icon-sobre.png";

function Navbar() {
  const { user } = useUser();
  const { totalItems, openCart } = useCart();
  const isAdmin = user?.nivel_acesso === 'admin';
  const userInitials = user?.nome
    ?.trim()
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" />
      </Link>

      <nav className="navbar-nav">
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconHome} alt="" className="navbar-icon" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconSobre} alt="" className="navbar-icon" />
              <span>Sobre</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jogos"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconJogos} alt="" className="navbar-icon" />
              <span>Jogos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/produtos"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconProdutos} alt="" className="navbar-icon" />
              <span>Produtos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contato"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconContato} alt="" className="navbar-icon" />
              <span>Contato</span>
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
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
        {totalItems > 0 && (
          <span className="navbar-cart-count">{totalItems}</span>
        )}
      </button>

      <div className="navbar-user">
        {user ? (
          <NavLink
            to="/perfil"
            className={({ isActive }) => `navbar-profile${isActive ? " active" : ""}`}
            aria-label="Abrir meu perfil"
          >
            <span className="navbar-profile-avatar">{userInitials || "M"}</span>
            <span className="navbar-profile-copy">
              <small>Minha conta</small>
              <strong>{user.nome}</strong>
            </span>
            <span className="navbar-profile-arrow" aria-hidden="true">→</span>
          </NavLink>
        ) : (
          <Link
            to="/login"
            className="btn-sair"
            style={{ textDecoration: "none" }}
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
