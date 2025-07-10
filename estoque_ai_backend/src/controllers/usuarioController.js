const ApitResponse = require('../utils/apiResponse');
const Usuario = require('../models/Usuario');
const Setor = require('../models/Setor');
const { checkRegex, regex } = require('../utils/checkRegex');

const tiposUsuario = require('../utils/tipoUsuario');
const camposFaltando = require('../utils/camposFaltando');

class UsuarioController {
  // TODO 
  static async addToSetor(req, res) {
    let result = await camposFaltando(['matricula', 'sigla'], req.params);
    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }

    const { matricula, sigla } = req.params;
    result = await checkRegex(matricula, regex.usuario.matricula);
    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }
    result = await checkRegex(sigla, regex.setor.sigla);
    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }

    try {
      result = await Usuario.buscaPorMatricula(matricula);
      if (!result.success) {
        return res.json(result.statusCode).json(result);
      }
      const usuario = result.data;

      result = await Setor.buscarPorSigla(sigla);
      if (!result.success) {
        return res.json(result.statusCode).json(result);
      }
      const setor = result.data;

      result = await Usuario;

    } catch (err) {
      console.error(err);
      res.status(500).json(ApitResponse.error(err.message));
    }
  }

  static async mudaTipo(req, res) {
    let result = await camposFaltando(['matricula', 'tipo'], req.params);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    const { matricula, tipo } = req.params;
    result = await checkRegex(matricula, regex.usuario.matricula);
    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }
    const tipos = Object.values(tiposUsuario);
    if (!tipos.includes(tipo)) {
      return res.json(ApitResponse.error("Não é possível mudar o tipo de usuário", 500));
    }

    try {
      result = await Usuario.buscaPorMatricula(matricula);
      if (!result.success) {
        return res.status(result.statusCode).json(ApitResponse.error(result.message, 404));
      }
      const usuario = result?.data;
      if (tipo === usuario.tipo_usuario) {
        return res.status(400).json(ApitResponse.error("Não é possível mudar o tipo de usuário"));
      }
      result = await Usuario.mudarTipo(matricula, tipo);
      console.table(usuario);
    } catch (err) {
      console.error(err);
      return res.json(ApitResponse.error(err.message, 500));
    }
    res.status(201).json(ApitResponse.success());
  }
}

module.exports = UsuarioController;
