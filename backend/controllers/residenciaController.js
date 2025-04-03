const Residencia = require('../models/residenciaModel');

// Insertar una residencia
const insertarResidencia = async (req, res) => {
    const { estatus, hora, modelo_idmodelo } = req.body;

    try {
        // Validación adicional para estatus 'Cita'
        if (estatus === 'Cita' && !hora) {
            return res.status(400).json({ 
                message: 'La hora es requerida cuando el estatus es "Cita"' 
            });
        }

        // Limpiar hora si no es 'Cita'
        const datosResidencia = {
            estatus,
            modelo_idmodelo,
            hora: estatus === 'Cita' ? hora : undefined
        };

        const residencia = await Residencia.create(datosResidencia);
        res.status(201).json(residencia);
    } catch (error) {
        res.status(400).json({ 
            message: error.message,
            details: error.errors // Muestra detalles de validación de Mongoose
        });
    }
};

// Obtener todas las residencias
const obtenerResidencias = async (req, res) => {
    try {
        const residencias = await Residencia.find()
            .populate('modelo_idmodelo')
            .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

        res.status(200).json(residencias);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al obtener residencias',
            error: error.message 
        });
    }
};

// Obtener residencias por estatus
const obtenerResidenciasPorEstatus = async (req, res) => {
    const { estatus } = req.params;

    try {
        // Validar que el estatus sea uno de los permitidos
        const estatusPermitidos = ['Libre', 'Cita', 'Vendido'];
        if (!estatusPermitidos.includes(estatus)) {
            return res.status(400).json({ 
                message: 'Estatus no válido',
                estatusValidos: estatusPermitidos
            });
        }

        const residencias = await Residencia.find({ estatus })
            .populate('modelo_idmodelo')
            .sort({ hora: 1 }); // Ordenar por hora ascendente

        res.status(200).json(residencias);
    } catch (error) {
        res.status(400).json({ 
            message: `Error al obtener residencias con estatus ${estatus}`,
            error: error.message 
        });
    }
};

// Obtener una residencia por ID
const obtenerResidenciaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const residencia = await Residencia.findById(id)
            .populate('modelo_idmodelo');

        if (!residencia) {
            return res.status(404).json({ 
                message: 'Residencia no encontrada' 
            });
        }

        res.status(200).json(residencia);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al buscar la residencia',
            error: error.message 
        });
    }
};

// Actualizar una residencia
const actualizarResidencia = async (req, res) => {
    const { id } = req.params;
    const { estatus, hora, modelo_idmodelo } = req.body;

    try {
        // Validación para estatus 'Cita'
        if (estatus === 'Cita' && !hora) {
            return res.status(400).json({ 
                message: 'La hora es requerida cuando el estatus es "Cita"' 
            });
        }

        // Preparar datos para actualización
        const datosActualizacion = {
            estatus,
            modelo_idmodelo,
            hora: estatus === 'Cita' ? hora : undefined
        };

        const residencia = await Residencia.findByIdAndUpdate(
            id,
            datosActualizacion,
            { 
                new: true, // Devuelve el documento actualizado
                runValidators: true // Ejecuta validaciones del schema
            }
        ).populate('modelo_idmodelo');

        if (!residencia) {
            return res.status(404).json({ 
                message: 'Residencia no encontrada' 
            });
        }

        res.status(200).json(residencia);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al actualizar la residencia',
            error: error.message,
            details: error.errors // Muestra detalles de validación
        });
    }
};

// Eliminar una residencia
const eliminarResidencia = async (req, res) => {
    const { id } = req.params;

    try {
        const residencia = await Residencia.findByIdAndDelete(id);

        if (!residencia) {
            return res.status(404).json({ 
                message: 'Residencia no encontrada' 
            });
        }

        res.status(200).json({ 
            message: 'Residencia eliminada correctamente',
            residenciaEliminada: residencia 
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error al eliminar la residencia',
            error: error.message 
        });
    }
};

module.exports = {
    insertarResidencia,
    obtenerResidencias,
    obtenerResidenciasPorEstatus,
    obtenerResidenciaPorId,
    actualizarResidencia,
    eliminarResidencia
};