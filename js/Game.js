

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.Game = function(){};

var timer, timerEvent, text;
var tilesCollisionGroup, playerCollisionGroup;

AsiloRoyale.Game.prototype = {
  create: function() {
  	

  	////////////SONIDOS///////////

  	//this.collect_weapon = new Phaser.Sound(this, 'collect_weapon');


  	////////////MAPA/////////////

	this.map = this.game.add.tilemap('level1');
	this.map.addTilesetImage('tiles','gameTiles');

	this.backgroundlayer = this.map.createLayer('floor');
	this.backgroundLayer2 = this.map.createLayer('details');
 	this.blockedLayer = this.map.createLayer('walls');
 	this.blockedLayer.debug = false;

 	this.backgroundlayer.resizeWorld();

 	this.map.setCollisionBetween(1, 2000, true, 'walls');
 	this.map.setCollision(26);


 	///////////GRUPOS DE COLISIÓN//////////	

	this.game.physics.p2.setImpactEvents(true);

	var tileObjects = this.game.physics.p2.convertTilemap(this.map, this.blockedLayer, true);
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

	//////////ARMAS/////////

	var weapons = []
	weapons.push(new Weapon.Gun(this.game,this.bulletCollisionGroup,this.tilesCollisionGroup, this.enemiesCollisionGroup));
    weapons.push(new Weapon.Shotgun(this.game,this.bulletCollisionGroup,this.tilesCollisionGroup, this.enemiesCollisionGroup));

    /////////BARRA DE VIDA/////////

   //this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');



	/////////JUGADOR 1/////////

	this.player1 = new Player(this.game,1100,1000,false,true, 'player', 1, weapons, this.playerCollisionGroup, this.tilesCollisionGroup, this.enemiesCollisionGroup, this.itemCollisionGroup);
	this.game.add.existing(this.player1);
	this.game.physics.p2.enable(this.player1,false);
	this.player1.body.clearShapes(); 
	this.player1.body.loadPolygon('player_physics', 'player'); 

	///////////ENEMIGOS///////

	//Dientes

	/*

	
	this.teeth = [];

	var teethTotal = 5;

	//var x = this.game.world.randomX;
	//var y = this.game.world.randomY;

	for(var i = 0; i < teethTotal; i++) {
		var x = 1000 + i*100;
		var y = 1300 + i * 500;
		this.teeth.push(new Enemy(this.game,x,1300,'dientes',120,30,100,100, i, this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1));
		this.game.add.existing(this.teeth[i]);
		this.game.physics.p2.enable(this.teeth[i],false);
	}
	*/
	
	
	
	this.teeth1 = new Enemy(this.game,1000,1300,'dientes',120,30,100,100, 'teeth1', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1);
	this.game.add.existing(this.teeth1);
	this.game.physics.p2.enable(this.teeth1,false);

	this.teeth2 = new Enemy(this.game,2150,1250,'dientes',120,30,300,300, 'teeth2', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1);
	this.game.add.existing(this.teeth2);
	this.game.physics.p2.enable(this.teeth2,false);

	this.teeth3 = new Enemy(this.game,1200,1700,'dientes',120,30,160,160, 'teeth3', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1);
	this.game.add.existing(this.teeth3);
	this.game.physics.p2.enable(this.teeth3,false);

	this.teeth4 = new Enemy(this.game,2100,2200,'dientes',120,30,210,210, 'teeth4', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1);
	this.game.add.existing(this.teeth4);
	this.game.physics.p2.enable(this.teeth4,false);


	//Enfermeros
    this.nurse1 = new Enemy(this.game, 1300, 1500,'enfermero', 120, 60, 600, 600, 'nurse1', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1); 
    this.game.add.existing(this.nurse1);
	this.game.physics.p2.enable(this.nurse1,false);
	this.nurse1.body.static = true;


	this.nurse2 = new Enemy(this.game, 3500, 2500,'enfermero', 120, 60, 600, 600, 'nurse2', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1); 
    this.game.add.existing(this.nurse2);
	this.game.physics.p2.enable(this.nurse2,false);
	this.nurse2.body.static = true;


	this.nurse3 = new Enemy(this.game, 5700, 1500,'enfermero', 120, 60, 700, 700, 'nurse3', this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1); 
    this.game.add.existing(this.nurse3);
	this.game.physics.p2.enable(this.nurse3,false);
	this.nurse3.body.static = true;
	
	



	/////////////CAMARA////////////

	this.game.camera.bounds = null;
	
	/////////////TECLAS///////////

	this.cursors = this.game.input.keyboard.createCursorKeys();
	

	//////////////HUD////////////

	//HUD Escopeta
	this.showHUD();

	//TV
	this.tv = this.game.add.sprite(0, 0, 'tv');
	this.tv.fixedToCamera = true;
	
	//Muestra etiquetas de vida
    this.showLabels();

	//Muestra barra de vida
	//this.showLife(this.player1);

	//Temporizador
    timer = this.game.time.create();
        
    //Evento de tiempo
    timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        
    //Comienzo temporizador
    timer.start();


  },

    initEnemyPos: function(){

		
		var n = Math.floor(Math.random() * 5)  ; 
		//Posiciones posibles 
		var pos1 = new Array(1000, 1300);
		var pos2 = new Array(2150, 1250);
		var pos3 = new Array(1200, 1700);
		var pos4 = new Array(2100, 2200);

		//Array con las posiciones posibles
		var arrayPos = new Array(pos1, pos2, pos3, pos4);
	
		var nPos = arrayPos[n];
		
		return nPos;
	},

	update: function() {
		
		//La cámara sigue al jugador teniendo en cuenta el offset
		this.game.camera.focusOnXY(this.player1.x+75, this.player1.y);
		this.updateHUD(this.player1);
		//this.updateLife(this.player1);

			
	},
	

	updateHUD: function(player){

		//Dependiendo del arma que lleve verá unos grafismos
		if(player.currentWeapon==0){
			this.scoreLabel3.frame=0;
			this.HUD.visible = false;
		    player.lifeBar.position.x = 100;
			this.gunIcon.visible = true;
			this.shotgunIcon.visible = false;

	    }else if(player.currentWeapon==1){
	    	this.scoreLabel3.frame=1;
	    	this.HUD.visible = true;
	    	player.lifeBar.position.x = 120;
	    	this.shotgunIcon.visible = true;
	    	this.gunIcon.visible = false;

	    }

	    //Se visualizará la munición del arma portada y la puntuación
		this.scoreLabel2.text = player.score;
		if(player.currentWeapon===0){
			this.scoreLabel.text = player.gunAmmo;
		}else if(player.currentWeapon===1){
			this.scoreLabel.text = player.shotgunAmmo;
		}
	}, 



		//Maneja los eventos en los que el jugador recibe daño
	bulletHitPlayer: function(player, bullet) {
		player.damage();
    	bullet.destroy();

	},

	

		//Muestra la barra de vida en pantalla
	showLife: function(player){
		
		this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
		this.lifeBardw.fixedToCamera = true;

		this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
		this.lifeBar.anchor.y = 0.5;
		this.lifeBar.cropEnabled = true;
		this.lifeBar.fixedToCamera = true;

		 var width = (this.life / 2)*10;

        this.cropRect = new Phaser.Rectangle( 0, 0, width , 30);


		this.cropRect.fixedToCamera = true;
    	this.lifeBar.crop(this.cropRect);

	},

	updateLife: function (player){
		if(player.damage()){
	    this.cropRect.width = (player.life/2) *10; 
        this.lifeBar.updateCrop(this.cropRect);
		}
	},


		//Muestra los datos del jugador en el HUD
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

		this.scoreLabel3 = this.game.add.sprite(1090,132,'iconos_municion',0);
		this.scoreLabel3.fixedToCamera =true;

		var star = this.game.add.image(1090, 180, 'star');
		star.fixedToCamera = true;

	},

		//Muestra los iconos del HUD
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
	
		//metodo usado cuando el jugador recoge un objeto
	/*collect: function(player, collectable,amount) {
		player.score+=amount;
		collectable.destroy();
	},*/
	


	//Dado un tipo y el nombre del sprite asociado devuelve true si son del mismo tipo y false si son tipos distintos de objetos.
	isType: function (type, sprite){
		if(sprite === type){
			return true;
		}else{
			return false;
		}
	},


	//Posiciona los objetos recolectables en el mapa según las posiciones indicadas en tiled
	createItems: function() {

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

	//Función de Game Over
	gameOver: function() {
		this.game.state.start('GameOver');
	},

	//Muestra el tiempo que queda para el final de la partida
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
        timer.stop();
        this.player1.alive=false;
    },

    //cambia el formato del tiempo
    formatTime: function(s) {

        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

};

