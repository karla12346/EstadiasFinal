const Edificio = require('../models/edificioModel');

// Insertar un edificio
const insertarEdificio = async (req, res) => {
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const edificio = await Edificio.create({ nombre, sucursal_idsucursal });
        res.status(201).json(edificio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los edificios
const obtenerEdificios = async (req, res) => {
    try {
        const edificios = await Edificio.find().populate('sucursal_idsucursal'); // Populate para obtener datos de la sucursal
        res.status(200).json(edificios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un edificio por ID
const obtenerEdificioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const edificio = await Edificio.findById(id).populate('sucursal_idsucursal');
        if (!edificio) {
            return res.status(404).json({ message: 'Edificio no encontrado' });
        }
        res.status(200).json(edificio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un edificio
const actualizarEdificio = async (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal_idsucursal } = req.body;

    try {
        const edificio = await Edificio.findByIdAndUpdate(
            id,
            { nombre, sucursal_idsucursal },
            { new: true } // Devuelve el documento actualizado
        ).populate('sucursal_idsucursal');

        if (!edificio) {
            return res.status(404).json({ message: 'Edificio no encontrado' });
        }
        res.status(200).json(edificio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un edificio
const eliminarEdificio = async (req, res) => {
    const { id } = req.params;

    try {
        const edificio = await Edificio.findByIdAndDelete(id);
        if (!edificio) {
            return res.status(404).json({ message: 'Edificio no encontrado' });
        }
        res.status(200).json({ message: 'Edificio eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarEdificio,
    obtenerEdificios,
    obtenerEdificioPorId,
    actualizarEdificio,
    eliminarEdificio
};