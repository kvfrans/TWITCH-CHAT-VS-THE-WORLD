var stage = 0;
var framecountPattern = 0;

function spinCircle()
{
	io.sockets.emit('spinCircle',{
				x:400,
				y:300
			});
}


function nextStage()
{
	console.log("nxt");
	io.sockets.emit("clearSpawners",{});
	stage++;
	framecountPattern = 0;
}



//fredericaappleseed
//chosona69