import React from 'react';

const Reports = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reporte de Competencias</h2>
          {/* Aquí iría el gráfico o tabla de reportes */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ganadores por Categoría</h2>
          {/* Aquí iría el gráfico o tabla de ganadores */}
        </div>
      </div>
    </div>
  );
};

export default Reports;