'use strict';

angular.module('scheduleApp')
  .controller('ClientsCtrl', function ($scope, $modal, $http, socket) {
    $scope.allClients = [];
	$http.get('/api/clients')
	  .success(function(allClients) {
	    $scope.allClients = allClients;
	  });
  });

