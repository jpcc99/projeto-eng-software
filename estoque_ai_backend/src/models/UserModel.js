const db = require('../db');

class UserModel {
  static async getAllUsers() {
    try {
      const result = await db.query("SELECT * FROM usuario");
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getUserByRegisterNumber(register, requesting_user) {
    try {
      const result = await db.query("SELECT tipo FROM usuario WHERE matricula = $1", [requesting_user]);
      const req_user_tipo = result.rows[0];
      console.log(req_user_tipo);
      switch (req_user_tipo) {
        case "coodernador de setores":
        case "coodernador de estoque":
          const user = await db.query("SELECT * FROM usuario WHERE matricula = $1", register);
          return user.rows[0];
        default:
          throw `Usuário ${requesting_user} não possui permissão para acessar usuário`;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserModel;
