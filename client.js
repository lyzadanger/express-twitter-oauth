const express = require('express')

var app = express();

app.get('/', function (req, res) {
  if(!req.user) {
    res.send('<a href="http://localhost:3001/auth/twitter">log in!</a>');
  } else {
    res.send(req.user);
  }
});

module.exports = app;
