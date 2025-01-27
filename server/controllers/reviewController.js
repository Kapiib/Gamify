const Review = require("../models/reviewSchema.js");
const User = require("../models/UserSchema.js");
const Game = require("../models/gamesSchema.js");

const reviewController = {
    createReview: (async (req, res) => {
        const { gameId } = req.params;
        const { comment, recommend, stars } = req.body;
        
        try {
            const email = req.user.email;
            let userId = req.user.id;

            const review = await Review.create({
                user: userId,
                game: gameId,
                comment: comment,
                recommend: recommend,
                stars: stars
            })
            if(review) {
    
                const updateGame = await Game.findByIdAndUpdate(gameId, {$push:{reviews: review._id}});
    
                res.status(201).send({msg: "Review succesfully created", review:review})
            } else {
                res.status(500).send({msg: "Error creating review"})
            };
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }

    }),
    getReviewsByGame: (async (req, res) => {
        const { id } = req.params;

        try {
            const reviews = await Reviews.find({game: id});

            if(reviews) {
                res.status(200).send({msg: "reviws found", reviews:reviews})
            } else {
                res.status(404).send({msg: "No reviews found", reviews:undefined})
            }    
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }

        // return res.status(200).send({msg: "get reviews by game", reviews: await Review.find({games:req.params.id})});

    }),
    getReviewsByUser: (async (req, res) => {
        const { id } = req.params;

        try {
            const reviews = await Reviews.find({user: id});

            if(reviews) {
                res.status(200).send({msg: "reviws found", reviews:reviews})
            } else {
                res.status(404).send({msg: "No reviews found", reviews:undefined})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }

        // return res.status(200).send({msg: "get reviews by game", reviews: await Review.find({user:req.params.id})});

    }),
    getReview: (async (req, res) => {
        const { id } = req.params;

        try {
            const review = await Review.findById(id);

            if(review) {
                res.status(200).send({msg: "found review", review:review})
            } else {
                res.status(404).send({msg: "review not found"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }

    }),
    deleteReview: (async (req, res) => {
        const { id } = req.params;

        try {
            const review = await Review.findByIdAndDelete(id);

            res.status(200).send({msg: "Review deleted"});
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }
    }),
}

module.exports = reviewController;