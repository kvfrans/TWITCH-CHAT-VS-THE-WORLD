var irc = require("tmi.js");
var commandMoveArray = [];
var commandShootArray = [];
var commandPatternArray = [];
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
  if (message == "!help") {
    client.action("progstream2", "For a list of commands type !commands, to donate type !donate, to read the about type !about");
  }
  if (message == "!commands") {
    client.action("progstream2", "To move type shootDirection (EX: right, left, up, down). To shoot type shootDirection. To change shoot pattern type (EX:)")
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
  if (message == "pattern-spread") {
    commandPatternArray.push(message)
  }
  if (message == "pattern-laser") {
    commandPatternArray.push(message)
  }
  if (message == "pattern-rain") {
    commandPatternArray.push(message)
  }
  if (message == "pattern-bomb") {
    commandPatternArray.push(message)
  }
  if (message == "pattern-bounce") {
    commandPatternArray.push(message)
  }
  if (message == "pattern-nuke") {
    commandPatternArray.push(message)
  }
  // if
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
    moveBosss("right")
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
  var shootDirection;
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
    shootDirection = "right"
  }
  else {
    if (highest == rightCount) {
      shootDirection = "right";
      shootBoss("right")
    }
    else if (highest == leftCount) {
      shootDirection = "left"
      shootBoss("left")
    }
    else if (highest == downCount) {
      shootDirection = "down"
      shootBoss("down")
    }
    else if (highest == upCount) {
      shootDirection = "up"
      shootBoss("up")
    }
  }
  commandShootArray = [];

  var spreadCount = 0
  var laserCount = 0
  var rainCount = 0
  var bombCount = 0
  var bounceCount = 0
  var nukeCount = 0
  for (var i = 0; i < commandPatternArray.length; i++) {
    if (commandPatternArray[i] === "pattern-spread") {
      spreadCount++
    }
    if (commandPatternArray[i] == "pattern-laser") {
      laserCount++
    }
    if (commandPatternArray[i] == "pattern-rain") {
      rainCount++
    }
    if (commandPatternArray[i] == "pattern-bomb") {
      bombCount++
    }
    if (commandPatternArray[i] == "pattern-bounce") {
      bounceCount++
    }
    if (commandPatternArray[i] == "pattern-nuke") {
      nukeCount++
    }
  }
  highest = Math.max(spreadCount, laserCount, rainCount, bombCount, bounceCount, nukeCount)
  if (highest == 0) {
    console.log("Nothing happened")
  }
  else {
    if (highest = spreadCount) {
      slowThenFastRing()
    }
    else if (highest == laserCount) {
      laser(shootDirection)
    }
    else if (highest == rainCount) {
      rain(shootDirection)
    }
    else if (highest == bombCount) {

    }
    else if (highest == bounceCount) {

    }
    else if (highest == nukeCount) {

    }
  }

}, 1000);


}