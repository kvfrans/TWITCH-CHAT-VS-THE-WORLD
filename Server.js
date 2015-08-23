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
var bossrot = 0;



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

        if(framecount % 20 == 0)
        {
            slowThenFastRing();
        }
}, 1000 / 30);

var speed = 1;

function moveBosss(direction) {
    if (direction == "right") {
        if(bossx < 786)
        {
            bossx += speed;
            io.sockets.emit('moveBoss', {x: bossx, y: bossy})
        }
    }
    if (direction == "left") {
        if(bossx > 0)
        {
            bossx -= speed;
            io.sockets.emit('moveBoss', {x: bossx, y: bossy})
        }
    }
    if (direction == "up") {
        if(bossy < 568)
        {
            bossy -= speed;
            io.sockets.emit('moveBoss', {x: bossx, y: bossy})
        }
    }
    if (direction == "down") {
        if(bossy > 0)
        {
            bossy += speed;
            io.sockets.emit('moveBoss', {x: bossx, y: bossy})
        }

    }
}
function shootBoss(direction) {
    //makeBullet(data.x,data.y,data.speed,data.rotation, data.image, data.radius);

    var count = 16;

    if (direction == "right") {
        for (var i = 0; i < count; i++){
        io.sockets.emit('bossShoot', {x: bossx, y: bossy, speed: 3, rotation: 0+((100/count)*(i-count/2)),image: "bullet", radius: 16})
    }
    }
    if (direction == "left") {
        for (var i = 0; i < count; i++){
        io.sockets.emit('bossShoot', {x: bossx, y: bossy, speed: 3, rotation: 180+0+((100/count)*(i-count/2)),image: "bullet", radius: 16})
    }
    }
    if (direction == "up") {
        for (var i = 0; i < count; i++){
      io.sockets.emit('bossShoot', {x: bossx, y: bossy, speed: 3, rotation: 270+0+((100/count)*(i-count/2)),image: "bullet", radius: 16})
  }
    }
    if (direction == "down") {
        for (var i = 0; i < count; i++){
        io.sockets.emit('bossShoot', {x: bossx, y: bossy, speed: 3, rotation: 90+0+((100/count)*(i-count/2)),image: "bullet", radius: 16})
    }
    }
}
//
function explode()
{
    console.log("explode");
    io.sockets.emit("circleSpread",{
        count: 12,
        x: bossx,
        y: bossy,
        speed: 3,
        radius: 16,
        image: "bullet",
        tilt: bossrot
    });
    bossrot += 7;
}
function slowThenFastRing()
{
    io.sockets.emit("slowThenFastRing",{});
}

