'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const HOST = '0.0.0.0';
const PORT = 9999;

// Blog posts
const POSTS = {
  1: { post: 'This is the first blog post.' },
  2: { post: 'This is the second blog post.' },
  3: { post: 'This is the third blog post.' },
};

// App
const app = express();

// use cookie
app.use(cookieParser());
// use static files
app.use(express.static('public'));

// CORS middleware ---------------------------
// origin whitelist
const originWhitelist = [
  'http://localhost:9999',
  'https://4421999350dd.ngrok.io',
];
const craeteWhitellistValidator = (whitelist) => {
  return (value) => {
    for (const origin of whitelist) {
      console.log(origin);
      if (value === origin) {
        return true;
      }
    }
    return false;
  };
};

// CORS Options
const corsOptions = {
  allowOrigin: craeteWhitellistValidator(originWhitelist),
};
// CORS handling
const handleCors = (options) => {
  return (req, res, next) => {
    if (options.allowOrigin) {
      const origin = req.headers['origin'];
      if (options.allowOrigin(origin)) {
        res.set('Access-Control-Allow-Origin', origin);
      }
    } else {
      res.set('Access-Control-Allow-Origin', '*');
    }
    next();
  };
};
app.use(handleCors(corsOptions));

// API
app.get('/api/posts', (req, res) => {
  res.json(POSTS);
});
app.delete('/api/posts/:id', (req, res) => {
  if (req.cookies['username'] === 'owner') {
    delete POSTS[req.params.id];
    res.status(204).end();
  } else {
    res.status(403).end();
  }
});

app.listen(PORT, () =>
  console.log(
    `Running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT} ...`
  )
);
