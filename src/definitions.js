const { Stream, Readable, Writable, Duplex } = require('stream');
const { getClassname, getTypeof } = require('./utils.js');

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const OPERATOR_STRICTEQUAL = 'strictEqual';
const OPERATOR_INSTANCEOF = 'instanceof';

module.exports = {
  // Primitives types.
  bool: {
    check: (arg) => (typeof arg === 'boolean'),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },
  number: {
    check: (arg) => (typeof arg === 'number'),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },
  string: {
    check: (arg) => (typeof arg === 'string'),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },
  symbol: {
    check: (arg) => (typeof arg === 'symbol'),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },

  // No-primitives types.
  object: {
    check: (arg) => (typeof arg === 'object' && arg !== null),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },
  func: {
    check: (arg) => (typeof arg === 'function'),
    operator: OPERATOR_STRICTEQUAL,
    actual: getTypeof
  },

  // Javascript types.
  array: {
    check: (arg) => (Array.isArray(arg)),
    operator: 'Array.isArray',
    actual: getClassname
  },
  asyncFunc: {
    check: (arg) => (arg instanceof AsyncFunction),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  promise: {
    check: (arg) => (arg instanceof Promise),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  date: {
    check: (arg) => (arg instanceof Date),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  regexp: {
    check: (arg) => (arg instanceof RegExp),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },

  // Node.js types.
  buffer: {
    check: (arg) => (Buffer.isBuffer(arg)),
    operator: 'Buffer.isBuffer',
    actual: getClassname
  },
  stream: {
    check: (arg) => (arg instanceof Stream),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  readable: {
    check: (arg) => (arg instanceof Readable),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  writable: {
    check: (arg) => (arg instanceof Writable),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  },
  duplex: {
    check: (arg) => (arg instanceof Duplex),
    operator: OPERATOR_INSTANCEOF,
    actual: getClassname
  }
};
