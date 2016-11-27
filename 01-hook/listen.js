#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');

let http_port = 9090;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/ci', (req, res) => {

  let event = req.headers['x-github-event'];

  console.log(`GitHub event: ${event}`);
  console.log(`Repository: ${req.body.repository.name}`);
  console.log(`Owner: ${req.body.repository.owner.name}`);
  console.log(`Ref: ${req.body.ref}`);

  res.status(201).end();
});

app.get('/hello', (req, res) => {
  res.send({message: "Hello!"});
});

app.listen(http_port)

console.log(`Listening on ${http_port}`);
