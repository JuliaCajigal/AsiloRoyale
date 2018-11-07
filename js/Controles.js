AsiloRoyale.GameOver = function(){};

AsiloRoyale.GameOver.prototype = {

	create: function() {
		this.game.world.setBounds(900,600); 
		this.game.camera.setBoundsToWorld();

		this.background = this.game.add.tileSprite(0, 0, this.game.width*2, this.game.height*2, 'space');
		//this.fin = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'letrasgameover');
		this.background.autoScroll(-20, 0);

		
		this.tv = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tv');
    	this.tv.fixedToCamera = true;

    	this.esquema = this.game.add.sprite(280, 35, 'esquema');
    	this.esquema.fixedToCamera = true;

    },

    update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},


	showMes: function() {
		var style1 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text1 = '[PRESS ESC TO MAIN MENU]' 
		this.resume = this.game.add.text(287, 550, text1, style2);
		this.resume.fixedToCamera = true;
	}

	


    
};