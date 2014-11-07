'use strict';

/**
 * @ngInject
 */
function NavbarController($log, AuthService) {
  // ViewModel
  var vm = this;

	vm.test = 'test';
	console.log('test');

  vm.logout = function() {
  	$log.log('pass inside');
  	AuthService.logout();
  };
}

module.exports = NavbarController;
