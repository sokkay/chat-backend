const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const {
    usuarioConectado,
    usuarioDesconectado,
    saveMessage,
} = require('../controllers/socket');

io.on('connection', (client) => {
    //verifica la coneccion
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) {
        return client.disconnect();
    }

    // Cliente autenticado
    usuarioConectado(uid);
    console.log('Cliente conectado');

    // ingresar al usuario a una sala
    client.join(uid);
    client.on('mensaje-personal', async (data) => {
        await saveMessage(data);
        io.to(data.to).emit('mensaje-personal', data);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });
});
