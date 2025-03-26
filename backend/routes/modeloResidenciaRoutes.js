const express = require('express');
const router = express.Router();
const {
    insertarModeloResidencia,
    obtenerModelosResidencia,
    obtenerModeloResidenciaPorId,
    actualizarModeloResidencia,
    eliminarModeloResidencia
} = require('../controllers/modeloResidenciaController');

// Insertar un modelo de residencia
router.post('/', insertarModeloResidencia);

// Obtener todos los modelos de residencia
router.get('/', obtenerModelosResidencia);

// Obtener un modelo de residencia por ID
router.get('/:id', obtenerModeloResidenciaPorId);

// Actualizar un modelo de residencia
router.put('/:id', actualizarModeloResidencia);

// Eliminar un modelo de residencia
router.delete('/:id', eliminarModeloResidencia);

module.exports = router;