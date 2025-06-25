const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'estoque_ai',
  password: process.env.DB_PASSWORD || '123456',
  port: process.env.DB_PORT || 5432,
});

// Test connection 
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error("Erro ao conectar ao PostgreSQL: ", err);
  } else {
    console.log('Conecetado ao PostgreSQL com sucesso');
  }
});

module.exports = {
  querry: (text, params) => pool.query(text, params),
};
