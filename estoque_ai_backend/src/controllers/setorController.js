const Setor = require('../models/Setor');
const ApiResponse = require('../utils/apiResponse');

const checaCamposFaltando = require('../utils/camposFaltando');
const { checkRegex, regex } = require('../utils/checkRegex');

class SetorController {
  static async cadastro(req, res) {
    let result = checaCamposFaltando(['nome', 'sigla'], req.body);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    const { nome, sigla } = req.body;

    result = await checkRegex(nome, regex.setor.nome, "Nome inválido");
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await checkRegex(sigla, regex.setor.sigla, "Sigla inválida. Deve conter apenas número e/ou letras matriculas");
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await Setor.buscarPorSigla(sigla);
    // Deve ser falso, caso contrário achou um setor cadastrado
    if (result.success) {
      const response = ApiResponse.error("Setor já cadastrado", 401);
      return res.status(response.statusCode || 401).json(response);
    }

    result = await Setor.criar(nome, sigla);
    if (!result.success) {
      const response = ApiResponse.error("Não foi possível cadastrar Setor", 401);
      return res.status(response.statusCode || 401).json(response);
    }
    return res.status(result.statusCode || 200).json(result.message);
  }

  static async listar(req, res) {
    const result = await Setor.listar();
    if (!result.success) {
      return res.status(result.statusCode || 404).json(result.message);
    }
    return res.json(result);
  }

  static async buscaCoordenador(req, res) {
    const { sigla } = req.params;

    let result = await checkRegex(sigla, regex.setor.sigla, "Sigla inválida. Deve conter apenas número e/ou letras matriculas");
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result.message);
    }

    result = await Setor.buscarCoordenadorDeSetorPor({ sigla: sigla });
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result.message);
    }
    return res.status(result.statusCode || 200).json(result.message)
  }
}

module.exports = SetorController;
