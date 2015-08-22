var irc = require("tmi.js");
var commandMoveArray = [];
var commandShootArray = [];
var explodeCount = 0;
function getChat() {
	var options = {
    options: {
        debug: true
    },
    connection: {
        random: "chat",
        reconnect: true
    },
    identity: {
        username: "progstream2",
        password: "oauth:d45tjs5ly4kbn524zyp6eju7vj1sbf"
    },
    channels: ["progstream2"]
};


var client = new irc.client(options);

// Connect the client to the server..
client.connect();

 client.addListener('chat', function (channel, user, message) {
  explodeCount++;
  if (explodeCount >= 10) {
    explodeCount = 0
    explode()
  }
 	if (message == "right") {
 		commandMoveArray.push(message)
 		console.log("users asked for right");
 	}
 	if (message == "left") {
 		commandMoveArray.push(message)

 	}
 	if (message == "down") {
		commandMoveArray.push(message)
 	}
 	if (message == "user") {
 		commandMoveArray.push(message)
 	}
  if(message == "shoot right") {
    commandShootArray.push(message)
  }
  if (message == "shoot left") {
    commandShootArray.push(message)
  }
  if (message == "shoot down") {
    commandShootArray.push(message)
  }
  if (message == "shoot up") {
    commandShootArray.push(message)
  }
 });

 setInterval(function() {
 	  var rightCount = 0;
 	  var leftCount = 0;
 	  var downCount = 0;
 	  var upCount = 0;
      for (var i =0; i < commandMoveArray.length; i ++) {
      	if (commandMoveArray[i] == "right") {
      		rightCount++;
      	}
      	if (commandMoveArray[i] == "left") {
      		console.log("added")
      		leftCount++;
      	}
      	if (commandMoveArray[i] == "down") {
      		downCount++;
      	}
      	if (commandMoveArray[i] == "up") {
      		upCount++;
      	}
      }
    var highest = Math.max(rightCount, leftCount, downCount, upCount);
    if (highest == 0) {
    	console.log("no one")
    }
    else {
    if (highest == rightCount) {
		console.log("highest is right")
    direction = "right";
    }
   else if (highest == leftCount) {
    	console.log("highest is left")
      moveBosss("left")
      direction = "left";
    }
   else if (highest == downCount) {
    	console.log("highest is down")
      moveBosss("down")
      direction = "down";
    }
    else if (highest == upCount) {
    	console.log("highest is up")
      moveBosss("up")
      direction = "up";
    }
}
commandMoveArray = [];
  rightCount = 0;
  leftCount = 0;
  upCount = 0;
  downCount = 0;
  for (var y = 0; y < commandShootArray.length; y++) {
    if (commandShootArray[y] == "shoot right") {
      rightCount++
    }
    if (commandShootArray[y] == "shoot left") {
      leftCount++
    }
    if (commandShootArray[y] == "shoot down") {
      downCount++
    }
    if (commandShootArray[y] == "shoot up") {
      upCount++
    }
  }
  highest = Math.max(rightCount, leftCount, upCount, downCount)
  if (highest == 0) {
    console.log("none called")
  }
  else {
    if (highest == rightCount) {
      shootBoss("right")
    }
    else if (highest == leftCount) {
      shootBoss("left")
    }
    else if (highest == downCount) {
      shootBoss("down")
    }
    else if (highest == upCount) {
      shootBoss("up")
    }
  }
  commandShootArray = [];

}, 1000);


}