import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Recupera usuário logado da sessão anterior
    useEffect(() => {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('isAdmin');
            }
        }
        setLoading(false);
    }, []);

    // Registra novo usuário (nível 'visualizador')
    const register = (nome, email, senha) => {
        const usuarios = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Verifica se email já existe
        if (usuarios.some((u) => u.email === email)) {
            throw new Error('Email já cadastrado.');
        }

        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            nivel_acesso: 'visualizador',
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('registeredUsers', JSON.stringify(usuarios));
        return novoUsuario;
    };

    const login = async (email, senha) => {
        // 1. Admin fixo
        if (email === 'admin@email.com' && senha === 'admin123') {
            const usuario = { nome: 'Admin', email, nivel_acesso: 'admin' };
            setUser(usuario);
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            localStorage.setItem('isAdmin', 'true');
            return usuario;
        }

        // 2. Usuários registrados localmente
        const usuarios = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const encontrado = usuarios.find(
            (u) => u.email === email && u.senha === senha
        );

        if (encontrado) {
            // Monta objeto sem a senha
            const { senha: _, ...usuarioSemSenha } = encontrado;
            setUser(usuarioSemSenha);
            localStorage.setItem('currentUser', JSON.stringify(usuarioSemSenha));
            // Define isAdmin se for admin (embora registrados sejam sempre 'visualizador')
            if (encontrado.nivel_acesso === 'admin') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                localStorage.removeItem('isAdmin');
            }
            return usuarioSemSenha;
        }

        throw new Error('Email ou senha inválidos');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);