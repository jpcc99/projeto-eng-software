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
}

module.exports = {
  UserController: UserController
}
