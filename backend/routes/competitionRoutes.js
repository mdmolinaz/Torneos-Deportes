const express = require('express');
const competitionController = require('../controllers/competitionController');

const router = express.Router();

router.get('/', competitionController.getAllCompetitions);
router.post('/', competitionController.createCompetition);
router.put('/:id', competitionController.updateCompetition);
router.delete('/:id', competitionController.deleteCompetition);

module.exports = router;