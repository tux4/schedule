'use strict';

angular.module('scheduleApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/services', {
        templateUrl: 'app/services/services.html',
        controller: 'ServicesCtrl'
      });
  });
