'use strict';

/**
 * @ngInject
 */
function DetailController($log, showDetailFactory) {
  // ViewModel
  var vm = this;

  vm.showDetail = [];

  vm.showDetail = showDetailFactory;
  $log.log(vm.showDetail);

}

module.exports = DetailController;
