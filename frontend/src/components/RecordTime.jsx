import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { timeService } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';

const RecordTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [record, setRecord] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await timeService.getById(id);
        setRecord(data);
      } catch (err) {
        setError('Registro no encontrado');
      }
    };
    fetchRecord();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await timeService.recordTime(id, { time_recorded: time });
      navigate(`/competitions/${record.competition_id}/results`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar tiempo');
    }
  };

  if (!record) return <div>Cargando...</div>;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">
        Registrar Tiempo para {record.athlete_name}
      </h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Tiempo (HH:MM:SS)</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="00:15:30"
              className="w-full p-2 border rounded"
              required
              pattern="\d{2}:\d{2}:\d{2}"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary">
            Guardar Tiempo
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RecordTime;