const pool = require('../config/db');

const timeController = {
  getAllTimes: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM times');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener tiempos' });
    }
  },

  createTime: async (req, res) => {
    const { athlete_id, competition_id, time_recorded } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO times (athlete_id, competition_id, time_recorded) VALUES (?, ?, ?)',
        [athlete_id, competition_id, time_recorded]
      );
      res.status(201).json({ message: 'Tiempo registrado', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar tiempo' });
    }
  },

  updateTime: async (req, res) => {
    const { id } = req.params;
    const { athlete_id, competition_id, time_recorded } = req.body;
    try {
      await pool.query(
        'UPDATE times SET athlete_id = ?, competition_id = ?, time_recorded = ? WHERE id = ?',
        [athlete_id, competition_id, time_recorded, id]
      );
      res.json({ message: 'Tiempo actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar tiempo' });
    }
  },

  deleteTime: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM times WHERE id = ?', [id]);
      res.json({ message: 'Tiempo eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar tiempo' });
    }
  },
};

module.exports = timeController;