const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/materialController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const { EnumTiposUsuario } = require('../utils/checkTipoUsuario');

router.get('/', authRequired, MaterialController.listar);
router.post('/cadastrar', authRequired, checaTipoDeUsuario(
  EnumTiposUsuario.CONTROLE_MATERIAIS
), MaterialController.criar);

module.exports = router;
