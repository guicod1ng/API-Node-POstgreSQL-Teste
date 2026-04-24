const { pool } = require('../config/db');

const listar = async (usuario_id) => {
  const resultado = await pool.query(
    `SELECT a.*, c.nome AS cliente_nome
     FROM agendamentos a
     JOIN clientes c ON a.cliente_id = c.id
     WHERE c.usuario_id = $1
     ORDER BY a.data, a.hora`,
    [usuario_id]
  );
  return resultado.rows;
};

const criar = async (cliente_id, data, hora, servico, usuario_id) => {
  const resultado = await pool.query(
    `INSERT INTO agendamentos (cliente_id, data, hora, servico)
     SELECT $1, $2, $3, $4
     FROM clientes
     WHERE id = $1 AND usuario_id = $5
     RETURNING *`,
    [cliente_id, data, hora, servico, usuario_id]
  );
  return resultado.rows[0] || null;
};

const excluir = async (id, usuario_id) => {
  const resultado = await pool.query(
    `DELETE FROM agendamentos a
     USING clientes c
     WHERE a.cliente_id = c.id
       AND a.id = $1
       AND c.usuario_id = $2
     RETURNING a.*`,
    [id, usuario_id]
  );
  return resultado.rows[0] || null;
};

module.exports = { listar, criar, excluir };