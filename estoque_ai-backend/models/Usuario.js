const db = require('../db');

class Usuario {
  /**
   * Cria um novo usuário no sistema
   * @param  {string} matricula
   * @param {string} cpf
   * @param {string} nome
   * @param {string} email
   * @param {string} senha
   * @param {boolean} ativo
   * @param {string} tipo
   * @return {Promise<Object>} Usuário criado
   */
  static async criar(matricula, nome, cpf, email, senha, ativo = true, tipo = 'aluno') {
    const query = `
      INSERT INTO usuario (matricula, nome, cpf, email, senha, ativo, tipo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [matricula, nome, cpf, email, senha, ativo, tipo];
    console.log(values);
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  /**
  * Busca um usuário por matrícula
  * @param {string} matricula
  * @returns {Promise<Object|null>} Usuário encontrado ou null
  */
  static async buscarPorMatricula(matricula) {
    const { rows } = await db.query('SELECT * FROM usuario WHERE matricula = $1', [matricula]);
    return rows[0] || null;
  }

  /**
  * Busca um usuário por email
  * @param {string} email
  * @returns {Promise<Object|null>} Usuário encontrado ou null
  */
  static async buscarPorEmail(email) {
    const { rows } = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return rows[0] || null;
  }

  /**
  * Associa um usuário a um setor
  * @param {string} matricula
  * @param {number} idSetor
  * @returns {Promise<Object>} Associação criada
  */
  static async associarSetor(matricula, idSetor) {
    const query = `
        INSERT INTO usuario_setor (matricula, id_setor)
        VALUES ($1, $2)
        RETURNING *;
      `;
    const { rows } = await db.query(query, [matricula, idSetor]);
    return rows[0];
  }
}
module.exports = Usuario;
