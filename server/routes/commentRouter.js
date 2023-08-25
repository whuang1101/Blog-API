var express = require('express');
var router = express.Router();
const commentController = require("../controllers/commentController")
router.get("/", commentController.get);
router.post("/", commentController.post);
router.put("/:id",verifyToken,  commentController.put);
router.delete("/:id", verifyToken, commentController.delete);
module.exports = router;


// Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        //split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
        }else {
        //forbidden
        res.sendStatus(403)
    }
}