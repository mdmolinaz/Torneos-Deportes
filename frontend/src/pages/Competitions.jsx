import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { competitionService } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Card from '../components/Card';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await competitionService.getAll();
        setCompetitions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompetitions();
  }, []);

  const handleCreate = () => {
    navigate('/competitions/new');
  };

  const handleRowClick = (competition) => {
    navigate(`/competitions/${competition.id}`);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Competencias</h1>
        <Button onClick={handleCreate} variant="primary">
          Nueva Competencia
        </Button>
      </div>
      <Button 
  onClick={() => navigate('/assign-athlete')}
  variant="secondary"
  className="ml-2"
>
  Asignar Atletas
</Button>
      <Card>
        {loading ? (
          <div className="text-center py-8">Cargando competencias...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <Table 
            data={competitions}
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'date', label: 'Fecha', type: 'date' },
              { key: 'location', label: 'Ubicación' },
              { key: 'sport_type', label: 'Deporte' }
            ]}
            onRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
};

export default Competitions;