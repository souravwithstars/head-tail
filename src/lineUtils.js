const NEWLINE = '\n';

const splitLines = content => content.split(NEWLINE);

const joinLines = lines => lines.join(NEWLINE);

const uptoNthEle = (lines, numberOfLines) => lines.slice(0, numberOfLines);

exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.uptoNthEle = uptoNthEle;
