import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import { athleteService } from '../services/api';
import Card from '../components/Card';

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const data = await athleteService.getAll();
        setAthletes(data);
      } catch (err) {
        setError(err.message);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchAthletes();
  }, [navigate]);

  const handleRowClick = (athlete) => {
    navigate(`/athletes/${athlete.id}`);
  };

  const columns = athletes.length > 0 ? [
    'id', 
    'name', 
    'age', 
    'gender', 
    'category'
  ] : [];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestión de Atletas</h1>
        <button className="btn btn-primary">
          + Nuevo Atleta
        </button>
      </div>
      
      <Card>
        {loading ? (
          <div className="text-center py-8">Cargando atletas...</div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : (
          <Table 
            data={athletes} 
            columns={columns} 
            onRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
};

export default Athletes;