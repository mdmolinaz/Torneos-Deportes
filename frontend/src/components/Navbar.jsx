import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="text-xl font-bold text-white">
        Torneos Deportivos
      </div>
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-blue-300 transition">Inicio</Link>
        <Link to="/athletes" className="hover:text-blue-300 transition">Atletas</Link>
        <Link to="/results" className="hover:text-blue-300 transition">Resultados</Link>
        <Link to="/profile" className="hover:text-blue-300 transition">Perfil</Link>
      </div>
      <div>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;