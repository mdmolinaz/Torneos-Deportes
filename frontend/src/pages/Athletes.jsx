import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);

  // Simulación de datos (reemplazar con llamada a la API)
  useEffect(() => {
    const fetchAthletes = async () => {
      const data = [
        { id: 1, name: 'Juan Pérez', age: 25, gender: 'Masculino', category: 'Natación' },
        { id: 2, name: 'Ana Gómez', age: 30, gender: 'Femenino', category: 'Atletismo' },
      ];
      setAthletes(data);
    };
    fetchAthletes();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Gestión de Atletas</h1>
      <Table data={athletes} />
      <Footer />
    </div>
  );
};

export default Athletes;