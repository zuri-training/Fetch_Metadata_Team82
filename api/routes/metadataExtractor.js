const metadataExtract = require("metadata-extract");

const multer = require('multer');
const path = require('path');

//For using piexifjs in photo.
const fs = require('fs');
const piexif = require('piexifjs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// const upload = multer({ dest: path.join(__dirname + '/public/data/uploads/') }).single("uploaded_file");


//using multer to upload files

const setSavedFile = (name, url, data) => {
    tempSavedFile.fileName = name;
    tempSavedFile.fileURL = url;
    tempSavedFile.metadata = data;
    return tempSavedFile
}


const upload = multer({ storage: storage }).single("uploaded_file");

const extractMetadata = (req, res, next) => {
    if (!(!!req.body)) {
        res.status(400).json("Please fill the required inputs!")
        next();
    } else {
        upload(req, res, next, async (err) => {
            if (err) {
                res.status(400).send("Something went wrong!");
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
                    const savedFile = setSavedFile(tempfileName, tempfileURL, tempmetadata);
                } else {
                    const tempfileName = req.file.originalname;
                    const tempfileURL = req.file.path;
                    const tempmetadata = JSON.stringify(finalMetadata);
                    const savedFile = setSavedFile(tempfileName, tempfileURL, tempmetadata); 
                }
            }
            
        });
    }

}


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


module.exports = extractMetadata;