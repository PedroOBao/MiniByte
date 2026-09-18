import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./admin/AdminRoute";
import { CartProvider } from "./componentes/cart/CartProvider";
import { UserProvider } from "./componentes/users/UserContext";

// Layout
import CartPanel from "./componentes/cart/CartPanel";
import Footer from "./componentes/layout/Footer";
import Navbar from "./componentes/layout/Navbar";
import ScrollToTop from "./componentes/layout/ScrollToTop";
import NotFound from "./pages/NotFound";

// Páginas
import Admin from "./admin/Admin";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import JogoDetalhe from "./pages/JogoDetalhe";
import Jogos from "./pages/Jogos";
import Login from "./pages/Login";
import Produtos from "./pages/produtos";
import Register from "./pages/Register";
import Sobre from "./pages/Sobre";

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
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/jogos/:slug" element={<JogoDetalhe />} />
            <Route path="/blog" element={<Navigate to="/jogos" replace />} />
            <Route
              path="/blog/:id"
              element={<Navigate to="/jogos" replace />}
            />
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
