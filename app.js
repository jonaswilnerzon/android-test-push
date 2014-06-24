var gcm = require('node-gcm');
var express = require('express');
var qs = require('querystring');

var app = express();

app.get('/push', function(req, res) {
	console.log('Push request received');

	var str = req.url.split('?')[1];
	var data = qs.parse(str);
	delete data.regId;

	var regIds = [];
	var regId = req.query.regId || 0;
	if(regId === 0) {
		console.log("Error: Missing regId param");
	} else {
		regIds.push(regId);
		var message = createMessage(data);
		sendPush(regIds, message);
	}

	res.send();
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

function sendPush(regIds, message) {
	
	var sender = new gcm.Sender('YOUR_API_KEY');
	
	console.log('Trying to send %s to %s', JSON.stringify(message.data), regIds);

	sender.send(message, regIds, 4, function(err, result) {
		console.log("Error: %s", JSON.stringify(err));
;		console.log("Result: %s", JSON.stringify(result));
	});
};

function createMessage(inData) {
	var message = new gcm.Message({
		collapseKey: 'test',
		delayWhileIdle: true,
		timeToLive: 3,
		data: inData
	});
	return message;
};