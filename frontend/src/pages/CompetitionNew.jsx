import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { competitionService } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';

const CompetitionNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    sport_type: 'Natación' // Valor por defecto
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await competitionService.create(formData);
      navigate('/competitions');
    } catch (error) {
      console.error('Error creating competition:', error);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Nueva Competencia</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Fecha</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Ubicación</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Tipo de Deporte</label>
            <select
              value={formData.sport_type}
              onChange={(e) => setFormData({...formData, sport_type: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Natación">Natación</option>
              <option value="Aguas Abiertas">Aguas Abiertas</option>
              <option value="Acuatlón">Acuatlón</option>
              <option value="Triatlón">Triatlón</option>
              <option value="Atletismo">Atletismo</option>
            </select>
          </div>
          
          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </div>
  );
};

export default CompetitionNew;