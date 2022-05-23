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

const contentFormatter = content => {
  if (content.length < 3) {
    return content[content.length - 1];
  }
  return joinLines(content, '\n');
};

const headContents = (readFile, fileNames, options) => {
  const content = [];
  for (let index = 0; index < fileNames.length; index += 1) {
    const fileName = fileNames[index];
    try {
      const fileContent = readFile(fileName, 'utf8');
      content.push(`\n==> ${fileName} <==`);
      content.push(head(fileContent, options));
    } catch (error) {
      throw {
        name: 'FileReadError',
        message: `head: ${fileName}: No such file or directory`,
        fileName
      };
    }
  }
  const formattedContent = contentFormatter(content);
  return formattedContent;
};

const headMain = (readFile, ...args) => {
  const { fileNames, options } = parseArgs(args);
  if (isBothPresent(options)) {
    throw {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    };
  }
  return headContents(readFile, fileNames, options);
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
