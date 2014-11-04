'use strict';

/**
 * @ngInject
 */
function ListController($log, ShowsList, $stateParams) {
  // ViewModel
  var vm = this;

  vm.shows = [];
  vm.currentPage = $stateParams.pagination;

  ShowsList.getPaginatedShowsList(vm.currentPage).then(function(shows) {
    vm.shows = shows;
    $log.log(shows);
  });
}

module.exports = ListController;
