var request = require('request');
var app = require('express')();
var bodyParser = require('body-parser');
var port = 3000;

app.use(bodyParser.json());

app.post('/', function(req, res) {
  var json = JSON.stringify(req.body);
  var url = 'https://frontendlabs.io/api/';

  request.post({url: url, form: json}, function(err, httpResponse, body){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(body));
  });
});

app.listen(port, function(){
  console.log('Server running in localhost: ' + port);
});
