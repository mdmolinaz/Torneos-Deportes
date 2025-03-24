const pool = require('./config/db');

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('Conexión exitosa. Resultado:', rows[0].solution);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();