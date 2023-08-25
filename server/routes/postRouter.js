var express = require('express');
var router = express.Router();
const postController = require("../controllers/postController")
router.get("/", postController.get);
router.get("/:id", postController.getOne)
router.post("/", verifyToken, postController.post);
router.put("/:id", verifyToken,postController.put);
router.delete("/:id", verifyToken, postController.delete);
module.exports = router;


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