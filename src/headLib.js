const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const head = (content, numberOfLines) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, numberOfLines));
};

exports.head = head;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
