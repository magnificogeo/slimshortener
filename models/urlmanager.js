var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/slimshortener');

var UrlManager = function() {}; // This is a first-class function ready for prototype extending.

UrlManager.prototype.db_adapter = function(inputUrl, randomString) {
	console.log("input url received:" + inputUrl);
	console.log("randomString received: " + randomString);
}


exports.UrlManager = new UrlManager();