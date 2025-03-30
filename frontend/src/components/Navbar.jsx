import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="nav-logo">Torneos Deportivos</Link>
          
          <nav className="nav-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/athletes" className="nav-link">Atletas</Link>
            <Link to="/competitions" className="nav-link">Competencias</Link>
            <Link to="/results" className="nav-link">Resultados</Link>
            {isAuthenticated && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
          </nav>
          
          <div className="nav-actions">
            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-outline">Perfil</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Iniciar sesión</Link>
                <Link to="/register" className="btn btn-primary">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;