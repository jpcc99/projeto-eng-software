const { Solicitacao } = require('../models/Solicitacao');

class SolicitacoesController {
  static async criar(req, res) {
    const response = Solicitacao.criar;
  }
}

module.exports = SolicitacoesController;
