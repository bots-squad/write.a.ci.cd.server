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

  if(event=='push') {
    console.log(`    Owner: ${req.body.repository.owner.name}`);
    console.log(`    Ref: ${req.body.ref}`);
  }

  if(event=='pull_request') {
    console.log(`    Action: ${req.body.action}`);
    console.log(`    Merged: ${req.body.pull_request.merged}`);
    console.log(`    Organization: ${req.body.organization.login}`);
    console.log(`    Sender: ${req.body.sender.login}`);
  }

  res.status(201).end();
});

app.get('/hello', (req, res) => {
  res.send({message: "Hello!"});
});

app.listen(http_port)

console.log(`Listening on ${http_port}`);
