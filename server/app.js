var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var querystring = require('querystring');
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var Promise = require('promise');
process.env['NODE_ENV'] = 'development';

var DB_url = 'mongodb://gurra:detbrinner18@ds011442.mlab.com:11442/heroku_d4tq6fds';
var message_collection = null;

var CLIENT_ID = "1fd1f4a4151a4396ba72415f9c328304";
var CLIENT_SECRET = "e101e4526492416c9f33727a21f21be3";
var REDIRECT_URI = "https://jossanrickard.herokuapp.com/code";
var ACCESS_TOKEN = "";

var auth_url = "https://api.instagram.com/oauth/authorize/?client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URI+"&response_type=code";

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/../dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))

app.get("/images", function(req, res){
	// var encodedTag = encodeURIComponent(req.params.tag);
	request('https://api.instagram.com/v1/tags/'+encodeURIComponent("rhjärtaj")+'/media/recent?access_token='+ACCESS_TOKEN, function(err, response, body){
		if(body && body.meta && body.meta.error_type){
			console.log(body);
			res.redirect("/");
			return;
		}
		if(body && JSON.parse(body).data){
			res.send(extractImageurls(body));
		}else{
			res.redirect("/login");
		}
	});
});

var getInstagramStuff = function(){
	console.log("getInstagramStuff");
	return new Promise(function(resolve, reject){
		console.log("getInstagramStuff Promise");
		request('https://api.instagram.com/v1/tags/'+encodeURIComponent("rhjärtaj")+'/media/recent?access_token='+ACCESS_TOKEN, function(err, response, body){
			console.log("getInstagramStuff request");
			if(body && body.meta && body.meta.error_type){
				console.log("getInstagramStuff reject");
				reject(body.meta);
			}
			if(body && JSON.parse(body).data){
				console.log("getInstagramStuff resolve");
				resolve(extractImageurls(body));
			}
		});
	});
}

var insertImagesToDb = function(images){
	console.log("insertImagesToDb:", images.length, "images");
	message_collection.find({'type': 'instagram'}).toArray(function(error, result){
		var newImages = images.filter(function(image){
			var dates = result.map(function(item){ return item.date; });
			return dates.indexOf(image.date) === -1;
		});
		return Promise.all(newImages.map(function(image){
			return new Promise(function(resolve, reject){
				message_collection.insertOne(image, function(err, result){
					console.log("insertImagesToDb insertOne", err, result);
					if(err){ reject(err) }else{
						resolve();
					}
				});
			});
		}));

		// message_collection.insertMany(newImages, function(err, result){
		// 	console.log("insertImagesToDb insertMany", err, result);
		// });
	});

}

var promiseError = function(err){
	console.log("promiseError", err);
}

app.get("/messages", function(req, res){

	// TODO: trigger the instagram fetching, put that result to the database
	// and make sure this function returns with all interesting things in the "messages" variable.

	getInstagramStuff()
		.then(insertImagesToDb, promiseError)
		.then(function(){
			message_collection.find().toArray(function(error, result){
				if(error){
					res.status(500).send("Didn't find anything");
				}else{
					res.json(result);
				}
			});
		});
});

function extractImageurls(body){
	if(body){
		var things = JSON.parse(body);
		console.log(Object.keys(things));
		if(things.data){
			return things.data.map(function(item){
				return {
					url: item.images.standard_resolution.url,
					caption: item.caption ? item.caption.text : "",
					id: item.id,
					time: item.created_time
				};
			});
		}
	}
	return [];
}

app.get("/feed", function(req, res){
	request('https://api.instagram.com/v1/users/self/feed?access_token='+ACCESS_TOKEN, function(err, response, body){
		if(body && body.meta && body.meta.error_type){
			console.log(body);
			res.redirect("/");
			return;
		}
		res.send(extractImageurls(body));
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

var addInstagramImage = function(data, callback){
	message_collection.insertOne({'type': 'instagram'}, function(err, result){
		console.log("addInstagramImage", err);
		callback(err);
	});
}

var addMessage = function(message, name, callback){
	message_collection.insertOne({'message': message, 'name': name, 'type': 'text'}, function(err, result){
		console.log("addMessage", err);
		callback(err);
	});
}

app.post("/image", function(req, res){
	addInstagramImage("image stuff", function(err){
		if(err){
			res.status(500).send('Nooo image...');
		}else{
			res.status(200).send('Yey image');
		}
	});
});

app.post("/message", function(req, res){
	console.log(req.body);
	addMessage(req.body.message, req.body.name, function(err){
		if(err){
			res.status(500).send('Nooo message...');
		}else{
			res.status(200).send('Yey message');
		}
	});
});

MongoClient.connect(DB_url, function(err, db){
	console.log("Database connected", err);
	message_collection = db.collection('messages');

	app.listen(app.get('port'), function(err){
		console.log("Listening to ", app.get('port'), err);
	});
});
