const Lotificacion = require('../models/lotificacionModel');

// Insertar una lotificación
const insertarLotificacion = async (req, res) => {
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const lotificacion = await Lotificacion.create({ nombre, sucursal_idsucursal });
        res.status(201).json(lotificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las lotificaciones
const obtenerLotificaciones = async (req, res) => {
    try {
        const lotificaciones = await Lotificacion.find().populate('sucursal_idsucursal'); // Populate para obtener datos de la sucursal
        res.status(200).json(lotificaciones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una lotificación por ID
const obtenerLotificacionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const lotificacion = await Lotificacion.findById(id).populate('sucursal_idsucursal');
        if (!lotificacion) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }
        res.status(200).json(lotificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una lotificación
const actualizarLotificacion = async (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const lotificacion = await Lotificacion.findByIdAndUpdate(
            id,
            { nombre, sucursal_idsucursal },
            { new: true } // Devuelve el documento actualizado
        ).populate('sucursal_idsucursal');

        if (!lotificacion) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }
        res.status(200).json(lotificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarLotificacion,
    obtenerLotificaciones,
    obtenerLotificacionPorId,
    actualizarLotificacion,
    eliminarLotificacion
};