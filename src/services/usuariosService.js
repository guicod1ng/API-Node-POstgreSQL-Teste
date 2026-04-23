const { pool } = require('../config/db');

// Buscar usuário por email
const buscarPorEmail = async (email) => {
  const resultado = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return resultado.rows[0] || null;
};

// Criar novo usuário com senha já hasheada
const criar = async (email, senhaHash) => {
  const resultado = await pool.query(
    'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email',
    [email, senhaHash]
  );
  return resultado.rows[0];
};

module.exports = { buscarPorEmail, criar };