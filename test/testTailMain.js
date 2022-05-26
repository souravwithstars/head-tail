const assert = require('assert');
const { tailMain } = require('../src/tailLib.js');

const { mockReadData } = require('./testHeadMain.js');

describe('tailMain', () => {
  it('Should give the lines of given single file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.strictEqual(tailMain(mockReadFileSync, 'hello.txt'), 'hello');
  });
});
