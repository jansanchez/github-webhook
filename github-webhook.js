var request = require('request');
var app = require('express')();
var bodyParser = require('body-parser');
var BitbucketPayload = require('bitbucket-payload');
var port = 3000;

app.use(bodyParser.json());

app.post('/', function(req, res) {
  var payload = req.body;

  var bitbucketPayload = new BitbucketPayload(payload, 'push');
  var newPayload = bitbucketPayload.getPurged();

  var json = JSON.stringify(newPayload);
  var url = 'https://frontendlabs.io/api/';

  request.post({url: url, form: json}, function(err, httpResponse, body){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(body));
  });
});

app.listen(port, function(){
  console.log('Server running in localhost:' + port);
});
