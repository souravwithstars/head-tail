const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadData = (mockFiles, content, mockEncoding) => {
  return (fileNames, encoding) => {
    assert.equal(fileNames, mockFiles[0]);
    assert.equal(encoding, mockEncoding);
    return content;
  };
};

const mockConsole = function () {
  const mockedConsole = { index: 0, content: [] };
  const log = function (args) {
    this.content.push(args);
    this.index++;
  };
  const error = function (args) {
    this.content.push(args);
    this.index++;
  };

  mockedConsole.log = log.bind(mockedConsole);
  mockedConsole.error = error.bind(mockedConsole);
  return mockedConsole;
};

describe('headMain', () => {
  it('Should give the lines of given single file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    const expContent = ['hello'];
    const mockedConsole = mockConsole();
    headMain(
      mockReadFileSync, mockedConsole.log, mockedConsole.error, ['hello.txt']);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should give only first line of the given file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    const expContent = ['hello'];
    const mockedConsole = mockConsole();
    headMain(mockReadFileSync,
      mockedConsole.log, mockedConsole.error, ['-n', '1', 'hello.txt']);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should give the first ten lines of the given file', () => {
    const mockReadFileSync = mockReadData(
      ['numbers.txt'], '0\n1\n2\n3\n4\n5\n6\n7\n8\n9', 'utf8');
    const expContent = ['0\n1\n2\n3\n4\n5\n6\n7\n8\n9'];
    const mockedConsole = mockConsole();
    headMain(mockReadFileSync,
      mockedConsole.log, mockedConsole.error, ['numbers.txt']);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should give error if unable to read file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    const mockedConsole = mockConsole();
    const expected = ['head: something.txt: No such file or directory'];
    headMain(mockReadFileSync,
      mockedConsole.log, mockedConsole.error, ['something.txt']);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expected);
  });

  it('Should give error if both option provided', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    const mockedConsole = mockConsole();
    assert.throws(() => headMain(mockReadFileSync,
      mockedConsole.log, mockedConsole.error,
      ['-n', '1', '-c', '10', 'something.txt']), {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    });
  });
});

exports.mockConsole = mockConsole;
exports.mockReadData = mockReadData;
