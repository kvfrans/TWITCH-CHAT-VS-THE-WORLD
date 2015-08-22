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

var currentboss = "udon";
var currentbackground = "udon";

//sockets

io.sockets.on('connection', function (socket) {
    console.log("connect");
    socket.on('gameLoaded', function (data) {
        // console.log(players);
        socket.emit("currentboss",{
            name: currentboss
        });

        socket.emit("currentbackground",{
            name: currentbackground
        });
<<<<<<< HEAD
<<<<<<< HEAD
=======
        spinCircle();
>>>>>>> cadade7da883c58c391fbc3c9fc68f7506a07d40
=======
        // spinCircle();
>>>>>>> bf8c36d852371c250a9e4cee2ad9db13cc395f9a
    });

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

eval(fs.readFileSync('bullethelper.js')+'');

// file is included here:
eval(fs.readFileSync('patterns.js')+'');

<<<<<<< HEAD
eval(fs.readFileSync('Communications.js') + '');

//The twitch stream http://www.twitch.tv/esl_keitatv_csgo


var tilt2 = 100;


=======
>>>>>>> cadade7da883c58c391fbc3c9fc68f7506a07d40
var tilt2 = 0;

var id = gameloop.setGameLoop(function(delta) {
    // `delta` is the delta time from the last frame

        io.sockets.emit('datastuff', {players: players});

<<<<<<< HEAD
        patternUpdate();
=======
        // patternUpdate();
>>>>>>> cadade7da883c58c391fbc3c9fc68f7506a07d40
        framecount++;
}, 1000 / 30);


