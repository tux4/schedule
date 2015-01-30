'use strict';

angular.module('scheduleApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.upComingEvents = [];

    $http({
		url:'/api/events', 
		method:"GET", 
		params:{ "start": moment.utc().format("YYYY-MM-DDTHH:mm:ss") }
	}).success(function(upComingEvents) {
		$scope.upComingEvents = upComingEvents;
		socket.syncUpdates('client', $scope.upComingEvents);
	});

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('client');
    });
  });
