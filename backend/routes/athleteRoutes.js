const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const athleteController = require('../controllers/athleteController');

// Todas las rutas requieren autenticación
router.get('/', authMiddleware, athleteController.getAllAthletes);
router.post('/', authMiddleware, athleteController.createAthlete);
router.put('/:id', authMiddleware, athleteController.updateAthlete);
router.delete('/:id', authMiddleware, athleteController.deleteAthlete);

module.exports = router;