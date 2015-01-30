'use strict';

angular.module('scheduleApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Dashboard',
      'link': '/'
    },
	{
      'title': 'Calendar',
      'link': '/calendar'
    },
	{
      'title': 'Services',
      'link': '/services'
    },
	{
      'title': 'Clients',
      'link': '/clients'
    },
	];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
