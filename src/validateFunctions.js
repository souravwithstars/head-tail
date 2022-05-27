const isBothPresent = options => {
  return options['-c']['limit'] && options['-n']['limit'] !== 10;
};

const validateCombineOptions = options => {
  if (isBothPresent(options)) {
    throw {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    };
  }
  return 0;
};

const validateSwitches = options => {
  const illegalSwitch = options.find(option => /-[^nc]/.test(option));
  if (illegalSwitch) {
    const option = illegalSwitch[1];
    const helpMessage = 'usage: head [-n lines | -c bytes] [file ...]';
    throw {
      name: 'ParsingError',
      message: `head: illegal option -- ${option}\n${helpMessage}`
    };
  }
};

const validateFile = files => {
  if (files.length === 0) {
    throw {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const validateIllegalCount = (switches, values) => {
  const illegalValue = +values.find(number => number <= 0);
  const index = values.indexOf(illegalValue + '');
  const option = switches[index];
  if (illegalValue <= 0 && /[nc]/.test(option)) {
    const optionName = option === '-n' ? 'lines' : 'bytes';
    throw {
      name: 'ParsingError',
      message: `head: illegal ${optionName} count -- ${illegalValue}`
    };
  }
};

const validations = args => {
  const switches = args.filter((element, index) => index % 2 === 0);
  const values = args.filter((element, index) => index % 2 === 1);
  validateIllegalCount(switches, values);
  validateSwitches(switches);
};

exports.validateCombineOptions = validateCombineOptions;
exports.validateIllegalCount = validateIllegalCount;
exports.validateSwitches = validateSwitches;
exports.validateFile = validateFile;
exports.validations = validations;
