const express = require('express');
const { check, validationResult } = require('express-validator');
const route = express.Router();

let usuarios = [
    { id: 1, nombre: "Jason" },
    { id: 2, nombre: "Daniel" },
    { id: 3, nombre: "Jose" },
    { id: 4, nombre: "Marcos" }
];

route.get('/', (req, res) => {
    // res.send(['Jason', 'Daniel']);
    res.send(usuarios);
});

route.get('/:id', (req, res) => {
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario) res.status(404).send('Usuario no encontrado...!');
    res.send(usuario);
});

route.get('/:id/:nombre', (req, res) => {
    let obj = [req.params, req.query] 
    res.send(obj);
});

route.post('/', 
    // body('nombre').isLength({ min: 3 }),
    check('nombre').exists().withMessage('Valor no existe').isLength({ min: 3 }).withMessage('Se requiere minimo 3 caracteres'),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json( errors.array() );

        const usuario = {
            id: usuarios.length + 1,
            nombre: req.body.nombre
        };

        usuarios = [ ...usuarios, usuario ];
        res.send(usuario);

});

route.put('/:id',
    check('nombre').exists().withMessage('Valor no existe').isLength({ min: 3 }).withMessage('Se requiere minimo 3 caracteres'),
    (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json( errors.array() );

        let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
        if(!usuario) res.status(404).send('Usuario no encontrado...!');

        usuario.nombre = req.body.nombre;
        res.send(usuario);

});

route.delete('/:id', (req, res) => {

    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario) res.status(404).send('Usuario no encontrado...!');

    usuarios = usuarios.filter( u => u.id !== usuario.id );
    res.send(usuario);
})

module.exports = route;