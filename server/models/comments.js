const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
    user: {type: String, required: true} ,
    text: {type:String, required: true},
    date: {type:Date, required: true},
    post: {type: Schema.Types.ObjectId, ref: "Posts",required: true}
})
module.exports = mongoose.model("Comments", commentsSchema );