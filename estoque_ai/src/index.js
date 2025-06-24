const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = 3000;

const app = express();
app.use(cors());

// Arquivos estáticos
app.use("/js", express.static(path.join(__dirname, '/public/js')));

// Rotas
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, "/views/auth/login.html"));
});
app.get('/cadastro', (_req, res) => {
  res.sendFile(path.join(__dirname, "/views/auth/cadastro.html"));
});
app.get('/user', (_req, res) => {
  res.sendFile(path.join(__dirname, "/views/user/home.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
