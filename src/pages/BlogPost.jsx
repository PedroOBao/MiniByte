import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { artigos } from '../componentes/data/blogData';

function BlogPost() {
    const { id } = useParams();
    const artigo = artigos.find((a) => a.id === parseInt(id));

    if (!artigo) {
        return (
            <main className="blog-container animacao-entrada p-20 text-center">
                <h2>Artigo não encontrado</h2>
                <Link to="/blog" className="btn-voltar">← Voltar ao Blog</Link>
            </main>
        );
    }

    // Transforma o texto em parágrafos
    const paragrafos = artigo.conteudo
        .split('\n\n')
        .map(p => p.trim()) 
        .filter(p => p !== '');
        
    return (
        <main className="blog-container animacao-entrada p-20">
            <article className="blog-artigo-expandido">
                {/* Voltar */}
                <Link to="/blog" className="btn-voltar">← Voltar ao Blog</Link>
                <br></br>
                {/* Título */}
                <h2 className="artigo-titulo sem-linha centralizado">{artigo.titulo}</h2>

                {/* Data */}
                <span className="cargo artigo-data">{artigo.data}</span>

                {/* Imagem de destaque */}
                <figure className="artigo-imagem-container">
                    <img
                        src={artigo.imagem}
                        alt={artigo.titulo}
                        className="artigo-imagem"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/blog/placeholder.jpg';
                        }}
                    />
                </figure>

                {/* Texto completo */}
                <div className="artigo-conteudo">
                    {paragrafos.map((paragrafo, index) => (
                        <p key={index}>{paragrafo}</p>
                    ))}
                </div>

                {/* Rodapé do artigo */}
                <div className="artigo-footer mt-20 pt-10 border-top">
                    <p>Gostou do conteúdo? Compartilhe com outros empreendedores!</p>
                </div>
            </article>
        </main>
    );
}

export default BlogPost;