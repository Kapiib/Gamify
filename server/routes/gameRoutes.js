const express = require("express");
const router = express.Router();

gameController = require("../controllers/gameController.js")

router.get("/", gameController.getAllGames);
router.post("/", gameController.createGame);

router.get("/:id", gameController.getGame);
router.put("/:id", gameController.editGame);
router.delete("/:id", gameController.deleteGame);

module.exports = router;