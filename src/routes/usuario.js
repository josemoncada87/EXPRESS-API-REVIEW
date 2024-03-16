const express = require('express');
const router = express.Router();

// importar el modelo de usuario
const Usuario = require('../models/usuario.js');
// importar la base de datos
const {usuarios, personajes, artefactos} = require('../database/db.js');
const schemaUsuario = require('../schemas/usuario.js');

// obtener todos los usuarios
router.get('/', (req, res) => {
    res.send(usuarios);
});

// obtener un usuario por id
router.get('/:id', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);
    if(!usuario) (
        res.status(404).send('El usuario no fue encontrado')
        );
        res.send(usuario);
    });

// crear un usuario
router.post('/', (req, res) => {
    try {
        schemaUsuario.safeParse(req.body);
        const nuevoUsuario = {...req.body};
        const asObject = new Usuario(nuevoUsuario.id, nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.correo);
        usuarios.push(asObject);
        res.status(201).send(asObject);
    } catch (error) {
        res.send(error.errors);
    }
});

// actualizar un usuario
router.put('/:id', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);
    if(!usuario) (
        res.status(404).send('El usuario no fue encontrado')
        );
        try {
            schemaUsuario.safeParse(req.body);
            const nuevaInfo = {...req.body};
            usuario.nombre = nuevaInfo.nombre;
            usuario.apellido = nuevaInfo.apellido;
            usuario.correo = nuevaInfo.correo;
            res.status(200).send(usuario);
        } catch (error) {
        res.send(error.errors);
    }
});

// eliminar un usuario
router.delete('/:id', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);
    if(!usuario) (
        res.status(404).send('El usuario no fue encontrado')
      );
      const index = usuarios.indexOf(usuario);
      usuarios.splice(index, 1);
      res.status(200).send({"mensaje": "Usuario fue eliminado con éxito"});
});

module.exports = router;
