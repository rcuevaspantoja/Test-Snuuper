const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcrypt');

const usuariosGet = async(req, res = response) => {

    const usuarios = await Usuario.find();
    res.send(usuarios);
}

 const usuariosPost = async(req, res = response) => {

    const { nombre, contrasena } = req.body;
    try{
        //verifica si existe el usuario
        const usuario = await Usuario.findOne({ nombre });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario no Existe.'
            })
        }

        //verificar contraseña
        const validcontrasena = bcryptjs.compareSync( contrasena, usuario.contrasena );
        if ( !validcontrasena ){
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            });
        }


        res.status(201).send()    
    }catch(err){
        console.log(err)
        res.status(500).send()
    }
}

//Crear Usuario
const usuariosPostCrear = async(req, res = response) => {
    try{
        const nombre = req.body.nombre;
        const contrasena = req.body.contrasena;
        const usuario = new Usuario({nombre, contrasena});

        //encriptación de contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.contrasena = bcryptjs.hashSync( contrasena, salt )

        //graba el usuario en la bdd de Mongoose
        await usuario.save();

        res.json({
            msg: 'Post API - controlador',
        });
        console.log(nombre, ' usuario ingresado a la bdd')
        res.status(201).send()    
    }catch(err){
        console.log(err)
        res.status(500).send()
    }
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPostCrear
}