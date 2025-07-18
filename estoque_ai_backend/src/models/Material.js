const db = require('../config/db');
const ApiResponse = require("../utils/apiResponse");

class Material {
  static async criar(nome = "", descricao = "", unidade_medida = UnidadeDeMedida.NONE, codigo_material = "") {
    const querry = `INSERT INTO Material
      (nome_material, descricao_material, unidade_de_medida, codigo_material)
      VALUES ($1, $2, $3, $4)`;
    const values = [nome, descricao, unidade_medida, codigo_material];
    try {
      const result = await db.querry(querry, values);
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message, 400);
    }
  }

  static async listar() {
    const querry = `SELECT * FROM material ORDER BY nome_material`;
    try {
      const result = await db.querry(querry, []);
      if (result.rowCount === 0) {
        throw Error("Nenhum Material")
      }
      return ApiResponse.success(result.rows);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async buscarPorId(id) {
    const querry = `SELECT * FROM material WHERE id_material = $1`;
    try {
      const result = await db.querry(querry, [id]);
      if (result.rows.length === 0) {
        return ApiResponse.error("Material não encontrado", 404);
      }
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error("Material não encontrado", 404);
    }
  }

  static async buscarPorCodigo(codigo_material) {
    const querry = `SELECT * FROM material WHERE codigo_material = $1`;
    try {
      const result = await db.querry(querry, [codigo_material]);
      if (result.rows.length === 0) {
        return ApiResponse.error("Material não encontrado", 404);
      }
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error("Material não encontrado", 404);
    }
  }

  static async atualizar(id, nome, descricao, unidade_de_medida = UnidadeDeMedida.NONE) {
    const querry = `UPDATE material
      SET nome_material = $1, descricao_material = $2, unidade_de_medida = $3
      WHERE id_material = $4
      RETURNING *`;
    const values = [nome, descricao, unidade_de_medida, id];
    // TODO checar cada param para saber exatamente onde atualizar
    try {
      const result = await db.querry(querry, values);
      if (result.rowCount === 0) {
        return ApiResponse.error('Material não encontrado', 404);
      }
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }

  static async remover(id) {
    const querry = `DELETE FROM Material WHERE id_material = $1 RETURNING *`;
    try {
      const result = await db.querry(querry, [id]);
      if (result.rowCount === 0) {
        return ApiResponse.error('Material não encontrado', 404);
      }
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
}

/**
 * @file Enum para Unidades de Medida.
 * @description Define um conjunto de unidades de medida padronizadas para o modelo Material.
 * Este enum ajuda a garantir consistência dos dados no campo 'unidade_de_medida'
 * da tabela Material no banco de dados relacional.
 */

const UnidadeDeMedida = Object.freeze({
  /** Centímetros */
  CM: 'CM',
  /** Metros */
  M: 'M',
  /** Quilogramas */
  KG: 'KG',
  /** Gramas */
  G: 'G',
  /** Litros */
  L: 'L',
  /** Mililitros */
  ML: 'ML',
  /** Peças */
  PC: 'PC',
  /** Caixas */
  CX: 'CX',
  /** Unidades */
  UN: 'UN',
  /** Rolos */
  RL: 'RL',
  /** Pacotes */
  PCT: 'PCT',
  /** Metros Quadrados */
  M2: 'M2',
  /** Metros Cúbicos */
  M3: 'M3',
  /** Horas */
  HR: 'HR',
  /** Sem unidade específica */
  NONE: 'N/A'
  // Adicione outras unidades de medida conforme a necessidade do seu negócio
});

module.exports = {
  Material: Material,
  UnidadeDeMedida: UnidadeDeMedida,
};
