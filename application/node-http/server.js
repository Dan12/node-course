var http = require("http");

var hostname='localhost'
var port = 8080;

var server = http.createServer(function(req, res){
    console.log(req.headers);
    
    // Ok, content is html
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end("<h1>Hello World</h1>");
});

server.listen(port);