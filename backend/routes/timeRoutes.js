const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

router.get('/', timeController.getAllTimes);
router.post('/', timeController.createTime);
router.put('/:id', timeController.updateTime);
router.delete('/:id', timeController.deleteTime);
router.get('/winners/:competition_id', timeController.getWinnersByCompetition);
router.post('/assign', timeController.assignAthleteToCompetition);
router.put('/:id/record-time', timeController.recordTime);

module.exports = router;