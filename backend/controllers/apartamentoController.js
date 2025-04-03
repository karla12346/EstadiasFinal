const Apartamento = require('../models/apartamentoModel');

// Insertar un apartamento
const insertarApartamento = async (req, res) => {
    const { precioventa, modeloApartamento_idmodelo, descripcion, estado } = req.body;

    try {
        const apartamento = await Apartamento.create({ 
            precioventa, 
            modeloApartamento_idmodelo,
            descripcion: descripcion || '',
            estado: estado || 'disponible'
        });
        res.status(201).json(apartamento);
    } catch (error) {
        // Mejor manejo de errores de validación
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los apartamentos (con filtros opcionales)
const obtenerApartamentos = async (req, res) => {
    const { estado, search } = req.query;
    const query = {};
    
    // Filtro por estado si está presente
    if (estado) {
        query.estado = estado;
    }
    
    // Búsqueda en modelo y descripción si hay término de búsqueda
    if (search) {
        query.$or = [
            { modeloApartamento_idmodelo: { $regex: search, $options: 'i' } },
            { descripcion: { $regex: search, $options: 'i' } }
        ];
    }

    try {
        const apartamentos = await Apartamento.find(query)
            .sort({ createdAt: -1 }); // Ordenar por más reciente primero
        res.status(200).json(apartamentos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un apartamento por ID
const obtenerApartamentoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const apartamento = await Apartamento.findById(id);
        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un apartamento
const actualizarApartamento = async (req, res) => {
    const { id } = req.params;
    const { precioventa, modeloApartamento_idmodelo, descripcion, estado } = req.body;

    try {
        const apartamento = await Apartamento.findByIdAndUpdate(
            id,
            { 
                precioventa, 
                modeloApartamento_idmodelo,
                descripcion,
                estado 
            },
            { 
                new: true, // Devuelve el documento actualizado
                runValidators: true // Ejecuta validaciones del modelo
            }
        );

        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json(apartamento);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un apartamento
const eliminarApartamento = async (req, res) => {
    const { id } = req.params;

    try {
        const apartamento = await Apartamento.findByIdAndDelete(id);
        if (!apartamento) {
            return res.status(404).json({ message: 'Apartamento no encontrado' });
        }
        res.status(200).json({ 
            message: 'Apartamento eliminado correctamente',
            deletedApartamento: apartamento // Opcional: devolver el documento eliminado
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    insertarApartamento,
    obtenerApartamentos,
    obtenerApartamentoPorId,
    actualizarApartamento,
    eliminarApartamento
};