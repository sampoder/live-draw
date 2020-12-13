var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Filter = require('bad-words'), filter = new Filter();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/live', function(req, res) {
  res.sendFile(__dirname + '/live.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});