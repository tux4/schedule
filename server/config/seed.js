/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Client = require('../api/client/client.model');
var Service = require('../api/service/service.model');

Client.find({}).remove(function() {
  Client.create({
    name : 'Prasanna Suman',
    email : 'prasanna.tux@gmail.com',
    phone : '949-236-43001',
  });
  Client.create({
    name : 'Anup M Dhamala',
    email : 'adhamala@gmail.com',
    phone : '949-000-101010',
  });
});

Service.find({}).remove(function() {
  Service.create({
    name : 'Introduction',
    description: 'Introduction to the offerings',
    duration: 15,
    cost: 0,
	staff: 'Me',
	transition: 5,
  });
  Service.create({
    name : '30 Min Massage',
    description: '30 Minute Massage',
    duration: 30,
    cost: 35,
	staff: 'Me',
	transition: 15,
  });
});
