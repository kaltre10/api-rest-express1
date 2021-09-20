const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');

app.use(express.json());
app.use('/api/usuarios', usuarios);

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...!`);
});