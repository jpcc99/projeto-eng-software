const db = require('../config/db');
const ApiResponse = require('../utils/apiResponse');
const ItemPlanejamento = require('../models/ItemPlanejamento');
const ItemSolicitacao = require('../models/ItemSolicitacao');
const Setor = require('../models/Setor');


class Planejamento {
  static async criar(mesAno, idSetor = 0, matriculaCriador = "", items = []) {
    const querry = `INSERT INTO Planejamento_Mensal
      (mes_ano_planejamento, id_setor, matricula_criador)
      VALUES ($1, $2, $3)
      RETURNING id_planejamento`;
    const values = [mesAno, idSetor, matriculaCriador];
    try {
      await db.querry("BEGIN");

      let result = db.querry(querry, values);
      const idPlanejamento = (await result).rows[0].id_planejamento;

      if (!idPlanejamento) {
        throw Error("Não foi possível criar o Planejamento");
      }

      //TODO
      // Insere ItensPlanejamento
      for (const item of items) {
        const { idMaterial, quantidadePlanejada } = item;
        result = await ItemPlanejamento.criar(idMaterial, quantidadePlanejada);
        if (!result.success) {
          throw Error(result.message);
        }
      }

      await db.querry("COMMIT");
      return ApiResponse.success({ idPlanejamento, items });
    } catch (err) {
      console.error(err.message);
      await db.querry("ROLLBACK");
      return ApiResponse.error(err.message);
    }
  }

  static async buscarPorId(id) {
    if (!id) {
      return ApiResponse.error("Id inválida", 500);
    }
    const querry = `SELECT p.*, s.nome_setor, u.nome_usuario as criador_nome
      FROM planejamento_mensal p
      JOIN setor s ON p.id_setor = s.id_setor
      JOIN usuario u ON p.matricula_criador = u.matricula 
      WHERE p.id_planejamento = $1`;

    try {
      const planejamentoResult = await db.querry(querry, [id]);
      if (planejamentoResult.rowCount === 0) {
        return ApiResponse.error('Planejamento não encontrado', 404);
      }

      const itemsResult = await ItemPlanejamento.buscarPorIdPlanejamento(id);
      if (!itemsResult.success) {
        throw Error(itemsResult.message);
      }

      const response = {
        ...planejamentoResult.rows[0],
        itens: itemsResult.data
      }

      return ApiResponse.success(response);
    } catch (err) {
      console.error(err.message);
      return ApiResponse.error("Não foi possível buscar o relatório", 500);
    }
  }

  static async listarPorSetor(sigla) {
    if (!sigla) {
      return ApiResponse.error("Sigla inválida", 500);
    }
    const querry = `SELECT p.*, s.nome_setor, u.nome_usuario as criador_nome
      FROM planejamento_mensal p 
      JOIN setor s ON p.id_setor = s.id_setor 
      JOIN usuario u ON p.matricula_criador = u.matricula
      WHERE p.id_setor = $1`;
    try {
      const idSetorResult = await Setor.buscarPorSigla(sigla);
      if (!idSetorResult.success) {
        throw Error("Não foi possível encontrar o setor");
      }
      const result = await db.querry(querry, [idSetorResult.data]);
      return ApiResponse.success(result.rows);
    } catch (err) {
      console.error(err.message);
      return ApiResponse.error(err.mesasge);
    }
  }

  // Pega dos últimos 3 meses apenas 
  static async historicoConsumo(sigla) {
    try {
      const idSetorResult = await Setor.buscarPorSigla(sigla);
      if (!idSetorResult.success) {
        throw Error("Não foi possível encontrar o setor");
      }
      const result = await ItemSolicitacao.historico(idSetorResult.data);
      if (!result) {
        throw Error(result);
      }
      return ApiResponse.success(result.data);
    } catch (err) {
      console.error(err.message);
      return ApiResponse.error("Não foi possível obter o histórico", 500);
    }
  }
}

module.exports = Planejamento;
