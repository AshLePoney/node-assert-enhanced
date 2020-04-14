const { AssertionError } = require('assert');

class EnhancedAssertionError extends AssertionError {
  /**
   * @param {object} options - The error options.
   * @param {string} options.message - If provided, the error message is set to this value.
   * @param {any} options.actual - The actual property on the error instance.
   * @param {any} options.expected - The expected property on the error instance.
   * @param {string} options.operator - The operator property on the error instance.
   * @param {Function} stackStartFn - If provided, the generated stack trace omits frames before this function.
   */
  constructor (options) {
    super(options);

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
