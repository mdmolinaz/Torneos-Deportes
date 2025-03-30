import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: "Gestión de Atletas",
      description: "Registra y administra la información de todos los participantes.",
      link: "/athletes",
      icon: "🏊‍♂️"
    },
    {
      title: "Organización de Competencias",
      description: "Crea y gestiona eventos deportivos con facilidad.",
      link: "/competitions",
      icon: "🏆"
    },
    {
      title: "Registro de Tiempos",
      description: "Captura tiempos en tiempo real durante las competencias.",
      link: "/times",
      icon: "⏱️"
    },
    {
      title: "Resultados en Vivo",
      description: "Visualiza y comparte resultados al instante.",
      link: "/results",
      icon: "📊"
    },
    {
      title: "Categorías y Clasificaciones",
      description: "Organiza atletas por categorías y genera clasificaciones.",
      link: "/categories",
      icon: "📋"
    },
    {
      title: "Reportes y Estadísticas",
      description: "Genera reportes detallados y análisis estadísticos.",
      link: "/reports",
      icon: "📈"
    }
  ];

  return (
    <main className="main">
      <div className="container">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Plataforma de Gestión Deportiva</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema integral para la administración de torneos de natación, aguas abiertas, acuatlón, triatlón y atletismo.
          </p>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link 
                to={feature.link} 
                key={index}
                className="card hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary-light p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="mb-6">Regístrate ahora y lleva la gestión de tus competencias al siguiente nivel.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary">Crear cuenta</Link>
            <Link to="/demo" className="btn btn-outline">Ver demostración</Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;