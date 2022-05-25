const fs = require('fs');
const { exit } = require('process');
const console = require('console');

const { headMain } = require('./src/headLib.js');

const main = (args) => {
  try {
    headMain(fs.readFileSync, args, console);
  } catch (error) {
    console.error(error.message);
    exit(1);
  }
};

main(process.argv.slice(2));
