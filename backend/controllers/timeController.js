const pool = require('../config/db');

const timeController = {
  getAllTimes: async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          t.*, 
          a.name as athlete_name, 
          a.age as athlete_age,
          a.gender as athlete_gender,
          c.name as competition_name,
          c.date as competition_date,
          c.location as competition_location
        FROM times t
        JOIN athletes a ON t.athlete_id = a.id
        JOIN competitions c ON t.competition_id = c.id
        ORDER BY t.created_at DESC
      `);
      res.json(rows);
    } catch (error) {
      console.error('Error en getAllTimes:', error);
      res.status(500).json({ 
        error: 'Error al obtener tiempos',
        details: error.message 
      });
    }
  },

  createTime: async (req, res) => {
    const { athlete_id, competition_id, time_recorded } = req.body;
    
    try {
      if (!athlete_id || !competition_id) {
        return res.status(400).json({ error: 'ID de atleta y competencia son requeridos' });
      }

      const [[athlete], [competition]] = await Promise.all([
        pool.query('SELECT id FROM athletes WHERE id = ?', [athlete_id]),
        pool.query('SELECT id FROM competitions WHERE id = ?', [competition_id])
      ]);

      if (!athlete || !competition) {
        return res.status(404).json({ 
          error: 'Atleta o competencia no encontrados',
          athleteExists: !!athlete,
          competitionExists: !!competition
        });
      }

      const [result] = await pool.query(
        'INSERT INTO times (athlete_id, competition_id, time_recorded) VALUES (?, ?, ?)',
        [athlete_id, competition_id, time_recorded || null]
      );

      res.status(201).json({ 
        message: 'Tiempo registrado exitosamente',
        data: {
          id: result.insertId,
          athlete_id,
          competition_id
        }
      });
    } catch (error) {
      console.error('Error en createTime:', error);
      res.status(500).json({ 
        error: 'Error al registrar tiempo',
        details: error.message,
        sqlError: error.code 
      });
    }
  },

  updateTime: async (req, res) => {
    const { id } = req.params;
    const { athlete_id, competition_id, time_recorded } = req.body;

    try {
      const [existing] = await pool.query('SELECT id FROM times WHERE id = ?', [id]);
      if (!existing.length) {
        return res.status(404).json({ error: 'Registro de tiempo no encontrado' });
      }

      await pool.query(
        'UPDATE times SET athlete_id = ?, competition_id = ?, time_recorded = ? WHERE id = ?',
        [athlete_id, competition_id, time_recorded, id]
      );

      res.json({ 
        message: 'Tiempo actualizado exitosamente',
        data: { id, athlete_id, competition_id }
      });
    } catch (error) {
      console.error('Error en updateTime:', error);
      res.status(500).json({ 
        error: 'Error al actualizar tiempo',
        details: error.message 
      });
    }
  },

  deleteTime: async (req, res) => {
    const { id } = req.params;
    
    try {
      const [result] = await pool.query('DELETE FROM times WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }

      res.json({ 
        message: 'Tiempo eliminado exitosamente',
        deletedId: id 
      });
    } catch (error) {
      console.error('Error en deleteTime:', error);
      res.status(500).json({ 
        error: 'Error al eliminar tiempo',
        details: error.message 
      });
    }
  },

  getWinnersByCompetition: async (req, res) => {
    const { competition_id } = req.params;
    
    try {
      const [rows] = await pool.query(`
        SELECT 
          a.id as athlete_id,
          a.name as athlete_name,
          MIN(t.time_recorded) as best_time,
          TIMEDIFF(MIN(t.time_recorded), MIN(t2.time_recorded)) as time_difference
        FROM times t
        JOIN athletes a ON t.athlete_id = a.id
        JOIN times t2 ON t.competition_id = t2.competition_id
        WHERE t.competition_id = ?
        GROUP BY a.id
        ORDER BY best_time ASC
        LIMIT 3
      `, [competition_id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No hay resultados para esta competencia' });
      }

      res.json(rows);
    } catch (error) {
      console.error('Error en getWinnersByCompetition:', error);
      res.status(500).json({ 
        error: 'Error al calcular ganadores',
        details: error.message 
      });
    }
  },

  assignAthleteToCompetition: async (req, res) => {
    const { athlete_id, competition_id } = req.body;
    
    try {
      const [athleteResults, competitionResults, existingResults] = await Promise.all([
        pool.query('SELECT id, name FROM athletes WHERE id = ?', [athlete_id]),
        pool.query('SELECT id, name FROM competitions WHERE id = ?', [competition_id]),
        pool.query(
          'SELECT id FROM times WHERE athlete_id = ? AND competition_id = ?', 
          [athlete_id, competition_id]
        )
      ]);

      const athlete = athleteResults[0][0];
      const competition = competitionResults[0][0];
      const existing = existingResults[0];

      if (!athlete || !competition) {
        return res.status(404).json({ 
          error: 'Recurso no encontrado',
          details: {
            athleteExists: !!athlete,
            competitionExists: !!competition
          }
        });
      }

      if (existing.length > 0) {
        return res.status(409).json({ 
          error: 'El atleta ya está registrado en esta competencia',
          existingAssignment: existing[0]
        });
      }

      const [result] = await pool.query(
        'INSERT INTO times (athlete_id, competition_id) VALUES (?, ?)',
        [athlete_id, competition_id]
      );

      res.status(201).json({
        message: 'Asignación exitosa',
        data: {
          assignmentId: result.insertId,
          athlete: {
            id: athlete_id,
            name: athlete.name
          },
          competition: {
            id: competition_id,
            name: competition.name
          }
        }
      });
    } catch (error) {
      console.error('Error detallado en assignAthleteToCompetition:', {
        message: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
        stack: error.stack
      });
      
      res.status(500).json({ 
        error: 'Error en el servidor',
        details: {
          message: error.message,
          code: error.code
        }
      });
    }
  },

  recordTime: async (req, res) => {
    const { id } = req.params;
    const { time_recorded } = req.body;

    if (!time_recorded) {
      return res.status(400).json({ 
        error: 'El tiempo es requerido',
        expectedFormat: 'HH:MM:SS (ej. 00:15:30)' 
      });
    }

    try {
      const [[record]] = await pool.query(
        `SELECT t.*, a.name as athlete_name, c.name as competition_name 
         FROM times t
         JOIN athletes a ON t.athlete_id = a.id
         JOIN competitions c ON t.competition_id = c.id
         WHERE t.id = ?`, 
        [id]
      );

      if (!record) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }

      await pool.query(
        'UPDATE times SET time_recorded = ? WHERE id = ?',
        [time_recorded, id]
      );

      res.json({ 
        message: 'Tiempo actualizado exitosamente',
        data: {
          id,
          athlete_id: record.athlete_id,
          athlete_name: record.athlete_name,
          competition_id: record.competition_id,
          competition_name: record.competition_name,
          time_recorded
        }
      });
    } catch (error) {
      console.error('Error detallado en recordTime:', error);
      res.status(500).json({ 
        error: 'Error al registrar tiempo',
        details: {
          message: error.message,
          invalidInput: time_recorded
        }
      });
    }
  },

  getAssignmentsByCompetition: async (req, res) => {
    const { competition_id } = req.params;
    
    try {
      const [rows] = await pool.query(`
        SELECT 
          t.id,
          a.id as athlete_id,
          a.name as athlete_name,
          a.age,
          a.gender,
          c.name as category_name,
          t.time_recorded
        FROM times t
        JOIN athletes a ON t.athlete_id = a.id
        LEFT JOIN categories c ON a.category_id = c.id
        WHERE t.competition_id = ?
        ORDER BY a.name ASC
      `, [competition_id]);

      res.json(rows);
    } catch (error) {
      console.error('Error en getAssignmentsByCompetition:', error);
      res.status(500).json({ 
        error: 'Error al obtener asignaciones',
        details: error.message 
      });
    }
  }
};

module.exports = timeController;