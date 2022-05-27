const { parseArgs } = require('./parseArgs.js');
const { validateCombineOptions } = require('./validateFunctions.js');

const splitLines = (content, separator) => content.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const forLines = (content, options) => {
  const newLine = '\n';
  const limit = options['-n']['limit'];
  const lines = splitLines(content, newLine);
  return joinLines(lines.slice(0, limit), newLine);
};

const forBytes = (content, options) => {
  const newChar = '';
  const limit = options['-c']['limit'];
  const lines = splitLines(content, newChar);
  return joinLines(lines.slice(0, limit), newChar);
};

const head = (content, options) => {
  return options['-c']['limit'] ?
    forBytes(content, options) : forLines(content, options);
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

exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.forLines = forLines;
exports.forBytes = forBytes;
exports.head = head;
exports.headMain = headMain;
exports.headFiles = headFiles;
exports.displayRawContent = displayRawContent;
