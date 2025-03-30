import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
      <Navbar />
      <h1>Bienvenido a Torneos Deportivos</h1>
      <p>Gestiona competencias de aguas abiertas, natación, acuatlón, triatlón y atletismo.</p>
      
      {!isAuthenticated && (
        <div>
          <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>
            Iniciar Sesión
          </button>
          <button onClick={() => navigate('/register')}>
            Registrarse
          </button>
        </div>
      )}

      {isAuthenticated && (
        <button onClick={() => navigate('/dashboard')}>
          Ir al Dashboard
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Home;