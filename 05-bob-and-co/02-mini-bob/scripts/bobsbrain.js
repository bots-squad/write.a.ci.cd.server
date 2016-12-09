"use strict";

const GitHubClient = require('./octocat.js').GitHubClient;

let bob = new GitHubClient({
  baseUri:  `http://github.at.home/api/v3`,
  token:    process.env.TOKEN_GHE_28_BOBTHEBOT
});

module.exports =  (robot) =>  {

  robot.messageRoom('general', 'Hello :earth_africa:')

  // listen to webhook(s) from GitHub platform
  // http://zeiracorp.local:8082/hey/bob
  // if GitHub use the hook, I check the GitHub Event
  // see ExpressJS
  robot.router.post('/hey/bob', (req, res) => {

    let event = req.headers['x-github-event'];

    let messages = [
      `:zap: Event: ${event}\n`,
      `:panda_face: sender: ${req.body.sender.login} | ${req.body.sender.html_url}\n`,
      `:package: repository: ${req.body.repository.name} | ${req.body.repository.html_url}\n`,
    ]

    if(event=="issues") {
      messages.push(`issue: "${req.body.issue.title}" by ${req.body.issue.user.login} `);
      messages.push(`issue url: ${req.body.issue.html_url}`);
    }

    if(event=="issue_comment") {

      let comment = req.body.comment;
      /*
      url: 'http://github.at.home/api/v3/repos/ACMELand/stools/issues/comments/228',
       html_url: 'http://github.at.home/ACMELand/stools/issues/4#issuecomment-228',
       issue_url: 'http://github.at.home/api/v3/repos/ACMELand/stools/issues/4',
       id: 228,
       user:
        { login: 'k33g',
          id: 3,
          avatar_url: 'http://github.at.home/avatars/u/3?',
          gravatar_id: '',
          url: 'http://github.at.home/api/v3/users/k33g',
          html_url: 'http://github.at.home/k33g',
          followers_url: 'http://github.at.home/api/v3/users/k33g/followers',
          following_url: 'http://github.at.home/api/v3/users/k33g/following{/other_user}',
          gists_url: 'http://github.at.home/api/v3/users/k33g/gists{/gist_id}',
          starred_url: 'http://github.at.home/api/v3/users/k33g/starred{/owner}{/repo}',
          subscriptions_url: 'http://github.at.home/api/v3/users/k33g/subscriptions',
          organizations_url: 'http://github.at.home/api/v3/users/k33g/orgs',
          repos_url: 'http://github.at.home/api/v3/users/k33g/repos',
          events_url: 'http://github.at.home/api/v3/users/k33g/events{/privacy}',
          received_events_url: 'http://github.at.home/api/v3/users/k33g/received_events',
          type: 'User',
          site_admin: true },
       created_at: '2016-12-06T05:55:07Z',
       updated_at: '2016-12-06T05:55:07Z',
       body: 'yo @bob ' }

      */

      if(comment.body.includes("@bob")) {

        bob.baseUri = '';

        bob.postData({path: comment.issue_url+'/comments', data:{
          body:`Hello ${req.body.comment.user.login}`
        }}).then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        })

        bob.headers["Accept"] = "application/vnd.github.squirrel-girl-preview";

        bob.postData({path: comment.url+'/reactions', data:{
          content:"+1"
        }})

        bob.postData({path: comment.url+'/reactions', data:{
          content:"heart"
        }})

        bob.postData({path: comment.url+'/reactions', data:{
          content:"hooray"
        }})
      }

      messages.push(`issue comment by ${req.body.comment.user.login} `);
      messages.push(`comment url: ${req.body.comment.html_url}`);
    }
    messages.push("\n\n");

    robot.messageRoom('ops', messages.join(""));

    res.status(200).end()
  });

  // === Listen to the chat ===
  robot.messageRoom('general', 'Hello :earth_africa:')

  // Listen to the chat
  robot.hear(/bob yo/, (res) => {
    res.send(`yo ${res.message.user.name}`);
  });

  robot.hear(/tired|too hard|to hard|upset|bored/i, (res) => {
    res.send(`:rage: ${res.message.user.name}`);
  });

  robot.hear(/bob help me with (.*)/i, (res) => {
    res.send(`help yourself with ${res.match[1]} :stuck_out_tongue_winking_eye:`);
  });

};
