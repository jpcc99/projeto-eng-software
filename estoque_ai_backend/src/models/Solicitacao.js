const db = require('../config/db');
const ApiResponse = require('../utils/apiResponse');
const Setor = require('../models/Setor');
const ItemSolicitacao = require('../models/ItemSolicitacao');

class Solicitacao {
  static async criar(matriculaSolicitante = "", siglaSetor = "", itens = []) {
    const querry = `INSERT INTO solicitacao
      (data_solicitacao, status_solicitacao, id_setor, matricula_solicitante)
      VALUES (NOW(), ${StatusSolicitacao.PENDENTE}, $1, $2)
      RETURNING id_solicitacao`;
    try {
      await db.querry('BEGIN');

      const idSetorResult = await Setor.buscarPorSigla(siglaSetor);
      if (!idSetorResult.success) {
        throw Error(idSetorResult.message);
      }
      const idSetor = idSetorResult.data;

      const solicitacaoResult = await db.querry(querry, [idSetor, matriculaSolicitante]);
      if (solicitacaoResult.rowCount === 0) {
        throw Error("Não foi possível criar a solicitação");
      }
      const idSolicitacao = solicitacaoResult.rows[0]?.id_solicitacao;

      for (const item of itens) {
        const { id_material, quantidade } = item;
        const itemSolicitacaoResult =
          await ItemSolicitacao.criar(idSolicitacao, id_material, quantidade);
        if (!itemSolicitacaoResult.success) {
          throw Error(itemSolicitacaoResult.message);
        }
      }
      await db.querry('COMMIT');
      return ApiResponse.success(idSolicitacao);
    } catch (err) {
      console.log(err.message);
      return ApiResponse.error("Não foi possível criar solicitação", 500);
    }
  }

  static async listarPorSetor(siglaSetor = "") {
    const querry = `SELECT s.*, u.nome_usuario as solicitante_nome
      FROM solicitacao s
      JOIN usuario u ON s.matricula_solicitante = u.matricula
      WHERE s.id_setor = $1
      ORDER BY s.data_solicitacao DESC`;

    try {
      const idSetorResult = await Setor.buscarPorSigla(siglaSetor);
      if (!idSetorResult.success) {
        throw Error(idSetorResult.message);
      }
      const idSetor = idSetorResult.data;

      const listaSolicitacoesResult = await db.querry(querry, [idSetor]);
      if (listaSolicitacoesResult.rowCount === 0) {
        throw Error("Não foi possível buscar solicitações");
      }
      return ApiResponse.success(listaSolicitacoesResult.rows);
    } catch (err) {
      console.error(err.message);
      return ApiResponse.error("Não foi possível obter as solicitações");
    }
  }

  static async avaliar(id = 0, status = "", motivo = "", matricula = "") {
    const querry = `UPDATE solicitacao
      SET status_solicitacao = $1,
      motivo_reprovacao = $2,
      data_aprovacao_reprovacao = NOW(),
      matricula_aprovador = $3
      WHERE id_solicitacao = $4
      RETURNING *`;
    const values = [status, motivo, matricula, id];

    try {
      const avaliacaoResult = await db.querry(querry, values);
      if (avaliacaoResult.rowCount === 0) {
        return ApiResponse.error("Solicitação não encontrada", 404);
      }
    } catch (err) {
      console.err(err.message);
      return ApiResponse.error("Não foi possível avalia a solicitação");
    }
  }
}

/**
 * @file Enum para Status de Solicitação.
 * @description Define um conjunto de unidades de medida padronizadas para o modelo Solicitacao.
 * Este enum ajuda a garantir consistência dos dados no campo 'status_solicitacao'
 * da tabela Material no banco de dados relacional.
 */
const StatusSolicitacao = Object.freeze({
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REPROVADA: 'Reprovada',
  EM_ANDAMENTO: 'EmAndamento',
  CONCLUIDA: 'Concluida'
});

module.exports = {
  Solicitacao: Solicitacao,
  StatusSolicitacao: StatusSolicitacao,
}
