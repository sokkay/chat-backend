class ServerError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }

    logError() {
        return {
            message,
            statusCode,
        };
    }
}

module.exports = ServerError;
