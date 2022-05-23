const fs = require('fs');
const { exit } = require('process');

const { headMain } = require('./src/headLib.js');

const main = () => {
  const argumentToFunc = process.argv.slice(2);
  if (argumentToFunc.length === 0) {
    console.log('usage: head [-n lines | -c bytes] [file ...]');
    return 1;
  }
  try {
    console.log(headMain(fs.readFileSync, ...argumentToFunc));
  } catch (error) {
    console.error(error.message);
    exit(1);
  }
};

main();
