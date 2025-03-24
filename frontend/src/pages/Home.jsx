import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Bienvenido a Torneos Deportivos</h1>
      <p>Gestiona competencias de aguas abiertas, natación, acuatlón, triatlón y atletismo.</p>
      <Footer />
    </div>
  );
};

export default Home;    