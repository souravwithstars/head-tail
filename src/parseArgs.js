const isIncludes = (array, element) => {
  return array.includes(element);
};

const parseArgs = args => {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  const options = { lines: 10, bytes: undefined };
  const validOption = Object.keys(keys);
  for (let index = 0; index < args.length - 1; index += 2) {
    const [option, value] = args.slice(index, index + 2);
    if (isIncludes(validOption, option)) {
      const key = keys[option];
      options[key] = isFinite(value) ? +value : value;
    }
  }
  return { fileName: args[args.length - 1], options };
};

exports.parseArgs = parseArgs;
