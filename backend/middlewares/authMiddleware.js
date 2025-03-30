const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el token del header 'Authorization'
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificar el token usando tu clave secreta (debe coincidir con la usada en login)
    const decoded = jwt.verify(token, '1234567890'); // Reemplaza con una clave segura
    req.user = decoded; // Guardar los datos del usuario en la request
    next(); // Continuar con la siguiente función (controller)
  } catch (error) {
    res.status(400).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;