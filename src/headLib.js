const { splitLines, joinLines, uptoNthEle } = require('./lineUtils.js');

const head = (content, { count }) => {
  const lines = splitLines(content);
  const requiredLines = uptoNthEle(lines, count);
  return joinLines(requiredLines);
};

const headMain = (fileName, readFile) => {
  const content = readFile(fileName, 'utf8');
  return head(content, { count: 1 });
};

exports.head = head;
exports.headMain = headMain;
