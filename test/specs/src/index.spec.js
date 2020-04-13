const defaultAssert = require('assert');
const path = require('path');
const enhancedAssert = require(path.resolve(__root, 'src/index.js'));
const definitions = require(path.resolve(__root, 'src/definitions.js'));

describe('module.exports (enhanced-assert)', () => {
  test('should exported module includes registration methods.', () => {
    expect(enhancedAssert).toHaveProperty('register');
    expect(enhancedAssert).toHaveProperty('registerStandardAssert');
    expect(enhancedAssert).toHaveProperty('registerOptionalAssert');
    expect(enhancedAssert).toHaveProperty('registerArrayOfAssert');
    expect(enhancedAssert).toHaveProperty('registerOptionalArrayOfAssert');
    expect(enhancedAssert).toHaveProperty('getClassname');
    expect(enhancedAssert).toHaveProperty('getTypeof');
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

  test('should the export to be an assert method', () => {
    expect(() => enhancedAssert(true)).not.toThrow();
    expect(() => enhancedAssert([null].length)).not.toThrow();
    expect(() => enhancedAssert(false)).toThrowError(enhancedAssert.EnhancedAssertionError);
    expect(() => enhancedAssert([].length)).toThrowError(enhancedAssert.EnhancedAssertionError);
  });
});

describe('assert._enhancedAssert', () => {
  describe('register', () => {
    test('throw an error when the "target" argument is not valid', () => {
      expect(() => enhancedAssert.register(0, {}, {}))
        .toThrowError('The "target" argument must be an object or function.');
    });

    test('throw an error when the "definitions" argument is not valid', () => {
      expect(() => enhancedAssert.register({}, null, {}))
        .toThrowError('The "definitions" argument must be an object.');
    });

    test('throw an error when the "options" argument is not valid', () => {
      expect(() => enhancedAssert.register({}, {}, null))
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

      const ret = enhancedAssert.register(ref, defs);

      expect(ref).toBe(ret);
    });

    test('should return the default exported module when "target" argument is not provided', () => {
      const testID = '__test__.module._enhancedAssert.register[0]';
      const defs = {
        [testID]: {
          check: (arg) => (typeof arg === 'boolean'),
          operator: 'strictEqual',
          actual: (arg) => typeof arg
        }
      };

      const ret = enhancedAssert.register(null, defs);

      expect(ret).toBe(enhancedAssert);
    });

    test('should not register method when options specify not', () => {
      const ret = enhancedAssert.register({}, { custom: {} }, {
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

      const ret = enhancedAssert.register({}, defs);

      expect(ret).toHaveProperty('custom');
      expect(ret).toHaveProperty('optionalCustom');
      expect(ret).toHaveProperty('arrayOfCustom');
      expect(ret).toHaveProperty('optionalArrayOfCustom');
    });
  });
});
