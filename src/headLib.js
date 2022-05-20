const NEWLINE = '\n';

const splitLines = content => content.split(NEWLINE);

const joinLines = lines => lines.join(NEWLINE);

const head = (content, { count }) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

exports.head = head;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
