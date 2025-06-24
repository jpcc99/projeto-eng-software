const express = require('express');
const cors = require('cors');



const app = express();
require("dotenv").config()
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (_req, res) => {
  res.json({ 'message': 'Hello World' });
});


const AuthController = require('./controllers/authController').AuthController;
app.post("/cadastro", (req, res) => AuthController.cadastrar(req, res));
app.post("/login", (req, res) => AuthController.fazerLogin(req, res));

const UserController = require('./controllers/userController').UserController;
app.get("/usuarios", (req, res) => UserController.getAllUsers(req, res));
app.post("/usuario", (req, res) => UserController.getUserByRegister(req, res));

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
})
