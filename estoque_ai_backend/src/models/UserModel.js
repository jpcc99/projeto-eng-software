const db = require('../db');

class UserModel {
  constructor(
    cpf = "00000000000",
    name = "",
    register = "",
    email = "",
    password = "",
    status = "ativo",
    user_type = "aluno"
  ) {
    this.cpf = cpf;
    this.nome = name;
    this.matricula = register;
    this.email = email;
    this.senha = password;
    this.status = status;
    this.tipo = user_type;
  }

  static async getUserByEmail(email) {
    try {
      const query = "SELECT * FROM usuario WHERE email = $1";
      const result = await db.query(query, [email]);
      const user = result.rows[0];
      if (!user) {
        return undefined;
      }
      const userInfo = {
        name: user.nome,
        register: user.matricula,
        email: user.email,
        senha: user.senha,
      };
      return userInfo;
    } catch (err) {
      throw err;
    }
  }

  async create() {
    try {
      const query = `INSERT INTO usuario (
        cpf,
        nome,
        matricula,
        email,
        senha,
        status,
        tipo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        this.cpf,
        this.nome,
        this.matricula,
        this.email,
        this.senha,
        this.status,
        this.tipo
      ];
      const result = await db.query(query, values);
      if (result.rows[0]) {
        console.log("Novo usuário cadastrado");
        console.log(result.rows[0]);
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers() {
    try {
      const result = await db.query("SELECT * FROM usuario");
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getUserByRegisterNumber(matricula) {
    try {
      const query = "SELECT * FROM usuario WHERE matricula = $1";
      const result = await db.query(query, matricula);
      const userInfo = {
        name: result.fields[0].nome,
        register: result.fields[0].matricula,
      };
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserModel;
