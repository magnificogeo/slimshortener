var express = require('express');

// mongoose object for the mongo database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/slimshortener');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
		// yay!
})

/* Mongoose-MongoDB object manipulation functions defined here */
var urlMappings_schema = mongoose.Schema({
	inputUrl : String,
	shortUrl : String
});

var UrlMappings = mongoose.model('UrlMappings', urlMappings_schema);



/* End of database functions */
var UrlManager = function() {}; // This is a first-class function ready for prototype extending.

UrlManager.prototype.db_adapter = function(inputUrl, randomString, hostname) {
	
	var urlmap = new UrlMappings({ inputUrl : inputUrl, shorturl: 'http://' + hostname + '/' + randomString });
	urlmap.save();

	//console.log("input url received:" + inputUrl);
	//console.log("randomString received: " + randomString);
}


exports.UrlManager = new UrlManager();