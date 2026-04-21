const express = require('express');
const { pool } = require('./db');

const app = express();

app.use(express.json());

// --- ROTA 1: TESTE DE VIDA (PING) ---
app.get('/ping', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW() as hora_servidor');
    res.json({ 
      status: 'online', 
      banco_conectado: true,
      hora: resultado.rows[0].hora_servidor 
    });
  } catch (erro) {
    console.error('Falha na conexão com o banco:', erro);
    res.status(500).json({ erro: 'Banco de dados offline ou senha errada' });
  }
});

// --- ROTA 2: CRIAR USUÁRIO (POST) ---
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e Email são obrigatórios' });
    }

    const queryTexto = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const valores = [nome, email];
    
    const resultado = await pool.query(queryTexto, valores);
    
    res.status(201).json({ 
      mensagem: 'Usuário salvo com sucesso!', 
      usuario: resultado.rows[0] 
    });

  } catch (erro) {
    if (erro.code === '23505') {
      return res.status(400).json({ erro: 'Este email já está cadastrado.' });
    }
    console.error('Erro no POST:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

// --- ROTA 3: ATUALIZAR CLIENTE (PUT) ---
app.put('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Nome e telefone obrigatórios' });
    }

    const queryTexto = 'UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3';
    const resultado = await pool.query(queryTexto, [nome, telefone, id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (erro) {
    console.log('ERRO DETALHADO:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar cliente', detalhe: erro.message });
  }
});

// --- ROTA 4: DELETAR CLIENTE (DELETE) ---
app.delete('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('TENTANDO DELETAR ID:', id);

    const resultado = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente excluído com sucesso!' });
  } catch (erro) {
    console.log('ERRO NO DELETE:', erro.message);
    console.log('ERRO COMPLETO:', erro);
    res.status(500).json({ erro: 'Erro ao deletar cliente' });
  }
});

// --- INICIAR O SERVIDOR ---
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
  console.log(`👉 Acesse: http://localhost:${PORTA}/ping`);
});