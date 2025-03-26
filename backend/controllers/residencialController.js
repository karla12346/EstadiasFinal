const Residencial = require('../models/residencialModel');

// Insertar un residencial
const insertarResidencial = async (req, res) => {
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const residencial = await Residencial.create({ nombre, sucursal_idsucursal });
        res.status(201).json(residencial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los residenciales
const obtenerResidenciales = async (req, res) => {
    try {
        const residenciales = await Residencial.find().populate('sucursal_idsucursal'); // Populate para obtener datos de la sucursal
        res.status(200).json(residenciales);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un residencial por ID
const obtenerResidencialPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const residencial = await Residencial.findById(id).populate('sucursal_idsucursal');
        if (!residencial) {
            return res.status(404).json({ message: 'Residencial no encontrado' });
        }
        res.status(200).json(residencial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un residencial
const actualizarResidencial = async (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const residencial = await Residencial.findByIdAndUpdate(
            id,
            { nombre, sucursal_idsucursal },
            { new: true } // Devuelve el documento actualizado
        ).populate('sucursal_idsucursal');

        if (!residencial) {
            return res.status(404).json({ message: 'Residencial no encontrado' });
        }
        res.status(200).json(residencial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un residencial
const eliminarResidencial = async (req, res) => {
    const { id } = req.params;

    try {
        const residencial = await Residencial.findByIdAndDelete(id);
        if (!residencial) {
            return res.status(404).json({ message: 'Residencial no encontrado' });
        }
        res.status(200).json({ message: 'Residencial eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarResidencial,
    obtenerResidenciales,
    obtenerResidencialPorId,
    actualizarResidencial,
    eliminarResidencial
};