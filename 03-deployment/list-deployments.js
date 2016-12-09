#!/usr/bin/env node

/*
https://developer.github.com/v3/repos/deployments/#list-deployments
*/
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

let hostname = require("os").hostname();

// ./list-deployments.js ACME yo

// statuses: success error failure pending
githubCli.getData({path: `/repos/${process.argv[2]}/${process.argv[3]}/deployments`})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
})
