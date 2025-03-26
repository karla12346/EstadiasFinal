const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Importamos mongoose directamente
const userController = require('./controllers/userController');
const sucursalControler = require('./controllers/sucursalController')

// Cargar variables de entorno
dotenv.config();

// Conexión a MongoDB
const connectDB = async () => {
    try {
        // Conecta a MongoDB sin opciones obsoletas
        await mongoose.connect(process.env.MONGO_URI);
        
        // Mensaje genérico sin mostrar la URL
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Detiene la aplicación si hay un error de conexión
    }
};

// Llamar a la función de conexión
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sucursales', require('./routes/sucursalRoutes'));
app.use('/api/edificios', require('./routes/edificioRoutes'));
app.use('/api/lotificaciones', require('./routes/lotificacionRoutes'));
app.use('/api/residenciales', require('./routes/residencialRoutes'));
app.use('/api/modelos-apartamento', require('./routes/modeloApartamentoRoutes'));
app.use('/api/lotes', require('./routes/loteRoutes'));
app.use('/api/modelos-residencia', require('./routes/modeloResidenciaRoutes'));
app.use('/api/residencias', require('./routes/residenciaRoutes'));
app.use('/api/apartamentos', require('./routes/apartamentoRoutes')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});