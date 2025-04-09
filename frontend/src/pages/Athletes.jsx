import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { athleteService } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchAthletes();
  }, []);

  const handleCreate = () => {
    navigate('/athletes/new');
  };

  const handleRowClick = (athlete) => {
    navigate(`/athletes/${athlete.id}`);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Atletas</h1>
        <Button onClick={handleCreate} variant="primary">
          Nuevo Atleta
        </Button>
      </div>
      
      <Card>
        {loading ? (
          <div className="text-center py-8">Cargando atletas...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <Table 
            data={athletes}
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'age', label: 'Edad' },
              { key: 'gender', label: 'Género' },
              { key: 'category_id', label: 'Categoría' }
            ]}
            onRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
};

export default Athletes;