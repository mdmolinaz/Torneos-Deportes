const pool = require('../config/db');

class Time {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM times');
    return rows;
  }

  static async create({ athlete_id, competition_id, time_recorded }) {
    const [result] = await pool.query(
      'INSERT INTO times (athlete_id, competition_id, time_recorded) VALUES (?, ?, ?)',
      [athlete_id, competition_id, time_recorded]
    );
    return result.insertId;
  }

  static async update(id, { athlete_id, competition_id, time_recorded }) {
    await pool.query(
      'UPDATE times SET athlete_id = ?, competition_id = ?, time_recorded = ? WHERE id = ?',
      [athlete_id, competition_id, time_recorded, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM times WHERE id = ?', [id]);
  }
}

module.exports = Time;