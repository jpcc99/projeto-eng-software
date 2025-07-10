const express = require('express');
const router = express.Router();
const PlanejamentoController = require('../controllers/planejamentoController');
const { authRequired, checaTipoDeUsuario } = require('../middlewares/authMiddleware');
const EnumTiposUsuario = require('../utils/tipoUsuario');

// Rotas para coordenadores
router.post('/', authRequired, checkUserType('Coordenador'), PlanejamentoController.criar);
router.get('/setor', authRequired, checkUserType('Coordenador'), PlanejamentoController.listarPorSetor);
router.get('/historico-consumo', authRequired, checkUserType('Coordenador'), PlanejamentoController.historicoConsumo);

// Rota pública para visualização
router.get('/:id', authRequired, PlanejamentoController.buscar);

module.exports = router;

