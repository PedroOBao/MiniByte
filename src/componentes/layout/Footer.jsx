import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/Especificos/Logo_MiniByte.png';
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
                        Tecnologia, jogos e hardware para deixar sua experiência digital ainda melhor.
                    </p>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Navegação</h4>
                    <ul className="footer-links">
                        <li><NavLink to="/" className="btn-link">Home</NavLink></li>
                        <li><NavLink to="/sobre" className="btn-link">Sobre</NavLink></li>
                        <li><NavLink to="/jogos" className="btn-link">Jogos</NavLink></li>
                        <li><NavLink to="/contato" className="btn-link">Contato</NavLink></li>
                        <li><NavLink to="/produtos" className="btn-link">Produtos</NavLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Atendimento</h4>
                    <ul className="footer-links">
                        <li><NavLink to="/login" className="btn-link">Login</NavLink></li>
                        <li><NavLink to="/register" className="btn-link">Criar conta</NavLink></li>
                        <li><NavLink to="/contato" className="btn-link">Fale conosco</NavLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">Contato</h4>

                    <ul className="footer-contact-list">

                        <li className="footer-contact-item">
                            <img src={iconLocalizacao} alt="" className="footer-icon" />
                            <a
                                href="https://www.google.com/maps/@-27.859378,-54.4732879,293a,75y,352.12h,79.89t/data=!3m7!1e1!3m5!1sjqgX_MjubUeXt20E_jaIKA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D10.111530477353398%26panoid%3DjqgX_MjubUeXt20E_jaIKA%26yaw%3D352.1237005216378!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Rua São Miguel, 241 - Centro, Santa Rosa - RS
                            </a>
                        </li>

                        <li className="footer-contact-item">
                            <img src={iconEmail} alt="" className="footer-icon" />
                            <a href="mailto:contato@minibyte.com.br">
                                contato@minibyte.com.br
                            </a>
                        </li>

                        <li className="footer-contact-item">
                            <img src={iconContato} alt="" className="footer-icon" />
                            <a href="tel:40028922">
                                4002 8922
                            </a>
                        </li>

                        <li className="footer-contact-item">
                            <img src={iconRedes} alt="" className="footer-icon" />
                            <a
                                href="https://www.instagram.com/minibyte_shop/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram: @minibyte_shop
                            </a>
                        </li>

                        <li className="footer-contact-item">
                            <img src={iconRedes} alt="" className="footer-icon" />
                            <a
                                href="https://wa.me/5540028922"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WhatsApp: 4002 8922
                            </a>
                        </li>

                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} MiniByte. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export default Footer;