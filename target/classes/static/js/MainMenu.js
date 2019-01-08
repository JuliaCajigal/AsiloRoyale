var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.MainMenu = function(){};

AsiloRoyale.MainMenu.prototype = {
	
	create: function() {

 
		this.game.camera.setBoundsToWorld();

 		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
 		this.background.autoScroll(20, 0);

 		//Dehabilitamos input cuando volvemos al menú
 		var input = document.getElementById('username');
		if(input) {input.style.display = 'none';}
		var ok = document.getElementById('ok-button');
		if(ok){ok.style.display = 'none';}

 		///////////////BOTONES///////////
 		boton1 = this.game.add.button((this.game.camera.width-150)/2+290,this.game.camera.height/2+200,'botonesjugar', this.noise1, this,1,0,1,0);
 		boton1.width = 150;
 		boton1.height = 70;
 		boton1.anchor.setTo(0.5);
 		boton1.input.useHandCursor = false;
 		boton2 = this.game.add.button((this.game.camera.width-150)/2+15,this.game.camera.height/2+200,'botonessalir', this.noise2, this,1,0,1,0);
 		boton2.width = 150;
 		boton2.height = 70;
 		boton2.anchor.setTo(0.5);
 		boton2.input.useHandCursor = false;
 		boton3 = this.game.add.button((this.game.camera.width-150)/2-250,this.game.camera.height/2+200,'onlinebutton', this.noise3, this,1,0,1,0);
 		boton3.width = 150;
 		boton3.height = 70;
 		boton3.anchor.setTo(0.5);
 		boton3.input.useHandCursor = false;
 		boton4 = this.game.add.button(70,50,'copa', this.noise4, this,0,0,0,0);
 		boton4.width = 62;
 		boton4.height = 62;

 		//////////////LOGO/////////////
 		this.logo = this.add.sprite((this.game.camera.width-150)/2, this.game.camera.height/2-80, 'ARlogo');
		this.logo.anchor.setTo(0.5); 

		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;
    	
    	/////////SONIDO//////////
        this.click = new Phaser.Sound(this.game, 'click');
        this.white_noise = new Phaser.Sound(this.game, 'white_noise');
        
        ////////TIMER///////
        this.timer = this.game.time.create();
        this.timer.start();
	},
	
	noise1: function(){
 		  this.click.play();
 		  this.white_noise.play();
		  this.noise = this.game.add.sprite(10, 10, 'noise');
	 	  this.game.world.bringToTop(this.tv);
	 	  this.noise.fixedToCamera = true;
	 	  timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 0.5, this.boton1OnClick, this);
	},
	noise2: function(){
 		  this.click.play();
 		  this.white_noise.play();
		  this.noise = this.game.add.sprite(10, 10, 'noise');
	 	  this.game.world.bringToTop(this.tv);
	 	  this.noise.fixedToCamera = true;
	 	  timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 0.5, this.boton2OnClick, this);
	},
	noise3: function(){
 		  this.click.play();
 		  this.white_noise.play();
		  this.noise = this.game.add.sprite(10, 10, 'noise');
	 	  this.game.world.bringToTop(this.tv);
	 	  this.noise.fixedToCamera = true;
	 	  timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 0.5, this.boton3OnClick, this);
	},
	noise4: function(){
 		  this.click.play();
 		  this.white_noise.play();
		  this.noise = this.game.add.sprite(10, 10, 'noise');
	 	  this.game.world.bringToTop(this.tv);
	 	  this.noise.fixedToCamera = true;
	 	  timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 0.5, this.boton4OnClick, this);
	},


 	update: function() {
 	},

 	init: function(score) {

		var score = score || 0;
		this.highestScore = this.highestScore || 0;
		this.highestScore = Math.max(score, this.highestScore);
 	},
 	//funcion activada al pulsar el boton 'Play'
 	boton1OnClick: function(){
 		
 		this.game.state.start('CharacterSelectionOffline');
 	},
 	//funcion activada al pulsar el boton 'Help'
 	 boton2OnClick: function(){
 
 		this.game.state.start('Controles');
 	},
 	boton3OnClick: function(){

 		this.game.state.start('Login');
 	},
 	boton4OnClick: function(){

 		this.game.state.start('Scores');
 	}
 };
