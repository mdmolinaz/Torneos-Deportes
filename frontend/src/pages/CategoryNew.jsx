import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';

const CategoryNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    min_age: '',
    max_age: '',
    gender: 'Mixto'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryService.create(formData);
      navigate('/categories');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Nueva Categoría</h1>
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
            <label className="block mb-2">Descripción</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Edad Mínima</label>
              <input
                type="number"
                value={formData.min_age}
                onChange={(e) => setFormData({...formData, min_age: e.target.value})}
                className="w-full p-2 border rounded"
                required
                min="0"
              />
            </div>
            
            <div>
              <label className="block mb-2">Edad Máxima</label>
              <input
                type="number"
                value={formData.max_age}
                onChange={(e) => setFormData({...formData, max_age: e.target.value})}
                className="w-full p-2 border rounded"
                required
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2">Género</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Mixto">Mixto</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          
          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </div>
  );
};

export default CategoryNew;