var AsiloRoyale = AsiloRoyale || {};

 //loading the game assets
AsiloRoyale.Preload = function(){};

AsiloRoyale.Preload.prototype = {
	
	preload: function() {

		//show logo in loading screen
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);/*
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);*/

		//show loading screen
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);
		
		//load game assets
		this.load.tilemap('level1', 'assets/tilemaps/untitled.json',null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/tilesets/tiles5.png');
		this.load.image('pastis', 'assets/images/pastis.png');
		this.load.image('gun', 'assets/images/gun.png');
		this.load.image('player', 'assets/images/viejo1.png');
		this.load.spritesheet('botonesjugar', 'assets/images/botonesjugar.png',256,128,2);
		this.load.spritesheet('botonessalir', 'assets/images/botonessalir.png',256,128,2);
		this.load.image('letrasgameover','assets/images/gameover.jpg',256,128,2)
		this.load.image('perdigon', 'assets/images/perdigon.png');
 		this.load.image('space', 'assets/images/space.png');
		this.load.image('ARlogo', 'assets/images/AR_logo.png');
		this.load.image('bala', 'assets/images/bala.png');

 	},
 
	create: function() {
 		this.state.start('MainMenu');
 	}
 };
