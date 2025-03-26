const mongoose = require('mongoose');

const lotificacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    sucursal_idsucursal: {
        type: String, // Cambiado a String
        required: true
    }
}, {
    timestamps: true // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Lotificacion', lotificacionSchema);