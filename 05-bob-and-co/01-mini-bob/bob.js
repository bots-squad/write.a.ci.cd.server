#!/usr/bin/env node
"use strict";

require('shelljs/global');

process.env["USER"] = "bob";

process.env["EXPRESS_PORT"] = 8082;
process.env["ROCKETCHAT_URL"] = "http://localhost:8083";
process.env["ROCKETCHAT_ROOM"] = "";
process.env["LISTEN_ON_ALL_PUBLIC"] = true;
process.env["ROCKETCHAT_USER"] = "bob";
process.env["ROCKETCHAT_PASSWORD"] = "bobmorane";
process.env["ROCKETCHAT_AUTH"] = "password";

exec(`./bin/hubot -a rocketchat`)
