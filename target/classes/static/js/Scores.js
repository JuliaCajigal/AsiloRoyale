var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Scores = function(){};

AsiloRoyale.Scores.prototype = {

	create: function() {

		this.game.camera.setBoundsToWorld();

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

    	this.scores = this.game.add.sprite(280, 150, 'High_scores');
    	this.scores.fixedToCamera = true;


    	this.showRes();


	},

	//Recibir parametros de Game


	update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

	//Mostrar resultados
	showRes: function() {

	},
};