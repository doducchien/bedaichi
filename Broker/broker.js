var aedes = require('aedes')();

var server = require('net').createServer(aedes.handle);
var port = 1883;

server.listen(port, function(){
    console.log('Broker is listening on port ' + port);
})