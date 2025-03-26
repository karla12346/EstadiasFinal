const Lote = require('../models/loteModel');

// Insertar un lote
const insertarLote = async (req, res) => {
    const {
        nombre, folio, partida, direccion, longitud, latitud,
        imagen, servicios, descripcion, precioventa, lotificacion_idotificacion
    } = req.body;

    try {
        const lote = await Lote.create({
            nombre, folio, partida, direccion, longitud, latitud,
            imagen, servicios, descripcion, precioventa, lotificacion_idotificacion
        });
        res.status(201).json(lote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los lotes
const obtenerLotes = async (req, res) => {
    try {
        const lotes = await Lote.find().populate('lotificacion_idotificacion'); // Populate para obtener datos de la lotificación
        res.status(200).json(lotes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un lote por ID
const obtenerLotePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const lote = await Lote.findById(id).populate('lotificacion_idotificacion');
        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }
        res.status(200).json(lote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un lote
const actualizarLote = async (req, res) => {
    const { id } = req.params;
    const {
        nombre, folio, partida, direccion, longitud, latitud,
        imagen, servicios, descripcion, precioventa, lotificacion_idotificacion
    } = req.body;

    try {
        const lote = await Lote.findByIdAndUpdate(
            id,
            {
                nombre, folio, partida, direccion, longitud, latitud,
                imagen, servicios, descripcion, precioventa, lotificacion_idotificacion
            },
            { new: true } // Devuelve el documento actualizado
        ).populate('lotificacion_idotificacion');

        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }
        res.status(200).json(lote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un lote
const eliminarLote = async (req, res) => {
    const { id } = req.params;

    try {
        const lote = await Lote.findByIdAndDelete(id);
        if (!lote) {
            return res.status(404).json({ message: 'Lote no encontrado' });
        }
        res.status(200).json({ message: 'Lote eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarLote,
    obtenerLotes,
    obtenerLotePorId,
    actualizarLote,
    eliminarLote
};