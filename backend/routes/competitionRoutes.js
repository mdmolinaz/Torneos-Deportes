const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const competitionController = require('../controllers/competitionController');

// Rutas protegidas
router.get('/', authMiddleware, competitionController.getAllCompetitions);
router.post('/', authMiddleware, competitionController.createCompetition);
router.put('/:id', authMiddleware, competitionController.updateCompetition);
router.delete('/:id', authMiddleware, competitionController.deleteCompetition);

module.exports = router;