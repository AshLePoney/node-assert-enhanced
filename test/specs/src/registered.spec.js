/* eslint-disable no-array-constructor, no-new-func */

const path = require('path');
const { Stream, Readable, Writable, Duplex, Transform } = require('stream');
const enhancedAssert = require(path.resolve(__root, 'src/index.js'));
const { EnhancedAssertionError } = require(path.resolve(__root, 'src/errors.js'));
const { capitalize } = require(path.resolve(__root, 'src/utils.js'));

const stream = new Stream();
const readableStream = new Readable({ _read: () => {} });
const writableStream = new Writable({ _write: () => {} });
const duplexStream = new Duplex();
const transformStream = new Transform({ _transform: () => {} });

const entries = {
  // Primitives types.
  bool: {
    valid: [
      false,
      true
    ],
    invalid: [
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  number: {
    valid: [
      -1,
      0,
      1,
      Infinity
    ],
    invalid: [
      NaN,
      false,
      true,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  string: {
    valid: [
      '',
      'abc',
      String('abc')
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  symbol: {
    valid: [
      Symbol('__test__'),
      Symbol.for('__test__')
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      new Promise(() => {})
    ]
  },

  // No-primitives types.
  object: {
    valid: [
      {},
      Object(),
      Object.create(null)
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      function () {},
      async function () {},
      Symbol('__test__')
    ]
  },
  func: {
    valid: [
      function () {},
      async function () {},
      Function()
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },

  // Javascript types.
  array: {
    valid: [
      [],
      ['abc'],
      Array()
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  asyncFunc: {
    valid: [
      async function () {}
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  promise: {
    valid: [
      new Promise(() => {}),
      (async () => {})()
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__')
    ]
  },
  date: {
    valid: [
      new Date()
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      new Promise(() => {})
    ]
  },
  regexp: {
    valid: [
      /regexp/,
      new RegExp('')
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },

  // Node.js types.
  buffer: {
    valid: [
      Buffer.from('abc')
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  stream: {
    valid: [
      stream,
      readableStream,
      writableStream,
      duplexStream,
      transformStream
    ],
    invalid: [
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  readable: {
    valid: [
      readableStream,
      duplexStream,
      transformStream
    ],
    invalid: [
      writableStream,
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  writable: {
    valid: [
      writableStream,
      duplexStream,
      transformStream
    ],
    invalid: [
      readableStream,
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  },
  duplex: {
    valid: [
      duplexStream,
      transformStream
    ],
    invalid: [
      readableStream,
      writableStream,
      false,
      true,
      -1,
      0,
      1,
      'abc',
      /regexp/,
      {},
      [],
      ['abc'],
      function () {},
      async function () {},
      Symbol('__test__'),
      new Promise(() => {})
    ]
  }
};

Object.entries(entries).forEach(([name, type]) => {
  const capitalizedName = capitalize(name);

  test(`assert.${name}`, () => {
    type.valid.forEach((value) => {
      expect(() => enhancedAssert[name](value)).not.toThrow();
    });
    expect(() => enhancedAssert[name](null)).toThrowError(EnhancedAssertionError);
    expect(() => enhancedAssert[name](undefined)).toThrowError(EnhancedAssertionError);
    type.invalid.forEach((value) => {
      expect(() => enhancedAssert[name](value)).toThrowError(EnhancedAssertionError);
    });
  });

  test(`assert.optional${capitalizedName}`, () => {
    const key = `optional${capitalizedName}`;

    expect(() => enhancedAssert[key](null)).not.toThrow();
    expect(() => enhancedAssert[key](undefined)).not.toThrow();
    type.valid.forEach((value) => {
      expect(() => enhancedAssert[key](value)).not.toThrow();
    });
    type.invalid.forEach((value) => {
      expect(() => enhancedAssert[key](value)).toThrowError(EnhancedAssertionError);
    });
  });

  test(`assert.arrayOf${capitalizedName}`, () => {
    const key = `arrayOf${capitalizedName}`;

    expect(() => enhancedAssert[key](type.valid)).not.toThrow();
    expect(() => enhancedAssert[key](null)).toThrowError(EnhancedAssertionError);
    expect(() => enhancedAssert[key](undefined)).toThrowError(EnhancedAssertionError);
    expect(() => enhancedAssert[key](type.invalid)).toThrowError(EnhancedAssertionError);
  });

  test(`assert.optionalArrayOf${capitalizedName}`, () => {
    const key = `optionalArrayOf${capitalizedName}`;

    expect(() => enhancedAssert[key](null)).not.toThrow();
    expect(() => enhancedAssert[key](undefined)).not.toThrow();
    expect(() => enhancedAssert[key](type.valid)).not.toThrow();
    expect(() => enhancedAssert[key]({})).toThrowError(EnhancedAssertionError);
    expect(() => enhancedAssert[key](type.invalid)).toThrowError(EnhancedAssertionError);
  });
});
