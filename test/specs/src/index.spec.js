const defaultAssert = require('assert');
const path = require('path');
const enhancedAssert = require(path.resolve(__root, 'src/index.js'));
const definitions = require(path.resolve(__root, 'src/definitions.js'));

describe('module.exports (enhanced-assert)', () => {
  test('should exported module includes _utils methods object.', () => {
    expect(enhancedAssert).toHaveProperty('_utils');
    expect(enhancedAssert._utils).toHaveProperty('register');
    expect(enhancedAssert._utils).toHaveProperty('registerStandardAssert');
    expect(enhancedAssert._utils).toHaveProperty('registerOptionalAssert');
    expect(enhancedAssert._utils).toHaveProperty('registerArrayOfAssert');
    expect(enhancedAssert._utils).toHaveProperty('registerOptionalArrayOfAssert');
    expect(enhancedAssert._utils).toHaveProperty('getClassname');
    expect(enhancedAssert._utils).toHaveProperty('getTypeof');
  });

  test('should exported module includes default Node.js assert props', () => {
    Object.entries(defaultAssert).forEach(([name, assertion]) => {
      expect(enhancedAssert[name]).toBe(assertion);
    });
  });

  test('should exported module includes added assert props', () => {
    Object.keys(definitions).forEach((name) => {
      expect(enhancedAssert[name]).toBeInstanceOf(Function);
    });
  });
});

describe('assert._utils', () => {
  const utils = enhancedAssert._utils;

  describe('register', () => {
    test('throw an error when the "target" argument is not valid', () => {
      expect(() => utils.register(0, {}, {}))
        .toThrowError('The "target" argument must be an object or function.');
    });

    test('throw an error when the "definitions" argument is not valid', () => {
      expect(() => utils.register({}, null, {}))
        .toThrowError('The "definitions" argument must be an object.');
    });

    test('throw an error when the "options" argument is not valid', () => {
      expect(() => utils.register({}, {}, null))
        .toThrowError('The "options" argument must be an object.');
    });

    test('should return the provided target', () => {
      const defs = {
        custom: {
          check: (arg) => (typeof arg === 'boolean'),
          operator: 'strictEqual',
          actual: (arg) => typeof arg
        }
      };
      const ref = {};

      const ret = utils.register(ref, defs);

      expect(ref).toBe(ret);
    });

    test('should return the default exported module when "target" argument is not provided', () => {
      const testID = '__test__.module._utils.register[0]';
      const defs = {
        [testID]: {
          check: (arg) => (typeof arg === 'boolean'),
          operator: 'strictEqual',
          actual: (arg) => typeof arg
        }
      };

      const ret = utils.register(null, defs);

      expect(ret).toBe(enhancedAssert);
    });

    test('should not register method when options specify not', () => {
      const ret = utils.register({}, { custom: {} }, {
        standard: false,
        optional: false,
        arrayOf: false,
        optionalArrayOf: false
      });

      expect(ret).not.toHaveProperty('custom');
      expect(ret).not.toHaveProperty('optionalCustom');
      expect(ret).not.toHaveProperty('arrayOfCustom');
      expect(ret).not.toHaveProperty('optionalArrayOfCustom');
    });

    test('should register method', () => {
      const defs = {
        custom: {
          check: (arg) => (typeof arg === 'boolean'),
          operator: 'strictEqual',
          actual: (arg) => typeof arg
        }
      };

      const ret = utils.register({}, defs);

      expect(ret).toHaveProperty('custom');
      expect(ret).toHaveProperty('optionalCustom');
      expect(ret).toHaveProperty('arrayOfCustom');
      expect(ret).toHaveProperty('optionalArrayOfCustom');
    });
  });
});
