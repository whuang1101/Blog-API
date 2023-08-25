const asyncHandler = require('express-async-handler');
const Post = require('../models/posts');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

exports.get = asyncHandler(async (req, res, next) => {
  const getPosts = await Post.find().populate("comments").exec();
  res.json(getPosts)
});
exports.getOne = asyncHandler(async (req, res, next) => {
  const newId = req.params.id;
  const getPosts = await Post.findOne({_id: newId}).populate("comments").exec();
  console.log(getPosts)
  res.json(getPosts)
});
exports.post = asyncHandler(async(req,res,next) => {
  const newPost = new Post({
    title:req.body.title, 
    text: req.body.text, 
    date: req.body.date,
    comments: req.body.comments, 
    picture_url: req.body.picture_url, 
    is_published: req.body.is_published})
  const postExists = await Post.findOne({title:req.body.title});
  if(postExists)
  {
    res.status(400).json({ error: "A post with a similar title already exists." });
  }
  else
  {try {
    const savedPost = await newPost.save();
    const allPosts = await Post.find().exec();
    res.json(allPosts);
  }  catch (error) {
  console.error("Error saving post:", error);
  res.status(500).json({ message: "Failed to save" });}
}})


exports.put = asyncHandler(async(req,res, next) => {
  const authData = jwt.verify(req.token, "secretkey");
  if(authData)
  { 
    const parameterId = req.params.id
    if(mongoose.Types.ObjectId.isValid(parameterId)){
      const newPost = req.body;
    const findPost = await Post.findOne({_id: parameterId})
    if(findPost){
      const replacePost = await Post.findByIdAndUpdate(parameterId, newPost)
      const allPosts = await Post.find().exec()
      res.json(allPosts);
    }
    else{
    }}
    else {
      res.status(418).send({message: "parameter id is not an ObjectId"})
    }
    res.json()}
})

exports.delete = asyncHandler(async(req,res, next) => {
  const authData = jwt.verify(req.token, "secretkey");
  if(authData)
    {const parameterId = req.params.id
    if(mongoose.Types.ObjectId.isValid(parameterId)){
    const findPost = await Post.findOne({_id: parameterId})
    if(findPost){
      const deleteComment = await Post.deleteOne({_id:parameterId});
      const allPosts = await Post.find().exec();
      res.json(allPosts);
    }
    else{
      res.json({message: "Post not found"})
    }}
    else {
      res.status(418).send({message: "parameter id is not an ObjectId"})
    }}
  else {
    res.sendStatus(404);
  }
})