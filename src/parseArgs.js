const parseArgs = args => {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  const options = { lines: 10, bytes: undefined };
  if (Object.keys(keys).includes(args[0])) {
    const [option, value] = args.slice(0, 2);
    const key = keys[option];
    options[key] = isFinite(value) ? +value : value;
  }
  return { fileName: args[args.length - 1], options };
};

exports.parseArgs = parseArgs;
