const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('Should give a line', () => {
    assert.strictEqual(tail('hello world'), 'hello world');
    assert.strictEqual(tail('bye world'), 'bye world');
  });
});
