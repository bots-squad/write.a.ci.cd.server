#!/usr/bin/env node

/*
https://developer.github.com/v3/repos/deployments/#create-a-deployment-status
*/
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

let hostname = require("os").hostname();

// ./update-status.js ACME yo id_deploy status

// statuses: success error failure pending
githubCli.postData({path: `/repos/${process.argv[2]}/${process.argv[3]}/deployments/${process.argv[4]}/statuses`, data:{
    state: process.argv[5] // pending, success, error, inactive, or failure
  , target_url: `http://${hostname}:9090/hello`

}})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
})
