import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Torneos Deportivos
        </Link>
        
        <nav className="flex space-x-6">
          <Link to="/athletes" className="text-gray-700 hover:text-blue-600">
            Atletas
          </Link>
          <Link to="/competitions" className="text-gray-700 hover:text-blue-600">
            Competencias
          </Link>
          <Link to="/results" className="text-gray-700 hover:text-blue-600">
            Resultados
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-blue-600">
            Categorías
          </Link>
          <Link to="/assign-athlete" className="text-gray-700 hover:text-blue-600">
            Asignaciones
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;