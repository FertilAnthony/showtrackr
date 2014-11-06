var gulp = require('gulp');
var http = require('http');
var express = require('express');
var embedlr = require('gulp-embedlr');
var livereload = require('connect-livereload');
var compress = require('compression');
var config = require('./server-config');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var async = require('async');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');


// Connect to database
mongoose.connect('mongodb://localhost/showtrackr', function(err) {
  if (err) { throw err; }
});


require('../config/passport')(passport); // pass passport for configuration

// Set up an express server (not starting it yet)
var middleware = express();

middleware.use(morgan('dev')); // log every request to the console
middleware.use(bodyParser.json());       // to support JSON-encoded bodies
middleware.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// required for passport
middleware.use(session({ secret: 'Pa$$w0rd' })); // session secret
middleware.use(passport.initialize());
middleware.use(passport.session()); // persistent login sessions
middleware.use(flash()); // use connect-flash for flash messages stored in session

//REST routes
var apiKey = '59b911c4b1f1';

// Recupere la pagination des series
middleware.get('/api/shows/page/:pagination', function(req, res, next) {
		var shows = [],
		page = req.params.pagination;

	async.waterfall([
		function(callback) {

			request.get('https://api.betaseries.com/shows/search?v=2.3&key=' + apiKey + '&order=followers&nbpp=20&page=' + page, function(error, response, body) {
		        if (error) return next(error);

		        // On parcourt les series pour recuperer les images
		        shows = JSON.parse(response.body).shows;

				for (var i in shows) {
					shows[i]['picture'] = 'https://api.betaseries.com/pictures/shows?v=2.3&key=' + apiKey + '&height=313&width=209&id=' + shows[i].id;
		        	
		        	if (shows[i]['status'] === 'Ended') {
		        		shows[i]['endDate'] = parseInt(shows[i]['creation'], 10) + parseInt(shows[i]['seasons'], 10);
		        	}
		        }
		        callback(null, shows);
		    });
		}
	], function (err, shows) {
		if (err) return next(err);
		res.status(200).send(shows);
	});
});

// Recupere le top 12 pour la page d'accueil
middleware.get('/api/shows', function(req, res, next) {
		var shows = [];

	async.waterfall([
		function(callback) {

			request.get('https://api.betaseries.com/shows/search?v=2.3&key=' + apiKey + '&order=followers&summary=true&nbpp=12', function(error, response, body) {
		        if (error) return next(error);

		        // On parcourt les series pour recuperer les images
		        shows = JSON.parse(response.body).shows;

				for (var i in shows) {
					shows[i]['picture'] = 'https://api.betaseries.com/pictures/shows?v=2.3&key=' + apiKey + '&height=313&width=209&id=' + shows[i].id;
		        }
		        callback(null, shows);
		    });
		}
	], function (err, shows) {
		if (err) return next(err);
		res.status(200).send(shows);
	});
});

// Recupere le detail d'un serie
middleware.get('/api/shows/:id', function(req, res, next) {
	var showDetail = [],
		episodes = [],
		characters = [],
		showId = req.params.id;

	async.waterfall([
		// Detail generaux de la serie
		function(callback) {
			request.get('https://api.betaseries.com/shows/display?v=2.3&key=' + apiKey + '&id=' + showId, function(error, response, body) {
				if (error) return next(error);

				showDetail = JSON.parse(response.body).show;
				showDetail['picture'] = 'https://api.betaseries.com/pictures/shows?v=2.3&key=' + apiKey + '&height=380&width=255&id=' + showId;
				callback(null, showDetail);
			});
		},
		// Caracteres de la serie
		function(showDetail, callback) {
			request.get('https://api.betaseries.com/shows/characters?v=2.3&key=' + apiKey + '&id=' + showId, function(error, response, body) {
				if (error) return next(error);

				characters = JSON.parse(response.body).characters;
				showDetail['characters'] = characters;
				callback(null, showDetail);
			});
		},
		// Récupération de tous les episodes
		function(showDetail, callback) {
			var seasons = [];

			request.get('https://api.betaseries.com/shows/episodes?v=2.3&key=' + apiKey + '&id=' + showDetail.id, function(error, response, body) {
				if (error) return next(error);

				episodes = JSON.parse(response.body).episodes;
				showDetail['episodes_details'] = episodes;
				res.status(200).send(showDetail);
			});
			
		}
	]);
});

// process the signup form
middleware.post('/auth/signup', passport.authenticate('local-signup', { 
	successFlash: 'Welcome!' ,
	failureFlash: true
}));

// Redirect route
/*middleware.get('*', function(req, res) {
  res.redirect('/' + req.originalUrl);
});*/

// Error route
middleware.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

// Compression gzip
middleware.use(compress());
// Live reload
middleware.use(livereload({
  port: config.livereloadport
}));
// Use our 'dist' folder as rootfolder
middleware.use(express.static('./dist'));
// Push State implementation
middleware.all('/*', function(request, response) {
  response.sendFile('index.html', { root: 'dist' });
});


// Create HTTP Server
var server = http.createServer(middleware);

module.exports = server;
