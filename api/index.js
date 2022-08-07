const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();


mongoose.connect(
    process.env.MONGODB_URL

).then(
    () => {
        console.log("DB connected successfully!");
    }
).catch(
    (error) => {
        console.log(error);
    }
)


const metadataExtractor = require("./routes/metadataExtractor");
const authRoute = require("./routes/auth")
const fileRoute = require("./routes/file")
const fileDownloadRoute = require("./routes/downloadFile")
const reviewRoute = require("./routes/review");

const PORT = process.env.PORT || 3000;

const path = require("path")
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('FrontEnd'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./FrontEnd/SignIn page/index.html'))
});

// app.use('/upload', metadataExtractor);
app.use('/auth', authRoute);
app.use('/files', fileRoute);
app.use('/download-file', fileDownloadRoute);
app.use('/review', reviewRoute);


//ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("Sorry, route could not be located!");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
});

// For  Vercel to turn Express into a serverless function

module.exports = app;
