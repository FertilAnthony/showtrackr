'use strict';

/**
 * @ngInject
 */
function SignupController($log, AuthService) {
  // ViewModel
  var vm = this;

  vm.signup = function() {
  	AuthService.signup({
  		email: vm.email,
  		password: vm.password
  	});
  }
}

module.exports = SignupController;
