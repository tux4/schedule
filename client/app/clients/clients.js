'use strict';

angular.module('scheduleApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clients', {
        templateUrl: 'app/clients/clients.html',
        controller: 'ClientsCtrl'
      });
  });
