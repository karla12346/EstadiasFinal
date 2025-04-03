const Lotificacion = require('../models/lotificacionModel');

// Insertar una lotificación con descripción
const insertarLotificacion = async (req, res) => {
    const { nombre, sucursal_idsucursal, descripcion } = req.body;

    try {
        const lotificacion = await Lotificacion.create({ 
            nombre, 
            sucursal_idsucursal,
            descripcion: descripcion || null 
        });
        res.status(201).json(lotificacion);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al crear la lotificación',
            error: error.message 
        });
    }
};

// Obtener todas las lotificaciones
const obtenerLotificaciones = async (req, res) => {
    try {
        const lotificaciones = await Lotificacion.find({});
        res.status(200).json(lotificaciones);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener lotificaciones',
            error: error.message 
        });
    }
};

// Obtener una lotificación por ID
const obtenerLotificacionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const lotificacion = await Lotificacion.findById(id);
        if (!lotificacion) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }
        res.status(200).json(lotificacion);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al buscar la lotificación',
            error: error.message 
        });
    }
};

// Actualizar una lotificación
const actualizarLotificacion = async (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal_idsucursal, descripcion } = req.body;

    try {
        const lotificacion = await Lotificacion.findByIdAndUpdate(
            id,
            { nombre, sucursal_idsucursal, descripcion },
            { new: true, runValidators: true }
        );

        if (!lotificacion) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }
        res.status(200).json(lotificacion);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al actualizar',
            error: error.message 
        });
    }
};

// Eliminar una lotificación
const eliminarLotificacion = async (req, res) => {
    const { id } = req.params;

    try {
        const lotificacion = await Lotificacion.findByIdAndDelete(id);
        if (!lotificacion) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }
        res.status(200).json({ message: 'Lotificación eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al eliminar',
            error: error.message 
        });
    }
};

module.exports = {
    insertarLotificacion,
    obtenerLotificaciones,
    obtenerLotificacionPorId,
    actualizarLotificacion,
    eliminarLotificacion
};