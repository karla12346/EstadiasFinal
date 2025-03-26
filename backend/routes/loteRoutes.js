const express = require('express');
const router = express.Router();
const {
    insertarLote,
    obtenerLotes,
    obtenerLotePorId,
    actualizarLote,
    eliminarLote
} = require('../controllers/loteController');

// Insertar un lote
router.post('/', insertarLote);

// Obtener todos los lotes
router.get('/', obtenerLotes);

// Obtener un lote por ID
router.get('/:id', obtenerLotePorId);

// Actualizar un lote
router.put('/:id', actualizarLote);

// Eliminar un lote
router.delete('/:id', eliminarLote);

module.exports = router;