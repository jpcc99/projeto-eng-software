const Planejamento = require('../models/Planejamento');
const Usuario = require('../models/Usuario');
const Setor = require('../models/Setor');
const ApiResponse = require('../utils/apiResponse');
const camposFaltando = require('../utils/camposFaltando');

class PlanejamentoController {
  static async criar(req, res) {
    const { mesAno, itens } = req.body;
    const { matricula } = req.user;
    let result = await camposFaltando(['mesAno', 'itens'], req.body);
    if (!result.success || !matricula) {
      console.error(result.message);
      return res.status(500).json(result.message);
    }

    try {
      result = await Usuario.buscaPorMatricula(matricula)
      const idSetor = result.data?.id_setor;

      result = await Planejamento.criar(mesAno, idSetor, matricula, itens);
      if (!result.success) {
        throw Error(result.message);
      }
      return res.status(201).json(result);
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(result.message);
    }
  }

  // Buscar planejamento por ID
  static async buscar(req, res) {
    const { id } = req.params;
    const result = await Planejamento.buscarPorId(id);
    return res.status(result.statusCode || 200).json(result);
  }

  // Listar planejamentos do setor
  static async listarPorSetor(req, res) {
    const { sigla } = req.params;
    if (!sigla) {
      return res.status(404).json(ApiResponse.error().message);
    }
    const result = await Planejamento.listarPorSetor(sigla);
    return res.status(result.statusCode || 200).json(result);
  }

  // Obter histórico de consumo
  static async historicoConsumo(req, res) {
    const { sigla } = req.params;
    if (!sigla) {
      return res.status(404).json(ApiResponse.error().message);
    }
    const result = await Planejamento.historicoConsumo(sigla);
    return res.status(result.statusCode || 200).json(result);
  }
}

module.exports = PlanejamentoController;
