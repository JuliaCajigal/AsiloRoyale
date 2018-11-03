

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.Game = function(){};

var timer, timerEvent, text;
var tilesCollisionGroup, playerCollisionGroup;

AsiloRoyale.Game.prototype = {
  create: function() {
  

	this.map = this.game.add.tilemap('level1');


	//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	this.map.addTilesetImage('tiles','gameTiles');


	//this.map.createFromObjects('objectsLayer', 13, 'pastis');
	console.log(this.map);
	//create layer
	this.backgroundlayer = this.map.createLayer('floor');
 	this.blockedLayer = this.map.createLayer('walls');
 	this.blockedLayer.debug = true;

 	//resizes the game world to match the layer dimensions
 	this.backgroundlayer.resizeWorld();

	//collision on blockedLayer
 	this.map.setCollisionBetween(1, 2000, true, 'walls');
 	this.map.setCollision(26);

 	this.createItems();
	this.game.physics.p2.setImpactEvents(true);

	var tileObjects = this.game.physics.p2.convertTilemap(this.map, this.blockedLayer);
	//console.log(tileObjects);
	this.tilesCollisionGroup   = this.game.physics.p2.createCollisionGroup();    
	this.playerCollisionGroup  = this.game.physics.p2.createCollisionGroup();  
	this.game.physics.p2.updateBoundsCollisionGroup();

	for (var i = 0; i < tileObjects.length; i++) {        
   		this.game.physics.p2.enableBody(tileObjects[i],true); 
	}    

	//ARMAS
	var weapons = [];
	weapons.push(new Weapon.SingleBullet(this.game));

	

	//JUGADOR 1
	this.player1 = new Player(this.game,700,800,false,true, 'player', weapons[0], 1);
	console.log(weapons[0].ownerId);
	console.log(this.player1.ownerId);
	console.log(weapons);

	//var player2 = new Player(this.game,800,900,false,false,'player');
	//this.game.add.existing(player2);
	this.game.add.existing(this.player1);
	console.log(this.player1);
	
	//console.log(this.player);
	this.game.physics.p2.enable(this.player1,true);
	this.player1.body.clearShapes(); 
	this.player1.body.loadPolygon('player_physics', 'player'); 
	this.dynamic = true;
	this.player1.body.onBeginContact.add(this.collectItem, this);
/*
	this.player2 = new Player(this.game,800,800,false,true, 'player');
	this.game.add.existing(this.player2);
	console.log(this.player1);
	
	//console.log(this.player);
	this.game.physics.p2.enable(this.player2,true);
	this.player2.body.clearShapes(); 
	this.player2.body.loadPolygon('player_physics', 'player'); 
	this.dynamic = true;
	this.player2.body.onBeginContact.add(this.collectItem, this);
*/

	///////////

	this.enemy = new Enemy(this.game,780,650,false,true, 'dientes');
	this.game.add.existing(this.enemy);
	this.game.physics.p2.enable(this.enemy,true);

	//this.game.add.existing(this.enemies);
/*
	this.enemies = [];

	for(var i=0; i<3; i++){
		this.enemies[i] = new Enemy(this.game,400+(i*100),800,false,true, 'enemy');
		this.game.add.existing(this.enemies[i]);
		this.game.physics.p2.enableBody(this.enemies[i],true);
	}
*/
	

	//CAMARA
	this.game.camera.follow(this.player1);
	this.game.camera.bounds = null;
	
	//TECLAS
	this.cursors = this.game.input.keyboard.createCursorKeys();

	
	//TV
	this.tv = this.game.add.sprite(0, 0, 'tv');
	this.tv.fixedToCamera = true;


    this.showLabels();

	//MUESTRA VIDA
	this.showLife();

	//this.game.physics.p2.setPostBroadphaseCallback(this.filterCollisions, this);


	
	//TIMER
    timer = this.game.time.create();
        
    // Create a delayed event 1m and 30s from now
    timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        
    // Start the timer
    timer.start();

  },

	update: function() {
		//MUESTRA PUNTUACION
		//this.showLabels(this.player1);
		//this.scoreLabel.text = this.player1.ammoshotgun;
		this.scoreLabel.text = this.player1.life;
	},

//use a custom "ownerId" value to check if both come from the same entity (player/npc)
 filterCollisions: function(p2BodyA, p2BodyB) {
			//console.log(p2BodyA);
    		//console.log(p2BodyB);

 	if(p2BodyA.sprite!= null && p2BodyB.sprite!= null){
    	
    	if (p2BodyA && p2BodyB && p2BodyA.sprite.ownerId && p2BodyB.sprite.ownerId){
    		//console.log(p2BodyA.ownerId);
    		//console.log(p2BodyB.ownerId);

        if (p2BodyA.sprite.ownerId == p2BodyB.sprite.ownerId){
                return false;
                //console.log(p2BodyB.ownerId);
        }
    }
    return true;
	}
},


	move: function(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

	},

	collectItem (body, bodyB, shapeA, shapeB, equation) {
		if(body.sprite!= null){
			if(body.sprite.key == 'pastis'){
				this.collect(this.player1,body.sprite);

				//body.sprite.destroy();
				console.log(body);
				console.log(bodyB);

			}else if(body.sprite.key == 'perdigon'){
				this.bulletHitPlayer(this.enemy,body.sprite);
				console.log('BANG');

			}else if (body.sprite.key == 'dientes'){

				this.player1.damage();
				console.log('TE MUERDO');
				console.log(this.player1.life);

		}
	}
	},

	bulletHitPlayer: function(player, bullet) {

    	bullet.destroy();

	},

	bulletHitEnemy: function(player, bullet) {

    	bullet.destroy();
    	player.damage();

	},


	showLife: function(){
		this.lifeBar = this.game.add.sprite(730, 590, 'lifebaru');
		this.lifeBar.fixedToCamera = true;
		this.lifeBardw = this.game.add.sprite(730, 590, 'lifebardw');
		this.lifeBardw.fixedToCamera = true;
	},



	showLabels: function() {
	//score text

		var text = text;
		var text1 = "pt:";
		var text2 = "items:";
		var pt;
		var it;
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "center" };
		this.scoreLabel = this.game.add.text(1020, 135, text, style);
		this.scoreLabel.fixedToCamera = true;

	},



	test: function(player){
		player.score += 40;
	},
	



	collect: function(player, collectable) {
		console.log('yummy!');

		//play collect sound
		//this.collectSound.play();
	
		player.score+=20;
		

		var isGun = this.isType('gun',collectable.sprite);
		
		if(isGun == true) {
		this.gunned = true;
	   }
		//this.scoreLabel.text = player.score;

	
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



	createItems: function() {
	//create items
		this.items = this.game.add.group();
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
		this.game.physics.p2.enable(sprite,true);
//copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
	 	});
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



}
/*
game.physics.p2.setPostBroadphaseCallback(filterCollisions, this);

//use a custom "ownerId" value to check if both come from the same entity (player/npc)
function filterCollisions(p2BodyA, p2BodyB) {
    if (p2BodyA && p2BodyB && p2BodyA.sprite.ownerId && p2BodyB.sprite.ownerId){
        if (p2BodyA.sprite.ownerId == p2BodyB.sprite.ownerId){
                return false;
        }
    }
    return true;
}
*/

