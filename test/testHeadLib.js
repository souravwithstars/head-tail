const assert = require('assert');
const { head, displayRawContent, headFiles, forLines, forBytes,
  splitLines, joinLines } = require('../src/headLib.js');
const { mockConsole, mockReadData } = require('./testHeadMain.js');

describe('head', () => {
  it('Should give a line', () => {
    const options = {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    };
    assert.strictEqual(head('hello\nworld', options), 'hello');
    assert.strictEqual(head('bye\nworld', options), 'bye');
  });

  it('Should give two lines', () => {
    const options = {
      '-n': { name: 'lines', limit: 2 },
      '-c': { name: 'bytes', limit: undefined }
    };
    assert.strictEqual(head('hello\ngood\nmorning', options), 'hello\ngood');
    assert.strictEqual(head('good\nmorning\nsourav', options), 'good\nmorning');
  });

  it('Should give in between empty line', () => {
    const content = 'hello\n\nworld\ngood\nmorning';
    const options = {
      '-n': { name: 'lines', limit: 3 },
      '-c': { name: 'bytes', limit: undefined }
    };
    assert.strictEqual(head(content, options), 'hello\n\nworld');
  });

  it('Should give first character', () => {
    const options = {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 1 }
    };
    assert.strictEqual(head('hello', options), 'h');
    assert.strictEqual(head('bye', options), 'b');
  });

  it('Should give first 10 characters', () => {
    const options = {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 10 }
    };
    assert.strictEqual(head('hello world', options), 'hello worl');
    assert.strictEqual(head('bye bye world', options), 'bye bye wo');
  });
});

describe('forLines', () => {
  it('Should gives first counted lines from given content', () => {
    const content = 'hello\nworld\ngood\nmorning';
    const options = {
      '-n': { name: 'lines', limit: 2 },
      '-c': { name: 'bytes', limit: undefined }
    };
    assert.strictEqual(forLines(content, options), 'hello\nworld');
  });

  it('Should gives first counted lines from given content', () => {
    const content = 'hello\nworld\ngood\nmorning';
    const options = {
      '-n': { name: 'lines', limit: 1 },
      '-c': { name: 'bytes', limit: undefined }
    };
    assert.strictEqual(forLines(content, options), 'hello');
  });
});

describe('forBytes', () => {
  it('Should gives first counted characters from given content', () => {
    const content = 'hello\nworld\ngood\nmorning';
    const options = {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 11 }
    };
    assert.strictEqual(forBytes(content, options), 'hello\nworld');
  });

  it('Should gives first counted characters from given content', () => {
    const content = 'hello\nworld\ngood\nmorning';
    const options = {
      '-n': { name: 'lines', limit: 10 },
      '-c': { name: 'bytes', limit: 16 }
    };
    const expected = 'hello\nworld\ngood';
    assert.strictEqual(forBytes(content, options), expected);
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
