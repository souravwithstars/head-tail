const { splitLines, joinLines } = require('./lineUtitlities.js');

const head = (content, { count }) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const headMain = (fileName, readFile) => {
  const content = readFile(fileName, 'utf8');
  return head(content, { count: 1 });
};

exports.head = head;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.headMain = headMain;
