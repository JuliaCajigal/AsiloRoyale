AsiloRoyale.MainMenu = function(){};

AsiloRoyale.MainMenu.prototype = {
	
	create: function() {
 //show the space tile, repeated
 		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

 //give it speed in x
 		this.background.autoScroll(-20, 0);

 		boton1 = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY,'botonesjugar', this.boton1OnClick, this,1,0,1,0);
 		boton1.width = 150;
 		boton1.height = 70;
 		boton2 = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+120,'botonessalir', this.boton2OnClick, this,1,0,1,0);
 		boton2.width = 150;
 		boton2.height = 70;

 		this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY-150, 'ARlogo');
		this.logo.anchor.setTo(0.5); 
		this.logo.scale.setTo(0.5, 0.5);

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
 /*
 this.background = this.game.add.tileSprite(0, 0,
this.game.width, this.game.height, 'space');

 //give it speed in x
 this.background.autoScroll(-20, 0);*/