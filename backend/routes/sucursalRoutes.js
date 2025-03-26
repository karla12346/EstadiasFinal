const express = require('express');
const router = express.Router();
const {
    insertarSucursal,
    obtenerSucursales,
    obtenerSucursalPorId,
    actualizarSucursal,
    eliminarSucursal
} = require('../controllers/sucursalController');

// Insertar una sucursal
router.post('/', insertarSucursal);

// Obtener todas las sucursales
router.get('/', obtenerSucursales);

// Obtener una sucursal por ID
router.get('/:id', obtenerSucursalPorId);

// Actualizar una sucursal
router.put('/:id', actualizarSucursal);

// Eliminar una sucursal
router.delete('/:id', eliminarSucursal);

module.exports = router;