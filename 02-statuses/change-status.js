#!/usr/bin/env node
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

let hostname = require("os").hostname();

let statuses_url = `/repos/${process.argv[2]}/${process.argv[3]}/statuses/${process.argv[4]}`;

// ./change-status ACME yo sha_last_commit status

// statuses: success error failure pending
githubCli.postData({path: statuses_url, data:{
    state: process.argv[5]
  , description: "Hi, I'm Hector :|"
  , context: "ci/hector"
  , target_url: `http://${hostname}:9090/hello`
}})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
})
