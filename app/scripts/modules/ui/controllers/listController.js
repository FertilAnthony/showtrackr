'use strict';

/**
 * @ngInject
 */
function ListController($log, listShowsFactory) {
  // ViewModel
  var vm = this;

  vm.shows = [];

  listShowsFactory.forEach(function(show) {
    show.notes.mean = parseFloat(show.notes.mean).toFixed(1);
  });
  
  vm.shows = listShowsFactory;
}

module.exports = ListController;
