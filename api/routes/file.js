const router = require('express').Router();
const { verifyTokenAndAuthorization } = require('./verifyToken')
const File = require('../models/File');
const metadataExtract = require("metadata-extract");
const dotenv = require('dotenv');

dotenv.config();

const multer = require('multer');
const path = require('path');

//For using piexifjs in photo.
const fs = require('fs');
const piexif = require('piexifjs');

//For uploading files to cloudinary
const cloudinary = require('./cloudinary');

//upload file
//using multer to upload files

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage }).single("uploaded_file");

router.post('/:userId', verifyTokenAndAuthorization, async (req, res, next) => {
    //This if block has to be updated (only the if block)

    try {
        upload(req, res, async (err) => {
            try {
                if (err) {
                    return next(err);
                } else {
                    const metadatasmall = await metadataExtract(req.file.path);
                    if (req.file.mimetype === 'image/jpeg') {
                        const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
                        const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));

                        const exifData = getExifFromJpegFile(req.file.path);

                        const metadata = debugExif(exifData);
                        const finalMetadata = { ...metadatasmall, ...metadata }

                        const tempfileName = req.file.originalname;
                        const tempfileURL = req.file.path;
                        const tempmetadata = JSON.stringify(finalMetadata);
                        tempsavedFile = await setSavedFile(tempfileName, tempfileURL, tempmetadata);

                        tempsavedFile.userId = req.params.userId;
                        const newFile = new File(tempsavedFile);
                        const savedFile = await newFile.save();
                        res.status(200).json(savedFile);
                    } else {
                        const tempfileName = req.file.originalname;
                        const tempfileURL = req.file.path;
                        const tempmetadata = JSON.stringify(metadatasmall);
                        const tempsavedFile = await setSavedFile(tempfileName, tempfileURL, tempmetadata);

                        tempsavedFile.userId = req.params.userId;
                        const newFile = new File(tempsavedFile);
                        const savedFile = await newFile.save();
                        res.status(200).json(savedFile);
                    }
                }
            } catch (err) {
                return next(err);
            }
        });
    } catch (err) {
        return next(err);
    }
}
);


//get a single file
router.get('/:userId/:fileName', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const file = await File.findOne({
            userId: req.params.userId,
            fileName: req.params.fileName
        })
        res.status(200).json(file._doc);
    } catch (err) {
        return next(err);
    }
})

//get all files
router.get('/:userId', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const files = await File.find({
            userId: req.params.userId
        })
        res.status(200).json(files);
    } catch (err) {
        return next(err);
    }
})

function debugExif(exif) {
    const finalData = {};
    for (const ifd in exif) {
        if (ifd == 'thumbnail') {
            const thumbnailData = exif[ifd] === null ? "null" : exif[ifd];
            finalData.thumbnail = thumbnailData;
        } else {
            for (const tag in exif[ifd]) {
                finalData[`${piexif.TAGS[ifd][tag]['name']}`] = exif[ifd][tag]
            }
        }
    }
    return finalData;
}

async function setSavedFile(tempfileName, tempfileURL, tempmetadata) {

    let tempsavedFile = {}
    let cloudfileUrl = ""

    // Saving file to cloudinary
    const uploader = async (path) => await cloudinary.uploads(path, "MetadataFiles")

    await uploader(tempfileURL).then((result) => {
        cloudfileUrl = result.url
    })
    tempsavedFile.fileName = tempfileName;
    tempsavedFile.fileURL = cloudfileUrl;
    tempsavedFile.metadata = tempmetadata;
    return tempsavedFile
}

module.exports = router