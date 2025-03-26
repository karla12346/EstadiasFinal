const Sucursal = require('../models/sucursalModel');

// Lista de municipios válidos (debe coincidir con el modelo)
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

// Insertar una sucursal
const insertarSucursal = async (req, res) => {
    const { nombre, direccion, municipio } = req.body;

    // Validación adicional del municipio
    if (!MUNICIPIOS_VALIDOS.includes(municipio)) {
        return res.status(400).json({ message: 'Municipio no válido' });
    }

    try {
        const sucursal = await Sucursal.create({ nombre, direccion, municipio });
        res.status(201).json(sucursal);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al crear sucursal',
            error: error.message 
        });
    }
};

// Obtener todas las sucursales
const obtenerSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find().sort({ nombre: 1 }); // Ordenadas por nombre
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al obtener sucursales',
            error: error.message 
        });
    }
};

// Obtener una sucursal por ID
const obtenerSucursalPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const sucursal = await Sucursal.findById(id);
        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al buscar sucursal',
            error: error.message 
        });
    }
};

// Actualizar una sucursal
const actualizarSucursal = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, municipio } = req.body;

    // Validación adicional del municipio
    if (municipio && !MUNICIPIOS_VALIDOS.includes(municipio)) {
        return res.status(400).json({ message: 'Municipio no válido' });
    }

    try {
        const sucursal = await Sucursal.findByIdAndUpdate(
            id,
            { nombre, direccion, municipio },
            { 
                new: true, // Devuelve el documento actualizado
                runValidators: true // Ejecuta las validaciones del modelo
            }
        );

        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al actualizar sucursal',
            error: error.message 
        });
    }
};

// Eliminar una sucursal
const eliminarSucursal = async (req, res) => {
    const { id } = req.params;

    try {
        const sucursal = await Sucursal.findByIdAndDelete(id);
        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json({ 
            message: 'Sucursal eliminada correctamente',
            data: sucursal 
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al eliminar sucursal',
            error: error.message 
        });
    }
};

// Obtener sucursales por municipio
const obtenerSucursalesPorMunicipio = async (req, res) => {
    const { municipio } = req.params;

    if (!MUNICIPIOS_VALIDOS.includes(municipio)) {
        return res.status(400).json({ message: 'Municipio no válido' });
    }

    try {
        const sucursales = await Sucursal.find({ municipio }).sort({ nombre: 1 });
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al obtener sucursales por municipio',
            error: error.message 
        });
    }
};

module.exports = {
    insertarSucursal,
    obtenerSucursales,
    obtenerSucursalPorId,
    actualizarSucursal,
    eliminarSucursal,
    obtenerSucursalesPorMunicipio
};