var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Intro = function(){};

AsiloRoyale.Intro.prototype = {

	create: function() {

 
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		

    	this.intro = this.game.add.button(0, 0, 'intro', this.noise, this,1,0);
    	this.intro.fixedToCamera = true;
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;
        this.click = new Phaser.Sound(this.game, 'click');
        
        this.white_noise = new Phaser.Sound(this.game, 'white_noise');

        this.timer = this.game.time.create();
        this.timer.start();
        display.setValue('00:00');

    },
/*
    update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.click.play();
   			this.noise();}
	},
*/
	noise: function(){
		  this.click.play();
		  this.white_noise.play();
		  this.noise = this.game.add.sprite(10, 10, 'noise');
	 	  this.game.world.bringToTop(this.tv);
	 	  this.noise.fixedToCamera = true;
	 	  timerEvent2 = this.timer.add(Phaser.Timer.SECOND * 0.5, this.changeState, this);
	},
	
	changeState: function(){
		this.game.state.start('MainMenu');
	},


	


    
};