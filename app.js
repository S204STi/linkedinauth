'use strict';

var express = require('express'),
		path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
	res.send('You are at: ' + req.url);
});

var port = 3000 || process.env.PORT;
app.listen(port,function(){
	console.log('Listening on: ' + port);
});
