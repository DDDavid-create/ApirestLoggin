const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Verificar la conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
