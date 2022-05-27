const { validations, validateCombineOptions, validateFile }
  = require('./validateFunctions.js');

const isIncludes = (array, element) => {
  return array.includes(element);
};

const getIndexOfFirstFile = args => {
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
  for (let index = 0; index < args.length; index += 2) {
    const [option, value] = args.slice(index, index + 2);
    options[option]['limit'] = isFinite(value) ? +value : value;
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
  validateCombineOptions(options);
  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOptionsValue = getOptionsValue;
exports.isKeyValCombo = isKeyValCombo;
exports.parseKeyValCombo = parseKeyValCombo;
exports.getIndexOfFirstFile = getIndexOfFirstFile;
exports.isIncludes = isIncludes;
