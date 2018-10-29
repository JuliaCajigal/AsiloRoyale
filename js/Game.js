/*var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDown.Game.prototype = {
	create: function(){
		this.map = this.game.add.tile,map('tiles','gametiles');
	}
}*/

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.Game = function(){};

var timer, timerEvent, text;

AsiloRoyale.Game.prototype = {
  create: function() {
  

	this.map = this.game.add.tilemap('level1');
	//this.map = this.game.add.tilemap('level1');

//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	this.map.addTilesetImage('tiles','gameTiles');


	//this.map.createFromObjects('objectsLayer', 13, 'pastis');
	console.log(this.map);
//create layer
	this.backgroundlayer = this.map.createLayer('floor');
 	this.blockedLayer = this.map.createLayer('walls');

//collision on blockedLayer
 	
 	this.map.setCollisionBetween(1, 2000, true, 'walls');
//resizes the game world to match the layer dimensions
 	this.backgroundlayer.resizeWorld();
	
 	this.createItems();
 	//this.createDoors(); 

 	//create player
	//var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
	//console.log(result);

	//PERSONAJE
	this.player = this.game.add.sprite(800,800,'player');
	this.game.physics.arcade.enable(this.player);
	this.playerSpeed = 120;
	this.player.body.collideWorldBounds = true;
	this.player.body.fixedRotation = true;
	this.player.body.allowRotation = true;


	this.player.anchor.setTo(0.35,0.55);
	this.playerScore = 0;

	//CAMARA
	this.game.camera.follow(this.player);
	this.game.camera.bounds = null;
	
	//TECLAS
	this.cursors = this.game.input.keyboard.createCursorKeys();

	
	//PISTOLA
	this.weaponG = this.game.add.weapon(30,'bala');
    // Velocidad a la que es lanzada la bala
    this.weaponG.bulletSpeed = 600;
    //cadencia de disparo
    this.weaponG.fireRate = 400;
    this.weaponG.trackSprite(this.player, 0, 0, true);
    //Para que la bala salga de la pistola
    this.weaponG.trackOffset.x = +90;
    //variables para activar la pistola
	this.gunned = false;

	//ESCOPETA
    this.weaponS = this.game.add.weapon(6*6,'perdigon');
    this.weaponS.bulletSpeed = 600;
    this.weaponS.fireRate = 850;
    this.weaponS.trackSprite(this.player, 0, 0, true);
    this.weaponS.trackOffset.x = +90;
    this.weaponS.multiFire = true;
	this.shotgunned = true;


    //Temporizador
    //this.game.time.events.add(25000, this.gameOver, this);

    //ENEMIGO
    this.enemy = this.game.add.sprite(800,300,'player'),
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.immovable = false;
    this.enemy.body.bounce.setTo(1, 1);

    this.enemy.angle = this.game.rnd.angle();

    this.game.physics.arcade.velocityFromRotation(this.enemy.rotation, 100, this.enemy.body.velocity);

    this.enemyWeapon = this.game.add.weapon(30,'bala');
    this.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.enemyWeapon.bulletSpeed = 600;
    this.enemyWeapon.fireRate = 200;
    this.enemyWeapon.trackSprite(this.enemy, 0, 0, true);
    this.enemyWeapon.trackOffset.x = +125;
    this.enemyWeapon.trackOffset.y = +65;
  

	//TV
	this.tv = this.game.add.sprite(0, 0, 'tv');
	this.tv.fixedToCamera = true;


    //MUESTRA PUNTUACION
	this.showLabels();	

	//MUESTRA VIDA
	this.showLife();

	
	//TIMER
    timer = this.game.time.create();
        
    // Create a delayed event 1m and 30s from now
    timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        
    // Start the timer
    timer.start();

  },

	update: function() {

	//MOVIMIENTO Y DISPARO DEL JUGADOR
	this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
	this.player.body.velocity.y = 0;
	this.player.body.velocity.x = 0;
	
	//movimientos player
	if(this.cursors.up.isDown) {
		this.player.body.velocity.y -= 400;
	}
	else if(this.cursors.down.isDown) {
		this.player.body.velocity.y += 400;
	}
	if(this.cursors.left.isDown) {
		this.player.body.velocity.x -= 400;
	}
	else if(this.cursors.right.isDown) {
		this.player.body.velocity.x += 400;
	}
	//pistola
	if (this.game.input.activePointer.isDown && this.gunned==true)
    {
        this.weaponG.fire();
        this.weaponG.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weaponG.bulletKillDistance = 700;

        this.shotgunned = false;
    }
    //escopeta
    if (this.game.input.activePointer.isDown && this.shotgunned==true)
    {
        
        this.weaponS.bulletAngleVariance = 15;
        this.weaponS.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weaponS.bulletKillDistance = 450;
        this.weaponS.fireOffset(16, -16);
        this.weaponS.fireOffset(-16, 0);
        this.weaponS.fireOffset(0, 0);
        this.weaponS.fireOffset(16, -16);
        this.weaponS.fireOffset(16, 0);
        this.weaponS.fireOffset(16, -16);

        this.gunned = false;
        
    }
	//collision
	this.game.physics.arcade.collide(this.weaponS.bullets, this.blockedLayer, this.killBullets);
	this.game.physics.arcade.collide(this.weaponG.bullets, this.blockedLayer, this.killBullets);
	this.game.physics.arcade.collide(this.player,this.blockedLayer);
	this.game.physics.arcade.collide(this.enemy,this.blockedLayer);
	this.game.physics.arcade.collide(this.enemy,this.player);
	this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
	this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

	this.enemy.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);

	if (this.game.physics.arcade.distanceBetween(this.enemy, this.player) < 200) {
    
      this.enemyWeapon.fire();
    }

	//CAMARA
	//this.game.camera.follow(this.player);
	},

	showLife: function(){
		this.lifeBar = this.game.add.sprite(730, 590, 'lifebaru');
		this.lifeBar.fixedToCamera = true;
		this.lifeBardw = this.game.add.sprite(730, 590, 'lifebardw');
		this.lifeBardw.fixedToCamera = true;
	},

	showLabels: function() {
	//score text
		var text = "0";
		var text1 = "pt:";
		var text2 = "items:";
		var pt;
		var it;
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "center" };
		this.scoreLabel = this.game.add.text(1020, 135, text, style);
		this.scoreLabel.fixedToCamera = true;
		/*pt = this.game.add.text(1000, 135, text1, style);
		pt.fixedToCamera = true;
		console.log(pt);
		it = this.game.add.text(1000, 185, text2, style);
		it.fixedToCamera = true;*/
	},
	

	collect: function(player, collectable) {
		console.log('yummy!');

		//play collect sound
		//this.collectSound.play();
	
		this.playerScore+=20;
		
		//if (findObjectsByType('gun', level1, objectsLayer))
		var isGun = this.isType('gun',collectable.sprite);
		
		if(isGun == true) {
		this.gunned = true;
	   }
		this.scoreLabel.text = this.playerScore;

	
	//remove sprite
		collectable.destroy();
	},
	
	//Dado un tipo y el nombre del sprite asociado devuelve true si son del mismo tipo y false si son tipos distintos de objetos.
	isType: function (type, sprite){
		if(sprite === type){
			return true;
		}else{
			return false;
		}
	},

	enterDoor: function(player, door) {
		console.log('entering door that will take you to'+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
	},


	createItems: function() {
	//create items
		this.items = this.game.add.group();
		this.items.enableBody = true;
		var item;
		result = this.findObjectsByType('item', this.map,'objectsLayer');
		console.log(result);
		result.forEach(function(element){ this.createFromTiledObject(element, this.items);}, this);
		console.log(result);
	},

	 //find objects in a Tiled layer that containt a propertycalled "type" equal to a certain value
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		console.log(map.objects[layer]);
		map.objects[layer].forEach(function(element){
		console.log(element.properties.type);
		console.log(type);
		if(element.properties.type === type) {
	//Phaser uses top left, Tiled bottom left so we haveto adjust
    //also keep in mind that the cup images are a bitsmaller than the tile which is 16x16
	//so they might not be placed in the exact position asin Tiled
			
			element.y -= map.tileHeight;
			result.push(element);
		}
		});
		console.log(result);
		
		return result;
	},

	//create a sprite from an object
	createFromTiledObject: function(element, group) {
		var sprite = group.create(element.x, element.y,element.properties.sprite);
//copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
			sprite[key] = element.properties[key];
			console.log(element.properties[key]);
			console.log(element.properties.type);
			console.log(key);
			console.log(element.properties.sprite);
			console.log(element.properties[sprite]);
	 	});
	},

	createDoors: function() {
	//create doors
		this.doors = this.game.add.group();
		this.doors.enableBody = true;
		result = this.findObjectsByType('door', this.map,'objectsLayer');
	
		result.forEach(function(element){this.createFromTiledObject(element, this.doors);}, this);
	},

	gameOver: function() {
	//pass it the score as a parameter
		this.game.state.start('GameOver');
	},

	render: function() {
		//var style = { font: "bold 50px 'VT323', monospace", fill: "#51F55B", align: "center" };
		//this.game.debug.text("tiempo restante: " + this.game.time.events.duration, 32, 32);
		// If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 1010, 78, "#51F55B", "50px 'VT323'");
        }
        else {
            this.game.debug.text("Done!",1010, 78, "#51F55B", "50px 'VT323'");
        }
    },

    //Código de: http://jsfiddle.net/lewster32/vd70o41p/
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
    },

    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

	killBullets: function(bala,objeto){
    	bala.kill();
    },

}


