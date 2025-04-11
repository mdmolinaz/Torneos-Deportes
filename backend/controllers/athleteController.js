const pool = require('../config/db');

const athleteController = {
  getAllAthletes: async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          a.*,
          c.name as category_name 
        FROM athletes a
        LEFT JOIN categories c ON a.category_id = c.id
      `);
      res.json(rows);
    } catch (error) {
      console.error('Error en getAllAthletes:', error);
      res.status(500).json({ 
        error: 'Error al obtener atletas',
        details: error.message 
      });
    }
  },

  createAthlete: async (req, res) => {
    const { name, age, gender, category_id } = req.body;

    // Validación de campos requeridos
    if (!name || !age || !gender || !category_id) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios (nombre, edad, género, categoría)' 
      });
    }

    // Validación de tipos de datos
    if (isNaN(age) || isNaN(category_id)) {
      return res.status(400).json({ 
        error: 'Edad y categoría deben ser números válidos' 
      });
    }

    try {
      // Verificar si la categoría existe
      const [categoryCheck] = await pool.query(
        'SELECT id FROM categories WHERE id = ?', 
        [category_id]
      );

      if (categoryCheck.length === 0) {
        return res.status(400).json({ 
          error: 'La categoría especificada no existe' 
        });
      }

      const [result] = await pool.query(
        'INSERT INTO athletes (name, age, gender, category_id) VALUES (?, ?, ?, ?)',
        [name, parseInt(age), gender, parseInt(category_id)]
      );

      // Obtener el atleta recién creado con datos de categoría
      const [newAthlete] = await pool.query(`
        SELECT 
          a.*,
          c.name as category_name 
        FROM athletes a
        LEFT JOIN categories c ON a.category_id = c.id
        WHERE a.id = ?
      `, [result.insertId]);

      res.status(201).json({ 
        message: 'Atleta creado exitosamente',
        data: newAthlete[0] 
      });
    } catch (error) {
      console.error('Error en createAthlete:', error);
      
      // Manejo específico de errores de MySQL
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ 
          error: 'La categoría especificada no existe' 
        });
      }

      res.status(500).json({ 
        error: 'Error al crear atleta',
        details: error.message 
      });
    }
  },

  updateAthlete: async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, category_id } = req.body;

    if (!name || !age || !gender || !category_id) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios' 
      });
    }

    try {
      // Verificar si el atleta existe
      const [athleteCheck] = await pool.query(
        'SELECT id FROM athletes WHERE id = ?', 
        [id]
      );

      if (athleteCheck.length === 0) {
        return res.status(404).json({ 
          error: 'Atleta no encontrado' 
        });
      }

      // Verificar si la categoría existe
      const [categoryCheck] = await pool.query(
        'SELECT id FROM categories WHERE id = ?', 
        [category_id]
      );

      if (categoryCheck.length === 0) {
        return res.status(400).json({ 
          error: 'La categoría especificada no existe' 
        });
      }

      await pool.query(
        'UPDATE athletes SET name = ?, age = ?, gender = ?, category_id = ? WHERE id = ?',
        [name, parseInt(age), gender, parseInt(category_id), id]
      );

      // Obtener el atleta actualizado
      const [updatedAthlete] = await pool.query(`
        SELECT 
          a.*,
          c.name as category_name 
        FROM athletes a
        LEFT JOIN categories c ON a.category_id = c.id
        WHERE a.id = ?
      `, [id]);

      res.json({ 
        message: 'Atleta actualizado exitosamente',
        data: updatedAthlete[0] 
      });
    } catch (error) {
      console.error('Error en updateAthlete:', error);
      res.status(500).json({ 
        error: 'Error al actualizar atleta',
        details: error.message 
      });
    }
  },

  deleteAthlete: async (req, res) => {
    const { id } = req.params;

    try {
      // Verificar si el atleta existe
      const [athleteCheck] = await pool.query(
        'SELECT id FROM athletes WHERE id = ?', 
        [id]
      );

      if (athleteCheck.length === 0) {
        return res.status(404).json({ 
          error: 'Atleta no encontrado' 
        });
      }

      await pool.query('DELETE FROM athletes WHERE id = ?', [id]);
      
      res.json({ 
        message: 'Atleta eliminado exitosamente',
        deletedId: id 
      });
    } catch (error) {
      console.error('Error en deleteAthlete:', error);
      
      // Manejo específico de errores de FK (si hay registros relacionados)
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ 
          error: 'No se puede eliminar el atleta porque tiene registros relacionados (ej: tiempos registrados)' 
        });
      }

      res.status(500).json({ 
        error: 'Error al eliminar atleta',
        details: error.message 
      });
    }
  },

  // Nuevo método para obtener atletas por categoría
  getAthletesByCategory: async (req, res) => {
    const { category_id } = req.params;

    try {
      const [rows] = await pool.query(
        `SELECT 
          a.*,
          c.name as category_name 
         FROM athletes a
         LEFT JOIN categories c ON a.category_id = c.id
         WHERE a.category_id = ?`,
        [category_id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ 
          message: 'No se encontraron atletas en esta categoría' 
        });
      }

      res.json(rows);
    } catch (error) {
      console.error('Error en getAthletesByCategory:', error);
      res.status(500).json({ 
        error: 'Error al obtener atletas por categoría',
        details: error.message 
      });
    }
  }
};

module.exports = athleteController;