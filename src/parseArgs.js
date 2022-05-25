/* eslint-disable complexity */
const { validations }
  = require('./validateFunctions.js');

const isIncludes = (array, element) => {
  return array.includes(element);
};

const getIndexOfFirstFile = args => {
  if (/^[^-]/.test(args[0])) {
    return 0;
  }
  const regEx = /^[^- | \d]/;
  const firstFile = args.find(element => regEx.test(element));
  return firstFile ? args.indexOf(firstFile) : firstFile;
};

const parseKeyValCombo = element => {
  const option = element.slice(0, 2);
  const value = element.slice(2);
  return [option, value];
};

const isKeyValCombo = element => {
  return element.length > 2;
};

const getOptionsValue = (args, options) => {
  let index = 0, option, value;
  while (index < args.length) {
    if (isKeyValCombo(args[index])) {
      [option, value] = parseKeyValCombo(args[index]);
      index += 1;
    } else {
      [option, value] = args.slice(index, index + 2);
      index += 2;
    }
    if (isIncludes(Object.keys(options), option)) {
      options[option]['limit'] = isFinite(value) ? +value : value;
    }
  }
  return options;
};

const structureArguments = args => {
  const structuredArgs = args.flatMap(element => {
    if (element.startsWith('-') && /[a-z]/.test(element[1])) {
      return [element.slice(0, 2), element.slice(2)];
    } else if (/[a-z]/.test(element[0])) {
      return [element[0], element.slice(1)];
    }
    return element;
  });
  return structuredArgs.filter(element => element);
};

const validateFile = files => {
  if (files.length === 0) {
    throw {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const parseArgs = args => {
  let options = {
    '-n': { name: 'lines', limit: 10 },
    '-c': { name: 'bytes', limit: undefined }
  };
  const indexOfFirstFile = getIndexOfFirstFile(args);
  const fileNames = indexOfFirstFile !== undefined ?
    args.slice(indexOfFirstFile, args.length) : [];
  validateFile(fileNames);
  const remainArgs = args.slice(0, indexOfFirstFile);
  const structuredArgs = structureArguments(remainArgs);
  validations(structuredArgs);
  options = getOptionsValue(structuredArgs, options);
  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOptionsValue = getOptionsValue;
exports.isKeyValCombo = isKeyValCombo;
exports.parseKeyValCombo = parseKeyValCombo;
exports.getIndexOfFirstFile = getIndexOfFirstFile;
exports.isIncludes = isIncludes;
