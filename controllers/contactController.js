function contactController($scope, $location, $timeout) {
  //contact-form submit success
  $scope.submitMsg = function() {
    $location.path('contact-success');
    //redirect to home page
    $timeout(function() {
      $location.path('home');
    }, 2000);
  }
}

angular
  .module('app')
  .controller('contactController', contactController)
