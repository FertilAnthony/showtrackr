'use strict';

/**
 * @ngInject
 */
function ListController($log, listShowsFactory) {
  // ViewModel
  var vm = this;

  vm.shows = [];
  
  vm.shows = listShowsFactory;
  $log.log(vm.shows);
}

module.exports = ListController;
