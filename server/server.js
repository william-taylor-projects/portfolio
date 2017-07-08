

const { printJSON, decrypt } = require('./scripts/decrypt.js');
const { WebsiteApi } = require("./scripts/website.js");
const { printInfo } = require('./scripts/logger.js');

const compression = require('compression');
const express = require('express');
const vhost = require('vhost');
const fs = require("fs");
const app = express();

app.use(compression());
app.use(express.static(__dirname + "/public/"));
app.use(require('body-parser').json());
app.use(require('cors')());

const json = JSON.parse(fs.readFileSync('./private/domains.json', 'utf8'));
json.domains.forEach(entry => {
  if(entry.folder) {
    const redirect = (req, res) =>  res.redirect(`http://${entry.domain}`);
    app.use(vhost('*.' + entry.domain, express.static(__dirname + entry.folder)));  
    app.use(vhost('*.' + entry.domain, redirect));   

    app.use(vhost(entry.domain, express.static(__dirname + entry.folder)));   
    app.use(vhost(entry.domain, redirect));   
  } 

  printInfo(` ${entry.domain} -> ${entry.folder}`); 
});

const server = app.listen(3000, () => {
  const key = process.argv[process.argv.length - 1];
  const json = fs.readFileSync('private/credentials.json', 'utf8');
  const dataNoInvalidChars = json.toString().replace(/^\uFEFF/, '');
  const auth = JSON.parse(dataNoInvalidChars);

  auth.username = decrypt(key, auth.username);
  auth.password = decrypt(key, auth.password);
  auth.host = decrypt(key, auth.host);

  printJSON(auth);

  const websiteAPI = new WebsiteApi();
  websiteAPI.setup(auth);
  websiteAPI.use(app, "/");
});
