# GitHub API

> WIP  :construction:

https://github.com/github/platform-samples/tree/master/api/javascript/es2015-nodejs

```javascript
let githubCliEnterprise = new GitHubClient({
  baseUri: "http://github.at.home/api/v3",
  token: process.env.TOKEN_GHITHUB_ENTERPRISE
});

let githubCliDotCom = new GitHubClient({
  baseUri:"https://api.github.com",
  token: process.env.TOKEN_GITHUB_DOT_COM
});
```javascript
