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
});

Service.find({}).remove(function() {
  Service.create({
    name : 'Massage',
    description: '30 Minute Massage',
    duration: 30,
    cost: 35,
	staff: 'Me',
	transition: 15,
  });
});
