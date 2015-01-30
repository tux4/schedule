'use strict';

angular.module('scheduleApp')
  .controller('CalendarCtrl', function ($scope, $modal, $http, socket) {
		
    $scope.savedEvents = [];
    $scope.eventSources = [
    ];

	$http.get('/api/events')
	  .success(function(allEvents) {
        $scope.savedEvents = allEvents;
        socket.syncUpdates('event', $scope.savedEvents);
        $scope.eventSources.push($scope.savedEvents);
	  });

	$scope.createEvent = function(startTime, endTime) {
		var newEvent = $modal.open({
			templateUrl: '/app/calendar/create_events.html',
			controller: 'EditEventCtrl',
			size: 'lg',
			resolve: {
				calendarParams: function () {
					return {
						startTime: moment(startTime),
					    endTime: moment(endTime),
					}
				}
			}
		})
	};

	$scope.editEvent = function(eventData) {
		var newEvent = $modal.open({
			templateUrl: '/app/calendar/create_events.html',
			controller: 'EditEventCtrl',
			size: 'lg',
			resolve: {
				calendarParams: function () {
					return {
						eventData: angular.copy(eventData),
                        modalTask: 'edit',
					}
				}
			}
		})
	};
	
	$scope.updateEvent = function(eventData) {
        delete eventData.source;
		$http.put('/api/events/' + eventData._id, eventData);
	};

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
		defaultView: 'agendaWeek',
		hiddenDays: [7],
        minTime: '08:00:00',
        maxTime: '19:00:00',
	    slotMinutes : 15,
        slotEventOverlap: false,
		timezone: 'UTC',
		ignoreTimezone: false,
		selectable: true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
		eventClick: $scope.editEvent,
		select: $scope.createEvent,
		eventDrop: $scope.updateEvent,
      },
    };
  })
  .controller('EditEventCtrl',  function($scope, $http, $modalInstance, socket, calendarParams) {
	$scope.modalTask = calendarParams.modalTask || 'new';
    $scope.allServices = $scope.allClients = [];
    $scope.endDateToggle = $scope.startDateToggle = false;
	$http.get('/api/services')
	  .success(function(allServices) {
		$scope.allServices = allServices;
	  });
	$http.get('/api/clients')
      .success(function(allClients) {
		$scope.allClients= allClients;
	  });
    $scope.newEvent = calendarParams.eventData || {
      type: 'appointment',
      start: calendarParams['startTime'],
      end: calendarParams['endTime'],
      client: { 'name': '' },
    };

	$scope.clientModelFormat = function(model) {
		if (!angular.isUndefined(model)) {
			$scope.newEvent.client = {
				'name': model.name,
				'email': model.email,
				'phone': model.phone,
			};
        }
	};
	
	$scope.$watch('newEvent.client', function(newValue, oldValue) {
		if (typeof(newValue) === 'string') {
			oldValue['name'] = newValue;
			delete oldValue['_id'];
			$scope.newEvent.client = oldValue;
		};
	});

	$scope.ok = function() {
      //Validation here?
      if ($scope.newEvent.type == "appointment") {
          $scope.newEvent.title = 'Client: ' + $scope.newEvent.client.name;
		  //Calculate the event end based on service length
		  $scope.newEvent.end = $scope.newEvent.start.clone().add($scope.newEvent.service.duration + $scope.newEvent.service.transition, 'minutes');
      } else {
		  delete $scope.newEvent.service;
		  delete $scope.newEvent.client;
      };
	  $http.post('/api/events', $scope.newEvent)
        .success(function() {
			$modalInstance.close($scope.newEvent);
        });
	}; 

    $scope.update = function() {
        delete $scope.newEvent.source;
		$http.put('/api/events/' + $scope.newEvent._id, $scope.newEvent)
          .success(function() {
		  	$modalInstance.close($scope.newEvent);
          });
    };

    $scope.delete = function() {
        $http.delete('/api/events/' + $scope.newEvent._id)
          .success(function() {
            $modalInstance.dismiss();
          });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
  });
