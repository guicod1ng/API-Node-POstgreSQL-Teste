const express = require('express');
const clientesRoutes = require('./src/routes/clientesRoutes');
const agendamentosRoutes = require('./src/routes/agendamentosRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const Limiter = require('./src/middlewares/rateLimiter');

const app = express();
app.use(cors());

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

app.use(Limiter); // Aplicar o rate limiter a todas as rotas

// Rota de teste (ping)
app.get('/ping', (req, res) => {
  res.json({ status: 'online', mensagem: 'API funcionando' });
});

// Rotas da API
app.use('/auth', authRoutes);
app.use('/clientes', clientesRoutes);
app.use('/agendamentos', agendamentosRoutes);


// Iniciar servidor
const { PORTA } = require('./src/config/env');
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});