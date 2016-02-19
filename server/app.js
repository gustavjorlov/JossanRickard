var express = require('express');
var querystring = require('querystring');
var request = require('request');

var app = express();

var auth_url = "https://runkeeper.com/apps/authorize";
var auth_token_url = "https://runkeeper.com/apps/token";
var deauth_url = "https://runkeeper.com/apps/de-authorize";
var base_api_url = "https://api.runkeeper.com";

var CLIENT_ID = "b101f00fa9f142a2a17d73bdd84499e6";
var CLIENT_SECRET = "9f6521ab4dc94ec9b11aedf66bab6809";
var ACCESS_TOKEN = "";

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/../webapp"));

app.get("/ok", function(req, res){
	res.json({'o': 'k'});
});

app.listen(app.get('port'));