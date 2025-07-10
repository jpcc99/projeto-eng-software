const ApiResponse = require('../utils/apiResponse');
const checkCamposFaltando = require('../utils/camposFaltando');
const db = require('../config/db');
const { Solicitacao, StatusSolicitacao } = require('../models/Solicitacao');

class SolicitacoesController {
  static async criar(req, res) {

    const { sigla_setor, items } = req.body;
    const { matricula } = req.user;

    let result = await checkCamposFaltando(['id_setor', 'items'], req.body);
    if (!result.success) {
      return res.status(500).json(result.message);
    }

    const solicitacaoResult = await Solicitacao.criar(matricula, sigla_setor, items);
    return res.status(solicitacaoResult || 200).json(solicitacaoResult.data);
  }

  static async listarPorSetor(req, res) {
    const { sigla_setor } = req.params;

    const solicitacaoResult = await Solicitacao.listarPorSetor(sigla_setor);
    return res.status(solicitacaoResult.statusCode || 200).json(solicitacaoResult.data);
  }

  static async avaliar(req, res) {
    const camposFaltandoResult = await checkCamposFaltando(['status', 'motivo'], req.body);
    if (!camposFaltandoResult.success) {
      return res.status(400).json(camposFaltandoResult);
    }

    const { id } = req.params;
    const { status, motivo } = req.body;
    const { matricula } = req.user;

    if (![StatusSolicitacao.APROVADA, StatusSolicitacao.REPROVADA].includes(status)) {
      return res.status(400).json(ApiResponse.error("Status inválido"));
    }

    const solicitacaoResult = await Solicitacao.avaliar(id, status, motivo, matricula);
    return res.status(solicitacaoResult.statusCode || 200).json(solicitacaoResult);
  }
}

module.exports = SolicitacoesController;
