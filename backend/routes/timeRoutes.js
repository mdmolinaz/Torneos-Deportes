const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const timeController = require('../controllers/timeController');

// Rutas protegidas
router.get('/', authMiddleware, timeController.getAllTimes);
router.post('/', authMiddleware, timeController.createTime);
router.put('/:id', authMiddleware, timeController.updateTime);
router.delete('/:id', authMiddleware, timeController.deleteTime);

module.exports = router;