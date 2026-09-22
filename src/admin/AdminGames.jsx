import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../componentes/data/gamesData';
import { emptyGame, gameToForm, saveGame, setGameActive } from './gameStore';
import { useGameState } from './useGames';
import { readImage } from './readImage';

export default function AdminGames() {
    const { games, error: catalogError } = useGameState();
    const [form, setForm] = useState(emptyGame);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const field = (key, value) => setForm((current) => ({ ...current, [key]: value }));
    const formatField = (id, key, value) => setForm((current) => ({
        ...current, formats: current.formats.map((format) => format.id === id ? { ...format, [key]: value } : format),
    }));
    function act(action, success) {
        setError('');
        setMessage('');
        try { action(); setMessage(success); } catch (error) { setError(error.message); }
    }
    function submit(event) {
        event.preventDefault();
        act(() => {
            saveGame(form, editing);
            setForm(emptyGame);
            setEditing(null);
        }, 'Jogo publicado na página Jogos.');
    }
    async function upload(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) return;
        setImageLoading(true);
        setError('');
        try { field('image', await readImage(file)); }
        catch (error) { setError(error.message); }
        finally { setImageLoading(false); input.value = ''; }
    }
    return <>
        {(error || catalogError) && <p className="mini-admin-error" role="alert">{error || catalogError}</p>}
        {message && <p role="status">{message}</p>}
        <form className="perfil-panel perfil-form" onSubmit={submit}>
            <h3>{editing ? 'Editar jogo' : 'Novo jogo'}</h3>
            <p>Publique jogos com capa, plataformas, formatos e requisitos.</p>
            <label>Capa (opcional)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={imageLoading} /></label>
            {form.image && <><img className="mini-admin-preview" src={form.image} alt="Prévia da capa" /><button type="button" className="perfil-text-link" onClick={() => field('image', '')}>Remover capa</button></>}
            <label>Título<input required value={form.title} onChange={(event) => field('title', event.target.value)} /></label>
            <label>Resumo para o catálogo<input required value={form.shortDescription} onChange={(event) => field('shortDescription', event.target.value)} /></label>
            <label>Descrição completa<textarea required value={form.description} onChange={(event) => field('description', event.target.value)} /></label>
            <div className="perfil-form-grid">
                <label>Gêneros (separados por vírgula)<input required placeholder="RPG, Aventura" value={form.genres} onChange={(event) => field('genres', event.target.value)} /></label>
                <label>Plataformas (separadas por vírgula)<input required placeholder="PC, PlayStation 5" value={form.platforms} onChange={(event) => field('platforms', event.target.value)} /></label>
                <label>Selo de lançamento<input placeholder="Disponível, Lançamento..." value={form.release} onChange={(event) => field('release', event.target.value)} /></label>
                <label>Estoque disponível<input required type="number" min="0" step="1" value={form.stock} onChange={(event) => field('stock', event.target.value)} /></label>
            </div>
            {form.formats.map((format) => <fieldset className="mini-admin-format" key={format.id}>
                <legend>{format.label}</legend>
                <label className="mini-admin-check"><input type="checkbox" checked={format.enabled} onChange={(event) => formatField(format.id, 'enabled', event.target.checked)} /> Oferecer este formato</label>
                {format.enabled && <>
                    <div className="perfil-form-grid">
                        <label>Preço — {format.label} (R$)<input required type="number" min="0.01" step="0.01" value={format.price} onChange={(event) => formatField(format.id, 'price', event.target.value)} /></label>
                        <label>Plataforma / loja — {format.label}<input required placeholder="PC / Steam" value={format.platform} onChange={(event) => formatField(format.id, 'platform', event.target.value)} /></label>
                    </div>
                    <label>Informações do formato<input value={format.description} onChange={(event) => formatField(format.id, 'description', event.target.value)} /></label>
                </>}
            </fieldset>)}
            <label>Requisitos mínimos de PC (opcional)<textarea placeholder={'Processador: Intel Core i5\nMemória: 8 GB RAM'} value={form.minimum} onChange={(event) => field('minimum', event.target.value)} /></label>
            <label>Requisitos recomendados de PC (opcional)<textarea placeholder={'Processador: Intel Core i7\nMemória: 16 GB RAM'} value={form.recommended} onChange={(event) => field('recommended', event.target.value)} /></label>
            <small>Informe um componente por linha, no formato Componente: especificação. Para jogos de console, deixe vazio.</small>
            <div className="mini-admin-tabs">
                <button className="perfil-action perfil-action--primary" disabled={imageLoading || !!catalogError}>{imageLoading ? 'Preparando capa...' : 'Publicar jogo'}</button>
                {editing && <button type="button" className="perfil-action" disabled={imageLoading} onClick={() => { setForm(emptyGame); setEditing(null); setError(''); setMessage(''); }}>Cancelar edição</button>}
            </div>
        </form>
        <section className="perfil-panel"><h3>Jogos cadastrados ({games.length})</h3>
            {games.map((game) => <article className="mini-admin-row" key={game.slug}>
                {game.image && <img src={game.image} alt="" />}
                <div><strong>{game.title}</strong><p>{formatCurrency(Math.min(...game.formats.map((format) => format.price)))} · {game.stock ?? 10} em estoque · {game.active === false ? 'Inativo' : 'Publicado'}</p></div>
                {game.active !== false && <Link className="perfil-text-link" to={'/jogos/' + game.slug}>Ver jogo</Link>}
                <button type="button" className="perfil-text-link" disabled={imageLoading} onClick={() => { setForm(gameToForm(game)); setEditing(game.slug); setError(''); setMessage(''); }}>Editar</button>
                <button type="button" className="perfil-text-link" onClick={() => act(() => setGameActive(game.slug, game.active === false), game.active === false ? 'Jogo reativado.' : 'Jogo retirado do catálogo.')}>{game.active === false ? 'Reativar' : 'Desativar'}</button>
            </article>)}
        </section>
    </>;
}