var express = require('express');

// mongoose object for the mongo database connection
var monk = require("monk");
var db = monk('localhost/slimshortener');
var urlmappings = db.get('urlmappings');
/* End of database functions */
var UrlManager = function() {}; // This is a first-class function ready for prototype extending.

UrlManager.prototype.db_save = function(inputUrl, randomString, hostname) {
	
	urlmappings.insert({ inputUrl : inputUrl, shortUrl: randomString });

};

UrlManager.prototype.db_find = function(url_param_string, res) {

	urlmappings.findOne({ shortUrl : url_param_string }, function(err, result) {
		res.redirect(301, result.inputUrl);
	});

}


exports.UrlManager = new UrlManager();