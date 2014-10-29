'use strict';

module.exports = angular
  .module('showtrackr.ui', [
    'ui.router',
    'showtrackr.common',
    'showtrackr.data',
    'showtrackr.templates',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
    'ngCookies',
  ])
  .config(require('./config/route'))
  .controller('IndexController', require('./controllers/index'))
;
