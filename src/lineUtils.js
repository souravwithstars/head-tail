const splitLines = (content, separator) => content.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const uptoNthEle = (lines, noOfElements) => lines.slice(0, noOfElements);

exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.uptoNthEle = uptoNthEle;
