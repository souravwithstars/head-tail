const { splitLines, joinLines, uptoNthEle } = require('./lineUtils.js');
const { parseArgs } = require('./parseArgs.js');

const isBothPresent = options => {
  return options['-c']['limit'] && options['-n']['limit'] !== 10;
};

const selector = options => {
  const newLine = '\n';
  const newChar = '';
  let separator = newLine;
  let value = options['-n']['limit'];
  if (options['-c']['limit'] >= 0) {
    separator = newChar;
    value = options['-c']['limit'];
  }
  return { separator, value };
};

const head = (content, options) => {
  const { separator, value } = selector(options);
  const lines = splitLines(content, separator);
  const requiredLines = uptoNthEle(lines, value);
  return joinLines(requiredLines, separator);
};

const headMain = (readFile, ...args) => {
  const { fileNames, options } = parseArgs(args);
  if (isBothPresent(options)) {
    throw {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    };
  }
  let content;
  try {
    content = readFile(fileNames[0], 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${fileNames[0]}`,
      fileName: fileNames[0]
    };
  }
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
