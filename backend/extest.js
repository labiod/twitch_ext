"use strict";

const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();
console.log("start");

app.use((req, res, next) => {
    console.log("Request path", req.path );
    console.log("Request method", req.method );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.use(express.static('../layouts'))

let options = {
   key  : fs.readFileSync('/ExTest/certs/testing.key'),
   cert : fs.readFileSync('/ExTest/certs/testing.crt')
};

const PORT = 8080;
https.createServer(options, app).listen(PORT, function () {
  console.log('ExTest service running on https', PORT);
});