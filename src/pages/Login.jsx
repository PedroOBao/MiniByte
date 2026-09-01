import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/users/UserContext';
import IconVer from "../assets/images/Icons/Login-Register/icon-ver.png";
import IconCapslock from "../assets/images/Icons/Login-Register/icon-capslock.png";

function Login() {
    const { login } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [capsLockSenha, setCapsLockSenha] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            const usuario = await login(email, senha);
            if (usuario && usuario.nivel_acesso === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            setErro(error.message);
        }
    };

    return (
        <main className="p-20">
            <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
                <h1 className="text-center">Entrar</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <div className="input-password-wrapper">
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyDown={(e) => setCapsLockSenha(e.getModifierState('CapsLock'))}
                                onBlur={() => setCapsLockSenha(false)}
                                className={capsLockSenha ? 'capslock-active' : ''}
                                required
                            />
                            {capsLockSenha && (
                                <img
                                    src={IconCapslock}
                                    alt="Caps Lock ativado"
                                    className="input-capslock-icon"
                                />
                            )}
                            <button
                                type="button"
                                className="input-password-toggle"
                                onMouseDown={() => setMostrarSenha(true)}
                                onMouseUp={() => setMostrarSenha(false)}
                                onMouseLeave={() => setMostrarSenha(false)}
                                onTouchStart={() => setMostrarSenha(true)}
                                onTouchEnd={() => setMostrarSenha(false)}
                                aria-label="Mostrar senha"
                            >
                                <img src={IconVer} alt="olho" className="input-password-icon" />
                            </button>
                        </div>
                    </div>
                    {erro && <p className="erro">{erro}</p>}
                    <button type="submit" className="btn w-100">Entrar</button>
                </form>
                <p className="text-center mt-20">
                    Não tem conta? <Link to="/register">Cadastre-se</Link>
                </p>
                <p className="text-center" style={{ fontSize: '0.85rem', color: '#888' }}>
                    Demo: admin@email.com / admin123
                </p>
            </div>
        </main>
    );
}

export default Login; 