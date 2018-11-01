'use strict';

var jestGiven = require('./index');

global.given = jestGiven.given;
global.as = jestGiven.as;
