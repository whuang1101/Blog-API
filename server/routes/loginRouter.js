
var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
router.post("/", asyncHandler(async(req,res,next) => {
    // Mock user
    // const user = {
    //   id: 1,
    //   username: "brad",
    //   email:"brad@gmail.com"
    // }
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username:username, password:password});
    if(user) {
            jwt.sign({user}, "secretkey", (err, token) => {
        res.json({
          token
        })
      });
    }
    else{
      res.json({message: "wrong username and password"});
    }
  
  }))

  module.exports = router;