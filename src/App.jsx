import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './componentes/users/UserContext';
import AdminRoute from './admin/AdminRoute';

// Layout
import ScrollToTop from './componentes/layout/ScrollToTop';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import NotFound from './pages/NotFound';

// Páginas
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './admin/Admin';

function App() {
  return (
    <UserProvider>
      <ScrollToTop />
      <Navbar />
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
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
    </UserProvider>
  );
}

export default App;