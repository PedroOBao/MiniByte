import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Blog() {

    return (
        <main className="p-20 animacao-entrada">

            <section className="page-hero text-center">
                <div className="page-hero-container">
                    <div className="page-hero-content">
                        <h1 className="page-title">TITULO</h1>
                        <p className="page-subtitle">Palavra 1 • Palavra 2</p>
                    </div>
                    <div className="slogan-box">
                        <span className="slogan fonte-titulo">
                            Frase de impacto aqui
                        </span>
                    </div>
                </div>
            </section>

            {/* Artigo em destaque (card horizontal com borda âmbar grossa) */}
            <section className="mb-20">
                <div className="card card-blog-destaque">
                    <span className="cargo">Data Noticia</span>
                    <h2 className="card-titulo blog-titulo-destaque sem-linha">
                        Titulo Noticia
                    </h2>
                    <p>
                        TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                        PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
                    </p>
                    <Link to="/blog/1" className="btn btn-outline mt-10">
                        Quero ler o artigo completo
                    </Link>
                </div>
            </section>

            {/* Grid de artigos com 2 colunas (usando grid-auto) */}
            <section>
                <div className="grid-auto">
                    <div className="card card-blog">
                        <span className="cargo">Data Noticia</span>
                        <h2 className="card-titulo blog-titulo-destaque sem-linha">
                            Titulo Noticia
                        </h2>
                        <p>
                            TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                            PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
                        </p>
                        <Link to="/blog/2" className="btn btn-outline mt-10">Ler artigo</Link>
                    </div>

                    <div className="card card-blog">
                        <span className="cargo">Data Noticia</span>
                        <h2 className="card-titulo blog-titulo-destaque sem-linha">
                            Titulo Noticia
                        </h2>
                        <p>
                            TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA
                            PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO TEXTO GERAL PARA PARAGRAFOS DE TEXTO
                        </p>
                        <Link to="/blog/3" className="btn btn-outline mt-10">Ler artigo</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Blog;