const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('Should give a single line', () => {
    assert.strictEqual(tail('hello world',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'hello world');
    assert.strictEqual(tail('bye world',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'bye world');
  });

  it('Should give two lines', () => {
    assert.strictEqual(tail('hello\nworld',
      {
        '-n': { names: 'lines', limit: 2 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'hello\nworld');
    assert.strictEqual(tail('bye\nworld',
      {
        '-n': { names: 'lines', limit: 2 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'bye\nworld');
  });

  it('Should give in between emoty lines', () => {
    assert.strictEqual(tail('hello\n\nbye',
      {
        '-n': { names: 'lines', limit: 5 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'hello\n\nbye');
    assert.strictEqual(tail('bye\n\nhello',
      {
        '-n': { names: 'lines', limit: 5 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'bye\n\nhello');
  });

  it('Should give only the last line', () => {
    assert.strictEqual(tail('hello\n\nbye',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'bye');
    assert.strictEqual(tail('bye\n\nhello',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: undefined }
      }), 'hello');
  });

  it('Should give only the last character', () => {
    assert.strictEqual(tail('hello',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: 1 }
      }), 'o');
    assert.strictEqual(tail('bye',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: 1 }
      }), 'e');
  });

  it('Should give the last ten character', () => {
    assert.strictEqual(tail('hello\nworld\n',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: 10 }
      }), 'llo\nworld\n');
    assert.strictEqual(tail('bye\nworld\n',
      {
        '-n': { names: 'lines', limit: 1 },
        '-c': { names: 'bytes', limit: 10 }
      }), 'bye\nworld\n');
  });
});
