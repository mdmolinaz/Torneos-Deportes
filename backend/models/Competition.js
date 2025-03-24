const pool = require('../config/db');

class Competition {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM competitions');
    return rows;
  }

  static async create({ name, date, location }) {
    const [result] = await pool.query(
      'INSERT INTO competitions (name, date, location) VALUES (?, ?, ?)',
      [name, date, location]
    );
    return result.insertId;
  }

  static async update(id, { name, date, location }) {
    await pool.query(
      'UPDATE competitions SET name = ?, date = ?, location = ? WHERE id = ?',
      [name, date, location, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM competitions WHERE id = ?', [id]);
  }
}

module.exports = Competition;