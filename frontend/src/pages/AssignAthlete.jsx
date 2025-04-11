import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { athleteService, competitionService, timeService } from '../services/api';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const AssignAthlete = () => {
  const [athletes, setAthletes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [formData, setFormData] = useState({
    athlete_id: '',
    competition_id: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [athletesData, competitionsData] = await Promise.all([
          athleteService.getAll(),
          competitionService.getAll()
        ]);
        setAthletes(athletesData);
        setCompetitions(competitionsData);
      } catch (error) {
        console.error('Error loading data:', error);
        setMessage('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.athlete_id || !formData.competition_id) {
      setMessage('Debes seleccionar un atleta y una competencia');
      return;
    }

    console.log('Enviando:', formData);
    
    try {
      setLoading(true);
      setMessage('');
      
      await timeService.assignAthleteToCompetition({
        athlete_id: formData.athlete_id,
        competition_id: formData.competition_id
      });
      
      setMessage('Atleta asignado correctamente');
      setTimeout(() => navigate('/competitions'), 2000);
    } catch (error) {
      console.error('Error al asignar:', error);
      setMessage(error.message || 'Error al asignar atleta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Asignar Atleta a Competencia</h1>
      
      <Card>
        {loading && <LoadingSpinner className="my-4" />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Seleccionar Atleta *</label>
            <Select
              options={athletes.map(a => ({
                value: a.id,
                label: `${a.name} (${a.age} años)`
              }))}
              value={formData.athlete_id}
              onChange={(e) => setFormData({...formData, athlete_id: e.target.value})}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Seleccionar Competencia *</label>
            <Select
              options={competitions.map(c => ({
                value: c.id,
                label: `${c.name} - ${new Date(c.date).toLocaleDateString()}`
              }))}
              value={formData.competition_id}
              onChange={(e) => setFormData({...formData, competition_id: e.target.value})}
              disabled={loading}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Asignando...' : 'Asignar Atleta'}
          </Button>

          {message && (
            <div className={`mt-4 p-3 rounded ${
              message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AssignAthlete;