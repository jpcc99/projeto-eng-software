const UserModel = require("../models/UserModel");
const AuthController = require("../controllers/authController").AuthController;

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao objter a lista de usuários" });
    }
  }

  static async getUserByRegister(req, res) {
    try {
      const matricula = await AuthController.verifyToken(req, res);
      const user = await UserModel.getUserByRegisterNumber(matricula);
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
}

module.exports = {
  UserController: UserController
}
