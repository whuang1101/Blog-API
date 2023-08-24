const asyncHandler = require('express-async-handler');
const Comment = require('../models/comments');
const Post = require("../models/posts")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

exports.get = asyncHandler(async (req, res, next) => {
    const getComments = await Comment.find().exec();
    res.json(getComments)
  });

  exports.post = asyncHandler(async (req, res, next) => {
    try {
      const authData = jwt.verify(req.token, "secretkey"); // Verify the token
      // If you reach here, the token is valid and authData contains decoded information
      
      // Create a new comment document
      // const newComment = new Comment({
      //   user: req.body.user,
      //   text: req.body.text,
      //   date: req.body.date,
      //   post: req.body.post,
      // });
  
      // const savedComment = await newComment.save();
  
      // // Associate the comment with the post
      // const post = await Post.findByIdAndUpdate(
      //   req.body.post,
      //   { $push: { comments: savedComment._id } },
      //   { new: true }
      // );
  
      res.json({ message: "Comment saved successfully", authData});
    } catch (error) {
      console.error("Error saving comment and updating post:", error);
      if (error.name === 'JsonWebTokenError') {
        res.sendStatus(403); // Forbidden due to invalid token
      } else {
        res.status(500).json({ message: "Failed to save comment" });
      }
    }
  });

exports.put = asyncHandler(async(req,res, next) => {
  // get parameter :id from req
  const parameterId = req.params.id
  if(mongoose.Types.ObjectId.isValid(parameterId)){
  const findComment = await Comment.findOne({_id: parameterId})
  if(findComment){
    //checks if post was found will update later
    res.send("post was found");
  }
  else{
    res.send("post was not")
  }}
  else {
    //Object id is not valid
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
})

exports.delete = asyncHandler(async(req,res, next) => {
  const parameterId = req.params.id
  if(mongoose.Types.ObjectId.isValid(parameterId)){
  const findComment = await Comment.findOne({_id: parameterId})
  if(findComment){
    //check if post was found will delete
    const deleteComment = await Comment.deleteOne({_id:parameterId});
    res.send("post was deleted");
    await Post.findByIdAndUpdate(
      req.body.post,
      { $pull: { comments: findComment._id } },
    );
  }
  else{
    res.send("post was not")
  }}
  else {
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
  res.json()
})