<h1 align="center">
  <p>assert-enhanced</p>
</h1>

<p align="center">✨ An enhanced Node.js assert module.</p>

<p align="center">
  <a alt="Build Status" href="https://github.com/AshLePoney/node-assert-enhanced/workflows/Build">
    <img src="https://github.com/AshLePoney/node-assert-enhanced/workflows/Build/badge.svg" />
  </a>
  <a alt="Test Coverage" href="https://codeclimate.com/github/AshLePoney/node-assert-enhanced/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/071825472e6870f786e0/test_coverage" />
  </a>
  <a alt="Maintainability" href="https://codeclimate.com/github/AshLePoney/node-assert-enhanced/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/071825472e6870f786e0/maintainability" />
  </a>
  <a alt="Node requierement version" href="https://github.com/AshLePoney/node-assert-enhanced/blob/master/package.json">
    <img src="https://img.shields.io/node/v/chromatic-console.svg?longCache=true" />
  </a>
</p>

**IMPORTANT: This module is an improvement from [joyent/node-assert-plus](https://github.com/joyent/node-assert-plus) module with added assertions registration methods.**

## Installation:
```bash
npm install assert-enhanced
```

## Example:

```javascript
const assert = require('assert-enhanced');

function example (stdout, chunk, next) {
  assert.writable(stdout, 'stdout');
  assert.object(chunk, 'chunk');
  assert.string(chunk.id, 'chunk.id');
  assert.buffer(chunk.buffer, 'chunk.buffer');
  assert.func(next, 'next');

  // ...

  stdout.write(chunk);
}
```

Or to add a new assertion set
```javascript
const assert = require('assert-enhanced');

const definition = {
  custom: {
    check: (arg) => (arg instanceof Custom),
    operator: 'instanceof',
    actual: (arg) => Object.prototype.toString.call(arg).slice(8, -1)
  }
};

assert.register(null, definitions, { arrayOf: false, optionalArrayOf: false });

// Register to assert-enhanced:
// assert.custom
// assert.optionalCustom
// assert.arrayOfCustom         (generation disabled by options).
// assert.optionalArrayOfCustom (generation disabled by options).
```

## API:

The added assertions methods take two arguments, the value tested first and then the name of the checked parameter.

```javascript
assert.bool(myBoolArg, 'myBoolArg');
assert.optionalBool(myBoolArg, 'myBoolArg');
assert.arrayOfbool(myBoolArg, 'myBoolArg');
assert.optionalArrayOfBool(myBoolArg, 'myBoolArg');
```

On bad assertion it will throw an EnhancedAssertionError: 

```
AssertionError [ERR_ASSERTION]: myBoolArg (bool) is required.
    at Object.<anonymous> (/home/user/projects/test-assert-enhanced/test.js:3:8)
    at Module._compile (internal/modules/cjs/loader.js:1147:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1167:10)
    at Module.load (internal/modules/cjs/loader.js:996:32)
    at Function.Module._load (internal/modules/cjs/loader.js:896:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
```

### Enhanced:

- assert.EnhancedAssertionError
- assert.bool
- assert.number
- assert.string
- assert.symbol
- assert.object
- assert.func
- assert.array
- assert.asyncFunc
- assert.promise
- assert.date
- assert.regexp
- assert.buffer
- assert.stream
- assert.readable
- assert.writable
- assert.duplex
- assert.optionalBool
- assert.optionalNumber
- assert.optionalString
- assert.optionalSymbol
- assert.optionalObject
- assert.optionalFunc
- assert.optionalArray
- assert.optionalAsyncFunction
- assert.optionalPromise
- assert.optionalDate
- assert.optionalRegexp
- assert.optionalBuffer
- assert.optionalStream
- assert.optionalReadable
- assert.optionalWritable
- assert.optionalDuplex
- assert.arrayOfBool
- assert.arrayOfNumber
- assert.arrayOfString
- assert.arrayOfSymbol
- assert.arrayOfObject
- assert.arrayOfFunc
- assert.arrayOfArray
- assert.arrayOfAsyncFunc
- assert.arrayOfPromise
- assert.arrayOfDate
- assert.arrayOfRegexp
- assert.arrayOfBuffer
- assert.arrayOfStream
- assert.arrayOfReadable
- assert.arrayOfWritable
- assert.arrayOfDuplex
- assert.optionalArrayOfBool
- assert.optionalArrayOfNumber
- assert.optionalArrayOfString
- assert.optionalArrayOfSymbol
- assert.optionalArrayOfObject
- assert.optionalArrayOfFunc
- assert.optionalArrayOfArray
- assert.optionalArrayOfAsyncFunc
- assert.optionalArrayOfPromise
- assert.optionalArrayOfDate
- assert.optionalArrayOfRegexp
- assert.optionalArrayOfBuffer
- assert.optionalArrayOfStream
- assert.optionalArrayOfReadable
- assert.optionalArrayOfWritable
- assert.optionalArrayOfDuplex

### Enhanced registration methods:

- [assert.register](#assertregistertarget-definitions-options-target)
- [assert.registerStandardAssertion](#assertregisterstandardassertiontarget-name-definition-target)
- [assert.registerOptionalAssertion](#assertregisteroptionalassertiontarget-name-definition-target)
- [assert.registerArrayOfAssertion](#assertregisterarrayofassertiontarget-name-definition-target)
- [assert.registerOptionalArrayOfAssertion](#assertregisteroptionalarrayofassertiontarget-name-definition-target)
- [assert.getClassname](#assertgetclassnamearg-string)
- [assert.getTypeof](#assertgettypeofarg-string)

### Node.js assert module:

See more on Node.js assert module: https://nodejs.org/api/assert.html

- [assert](https://nodejs.org/api/assert.html#assert_assert_value_message)
- [assert.AssertionError](https://nodejs.org/api/assert.html#assert_class_assert_assertionerror)
- [assert.fail](https://nodejs.org/api/assert.html#assert_assert_fail_message)
- [assert.ok](https://nodejs.org/api/assert.html#assert_assert_ok_value_message)
- [assert.equal](https://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message) (deprecated)
- [assert.notEqual](https://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message) (deprecated)
- [assert.deepEqual](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message) (deprecated)
- [assert.notDeepEqual](https://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message) (deprecated)
- [assert.strictEqual](https://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message)
- [assert.notStrictEqual](https://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message)
- [assert.deepStrictEqual](https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message)
- [assert.notDeepStrictEqual](https://nodejs.org/api/assert.html#assert_assert_notdeepstrictequal_actual_expected_message)
- [assert.ifError](https://nodejs.org/api/assert.html#assert_assert_iferror_value)
- [assert.throws](https://nodejs.org/api/assert.html#assert_assert_throws_fn_error_message) (>= v10.0.0)
- [assert.rejects](https://nodejs.org/api/assert.html#assert_assert_rejects_asyncfn_error_message) (>= v10.0.0)
- [assert.doesNotThrow](https://nodejs.org/api/assert.html#assert_assert_doesnotthrow_fn_error_message) (>= v10.0.0)
- [assert.doesNotReject](https://nodejs.org/api/assert.html#assert_assert_doesnotreject_asyncfn_error_message) (>= v10.0.0)
- [assert.match](https://nodejs.org/api/assert.html#assert_assert_match_string_regexp_message) (>= v13.6.0)
- [assert.doesNotMatch](https://nodejs.org/api/assert.html#assert_assert_doesnotmatch_string_regexp_message) (>= v13.6.0)

#### assert.register(target, definitions, options)->target

Register assertions sets.

|   argument  |        type        |   details   |
|-------------|--------------------|-------------|
|    target   | Object or Function | The target where to save the generated assertion methods. If it's `null` or `undefined` then registration is processed on the exported module. |
| definitions |       Object       | The definitions object will wrap the definitions of the different assertions that need to be added. |
|   options   |  Object (optional) | The options object will store the states to know if we should cancel the generation of methods by types. Any registration type can be disabled using options ({ [type]: false }). |

Example:
```javascript
const definitions = {
  custom: {
    check: (arg) => (arg instanceof Custom),
    operator: 'instanceof',
    actual: assert.getClassname
  }
};

assert.register(null, definitions, { optionalArrayOf: false });

// Register [standard, optional, arrayOf]
```

#### assert.registerStandardAssertion(target, name, definition)->target

Register standard assertion.

|   argument   |        type        |   details   |
|--------------|--------------------|-------------|
|    target    | Object or Function | The target where to save the generated assertion methods. If it's `null` or `undefined` then registration is processed on the exported module. |
|     name     |       String       | The assertion method name. |
|  definition  |       Object       | The definitions object. |

Example:
```javascript
assert.registerStandardAssert(null, 'custom', {
  check: (arg) => (arg instanceof Custom),
  operator: 'instanceof',
  actual: assert.getClassname
});
```

#### assert.registerOptionalAssertion(target, name, definition)->target

Register optional assertion.

|   argument   |        type        |   details   |
|--------------|--------------------|-------------|
|    target    | Object or Function | The target where to save the generated assertion methods. If it's `null` or `undefined` then registration is processed on the exported module. |
|     name     |       String       | The assertion method name. |
|  definition  |       Object       | The definitions object. |

Example:
```javascript
assert.registerOptionalAssertion(null, 'custom', {
  check: (arg) => (arg instanceof Custom),
  operator: 'instanceof',
  actual: assert.getClassname
});
```

#### assert.registerArrayOfAssertion(target, name, definition)->target

Register arrayOf assertion.

|   argument   |        type        |   details   |
|--------------|--------------------|-------------|
|    target    | Object or Function | The target where to save the generated assertion methods. If it's `null` or `undefined` then registration is processed on the exported module. |
|     name     |       String       | The assertion method name. |
|  definition  |       Object       | The definitions object. |

Example:
```javascript
assert.registerArrayOfAssertion(null, 'custom', {
  check: (arg) => (arg instanceof Custom),
  operator: 'instanceof',
  actual: assert.getClassname
});
```

#### assert.registerOptionalArrayOfAssertion(target, name, definition)->target

Register optional arrayOf assertion.

|   argument   |        type        |   details   |
|--------------|--------------------|-------------|
|    target    | Object or Function | The target where to save the generated assertion methods. If it's `null` or `undefined` then registration is processed on the exported module. |
|     name     |       String       | The assertion method name. |
|  definition  |       Object       | The definitions object. |

Example:
```javascript
assert.registerOptionalArrayOfAssertion(null, 'custom', {
  check: (arg) => (arg instanceof Custom),
  operator: 'instanceof',
  actual: assert.getClassname
});
```

#### assert.getClassname(arg)->string

Get an object classname, it's used to seed the `actual` property from the definitions.

|   argument   |   type   |   details   |
|--------------|----------|-------------|
|      arg     |    any   |             |

#### assert.getTypeof(arg)->string

Get a typeof, it's used to seed the `actual` property from the definitions.

|   argument   |   type   |   details   |
|--------------|----------|-------------|
|      arg     |    any   |             |
