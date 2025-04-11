import React, { useState, useEffect } from 'react';
import { timeService, competitionService } from '../services/api';
import Table from '../components/Table';
import Card from '../components/Card';
import Select from '../components/Select';

const Results = () => {
  const [results, setResults] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comps, times] = await Promise.all([
          competitionService.getAll(),
          timeService.getAll()
        ]);
        
        setCompetitions(comps);
        setResults(times);
        
        if (comps.length > 0) {
          setSelectedCompetition(comps[0].id);
          const winnersData = await timeService.getWinnersByCompetition(comps[0].id);
          setWinners(winnersData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCompetitionChange = async (e) => {
    const compId = e.target.value;
    setSelectedCompetition(compId);
    try {
      const winnersData = await timeService.getWinnersByCompetition(compId);
      setWinners(winnersData);
    } catch (err) {
      console.error('Error fetching winners:', err);
      setWinners([]);
    }
  };

  // Función para formatear el tiempo de manera segura
  const formatTime = (timeString) => {
    if (!timeString) return '--:--:--';
    
    try {
      // Asumimos que el tiempo viene en formato HH:MM:SS o similar
      const parts = timeString.split(':');
      if (parts.length >= 2) {
        // Si solo tiene minutos y segundos (MM:SS)
        if (parts.length === 2) {
          return timeString;
        }
        // Si tiene horas, minutos y segundos (HH:MM:SS)
        return timeString;
      }
      return timeString; // Si no coincide con los formatos esperados, devolver el valor original
    } catch (e) {
      console.error('Error formatting time:', e);
      return timeString; // En caso de error, devolver el valor original
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Resultados</h1>
        <Card>
          <div className="text-center py-8">Cargando resultados...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Resultados</h1>
        <Card>
          <div className="text-red-500 text-center py-8">{error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados</h1>
      
      <Card>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar competencia:
          </label>
          <Select
            options={competitions.map(c => ({ value: c.id, label: c.name }))}
            value={selectedCompetition}
            onChange={handleCompetitionChange}
          />
        </div>

        {/* Sección de Ganadores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ganadores</h2>
          {winners.length > 0 ? (
            <Table 
              data={winners}
              columns={[
                { 
                  key: 'athlete_name', 
                  label: 'Atleta', 
                  className: 'font-medium' 
                },
                { 
                  key: 'best_time', 
                  label: 'Mejor Tiempo',
                  render: (value) => formatTime(value)
                },
                { 
                  key: 'category_name', 
                  label: 'Categoría' 
                }
              ]}
              className="mb-6"
            />
          ) : (
            <p className="text-gray-500 mb-6">No hay datos de ganadores para esta competencia</p>
          )}
        </div>

        {/* Sección de Todos los Resultados */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Todos los Resultados</h2>
          {selectedCompetition && results.filter(r => r.competition_id == selectedCompetition).length > 0 ? (
            <Table 
              data={results.filter(r => r.competition_id == selectedCompetition)}
              columns={[
                { 
                  key: 'athlete_name', 
                  label: 'Atleta' 
                },
                { 
                  key: 'time_recorded', 
                  label: 'Tiempo',
                  render: (value) => formatTime(value)
                },
                { 
                  key: 'created_at', 
                  label: 'Fecha Registro',
                  render: (value) => new Date(value).toLocaleDateString()
                }
              ]}
            />
          ) : (
            <p className="text-gray-500">No hay resultados registrados para esta competencia</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Results;