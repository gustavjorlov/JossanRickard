var express = require('express');
var querystring = require('querystring');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

var CLIENT_ID = "1fd1f4a4151a4396ba72415f9c328304";
var CLIENT_SECRET = "e101e4526492416c9f33727a21f21be3";
var REDIRECT_URI = "https://jossanrickard.herokuapp.com/code";
var ACCESS_TOKEN = "";

var auth_url = "https://api.instagram.com/oauth/authorize/?client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URI+"&response_type=code";

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/../dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/images/:tag", function(req, res){
	request('https://api.instagram.com/v1/tags/'+req.params.tag+'/media/recent?count=30&access_token='+ACCESS_TOKEN, function(err, response, body){
		if(body && body.meta && body.meta.error_type){
			console.log(body);
			res.redirect("/");
			return;
		}
		res.send(body);
	});
});

app.get("/feed", function(req, res){
	request('https://api.instagram.com/v1/users/self/feed?count=30&access_token='+ACCESS_TOKEN, function(err, response, body){
		if(body && body.meta && body.meta.error_type){
			console.log(body);
			res.redirect("/");
			return;
		}
		res.send(body);
	});
});

app.get("/login", function(req, res){
	if(ACCESS_TOKEN !== ""){
		console.log("Already logged in");
		res.redirect("/");
	}else{
		res.redirect(auth_url);
	}
});

app.get("/code", function(req, res){
	console.log("code", req.query.code);
	request.post("https://api.instagram.com/oauth/access_token", {
		form:{
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI,
			code: req.query.code
		}
	}, function(err, response, body){
		if(err){
			res.json(err);
		}else{
			ACCESS_TOKEN = JSON.parse(body).access_token;
			console.log(ACCESS_TOKEN);
			res.redirect("/");
		}
	});

});

app.listen(app.get('port'));
