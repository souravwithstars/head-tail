const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadData = (mockFile, content, mockEncoding) => {
  return (fileName, encoding) => {
    assert.equal(fileName, mockFile);
    assert.equal(encoding, mockEncoding);
    return content;
  };
};

describe('headMain', () => {
  it('Should give the lines of given single file', () => {
    const mockReadFileSync = mockReadData('hello.txt', 'hello', 'utf8');
    assert.strictEqual(headMain('hello.txt', mockReadFileSync), 'hello');
  });
});
