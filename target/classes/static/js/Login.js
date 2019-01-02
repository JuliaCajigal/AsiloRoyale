var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Login = function(){};

var input;
var currentUser;
var connection;


AsiloRoyale.Login.prototype = {

	create: function() {

        connection = new WebSocket('ws://127.0.0.1:8080/handler');
    connection.onerror = function(e) {
        console.log("WS error: " + e);
    }
    connection.onmessage = function(msg) {
        console.log("WS message: " + msg.data);
        var message = JSON.parse(msg.data)
        $('#chat').val($('#chat').val() + "\n" + message.nick + ": " + message.ready);
    }
    connection.onclose = function() {
        console.log("Closing socket");
    }
    
    connection.onopen = function(){
        console.log("WEBSOCKET!!");
    }

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

    	var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
        var that = this;
		var input = $('#username')
    	var value = input.val();
		var sizename = value.length;
        input.val('');

        var user = {
            nick: value,
            ready:false
        }

        if(sizename<=12 && this.checkNames(value)){
        		
    	   		createUser(user, function (userWithId) {
                    currentUser = userWithId;
                    that.game.state.start('LobbyConfig', false, false, currentUser);
                })
                
                connection.send(JSON.stringify(user));

        }else if(sizename>12){
    		var text = 'Nombre demasiado largo'; 
    		var warning = this.game.add.text(300, 350, text, style);	
        }else{
        	var text = 'Nombre de usuario no disponible'; 
    		var warning = this.game.add.text(300, 350, text, style);
        }
},


    update: function() {

		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

    checkNames: function  (currentName){
        var free = true;
        
        //Cargamos los nombres de usuario
        loadUserNames(function (userNames) {
            for (var i = 0; i < userNames.length; i++) {
                
                //Comprobamos si el nombre actual ya existe
                if(userNames[i] == currentName){
                    free = false;
                    } 
                }
        });
        return free;
    },

	
};