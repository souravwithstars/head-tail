const { splitLines, joinLines } = require('./headLib.js');

const forLines = (content, option) => {
  const limit = option['-n']['limit'];
  const lines = splitLines(content, '\n');
  return joinLines(lines.slice(0 - limit), '\n');
};

const forBytes = (content, option) => {
  const limit = option['-c']['limit'];
  const lines = splitLines(content, '');
  return joinLines(lines.slice(0 - limit), '');
};

const tail = (content, options) => {
  return options['-c']['limit'] ?
    forBytes(content, options) : forLines(content, options);
};

const tailMain = (readFile, fileName) => {
  const content = readFile(fileName, 'utf8');
  const options = {
    '-n': { names: 'lines', limit: 1 },
    '-c': { names: 'bytes', limit: undefined }
  };
  return tail(content, options);
};

exports.tail = tail;
exports.forLines = forLines;
exports.forBytes = forBytes;
exports.tailMain = tailMain;
