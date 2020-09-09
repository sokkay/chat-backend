/*
    path: api/usuarios
*/
const { Router } = require('express');
const {
    getUsuarios,
    addFriend,
    getFriends,
    deleteFriend,
    updateUserImage,
} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const { upload } = require('../index');

const router = Router();

router
    .use(validarJWT)
    .get('/', getUsuarios)
    .get('/friends', getFriends)
    .post('/friends', addFriend)
    .put('/image', upload, updateUserImage)
    .delete('/friends/:uid', deleteFriend);

module.exports = router;
