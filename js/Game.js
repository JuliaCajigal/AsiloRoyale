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

AsiloRoyale.Game.prototype = {
  create: function() {
  

	this.map = this.game.add.tilemap('level1');
	//this.map = this.game.add.tilemap('level1');

//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	this.map.addTilesetImage('tiles5','gameTiles');


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
 	this.createDoors(); 

 	//create player
	//var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
	console.log(result);

	//we know there is just one result
	this.player = this.game.add.sprite(600, 600,'player');
	this.game.physics.arcade.enable(this.player);
	this.playerSpeed = 120;
	// comentar tre siguiente para quitar rotacion 
	this.player.body.collideWorldBounds = true;
	this.player.body.fixedRotation = true;
	this.player.anchor.setTo(0.30,0.5);
	
	//player initial score of zero
	this.playerScore = 0;

	//the camera will follow the player in the world
	this.game.camera.follow(this.player);
	
	//move player with cursor keys
	this.cursors = this.game.input.keyboard.createCursorKeys();

	//show score
	this.showLabels();


	this.weapon = this.game.add.weapon(30,'bala');

	// Desacaparecera la bala cuando salga de los limites
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // Velocidad a la que es lanzada la bala
    this.weapon.bulletSpeed = 600;
    // 1 bullet every 60ms
    this.weapon.fireRate = 200;

    this.weapon.trackSprite(this.player, 0, 0, true);

    this.weapon.trackOffset.x = +90;

    this.gunned = false; 

    //Temporizador
    this.game.time.events.add(4000, this.gameOver, this);


  },

	update: function() {

	//player movement
	//comentar primera para quitar rotacion
	this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
	this.player.body.velocity.y = 0;
	this.player.body.velocity.x = 0;
	
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
	if (this.game.input.activePointer.isDown && this.gunned==true)
    {
        this.weapon.fire();
    }
	//collision
	this.game.physics.arcade.collide(this.player,this.blockedLayer);
	this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
	this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);


		if(this.game.input.activePointer.justPressed()) {

	//move on the direction of the input
			this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		}

		//the camera will follow the player in the world
		this.game.camera.follow(this.player);
	},

	showLabels: function() {
	//score text
		var text = "0";
		var style = { font: "30px Arial", fill: "white", align: "center" };
		this.scoreLabel = this.game.add.text(850, 16, text, style);
		this.scoreLabel.fixedToCamera = true;
	},
	

	collect: function(player, collectable) {
		console.log('yummy!');

		//play collect sound
		//this.collectSound.play();
	
		this.playerScore++;
		//if (findObjectsByType('gun', level1, objectsLayer))
		this.gunned = true;
		this.scoreLabel.text = this.playerScore;

	
	//remove sprite
		collectable.destroy();
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

}


