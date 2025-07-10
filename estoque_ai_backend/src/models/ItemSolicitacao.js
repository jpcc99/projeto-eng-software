const ApiResponse = require('../utils/apiResponse');
const db = require('../config/db');


class ItemSolicitacao {
  static async criar(idSolicitacao, idMaterial, qtdSolicitada) {
    const querry = `INSERT INTO ItemSolicitacao 
      (id_solicitacao, id_material, qtd_solicitada)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [idSolicitacao, idMaterial, qtdSolicitada];
    try {
      const result = await db.querry(querry, values);
      if (result.rowCount === 0) {
        return ApiResponse.error("Não foi possível cadastrar o item na solicitação");
      }
      console.table(result.rows[0]);
      return result.rows[0];
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async getAllWithIdSolicitacao(idSolicitacao) {
    const querry = `SELECT * FROM ItemSolicitacao
      WHERE id_solicitacao = $1`;
    try {
      const result = await db.querry(querry, [idSolicitacao]);
      if (result.rowCount === 0) {
        return ApiResponse.error("Não foi possível buscas os itens da solicitação");
      }
      console.table(result.rows);
      return result.rows;
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async historico(idSetor) {
    if (!idSetor) {
      return ApiResponse.error("Id Setor inválido");
    }
    const querry = `SELECT m.id_material, m.nome_material, m.unidade_medida,
                    SUM(is.quantidade_atendida) as quantidade_total,
                    DATE_TRUNC('month', s.data_solicitacao) as mes
      FROM item_solicitacao is 
      JOIN solicitacao s ON is.id_solicitacao = s.id_solicitacao
      JOIN material m ON is.id_material = m.id_material
      WHERE s.id_setor = $1
        AND s.status_solicitacao = 'Concluída'
        AND s.data_solicitacao >= DATE_TRUNC('month', NOW() - INTERVAL '3 months'
      GROUP BY m.id_material, m.nome_material, m.unidade_medida, mes
      ORDER BY mes DESC, m.nome_material`;
    try {
      const result = await db.querry(querry, [idSetor]);
      return ApiResponse.success(result.rows);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
}

module.exports = ItemSolicitacao;
