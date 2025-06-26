const express = require('express');
const router = express.Router();

// Importa as rotas
const authRoutes = require('../routes/authRoutes');
const setorRoutes = require('../routes/setorRoutes');

// Usa as rotas importadas
router.use('/auth', authRoutes);
router.use('/setor', setorRoutes);

module.exports = router;
