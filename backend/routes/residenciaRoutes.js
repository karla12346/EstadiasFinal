const express = require('express');
const router = express.Router();
const {
    insertarResidencia,
    obtenerResidencias,
    obtenerResidenciaPorId,
    actualizarResidencia,
    eliminarResidencia
} = require('../controllers/residenciaController');

// Insertar una residencia
router.post('/', insertarResidencia);

// Obtener todas las residencias
router.get('/', obtenerResidencias);

// Obtener una residencia por ID
router.get('/:id', obtenerResidenciaPorId);

// Actualizar una residencia
router.put('/:id', actualizarResidencia);

// Eliminar una residencia
router.delete('/:id', eliminarResidencia);

module.exports = router;