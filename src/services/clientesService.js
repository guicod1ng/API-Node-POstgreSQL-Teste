const {pool} = require('../config/db');

// Listar todos os clientes
const listar = async () => {
  const resultado = await pool.query('SELECT * FROM clientes ORDER BY id');
  return resultado.rows;
};

// Criar um cliente
const criar = async (nome, telefone) => {
  const resultado = await pool.query(
    'INSERT INTO clientes (nome, telefone) VALUES ($1, $2) RETURNING *',
    [nome, telefone]
  );
  return resultado.rows[0];
};

// Atualizar um cliente
const atualizar = async (id, nome, telefone) => {
  const resultado = await pool.query(
    'UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *',
    [nome, telefone, id]
  );
  return resultado.rows[0] || null;
};

// Deletar um cliente
const deletar = async (id) => {
  const resultado = await pool.query(
    'DELETE FROM clientes WHERE id = $1 RETURNING *',
    [id]
  );
  return resultado.rows[0] || null;
};

// Exportar TUDO
module.exports = {
  listar,
  criar,
  atualizar,
  deletar
};