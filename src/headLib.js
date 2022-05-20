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

const headMain = (fileName, readFile) => {
  const content = readFile(fileName, 'utf8');
  return head(content, { count: 1 });
};

exports.head = head;
exports.headMain = headMain;
