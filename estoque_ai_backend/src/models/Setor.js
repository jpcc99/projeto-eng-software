const db = require('../config/db');
const ApiResponse = require('../utils/apiResponse');
const Usuário = require('../models/Usuario');
const EnumTiposUsuario = require('../utils/tipoUsuario');

class Setor {
  static async criar(nome, sigla) {
    try {
      const querry = "INSERT INTO (nome_setor, sigla_setor) VALUES ($1, $2)";
      const values = [nome, sigla];
      const result = await db.querry(querry, values);
      return ApiResponse.success(result.rows[0], "Setor criado com sucesso");
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async listar() {
    const querry = "SELECT * FROM setor WHERE id_setor <> 1";
    try {
      const result = await db.querry(querry, []);
      const setores = result.rows.map((setor) => {
        return {
          nome: setor.nome,
          sigla: setor.sigla
        };
      });
      return ApiResponse.success(setores);
    } catch (err) {
      return ApiResponse.error("Não foi possível consultar setores");
    }
  }

  static async buscarCoordenadorDeSetorPor(nomeOuSigla = { nome: "", sigla: "" }) {
    let querry;
    let { nome, sigla } = nomeOuSigla;
    if (!nome && !sigla) {
      return ApiResponse.error("Nome e sigla inválidas", 401);
    }
    if (!nome) nome = " ";
    if (!sigla) sigla = " ";

    querry = `SELECT * FROM usuario
      WHERE tipo_usuario = $1 AND
      id_setor = (SELECT id_setor FROM setor
      WHERE nome_setor = $2 OR sigla_setor = $3)`;
    const values = [EnumTiposUsuario.COORDENADOR, nome, sigla];
    try {
      const result = await db.querry(querry, values);
      if (result.rows.length === 0) {
        return ApiResponse.error("Não foi possível buscar o nome do responsável pelo Setor", 404);
      }
      const coordenador = result.rows[0];
      return ApiResponse.success({
        nomeCoordenador: coordenador.nome,
        emailCoordenador: coordenador.email,
      });
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async buscarPorSigla(sigla = "") {
    const querry = "SELECT * FROM setor WHERE sigla_setor = $1";
    if (!sigla) {
      return ApiResponse.error("Sigla inválida", 401);
    }
    try {
      const result = await db.querry(querry, [sigla]);
      if (result.rows.length === 0) {
        return ApiResponse.error("Setor não encontrado");
      }
      const setor = result.rows[0];
      return ApiResponse.success({
        nome: setor.nome,
        sigla: setor.sigla,
      });
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
}

module.exports = Setor;
