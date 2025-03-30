import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Bienvenido a Torneos Deportivos</h1>
      <p className="text-xl mb-8 text-gray-600">
        Gestiona competencias de natación, triatlón y más
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Atletas</h2>
          <p className="mb-4">Administra el registro de participantes</p>
          <Link to="/athletes" className="btn">Ver Atletas</Link>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
          <p className="mb-4">Consulta los tiempos y posiciones</p>
          <Link to="/results" className="btn">Ver Resultados</Link>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Registro</h2>
          <p className="mb-4">Únete a nuestras competencias</p>
          <Link to="/register" className="btn">Registrarse</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;