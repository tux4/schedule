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
