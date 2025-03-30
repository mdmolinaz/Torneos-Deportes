import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard Administrativo</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <Footer />
    </div>
  );
};

export default Dashboard;