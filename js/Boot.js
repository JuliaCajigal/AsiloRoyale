var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Boot = function(){};


AsiloRoyale.Boot.prototype = {

	preload: function() {


		this.load.image('carta_ajuste', 'assets/images/carta_ajuste.png');
		this.load.image('preloadBar', 'assets/images/preloadbar.png');
		this.load.image('tv', 'assets/images/tv.png');
	},

	create: function() {

		this.game.stage.backgroundColor = '#fff';

 		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
 		this.scale.pageAlignHorizontally = true;
 		this.scale.pageAlignVertically = true;


 		this.game.physics.startSystem(Phaser.Physics.P2JS);

 		this.state.start('Preload');
	}
 };
