const pool = require('../config/db');

const competitionController = {
  getAllCompetitions: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM competitions');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener competencias' });
    }
  },

  createCompetition: async (req, res) => {
    const { name, date, location } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO competitions (name, date, location) VALUES (?, ?, ?)',
        [name, date, location]
      );
      res.status(201).json({ message: 'Competencia creada', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear competencia' });
    }
  },

  updateCompetition: async (req, res) => {
    const { id } = req.params;
    const { name, date, location } = req.body;
    try {
      await pool.query(
        'UPDATE competitions SET name = ?, date = ?, location = ? WHERE id = ?',
        [name, date, location, id]
      );
      res.json({ message: 'Competencia actualizada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar competencia' });
    }
  },

  deleteCompetition: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM competitions WHERE id = ?', [id]);
      res.json({ message: 'Competencia eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar competencia' });
    }
  },
};

module.exports = competitionController;