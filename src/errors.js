const { AssertionError } = require('assert');

class EnhancedAssertionError extends AssertionError {
  /**
   * @param {string} name - The assertion type name.
   * @param {string} operator - The assertion operator.
   * @param {function|null|undefined} actual - The actual type getter.
   * @param {any} value - The asserted value.
   * @param {string} message - The error message.
   */
  constructor (name, operator, actual, value, message) {
    super({
      message: `${message} (${name}) is required.`,
      actual: typeof actual === 'function' ? actual(value) : typeof value,
      expected: name,
      operator: operator || 'strictEqual',
      stackStartFn: EnhancedAssertionError
    });

    Object.defineProperty(this, 'name', {
      enumerable: false,
      value: this.constructor.name
    });

    // Make no enumerable props.
    Object.defineProperty(this, 'generatedMessage', {
      enumerable: false,
      value: this.generatedMessage
    });
    Object.defineProperty(this, 'code', {
      enumerable: false,
      value: this.code
    });
    Object.defineProperty(this, 'actual', {
      enumerable: false,
      value: this.actual
    });
    Object.defineProperty(this, 'expected', {
      enumerable: false,
      value: this.expected
    });
    Object.defineProperty(this, 'operator', {
      enumerable: false,
      value: this.operator
    });
  }
}

module.exports = {
  EnhancedAssertionError
};
