
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPostCrear } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.post('/crear', usuariosPostCrear);

router.post('/', usuariosPost);  

module.exports = router;