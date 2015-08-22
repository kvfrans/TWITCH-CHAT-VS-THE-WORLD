socket.on("currentboss", function (data)
{
	console.log("got a boss");
	initBoss(400,100,data.name);
});

socket.on("currentbackground", function (data)
{
	initBackground(data.name);
});

socket.on('clear', function (data)
{
	clearBullets();
	clearSpawners();
});

socket.on('clearSpawners', function (data)
{
	clearSpawners();
});

socket.on('circleSpread', function (data)
{
	circleSpread(data.count,data.x,data.y,data.speed,data.radius,data.image,data.tilt);
});

socket.on('crossThenTilt', function (data)
{
	crossThenTilt(data.x,data.y);
});

socket.on('spinCircle', function (data)
{
	spinCircle(data.x,data.y);
});

socket.on('slowThenFastRing', function (data)
{
	slowThenFastRing(data.x,data.y);
});

socket.on('initBoss', function (data)
{
	initBoss(data.x,data.y,data.image);
});

<<<<<<< HEAD
=======
socket.on('moveBoss', function (data)
{
	moveBoss(data.x,data.y);
});

>>>>>>> cadade7da883c58c391fbc3c9fc68f7506a07d40
socket.on('spellCardCast', function (data)
{
	spellCardCast(data.name);
});