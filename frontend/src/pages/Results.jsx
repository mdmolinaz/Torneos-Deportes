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
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados</h1>
      
      <Card>
        {loading ? (
          <div className="text-center py-8">Cargando resultados...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
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

            <h2 className="text-xl font-semibold mb-4">Ganadores</h2>
            {winners.length > 0 ? (
              <Table 
                data={winners}
                columns={[
                  { key: 'name', label: 'Atleta' },
                  { key: 'best_time', label: 'Mejor Tiempo' }
                ]}
                className="mb-8"
              />
            ) : (
              <p className="text-gray-500 mb-8">No hay datos de ganadores para esta competencia</p>
            )}

            <h2 className="text-xl font-semibold mb-4">Todos los Resultados</h2>
            <Table 
              data={results.filter(r => r.competition_id == selectedCompetition)}
              columns={[
                { key: 'athlete_name', label: 'Atleta' },
                { key: 'time_recorded', label: 'Tiempo' }
              ]}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default Results;