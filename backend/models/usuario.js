
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        unique: true
    },
    contrasena: {
        type:String,
        required: [true, 'El campo de contraseña es obligatorio.']
    }
});

module.exports = model( 'Usuario', UsuarioSchema );