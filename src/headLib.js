const { splitLines, joinLines, uptoNthEle } = require('./lineUtils.js');
const { parseArgs } = require('./parseArgs.js');

const selector = ({ lines, bytes }) => {
  const newLine = '\n';
  const newChar = '';
  let separator = newLine;
  let option = lines;
  if (bytes >= 0) {
    separator = newChar;
    option = bytes;
  }
  return { separator, option };
};

const head = (content, options) => {
  const { separator, option } = selector(options);
  const lines = splitLines(content, separator);
  const requiredLines = uptoNthEle(lines, option);
  return joinLines(requiredLines, separator);
};

const headMain = (readFile, ...args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    };
  }
  const { fileName, options } = parseArgs(args);
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${fileName}`,
      fileName
    };
  }
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
