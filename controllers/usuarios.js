const Usuario = require('../models/usuario');

const getUsuarios = async (req, res, next) => {
    const desde = Number(req.query.desde) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde);
    
    return res.status(200).json({ usuarios });
};

module.exports = {
    getUsuarios,
};
