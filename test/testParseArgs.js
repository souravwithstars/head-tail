const assert = require('assert');

const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse only the file name', () => {
    assert.deepStrictEqual(parseArgs(['./hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 10, bytes: undefined }
    });
  });

  it('Should parse -n option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', './hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 1, bytes: undefined }
    });
  });

  it('Should parse -n option with count greater than 1', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', './hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 5, bytes: undefined }
    });
  });

  it('Should override the value for repeated option ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n', '6', './hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 6, bytes: undefined }
    });
    assert.deepStrictEqual(parseArgs(['-c', '5', '-c', '15', './hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 10, bytes: 15 }
    });
  });

  it('Should parse -c option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '5', './hello.txt']), {
      fileName: './hello.txt',
      options: { lines: 10, bytes: 5 }
    });
  });
});
