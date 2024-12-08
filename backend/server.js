const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const COMMENTS_FILE = "comments.json";

function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
}

function writeComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

app.get("/comments", (req, res) => {
  const comments = readComments();
  res.json(comments);
});

app.post("/comments", (req, res) => {
  const { comment, email, anonymous } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Коментар обов'язковий!" });
  }

  const newComment = {
    comment,
    email: anonymous ? null : email,
    date: new Date().toISOString(),
  };

  const comments = readComments();
  comments.push(newComment);
  writeComments(comments);

  res.status(201).json({ message: "Коментар додано!" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
