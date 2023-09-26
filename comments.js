// Create web server
// 1. npm init
// 2. npm i express
// 3. npm i nodemon --save-dev
// 4. npm i body-parser
// 5. npm i mongoose
// 6. npm i cors
// 7. npm i dotenv

// 1. Import express
const express = require("express");
// 2. Import cors
const cors = require("cors");
// 3. Import body-parser
const bodyParser = require("body-parser");
// 4. Import mongoose
const mongoose = require("mongoose");
// 5. Import dotenv
require("dotenv").config();

// 6. Create express app
const app = express();

// 7. Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 8. Use cors
app.use(cors());

// 9. Connect to database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 10. Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

// 11. Create model
const Comment = mongoose.model("Comment", commentSchema);

// 12. Create routes
// Get all comments
app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

// Post a comment
app.post("/comments", async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });
  await comment.save();
  res.send(comment);
});

// Delete a comment
app.delete("/comments/:id", async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  res.send(comment);
});

// 13. Listen to port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});