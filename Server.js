var fs = require("fs");
var host = "127.0.0.1";
var port = 8000;
var express = require("express");

var app = express();
//app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    response.send("Hello!!");
});

var io = require('socket.io').listen(app.listen(process.env.PORT || port));

var gameloop = require('node-gameloop');




//NOW FOR ACTUAL STUFF
var players = {};
var framecount = 0;

io.sockets.on('connection', function (socket) {
    console.log("connect");

    socket.on('move', function (data) {
        // console.log(players);
        players[socket.id] = {x: data.x, y: data.y}
    });

    socket.on('disconnect', function () {
        console.log("disconnect");
        delete players[socket.id];
    });
});


var fs = require('fs');

var tilt2 = 0;

var id = gameloop.setGameLoop(function(delta) {
    // `delta` is the delta time from the last frame

        io.sockets.emit('datastuff', {players: players});
        framecount++;
}, 1000 / 30);


