const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
// Se estiver em produção use a opção abaixo
//app.use(morgan('combined'));
app.use(express.json());

app.get('/', (_, res) => res.status(200).json({ message: "Hello World" }));

module.exports = app;
