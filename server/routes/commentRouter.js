var express = require('express');
var router = express.Router();
const commentController = require("../controllers/commentController")
router.get("/", commentController.get);
router.post("/", commentController.post);
router.put("/:id", commentController.put);
router.delete("/:id", commentController.delete);
module.exports = router;