const express = require('express');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

// Manejo de mensaje
require('./sockets/socket');

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
module.exports.upload = multer({storage}).single('image');

// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

app.use(require('./middlewares/error-handler'));

server.listen(process.env.PORT, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Server listen on port ${process.env.PORT}`);
});
