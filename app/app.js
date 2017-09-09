var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/about.html',
        controller: 'artController',
      })
      .when('/gallery', {
        templateUrl: 'views/artGallery.html',
        controller: 'artController',
      })
      .when('/videos', {
        templateUrl: 'views/videoGall.html',
        controller: 'vidController',
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactController',
      })
      .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'artController'
      })
      .otherwise({
        redirectTo: 'home'
      })


  }]);
