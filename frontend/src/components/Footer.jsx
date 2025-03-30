import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-logo">Torneos Deportivos</div>
            <p>Plataforma de gestión de competencias deportivas acuáticas y terrestres.</p>
          </div>
          
          <div className="footer-links">
            <h3>Enlaces</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/athletes">Atletas</Link></li>
              <li><Link to="/competitions">Competencias</Link></li>
              <li><Link to="/results">Resultados</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy">Política de privacidad</Link></li>
              <li><Link to="/terms">Términos de servicio</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Torneos Deportivos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;