const { validateCombineOptions, validateSwitches, validateIllegalCount }
  = require('../src/validateFunctions.js');
const assert = require('assert');

describe('validateCombineOptions', () => {
  it('Should throw error if both options provided', () => {
    assert.throws(() => validateCombineOptions({
      '-n': { name: 'lines', limit: 15 },
      '-c': { name: 'bytes', limit: 50 }
    }), {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    });
  });

  it('Should not create error if options are not combine', () => {
    const expected = 0;
    assert.equal(validateCombineOptions({
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), expected);
  });
});

describe('validateSwitches', () => {
  it('Should throw error if invalid switches presents in arguments', () => {
    const helpMessage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => validateSwitches(['-n', '-c', '-t', '-r']), {
      name: 'ParsingError',
      message: `head: illegal option -- t\n${helpMessage}`,
    });
  });
});

describe('validateIllegalCount', () => {
  it('Should throw error if invalid value are provide with options', () => {
    assert.throws(() => validateIllegalCount(['-n', '-c'], ['5', '-10']), {
      name: 'ParsingError',
      message: 'head: illegal bytes count -- -10',
    });
  });
});
