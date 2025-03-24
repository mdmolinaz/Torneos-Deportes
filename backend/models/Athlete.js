const pool = require('../config/db');

class Athlete {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM athletes');
    return rows;
  }

  static async create({ name, age, gender, category_id }) {
    const [result] = await pool.query(
      'INSERT INTO athletes (name, age, gender, category_id) VALUES (?, ?, ?, ?)',
      [name, age, gender, category_id]
    );
    return result.insertId;
  }

  static async update(id, { name, age, gender, category_id }) {
    await pool.query(
      'UPDATE athletes SET name = ?, age = ?, gender = ?, category_id = ? WHERE id = ?',
      [name, age, gender, category_id, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM athletes WHERE id = ?', [id]);
  }
}

module.exports = Athlete;