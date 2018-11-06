AsiloRoyale.MainMenu = function(){};

AsiloRoyale.MainMenu.prototype = {
	
	create: function() {

		//this.game.world.setBounds(900,600); 
		console.log('CAMA BOUNDS');
		console.log(this.game.camera);
		this.game.camera.setBoundsToWorld();

 //show the space tile, repeated
 		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

 //give it speed in x
 		this.background.autoScroll(-20, 0);

 		boton1 = this.game.add.button((this.game.camera.width-150)/2-80,this.game.camera.height/2+200,'botonesjugar', this.boton1OnClick, this,1,0,1,0);
 		boton1.width = 150;
 		boton1.height = 70;
 		boton1.anchor.setTo(0.5);
 		boton1.input.useHandCursor = false;
 		boton2 = this.game.add.button((this.game.camera.width-150)/2+130,this.game.camera.height/2+200,'botonessalir', this.boton2OnClick, this,1,0,1,0);
 		boton2.width = 150;
 		boton2.height = 70;
 		boton2.anchor.setTo(0.5);
 		boton2.input.useHandCursor = false;

 		this.logo = this.add.sprite((this.game.camera.width-150)/2, this.game.camera.height/2-80, 'ARlogo');
		this.logo.anchor.setTo(0.5); 
		//this.logo.scale.setTo(0.5, 0.5);

		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

/*
 //start game text
 		var text = "Tap to begin";
 		var style = { font: "30px Arial", fill: "#fff", align:"center" };
 		var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
 		t.anchor.set(0.5);

 //highest score
 		text = "Highest score: "+this.highestScore;
 		style = { font: "15px Arial", fill: "#fff", align: "center"};

 		var h = this.game.add.text(this.game.width/2, this.game.height/2 + 150, text, style);
 		h.anchor.set(0.5);*/
	},

 	update: function() {
 		/*if(this.game.input.activePointer.justPressed()) {
 			this.game.state.start('Game');
 		}*/
 	},

 	init: function(score) {
		var score = score || 0;
		this.highestScore = this.highestScore || 0;

		this.highestScore = Math.max(score, this.highestScore);
 	},

 	boton1OnClick: function(){
 		this.game.state.start('Game');
 	}
 };
