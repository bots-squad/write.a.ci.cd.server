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
    // get the SHA (Secure Hash Algorithm) of the most recent commit on ref after the push
    // req.body.after
    // see https://developer.github.com/v3/activity/events/types/#events-api-payload-22
    let statuses_url = `/repos/${req.body.repository.owner.name}/${req.body.repository.name}/statuses/${req.body.after}`;
    console.log(`Statuses url: ${statuses_url}`)
  }

  if(event=='pull_request') {
    console.log(`    Action: ${req.body.action}`);
    console.log(`    Merged: ${req.body.pull_request.merged}`);
    console.log(`    Organization: ${req.body.organization.login}`);
    console.log(`    Sender: ${req.body.sender.login}`);
  }

  res.status(201).end();
});

app.listen(http_port)

console.log(`Listening on ${http_port}`);
