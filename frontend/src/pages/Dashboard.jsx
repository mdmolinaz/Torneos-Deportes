import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { athleteService, competitionService, timeService } from '../services/api';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Table from '../components/Table';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    athletes: 0,
    competitions: 0,
    records: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentAthletes, setRecentAthletes] = useState([]);
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener datos en paralelo para mejor performance
        const [athletes, competitions, times] = await Promise.all([
          athleteService.getAll(),
          competitionService.getAll(),
          timeService.getAll()
        ]);

        // Validar datos recibidos
        if (!athletes || !competitions || !times) {
          throw new Error('Datos incompletos recibidos del servidor');
        }
        
        // Procesar atletas recientes
        const recent = [...athletes]
          .sort((a, b) => new Date(b.created_at || b.id) - new Date(a.created_at || a.id))
          .slice(0, 5);
        
        // Procesar competencias próximas con validación de fecha
        const upcoming = competitions
          .filter(c => {
            try {
              return c.date && new Date(c.date) > new Date();
            } catch {
              return false;
            }
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        
        setStats({
          athletes: athletes.length,
          competitions: competitions.length,
          records: times.length,
          categories: new Set(athletes.map(a => a.category_id)).size
        });
        
        setRecentAthletes(recent);
        setUpcomingCompetitions(upcoming);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleAthleteClick = (athlete) => {
    navigate(`/athletes/${athlete.id}`);
  };

  const handleCompetitionClick = (competition) => {
    navigate(`/competitions/${competition.id}`);
  };

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <p className="text-gray-600">Resumen general del sistema</p>
        </div>
        <button 
          onClick={handleLogout}
          className="btn btn-outline bg-white hover:bg-gray-50"
        >
          Cerrar sesión
        </button>
      </div>
      
      {/* Sección de Estadísticas */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Estadísticas Generales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            title="Atletas" 
            description={stats.athletes} 
            icon="👤"
            className="bg-blue-50"
          />
          <Card 
            title="Competencias" 
            description={stats.competitions} 
            icon="🏆"
            className="bg-green-50"
          />
          <Card 
            title="Registros" 
            description={stats.records} 
            icon="⏱️"
            className="bg-yellow-50"
          />
          <Card 
            title="Categorías" 
            description={stats.categories} 
            icon="📋"
            className="bg-purple-50"
          />
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de Atletas Recientes */}
        <section>
          <Card title="Atletas Recientes" className="h-full">
            {recentAthletes.length > 0 ? (
              <Table
                data={recentAthletes}
                columns={[
                  { key: 'name', label: 'Nombre' },
                  { key: 'category', label: 'Categoría' },
                  { key: 'age', label: 'Edad' }
                ]}
                onRowClick={handleAthleteClick}
                className="mt-4"
              />
            ) : (
              <p className="text-gray-500 py-4 text-center">No hay atletas registrados</p>
            )}
            <div className="mt-4 text-right">
              <button 
                onClick={() => navigate('/athletes')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todos →
              </button>
            </div>
          </Card>
        </section>
        
        {/* Sección de Próximas Competencias */}
        <section>
          <Card title="Próximas Competencias" className="h-full">
            {upcomingCompetitions.length > 0 ? (
              <Table
                data={upcomingCompetitions}
                columns={[
                  { key: 'name', label: 'Nombre' },
                  { key: 'date', label: 'Fecha' },
                  { key: 'location', label: 'Ubicación' }
                ]}
                onRowClick={handleCompetitionClick}
                className="mt-4"
              />
            ) : (
              <p className="text-gray-500 py-4 text-center">No hay competencias próximas</p>
            )}
            <div className="mt-4 text-right">
              <button 
                onClick={() => navigate('/competitions')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todas →
              </button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;