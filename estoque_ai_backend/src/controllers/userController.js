const UserModel = require("../models/UserModel");

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
      const { register_number, requesting_user } = req.body;
      const user = await UserModel.getUserByRegisterNumber(register_number, requesting_user);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
}

module.exports = {
  UserController: UserController
}
