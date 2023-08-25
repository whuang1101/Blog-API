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
      const newComment = new Comment({
        user: req.body.user,
        text: req.body.text,
        date: req.body.date,
        post: req.body.post,
      });
      console.log(newComment);
      const savedComment = await newComment.save();
  
      // Associate the comment with the post
      const post = await Post.findByIdAndUpdate(
        req.body.post,
        { $push: { comments: savedComment._id } },
        { new: true }
      );
      const findPost = await Post.findById(req.body.post);
      res.json(findPost);
    
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