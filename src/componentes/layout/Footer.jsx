import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Especificos/LogoCompleta.png';

import iconContato from '../../assets/images/Icons/Nav_Footer/icon-contato.png';
import iconEmail from '../../assets/images/Icons/Nav_Footer/icon-email.png';
import iconLocalizacao from '../../assets/images/Icons/Nav_Footer/icon-localizacao.png';
import iconRedes from '../../assets/images/Icons/Nav_Footer/icon-redes.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-col">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p className="footer-description">
                        Combinamos estratégia, estética e propósito para criar marcas memoráveis e soluções digitais.
                    </p>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Navegação</h4>
                    <ul className="footer-links">
                        <li><NavLink to="/" className="btn-link">Home</NavLink></li>
                        <li><NavLink to="/sobre" className="btn-link">Sobre</NavLink></li>
                        <li><NavLink to="/blog" className="btn-link">Blog</NavLink></li>
                        <li><NavLink to="/contato" className="btn-link">Contato</NavLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Mais Links</h4>
                    <ul className="footer-links">
                        <li><NavLink to="/login" className="btn-link">Login</NavLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Contato</h4>
                    <ul className="footer-contact-list">
                        <li className="footer-contact-item">
                            <img src={iconLocalizacao} alt="" className="footer-icon" />
                            <span>Sua Cidade - UF</span>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconEmail} alt="" className="footer-icon" />
                            <a href="mailto:contato@seudominio.com.br">contato@seudominio.com.br</a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconContato} alt="" className="footer-icon" />
                            <a href="tel:+5555999999999">(55) 99999-9999</a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconRedes} alt="" className="footer-icon" />
                            <a href="https://instagram.com/sua.marca" target="_blank" rel="noopener noreferrer">@sua.marca</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Studio Modelo. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export default Footer;
