const mongoose = require('mongoose');

// Lista de municipios válidos
const MUNICIPIOS_VALIDOS = [
  "Aguascalientes",
  "Asientos",
  "Calvillo",
  "Cosío",
  "El Llano",
  "Jesús María",
  "Pabellón de Arteaga",
  "Rincón de Romos",
  "San Francisco de los Romo",
  "San José de Gracia",
  "Tepezalá"
];

const sucursalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal es requerido'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
        trim: true
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es requerido'],
        enum: {
            values: MUNICIPIOS_VALIDOS,
            message: 'Municipio no válido. Debe ser uno de: ' + MUNICIPIOS_VALIDOS.join(', ')
        },
        trim: true
    }
}, {
    timestamps: true // Campos createdAt y updatedAt automáticos
});

// Índice para búsquedas más eficientes
sucursalSchema.index({ nombre: 1, municipio: 1 });

module.exports = mongoose.model('Sucursal', sucursalSchema);