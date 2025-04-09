const pool = require('../config/db');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM categories');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  },

  createCategory: async (req, res) => {
    const { name, description, min_age, max_age, gender } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO categories (name, description, min_age, max_age, gender) VALUES (?, ?, ?, ?, ?)',
        [name, description, min_age, max_age, gender]
      );
      res.status(201).json({ message: 'Categoría creada', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear categoría' });
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { name, description, min_age, max_age, gender } = req.body;
    try {
      await pool.query(
        'UPDATE categories SET name = ?, description = ?, min_age = ?, max_age = ?, gender = ? WHERE id = ?',
        [name, description, min_age, max_age, gender, id]
      );
      res.json({ message: 'Categoría actualizada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar categoría' });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM categories WHERE id = ?', [id]);
      res.json({ message: 'Categoría eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar categoría' });
    }
  }
};

module.exports = categoryController;