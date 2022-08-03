const express = require("express")
const router = express.Router()
const Review = require("../models/reviews")

router.get("/index", (req, res) => {
    Review.find().then((result) => {
        res.render("user/index", {title: "All Reviews", reviews: result})
    }).catch((err) => {
        console.log(err)
    });
})

router.get("/new", (req, res) => {
    res.render("user/new")
})

router.post("/", (req, res) => {
    const isValid = true
    if (isValid){
        const review = new Review({
            name: req.body.username,
            title: req.body.review_title,
            review_string: req.body.review_test
        });
    
        review.save().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
        res.redirect("/users")
    } else {
        console.log("Error")
        res.render("users/new", { firstName: req.body.firstName, title: req.body.review_title, review_string: req.body.review_test})
    }
})


module.exports = router