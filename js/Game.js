

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.Game = function(){};

var timer, timerEvent, text;
var tilesCollisionGroup, playerCollisionGroup;

AsiloRoyale.Game.prototype = {
  create: function() {
  	this.collect_weapon = new Phaser.Sound(this, 'collect_weapon');


	this.map = this.game.add.tilemap('level1');


	//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	this.map.addTilesetImage('tiles','gameTiles');


	//this.map.createFromObjects('objectsLayer', 13, 'pastis');
	//console.log(this.map);
	//create layer
	this.backgroundlayer = this.map.createLayer('floor');
	this.backgroundLayer2 = this.map.createLayer('details');
 	this.blockedLayer = this.map.createLayer('walls');
 	this.blockedLayer.debug = false;

 	//resizes the game world to match the layer dimensions
 	this.backgroundlayer.resizeWorld();

	//collision on blockedLayer
 	this.map.setCollisionBetween(1, 2000, true, 'walls');
 	this.map.setCollision(26);

 	
	this.game.physics.p2.setImpactEvents(true);

	var tileObjects = this.game.physics.p2.convertTilemap(this.map, this.blockedLayer, true);
	//console.log(tileObjects);
	this.tilesCollisionGroup   = this.game.physics.p2.createCollisionGroup();    
	this.playerCollisionGroup  = this.game.physics.p2.createCollisionGroup();  
	this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
	this.enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
	this.itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
	this.createItems();

	this.game.physics.p2.updateBoundsCollisionGroup();

	for (var i = 0; i < tileObjects.length; i++) {        
   		tileObjects[i].setCollisionGroup(this.tilesCollisionGroup);
        tileObjects[i].collides(this.playerCollisionGroup);
        tileObjects[i].collides(this.bulletCollisionGroup);
        tileObjects[i].collides(this.enemiesCollisionGroup);
	}    

	//ARMAS
	var weapons = []
	weapons.push(new Weapon.Gun(this.game,this.bulletCollisionGroup,this.tilesCollisionGroup, this.enemiesCollisionGroup));
    weapons.push(new Weapon.Shotgun(this.game,this.bulletCollisionGroup,this.tilesCollisionGroup, this.enemiesCollisionGroup));

	//JUGADOR 1
	this.player1 = new Player(this.game,1100,1000,false,true, 'player', 1, weapons);
	this.game.add.existing(this.player1);
	//console.log(this.player1);



	
	//console.log(this.player);
	this.game.physics.p2.enable(this.player1,false);
	this.player1.body.clearShapes(); 
	this.player1.body.loadPolygon('player_physics', 'player'); 
	this.player1.body.setCollisionGroup(this.playerCollisionGroup); 
	this.player1.body.collides(this.tilesCollisionGroup);
	this.player1.body.collides(this.itemCollisionGroup, this.collectItem, this);
	this.player1.body.collides(this.enemiesCollisionGroup, this.collectItem, this);
	//this.player1.body.static = true;
	//this.player1.body.onBeginContact.add(this.collectItem, this);

	//ENEMIGOS

	//Dientes
	this.enemy = new Enemy(this.game,1000,1300,'dientes',120,30,100,100);
	this.game.add.existing(this.enemy);
	this.game.physics.p2.enable(this.enemy,false);
	this.enemy.body.setCollisionGroup(this.enemiesCollisionGroup);
	this.enemy.body.collides(this.playerCollisionGroup);
	this.enemy.body.collides(this.tilesCollisionGroup);
	this.enemy.body.collides(this.bulletCollisionGroup, this.collectItem, this);

	//Enfermera
    this.enemy1 = new Enemy(this.game, 1000, 1500,'enfermero', 120, 60, 600, 600); //3300, 1500
    this.game.add.existing(this.enemy1);
	this.game.physics.p2.enable(this.enemy1,false);
	this.enemy1.body.setCollisionGroup(this.enemiesCollisionGroup);
	this.enemy1.body.collides(this.playerCollisionGroup);
	this.enemy1.body.collides(this.tilesCollisionGroup);
	this.enemy1.body.collides(this.bulletCollisionGroup, this.collectItem, this);
	this.enemy1.body.static = true;


	//CAMARA
	this.game.camera.bounds = null;
	
	//TECLAS
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	//HUD Escopeta
	this.showHUD();

	//TV
	this.tv = this.game.add.sprite(0, 0, 'tv');
	this.tv.fixedToCamera = true;
	
	//Muestra etiquetas de vida
    this.showLabels();

	//Muestra barra de vida
	this.showLife(this.player1);

	
	//Timer
    timer = this.game.time.create();
        
    //Evento de tiempo
    timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        
    //Comienzo temporizador
    timer.start();


  },

	update: function() {
		
		//La cámara sigue al jugador teniendo en cuenta el offset
		this.game.camera.focusOnXY(this.player1.x+75, this.player1.y);
		this.updateHUD();

			
	},

	updateHUD: function(){

		//Dependiendo del arma que lleve verá unos grafismos
		if(this.player1.currentWeapon==0){
			this.scoreLabel3.frame=0;
			this.HUD.visible = false;
			this.lifeBar.position.x = 100;
			console.log(this.lifeBar.position.x);
			this.gunIcon.visible = true;
			this.shotgunIcon.visible = false;

	    }else if(this.player1.currentWeapon==1){
	    	this.scoreLabel3.frame=1;
	    	this.HUD.visible = true;
	    	this.lifeBar.position.x = 120;
	    	this.shotgunIcon.visible = true;
	    	this.gunIcon.visible = false;

	    }

	    //Se viasualizará la munición del arma portada y la puntuación
		this.scoreLabel2.text = this.player1.score;
		if(this.player1.currentWeapon===0){
			this.scoreLabel.text = this.player1.gunAmmo;
		}else if(this.player1.currentWeapon===1){
			this.scoreLabel.text = this.player1.shotgunAmmo;
		}
	},

	collectItem (body, body2) {

		if (body.sprite != null && body2.sprite != null) {

			if (body2.sprite.key == 'pasti_roja') {
				console.log("ENTRA");
				this.collect(this.player1, body2.sprite, 10);
				this.player1.items++;

			}  else if (body2.sprite.key == 'pasti_verde') {
				this.collect(this.player1,body2.sprite, 20);
				this.player1.items++;

			} else if(body2.sprite.key == 'pasti_morada'){

				this.collect(this.player1,body2.sprite,30);
				this.player1.items++;


			} else if(body2.sprite.key == 'pasti_amarilla'){

				this.collect(this.player1,body2.sprite,50);
				this.player1.items++;


			}else if(body2.sprite.key == 'cartucho_escopeta'){

				this.collect(this.player1,body2.sprite,0);
				if(this.player1.currentWeapon==1){
					this.player1.shotgunAmmo+=10;
				}


			}else if(body2.sprite.key == 'balas_pistola'){

				this.collect(this.player1,body2.sprite,0);
				if(this.player1.currentWeapon==0){
					this.player1.gunAmmo+=10;
				}


			}else if(body2.sprite.key == 'botiquin'){

				this.player1.damage(-20, this.cropRect, this.lifeBar);
				this.collect(this.player1,body2.sprite,0);


			} else if(body2.sprite.key == 'bala'){
				if(body.sprite.key == 'dientes') {

				this.bulletHitEnemy(this.enemy,body2.sprite,this.player1,body.sprite);
			} else if (body.sprite.key == 'enfermero') {
				this.bulletHitEnemy(this.enemy1,body2.sprite,this.player1, body.sprite);
			}


			}else if(body2.sprite.key == 'perdigon'){

				if(body.sprite.key == 'dientes') {

				this.bulletHitEnemy(this.enemy,body2.sprite,this.player1, body.sprite);
			} else if (body.sprite.key == 'enfermero') {
				this.bulletHitEnemy(this.enemy1,body2.sprite,this.player1, body.sprite);
			}

			}  else if (body2.sprite.key == 'dientes' || body2.sprite.key == 'enfermero'){
				if(body2.sprite.key == 'dientes') {

				this.player1.damage(5, this.cropRect, this.lifeBar);
				 } else if (body2.sprite.key == 'enfermero') {
				 	this.player1.damage(20, this.cropRect, this.lifeBar);
				 }
				console.log('TE MUERDO');
				console.log(this.player1.life);

			}else if(body2.sprite.key == 'shotgun'){

				this.collect_weapon.play();
				this.collect(this.player1,body2.sprite,0);
				this.player1.currentWeapon=1;
				this.player1.shotgunAmmo+=10;
				this.player1.gunAmmo=0;

			}else if(body2.sprite.key == 'gun'){

				this.collect_weapon.play();
				this.collect(this.player1,body2.sprite,0);
				this.player1.currentWeapon=0;
				this.player1.gunAmmo+=15;
				this.player1.shotgunAmmo=0;

			}
		}
	},

	bulletHitPlayer: function(player, bullet) {
		player.damage();
    	bullet.destroy();

	},

	bulletHitEnemy: function(enemy, bullet, player, enemySprite) {

    	if (bullet.key == 'bala') {
			enemy.damage(10);

		} else if (bullet.key == 'perdigon') {
			enemy.damage(5);

		} if (enemy.alive == false) {
			player.kills += 1;

			if(enemySprite.key == 'dientes') {
				player.score +=35;
			} else if (enemySprite.key == 'enfermero')
			player.score +=55;

		}
		console.log('KILLS'+ player.kills);
    	bullet.destroy();

	},


	showLife: function(player){
		
		this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
		this.lifeBardw.fixedToCamera = true;

		this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
		this.lifeBar.anchor.y = 0.5;
		this.lifeBar.cropEnabled = true;
		this.lifeBar.fixedToCamera = true;

		var width = (player.life / 2)*10;

		this.cropRect = new Phaser.Rectangle( 0, 0, width , 30);
		this.cropRect.fixedToCamera = true;
		console.log('cropRect:' + this.cropRect.width);
		console.log('cropRect y:' + this.cropRect.y);
    	this.lifeBar.crop(this.cropRect);

	},



	showLabels: function() {
	
		//score text
		var text = text;
		var text1 = "pt:";
		var text2 = "items:";
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "center" };
		this.scoreLabel = this.game.add.text(1020, 135, text, style);
		this.scoreLabel.fixedToCamera = true;

		this.scoreLabel2 = this.game.add.text(1020, 176, text2, style);
		this.scoreLabel2.fixedToCamera = true;

		this.scoreLabel3 = this.game.add.sprite(1075,132,'iconos_municion',0);
		this.scoreLabel3.fixedToCamera =true;

		var star = this.game.add.image(1075, 180, 'star');
		star.fixedToCamera = true;

	},

	showHUD: function(){
		this.HUD = this.game.add.image(0,0, 'view_shotgun');
		this.HUD.fixedToCamera = true;
		this.HUD.visible = false;

		this.gunIcon = this.game.add.image(860,60, 'guni');
		this.gunIcon.fixedToCamera = true;
		this.gunIcon.visible = true;

		this.shotgunIcon = this.game.add.image(780 ,60, 'shotguni');
		this.shotgunIcon.fixedToCamera = true;
		this.shotgunIcon.visible = false;
	},


	test: function(player){
		player.score += 40;
	},
	

	collect: function(player, collectable,amount) {
		player.score+=amount;
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

		this.items.enableBody = true;
        this.items.physicsBodyType = Phaser.Physics.P2JS;
		var item;
		result = this.findObjectsByType('item', this.map,'objectsLayer');
		result.forEach(function(element){ this.createFromTiledObject(element, this.items);}, this);
		
	},


	//Encuentra objetos del mismo tipo asociado en tiled
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element){

		if(element.properties.type === type) {
			element.y -= map.tileHeight;
			result.push(element);
			}
		});
		return result;
	},


	//Crea un sprite de un tiled object
	createFromTiledObject: function(element, group) {
		var sprite = group.create(element.x, element.y,element.properties.sprite);
		sprite.body.setRectangle(64, 64);
        sprite.body.setCollisionGroup(this.itemCollisionGroup);
        sprite.body.collides(this.playerCollisionGroup);
		Object.keys(element.properties).forEach(function(key){
	 	});
	},


	gameOver: function() {
		this.game.state.start('GameOver');
	},


	render: function() {
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
        this.player1.alive=false;
    },



    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

};

