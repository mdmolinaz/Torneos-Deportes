import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { athleteService, categoryService } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';
import Select from '../components/Select';

const AthleteNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Masculino',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar categorías al iniciar
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        setError('Error al cargar categorías');
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación
    if (!formData.name || !formData.age || !formData.category_id) {
      setError('Nombre, edad y categoría son obligatorios');
      setLoading(false);
      return;
    }

    try {
      await athleteService.create({
        ...formData,
        age: Number(formData.age), // Asegurar que age sea número
        category_id: Number(formData.category_id) // Asegurar que category_id sea número
      });
      navigate('/athletes');
    } catch (err) {
      console.error('Error al crear atleta:', err);
      setError(err.response?.data?.error || 'Error al guardar el atleta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Nuevo Atleta</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-2">Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block mb-2">Edad *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full p-2 border rounded"
              min="1"
              max="100"
              required
            />
          </div>

          {/* Género */}
          <div>
            <label className="block mb-2">Género *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Categoría (dropdown dinámico) */}
          <div>
            <label className="block mb-2">Categoría *</label>
            <Select
              options={categories.map(cat => ({
                value: cat.id,
                label: `${cat.name} (${cat.gender}, ${cat.min_age}-${cat.max_age} años)`
              }))}
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AthleteNew;