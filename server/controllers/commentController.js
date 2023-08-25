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
  const authData = jwt.verify(req.token, "secretkey");
  if(authData)
  { 
  const parameterId = req.params.id;
  const updatedComment = req.body;
  if(mongoose.Types.ObjectId.isValid(parameterId)){
  const findComment = await Comment.findOne({_id: parameterId})
  console.log(findComment);
  console.log(updatedComment)
  if(findComment){
    const updateComment = await Comment.findByIdAndUpdate(parameterId, updatedComment);
    if (updateComment){
      res.status(200).send("OK");
    }
  }
  else{
    res.json({message: "post was not"})
  }
  }
  else {
    //Object id is not valid
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
}
})

exports.delete = asyncHandler(async(req,res, next) => {
  const authData = jwt.verify(req.token, "secretkey");
  if(authData)
  { 
  const parameterId = req.body._id;
  if(mongoose.Types.ObjectId.isValid(parameterId)){

  const findComment = await Comment.findOne({_id: parameterId}).exec()
  if(findComment){
    //check if post was found will delete
    console.log(req.params.id)
    const hello = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: findComment._id } },
    );
    const findOne = await Post.findById(req.params.id).exec();
    const deleteComment = await Comment.deleteOne({_id:parameterId});
    res.status(200).json({ message: 'Comment deleted successfully' });
  }
  else{
    res.json({message:"post was not deleted"})
  }}
  else {
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
}})