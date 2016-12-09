"use strict";

module.exports =  (robot) =>  {

  robot.messageRoom('general', 'Hello :earth_africa:')

  // === Listen to the chat ===
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
