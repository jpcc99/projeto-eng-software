const db = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

// TODO
class ItemPlanejamento {
  static async criar(idPlanejamento, idMaterial, quantidadePlanejada) {
    if (!idPlanejamento || !idMaterial || !quantidadePlanejada) {
      return ApiResponse.error("Planejamento, Material, ou Quantidades, inválidas");
    }

    const querry = `INSERT INTO item_planejamento
      (id_planejamento, id_material, quantidade_planejada)
      VALUES ($1, $2, $3)`;
    const values = [idPlanejamento, idMaterial, quantidadePlanejada];

    try {
      await db.querry(querry, values);
      return ApiResponse.success();
    } catch (err) {
      console.error(err.message);
      return ApiResponse.error(err.message);
    }
  }

  static async buscarPorIdPlanejamento(id) {
    const querry = `SELECT ip.*, m.nome_material, m.unidade_medida
      FROM item_planejamento ip
      JOIN material ON ip.id_material = m.id_material
      WHERE ip.id_planejamento = $1`;

    try {
      const itensResult = await db.querry(querry, [id]);
      return ApiResponse.success(itensResult.rows);
    } catch (err) {
      console.log(err.message);
      return ApiResponse.error("Não foi possível buscar itens deste planejamento");
    }
  }


}

module.exports = ItemPlanejamento;
