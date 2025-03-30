import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { competitionService } from '../services/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';

const Competitions = () => {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await competitionService.getAll();
        setCompetitions(data);
      } catch (err) {
        setError(err.message || 'Error al cargar competencias');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const filteredCompetitions = competitions.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (competition) => {
    navigate(`/competitions/${competition.id}`);
  };

  if (loading) {
    return (
      <PageLayout title="Cargando competencias...">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Error">
        <Card className="bg-red-50 border-red-200">
          <div className="text-red-700">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="primary"
          >
            Reintentar
          </Button>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Competencias"
      description="Administra todas las competencias deportivas"
    >
      <div className="space-y-6">
        {/* Barra de búsqueda y acciones */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar competencias..."
              className="w-full p-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate('/competitions/new')}
            variant="primary"
            className="w-full sm:w-auto"
          >
            Nueva Competencia
          </Button>
        </div>

        {/* Contenido principal */}
        {filteredCompetitions.length === 0 ? (
          <EmptyState
            title="No hay competencias"
            description={searchTerm ? "No se encontraron resultados para tu búsqueda" : "Aún no hay competencias registradas"}
            actionText={searchTerm ? "Limpiar búsqueda" : "Crear primera competencia"}
            onAction={() => searchTerm ? setSearchTerm('') : navigate('/competitions/new')}
          />
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <Table
                data={filteredCompetitions}
                columns={[
                  { key: 'name', label: 'Nombre', className: 'font-medium' },
                  { key: 'date', label: 'Fecha', type: 'date' },
                  { key: 'location', label: 'Ubicación' },
                  { key: 'actions', label: '', type: 'action' }
                ]}
                onRowClick={handleRowClick}
                responsiveBreakpoint="640px"
              />
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Competitions;