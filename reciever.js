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
	slowThenFastRing();

});

socket.on('rain', function (data)
{
	rain(data.dir);
});

socket.on('laser', function (data)
{
	laser(data.dir);
});

socket.on('bomb', function (data)
{
	bomb(data.dir);
});

socket.on('nuke', function (data)
{
	nuke(data.dir);
});

socket.on('initBoss', function (data)
{
	initBoss(data.x,data.y,data.image);
});

socket.on('moveBoss', function (data)
{
	moveBoss(data.x,data.y);
});

socket.on('spellCardCast', function (data)
{
	spellCardCast(data.name);
});

socket.on('playerShoot', function (data)
{
	playerShot(data);
});

socket.on("bossShoot", function (data)
{
	makeBullet(data.x,data.y,data.speed,data.rotation, data.image, data.radius);
});