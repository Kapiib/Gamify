const express = require("express");
const router = express.Router();

tagController = require('../controllers/tagController.js');

router.get("/", tagController.getAllTags);
router.post("/", tagController.createTag);

router.get("/:id", tagController.getTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

module.exports = router;
