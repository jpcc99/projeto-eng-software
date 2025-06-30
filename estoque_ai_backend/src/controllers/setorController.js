const Setor = require('../models/Setor');
const ApiResponse = require('../utils/apiResponse');

class SetorController {
  static async cadastro(req, res) {
    const camposNecessarios = ['nome', 'sigla'];
    const camposFaltando = [];

    for (const campo of camposNecessarios) {
      if (!(campo in req.body)) {
        camposFaltando.push(campo);
      }
    }

    if (camposFaltando.length > 0) {
      return res.json(ApiResponse.error(`Campos necessários faltando: ${camposFaltando}`));
    }

    const { nome, sigla } = req.body;

    let result = await checkNomeSetor(nome);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await checkSigla(sigla);
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

    let result = await checkSigla(sigla);
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

async function checkNomeSetor(nome = "") {
  const errMsg = "Nome inválido";
  const validationRegex = /^(?! )[a-zA-Zà-úÀ-ÚãõÃÕâêîôûÂÊÎÔÛáéíóúÁÉÍÓÚçÇ' ,-]+(?<! )$/;
  if (!validationRegex.test(nome)) {
    return ApiResponse.error(errMsg, 401);
  }
  return ApiResponse.success()
}

async function checkSigla(sigla = "") {
  const errMsg = "Sigla inválida. Deve conter apenas número e/ou letras matriculas";
  const validationRegex = /^[A-Z0-9]{1,10}$/;
  if (!validationRegex.test(sigla)) {
    return ApiResponse.error(errMsg, 401);
  }
  return ApiResponse.success()
}

module.exports = SetorController;
