const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = (args) => {
  try {
    process.exitCode = headMain(
      fs.readFileSync, console.log, console.error, args
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
