const db = require('../db');

class Material {
  /**
   * Cria um novo usuário no sistema
   * @param  {int} id_material
   * @param {string} nome
   * @param {string} descricao
   * @param {string} unidade_de_medida
   * @param {int} estoque_min
   * @param {int} estoque_max
   * @param {int} status
   * @param {string} codigo
   * @return {Promise<Object>} Usuário criado
   */
  static async criar(
    id_material = 0,
    nome = "",
    descricao = "",
    unidade_de_medida = "",
    estoque_min = 0,
    estoque_max = 0,
    status = "",
    codigo = "",
  ) {
    const query = `
      INSERT INTO material (id_material, nome, descricao, unidade_de_medida, estoque_min, estoque_max, status, codigo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [id_material, nome, descricao, unidade_de_medida, estoque_min, estoque_max, status, codigo];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  /**
  * Lista todos os materiais do catálogo
  * @returns {Promise<Array>} Lista de materiais
  */
  static async listar() {
    const { rows } = await db.query('SELECT * FROM material');
    return rows;
  }
  /**
  * Busca um material por ID
  * @param {number} idMaterial
  * @returns {Promise<Object|null>} Material encontrado ou null
  */
  static async buscarPorId(idMaterial) {
    const { rows } = await db.query('SELECT * FROM material WHERE id_material = $1', [idMaterial]);
    return rows[0] || null;
  }
}
module.exports = Material;
