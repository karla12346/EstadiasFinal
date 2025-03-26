const express = require('express');
const router = express.Router();
const {
    insertarApartamento,
    obtenerApartamentos,
    obtenerApartamentoPorId,
    actualizarApartamento,
    eliminarApartamento
} = require('../controllers/apartamentoController');

// Insertar un apartamento
router.post('/', insertarApartamento);

// Obtener todos los apartamentos
router.get('/', obtenerApartamentos);

// Obtener un apartamento por ID
router.get('/:id', obtenerApartamentoPorId);

// Actualizar un apartamento
router.put('/:id', actualizarApartamento);

// Eliminar un apartamento
router.delete('/:id', eliminarApartamento);

module.exports = router;