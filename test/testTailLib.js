const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('Should give a line', () => {
    assert.strictEqual(tail('hello world'), 'hello world');
    assert.strictEqual(tail('bye world'), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(tail('hello\nworld'), 'hello\nworld');
    assert.strictEqual(tail('bye\nworld'), 'bye\nworld');
  });

  it('Should givein between emoty lines', () => {
    assert.strictEqual(tail('hello\n\nbye'), 'hello\n\nbye');
    assert.strictEqual(tail('bye\n\nhello'), 'bye\n\nhello');
  });
});
