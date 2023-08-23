const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {type: String, required: true},
    text: {type:String, required: true},
    date: {type:Date, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: "Comments", required:true}],
    picture_url: {type:String},
    is_published: {type: Boolean},
})

module.exports = mongoose.model("Posts", postSchema );