const express = require('express');
const router = express.Router();

// Importa as rotas
const authRoutes = require('../routes/authRoutes');

// Usa as rotas importadas
router.use('/auth', authRoutes);

module.exports = router;
