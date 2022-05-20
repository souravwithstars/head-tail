const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head ', () => {
  it('Should give a line', () => {
    assert.strictEqual(head('hello world', { count: 1 }), 'hello world');
    assert.strictEqual(head('bye world', { count: 1 }), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(head('hello\nworld', { count: 2 }), 'hello\nworld');
    assert.strictEqual(head('bye\nworld', { count: 2 }), 'bye\nworld');
  });

  it('Should give one empty line', () => {
    assert.strictEqual(head('', { count: 1 }), '');
  });

  it('Should give in between empty line', () => {
    assert.strictEqual(head('hello\n\nworld', { count: 3 }),
      'hello\n\nworld');
  });

  it('Should give first line', () => {
    assert.strictEqual(head('hello\nworld', { count: 1 }), 'hello');
    assert.strictEqual(head('bye\nworld', { count: 1 }), 'bye');
  });
});
