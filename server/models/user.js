const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: "string"},
    password: {type: "string"}
})

module.exports = mongoose.model("Users", userSchema );