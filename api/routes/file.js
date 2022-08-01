const router = require('express').Router();
const { verifyTokenAndAuthorization } = require('./verifyToken')
const File = require('../models/File');
const metadataExtract = require("metadata-extract");

const multer = require('multer');
const path = require('path');

//For using piexifjs in photo.
const fs = require('fs');
const piexif = require('piexifjs');



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
    if (req.body == {}) {
        return res.status(400).json("Please fill the required inputs!")
    } else {
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
                            tempsavedFile = setSavedFile(tempfileName, tempfileURL, tempmetadata);

                            tempsavedFile.userId = req.params.userId;
                            const newFile = new File(tempsavedFile);
                            const savedFile = await newFile.save();
                            res.status(200).json(savedFile);
                        } else {
                            const tempfileName = req.file.originalname;
                            const tempfileURL = req.file.path;
                            const tempmetadata = JSON.stringify(metadatasmall);
                            const tempsavedFile = setSavedFile(tempfileName, tempfileURL, tempmetadata);

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
});



router.get('/file/:userId/:fileName', verifyTokenAndAuthorization, async (req, res, next) => {
    try {
        const file = await File.findOne({
            userId: req.params.userId,
            fileName: req.params.fileName
        })
        console.log(file._doc);
        res.status(200).json(file._doc);


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

function setSavedFile(tempfileName, tempfileURL, tempmetadata) {
    let tempsavedFile = {}
    tempsavedFile.fileName = tempfileName;
    tempsavedFile.fileURL = tempfileURL;
    tempsavedFile.metadata = tempmetadata;
    return tempsavedFile
}

module.exports = router