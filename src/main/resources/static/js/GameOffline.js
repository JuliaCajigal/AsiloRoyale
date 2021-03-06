

var AsiloRoyale = AsiloRoyale || {};

//title screen
AsiloRoyale.GameOffline = function(){};

var timerEvent, text;
var tilesCollisionGroup, playerCollisionGroup;
var randomMission;

AsiloRoyale.GameOffline.prototype = {
  create: function() {
	  
	 randomMission = Math.floor(Math.random() * 3);
	 console.log(randomMission);
	  
  	////////////MAPA/////////////

	this.map = this.game.add.tilemap('level1');
	this.map.addTilesetImage('tiles','gameTiles');

	this.backgroundlayer = this.map.createLayer('floor');
	this.backgroundLayer2 = this.map.createLayer('details');
 	this.blockedLayer = this.map.createLayer('walls');
 	this.blockedLayer.debug = false;

 	this.backgroundlayer.resizeWorld();

 	this.map.setCollisionBetween(1, 20000, true, 'walls');
 	this.map.setCollision(26);


 	///////////GRUPOS DE COLISIÓN//////////	

	this.game.physics.p2.setImpactEvents(true);

	var tileObjects = this.game.physics.p2.convertTilemap(this.map, this.blockedLayer, true);
	this.tilesCollisionGroup   = this.game.physics.p2.createCollisionGroup();    
	this.player1CollisionGroup  = this.game.physics.p2.createCollisionGroup();  
	this.player2CollisionGroup  = this.game.physics.p2.createCollisionGroup();
	this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
	this.enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
	this.itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
	this.createItems();

	this.game.physics.p2.updateBoundsCollisionGroup();

	for (var i = 0; i < tileObjects.length; i++) {        
   		tileObjects[i].setCollisionGroup(this.tilesCollisionGroup);
        tileObjects[i].collides(this.player1CollisionGroup);
        tileObjects[i].collides(this.player2CollisionGroup);
        tileObjects[i].collides(this.bulletCollisionGroup);
        tileObjects[i].collides(this.enemiesCollisionGroup);
	}    

    /////////BARRA DE VIDA/////////

   //this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
  	this.playersArray = [];
  	this.playersArray.push(new User(this.game,0,'playerOne',this.selected));
  	this.playersArray.push(new User(this.game,1,'playerTwo',1));
  	this.playersArray[1].score=1000;
  	 
	this.players = [];

	/////////JUGADOR 1/////////



    this.player1 = new Player(this.game,1120,2260,false,true, 1, this.player1CollisionGroup,this.player2CollisionGroup, this.tilesCollisionGroup, this.enemiesCollisionGroup, this.itemCollisionGroup,this.bulletCollisionGroup,0,this.playersArray[0]);
	this.game.add.existing(this.player1);
	this.game.physics.p2.enable(this.player1,false);
	this.player1.body.clearShapes(); 
	this.player1.body.loadPolygon('player_physics', 'player'); 
	this.players.push(this.player1);



	///////////ENEMIGOS///////

	//Dientes
	
	this.teeth = [];

	this.initTeeth();

	//Enfermeros

	this.nurse = [];

	this.initNurse();


	/////////////CAMARA////////////

	this.game.camera.bounds = null;
	
	/////////////TECLAS///////////

	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	//////////CONTROLES//////////
	
   	keyw = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
   	keys = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
   	keya = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
   	keyd = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
   	keyr = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
   	
    //Rotación del jugador hacia la posición del ratón
	this.angleToPointer = function (displayObject, pointer, world){

        if (pointer === undefined) { pointer = this.game.input.activePointer; }
        if (world === undefined) { world = false; }

        if (world)
        {
            return Math.atan2(pointer.worldY - displayObject.world.y, pointer.worldX - displayObject.world.x);
        }
        else
        {
            return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
        }

    }

	//////////////HUD////////////

	//HUD Escopeta
	this.showHUD();

	//TV
	this.tv = this.game.add.sprite(0, 0, 'tv');
	this.tv.fixedToCamera = true;
	
	//Muestra etiquetas de vida
    this.showLabels();

	//Temporizador
    animateCount(120);
    
	///////INFORMACIÓN DE LA MISION//////
    if(randomMission == 0){
    this.timer = this.game.time.create();
    this.timer.start();

	  this.info = this.game.add.sprite(300, 75, 'mission_info');
	  this.info.fixedToCamera = true;
      timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 5, this.deleteInfo, this);
      
    }else if(randomMission ==1){
      this.timer = this.game.time.create();
      this.timer.start();
        
  	  this.info = this.game.add.sprite(300, 75, 'mission_info2');
	  this.info.fixedToCamera = true;
      timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 5, this.deleteInfo, this);
      
    }else if(randomMission == 2){
      this.timer = this.game.time.create();
      this.timer.start();
      
      this.info = this.game.add.sprite(300, 75, 'mission_info3');
      this.info.fixedToCamera = true;
       timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 5, this.deleteInfo, this);
    	
    }

  },
  
  deleteInfo: function(){
	  this.info.destroy();
  },

  
  //Recibe parametros de la selección de personaje
  init: function(selected){
	  
	  this.selected=selected;
	  
  },

  //Crea y devuelve un array con las posibles posiciones de los dientes

    teethPosition: function(){
 
		//Posiciones posibles 
		var teethPos1 = new Array(1000, 1300);
		var teethPos2 = new Array(2150, 1250);
		var teethPos3 = new Array(1200, 1700);
		var teethPos4 = new Array(2100, 2200);
		var teethPos5 = new Array(1200,2900);
		var teethPos6 = new Array(2900,3200);
		var teethPos7 = new Array(5000,1572);
		var teethPos8 = new Array(4580,3300);
		var teethPos9 = new Array(5800,1900);
		var teethPos10 = new Array(6300,2300);
		var teethPos11 = new Array(5880,3350);

		//Array con las posiciones posibles
		var teethArray = new Array (teethPos1, teethPos2, teethPos3, teethPos4,teethPos5,teethPos6,teethPos7,teethPos8,teethPos9,teethPos10,teethPos11);

		
		return teethArray;

	},

	//Crea y devuelve un array con las posibles posiciones de los enfermeros

	nursePosition: function () {

		//Posiciones posibles 
		var nursePos1 = new Array(1300, 1500);
		var nursePos2 = new Array(3500, 2500);
		var nursePos3 = new Array(5700, 1500);
		var nursePos4 = new Array(3425, 2900);
		var nursePos5 = new Array(5250, 2954);
		var nursePos6 = new Array(3500,825);
		var nursePos7 = new Array(3500,1500);
		var nursePos8 = new Array(1100, 3765);
		//Array con las posiciones posibles
		var nurseArray = new Array (nursePos1, nursePos2, nursePos3,nursePos4,nursePos5,nursePos6,nursePos7,nursePos8);

		
		return nurseArray;

	},

	//Inicializa los dientes

	initTeeth: function () {

		var teethTotal = 11;

		for(var i = 0; i < teethTotal; i++) {
		 var tarray = this.teethPosition();
		 var teethPosFinal = tarray[i];

	
		this.teeth.push(new Enemy(this.game,teethPosFinal[0],teethPosFinal[1],'dientes',120,30,100,100, i, this.enemiesCollisionGroup, this.player1CollisionGroup,this.player2CollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup, this.players));
		this.game.add.existing(this.teeth[i]);
		this.game.physics.p2.enable(this.teeth[i],false);

	}

	},

	//Inicializa los enfermeros
	

	initNurse: function () {

		var nurseTotal = 8;

		for(var i = 0; i < nurseTotal; i++) {
		 var narray = this.nursePosition();
		 var nursePosFinal = narray[i];

	
    this.nurse.push(new Enemy(this.game, nursePosFinal[0], nursePosFinal[1],'enfermero', 120, 60, 700, 700, i, this.enemiesCollisionGroup, this.player1CollisionGroup,this.player2CollisionGroup, this.tilesCollisionGroup, this.bulletCollisionGroup,this.players)); 
    this.game.add.existing(this.nurse[i]);
	this.game.physics.p2.enable(this.nurse[i],false);
	this.nurse[i].body.static = true;

	}

	}, 




	update: function() {
		
		//La cámara sigue al jugador teniendo en cuenta el offset
		this.game.camera.focusOnXY(this.player1.x+75, this.player1.y);
		this.updateHUD(this.player1);
		//if(this.player1.alive==false || this.player2.alive==false){
		this.player1.body.velocity.y = 0;
		this.player1.body.velocity.x = 0;
		
		if(this.player1.alive){

		this.player1.body.rotation = this.angleToPointer(this.player1);
				
				//////MOVIMIENTO JUGADOR//////

				
		
				if(keyw.isDown) {
					
					this.player1.body.velocity.y -= this.player1.speed;
					this.player1.moves=true;
				}
				else if(keys.isDown) {
					
					this.player1.body.velocity.y += this.player1.speed;
					this.player1.moves=true;
				}
				if(keya.isDown) {
					
					this.player1.body.velocity.x -= this.player1.speed;
					this.player1.moves=true;
					
				}if(keyd.isDown) {
					
					this.player1.body.velocity.x += this.player1.speed;
					this.player1.moves=true;
					
				}if(keys.isUp && keya.isUp && keyd.isUp && keyw.isUp){
					
					this.player1.moves=false;
					
					if(this.player1.currentWeapon==0){
						
						this.player1.frame=0;
					}
					if(this.player1.currentWeapon==1){
						
						this.player1.frame=3;
					}
				}	
					
					/////////DISPARAR///////
					
			      if (this.game.input.activePointer.totalTouches == 1 && this.game.input.activePointer.isDown)
			        {
			  
			    	  this.player1.weapons[this.player1.currentWeapon].fire(this.player1.body.sprite);
			            this.game.input.activePointer.totalTouches = 0;
		
			        }
		
			        if(keyr.isDown){
			        	this.player1.reloader();
			        }
	}else{
		this.dead = this.game.add.sprite(235, 80, 'dead');
    	this.dead.fixedToCamera = true;
    	this.player1.frame=6;
    	this.gameOver();
	}
		
		if(timer==0){
	    	this.gameOver();
		}
		

			
	},
	

	updateHUD: function(player){

		//Dependiendo del arma que lleve verá unos grafismos
		if(player.currentWeapon==0){
			this.scoreLabel3.frame=0;
			this.HUD.visible = false;
		    //player.lifeBar.position.x = 100;
			this.gunIcon.visible = true;
			this.shotgunIcon.visible = false;

	    }else if(player.currentWeapon==1){
	    	this.scoreLabel3.frame=1;
	    	this.HUD.visible = true;
	    	//player.lifeBar.position.x = 120;
	    	this.shotgunIcon.visible = true;
	    	this.gunIcon.visible = false;

	    }

	    //Se visualizará la munición del arma portada y la puntuación
		this.scoreLabel2.text = player.score;
		if(player.currentWeapon===0){
			this.scoreLabel.text = player.gunLoad + "/"+ player.gunAmmo;
		}else if(player.currentWeapon===1){
			this.scoreLabel.text = player.shotgunLoad + "/"+ player.shotgunAmmo;
		}
		
		
		this.cropRect.width = (this.player1.life/2) *10; 
        this.lifeBar.updateCrop(this.cropRect);
		
	}, 



		//Maneja los eventos en los que el jugador recibe daño
	bulletHitPlayer: function(player, bullet) {
		player.damage();
    	bullet.destroy();

	},


		//Muestra los datos del jugador en el HUD
	showLabels: function() {
	
		//score text
		var text = text;
		var text1 = "pt:";
		var text2 = "items:";
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "center" };
		this.scoreLabel = this.game.add.text(1000, 135, text, style);
		this.scoreLabel.fixedToCamera = true;

		this.scoreLabel2 = this.game.add.text(1020, 176, text2, style);
		this.scoreLabel2.fixedToCamera = true;

		this.scoreLabel3 = this.game.add.sprite(1078,135,'iconos_municion',0);
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
		
		this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
	    this.lifeBardw.fixedToCamera = true;
	    
	    this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
	    this.lifeBar.fixedToCamera = true;
	    this.lifeBar.anchor.y = 0.5;
	    this.lifeBar.cropEnabled = true;
	    
	    this.cropRect = new Phaser.Rectangle( 0, 0, 500 , 30);
	    this.cropRect.fixedToCamera = true;
	    this.lifeBar.crop(this.cropRect);
	},


	test: function(player){
		player.score += 40;
	},
	


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
        sprite.body.collides(this.player1CollisionGroup);
        sprite.body.collides(this.player2CollisionGroup);
		Object.keys(element.properties).forEach(function(key){
	 	});
	},

	//Función de Game Over
	gameOver: function() {
		clearInterval(globalClock);
		display.setValue('00:00');
		this.game.state.start('GameOverOffline',true,false,this.player1,this.playersArray[1],randomMission);
	}



};

