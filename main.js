var socket = io();
enchant();

var id;

var player = {
	moveSpeed: 5,
    radius: 16,
    hitradius: 4,
    direction: "left"
}

var cooldown = 0;

var boss = {};
var background;

var others = {};
var bullets = [];
var spawners = [];

var playerbullets;

var game;
var scene;

window.onload = function(){
	game = new Core(800, 600);
	game.fps = 60;
	game.preload("images/player.png");
	game.preload("images/bullet.png");
    game.preload("images/bullet3.png");
    game.preload("images/bulletbig.png");
    game.preload("images/bulletsmall.png");
    game.preload("images/bosses/udon.png");
    game.preload("images/backgrounds/udon.jpg");

	game.onload = function(){

    socket.emit("gameLoaded",{});

		game.scale = 1;
		game.rootScene.backgroundColor = 'black';
        scene = game.rootScene;
		game.keybind(65, 'left');
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');
		game.keybind(16, 'shift');
        game.keybind(32, 'space');
		player.sprite = new Sprite(32, 32);
		player.sprite.image = game.assets["images/player.png"];
		player.sprite.x = 0;
        player.sprite.y = 0;
        game.rootScene.addChild(player.sprite);
        player.sprite.addEventListener("enterframe", function(){

            if(cooldown > 0)
            {
                cooldown --;
            }

            if(game.input.space)
            {
                if(cooldown <= 0)
                {
                    cooldown = 20;
                    shootBullet();
                }
            }

        	var moved = false;
        	if(game.input.shift)
        	{
        		player.moveSpeed = 1.5;
        	}
        	else
        	{
        		player.moveSpeed = 7;
        	}
        	// console.log("d");
            if(game.input.left && this.x > 0){
			    this.x -= player.moveSpeed;
			    moved = true;
                player.direction = "left";
			}
			else if(game.input.right && this.x < 768){
			    this.x += player.moveSpeed;
			    moved = true;
                player.direction = "right";
			}
			if(game.input.up && this.y > 0){
			    this.y -= player.moveSpeed;
			    moved = true;
                player.direction = "up";
			}
			else if(game.input.down && this.y < 568){
			    this.y += player.moveSpeed;
			    moved = true;
                player.direction = "down";
			}
			if(moved)
			{
				socket.emit("move",{
					x: this.x,
					y: this.y,
                    direction: player.direction
				});
        	}
        });

        // makeBullet(300,300,0,180,"bulletbig",32);
        // makeBullet(100,300,0,180,"bullet",16);

        socket.on('datastuff', function (data)
        {
    		// console.log(data);
    		var keys = [];
    		for (var key in data.players) {
				if (data.players.hasOwnProperty(key) && key != id) {
	    		    keys.push(key);
				}
    		}
    		for(var i = 0; i < keys.length; i++)
    		{
    			if(others[keys[i]] == null)
    			{
    				others[keys[i]] = new Sprite(32, 32);
    				others[keys[i]].image = game.assets["images/player.png"];
    				others[keys[i]].x = data.players[keys[i]].x;
    		        others[keys[i]].y = data.players[keys[i]].y;
    		        game.rootScene.addChild(others[keys[i]]);
    			}
    			else
    			{
    				others[keys[i]].x = data.players[keys[i]].x;
    		        others[keys[i]].y = data.players[keys[i]].y;
    			}
    		}
    		for (var key in others) {
				if (others.hasOwnProperty(key)) {
	    		    if(!data.players.hasOwnProperty(key)) {
						game.rootScene.removeChild(others[key]);
						delete others[key];
	    		    }
				}
    		}
    	});

    };
    game.start();
};


function shootBullet()
{
    socket.emit("shoot",{});
}

socket.on('connect', function(){
    id = socket.io.engine.id;
});

function playerShot(data)
{
    console.log("shote");
    var dir = 0;
    if(data.direction == "left")
    {
        dir = 180;
    }
    else if(data.direction == "right")
    {
        dir = 0;
    }
    else if(data.direction == "down")
    {
        dir = 90;
    }
    else if(data.direction == "up")
    {
        dir = 270;
    }
    makeBullet(data.x,data.y,10,dir,"bullet3",10);
}

function makeBullet(x,y,speed,rotation,image2,radius)
{
    var image = "images/"+image2+".png";
    var bullet = new Sprite(game.assets[image].width, game.assets[image].height);
    bullet.image = game.assets[image];
    bullet.x = x;
    bullet.y = y;
    bullet.speed = speed;
    bullet.rotation = rotation;
    bullet.radius = radius;
    bullets.push(bullet);
    game.rootScene.addChild(bullet);
    bullet.addEventListener("enterframe", function(){
        this.x = this.x + Math.cos(this.rotation * Math.PI/180)*this.speed;
        this.y = this.y + Math.sin(this.rotation * Math.PI/180)*this.speed;

        var Xdist = Math.abs((this.x + game.assets[image].width/2) - (player.sprite.x + player.radius));
        var Ydist = Math.abs((this.y + game.assets[image].width/2) - (player.sprite.y + player.radius));
        var totaldist = Math.sqrt(Xdist*Xdist + Ydist*Ydist);
        if(image != "images/bullet3.png")
        {
            console.log("rip");
            if(totaldist < this.radius + player.hitradius)
            {
                scene.removeChild(this);
            }
            if(this.x > 1000)
            {
                game.rootScene.removeChild(this);
            }
            else if(this.x < -100)
            {
                game.rootScene.removeChild(this);
            }
            else if(this.y > 1000)
            {
                game.rootScene.removeChild(this);
            }
            else if(this.y < -200)
            {
                game.rootScene.removeChild(this);
            }
        }
    });

    return bullet;
}


function initBoss(x,y,image)
{
    boss.sprite = new Sprite(512, 512);
    boss.sprite.image = game.assets["images/bosses/"+image+".png"];
    boss.sprite.scaleX = 1/4;
    boss.sprite.scaleY = 1/4;
    boss.sprite.originX = 0;
    boss.sprite.originY = 0;
    boss.sprite.x = x - 64;
    // console.log(boss.sprite.x);
    boss.sprite.y = y - 64;
    game.rootScene.addChild(boss.sprite);
}

function moveBoss(x,y)
{
    if(boss.sprite != null)
    {
        boss.sprite.x = x - 64;
        boss.sprite.y = y - 64;
    }
}

function initBackground(image)
{
    background = new Sprite(800, 600);
    background.image = game.assets["images/backgrounds/"+image+".jpg"];
    background.originX = 0;
    background.originY = 0;
    background.x = 0;
    background.opacity = 1;
    // console.log(boss.sprite.x);
    background.y = 0;
    game.rootScene.insertBefore(background,player.sprite);
}

function spellCardCast(title)
{
    var splash = new Sprite(512,512);
    splash.image = boss.sprite.image;
    // boss.sprite.originX = 0;
    // boss.sprite.originY = 0;
    splash.x = 500 - 256;
    splash.y = 100 - 256;
    game.rootScene.addChild(splash);
    splash.opacity = 0;
    splash.tl.moveBy(0, 300, 200).removeFromScene();
    splash.framepast = 0;
    splash.addEventListener("enterframe", function(){
        this.framepast++;
        if(this.framepast < 70)
        {
            this.opacity = this.framepast/100;
        }
        if(this.framepast > 130)
        {
            this.opacity = (200-this.framepast)/100;
        }
    });

    var spellTitle = new Label("Spell Card: <br>"+title);
    spellTitle.font = "32px sans-serif";
     // font-family: "Times New Roman", Times, serif;
    // spellTitle.color = "white";
    spellTitle.x = -200;
    spellTitle.width = 1000;
    spellTitle.textAlign = "left";
    spellTitle.y = 100;
    game.rootScene.addChild(spellTitle);
    spellTitle.tl.moveBy(300,0,25).moveBy(300,0,100).moveBy(300,0,25).removeFromScene();
    spellTitle.addEventListener("enterframe", function(){
        this.framepast++;
        if(this.framepast < 70)
        {
            this.opacity = this.framepast/100;
            // this.color = "rgb(255,255,255,)";
        }
        if(this.framepast > 130)
        {
            this.opacity = (200-this.framepast)/100;
            // this.color = "rgb(255,255,255,"+(200-this.framepast)/100+")";
        }
    });
}
