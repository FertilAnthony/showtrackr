'use strict';

module.exports = angular
  .module('showtrackr.ui', [
    'ui.router',
    'showtrackr.common',
    'showtrackr.data',
    'showtrackr.templates',
    'ui.bootstrap',
  ])
  .config(require('./config/route'))
  .controller('IndexController', require('./controllers/index'))
;
