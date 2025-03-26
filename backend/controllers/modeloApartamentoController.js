const ModeloApartamento = require('../models/modeloApartamentoModel');

// Insertar un modelo de apartamento
const insertarModeloApartamento = async (req, res) => {
    const {
        metrosconstruccion, niveles, cuartos, baños, folio, partida,
        direccionDicabi, longitud, latitud, numero, edificio_idedificio, edificio_sucursal_idsucursal
    } = req.body;
//
    try {
        const modeloApartamento = await ModeloApartamento.create({
            metrosconstruccion, niveles, cuartos, baños, folio, partida,
            direccionDicabi, longitud, latitud, numero, edificio_idedificio, edificio_sucursal_idsucursal
        });
        res.status(201).json(modeloApartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los modelos de apartamento
const obtenerModelosApartamento = async (req, res) => {
    try {
        const modelosApartamento = await ModeloApartamento.find()
            .populate('edificio_idedificio') // Populate para obtener datos del edificio
            .populate('edificio_sucursal_idsucursal'); // Populate para obtener datos de la sucursal
        res.status(200).json(modelosApartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un modelo de apartamento por ID
const obtenerModeloApartamentoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const modeloApartamento = await ModeloApartamento.findById(id)
            .populate('edificio_idedificio') // Populate para obtener datos del edificio
            .populate('edificio_sucursal_idsucursal'); // Populate para obtener datos de la sucursal

        if (!modeloApartamento) {
            return res.status(404).json({ message: 'Modelo de apartamento no encontrado' });
        }
        res.status(200).json(modeloApartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un modelo de apartamento
const actualizarModeloApartamento = async (req, res) => {
    const { id } = req.params;
    const {
        metrosconstruccion, niveles, cuartos, baños, folio, partida,
        direccionDicabi, longitud, latitud, numero, edificio_idedificio, edificio_sucursal_idsucursal
    } = req.body;

    try {
        const modeloApartamento = await ModeloApartamento.findByIdAndUpdate(
            id,
            {
                metrosconstruccion, niveles, cuartos, baños, folio, partida,
                direccionDicabi, longitud, latitud, numero, edificio_idedificio, edificio_sucursal_idsucursal
            },
            { new: true } // Devuelve el documento actualizado
        )
            .populate('edificio_idedificio') // Populate para obtener datos del edificio
            .populate('edificio_sucursal_idsucursal'); // Populate para obtener datos de la sucursal

        if (!modeloApartamento) {
            return res.status(404).json({ message: 'Modelo de apartamento no encontrado' });
        }
        res.status(200).json(modeloApartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un modelo de apartamento
const eliminarModeloApartamento = async (req, res) => {
    const { id } = req.params;

    try {
        const modeloApartamento = await ModeloApartamento.findByIdAndDelete(id);
        if (!modeloApartamento) {
            return res.status(404).json({ message: 'Modelo de apartamento no encontrado' });
        }
        res.status(200).json({ message: 'Modelo de apartamento eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarModeloApartamento,
    obtenerModelosApartamento,
    obtenerModeloApartamentoPorId,
    actualizarModeloApartamento,
    eliminarModeloApartamento
};