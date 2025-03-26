const express = require('express');
const router = express.Router();
const {
    insertarResidencial,
    obtenerResidenciales,
    obtenerResidencialPorId,
    actualizarResidencial,
    eliminarResidencial
} = require('../controllers/residencialController');

// Insertar un residencial
router.post('/', insertarResidencial);

// Obtener todos los residenciales
router.get('/', obtenerResidenciales);

// Obtener un residencial por ID
router.get('/:id', obtenerResidencialPorId);

// Actualizar un residencial
router.put('/:id', actualizarResidencial);

// Eliminar un residencial
router.delete('/:id', eliminarResidencial);

module.exports = router;