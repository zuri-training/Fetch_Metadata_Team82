const express = require('express');
const router = express.Router();
const http = require('http');

const { verifyTokenAndAuthorization } = require('./verifyToken')

//download file
router.get('/', (req, res, next) => {

    //actual code to be used
    const downloadUrl = req.body.fileUrl
    const fileName = req.body.fileName

    //this is test assignment
    // const downloadUrl = "http://res.cloudinary.com/fitfitmeme/image/upload/v1659540889/MetadataFiles/nzonoehywm1vzrwnounv.pdf"
    // const fileName = "git and github.pdf"
    //test assignment ends

    http.get(downloadUrl, function (file) {

        res.set('Content-disposition', 'attachment; filename=' + (fileName));
        res.set('Content-Type', file.rawHeaders[1])

        file.pipe(res);
    });
})

module.exports = router;