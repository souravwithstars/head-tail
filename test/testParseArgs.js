const assert = require('assert');

const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse only the file name', () => {
    assert.deepStrictEqual(parseArgs(['./hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 1 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n1 into option -n and value 1', () => {
    assert.deepStrictEqual(parseArgs(['-n1', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 1 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n option with count greater than 1', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 5 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should override the value for repeated option ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n', '6', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 6 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
    assert.deepStrictEqual(parseArgs(['-c', '5', '-c', '15', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: 15 }
      }
    });
  });

  it('Should parse -c option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '5', './hello.txt']), {
      fileNames: ['./hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: 5 }
      }
    });
  });
});
