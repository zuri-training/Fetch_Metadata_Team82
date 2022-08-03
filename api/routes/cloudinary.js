const dotenv = require('dotenv');

dotenv.config();

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARYCLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET
});


exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: 'auto',
            folder: folder
        })
    })
}