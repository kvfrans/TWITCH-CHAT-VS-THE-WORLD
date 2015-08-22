var stage = 0;
var framecountPattern = 0;

function patternUpdate()
{
	// console.log(framecountPattern + " " + stage);
	if(stage == 0)
	{
		if(framecountPattern == 2)
		{

		}
		if(framecountPattern == 50)
		{
			nextStage();
		}
	}
	if(stage == 1)
	{
		if(framecountPattern == 100)
		{
			io.sockets.emit('crossThenTilt',{
				x:200,
				y:300
			});
			io.sockets.emit('crossThenTilt',{
				x:400,
				y:100
			});
			io.sockets.emit('crossThenTilt',{
				x:600,
				y:300
			});
		}
		if(framecountPattern == 300)
		{
			io.sockets.emit("spellCardCast",{name: "top three udon meatball special"});
			nextStage();
		}
	}

	if(stage == 2)
	{
		if(framecountPattern == 100)
		{
			io.sockets.emit('spinCircle',{
				x:400,
				y:300
			});
		}
		if(framecountPattern == 300)
		{
			nextStage();
		}
	}

	if(stage == 3)
	{
		if(framecountPattern == 2)
		{
			io.sockets.emit('slowThenFastRing',{
				x:400,
				y:100
			});
		}
		if(framecountPattern == 300)
		{
			nextStage();
		}
	}

	if(stage == 4 && framecountPattern >= 2 && framecountPattern <= 400)
	{
		if(framecountPattern % 25 == 0)
		{
			io.sockets.emit('circleSpread',{
				count: 30,
				x:Math.random()*800,
				y:100,
				speed: 3,
				radius:20,
				image:"bulletbig",
				tilt:0
			});
		}
		if(framecountPattern == 400)
		{
			nextStage();
		}
	}
	framecountPattern++;
}

function spinCircle()
{
	io.sockets.emit('spinCircle',{
				x:400,
				y:300
			});
}


function nextStage()
{

	io.sockets.emit("clearSpawners",{});
	stage++;
	framecountPattern = 0;
}



//fredericaappleseed
//chosona69