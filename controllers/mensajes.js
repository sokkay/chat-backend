const Mensaje = require('../models/mensaje');

const getMensajes = async (req, res, next) => {
    const myId = req.uid;
    const { to } = req.params;
    console.log(to, myId);

    try {
        const messages = await Mensaje.find({
            $or: [
                { from: myId, to },
                { from: to, to: myId },
            ],
        })
            .sort({ createdAt: 'desc' })
            .limit(30);

        res.status(200).json({
            messages,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMensajes,
};
