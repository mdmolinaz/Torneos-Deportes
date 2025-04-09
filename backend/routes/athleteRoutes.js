const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athleteController');

// Todas las rutas requieren autenticación
router.get('/', athleteController.getAllAthletes);
router.post('/', athleteController.createAthlete);
router.put('/:id', athleteController.updateAthlete);
router.delete('/:id', athleteController.deleteAthlete);

module.exports = router;