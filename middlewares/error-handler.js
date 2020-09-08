const ServerError = require('../models/server-error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        console.log(err.message);
        return res.status(err.statusCode).json({
            errors: {
                error: err.message, 
            },
        });
    } else {
        console.error(err);
        return res.status(500).json({
            errors: {
                error: 'Comuniquese con el administrador',
            },
        });
    }
};

module.exports = errorHandler;
