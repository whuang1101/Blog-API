const asyncHandler = require('express-async-handler');
const Comment = require('../models/comments');
const Post = require("../models/posts")
const mongoose = require('mongoose');

exports.get = asyncHandler(async (req, res, next) => {
    const getComments = await Comment.find().exec();
    res.json(getComments)
  });

exports.post = asyncHandler(async (req, res, next) => {
  try {
    // Create a new comment document
    const newComment = new Comment({
      user: req.body.user,
      text: req.body.text,
      date: req.body.date,
      post: req.body.post,
    });
    const savedComment = await newComment.save();

    // Find the saved comment in order to retrieve its _id
    const findComment = await Comment.findOne({
      user: req.body.user,
      text: req.body.text,
    });

    // Associate the comment with the post
    await Post.findByIdAndUpdate(
      req.body.post,
      { $push: { comments: findComment._id } },
      { new: true }
    );

    res.json({ message: "Comment saved successfully", post: savedComment });
  } catch (error) {
    console.error("Error saving comment and updating post:", error);
    res.status(500).json({ message: "Failed to save comment" });
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