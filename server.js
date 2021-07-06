"use strict";

const express = require("express");

const HOST = "0.0.0.0";
const PORT = 9999;

// Blog posts
const POSTS = {
  1: { post: "This is the first blog post." },
  2: { post: "This is the second blog post." },
  3: { post: "This is the third blog post." },
};

// App
const app = express();

// use static files
app.use(express.static("public"));

// API
app.get("/api/posts", (req, res) => {
  res.json(POSTS);
});

app.listen(PORT, () =>
  console.log(
    `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
  )
);
