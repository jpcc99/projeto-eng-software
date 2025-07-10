const express = require('express');
const router = express.Router();
const SolicitacoesController = require('../controllers/solicitacoesController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const EnumTiposUsuario = require('../utils/tipoUsuario');

/*
router.get('/setor/:sigla', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.ADMIN,
  EnumTiposUsuario.CONTROLE_MATERIAIS,
  EnumTiposUsuario.COORDENADOR,
), SolicitacoesController);
*/
router.post('/criar', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.ADMIN,
  EnumTiposUsuario.COORDENADOR,
), SolicitacoesController.criar);

module.exports = router;
