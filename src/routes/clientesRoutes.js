const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const authMiddleware = require('../middlewares/authMiddleware');


// Rotas de clientes
router.get('/', authMiddleware, clientesController.listar);
router.post('/', authMiddleware, clientesController.criar);
router.put('/:id', authMiddleware, clientesController.atualizar);
router.delete('/:id', authMiddleware, clientesController.deletar);

module.exports = router;