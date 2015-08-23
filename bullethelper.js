function makeSpawner(x,y)
{
	var spawner = new Sprite(1,1);
	spawner.image = game.assets["images/player.png"];
	spawner.x = x;
	spawner.y = y;
	game.rootScene.addChild(spawner);
	spawners.push(spawner);
	return spawner;
}

function clearBullets()
{
	for(var i = 0; i < bullets.length; i++)
	{
		game.rootScene.removeChild(bullets[i]);
	}
	bullets = [];
}

function clearSpawners()
{
	for(var i = 0; i < spawners.length; i++)
	{
		game.rootScene.removeChild(spawners[i]);
	}
	spawners = [];
}

function circleSpread(count,x,y,speed,radius,image,tilt)
{
	for(var i = 0; i < count; i++)
	{
		makeBullet(x,y,speed,tilt+360*i/count,image,radius);
	}
}

function crossThenTilt(x,y)
{
	var spawner = makeSpawner(x,y);
	spawner.framepast = 0;
	spawner.tilt = 0;
	spawner.addEventListener("enterframe",function(){
		if(this.framepast % 10 == 0)
		{
			circleSpread(4,x,y,3,8,"bulletsmall",spawner.tilt);
		}
		if(this.framepast > 100)
		{
			spawner.tilt++;
		}
		this.framepast++;
	})
}

function spinCircle(x,y)
{
	var spawner = makeSpawner(x,y);
	spawner.framepast = 0;
	spawner.tilt = 0;
	spawner.addEventListener("enterframe",function(){
		if(this.framepast % 10 == 0)
		{
			circleSpread(36,x,y,3,16,"bullet",spawner.tilt);
			spawner.tilt ++;
		}
		// spawner.tilt ;
		this.framepast++;
	})
}

function slowThenFastRing()
{
	var spawner = makeSpawner(bossx,bossy);
	spawner.framepast = 0;
	spawner.tilt = 0;
	spawner.addEventListener("enterframe",function(){
		this.x = bossx;
		this.y = bossy;
		if(this.framepast % 20 == 0)
		{
			this.count = 36;
			this.tilt += 2;
			for(var i = 0; i < this.count; i++)
			{
				var bullet = makeBullet(x,y,3,this.tilt+360*i/this.count,"bullet",16);
				bullet.framepast = 0;
				bullet.addEventListener("enterframe",function(){
					this.framepast++;
					if(this.framepast < 80)
					{
						this.speed = 3 - 3*this.framepast/80;
					}
					else if(this.framepast == 81)
					{
						this.speed = 6;
						this.rotation += 90;
					}
				});
			}
		}
		// spawner.tilt ;
		this.framepast++;
	})
}