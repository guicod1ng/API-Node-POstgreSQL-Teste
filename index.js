const express = require('express');
const { pool } = require('./db'); // Importa a conexão do passo anterior

const app = express();

// Habilita o Express a entender JSON (corpo da requisição)
app.use(express.json());

// --- ROTA 1: TESTE DE VIDA (PING) ---
// Objetivo: Ver se o Node conecta no Banco.
app.get('/ping', async (req, res) => {
  try {
    // Tenta buscar a hora atual no servidor do Postgres
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
// Objetivo: Receber um Nome e Email e salvar no banco.
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;

    // Validação básica (não confie no usuário)
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e Email são obrigatórios' });
    }

    // SQL Seguro: $1 e $2 são placeholders. Isso EVITA HACKERS.
    const queryTexto = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const valores = [nome, email];
    
    const resultado = await pool.query(queryTexto, valores);
    
    // Sucesso: 201 significa "Criado com sucesso"
    res.status(201).json({ 
      mensagem: 'Usuário salvo com sucesso!', 
      usuario: resultado.rows[0] 
    });

  } catch (erro) {
    // Se o email for duplicado, o banco reclama.
    if (erro.code === '23505') {
      return res.status(400).json({ erro: 'Este email já está cadastrado.' });
    }
    console.error('Erro no POST:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

// Inicia o Servidor
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
  console.log(`👉 Acesse: http://localhost:${PORTA}/ping`);
});