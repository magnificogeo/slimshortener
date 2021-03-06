var express = require('express');
var router = express.Router();
var random_string = require('random-string');
var UrlManager = require('../models/urlmanager').UrlManager;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Generate your own short URL!' });
});

/* GET route to match the url parameter string for redirection */

router.get('/:url_param_string', function(req, res) {
	//console.log(req.params.url_param_string);
	var redir_url = UrlManager.db_find(req.params.url_param_string, res);
});

/* POST route to handle the input URL */
router.post('/generateurl', function(req, res) {
	

	var inputUrl = req.body.inputUrl;
	var inputUrlLength = req.body.inputUrlLength; 

	/**
	* Future addition: Could add input URL validation
	*/
	if ( inputUrl == "" ) {
		res.redirect('/');
		return; // return to index page if user did not input any string for the url
	}

	if ( inputUrlLength == "" ) {
		inputUrlLength = 10;
	}
	var randomString = random_string({length: inputUrlLength});

 	
	UrlManager.db_save(inputUrl, randomString, req.host); // saves the url into mongodb

	res.render('generateurl', { generated_url : 'http://' + req.host + '/' + randomString });

});

module.exports = router;
