const mongoose = require('mongoose');

const apartamentoSchema = new mongoose.Schema({
    precioventa: {
        type: Number,
        required: true
    },
    modeloApartamento_idmodelo: {
        type: String, // Cambiado a String
        required: true
    }
}, {
    timestamps: true // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Apartamento', apartamentoSchema);