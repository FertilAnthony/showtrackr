'use strict';

module.exports = angular
  .module('showtrackr.common', [])
  .factory('Tracer', require('./services/tracer'))
;
