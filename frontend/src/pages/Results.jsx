import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';

const Results = () => {
  const [results, setResults] = useState([]);

  // Simulación de datos (reemplazar con llamada a la API)
  useEffect(() => {
    const fetchResults = async () => {
      const data = [
        { id: 1, athlete: 'Juan Pérez', competition: 'Natación 100m', time: '00:58:23', category: 'Natación' },
        { id: 2, athlete: 'Ana Gómez', competition: 'Atletismo 5k', time: '00:25:45', category: 'Atletismo' },
      ];
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Resultados de Torneos</h1>
      <Table data={results} />
      <Footer />
    </div>
  );
};

export default Results;