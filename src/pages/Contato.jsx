import { useState } from 'react';
import { aplicarMascaraTelefone } from '../componentes/users/Mascaras';

function Contato() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        tipoProjeto: '',
        mensagem: ''
    });
    const [statusMensagem, setStatusMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTelefoneChange = (e) => {
        const valorMascarado = aplicarMascaraTelefone(e.target.value);
        setForm((prev) => ({ ...prev, telefone: valorMascarado }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de envio
        setStatusMensagem('Mensagem enviada com sucesso! (Demonstração)');
        setForm({ nome: '', email: '', telefone: '', tipoProjeto: '', mensagem: '' });
    };

    return (
        <main className="p-20 animacao-entrada">
            <section className="page-hero text-center">
                <div className="page-hero-container">
                    <div className="page-hero-content">
                        <h1 className="page-title">Contato</h1>
                        <p className="page-subtitle">Nossas Redes • Fale Conosco</p>
                    </div>
                    <div className="slogan-box">
                        <span className="slogan fonte-titulo">
                            Vamos conversar sobre seu projeto.
                        </span>
                    </div>
                </div>
            </section>

            <div className="grid-auto">
                <section className="card card-contato">
                    <h2 className="card-titulo-contato sem-linha">Formulário</h2>
                    <form className="contato-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input name="nome" value={form.nome} onChange={handleChange} type="text" placeholder="Digite seu nome completo" required />
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="seuemail@exemplo.com" required />
                        </div>
                        <div className="form-group">
                            <label>Telefone</label>
                            <input name="telefone" value={form.telefone} onChange={handleTelefoneChange} type="tel" placeholder="(55) 99999-9999" />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Projeto</label>
                            <select name="tipoProjeto" value={form.tipoProjeto} onChange={handleChange}>
                                <option>Selecione uma opção</option>
                                <option>Criação de Site</option>
                                <option>Identidade Visual</option>
                                <option>Outros serviços</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Mensagem</label>
                            <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Conte sua ideia..." rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-outline w-100">Enviar Mensagem</button>
                        {statusMensagem && <p style={{ marginTop: '10px' }}>{statusMensagem}</p>}
                    </form>
                </section>

                <section className="card card-contato">
                    <h2 className="card-titulo-contato sem-linha">Informações</h2>
                    <div className="contato-info-list">
                        <div className="contato-info-item">
                            <span className="cargo">Localização</span>
                            <p className="contato-info-valor">Sua Cidade - UF</p>
                        </div>
                        <div className="contato-info-item">
                            <span className="cargo">E-mail profissional</span>
                            <p className="contato-info-valor">contato@seudominio.com.br</p>
                        </div>
                        <div className="contato-info-item">
                            <span className="cargo">Telefone / WhatsApp</span>
                            <p className="contato-info-valor">(55) 99999-9999</p>
                        </div>
                        <div className="contato-info-item">
                            <span className="cargo">Redes Sociais</span>
                            <p className="contato-info-valor">@sua.marca</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Contato;