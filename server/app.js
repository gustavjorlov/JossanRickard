var express = require('express');
var querystring = require('querystring');
var request = require('request');

var app = express();

var CLIENT_ID = "1bac9d4c01ff440395c47f39567a8897";
var CLIENT_SECRET = "d6565fb097a54473aa84092be097aadc";
var ACCESS_TOKEN = "";

var auth_url = "https://api.instagram.com/oauth/authorize/?client_id="+CLIENT_ID+"&redirect_uri=https://jossanrickard.herokuapp.com/code&response_type=code";
var auth_token_url = "https://runkeeper.com/apps/token";

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/../webapp"));

app.get("/ok", function(req, res){
	if(ACCESS_TOKEN !== ""){
		res.json({'o': 'k'});
	}else{
		res.redirect(auth_url);
	}
});

app.get("/code", function(req, res){
	console.log("code", JSON.stringify(req.headers));
});

app.listen(app.get('port'));
