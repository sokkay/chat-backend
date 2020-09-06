const jwt = require('jsonwebtoken');
const ServerError = require('../models/server-error');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        next(new ServerError('No hay token en la petición', 401));
        return;
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
        return;
    } catch (error) {
        next(new ServerError('Token no válido', 401));
        return;
    }
};

module.exports = {
    validarJWT,
};
