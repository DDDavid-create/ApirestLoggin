const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('./src/routes/user');
require('dotenv').config();

const app = express();
app.use(helmet()); // Protección de seguridad
app.use(bodyParser.json()); // Parseo de JSON

// Rutas para el usuario
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
