AsiloRoyale.GameOver = function(){};

AsiloRoyale.GameOver.prototype = {
	
	create: function() {

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.fin = this.game.add.sprite(this.game.world.centerX-250, this.game.world.centerY-450, 'letrasgameover');
		this.background.autoScroll(-20, 0);
	},

}