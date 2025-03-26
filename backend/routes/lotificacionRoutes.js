const express = require('express');
const router = express.Router();
const {
    insertarLotificacion,
    obtenerLotificaciones,
    obtenerLotificacionPorId,
    actualizarLotificacion,
    eliminarLotificacion
} = require('../controllers/lotificacionController');

// Insertar una lotificación
router.post('/', insertarLotificacion);

// Obtener todas las lotificaciones
router.get('/', obtenerLotificaciones);

// Obtener una lotificación por ID
router.get('/:id', obtenerLotificacionPorId);

// Actualizar una lotificación
router.put('/:id', actualizarLotificacion);

// Eliminar una lotificación
router.delete('/:id', eliminarLotificacion);

module.exports = router;