import { Navigate } from 'react-router-dom';
import { useUser } from '../componentes/users/UserContext';

function AdminRoute({ children }) {
    const { user } = useUser();
    const isAdmin = user?.nivel_acesso === 'admin';

    if (!isAdmin) {
        return <Navigate to={user ? '/perfil' : '/login'} replace />;
    }

    return children;
}

export default AdminRoute;
