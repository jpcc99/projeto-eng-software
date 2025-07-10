const express = require('express');
const router = express.Router();

// Importa as rotas
const authRoutes = require('../routes/authRoutes');
const setorRoutes = require('../routes/setorRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const materialRoutes = require('../routes/materialRoutes');
const solicitacoesRoutes = require('../routes/solicitacoesRoutes');
const planejamentoRoutes = require('../routes/planejamentoRoutes');
const notificacaoRoutes = require('../routes/notificacaoRoutes');

// Usa as rotas importadas
router.use('/auth', authRoutes);
router.use('/setor', setorRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/material', materialRoutes);
router.use('/solicitacao', solicitacoesRoutes);
router.use('/planejamento', planejamentoRoutes);
router.use('/notificacoes', notificacaoRoutes);

module.exports = router;
