import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';
import { timeService } from '../services/api';

const Results = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const times = await timeService.getAll();
        // Aquí puedes enriquecer los datos con información de atletas/competencias si es necesario
        setResults(times);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
      }
    };
    fetchResults();
  }, [navigate]);

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