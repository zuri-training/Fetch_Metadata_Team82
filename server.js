const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Review = require("./models/reviews")
const path = require("path");

const dburi = "mongodb+srv://chukwujike:freeme@review-cluster.huad07s.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))

app.get("/allreviews", (req, res) => {
    Review.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs')

const userRouter = require("./routes/users")

app.use("/users", userRouter)