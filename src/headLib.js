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

const headContents = (readFile, fileNames, options) => {
  return fileNames.map((fileName) => {
    let content = '';
    const status = { errorOccurred: false, message: '' };
    try {
      const fileContent = readFile(fileName, 'utf8');
      content = head(fileContent, options);
    } catch (error) {
      status.errorOccurred = true;
      status.message = `${fileName}: No such file or directory`;
    }
    return { fileName, content, status };
  });
};

const displaySingleContent = ({ status, content }, { log, error }) => {
  if (status.errorOccurred) {
    error(`head: ${status.message}`);
    return 1;
  }
  log(content);
  return 0;
};

const displayMultipleContents = (lists, { log, error }) => {
  let exitCode = 0;
  lists.forEach(({ fileName, content, status }) => {
    if (status.errorOccurred) {
      error(`head : ${status.message}\n`);
      exitCode = 1;
    } else {
      log(`==> ${fileName} <==\n${content}\n`);
    }
  });
  return exitCode;
};

const headMain = (readFile, args, consoleFn) => {
  const { fileNames, options } = parseArgs(args);
  validateCombineOptions(options);
  const contents = headContents(readFile, fileNames, options);
  if (contents.length === 1) {
    const exitCode = displaySingleContent(contents[0], consoleFn);
    return exitCode;
  }
  const exitCode = displayMultipleContents(contents, consoleFn);
  return exitCode;
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
exports.headContents = headContents;
exports.displaySingleContent = displaySingleContent;
