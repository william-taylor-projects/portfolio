
const requestify = require('requestify');
const logger = require('./logger.js');
const express = require('express');
const email = require('emailjs');
const path = require('path');
const fs =  require("fs");

const fiveMinutesAsMs = 60000 * 5;
const router = express.Router();

class WebsiteApi {
  constructor() {
    this.email_client = {};
    this.githubEvents = [];
    this.githubUser = {};

    router.use(express.static(path.resolve('./public/website/')));
  }

  validateEmail(email) {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  send(req, res) {
    if(this.validateEmail(req.body.email) && req.body.name && req.body.subject && req.body.message) {
      const msg = {
        text: `${req.body.message} Email : ${req.body.email}`,
        from: "wi11berto@yahoo.co.uk",
        to: "wi11berto@yahoo.co.uk",
        subject: req.body.subject
      };

      logger.printInfo("Email being sent" + JSON.stringify(msg));

      this.email_client.send(msg, (err, info) => {
        if(err) {
          logger.printError(err);
        } else {
          logger.printInfo("Message was sent" + JSON.stringify(info));
        }
      });

      res.json({ "msg": "Your email has been sent.", "sent": true });
    } else {
      res.json({
        "msg": "You didnt provide a validate email address. Please provide a proper one.",
        "sent": false,
        "body" : body
      });
    }
  }

  setup(json) {
    this.email_client = email.server.connect({
      user: json.email.username,
      password: json.email.password,
      host: json.email.host,
      ssl: true
    });

    router.get('/github-events/', (req, res) =>   res.json(this.githubEvents));
    router.get('/github-user/', (req, res) => res.json(this.githubUser));
    router.post('/send/', (req, res) => this.send(req, res));

    logger.printSuccess("Full Website API attached");
  }

  updateGithubUserData() {
      requestify.get('https://api.github.com/users/william-taylor')
        .then(response => this.githubUser = response.getBody())
        .catch(msg  => logger.printError(msg));
  }

  updateGithubUserEvents() {
    requestify.get('https://api.github.com/users/william-taylor/events')
      .then(response => this.githubEvents = response.getBody())
      .catch(msg  => logger.printError(msg));
  }

  use(express, name) {
    express.use(name, router);

    this.updateGithubUserEvents();
    this.updateGithubUserData();

    setInterval(() => this.updateGithubUserEvents(), fiveMinutesAsMs);
    setInterval(() => this.updateGithubUserData(), fiveMinutesAsMs);

    logger.printSuccess(`Binded Website API to ${name}`);
  }
}

module.exports = WebsiteApi;
