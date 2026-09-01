import React from "react";

/* ícones */
import iconMissao from "../assets/images/Icons/Sobre/missões.png";
import iconValores from "../assets/images/Icons/Sobre/valores.png";
import iconVisão from "../assets/images/Icons/Sobre/visão.png";

import '../styles/Pages/sobreR.css';

function Sobre() {
  return (
    <main className="sobre-page p-20 animacao-entrada">
      <section className="page-hero text-center">
        <div className="page-hero-container">
          <div className="page-hero-content">
            <h1 className="page-title title-desktop">Sobre o Modelo</h1>
            <h1 className="page-title title-mobile">Sobre Nós</h1>
            <p className="page-subtitle subtitle-desktop">Palavra 1 • Palavra 2 • Palavra 3</p>
            <p className="page-subtitle subtitle-mobile">Palavra 1 • Palavra 2</p>
          </div>
          <div className="slogan-box">
            <span className="slogan fonte-titulo">
              "Slogan aqui"
            </span>
          </div>
        </div>
      </section>

      <section className="sobre-secao">
        <div className="sobre-conteudo-flex">
          <div className="sobre-texto-bloco">
            <h2>Titulo</h2>
            <p>
              TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
              PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
            </p>
            <p className="sobre-destaque-texto">
              TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
              PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
            </p>
          </div>
          <div className="sobre-imagem-bloco">
            <div className="moldura-logo-elo">
              <img src="web3.png" alt="Arte conceitual" className="sobre-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção de propósito */}
      <section className="sobre-secao">
        <div className="sobre-alinhamento">
          <h2 className="h2-central titulo-secao-central sem-linha">Titulo</h2>
          <div className="grid-3x3">
            <div className="card card-lg text-center">
              <div className="icon-card"><img src={iconMissao} alt="Missão" /></div>
              <h3 className="card-titulo">Missão</h3>
              <p>
                TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
              </p>
            </div>
            <div className="card card-lg text-center">
              <div className="icon-card"><img src={iconVisão} alt="Visão" /></div>
              <h3 className="card-titulo">Visão</h3>
              <p>
                TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
              </p>
            </div>
            <div className="card card-lg card-valores">
              <div className="icon-card"><img src={iconValores} alt="Valores" /></div>
              <h3 className="card-titulo">Valores</h3>
              <div className="lista-valores">
                <p><strong>Sub-Topico 1</strong> – Textos para topico aqui.</p>
                <p><strong>Sub-Topico 2</strong> – Textos para topico aqui.</p>
                <p><strong>Sub-Topico 3</strong> – Textos para topico aqui.</p>
                <p><strong>Sub-Topico 4</strong> – Textos para topico aqui.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="sobre-secao">
        <div className="sobre-alinhamento">
          <h2 className="h2-central titulo-secao-central sem-linha">Titulo</h2>
          <div className="grid-3x3">
            <div className="card SF grid-border-right">
              <h3 className="card-titulo">Titulo Card 1</h3>
              <p>
                TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
              </p>
            </div>
            <div className="card SF grid-border-right">
              <h3 className="card-titulo">Titulo Card 2</h3>
              <p>
                TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
              </p>
            </div>
            <div className="card SF">
              <h3 className="card-titulo">Titulo Card 3</h3>
              <p>
                TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="sobre-secao">
        <div className="sobre-alinhamento">
          <h2 className="h2-central titulo-secao-central sem-linha">Nossa Equipe</h2>
          <div className="grid-auto">
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°1" /></div>
              <h3 className="card-titulo">N°1</h3>
              <span className="cargo">Líder / Organizador</span>
              <p>Organização e integração da equipe.</p>
            </div>
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°2" /></div>
              <h3 className="card-titulo">N°2</h3>
              <span className="cargo">Banco de Dados</span>
              <p>Modelagem e implementação de dados.</p>
            </div>
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°3" /></div>
              <h3 className="card-titulo">N°3</h3>
              <span className="cargo">Desenvolvedor Front-end</span>
              <p>Desenvolvimento de interfaces.</p>
            </div>
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°4" /></div>
              <h3 className="card-titulo">N°4</h3>
              <span className="cargo">Desenvolvedor Front-end</span>
              <p>Portfólio e cases de sucesso.</p>
            </div>
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°5" /></div>
              <h3 className="card-titulo">N°5</h3>
              <span className="cargo">Desenvolvedor Front-end</span>
              <p>Blog e formulários.</p>
            </div>
            <div className="card card-equipe text-center">
              <div className="foto-wrapper"><img src={iconMissao} alt="N°6" /></div>
              <h3 className="card-titulo">N°6</h3>
              <span className="cargo">Chefe</span>
              <p>Coordenador do projeto.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sobre;