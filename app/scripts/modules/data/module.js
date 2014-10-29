'use strict';

module.exports = angular
  .module('showtrackr.data', [
    'showtrackr.common'
  ])
  .factory('ShowFactory', require('./facotry/showFactory'))
;
