const express = require('express');
const router = express.Router();
const {
    insertarLotificacion,
    obtenerLotificaciones,
    obtenerLotificacionPorId,
    actualizarLotificacion,
    eliminarLotificacion
} = require('../controllers/lotificacionController');

// Ruta para crear lotificación (POST)
router.post('/', insertarLotificacion);

// Ruta para obtener todas las lotificaciones (GET)
router.get('/', obtenerLotificaciones);

// Ruta para obtener una lotificación específica (GET)
router.get('/:id', obtenerLotificacionPorId);

// Ruta para actualizar una lotificación (PUT)
router.put('/:id', actualizarLotificacion);

// Ruta para eliminar una lotificación (DELETE)
router.delete('/:id', eliminarLotificacion);

module.exports = router;