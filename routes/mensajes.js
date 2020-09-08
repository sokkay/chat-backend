/*
    path: api/mensajes
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMensajes } = require('../controllers/mensajes');

const router = Router();

router
    .use(validarJWT)
    .get('/:to', getMensajes);

module.exports = router;
