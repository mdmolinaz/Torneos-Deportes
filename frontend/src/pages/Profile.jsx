import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';

const Profile = () => {
  const [user, setUser] = useState({});
  const [times, setTimes] = useState([]);

  // Simulación de datos (reemplazar con llamada a la API)
  useEffect(() => {
    const fetchProfile = async () => {
      const userData = { id: 1, name: 'Juan Pérez', email: 'juan@example.com' };
      const timesData = [
        { id: 1, competition: 'Natación 100m', time: '00:58:23' },
        { id: 2, competition: 'Atletismo 5k', time: '00:25:45' },
      ];
      setUser(userData);
      setTimes(timesData);
    };
    fetchProfile();
  }, []);

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