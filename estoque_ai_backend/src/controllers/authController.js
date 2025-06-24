const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
require('dotenv').config();

class AuthController {
  static async fazerLogin(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: "Login não efetuado" });
      }
      console.log(user);

      const pwdMatch = await bcrypt.compare(senha, user.senha);
      if (!pwdMatch) {
        throw Error("Senhas não batem")
      }
      const token = jwt.sign({ userId: user.matricula }, process.env.JWT_SECRET_PWD, {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Login falhou" });
    }
  }

  static async cadastrar(req, res) {
    try {
      const {
        nome,
        matricula,
        email,
        senha,
      } = req.body;

      const user = await UserModel.getUserByEmail(email);

      if (user) {
        throw Error("Email já cadastrado");
      }
      const hashedPwd = await bcrypt.hash(String(senha), 10);
      // TODO
      //const hashedCpf = await bcrypt.hash(String(cpf), 10);

      const new_user = new UserModel();
      new_user.nome = nome;
      new_user.matricula = matricula;
      new_user.email = email;
      new_user.senha = hashedPwd;

      await new_user.create();
      res.status(200).json({ message: "Cadastro efetuado" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Cadastro falhou" });
    }
  }

  static async verifyToken(req, res) {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ error: "Acesso negado" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_PWD);
      return decoded.userId; // matricula
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Token inválido" });
    }
  }
}

module.exports = {
  AuthController: AuthController
}
