const NEWLINE = '\n';

const splitLines = content => content.split(NEWLINE);

const joinLines = lines => lines.join(NEWLINE);

const head = (content, numberOfLines) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, numberOfLines));
};

exports.head = head;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
