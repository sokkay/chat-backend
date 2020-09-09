const Usuario = require('../models/usuario');
const ServerError = require('../models/server-error');
const {uploader} = require('../cloudinary/cloudinary');
const { v4 } = require('uuid');

const getUsuarios = async (req, res, next) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
            .sort('-online')
            .skip(desde);

        return res.status(200).json({ usuarios });
    } catch (error) {
        next(errr);
    }
};

const addFriend = async (req, res, next) => {
    const myUid = req.uid;
    const { email } = req.body;

    try {
        const friend = await Usuario.findOne({ email });
        if (!friend) {
            next(new ServerError('No se encontro usuario', 404));
            return;
        }

        const resp = await Usuario.updateOne(
            { _id: myUid },
            {
                $push: {
                    friends: {
                        _id: friend._id,
                    },
                },
            }
        );
        return res.status(200).json({ message: 'Added' });
    } catch (error) {
        next(error);
    }
};

const getFriends = async (req, res, next) => {
    const uid = req.uid;

    try {
        const user = await Usuario.findById({ _id: uid })
            .populate('friends', { name: 1, email: 1, online: 1 })
            .exec();
        const friends = user.friends.map((f) => {
            (f.uid = f._id), delete _id;
            return f;
        });
        return res.status(200).json({ friends });
    } catch (error) {
        next(error);
    }
};

const deleteFriend = async (req, res, next) => {
    const uid = req.uid;
    const uidDelete = req.params.uid;
    try {
        const user = await Usuario.findById({ _id: uid });

        user.friends.pull({ _id: uidDelete });
        await user.save();

        return res.status(200).json({ friends: user.friends });
    } catch (error) {
        next(error);
    }
};

const updateUserImage = async (req, res, next) => {
    const uid = req.uid;
    const image = req.file;
    if(!image){
        next(new ServerError("Debe enviar una imagen", 400))
        return;
    }

    try {
        const user = await Usuario.findById({ _id: uid });
        
        const myFile =  image.originalname.split('.');
        const fileType = myFile[myFile.length - 1];
        const newFilename = v4();

        const cloudPath = 'chat_app/' + uid + '/'+ newFilename;

        return res.status(200).json({
            ok: image.originalname
        });        
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsuarios,
    addFriend,
    getFriends,
    deleteFriend,
    updateUserImage
};
