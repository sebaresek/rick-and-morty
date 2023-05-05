const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login');
const { postUser } = require('../controllers/postUser'); // Importa la función postUser

router.get('/', login);
router.post('/register', postUser); // Agrega el nuevo manejador de ruta POST

module.exports = router;
