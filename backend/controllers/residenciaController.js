const Residencia = require('../models/residenciaModel');

// Insertar una residencia
const insertarResidencia = async (req, res) => {
    const { precioventa, modelo_idmodelo } = req.body;

    try {
        const residencia = await Residencia.create({ precioventa, modelo_idmodelo });
        res.status(201).json(residencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las residencias
const obtenerResidencias = async (req, res) => {
    try {
        const residencias = await Residencia.find().populate('modelo_idmodelo'); // Populate para obtener datos del modelo de residencia
        res.status(200).json(residencias);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una residencia por ID
const obtenerResidenciaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const residencia = await Residencia.findById(id).populate('modelo_idmodelo');
        if (!residencia) {
            return res.status(404).json({ message: 'Residencia no encontrada' });
        }
        res.status(200).json(residencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una residencia
const actualizarResidencia = async (req, res) => {
    const { id } = req.params;
    const { precioventa, modelo_idmodelo } = req.body;

    try {
        const residencia = await Residencia.findByIdAndUpdate(
            id,
            { precioventa, modelo_idmodelo },
            { new: true } // Devuelve el documento actualizado
        ).populate('modelo_idmodelo');

        if (!residencia) {
            return res.status(404).json({ message: 'Residencia no encontrada' });
        }
        res.status(200).json(residencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una residencia
const eliminarResidencia = async (req, res) => {
    const { id } = req.params;

    try {
        const residencia = await Residencia.findByIdAndDelete(id);
        if (!residencia) {
            return res.status(404).json({ message: 'Residencia no encontrada' });
        }
        res.status(200).json({ message: 'Residencia eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarResidencia,
    obtenerResidencias,
    obtenerResidenciaPorId,
    actualizarResidencia,
    eliminarResidencia
};