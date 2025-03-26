const mongoose = require('mongoose');

const residenciaSchema = new mongoose.Schema({
    precioventa: {
        type: Number,
        required: true
    },
    modelo_idmodelo: {
        type: mongoose.Schema.Types.ObjectId, // Clave foránea
        ref: 'ModeloResidencia', // Referencia al modelo "ModeloResidencia"
        required: true
    }
}, {
    timestamps: true // Agrega campos de creación y actualización automáticamente
});

module.exports = mongoose.model('Residencia', residenciaSchema);