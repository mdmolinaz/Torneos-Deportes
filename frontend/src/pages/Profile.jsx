import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';
import { timeService } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState({ name: 'Usuario', email: 'user@example.com' });
  const [times, setTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 1. Obtener datos del usuario desde localStorage (o API real)
        const storedUser = localStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : { name: 'Usuario', email: 'user@example.com' };
        
        // 2. Obtener tiempos desde el backend
        const timesData = await timeService.getAll();
        
        // 3. Actualizar estados
        setUser(userData);
        setTimes(timesData.filter(time => time.athlete_id === userData.id)); // Filtra por el ID del usuario logueado
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching profile:', err);
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h1>Perfil de Usuario</h1>
      <div>
        <h2>Información Personal</h2>
        <p>Nombre: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <h2>Tiempos Registrados</h2>
        <Table data={times} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;