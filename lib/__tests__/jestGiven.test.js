const { given, as } = require('../index.js');

class CustomError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'CustomError';
    this.message = message;
  }
}

describe('jest-given', () => {
  const binaryStringToNumber = binString => {
    if (!/^[01]+$/.test(binString)) {
      throw new CustomError('Not a binary number.');
    }

    return parseInt(binString, 2);
  };

  // Basic Test: given(what: String).it(what: String, testFunction: Function)
  given('a valid binary string').it('returns the correct number', () => {
    expect(binaryStringToNumber('100')).toBe(4);
  });

  // Nesting Tests using `as()`
  given('an invalid binary string', () => {
    // As(what: String).it(what: String, testFunction: Function)
    as('composed of non-numbers').it('throws CustomError', () => {
      expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);
    });

    as('with extra whitespace')
      .should('throws CustomError') // .should() is an alias for .it()
      .test(() => {
        expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);
      });
  });

  describe('Skipping tests', () => {
    given('".it.skip()"').it('skips test', () => {
      given('".it.skip()"').it.skip('skips test', () => {
        expect(false).toBeTruthy();
      });
    });

    given('".xit()"').it('skips test', () => {
      given('".xit()"').xit('skips test', () => {
        expect(false).toBeTruthy();
      });
    });

    given('".xshould()"').it('skips test', () => {
      given('".xshould()"').xshould('skips test', () => {
        expect(false).toBeTruthy();
      });
    });
  });
});
