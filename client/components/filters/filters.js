angular.module("scheduleApp")
	.filter("calendar", [ function() {
		return function(input) {
			return moment(input).calendar();
		};
	}]);



