const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('Should give a single line', () => {
    assert.strictEqual(tail('hello world', 1), 'hello world');
    assert.strictEqual(tail('bye world', 1), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(tail('hello\nworld', 2), 'hello\nworld');
    assert.strictEqual(tail('bye\nworld', 2), 'bye\nworld');
  });

  it('Should give in between emoty lines', () => {
    assert.strictEqual(tail('hello\n\nbye', 5), 'hello\n\nbye');
    assert.strictEqual(tail('bye\n\nhello', 5), 'bye\n\nhello');
  });

  it('Should give only the last line', () => {
    assert.strictEqual(tail('hello\n\nbye', 1), 'bye');
    assert.strictEqual(tail('bye\n\nhello', 1), 'hello');
  });
});
