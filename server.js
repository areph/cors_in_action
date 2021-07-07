"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");

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

// use cookie
app.use(cookieParser());
// use static files
app.use(express.static("public"));

// add CORS middleware
const isPreflight = (req) => {
  const isHttpOptions = req.method === "OPTIONS";
  const hasOriginHeader = req.headers["origin"];
  const hasRequestMethod = req.headers["access-control-request-method"];
  return isHttpOptions && hasOriginHeader && hasRequestMethod;
};
const handleCors = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:9999");
  res.set("Access-Control-Allow-Credentials", "true");
  if (isPreflight(req)) {
    res.set("Access-Control-Allow-Methods", "GET, DELETE");
    res.set("Access-Control-Max-Age", "30");
    res.status(204).end();
    return;
  }
  next();
};
app.use(handleCors);

// API
app.get("/api/posts", (req, res) => {
  res.json(POSTS);
});
app.delete("/api/posts/:id", (req, res) => {
  if (req.cookies["username"] === "owner") {
    delete POSTS[req.params.id];
    res.status(204).end();
  } else {
    res.status(403).end();
  }
});

app.listen(PORT, () =>
  console.log(
    `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
  )
);
