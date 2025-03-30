import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import Card from '../components/Card';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData.email, formData.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <Card title="Iniciar sesión">
          {error && (
            <div className="alert alert-error mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-2"
                />
                <label htmlFor="remember">Recordarme</label>
              </div>
              
              <Link to="/forgot-password" className="text-sm text-primary">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-primary font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;