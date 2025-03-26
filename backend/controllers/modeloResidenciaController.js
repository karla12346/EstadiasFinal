const ModeloResidencia = require('../models/modeloResidenciaModel');

// Insertar un modelo de residencia
const insertarModeloResidencia = async (req, res) => {
    const {
        terreno, metrosconstruccion, niveles, cuartos, folio, partida,
        direccionDicabi, longitud, latitud, residencial_idresidencial
    } = req.body;

    try {
        const modeloResidencia = await ModeloResidencia.create({
            terreno, metrosconstruccion, niveles, cuartos, folio, partida,
            direccionDicabi, longitud, latitud, residencial_idresidencial
        });
        res.status(201).json(modeloResidencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los modelos de residencia
const obtenerModelosResidencia = async (req, res) => {
    try {
        const modelosResidencia = await ModeloResidencia.find().populate('residencial_idresidencial'); // Populate para obtener datos del residencial
        res.status(200).json(modelosResidencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un modelo de residencia por ID
const obtenerModeloResidenciaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const modeloResidencia = await ModeloResidencia.findById(id).populate('residencial_idresidencial');
        if (!modeloResidencia) {
            return res.status(404).json({ message: 'Modelo de residencia no encontrado' });
        }
        res.status(200).json(modeloResidencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un modelo de residencia
const actualizarModeloResidencia = async (req, res) => {
    const { id } = req.params;
    const {
        terreno, metrosconstruccion, niveles, cuartos, folio, partida,
        direccionDicabi, longitud, latitud, residencial_idresidencial
    } = req.body;

    try {
        const modeloResidencia = await ModeloResidencia.findByIdAndUpdate(
            id,
            {
                terreno, metrosconstruccion, niveles, cuartos, folio, partida,
                direccionDicabi, longitud, latitud, residencial_idresidencial
            },
            { new: true } // Devuelve el documento actualizado
        ).populate('residencial_idresidencial');

        if (!modeloResidencia) {
            return res.status(404).json({ message: 'Modelo de residencia no encontrado' });
        }
        res.status(200).json(modeloResidencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un modelo de residencia
const eliminarModeloResidencia = async (req, res) => {
    const { id } = req.params;

    try {
        const modeloResidencia = await ModeloResidencia.findByIdAndDelete(id);
        if (!modeloResidencia) {
            return res.status(404).json({ message: 'Modelo de residencia no encontrado' });
        }
        res.status(200).json({ message: 'Modelo de residencia eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarModeloResidencia,
    obtenerModelosResidencia,
    obtenerModeloResidenciaPorId,
    actualizarModeloResidencia,
    eliminarModeloResidencia
};