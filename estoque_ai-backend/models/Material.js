class Material {
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
