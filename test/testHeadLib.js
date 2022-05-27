const assert = require('assert');
const { head, selector, displayRawContent,
  headFiles } = require('../src/headLib.js');
const { mockConsole, mockReadData } = require('./testHeadMain.js');

describe('head', () => {
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

describe('displayContent', () => {
  it('Should display the content of given single file', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    displayRawContent({
      content: 'hello'
    }, mockedConsole.log, mockedConsole.error);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should display the error for status of error true', () => {
    const expContent = ['head: something.txt: No such file or directory'];
    const mockedConsole = mockConsole(expContent);
    displayRawContent({
      message: 'something.txt: No such file or directory'
    }, mockedConsole.log, mockedConsole.error);
    assert.ok(mockedConsole.index === 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });
});

describe('headFiles', () => {
  it('Should give a list of file, content and status of given files', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    assert.deepStrictEqual(headFiles(mockReadFileSync, ['hello.txt'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), [{ fileName: 'hello.txt', content: 'hello' }]);
  });

  it('Should give errorOccurred in status as true for wrong file', () => {
    const mockReadFileSync = mockReadData(['hello.txt'], 'hello', 'utf8');
    const expected = [{
      fileName: 'something.txt',
      message: 'something.txt: No such file or directory'
    }];
    assert.deepStrictEqual(headFiles(mockReadFileSync, ['something.txt'], {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: undefined }
    }), expected);
  });
});
