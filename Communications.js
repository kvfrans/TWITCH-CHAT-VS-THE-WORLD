var irc = require("tmi.js");
var commandArray = [];


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
 	if (message == "right") {
 		commandArray.push(message)
 		console.log("users asked for right");
 	}
 	if (message == "left") {
 		commandArray.push(message)

 	}
 	if (message == "down") {
		commandArray.push(message)
 	}
 	if (message == "user") {
 		commandArray.push(message)
 	}
 });

 setInterval(function() {
 	  var rightCount = 0;
 	  var leftCount = 0;
 	  var downCount = 0;
 	  var upCount = 0;
      for (var i =0; i < commandArray.length; i ++) {
      	if (commandArray[i] == "right") {
      		rightCount++;
      	}
      	if (commandArray[i] == "left") {
      		console.log("added")
      		leftCount++;
      	}
      	if (commandArray[i] == "down") {
      		downCount++;
      	}
      	if (commandArray[i] == "up") {
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
    }
   else if (highest == leftCount) {
    	console.log("highest is left")
      moveBosss("left")
    }
   else if (highest == downCount) {
    	console.log("highest is down")
      moveBosss("down")
    }
    else if (highest == upCount) {
    	console.log("highest is up")
      moveBosss("up")
    }
}
}, 6000);


}