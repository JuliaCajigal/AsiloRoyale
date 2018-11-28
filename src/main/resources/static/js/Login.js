var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Login = function(){};

var input;
var currentUser;


function createUser(user, callback) {

    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));
        currentUser = user.id;
        console.log(currentUser);
        callback(user);
    })
}


AsiloRoyale.Login.prototype = {

	create: function() {

        //Identificamos a la entrada por teclado y desplegamos el cuadro de diálogo de entrada
		input = document.getElementById('username');
		input.style.display = 'block';

        //Cámara y mundo
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

        //Botón OK
		boton4 = this.game.add.button(650, 320,'okbutton', this.changeState, this,1,0,1,0);
 		boton4.width = 64;
 		boton4.height = 64;
 		boton4.anchor.setTo(0.5);
 		boton4.input.useHandCursor = false;

 		//Indicativo introduzca un nick
 	    this.tabla_conectados = this.game.add.sprite(295, 250, 'chooseNick');

        //TV
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

    },

    //Función para pasar al estado de OnlineLobby 
    //si el nombre introducido es menor a 12 caracteres
    changeState: function() {

        var that = this;
		var input = $('#username')
    	var value = input.val();
		var sizename = value.length;
        input.val('');

        var user = {
            nick: value,
            ready:false
        }

        if (sizename<=12){

    	   		createUser(user, function (userWithId) {
                    currentUser = userWithId;
                    that.game.state.start('OnlineLobby', false, false, currentUser);
                })

        }else{
        	var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
    		var text = 'Nombre demasiado largo'; 
    		limitname = this.game.add.text(300, 350, text, style);	
        }
},


    update: function() {

		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

};