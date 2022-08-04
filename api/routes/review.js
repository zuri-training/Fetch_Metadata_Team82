const express = require("express")
const router = express.Router()
const Review = require("../models/Review")

router.get("/", async (req, res, next) => {
    await Review.find().then((result) => {
        // res.render("user/index", { title: "All Reviews", reviews: result })
        res.status(200).json(result);
    }).catch((err) => {
        next(err);
    });
})

// router.get("/new", (req, res) => {
//     res.render("user/new")
// })

router.post("/", async (req, res, next) => {
    try {
        const isValid = true
        if (isValid) {
            const review = new Review({
                username: req.body.username,
                rating: req.body.rating,
                review_string: req.body.review_string
            });

            await review.save().then((result) => {
                res.send(result)
            }).catch((err) => {
                next(err);
            });
            // res.redirect("/users")
        } else {
            console.log("Error")
            res.render("users/new", { firstName: req.body.firstName, title: req.body.review_title, review_string: req.body.review_test })
        }
    } catch(err) {
        next(err);
    }
})


module.exports = router