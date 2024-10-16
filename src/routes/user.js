const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Ruta de registro
router.post('/register', register);

// Ruta de login
router.post('/login', login);

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
});

module.exports = router;
