const mongoose = require('mongoose');

const residencialSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    sucursal_idsucursal: {
        type: mongoose.Schema.Types.ObjectId, // Clave foránea
        ref: 'Sucursal', // Referencia al modelo "Sucursal"
        required: true
    }
}, {
    timestamps: true // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Residencial', residencialSchema);