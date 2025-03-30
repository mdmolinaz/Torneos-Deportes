const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const athleteRoutes = require('./routes/athleteRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const timeRoutes = require('./routes/timeRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas (todas requieren autenticación)
app.use('/api/athletes', authMiddleware, athleteRoutes);
app.use('/api/competitions', authMiddleware, competitionRoutes);
app.use('/api/times', authMiddleware, timeRoutes);

// Ruta de prueba para verificar autenticación
app.get('/api/protected-test', authMiddleware, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

module.exports = app;