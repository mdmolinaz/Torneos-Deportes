import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/api';
import Table from '../components/Table';
import Button from '../components/Button';
import Card from '../components/Card';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCreate = () => {
    navigate('/categories/new');
  };

  const handleRowClick = (category) => {
    navigate(`/categories/${category.id}`);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button onClick={handleCreate} variant="primary">
          Nueva Categoría
        </Button>
      </div>
      
      <Card>
        {loading ? (
          <div className="text-center py-8">Cargando categorías...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <Table 
            data={categories}
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'description', label: 'Descripción' },
              { key: 'min_age', label: 'Edad Mín' },
              { key: 'max_age', label: 'Edad Máx' },
              { key: 'gender', label: 'Género' }
            ]}
            onRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
};

export default Categories;