const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

module.exports = {
    uploader: cloudinary.v2.uploader,
    api: cloudinary.v2.api,
};
