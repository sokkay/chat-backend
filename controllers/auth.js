const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const ServerError = require('../models/server-error');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response, next) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            next(new ServerError('El correo ya esta registrado', 400));
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        return res.status(201).json({
            usuario,
            token,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            next(new ServerError('La contraseña o email no es válida', 400));
            return;
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            next(new ServerError('La contraseña o email no es válida', 400));
            return;
        }
        const token = await generarJWT(usuarioDB.id);

        return res.status(200).json({
            usuario: usuarioDB,
            token,
        });
    } catch (error) {
        next(error);
    }
};

const renewToken = async (req, res, next) => {
    const uid = req.uid;

    try {
        const usuario = await Usuario.findById(uid);
        const token = await generarJWT(uid);

        return res.status(200).json({
            usuario,
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    crearUsuario,
    login,
    renewToken,
};
