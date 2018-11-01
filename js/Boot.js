var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
AsiloRoyale.Boot.prototype = {

	preload: function() {
//assets we'll use in the loading screen

		this.load.image('carta_ajuste', 'assets/images/carta_ajuste.png');
		this.load.image('preloadBar', 'assets/images/preloadbar.png');
		this.load.image('tv', 'assets/images/tv.png');
	},

	create: function() {
 //loading screen will have a white background
		this.game.stage.backgroundColor = '#fff';

 //scaling options
 		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
 		/*
 		this.scale.minWidth = 240;
 		this.scale.minHeight = 170;
 		this.scale.maxWidth = 2880;
 		this.scale.maxHeight = 1920;*/

 //have the game centered horizontally and vertically
 		this.scale.pageAlignHorizontally = true;
 		this.scale.pageAlignVertically = true;


 //screen size will be set automatically
 	//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 	//this.scale.setScreenSize(true);

 //physics system for movement
 		this.game.physics.startSystem(Phaser.Physics.P2JS);

 		this.state.start('Preload');
	}
 };
