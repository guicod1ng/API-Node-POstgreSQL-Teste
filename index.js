const express = require('express');
const clientesRoutes = require('./src/routes/clientesRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Rota de teste (ping)
app.get('/ping', (req, res) => {
  res.json({ status: 'online', mensagem: 'API funcionando' });
});

// Rotas da API
app.use('/auth', authRoutes);
app.use('/clientes', clientesRoutes);

// Iniciar servidor
const { PORTA } = require('./src/config/env');
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});