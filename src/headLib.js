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
    return;
  }
  log(content);
};

const displayMultipleContents = (lists, { log, error }) => {
  lists.forEach(({ fileName, content, status }) => {
    if (status.errorOccurred) {
      error(`head : ${status.message}\n`);
    } else {
      log(`==> ${fileName} <==\n${content}\n`);
    }
  });
};

const headMain = (readFile, args, consoleFn) => {
  if (args.length === 0) {
    throw {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  const { fileNames, options } = parseArgs(args);
  if (isBothPresent(options)) {
    throw {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    };
  }
  const contents = headContents(readFile, fileNames, options);
  if (contents.length === 1) {
    displaySingleContent(contents[0], consoleFn);
    return;
  }
  displayMultipleContents(contents, consoleFn);
};

exports.head = head;
exports.headMain = headMain;
exports.selector = selector;
exports.headContents = headContents;
exports.displaySingleContent = displaySingleContent;
