import { Navigate, Routes, Route } from 'react-router-dom';
import { UserProvider } from './componentes/users/UserContext';
import { CartProvider } from './componentes/cart/CartProvider';
import AdminRoute from './admin/AdminRoute';

// Layout
import ScrollToTop from './componentes/layout/ScrollToTop';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import CartPanel from './componentes/cart/CartPanel';
import NotFound from './pages/NotFound';

// Páginas
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Jogos from './pages/Jogos';
import JogoDetalhe from './pages/JogoDetalhe';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './admin/Admin';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/jogos/:slug" element={<JogoDetalhe />} />
            <Route path="/blog" element={<Navigate to="/jogos" replace />} />
            <Route path="/blog/:id" element={<Navigate to="/jogos" replace />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <CartPanel />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
