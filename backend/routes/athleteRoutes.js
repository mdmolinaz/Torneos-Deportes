const express = require('express');
const athleteController = require('../controllers/athleteController');

const router = express.Router();

router.get('/', athleteController.getAllAthletes);
router.post('/', athleteController.createAthlete);
router.put('/:id', athleteController.updateAthlete);
router.delete('/:id', athleteController.deleteAthlete);

module.exports = router;