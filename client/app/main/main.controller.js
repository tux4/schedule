'use strict';

angular.module('scheduleApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/clients').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('client', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/clients', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(client) {
      $http.delete('/api/clients/' + client._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('client');
    });
  });
