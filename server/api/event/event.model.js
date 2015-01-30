'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  comment: String,
  type: String, // appointment, vacation, other
  service: {
    name: String, // if appointment, the type of service
    description: String,
    duration: Number,
    cost: Number,
    transition: Number,
  },
  repeating: Boolean, // wether to automatically repeat me
  repeatInterval: Date,
  allDay: { type: Boolean, default: false }, // if its a full day event
  start: Date, // start date
  end: Date, // end date
  createdDate: { type: Date, default: Date.now },
  client: {
    id: String, //id of the associated client
	name: String,
    email: String,
    phone: String,
  },
  url: String, // url that it links to on the calendar UI
});

module.exports = mongoose.model('Event', EventSchema);
