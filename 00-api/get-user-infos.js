#!/usr/bin/env node
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT  // <== show the token
});


githubCli.getData({path:'/users/k33g'})
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.log("error", error)
  });
