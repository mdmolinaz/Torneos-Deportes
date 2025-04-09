const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

// Rutas protegidas
router.get('/', competitionController.getAllCompetitions);
router.post('/', competitionController.createCompetition);
router.put('/:id', competitionController.updateCompetition);
router.delete('/:id', competitionController.deleteCompetition);

module.exports = router;