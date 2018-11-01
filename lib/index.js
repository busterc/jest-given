'use strict';

function given(what, next) {
  var prefix = 'given ' + what + ': ';
  return _given(prefix, next);
}

function as(what, next) {
  var prefix = what + ': ';
  return _given(prefix, next);
}

function doTest(name) {
  return function(fn, timeout) {
    return it(name, fn, timeout);
  };
}

function _given(what, next) {
  if (typeof next === 'function') {
    return describe(what, next);
  }

  function doIt(name, fn, timeout) {
    if (!fn) {
      return {
        test: doTest(what + name),
        xtest: noop
      };
    }
    return it(what + name, fn, timeout);
  }
  doIt.skip = noop;

  return {
    it: doIt,
    should: doIt,
    xit: noop,
    xshould: noop
  };
}

function noop() {}

module.exports = {
  given: given,
  as: as
};
