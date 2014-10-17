'use strict';

angular.module('scheduleApp')
  .controller('ServicesCtrl', function ($scope, $modal, $http, socket) {
    $scope.availableServices = [];
	$scope.addNewVisible = false;
    $http.get('/api/services').success(function(availableServices) {
      $scope.availableServices = availableServices;
      socket.syncUpdates('service', $scope.availableServices);
    });

    $scope.deleteService = function(service) {
      $http.delete('/api/services/' + service._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('service');
    });

    $scope.openNewServiceModal = function () {
      var newServiceModalInstance = $modal.open({
        templateUrl: '/app/services/edit_services.html',
        controller: 'NewServiceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
  
      newServiceModalInstance.result.then(function (newService) {
        $http.post('/api/services', newService );
      }, function () {
        //Cancelled
      });
    };
  })
  .controller('NewServiceCtrl', function($scope, $http, $modalInstance, socket) {
    $scope.newService = {};
	$scope.ok = function() {
      //Validation here?
	  $modalInstance.close($scope.newService);
	}; 
    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
  });
