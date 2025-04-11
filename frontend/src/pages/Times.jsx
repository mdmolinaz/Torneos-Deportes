import React, { useState, useEffect } from 'react';
import { timeService } from '../services/api';
import Table from '../components/Table';
import Card from '../components/Card';

const Times = () => {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const data = await timeService.getAll();
        setTimes(data);
      } catch (error) {
        console.error('Error fetching times:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimes();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Registro de Tiempos</h1>
      <Card>
        {loading ? (
          <p>Cargando tiempos...</p>
        ) : (
          <Table
            data={times}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'athlete_name', label: 'Atleta' },
              { key: 'competition_name', label: 'Competencia' },
              { key: 'time_recorded', label: 'Tiempo' }
            ]}
          />
        )}
      </Card>
    </div>
  );
};

export default Times;