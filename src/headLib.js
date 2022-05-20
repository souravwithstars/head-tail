const { splitLines, joinLines, uptoNthEle } = require('./lineUtils.js');

const selector = ({ count, bytes }) => {
  const newLine = '\n';
  const newChar = '';
  let separator = newLine;
  let option = count;
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
  const fileName = args[args.length - 1];
  const count = args[1] && args[0] === '-n' ? +args[1] : 1;
  const content = readFile(fileName, 'utf8');
  return head(content, { count });
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
