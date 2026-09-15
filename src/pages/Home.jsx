import React from 'react';
import { Link } from 'react-router-dom';
import WordMark from '../assets/images/Especificos/WordMark.png';

import iconSlogan from "../assets/images/Especificos/Logo_Estendida.png";

import iconKits from "../assets/images/Icons/Home/Kits.png";
import iconPerifericos from "../assets/images/Icons/Home/Perifericos.png";
import iconHardware from "../assets/images/Icons/Home/Hardware.png";
import iconJogos from "../assets/images/Icons/Home/Jogos.png";

import iconContato from "../assets/images/Icons/Home/icon-contato2.png";

/* ícones institucionais (vindos do Sobre) */
import iconMissao from "../assets/images/Icons/Sobre/missões.png";
import iconValores from "../assets/images/Icons/Sobre/valores.png";
import iconVisão from "../assets/images/Icons/Sobre/visão.png";

import '../styles/Pages/homeR.css';

function Home() {
    return (
        <div className="home-page">
            <div style={{ marginTop: '80px' }}>
                <img src={WordMark} alt="WordMark" className="home-wordmark" />
            </div>

            <main className="p-20 animacao-entrada">

                {/* SEÇÃO 1: QUEM SOMOS */}
                <section className="section section--flex home-secao1">
                    <div className="home-lado home-esquerda">
                        <span className="tag">SOBRE A MINIBYTE</span>
                        <h1 className="home-titulo">
                            Jogos e peças de PC em um só lugar
                        </h1>
                        <p>
                            A MiniByte nasceu da paixão por games e hardware. Reunimos em uma única loja
                            chaves digitais dos principais lançamentos e componentes de computador
                            selecionados a dedo, para que você monte o setup dos seus sonhos sem
                            complicação e sem pagar caro. Nosso time acompanha cada novidade do mercado
                            gamer e testa os produtos antes de colocá-los na prateleira, garantindo que
                            você receba apenas o que realmente vale a pena. Seja para comprar aquele
                            lançamento que todo mundo está jogando, trocar a placa de vídeo ou montar
                            seu primeiro PC do zero, estamos aqui para te ajudar em cada etapa — com
                            preço justo, entrega rápida e atendimento de quem entende do assunto.
                        </p>
                        <Link to="/contato" className="btn btn-outline">Saiba mais</Link>
                    </div>
                    <div className="home-lado home-direita">
                        <img
                            src={iconSlogan}
                            alt="Ícone Slogan"
                            className="home-icone-slogan home-icone-slogan-desktop"
                        />
                        <img
                            src={iconSlogan}
                            alt="Ícone Slogan"
                            className="home-icone-slogan home-icone-slogan-mobile"
                        />
                    </div>
                </section>

                {/* SEÇÃO 2: CATEGORIAS */}
                <section className="section section--flex home-secao2">
                    <div className="section-center">
                        <span className="tag">O QUE VOCÊ ENCONTRA AQUI</span>
                        <h2 className="h2-central sem-linha">Nossas categorias</h2>
                        <div className="grid-4x4">
                            <div className="card">
                                <div className="icon-box icon-box--service">
                                    <img src={iconJogos} alt="Ícone Jogos" />
                                </div>
                                <h3 className="card-title">Jogos Digitais</h3>
                                <p>
                                    Chaves originais para Steam, Epic, Xbox e PlayStation entregues
                                    na hora, direto no seu e-mail.
                                </p>
                            </div>
                            <div className="card">
                                <div className="icon-box icon-box--service">
                                    <img src={iconHardware} alt="Ícone Hardware" />
                                </div>
                                <h3 className="card-title">Hardware</h3>
                                <p>
                                    Placas de vídeo, processadores, memórias, SSDs e fontes das
                                    melhores marcas com garantia estendida.
                                </p>
                            </div>
                            <div className="card">
                                <div className="icon-box icon-box--service">
                                    <img src={iconPerifericos} alt="Ícone Periféricos" />
                                </div>
                                <h3 className="card-title">Periféricos</h3>
                                <p>
                                    Teclados, mouses, headsets e monitores para deixar seu setup
                                    completo e com a sua cara.
                                </p>
                            </div>
                            <div className="card">
                                <div className="icon-box icon-box--service">
                                    <img src={iconKits} alt="Ícone Kits" />
                                </div>
                                <h3 className="card-title">Kits & Combos</h3>
                                <p>
                                    PCs gamer montados e combos prontos com compatibilidade
                                    verificada por nossos especialistas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 3: MISSÃO / VISÃO / VALORES */}
                <section className="sobre-secao">
                    <div className="sobre-alinhamento">
                        <h2 className="h2-central titulo-secao-central sem-linha">
                            No que acreditamos
                        </h2>
                        <div className="grid-3x3">
                            <div className="card card-lg text-center">
                                <div className="icon-card">
                                    <img src={iconMissao} alt="Missão" />
                                </div>
                                <h3 className="card-titulo">Missão</h3>
                                <p>
                                    Tornar o universo gamer acessível, oferecendo jogos e peças de
                                    qualidade com preço justo, entrega rápida e atendimento humano.
                                </p>
                            </div>
                            <div className="card card-lg text-center">
                                <div className="icon-card">
                                    <img src={iconVisão} alt="Visão" />
                                </div>
                                <h3 className="card-titulo">Visão</h3>
                                <p>
                                    Ser a loja de referência para jogadores brasileiros que querem
                                    montar, atualizar e curtir seu setup sem dor de cabeça.
                                </p>
                            </div>
                            <div className="card card-lg card-valores">
                                <div className="icon-card">
                                    <img src={iconValores} alt="Valores" />
                                </div>
                                <h3 className="card-titulo">Valores</h3>
                                <div className="lista-valores">
                                    <p><strong>Transparência</strong> – preço claro, sem taxa escondida.</p>
                                    <p><strong>Curadoria</strong> – só vendemos o que testamos.</p>
                                    <p><strong>Agilidade</strong> – entrega digital imediata.</p>
                                    <p><strong>Paixão por games</strong> – falamos a sua língua.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 4: POR QUE ESCOLHER */}
                <section className="sobre-secao">
                    <div className="sobre-alinhamento">
                        <h2 className="h2-central titulo-secao-central sem-linha">
                            Por que escolher a MiniByte
                        </h2>
                        <div className="grid-3x3">
                            <div className="card SF grid-border-right">
                                <h3 className="card-titulo">Entrega na hora</h3>
                                <p>
                                    Chaves digitais chegam no seu e-mail em segundos após a confirmação
                                    do pagamento. Peças físicas com rastreio em tempo real.
                                </p>
                            </div>
                            <div className="card SF grid-border-right">
                                <h3 className="card-titulo">Suporte de verdade</h3>
                                <p>
                                    Time formado por gente que entende de hardware e games, pronto
                                    para tirar dúvidas sobre compatibilidade, instalação e pós-venda.
                                </p>
                            </div>
                            <div className="card SF">
                                <h3 className="card-titulo">Preço justo</h3>
                                <p>
                                    Negociamos direto com distribuidores para trazer o melhor custo-
                                    benefício, com parcelamento em até 12x sem juros no cartão.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="home-cta">
                    <div className="card card-lg card-cta">
                        <div className="home-cta-icon">
                            <img src={iconContato} alt="Ícone Contato" />
                        </div>
                        <h2 className="home-cta-titulo sem-linha">
                            Pronto para montar seu setup?
                        </h2>
                        <p className="home-cta-texto">
                            Ficou com dúvida sobre qual jogo levar ou qual peça comprar?
                            Fala com a gente — respondemos rapidinho.
                        </p>
                        <Link to="/contato" className="btn btn-outline">
                            Entre em Contato
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Home;