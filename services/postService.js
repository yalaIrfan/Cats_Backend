const loginRoutes = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;


var methods = {
	timestamp: function() {
		console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000));
	},
	currentDate: function() {
		console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
	}
};

exports.data = methods;
