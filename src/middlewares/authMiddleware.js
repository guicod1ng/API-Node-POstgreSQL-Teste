const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Formato: "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // Injeta dados do usuário na requisição
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;