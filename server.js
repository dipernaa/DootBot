var PythonShell = require('python-shell');
var bodyParser = require('body-parser')
var express = require('express');
var request = require('request');
var doots = require('./doots.js');
var app = express();

var port = process.env.PORT || 3000;

var postOptions = {
	url: 'https://api.groupme.com/v3/bots/post',
	method: 'POST'
};

app.use(bodyParser.json());

app.route('/')
	.get(function(req, res) {
		sayBot();
		res.end('Thanks');
	})
	.post(function(req, res) {
		if(req.body.name.toLowerCase().indexOf('doot bot') < 0 && req.body.text.toLowerCase().indexOf('doot') > -1) {
			setTimeout(sayBot(res), 4000);
			//  PythonShell.run(req.params.name + '.py', function(err) {
			//   if(err) { 
			//   	throw err;
			//   }
			//   console.log('finished');
			// });
		}
		
	});

function sayBot(res) {
	var botData = {
		bot_id: process.env.BOT_ID,
		text: doots[Math.floor(Math.random()*doots.length)]
	};
	postOptions.json = botData;
	request(postOptions, function(error, response, body) {
	  res.end('Thanks');
	});
}

app.listen(port, function(){
  console.log('The magic happens on port ' + port);
});