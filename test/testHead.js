const assert = require('assert');
const { head } = require('../src/head.js');

describe('head ', () => {
  it('Should give a line', () => {
    assert.strictEqual(head('hello world'), 'hello world');
    assert.strictEqual(head('bye world'), 'bye world');
  });
});
