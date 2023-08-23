const asyncHandler = require('express-async-handler');
const Post = require('../models/posts');
const mongoose = require('mongoose');
exports.get = asyncHandler(async (req, res, next) => {
  const getPosts = await Post.find().populate("comments").exec();
  res.json(getPosts)
});

exports.post = asyncHandler(async(req,res,next) => {
  const newPost = new Post({title:req.body.title, text: req.body.text, date: req.body.date, comments: req.body.comments, picture_url: req.body.picture_url, is_published: req.body.is_published})
  const postExists = Post.findOne({title:{ $regex: new RegExp('^' + req.body.title, 'i') }});
  if(postExists)
  {
    res.status(400).json({ error: "A post with a similar title already exists." });

  }
  else
  {try {
    const savedPost = await newPost.save();
    res.json({ message: "Saved successfully", post: savedPost });
  }  catch (error) {
  console.error("Error saving post:", error);
  res.status(500).json({ message: "Failed to save" });}
}})

exports.put = asyncHandler(async(req,res, next) => {
  const parameterId = req.params.id
  if(mongoose.Types.ObjectId.isValid(parameterId)){
  const findPost = await Post.findOne({_id: parameterId})
  if(findPost){
    res.send("post was found");
  }
  else{
    res.send("post was not")
  }}
  else {
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
})

exports.delete = asyncHandler(async(req,res, next) => {
  const parameterId = req.params.id
  if(mongoose.Types.ObjectId.isValid(parameterId)){
  const findPost = await Post.findOne({_id: parameterId})
  if(findPost){
    res.send("post was found");
  }
  else{
    res.send("post was not")
  }}
  else {
    res.status(418).send({message: "parameter id is not an ObjectId"})
  }
  res.json()
})