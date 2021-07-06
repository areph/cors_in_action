"use strict";

const express = require("express");

const HOST = "0.0.0.0";
const PORT = 8080;

// App
const app = express();

// use static files
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(
    `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
  )
);
