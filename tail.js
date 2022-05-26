const fs = require('fs');

const { tailMain } = require('./src/tailLib');

const main = () => {
  const argumentToFn = process.argv.slice(2);
  if (argumentToFn.length === 0) {
    console.log('usage: tail [-c # | -n #] [file ...]');
  }
  console.log(tailMain(fs.readFileSync, argumentToFn[0]));
};

main();
