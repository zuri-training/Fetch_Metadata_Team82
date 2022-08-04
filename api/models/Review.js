const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review_string: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.model("review", reviewSchema)
module.exports = Review;