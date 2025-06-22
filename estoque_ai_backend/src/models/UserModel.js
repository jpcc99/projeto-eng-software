class UserModel {
  static async getAllUsers() {
    try {
      // console.log("SELECT * FROM usuarios");
      const result = ["usuário 1", "usuário 2"];
      return result
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserModel;
