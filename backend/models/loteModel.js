const mongoose = require('mongoose');

const loteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    folio: {
        type: String,
        required: true
    },
    partida: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    longitud: {
        type: String,
        required: true
    },
    latitud: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    servicios: {
        type: String, // Cambiado a String
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioventa: {
        type: Number,
        required: true
    },
    lotificacion_idotificacion: {
        type: String, // Cambiado a String
        required: true
    }
}, {
    timestamps: true // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Lote', loteSchema);