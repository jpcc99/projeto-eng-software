const { veirificarToken } = require('../config/auth');
const ApiResponse = require('../utils/apiResponse');

const authRequired = (req, res, next) => {
  // Pega o token do header da req do cliente
  // O ? do Obj['key']? é para retornar undefined caso não encontre
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json(ApiResponse.error('Token de autenticação não fornecido'));
  }

  const decodedToken = veirificarToken(token);
  if (!decodedToken) {
    res.status(401).json(ApiResponse.error('Token inválido ou expirado'));
  }

  req.user = decodedToken;
  next();
};

const checaTipoDeUsuario = (...tiposValidos) => {
  return (req, res, next) => {
    if (!tiposValidos.includes(req.user.tipoUsuario)) {
      return res.status(403).json(ApiResponse.error('Acesso não autorizado'));
    }
    next();
  }
}

module.exports = {
  authRequired,
  checaTipoDeUsuario,
};
