
const WebsiteApi = require("./scripts/website.js");
const logger = require("./scripts/logger.js");

const express = require('express');
const crypto = require('crypto');
const vhost = require('vhost');
const fs = require("fs");

const app = express();
app.use(express.static(__dirname + "/public/"));
app.use(require('body-parser').json());
app.use(require('cors')());

const json = JSON.parse(fs.readFileSync('private/domains.json', 'utf8'));
json.domains.forEach(entry => {
  app.use(vhost(entry.domain, (req, res) => {
    const hostname = req.vhost.host;
    res.redirect('http://' + hostname + entry.url);
  }));  
});

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
  const json = fs.readFileSync('private/credentials.json', 'utf8');
  const dataNoInvalidChars = data.toString().replace(/^\uFEFF/, '');
  const auth = JSON.parse(dataNoInvalidChars);
  auth.username = decrypt(key, auth.username);
  auth.password = decrypt(key, auth.password);
  auth.host = decrypt(key, auth.host);

  recursivePrint(auth);

  const websiteAPI = new WebsiteApi();
  websiteAPI.setup(auth);
  websiteAPI.use(app, "/");
});
