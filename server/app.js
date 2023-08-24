const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();
mongoDb = process.env.SECRET_KEY;

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
const Posts = require("./models/posts");
const Comments = require("./models/comments")
const postRouter = require("./routes/postRouter")
const commentRouter = require("./routes/commentRouter")
const loginRouter = require("./routes/loginRouter")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/posts', postRouter);
app.use('/comments',commentRouter)
app.use('/login', loginRouter)
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
  