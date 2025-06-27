const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const SetorController = require('../controllers/setorController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const EnumTiposUsuario = require('../utils/tipoUsuario');

router.get('/', authRequired, SetorController.listar);
router.get('/:sigla/coordenador', authRequired, SetorController.buscaCoordenador);
router.post('/cadastro', authRequired, checaTipoDeUsuario(EnumTiposUsuario.ADMIN, EnumTiposUsuario.COORDENADOR), SetorController.cadastro);


module.exports = router;
