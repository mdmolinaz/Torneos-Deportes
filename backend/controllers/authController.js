const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userId = await User.create({ name, email, password });
      res.status(201).json({ message: 'Usuario registrado', userId });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },
};

module.exports = authController;