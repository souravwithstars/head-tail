const assert = require('assert');
const { head, selector } = require('../src/headLib.js');

describe('head ', () => {
  it('Should give a line', () => {
    assert.strictEqual(head('hello world', {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'hello world');
    assert.strictEqual(head('bye world', {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(head('hello\nworld', {
      '-n': { name: 'lines', limit: 2 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'hello\nworld');
    assert.strictEqual(head('bye\nworld', {
      '-n': { name: 'lines', limit: 2 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'bye\nworld');
  });

  it('Should give one empty line', () => {
    assert.strictEqual(head('', {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), '');
  });

  it('Should give in between empty line', () => {
    assert.strictEqual(head('hello\n\nworld', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'hello\n\nworld');
  });

  it('Should give first line', () => {
    assert.strictEqual(head('hello\nworld', {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'hello');
    assert.strictEqual(head('bye\nworld', {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), 'bye');
  });

  it('Should give first character', () => {
    assert.strictEqual(head('hello', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 1 }
    }), 'h');
    assert.strictEqual(head('bye', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 1 }
    }), 'b');
  });

  it('Should give no character', () => {
    assert.strictEqual(head('hello', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 0 }
    }), '');
  });

  it('Should give first 10 characters', () => {
    assert.strictEqual(head('hello world', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 10 }
    }), 'hello worl');
    assert.strictEqual(head('bye bye world', {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 10 }
    }), 'bye bye wo');
  });
});

describe('selector', () => {
  it('Should give newLine as separator and lines limit as value', () => {
    assert.deepStrictEqual(selector({
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    }), { separator: '\n', value: 1 });
  });

  it('Should give empty charcater as separator and bytes as option', () => {
    assert.deepStrictEqual(selector({
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 10 }
    }), { separator: '', value: 10 });
  });
});
