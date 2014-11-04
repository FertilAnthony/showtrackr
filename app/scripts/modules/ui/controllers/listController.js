'use strict';

/**
 * @ngInject
 */
function ListController($log, ShowsList) {
  // ViewModel
  var vm = this;

  vm.shows = [];
  ShowsList.getPaginatedShowsList().then(function(shows) {
    vm.shows = shows;
    $log.log(shows);
  });
}

module.exports = ListController;
