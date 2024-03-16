const express = require('express');
const router = express.Router();
const z = require('zod');

// importar el modelo de personaje
const Personaje = require('../models/personaje.js');
const {usuarios, personajes, artefactos} = require('../database/db.js');
const schemaPersonaje = require('../schemas/personaje.js');

// obtener todos los usuarios
router.get('/', (req, res) => {
    res.send(personajes);
});
// obtener un usuario por id
router.get('/:id', (req, res) => {
    const personaje = personajes.find(personaje => personaje.id === req.params.id);
      if(!personaje) (
          res.status(404).send('El personaje no fue encontrado')
      );
    res.status(200).send(personaje);
    });
    // crear un usuario
    router.post('/', (req, res) => {
        try {
            schemaPersonaje.safeParse(req.body);
            const nuevoPersonaje = {...req.body};
            const asObject = new Personaje(nuevoPersonaje.id, nuevoPersonaje.nombre, nuevoPersonaje.nivel, nuevoPersonaje.clase, nuevoPersonaje.usuario_id);
            personajes.push(asObject);
            res.status(201).send(asObject);
        } catch (error) {
            res.send(error.errors);
        }
    });
    // actualizar un usuario
    router.put('/:id', (req, res) => {
        res.send('GET request to the homepage');
    });
    // eliminar un usuario
    router.delete('/:id', (req, res) => {
        res.send('GET request to the homepage');
    });

    module.exports = router;
