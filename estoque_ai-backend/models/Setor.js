class Setor {
  /**
  * Lista todos os setores cadastrados
  * @returns {Promise<Array>} Lista de setores
  */
  static async listar() {
    const { rows } = await db.query('SELECT * FROM setor');
    return rows;
  }
  /**
  * Cria um novo setor
  * @param {string} nome
  * @param {string} sigla
  * @returns {Promise<Object>} Setor criado
  */
  static async criar(nome, sigla) {
    const query = `
      INSERT INTO setor (nome, sigla)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [nome, sigla]);
    return rows[0];
  }
}
module.exports = Setor;
