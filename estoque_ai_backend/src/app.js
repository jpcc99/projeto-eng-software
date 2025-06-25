const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Importa as rotas
const routes = require('./routes/');

const app = express();

// Middlewares 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
// Se estiver em produção use a opção abaixo
//app.use(morgan('combined'));
app.use(express.json());

// Conecta ao banco 
require('./config/db');

// Configura as rotas
app.use('/api', routes);

app.get('/', (_, res) => res.status(200).json({ message: "Hello World" }));

module.exports = app;
