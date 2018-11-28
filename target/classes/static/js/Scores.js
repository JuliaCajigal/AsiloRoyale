var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Scores = function(){};

var maxScoresList = [[],[]];

AsiloRoyale.Scores.prototype = {

	create: function() {

		//Ajustamos las dimensiones de la nueva escena y el fondo
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		//Marco de TV
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

		//Tabla puntuaciones
    	this.scores = this.game.add.sprite(280, 150, 'High_scores');
    	this.scores.fixedToCamera = true;

    	//Leemos las máximas puntuaciones actuales
    	this.maxScores();


	},

	update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

	//Mostramos por pantalla las máximas puntuaciones almacenadas
	showScores: function(){
 		console.log(maxScoresList[0][0]);
 		var style = {font: "bold 43px 'VT323'", fill: "#51F55B", align: "left" };
		var text = '';
		var scoreText = '';
 		var scoresList = this.game.add.text(295, 260, text, style);

 		for (var i = 0; i < maxScoresList[0].length ; i++) {
            	scoreText += (i+1) + ". " + maxScoresList[0][i] + " " + maxScoresList[1][i] + "\n";
            }
            scoresList.setText(scoreText);
 	},

	//Guardamos en un array los nombres y las máximas puntuaciones que formarán parte de la lista
 	maxScores: function(){
 		var that = this;
 		loadScores(function (scores) {

        	for (var i = 0; i < 5; i++) {
            	maxScoresList[0][i] = scores[0][i];
            	maxScoresList[1][i] = scores[1][i];
            }
            
            that.showScores();
    	})
 	},
};

///Mayores puntuaciones y nicks asociados almacenados en el sevidor
	function loadScores(callback){
		$.ajax({
			method: 'GET',
			url: 'http://localhost:8080/users/maxScores'

		}).done(function (nickScores) {
			console.log(nickScores);
			callback(nickScores);

		}).fail(function () {
			console.log("No se ha podido cargar el fichero");
    	})
	}