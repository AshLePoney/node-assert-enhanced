const assert = require('assert');
const definitions = require('./definitions.js');
const { EnhancedAssertionError } = require('./errors.js');
const { capitalize, getClassname, getTypeof } = require('./utils.js');

/**
 * Register assertions set.
 * Any registration type can be disabled using options ({ [type]: false }).
 * @param {object|function} target - The target where to save the generated assertion methods.
 *                                   If it's not provided then registration is processed on the exported module.
 * @param {object} definitions - The definitions object.
 * @param {object} [options={}] - The optional options object.
 * @returns {object|function} The target.
 * @throws {Error} Invalid arguments.
 */
function register (target, definitions, options = {}) {
  target = _ensureTarget(target);

  _throwOnInvalidTarget(target);
  if (definitions === null || typeof definitions !== 'object') {
    throw new Error('The "definitions" argument must be an object.');
  }
  if (options === null || typeof options !== 'object') {
    throw new Error('The "options" argument must be an object.');
  }

  if (options.standard !== false) {
    Object.entries(definitions).forEach(([name, definition]) => {
      registerStandardAssert(target, name, definition);
    });
  }
  if (options.optional !== false) {
    Object.entries(definitions).forEach(([name, definition]) => {
      registerOptionalAssert(target, name, definition);
    });
  }
  if (options.arrayOf !== false) {
    Object.entries(definitions).forEach(([name, definition]) => {
      registerArrayOfAssert(target, name, definition);
    });
  }
  if (options.optionalArrayOf !== false) {
    Object.entries(definitions).forEach(([name, definition]) => {
      registerOptionalArrayOfAssert(target, name, definition);
    });
  }

  return target;
}

/**
 * Register a standard assertion.
 * @param {object|function} target - The target where to save the generated assertion methods.
 *                                   If it's not provided then registration is processed on the exported module.
 * @param {string} name - The assertion method name.
 * @param {object} definition - The definitions object.
 * @returns {object|function} The target.
 * @throws {Error} Invalid arguments.
 */
function registerStandardAssert (target, name, definition) {
  target = _ensureTarget(target);

  _throwOnInvalidRegistrationCallArguments(target, name, definition);

  Object.assign(target, {
    [name]: function (arg, message) {
      _hasPassedCheckOrThrow(name, definition, arg, message);
    }
  });

  return target;
}

/**
 * Register an optional assertion.
 * @param {object|function} target - The target where to save the generated assertion methods.
 *                                   If it's not provided then registration is processed on the exported module.
 * @param {string} name - The assertion method name.
 * @param {object} definition - The definitions object.
 * @returns {object|function} The target.
 * @throws {Error} Invalid arguments.
 */
function registerOptionalAssert (target, name, definition) {
  target = _ensureTarget(target);
  const capitalizedName = `optional${capitalize(name)}`;

  _throwOnInvalidRegistrationCallArguments(target, capitalizedName, definition);

  Object.assign(target, {
    [capitalizedName]: function (arg, message) {
      if (arg === null || typeof arg === 'undefined') {
        return;
      }
      _hasPassedCheckOrThrow(name, definition, arg, message);
    }
  });

  return target;
}

/**
 * Register an arrayof assertion.
 * @param {object|function} target - The target where to save the generated assertion methods.
 *                                   If it's not provided then registration is processed on the exported module.
 * @param {string} name - The assertion method name.
 * @param {object} definition - The definitions object.
 * @returns {object|function} The target.
 * @throws {Error} Invalid arguments.
 */
function registerArrayOfAssert (target, name, definition) {
  target = _ensureTarget(target);
  const capitalizedName = `arrayOf${capitalize(name)}`;

  _throwOnInvalidRegistrationCallArguments(target, capitalizedName, definition);

  Object.assign(target, {
    [capitalizedName]: function (arg, message) {
      if (!Array.isArray(arg)) {
        throw new EnhancedAssertionError(capitalizedName, definition.operator, definition.actual, arg, message);
      }
      for (let i = 0; i < arg.length; ++i) {
        _hasPassedCheckOrThrow(name, definition, arg[i], message);
      }
    }
  });

  return target;
}

/**
 * Register an optional arrayof assertion.
 * @param {object|function} target - The target where to save the generated assertion methods.
 *                                   If it's not provided then registration is processed on the exported module.
 * @param {string} name - The assertion method name.
 * @param {object} definition - The definitions object.
 * @returns {object|function} The target.
 * @throws {Error} Invalid arguments.
 */
function registerOptionalArrayOfAssert (target, name, definition) {
  target = _ensureTarget(target);
  const capitalizedName = `optionalArrayOf${capitalize(name)}`;

  _throwOnInvalidRegistrationCallArguments(target, capitalizedName, definition);

  Object.assign(target, {
    [capitalizedName]: function (arg, message) {
      if (arg === null || typeof arg === 'undefined') {
        return;
      }
      if (!Array.isArray(arg)) {
        throw new EnhancedAssertionError(capitalizedName, definition.operator, definition.actual, arg, message);
      }
      for (let i = 0; i < arg.length; ++i) {
        _hasPassedCheckOrThrow(name, definition, arg[i], message);
      }
    }
  });

  return target;
}

function _throwOnInvalidRegistrationCallArguments (target, name, definition) {
  _throwOnInvalidTarget(target);
  _throwOnInvalidNameArgument(name);
  _throwOnInvalidDefinition(definition);
  _throwOnUnavailabilityProperty(target, name);
}

function _throwOnInvalidTarget (target) {
  if (typeof target !== 'object' && typeof target !== 'function') {
    throw new Error('The "target" argument must be an object or function.');
  }
}

function _throwOnInvalidNameArgument (name) {
  if (typeof name !== 'string') {
    throw new Error('The "name" argument must be type string.');
  }
}

function _throwOnInvalidDefinition (definition) {
  if (definition === null || typeof definition !== 'object') {
    throw new Error('The "definition" argument must be an object.');
  }
}

function _throwOnUnavailabilityProperty (target, name) {
  if (name in target) {
    throw new Error('The "name" argument is already used and not buildable again.');
  }
}

function _hasPassedCheckOrThrow (name, definition, arg, message) {
  if (!definition.check(arg)) {
    throw new EnhancedAssertionError(name, definition.operator, definition.actual, arg, message);
  }
}

function _ensureTarget (target) {
  return (target === null || typeof target === 'undefined') ? exports : target;
}

module.exports = exports = (() => {
  const mod = function assert (arg, message) {
    if (!arg) {
      throw new EnhancedAssertionError('truthy', 'strictEqual', getTypeof, arg, message);
    }
  };

  // Store the registration methods to the export to allow user to create custom assertions.
  Object.defineProperty(mod, 'register', {
    value: register
  });
  Object.defineProperty(mod, 'registerStandardAssert', {
    value: registerStandardAssert
  });
  Object.defineProperty(mod, 'registerOptionalAssert', {
    value: registerOptionalAssert
  });
  Object.defineProperty(mod, 'registerArrayOfAssert', {
    value: registerArrayOfAssert
  });
  Object.defineProperty(mod, 'registerOptionalArrayOfAssert', {
    value: registerOptionalArrayOfAssert
  });
  Object.defineProperty(mod, 'getClassname', {
    value: getClassname
  });
  Object.defineProperty(mod, 'getTypeof', {
    value: getTypeof
  });

  // Export the default Node.js assert module.
  Object.entries(assert).forEach(([name, assertion]) => {
    Object.assign(mod, {
      [name]: assertion
    });
  });

  // Export the custom error;
  Object.assign(mod, { EnhancedAssertionError });

  // Export the added types assertions.
  return register(mod, definitions);
})();
