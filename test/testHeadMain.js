const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadData = (mockFiles, content, mockEncoding) => {
  return (fileNames, encoding) => {
    assert.equal(fileNames, mockFiles[0]);
    assert.equal(encoding, mockEncoding);
    return content;
  };
};

describe('headMain', () => {
  it('Should give the lines of given single file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.strictEqual(headMain(mockReadFileSync, 'hello.txt'), 'hello');
  });

  it('Should give only first line of the given file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.strictEqual(headMain(
      mockReadFileSync, '-n', 1, 'hello.txt'), 'hello');
  });

  it('Should give the first ten lines of the given file', () => {
    const mockReadFileSync = mockReadData(
      ['numbers.txt'], '0\n1\n2\n3\n4\n5\n6\n7\n8\n9', 'utf8');
    assert.strictEqual(headMain(
      mockReadFileSync, 'numbers.txt'), '0\n1\n2\n3\n4\n5\n6\n7\n8\n9');
  });

  it('Should give error if unable to read file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.throws(() => headMain(mockReadFileSync, '-n', 1, 'something.txt'), {
      name: 'FileReadError',
      message: 'head: something.txt: No such file or directory',
      fileName: 'something.txt'
    });
  });

  it('Should give error if both option provided', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.throws(() => headMain(
      mockReadFileSync, '-n', 1, '-c', 10, 'something.txt'), {
      name: 'ParsingError',
      message: 'head: cannot combine line and byte counts',
    });
  });
});
