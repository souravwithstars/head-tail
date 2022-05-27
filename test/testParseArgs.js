const assert = require('assert');

const { parseArgs, getOptionsValue, isKeyValCombo, parseKeyValCombo,
  getIndexOfFirstFile, isIncludes } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse only the file names', () => {
    assert.deepStrictEqual(parseArgs(['hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
    assert.deepStrictEqual(parseArgs(['hello.txt', 'TODO.md']), {
      fileNames: ['hello.txt', 'TODO.md'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', '1', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 1 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n1 into option -n and value 1', () => {
    assert.deepStrictEqual(parseArgs(['-n1', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 1 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should parse -n option with count greater than 1', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 5 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
  });

  it('Should override the value for repeated option ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n', '6', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 6 },
        '-c': { name: 'bytes', limit: undefined }
      }
    });
    assert.deepStrictEqual(parseArgs(['-c', '5', '-c', '15', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: 15 }
      }
    });
  });

  it('Should parse -c option along with file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '5', 'hello.txt']), {
      fileNames: ['hello.txt'], options: {
        '-n': { name: 'lines', limit: 10 },
        '-c': { name: 'bytes', limit: 5 }
      }
    });
  });

  it('Should throw error if both -n and -c provided', () => {
    assert.throws(() => parseArgs(
      ['-n', '15', '-c', '50', 'hello.txt', 'TODO.md']), {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    });
  });
});

describe('getOptionsValue', () => {
  it('Should give object in which -n limit is 1', () => {
    assert.deepStrictEqual(getOptionsValue(['-n', '1'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    });
  });

  it('Should give object in which -c limit is 1', () => {
    assert.deepStrictEqual(getOptionsValue(['-n', '15', '-c', '1'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), {
      '-n': { name: 'lines', limit: 15 },
      '-c': { name: 'bytes', limit: 1 }
    });
  });

  it('Should give object in which -c limit is 50', () => {
    assert.deepStrictEqual(getOptionsValue(['-c', '50'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 50 }
    });
  });

  it('Should give object in limit of -n is 15 and -c is 20', () => {
    assert.deepStrictEqual(getOptionsValue(['-n', '15', '-c', '20'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), {
      '-n': { name: 'lines', limit: 15 },
      '-c': { name: 'bytes', limit: 20 }
    });
  });
});

describe('isKeyValCombo', () => {
  it('Should return false for \'-n\'', () => {
    assert.equal(isKeyValCombo('-n'), false);
  });

  it('Should return false for \'-c\'', () => {
    assert.equal(isKeyValCombo('-c'), false);
  });

  it('Should return true for \'-n20\'', () => {
    assert.equal(isKeyValCombo('-n20'), true);
  });

  it('Should return true for \'-c50\'', () => {
    assert.equal(isKeyValCombo('-c50'), true);
  });
});

describe('parseKeyValCombo', () => {
  it('Should parse the value apart from key', () => {
    assert.deepStrictEqual(parseKeyValCombo('-n20'), ['-n', '20']);
    assert.deepStrictEqual(parseKeyValCombo('-c50'), ['-c', '50']);
  });
});

describe('getIndexOfFirstFile', () => {
  it('Should give the index of first found file', () => {
    assert.strictEqual(getIndexOfFirstFile(
      ['TODO.md']), 0);
    assert.strictEqual(getIndexOfFirstFile(
      ['-n', '15', '-c20', 'README.md']), 3);
  });

  it('Should give the index of first file if multiple files found', () => {
    assert.strictEqual(getIndexOfFirstFile(
      ['-c', '50', 'TODO.md', 'README.md']), 2);
  });
});

describe('isIncludes', () => {
  it('Should give true if the element is present in given list', () => {
    assert.strictEqual(isIncludes(['-n', '5', '-n15'], '5'), true);
    assert.strictEqual(isIncludes(['-n', '5', '-n15'], '-n'), true);
  });

  it('Should give false if the element is present in given list', () => {
    assert.strictEqual(isIncludes(['-n', '5', '-n15'], '-5'), false);
    assert.strictEqual(isIncludes(['-n', '5', '-n15'], '-c'), false);
  });

  it('Should give true if the element is present multiple times', () => {
    assert.strictEqual(isIncludes(['-n', '5', '-n'], '-n'), true);
  });
});
