var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Controles = function(){};

AsiloRoyale.Controles.prototype = {

	create: function() {

 
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;
    	this.esquema = this.game.add.sprite(282, 125, 'esquema');
    	this.esquema.fixedToCamera = true;
        this.click = new Phaser.Sound(this.game, 'click');

    	this.showMes();

    },

    update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.click.play();
   			this.game.state.start('MainMenu');}
	},

	
	showMes: function() {
		var style1 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text1 = '[PRESS ESC TO MAIN MENU]' 
		this.resume = this.game.add.text(300, 565, text1, style1);
		this.resume.fixedToCamera = true;
	}

	


    
};