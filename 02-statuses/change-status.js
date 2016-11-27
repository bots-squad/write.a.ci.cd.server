#!/usr/bin/env node
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

let hostname = require("os").hostname();

let statuses_url = "/repos/ACMELand/yo/statuses/78e955181bffd00932475929e6ab153fa9b52056";

// statuses: success error failure pending
githubCli.postData({path: statuses_url, data:{
    state: process.argv[2]
  , description: "Hi, I'm Hector :|"
  , context: "[Hector] CI Server"
  , target_url: `http://${hostname}:9090/hello`
}})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
})
