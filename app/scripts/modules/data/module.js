'use strict';

module.exports = angular
  .module('showtrackr.data', [
    'showtrackr.common'
  ])
  .factory('ShowFactory', require('./factory/showFactory'))
  .service('ShowsList', require('./service/showsList'))
;
