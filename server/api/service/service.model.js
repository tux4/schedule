'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  description: String,
  duration: Number,
  cost: Number,
  staff: String,
  transition: Number,
  active: Boolean,
});

module.exports = mongoose.model('Service', ServiceSchema);
