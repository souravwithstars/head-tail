const assert = require('assert');

const { parseArgs } = require('../src/parseArgs.js');

describe.only('parseArgs', () => {
  it('Should parse only the file name', () => {
    assert.deepStrictEqual(parseArgs(['./hello.txt']), {
      fileName: './hello.txt',
      options: { count: undefined, bytes: undefined }
    });
  });

  it('Should parse -n option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', './hello.txt']), {
      fileName: './hello.txt',
      options: { count: 1, bytes: undefined }
    });
  });

  it('Should parse -n option with count greater than 1', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', './hello.txt']), {
      fileName: './hello.txt',
      options: { count: 5, bytes: undefined }
    });
  });

  it('Should parse -c option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '5', './hello.txt']), {
      fileName: './hello.txt',
      options: { count: undefined, bytes: 5 }
    });
  });
});
