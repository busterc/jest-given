# jest-given [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Consistently readable test descriptions for Jest

## FYI

This little test description helper was inspired by Eric Elliot's [RITEway](https://github.com/ericelliott/riteway)
and his article [5 Questions Every Unit Test Must Answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

## Installation

```sh
$ npm install --save-dev jest-given # yarn add -D jest-given
```

## Usage

```js
const { given, as } = require('jest-given');

const binaryStringToNumber = binString => {
  if (!/^[01]+$/.test(binString)) {
    throw new CustomError('Not a binary number.');
  }
  return parseInt(binString, 2);
};

describe('binaryStringToNumber', () => {
  // Basic Test: given(what: String).it(what: String, testFunction: Function)
  given('a valid binary string').it('returns the correct number', () => {
    expect(binaryStringToNumber('100')).toBe(4);
  });

  // Nesting Tests using `as()`
  given('an invalid binary string', () => {
    // as(what: String).it(what: String, testFunction: Function)
    as('composed of non-numbers').it('throws CustomError', () => {
      expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);
    });

    // .should() is an alias for .it()
    as('with extra whitespace').should('throws CustomError', () => {
      expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);
    });
  });
});
```

Results:

```sh
PASS
  binaryStringToNumber
    ✓ given a valid binary string: returns the correct number
    given an invalid binary string:
      ✓ composed of non-numbers: throws CustomError
      ✓ with extra whitespace: throws CustomError
```

## API

### `given(what [, nest])`

Starts a chain of descriptions that finally result in executing a test.

- `what`

  - `Required` : `String` describes what is given to the test function

- `nest`

  - `Optional` : `Function` allows nesting tests under a Jest `describe()` using `what`

If `nest` _IS NOT_ provided: Returns chained function `.it()` (and an alias: `.should()`)

- #### `.it(what, fn, timeout)`

  Has the same signature as Jest's `it()`.

  - `what`

    - `Required` : `String` describes the results of the test function

- #### `.it.skip(...)` or `.xit(...)` or `.xshould(...)`

  When you are maintaining a large codebase, you may sometimes find a test that is temporarily broken for some reason. If you want to skip running this test, but you don't want to just delete this code, you can use `.it.skip` to specify some tests to skip.

If `nest` _IS_ provided, using `as()` for describing nested tests provides
the same API as `given()` however, it's description is simplified for clarity.

- ### `as(what [, nest])`

## Optional Setup: using `setupTestFrameworkScriptFile` Jest configuration

Add `jest-given` to your Jest `setupTestFrameworkScriptFile` configuration. [See for help](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string)

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-given/setup"
}
```

If you are already using another test framework, like [jest-extended](https://github.com/jest-community/jest-extended), then you should create a test setup file and `require` each of the frameworks you are using (including `jest-given` 😉)

For example:

```js
// ./testSetup.js
require('jest-given');
require('any other test framework libraries you are using');
```

Then in your Jest config:

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

For linting you'll need to define these globals in your test files:

```js
/* globals given, as */
```

## License

ISC © [Buster Collings]()

[npm-image]: https://badge.fury.io/js/jest-given.svg
[npm-url]: https://npmjs.org/package/jest-given
[travis-image]: https://travis-ci.org/busterc/jest-given.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/jest-given
[daviddm-image]: https://david-dm.org/busterc/jest-given.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/jest-given
[coveralls-image]: https://coveralls.io/repos/busterc/jest-given/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/jest-given
