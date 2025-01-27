const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true},

    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },

    comment: String,
    recommend: Boolean,
    stars:{
        type: Number, 
        min: [1, "please give a positive integer between 1 and 6"], 
        max: [5, "please give a positive integer between 1 and 6"]}

})

const review = model("Review", reviewSchema);

module.exports = review;