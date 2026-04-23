const { pool } = require('../config/db');

const listar = async (usuario_id) => {
  const resultado = await pool.query(
    'SELECT * FROM clientes WHERE usuario_id = $1 ORDER BY id',
    [usuario_id]
  );
  return resultado.rows;
};

const criar = async (nome, telefone, usuario_id) => {
  const resultado = await pool.query(
    'INSERT INTO clientes (nome, telefone, usuario_id) VALUES ($1, $2, $3) RETURNING *',
    [nome, telefone, usuario_id]
  );
  return resultado.rows[0];
};

const atualizar = async (id, nome, telefone, usuario_id) => {
  const resultado = await pool.query(
    'UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3 AND usuario_id = $4 RETURNING *',
    [nome, telefone, id, usuario_id]
  );
  return resultado.rows[0] || null;
};

const deletar = async (id, usuario_id) => {
  const resultado = await pool.query(
    'DELETE FROM clientes WHERE id = $1 AND usuario_id = $2 RETURNING *',
    [id, usuario_id]
  );
  return resultado.rows[0] || null;
};

module.exports = { listar, criar, atualizar, deletar };