const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, agendamentosController.listar);
router.post('/', authMiddleware, agendamentosController.criar);
router.delete('/:id', authMiddleware, agendamentosController.excluir);

module.exports = router;