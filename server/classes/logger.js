
const colors = require('colors');
const logger = {
  firstCall: true,
  checkForFirstCall: () => {
    if(this.firstCall){
      this.firstCall = false;
      console.log("\n Node Logger = \n".bold);
    }
  },

  printWarning: msg => {
    logger.checkForFirstCall();
    console.log("  Warning: ", msg.orange);
  },

  printInfo: msg => {
    logger.checkForFirstCall();
    console.log("  Info: ", msg.yellow);
  },

  printError: msg => {
    logger.checkForFirstCall();
    console.log("  Error: ", msg.red);
  },

  printSuccess: msg => {
    logger.checkForFirstCall();
    console.log("  Success: ", msg.green);
  }
};

module.exports = logger;
