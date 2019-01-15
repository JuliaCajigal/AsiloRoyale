var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.GameOverOffline = function(){};

AsiloRoyale.GameOverOffline.prototype = {
		
		

	create: function() {

		this.game.world.setBounds(900,600); 
		this.game.camera.setBoundsToWorld();

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		this.tv = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tv');
    	this.tv.fixedToCamera = true;

    	this.results = this.game.add.sprite(125, 95, 'results');
    	this.results.fixedToCamera = true;


    	this.showRes();


	},

	//Recibir parametros de Game
	init: function(player1,player2,randomMission){
		
		//parametros del jugador 1
		this.nick1 =  'Player 1';

		this.items1 = player1.items || 0;
		this.kills1 = player1.kills || 0;
		this.score1 = player1.score || 0;
		
	if(randomMission == 0){
		//parametros del jugador 2
		this.nick2 = 'Target';
		this.items2 = '-----';
		this.kills2 = '-----';
		this.score2 = '1000';
		
		//Seleccionar el ganador según la puntuación
		if(this.score1>this.score2){
			this.pos1='WINNER';
			this.pos2='-----';
		}else if(this.score1<this.score2){
			this.pos1='LOSER';
			this.pos2='-----';
		}else if(this.score1==this.score2){
			this.pos1='WINNER';
			this.pos2='----';
			
		}
		
	}else if(randomMission ==1){
		//parametros del jugador 2
		this.nick2 = 'Target';
		this.items2 = '20';
		this.kills2 = '-----';
		this.score2 = '-----';
		
		//Seleccionar el ganador según la puntuación
		if(this.items1>this.items2){
			this.pos1='WINNER';
			this.pos2='-----';
		}else if(this.items1<this.items2){
			this.pos1='LOSER';
			this.pos2='-----';
		}else if(this.items1==this.items2){
			this.pos1='WINNER';
			this.pos2='----';
			
		}
		
	}else if (randomMission ==2){
		
		//parametros del jugador 2
		this.nick2 = 'Target';
		this.items2 = '-----';
		this.kills2 = '15';
		this.score2 = '-----';
		
		//Seleccionar el ganador según la puntuación
		if(this.kills1>this.kills2){
			this.pos1='WINNER';
			this.pos2='-----';
		}else if(this.kills1<this.kills2){
			this.pos1='LOSER';
			this.pos2='-----';
		}else if(this.kills1==this.kills2){
			this.pos1='WINNER';
			this.pos2='----';
			
		}
		
	}
	},

	
	update: function() {
		
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		
		if(escKey.isDown){
			
   			this.game.state.start('MainMenu');}
	},

	
	//Mostrar resultados
	showRes: function() {
		
		//tabla de resultados
		var results = [
	        ['Player:', this.nick1, this.nick2],
	        ['Result:', this.pos1, this.pos2],
	        ['Score:', this.score1, this.score2],
	        ['Kills:', this.kills1, this.kills2],
	        ['Items:', this.items1, this.items2],
	    ];
		
		var style = {font: "bold 40px 'VT323'", fill: "#51F55B", align: "left",tabs: [ 250, 250, 250] };
		var text = this.game.add.text(200, 250, '', style);
	    text.parseList(results);
		
		
		var style3 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text3 = '[PRESS ESC TO MAIN MENU]' 
		this.resume = this.game.add.text(300, 550, text3, style3);
		this.resume.fixedToCamera = true;
	}
};