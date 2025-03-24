import React from 'react';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  const handleSubmit = (data) => {
    console.log('Datos de inicio de sesión:', data);
    // Lógica para enviar datos al backend
  };

  return (
    <div>
      <Navbar />
      <h1>Iniciar Sesión</h1>
      <Form fields={fields} onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
};

export default Login;