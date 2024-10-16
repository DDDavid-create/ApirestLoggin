const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
async function register(req, res) {
    const { username, email, password } = req.body; // Extrae los datos del cuerpo de la solicitud
    const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
    try {
        const newUser = await User.create({ username, email, password: hashedPassword }); // Crea un nuevo usuario
        res.status(201).json(newUser); // Responde con el usuario creado
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario' }); // Maneja errores
    }
}

// Login de usuario
async function login(req, res) {
    const { email, password } = req.body; // Extrae los datos del cuerpo de la solicitud
    try {
        const user = await User.findOne({ where: { email } }); // Busca al usuario por email
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' }); // Si no se encuentra, responde con error

        const isValid = await bcrypt.compare(password, user.password); // Compara la contraseña
        if (!isValid) return res.status(400).json({ error: 'Contraseña incorrecta' }); // Si no es válida, responde con error

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Genera un token JWT
        res.json({ token }); // Responde con el token
    } catch (error) {
        res.status(400).json({ error: 'Error al iniciar sesión' }); // Maneja errores
    }
}

module.exports = { register, login };
