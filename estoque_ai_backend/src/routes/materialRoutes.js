const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/materialController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const EnumTiposUsuario = require('../utils/tipoUsuario');

router.post('/', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.CONTROLE_MATERIAIS
), MaterialController.criar);
router.get('/', authRequired, MaterialController.listar);
router.get('/:id', authRequired, MaterialController.buscar);
router.put('/:id', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.CONTROLE_MATERIAIS
), MaterialController.atualizar);
router.delete('/:id', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.CONTROLE_MATERIAIS
), MaterialController.remover);

module.exports = router;
