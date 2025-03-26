const express = require('express');
const router = express.Router();
const {
    insertarEdificio,
    obtenerEdificios,
    obtenerEdificioPorId,
    actualizarEdificio,
    eliminarEdificio
} = require('../controllers/edificioController');

// Insertar un edificio
router.post('/', insertarEdificio);

// Obtener todos los edificios
router.get('/', obtenerEdificios);

// Obtener un edificio por ID
router.get('/:id', obtenerEdificioPorId);

// Actualizar un edificio
router.put('/:id', actualizarEdificio);

// Eliminar un edificio
router.delete('/:id', eliminarEdificio);

module.exports = router;