const mongoose = require('mongoose');

const apartamentoSchema = new mongoose.Schema({
    precioventa: {
        type: Number,
        required: [true, 'El precio de venta es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    modeloApartamento_idmodelo: {
        type: String,
        required: [true, 'El modelo de apartamento es obligatorio'],
        trim: true,
        maxlength: [100, 'El modelo no puede exceder los 100 caracteres']
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres'],
        default: ''
    },
    estado: {
        type: String,
        enum: {
            values: ['disponible', 'reservado', 'vendido'],
            message: 'Estado no válido. Los valores permitidos son: disponible, reservado, vendido'
        },
        default: 'disponible'
    },
    
}, {
    timestamps: true, // Agrega campos de creación (createdAt) y actualización (updatedAt)
    versionKey: false // Desactiva el campo __v que Mongoose añade por defecto
});

// Opcional: Índices para mejorar performance en búsquedas frecuentes
apartamentoSchema.index({ modeloApartamento_idmodelo: 1 });
apartamentoSchema.index({ estado: 1 });
apartamentoSchema.index({ precioventa: 1 });

// Método para formatear los datos que se devuelven en las respuestas
apartamentoSchema.methods.toJSON = function() {
    const { _id, ...apartamento } = this.toObject();
    apartamento.id = _id;
    return apartamento;
};

module.exports = mongoose.model('Apartamento', apartamentoSchema);