const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');



const app = express();
const port = process.env.PORT || 3001;

// Imports de controllers
const authController = require('./controllers/authController.js');
const usuarioController = require('./controllers/usuarioController.js');
const materialController = require('./controllers/materialController.js');


// Middlewares
app.use(cors())
app.use(bodyParser.json())


// Rotas 

// Rotas de autenticação
app.post('/registrar', authController.registrar);
app.post('/login', authController.login);

// Rotas de usuário
app.get('/usuario/:matricula', usuarioController.obterUsuario);

// Rotas de materiais
app.get('/materiais', materialController.listarMateriais);
app.get('/materiais/:id', materialController.obterMaterial);


app.post('/material/registrar', materialController.registrarMaterial);
app.post('/material/alterar', materialController.alterarMaterial);

// Teste de conexão com o banco
app.get('/teste-db', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT NOW()');
    res.json({ message: 'Conexão com o banco OK', time: rows[0].now });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao conectar ao banco' });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
