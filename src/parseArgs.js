/* eslint-disable complexity */
const isIncludes = (array, element) => {
  return array.includes(element);
};

const getIndexOfFirst = args => {
  const regEx = /[^-][^\d]/;
  const firstFile = args.find(element => regEx.test(element));
  return args.indexOf(firstFile);
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

const parseArgs = args => {
  let options = {
    '-n': { name: 'lines', limit: 10 },
    '-c': { name: 'bytes', limit: undefined }
  };
  const fileNames = args.slice(getIndexOfFirst(args), args.length);
  const remainArgs = args.slice(0, getIndexOfFirst(args));
  options = getOptionsValue(remainArgs, options);
  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOptionsValue = getOptionsValue;
exports.isKeyValCombo = isKeyValCombo;
exports.parseKeyValCombo = parseKeyValCombo;
exports.getIndexOfFirst = getIndexOfFirst;
exports.isIncludes = isIncludes;
