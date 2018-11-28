var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Scores = function(){};

var maxScoresList = [[],[]];

AsiloRoyale.Scores.prototype = {

	create: function() {

		this.game.camera.setBoundsToWorld();

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

    	this.scores = this.game.add.sprite(280, 150, 'High_scores');
    	this.scores.fixedToCamera = true;


    	this.maxScores();


	},

	update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

	//Mostrar resultados
	showScores: function(){
 		console.log(maxScoresList[0][0]);
 		var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
		var text = maxScoresList[0][0];
 		var scoresList = this.game.add.text(100, 200, text, style);
 	},

	//Guardamos en un array los nombres y las máximas puntuaciones que formarán parte de la lista
 	maxScores: function(){
 		var that = this;
 		loadScores(function (scores) {
        	for (var i = 0; i < 2; i++) {
        		console.log("!!!!!");
            	maxScoresList[0][i] = scores[0][i];
            	maxScoresList[1][i] = scores[1][i];
            }
            
            that.showScores();
    	})
 	},
};

///Mayores puntuaciones y nicks asociados
function loadScores(callback)
{
	$.ajax({
		//method: 'GET',
		url: 'http://192.168.1.130:8080/users/maxScores'
	}).done(function (nickScores) {
		console.log(nickScores);
		callback(nickScores);
		console.log(nickScores[0][1]);
		console.log(nickScores[1][1]);

	}).fail(function () {
		//serverDisconnected = true;
		console.log("No se ha podido cargar el fichero");
    })
}