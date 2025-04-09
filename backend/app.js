const express = require('express');
const cors = require('cors');
const athleteRoutes = require('./routes/athleteRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const timeRoutes = require('./routes/timeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(express.json());


// Rutas públicas
app.use('/api/athletes', athleteRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/times', timeRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;