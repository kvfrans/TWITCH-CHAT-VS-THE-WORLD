var irc = require("tmi.js");
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
        username: "tacomod1442",
        password: "oauth:h86863wkv1ozgufno15uhxoeyg98gq"
    },
    channels: ["stormstudio_csgo_ru"]
};


var client = new irc.client(options);

// Connect the client to the server..
client.connect();

 client.addListener('chat', function (channel, user, message) {
 	console.log(message)
 	console.log("AYY LMAO")
 });
}