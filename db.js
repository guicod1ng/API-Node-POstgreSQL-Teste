const { Pool } = require('pg');
require('dotenv').config();

// Agora a senha NÃO está mais visível no código.
// Ela vem do arquivo .env (que você vai colocar no .gitignore depois)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = { pool };