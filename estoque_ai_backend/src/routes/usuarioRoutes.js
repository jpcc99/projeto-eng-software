const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const EnumTiposUsuario = require('../utils/tipoUsuario.js')
const UsuarioController = require('../controllers/usuarioController');

// TODO 
// get_notificações
// get_solicitações 

router.get('/', authRequired, AuthController.getMe);
router.put('/:matricula/:tipo', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.ADMIN
), UsuarioController.mudaTipo);
router.put('add/:matricula/setor/:sigla', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.ADMIN,
  EnumTiposUsuario.COORDENADOR,
), UsuarioController.addToSetor);

module.exports = router;
