'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  active: Boolean
});

module.exports = mongoose.model('Client', ClientSchema);
