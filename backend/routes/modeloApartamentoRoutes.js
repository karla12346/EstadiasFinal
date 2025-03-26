const express = require('express');
const router = express.Router();
const {
    insertarModeloApartamento,
    obtenerModelosApartamento,
    obtenerModeloApartamentoPorId,
    actualizarModeloApartamento,
    eliminarModeloApartamento
} = require('../controllers/modeloApartamentoController');

// Insertar un modelo de apartamento
router.post('/', insertarModeloApartamento);

// Obtener todos los modelos de apartamento
router.get('/', obtenerModelosApartamento);

// Obtener un modelo de apartamento por ID
router.get('/:id', obtenerModeloApartamentoPorId);

// Actualizar un modelo de apartamento
router.put('/:id', actualizarModeloApartamento);

// Eliminar un modelo de apartamento
router.delete('/:id', eliminarModeloApartamento);

module.exports = router;