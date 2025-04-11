import React, { useState, useEffect } from 'react';
import { athleteService, competitionService, timeService } from '../services/api';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';

const AthleteCompetitionAssign = () => {
  const [athletes, setAthletes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [formData, setFormData] = useState({
    athlete_id: '',
    competition_id: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [athletesData, competitionsData] = await Promise.all([
        athleteService.getAll(),
        competitionService.getAll()
      ]);
      setAthletes(athletesData);
      setCompetitions(competitionsData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await timeService.assignAthleteToCompetition(formData);
      setMessage('Atleta asignado correctamente');
      setFormData({ athlete_id: '', competition_id: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al asignar');
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Asignar Atleta a Competencia</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Seleccionar Atleta"
            options={athletes.map(a => ({
              value: a.id,
              label: `${a.name} (${a.age} años)`
            }))}
            value={formData.athlete_id}
            onChange={(e) => setFormData({...formData, athlete_id: e.target.value})}
          />

          <Select
            label="Seleccionar Competencia"
            options={competitions.map(c => ({
              value: c.id,
              label: `${c.name} - ${new Date(c.date).toLocaleDateString()}`
            }))}
            value={formData.competition_id}
            onChange={(e) => setFormData({...formData, competition_id: e.target.value})}
          />

          <Button type="submit" variant="primary">
            Asignar Atleta
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

export default AthleteCompetitionAssign;