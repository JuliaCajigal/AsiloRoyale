

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.Game = function(){};

var timer, timerEvent, text;
var tilesCollisionGroup, playerCollisionGroup;

AsiloRoyale.Game.prototype = {
  create: function() {

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

	this.teeth = [];

	this.initTeeth();

	/////////JUGADOR 1/////////

	this.player1 = new Player(this.game,1100,1000,false,true, 'player', 1, weapons, this.playerCollisionGroup, this.tilesCollisionGroup, this.enemiesCollisionGroup, this.itemCollisionGroup);
	this.game.add.existing(this.player1);
	this.game.physics.p2.enable(this.player1,false);
	this.player1.body.clearShapes(); 
	this.player1.body.loadPolygon('player_physics', 'player'); 

	///////////ENEMIGOS///////

	//Dientes

	//Enfermeros

	this.nurse = [];

	this.initNurse();


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

  //Crea y devuelve un array con las posibles posiciones de los dientes

    teethPosition: function(){
 
		//Posiciones posibles 
		var teethPos1 = new Array(1000, 1300);
		var teethPos2 = new Array(2150, 1250);
		var teethPos3 = new Array(1200, 1700);
		var teethPos4 = new Array(2100, 2200);

		//Array con las posiciones posibles
		var teethArray = new Array (teethPos1, teethPos2, teethPos3, teethPos4);

		
		return teethArray;

	},

	//Crea y devuelve un array con las posibles posiciones de los enfermeros

	nursePosition: function () {

		//Posiciones posibles 
		var nursePos1 = new Array(1300, 1500);
		var nursePos2 = new Array(3500, 2500);
		var nursePos3 = new Array(5700, 1500);

		//Array con las posiciones posibles
		var nurseArray = new Array (nursePos1, nursePos2, nursePos3);

		
		return nurseArray;

	},

	//Inicializa los dientes

	initTeeth: function () {

		var teethTotal = 4;

		for(var i = 0; i < teethTotal; i++) {
		 var tarray = this.teethPosition();
		 var teethPosFinal = tarray[i];

	
		this.teeth.push(new Enemy(this.game,teethPosFinal[0],teethPosFinal[1],'dientes',120,30,100,100, i, this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1));
		this.game.add.existing(this.teeth[i]);
		this.game.physics.p2.enable(this.teeth[i],false);

	}

	},

	//Inicializa los enfermeros
	

	initNurse: function () {

		var nurseTotal = 3;

		for(var i = 0; i < nurseTotal; i++) {
		 var narray = this.nursePosition();
		 var nursePosFinal = narray[i];

	
    this.nurse.push(new Enemy(this.game, nursePosFinal[0], nursePosFinal[1],'enfermero', 120, 60, 700, 700, i, this.enemiesCollisionGroup, this.playerCollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.player1)); 
    this.game.add.existing(this.nurse[i]);
	this.game.physics.p2.enable(this.nurse[i],false);
	this.nurse[i].body.static = true;

	}

	}, 




	update: function() {
		
		//La cámara sigue al jugador teniendo en cuenta el offset
		this.game.camera.focusOnXY(this.player1.x+75, this.player1.y);
		this.updateHUD(this.player1);

			
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

		this.scoreLabel3 = this.game.add.sprite(1075,132,'iconos_municion',0);
		this.scoreLabel3.fixedToCamera =true;

		var star = this.game.add.image(1075, 180, 'star');
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

