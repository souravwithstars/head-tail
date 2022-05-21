const assert = require('assert');
const { head, selector } = require('../src/headLib.js');

describe('head ', () => {
  it('Should give a line', () => {
    assert.strictEqual(head('hello world', { lines: 1 }), 'hello world');
    assert.strictEqual(head('bye world', { lines: 1 }), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(head('hello\nworld', { lines: 2 }), 'hello\nworld');
    assert.strictEqual(head('bye\nworld', { lines: 2 }), 'bye\nworld');
  });

  it('Should give one empty line', () => {
    assert.strictEqual(head('', { lines: 1 }), '');
  });

  it('Should give in between empty line', () => {
    assert.strictEqual(head('hello\n\nworld', { lines: 3 }),
      'hello\n\nworld');
  });

  it('Should give first line', () => {
    assert.strictEqual(head('hello\nworld', { lines: 1 }), 'hello');
    assert.strictEqual(head('bye\nworld', { lines: 1 }), 'bye');
  });

  it('Should give first character', () => {
    assert.strictEqual(head('hello', { bytes: 1 }), 'h');
    assert.strictEqual(head('bye', { bytes: 1 }), 'b');
  });

  it('Should give no character', () => {
    assert.strictEqual(head('hello', { bytes: 0 }), '');
  });

  it('Should give first 10 characters', () => {
    assert.strictEqual(head('hello world', { bytes: 10 }), 'hello worl');
    assert.strictEqual(head('bye bye world', { bytes: 10 }), 'bye bye wo');
  });
});

describe('selector', () => {
  it('Should give newLine as separator and lines as option', () => {
    assert.deepStrictEqual(selector({ lines: 1, bytes: undefined }),
      { separator: '\n', option: 1 });
  });

  it('Should give empty charcater as separator and bytes as option', () => {
    assert.deepStrictEqual(selector({ lines: 1, bytes: 10 }),
      { separator: '', option: 10 });
  });
});
