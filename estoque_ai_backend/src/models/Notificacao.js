const db = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

class Notificacao {
  // Criar notificação
  static async criar(matriculaDestino, titulo, mensagem, tipo, idRelacionado) {
    try {
      const result = await db.querry(
        `INSERT INTO notificacao
        (matricula_destino, titulo, mensagem, tipo, id_relacionado, lida, data_criacao)
        VALUES ($1, $2, $3, $4, $5, false, NOW())
        RETURNING *`,
        [matriculaDestino, titulo, mensagem, tipo, idRelacionado]
      );
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
  // Listar notificações do usuário
  static async listarPorUsuario(matricula) {
    try {
      const result = await db.querry(
        `SELECT * FROM notificacao
        WHERE matricula_destino = $1
        ORDER BY data_criacao DESC
        LIMIT 50`,
        [matricula]
      );
      return ApiResponse.success(result.rows);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
  // Marcar como lida
  static async marcarComoLida(id, matricula) {
    try {
      const result = await db.querry(
        `UPDATE notificacao
        SET lida = true
        WHERE id_notificacao = $1 AND matricula_destino = $2
        RETURNING *`,
        [id, matricula]
      );
      if (result.rowCount === 0) {
        return ApiResponse.error('Notificação não encontrada', 404);
      }
      return ApiResponse.success(result.rows[0]);
    } catch (err) {
      return ApiResponse.error(err.message);
    }
  }
}

module.exports = Notificacao;
