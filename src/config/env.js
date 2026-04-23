const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORTA: process.env.PORTA || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'uma_frase_secreta_bem_longa_e_aleatoria_123',
};