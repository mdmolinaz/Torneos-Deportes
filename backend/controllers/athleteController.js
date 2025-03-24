const pool = require('../config/db');

const athleteController = {
  getAllAthletes: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM athletes');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener atletas' });
    }
  },

  createAthlete: async (req, res) => {
    const { name, age, gender, category_id } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO athletes (name, age, gender, category_id) VALUES (?, ?, ?, ?)',
        [name, age, gender, category_id]
      );
      res.status(201).json({ message: 'Atleta creado', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear atleta' });
    }
  },

  updateAthlete: async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, category_id } = req.body;
    try {
      await pool.query(
        'UPDATE athletes SET name = ?, age = ?, gender = ?, category_id = ? WHERE id = ?',
        [name, age, gender, category_id, id]
      );
      res.json({ message: 'Atleta actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar atleta' });
    }
  },

  deleteAthlete: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM athletes WHERE id = ?', [id]);
      res.json({ message: 'Atleta eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar atleta' });
    }
  },
};

module.exports = athleteController;