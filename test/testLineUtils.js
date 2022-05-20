const assert = require('assert');
const { splitLines, joinLines, uptoNthEle } = require('../src/lineUtils.js');

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

describe.only('uptoNthEle', () => {
  it('Should give first elementof the given array', () => {
    assert.deepStrictEqual(uptoNthEle(['hello'], 1), ['hello']);
  });
});
