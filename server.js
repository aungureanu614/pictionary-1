
var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

// when a use enters the game mid stream, their
// canvas will be blank.  To adjust, lets keep
// a list of positions that are drawn on the
// drawer's canvas between clears.
var drawList = [];

io.on('connection', function(socket) {

    // send any new connections content
    // of drawList so they can catch up
    socket.emit('connected', drawList);

    socket.on('draw', function(position) {
        // log this for users that enter game and emit to connected users
        drawList.push(position);
        socket.broadcast.emit('draw', position);
    });

    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess);
    });

    // when a clear event is sent from the drawer,
    // clear list of positions drawn and send
    // clear to connected users.
    socket.on('clear', function() {
        drawList = [];
        socket.broadcast.emit('clear');
    });

});

server.listen(8080);

