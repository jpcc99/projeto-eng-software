const Usuario = require('../models/Usuario');
const { gerarToken } = require('../config/auth');
const ApiResponse = require('../utils/apiResponse');
const { } = requre('../utils/')

class AuthController {
  static async cadastro(req, res) {
    const { matricula, nome, email, senha } = req.body;

    let result = await checkEmail(email);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await checkSenha(senha);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    // Esse check irá ser um error caso o resultado for positivo 
    // Já que o usuario com essa matricula já estaria cadastrado
    result = await Usuario.buscaPorMatricula(matricula);
    if (result.success) {
      result = ApiResponse.error("Usuário já cadastrado", 401);
      return res.status(result.statusCode || 401).json(result);
    }

    result = await Usuario.criar(matricula, nome, email, senha);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }
    return res.status(result.statusCode || 200).json(result.message);

  }

  // Faz a auth pro login
  static async login(req, res) {
    const { email, senha } = req.body;

    let result = await checkEmail(email);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await checkSenha(senha);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    result = await Usuario.verificaCredenciais(email, senha);
    if (!result.success) {
      return res.status(result.statusCode || 401).json(result);
    }

    const usuario = result.data;
    const token = gerarToken(usuario.matricula, usuario.tipoUsuario);
    return res.json(ApiResponse.success({
      matricula: usuario.matricula,
      nome: usuario.nome,
      tipoUsuario: usuario.tipoUsuario,
      token,
    }));
  }

  static async getMe(req, res) {
    const result = await Usuario.buscaPorMatricula(req.user.matricula);
    if (!result.success) {
      return res.status(result.statusCode || 404).json(result);
    }

    const usuario = result.data;
    return res.json(ApiResponse.success({
      matricula: usuario.matricula,
      nome: usuario.nome,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
      idSetor: usuario.idSetor,
    }));
  }
}

async function checkEmail(email) {
  const errMsg = "Email inválido";
  const validationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!validationRegex.test(email)) {
    return ApiResponse.error(errMsg);
  }
  return ApiResponse.success()
}

async function checkSenha(senha) {
  const errMsg =
    "A senha deve ter no mínimo 8 caracteres, ao menos numa letra maiúscula, uma minúscula, um número e um caracter especial";
  const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!validationRegex.test(senha)) {
    return ApiResponse.error(errMsg);
  }
  return ApiResponse.success()
}

module.exports = AuthController;
