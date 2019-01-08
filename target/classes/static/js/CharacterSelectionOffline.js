var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.CharacterSelectionOffline = function(){};

var selected=0;

AsiloRoyale.CharacterSelectionOffline.prototype = {

	create: function() {
		input = document.getElementById('username');
		input.style.display = 'none';

 		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);
		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;
    	this.showMes();
    	
    	this.botonSelect1 = this.game.add.button(250,170,'jeremin_info', this.boton1OnClick, this);
    	this.botonSelect2 = this.game.add.button(565,170,'agnes_info',this.boton2OnClick,this);
    	
        this.click = new Phaser.Sound(this.game, 'click');

    },
    


    update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.click.play();
   			this.game.state.start('MainMenu');}
	},

	init: function(currentUser) {

	},

	
	showMes: function() {
		var style1 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text1 = '[SELECT YOUR CHARACTER]' 
		this.resume = this.game.add.text(320, 100, text1, style1);
		this.resume.fixedToCamera = true;
	},
	
	boton1OnClick: function() {
		selected = 0;
		this.click.play();
		this.game.state.start('GameOffline',false,false, selected);
		
	},
	
	boton2OnClick: function() {
		selected = 1;
		this.click.play();
		this.game.state.start('GameOffline',false,false, selected);
		
	}




    
};