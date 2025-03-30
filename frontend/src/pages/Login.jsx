import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authService } from '../services/api';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  const handleSubmit = async (data) => {
    try {
      const response = await authService.login(data.email, data.password);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form fields={fields} onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
};

export default Login;