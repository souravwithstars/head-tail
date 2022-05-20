const assert = require('assert');
const { head, splitLines, joinLines } = require('../src/headLib.js');

describe.only('head ', () => {
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

describe('splitLines', () => {
  it('Should give array of a single element', () => {
    assert.deepStrictEqual(splitLines('hello'), ['hello']);
    assert.deepStrictEqual(splitLines('bye'), ['bye']);
  });

  it('Should give array of a two element', () => {
    assert.deepStrictEqual(splitLines('hello\nworld'), ['hello', 'world']);
    assert.deepStrictEqual(splitLines('bye\nworld'), ['bye', 'world']);
  });

  it('Should give in empty element', () => {
    assert.deepStrictEqual(splitLines(''), ['']);
  });

  it('Should give in between empty lines as elements', () => {
    assert.deepStrictEqual(
      splitLines('hello\n\nworld'), ['hello', '', 'world']);
    assert.deepStrictEqual(splitLines('bye\n\nworld'), ['bye', '', 'world']);
  });
});

describe('joinLines', () => {
  it('Should give a single line', () => {
    assert.deepStrictEqual(joinLines(['hello']), 'hello');
    assert.deepStrictEqual(joinLines(['bye']), 'bye');
  });

  it('Should give array of a two element', () => {
    assert.deepStrictEqual(joinLines(['hello', 'world']), 'hello\nworld');
    assert.deepStrictEqual(joinLines(['bye', 'world']), 'bye\nworld');
  });

  it('Should give in empty element', () => {
    assert.deepStrictEqual(joinLines(['']), '');
  });

  it('Should give in between empty lines as elements', () => {
    assert.deepStrictEqual(
      joinLines(['hello', '', 'world']), 'hello\n\nworld');
    assert.deepStrictEqual(joinLines(['bye', '', 'world']), 'bye\n\nworld');
  });
});
