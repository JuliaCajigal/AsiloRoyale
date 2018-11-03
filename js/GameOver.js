AsiloRoyale.GameOver = function(){};

AsiloRoyale.GameOver.prototype = {
	
	create: function() {
		//this.game.scale.parentIsWindow = true;
		//window.innerWidth = 900;
		//window.innerHeight = 600;

		this.game.world.setBounds(900,600);

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		//this.fin = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'letrasgameover');
		this.background.autoScroll(-20, 0);

		
		this.tv = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tv');
    	this.tv.fixedToCamera = true;

    	this.showRes();


	},

	update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

	showRes: function() {
		var text = 'WINNER:.........\nPT:...........\nKILLS:.........\nITEMS:.........'; 
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "left" };
		this.resume = this.game.add.text(350, 300, text, style);
		this.resume.fixedToCamera = true;
	}
}