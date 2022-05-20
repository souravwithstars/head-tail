const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  const argumentToFunc = process.argv.slice(2);
  if (argumentToFunc.length === 0) {
    console.log('usage: head [-n lines | -c bytes] [file ...]');
    return 1;
  }
  console.log(headMain(fs.readFileSync, ...argumentToFunc));
};

main();
