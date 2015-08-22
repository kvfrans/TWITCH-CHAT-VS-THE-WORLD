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

var bossx = 400;
var bossy = 100;
var direction = "left";



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

        // spinCircle();

        // spinCircle();

    });

    socket.on('move', function (data) {
        // console.log(players);
        players[socket.id] = {x: data.x, y: data.y, direction: data.direction}
    });

    socket.on('shoot', function (data) {
        // console.log(players);
        io.sockets.emit("playerShoot",players[socket.id]);
        console.log(players[socket.id]);
        // players[socket.id] = {x: data.x, y: data.y}
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


eval(fs.readFileSync('Communications.js') + '');
// eval(fs.readFileSync('Main.js') + '');
//The twitch stream http://www.twitch.tv/esl_keitatv_csgo
 getChat()

var tilt2 = 100;



var tilt2 = 0;

var id = gameloop.setGameLoop(function(delta) {
    // `delta` is the delta time from the last frame

        io.sockets.emit('datastuff', {players: players});

        // patternUpdate();
        moveBosss(direction);

        framecount++;
}, 1000 / 30);

var speed = 1;

function moveBosss(direction) {
    if (direction == "right") {
        bossx += speed;
        io.sockets.emit('moveBoss', {x: bossx, y: bossy})
    }
    if (direction == "left") {
        bossx -= speed;
        io.sockets.emit('moveBoss', {x: bossx, y: bossy})
    }
    if (direction == "up") {
        bossy -= speed;
        io.sockets.emit('moveBoss', {x: bossx, y: bossy})
    }
    if (direction == "down") {
        bossy += speed;
        io.sockets.emit('moveBoss', {x: bossx, y: bossy})
    }
}

