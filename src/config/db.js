const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('./env'); // Carrega as variáveis de ambiente

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log para debug
console.log('DATABASE_URL carregada:', process.env.DATABASE_URL ? 'SIM' : 'NÃO');

module.exports = { pool };