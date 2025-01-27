const express = require("express");
const router = express.Router();

reviewController = require("../controllers/reviewController.js");
const verifyJwt = require("../middleware/verifyToken.js");

router.post("/:gameId", verifyJwt, reviewController.createReview);
router.get("/games/:id", reviewController.getReviewsByGame);
router.get("/user/:id", reviewController.getReviewsByUser);

router.get("/:id", reviewController.getReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;