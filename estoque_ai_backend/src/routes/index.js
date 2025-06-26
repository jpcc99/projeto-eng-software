const express = require('express');
const router = express.Router();

// Importa as rotas
const authRoutes = require('../routes/authRoutes');
const setorRoutes = require('../routes/setorRoutes');
const materialRoutes = require('../routes/materialRoutes');

// Usa as rotas importadas
router.use('/auth', authRoutes);
router.use('/setor', setorRoutes);
router.use('/material', materialRoutes);

module.exports = router;
