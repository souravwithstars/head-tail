const { splitLines, joinLines, uptoNthEle } = require('./lineUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { validateCombineOptions } = require('./validateFunctions.js');

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

const headFiles = (readFile, fileNames, options) => {
  return fileNames.map(fileName => {
    try {
      const fileContent = readFile(fileName, 'utf8');
      return { fileName, content: head(fileContent, options) };
    } catch (error) {
      const message = `${fileName}: No such file or directory`;
      return { fileName, message };
    }
  });
};

const errorFormatter = content => `head: ${content}`;

const formatHeader = (fileName, content) => {
  const header = `==> ${fileName} <==`;
  return header + '\n' + content;
};

const displayRawContent = ({ content, message }, log, error) => {
  if (message) {
    error(errorFormatter(message));
    return 1;
  }
  log(content);
  return 0;
};

const displayFormattedContent = (contents, log, error) => {
  contents.forEach(({ content, fileName, message }) => {
    message ? error(errorFormatter(message))
      : log(formatHeader(fileName, content));
  });
};

const getExitCode = contents => {
  return contents.some(({ message }) => message) ? 1 : 0;
};

const headMain = (readFile, log, error, args) => {
  const { fileNames, options } = parseArgs(args);
  validateCombineOptions(options);
  const contents = headFiles(readFile, fileNames, options);
  const displayFunc = contents.length > 1
    ? displayFormattedContent : displayRawContent;
  contents.forEach(content => displayFunc(content, log, error));
  const exitCode = getExitCode(contents);
  return exitCode;
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
exports.headFiles = headFiles;
exports.displayRawContent = displayRawContent;
