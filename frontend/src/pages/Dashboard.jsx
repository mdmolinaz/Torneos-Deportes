import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Dashboard Administrativo</h1>
      <p>Gestiona competencias, categorías, atletas y tiempos.</p>
      <Footer />
    </div>
  );
};

export default Dashboard;