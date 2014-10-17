angular.module("scheduleApp")
	.directive("cardService", ['$parse', '$timeout', '$http', function($parse, $timeout, $http) {
		function link($scope, $element, $attrs) {
			console.debug("Link Service");
			$scope.editMode = false;

			$scope.editService = function() {
				$scope.newServiceData = angular.copy($scope.serviceData);
				$scope.editMode = true;
			};

			$scope.deleteService = function() {
				$http.delete('/api/services/'+$scope.serviceData._id);
			};

			$scope.updateService = function() {
				$scope.serviceData = $scope.newServiceData;
				$http.put('/api/services/'+$scope.serviceData._id, $scope.serviceData);
				$scope.editMode = false;
			};	
			$scope.cancelUpdate = function() {
				$scope.editMode = false;
			};
		};
		return {
			restrict: 'EA',
			link: link,
			scope: {
				'serviceData': '=?',
			},
			templateUrl: "/components/directives/templates/service-card.html"
		};
	}]);



