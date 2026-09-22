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
                                href="https://www.google.com/maps/place/R.+S%C3%A3o+Miguel,+241+-+Centro,+Santa+Rosa+-+RS,+98780-196/@-27.8736742,-54.4742388,3a,90y,236.53h,68.93t/data=!3m8!1e1!3m6!1sz-Uf5o_fRrg3JelQuMCJ-A!2e0!5s20260301T000000!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D21.073496831920693%26panoid%3Dz-Uf5o_fRrg3JelQuMCJ-A%26yaw%3D236.53266291691796!7i16384!8i8192!4m15!1m8!3m7!1s0x94f935b390de2b79:0xd037098751471007!2sR.+S%C3%A3o+Miguel,+241+-+Centro,+Santa+Rosa+-+RS,+98780-196!3b1!8m2!3d-27.8737649!4d-54.4744377!16s%2Fg%2F11c1z8xgmv!3m5!1s0x94f935b390de2b79:0xd037098751471007!8m2!3d-27.8737649!4d-54.4744377!16s%2Fg%2F11c1z8xgmv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Rua São Miguel, 241 - Centro, Santa Rosa - RS
                            </a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconEmail} alt="" className="footer-icon" />
                            <a href="mailto:contato@minibyte.com.br">contato@minibyte.com.br</a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconContato} alt="" className="footer-icon" />
                            <a href="tel:+555597058715">(55) 9705-8715</a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconRedes} alt="" className="footer-icon" />
                            <a href="https://www.instagram.com/minibyte_shop/" target="_blank" rel="noopener noreferrer">Instagram: @minibyte_shop</a>
                        </li>
                        <li className="footer-contact-item">
                            <img src={iconRedes} alt="" className="footer-icon" />
                            <a href="https://wa.me/555597058715" target="_blank" rel="noopener noreferrer">WhatsApp: atendimento online</a>
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
