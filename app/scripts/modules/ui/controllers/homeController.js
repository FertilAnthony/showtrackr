'use strict';

/**
 * @ngInject
 */
function IndexController($log, ShowsList) {
  // ViewModel
  var vm = this;

  vm.headingTitle = 'Top TV shows';
  vm.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'];
  vm.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
    'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
    'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
    'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
    'Travel'];

  vm.shows = [];
  ShowsList.getShowsList().then(function(shows) {
  	vm.shows = shows;
  	$log.log(shows);
  });

}

module.exports = IndexController;
