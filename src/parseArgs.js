const parseArgs = args => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { count: undefined, bytes: undefined };
  if (args[0] === '-n' || args[0] === '-c') {
    const [option, value] = args.slice(0, 2);
    const key = keys[option];
    options[key] = isFinite(value) ? +value : value;
  }
  return { fileName: args[args.length - 1], options };
};

exports.parseArgs = parseArgs;