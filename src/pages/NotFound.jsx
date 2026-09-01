import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="p-20 text-center">
            <h1>404</h1>
            <p>Página não encontrada.</p>
            <Link to="/" className="btn">Voltar para Home</Link>
        </main>
    );
}

export default NotFound;