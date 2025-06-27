const db = require('../config/db');
const bcrypt = require('bcrypt');
const ApiResponse = require('../utils/apiResponse');
const EnumTiposUsuario = require('../utils/tipoUsuario.js');


class Usuario {
  static async criar(matricula, nome, email, senha, tipoUsuario = EnumTiposUsuario.ALUNO, idSetor = "1") {
    try {
      const senha_hash = await bcrypt.hash(senha, 10);
      const querry = `INSERT INTO usuario (matricula, nome_usuario, email, senha_hash, tipo_usuario, id_setor) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [matricula, nome, email, senha_hash, tipoUsuario, idSetor];
      const result = await db.querry(querry, values);
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async buscaPorMatricula(matricula) {
    try {
      const querry = "SELECT * FROM usuario WHERE matricula = $1";
      const result = await db.querry(querry, [matricula]);
      if (result.rows.length === 0) {
        return ApiResponse.error("Usuário não encontrado", 404);
      }

      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async verificaCredenciais(email, senha) {
    try {
      const querry = `SELECT * FROM usuario WHERE email = $1`;
      const result = await db.querry(querry, [email]);
      if (result.rows.length === 0) {
        return ApiResponse.error("Credenciais Inválidas", 401);
      }
      const usuario = result.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaValida) {
        return ApiResponse.error("Credenciais Inválidas", 401);
      }

      return ApiResponse.success(usuario);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async listarPorSetor(idSetor) {
    try {
      const querry = `SELECT * FROM usuario WHERE id_setor = $1`;
      const result = await db.querry(querry, [idSetor]);

      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
}

module.exports = Usuario;
