const assert = require('assert');
const { splitLines, joinLines, uptoNthEle } = require('../src/lineUtils.js');

describe('splitLines', () => {
  it('Should give array of a single element', () => {
    assert.deepStrictEqual(splitLines('hello', '\n'), ['hello']);
    assert.deepStrictEqual(splitLines('bye', '\n'), ['bye']);
  });

  it('Should give array of a two element', () => {
    assert.deepStrictEqual(splitLines('bye\nworld', '\n'), ['bye', 'world']);
    assert.deepStrictEqual(splitLines('bye\nbye', '\n'), ['bye', 'bye']);
  });

  it('Should give in empty element', () => {
    assert.deepStrictEqual(splitLines('', '\n'), ['']);
  });

  it('Should give five elements', () => {
    assert.deepStrictEqual(splitLines('hello', ''), ['h', 'e', 'l', 'l', 'o']);
  });

  it('Should give in between empty lines as elements', () => {
    assert.deepStrictEqual(
      splitLines('hello\n\nworld', '\n'), ['hello', '', 'world']);
    assert.deepStrictEqual(splitLines('bye\n\nworld', ''),
      ['b', 'y', 'e', '\n', '\n', 'w', 'o', 'r', 'l', 'd']);
  });
});

describe('joinLines', () => {
  it('Should give a single line', () => {
    assert.deepStrictEqual(joinLines(['hello'], '\n'), 'hello');
    assert.deepStrictEqual(joinLines(['bye'], '\n'), 'bye');
  });

  it('Should give array of a two element', () => {
    assert.deepStrictEqual(joinLines(['hello', 'world'], '\n'), 'hello\nworld');
    assert.deepStrictEqual(joinLines(['bye', 'world'], '\n'), 'bye\nworld');
  });

  it('Should give in empty element', () => {
    assert.deepStrictEqual(joinLines([''], '\n'), '');
  });

  it('Should give in between empty lines as elements', () => {
    assert.deepStrictEqual(
      joinLines(['hello', '', 'world'], '\n'), 'hello\n\nworld');
    assert.deepStrictEqual(joinLines(
      ['b', 'y', 'e', '', '', 'w', 'o', 'r', 'l', 'd'], ''), 'byeworld');
  });
});

describe('uptoNthEle', () => {
  it('Should give first element of the given array', () => {
    assert.deepStrictEqual(uptoNthEle(['hello'], 1), ['hello']);
  });

  it('Should give first ten element of the given array', () => {
    assert.deepStrictEqual(uptoNthEle(
      ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'],
      10), ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']);
  });
});
