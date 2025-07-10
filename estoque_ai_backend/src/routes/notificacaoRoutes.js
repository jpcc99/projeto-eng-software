const express = require('express');
const router = express.Router();
const NotificacaoController = require('../controllers/notficacaoController');
const { authRequired } = require('../middlewares/authMiddleware');

router.get('/', authRequired, NotificacaoController.listar);
router.put('/:id/marcar-lida', authRequired, NotificacaoController.marcarComoLida);

module.exports = router;
