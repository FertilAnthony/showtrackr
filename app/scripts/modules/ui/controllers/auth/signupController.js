'use strict';

/**
 * @ngInject
 */
function SignupController($log, AuthService, $location) {
  // ViewModel
  var vm = this;

  vm.signup = function(form) {
  	AuthService.signup({
  		email: vm.email,
  		username: vm.username,
  		password: vm.password
  	},
  	function(err) {
  		if (!err) {
  			$location.path('/');
  		}
  	});
  }
}

module.exports = SignupController;
