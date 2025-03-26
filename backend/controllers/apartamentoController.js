const Apartamento = require('../models/apartamentoModel');

// Insertar un apartamento
const insertarApartamento = async (req, res) => {
    const { precioventa, modeloApartamento_idmodelo } = req.body;

    try {
        const apartamento = await Apartamento.create({ precioventa, modeloApartamento_idmodelo });
        res.status(201).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los apartamentos
const obtenerApartamentos = async (req, res) => {
    try {
        const apartamentos = await Apartamento.find(); // Ya no se usa populate
        res.status(200).json(apartamentos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un apartamento por ID
const obtenerApartamentoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const apartamento = await Apartamento.findById(id); // Ya no se usa populate
        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un apartamento
const actualizarApartamento = async (req, res) => {
    const { id } = req.params;
    const { precioventa, modeloApartamento_idmodelo } = req.body;

    try {
        const apartamento = await Apartamento.findByIdAndUpdate(
            id,
            { precioventa, modeloApartamento_idmodelo },
            { new: true } // Devuelve el documento actualizado
        );

        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un apartamento
const eliminarApartamento = async (req, res) => {
    const { id } = req.params;

    try {
        const apartamento = await Apartamento.findByIdAndDelete(id);
        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json({ message: 'Apartamento eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarApartamento,
    obtenerApartamentos,
    obtenerApartamentoPorId,
    actualizarApartamento,
    eliminarApartamento
};