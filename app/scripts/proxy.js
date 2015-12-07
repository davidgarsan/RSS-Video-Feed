var util = require('util');
var http = require('http');
var url = require('url');
var json = '{"attribute":"value","array":["element", "1"]}';
var PORT = 8080;
var feed = '';

http.createServer(function(request, response) {
  request = url.parse(request.url, true);
  if(!request.query.feed || !request.query.callback) {
    response.end();
  }
  else {
    http.get(request.query.feed, function(respFeed) {
      respFeed.on('data', function(data) {
        feed += data;
      });
      respFeed.on('end', function(data) {
        console.log("Feed fetched from " + request.query.feed);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.writeHead(200, {'Content-Type': 'text/xml'});
        //response.end(request.query.callback + "('" + feed + "')");
        response.end(feed);
      });
    });
    feed = '';
  }
}).listen(PORT);

console.log('Server listening on port ' + PORT);