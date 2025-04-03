const mongoose = require('mongoose');

const residenciaSchema = new mongoose.Schema({
    estatus: {
        type: String,
        required: true,
        enum: ['Libre', 'Cita', 'Vendido'], // Solo permite estos valores
        default: 'Libre' // Valor por defecto
    },
    hora: {
        type: String,
        required: function() {
            return this.estatus === 'Cita'; // Requerido solo cuando estatus es 'Cita'
        },
        validate: {
            validator: function(v) {
                // Validación básica de formato de hora (HH:MM)
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} no es un formato de hora válido (HH:MM)`
        }
    },
    modelo_idmodelo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModeloResidencia',
        required: true
    }
}, {
    timestamps: true // Campos createdAt y updatedAt automáticos
});

// Método para obtener residencias por estatus
residenciaSchema.statics.findByEstatus = function(estatus) {
    return this.find({ estatus });
};

// Middleware para validar antes de guardar
residenciaSchema.pre('save', function(next) {
    if (this.estatus === 'Vendido') {
        this.hora = undefined; // Limpiar hora si está vendido
    }
    next();
});

module.exports = mongoose.model('Residencia', residenciaSchema);