'use strict';

var express = require('express'),
		path = require('path'),
		passport = require('passport'),
		cookieSession = require('cookie-session'),
		LinkedInStrategy = require('passport-linkedin').Strategy,
		//bodyParser = require('body-parser'),
		auth = require('./routes/auth');
require('dotenv').load();
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
	name: 'session',
	keys: [process.env['SECRET_KEY']]
}));

passport.use(new LinkedInStrategy({
			consumerKey: process.env['LINKEDIN_API_KEY'],
			consumerSecret: process.env['LINKEDIN_SECRET_KEY'],
			callbackURL: "http://localhost:3000/auth/linkedin/callback",
			scope: ['r_emailaddress', 'r_basicprofile'],
		},
		function(token, tokenSecret, profile, done){
			console.log('profile', profile);
			//In a typical application, you would want
			//to associate the LinkedIn account with a user record in your database,
			// and return that user instead (so perform a knex query here later.)
			return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

app.use('/auth', auth);

app.get('/', function(req,res){
	res.send('You are at: ' + req.url);
});


passport.deserializeUser(function(obj, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, obj);
});


var port = 3000 || process.env.PORT;
app.listen(port,function(){
	console.log('Listening on: ' + port);
});
