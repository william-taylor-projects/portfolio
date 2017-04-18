
const { printInfo } = require("./logger.js");
const crypto = require('crypto');

const decrypt = (key, text) => {
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

const printJSON = (json) => {
  if(typeof(json) === 'string') {
    return (json);
  } else {
    for(var id in json) {
      printInfo(id + " : " + printJSON(json[id]));
    }

    return "[object]";
  }
}

module.exports = { printJSON, decrypt }