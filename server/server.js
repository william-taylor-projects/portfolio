
const WebsiteApi = require("./scripts/website.js");
const logger = require("./scripts/logger.js");

const express = require('express');
const crypto = require('crypto');
const fs = require("fs");
const app = express();

app.use(express.static(__dirname + "/public/"));
app.use(require('body-parser').json());
app.use(require('cors')());

function decrypt(key, text) {
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function recursivePrint(json) {
  if(typeof(json) === 'string') {
    return (json);
  } else {
    for(var id in json) {
      logger.printInfo(id + " : " + recursivePrint(json[id]));
    }

    return "[object]";
  }
}

const server = app.listen(3004, () => {
  const key = process.argv[process.argv.length - 1];

  fs.readFile('private/credentials.json', 'utf8', (err, data) => {
    if (err) {
      logger.printError("\n - These were the credentials \n" + JSON.stringify(json));
      logger.printError(err);
    } else {
      const dataNoInvalidChars = data.toString().replace(/^\uFEFF/, '');
      const auth = JSON.parse(dataNoInvalidChars);

      auth.email.username = decrypt(key, auth.email.username);
      auth.email.password = decrypt(key, auth.email.password);
      auth.email.host = decrypt(key, auth.email.host);

      recursivePrint(auth);

      try {
        const websiteAPI = new WebsiteApi();
        websiteAPI.setup(auth);
        websiteAPI.use(app, "/");
      } catch(e) {
        logger.printError(e);
        logger.printError(`n - These were the credentials \n ${JSON.stringify(auth)}`);
      }
    }
  });
});
