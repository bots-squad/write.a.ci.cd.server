#!/usr/bin/env node

/*
https://developer.github.com/v3/repos/deployments/
# CREATE A DEPLOYMENT

https://developer.github.com/guides/automating-deployments-to-integrators/
https://developer.github.com/guides/delivering-deployments/
*/
const GitHubClient = require('./octocat.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

let hostname = require("os").hostname();

// ./create-deployment.js ACME yo branch_name

githubCli.postData({path: `/repos/${process.argv[2]}/${process.argv[3]}/deployments`, data:{
    ref: process.argv[4]
  , description: "Deploying my branch"
  , required_contexts: [
      "ci/hector"
    ]
}})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.error(err);
})

// si je merge usr master -> deploiement
// si je recree un déploiement une fois que tout va bien -> auto merge
