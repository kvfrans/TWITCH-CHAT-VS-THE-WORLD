  var irc = require('twitch-irc');
function getChat() {
  var client = new irc.client({
                options: {
                    debug: true,
                    debugIgnore: ['ping', 'chat', 'action'],
                    logging: false,
                    tc: 3
                },
                identity: {
                    username: 'tacomod1442',
                    password: 'oauth:h86863wkv1ozgufno15uhxoeyg98gq'
                },
                channels: ["esl_keitatv_csgo"]
                // channels: ["moonmeander"]
            });

 client.connect();

 client.addListener('chat', function (channel, user, message) {
 	console.logging(message)
 });
}