import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';
import { athleteService } from '../services/api';

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const data = await athleteService.getAll();
        setAthletes(data);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
      }
    };
    fetchAthletes();
  }, [navigate]);

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