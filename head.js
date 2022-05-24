const fs = require('fs');
const { exit } = require('process');
const console = require('console');

const { headMain } = require('./src/headLib.js');

const main = (args) => {
  try {
    if (args.length === 0) {
      throw {
        message: 'usage: head [-n lines | -c bytes] [file ...]'
      };
    }
    console.log(headMain(fs.readFileSync, args, console));
  } catch (error) {
    console.error(error.message);
    exit(1);
  }
};

main(process.argv.slice(2));
