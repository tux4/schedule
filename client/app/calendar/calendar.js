'use strict';

angular.module('scheduleApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/calendar', {
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl'
      });
  });
