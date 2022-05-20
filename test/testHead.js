const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head ', () => {
  it('Should give a line', () => {
    assert.strictEqual(head('hello world'), 'hello world');
    assert.strictEqual(head('bye world'), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('bye\nworld'), 'bye\nworld');
  });

  it('Should give one empty line', () => {
    assert.strictEqual(head(''), '');
  });

  it('Should give in between empty line', () => {
    assert.strictEqual(head('hello\n\nworld'), 'hello\n\nworld');
  });

  it('Should give a single line', () => {
    assert.strictEqual(head('hello', 1), 'hello');
  });

  it('Should give first line', () => {
    assert.strictEqual(head('hello\nworld', 1), 'hello');
    assert.strictEqual(head('bye\nworld', 1), 'bye');
  });
});
