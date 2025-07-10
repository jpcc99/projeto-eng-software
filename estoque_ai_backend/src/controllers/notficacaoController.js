const Notificacao = require('../models/Notificacao');

class NotificacaoController {
  // Listar notificações do usuário
  static async listar(req, res) {
    const { matricula } = req.user;
    const result = await Notificacao.listarPorUsuario(matricula);
    return res.status(result.statusCode || 200).json(result);
  }

  // Marcar notificação como lida
  static async marcarComoLida(req, res) {
    const { id } = req.params;
    const { matricula } = req.user;
    const result = await Notificacao.marcarComoLida(id, matricula);
    return res.status(result.statusCode || 200).json(result);
  }
}
module.exports = NotificacaoController;
