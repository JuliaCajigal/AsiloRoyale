var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Login = function(){};

var input, pw;
var currentUser;


AsiloRoyale.Login.prototype = {

	create: function() {

        //Identificamos a la entrada por teclado y desplegamos el cuadro de diálogo de entrada
		input = document.getElementById('username');
		input.style.display = 'block';
		pw = document.getElementById('passw');
		pw.style.display = 'block';

        //Cámara y mundo
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

        //Botón OK
		var boton = this.game.add.button(665, 350,'okbutton', this.changeState, this,1,0,1,0);
 		boton.width = 64;
 		boton.height = 64;
 		boton.anchor.setTo(0.5);
 		boton.input.useHandCursor = false;

 		//Indicativo introduzca un nick
 	    //var tabla_conectados = this.game.add.sprite(295, 250, 'chooseNick');
 		var warningN = this.game.add.text(310, 250, 'CHOOSE A NICKNAME', {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" });
 	    var warningP = this.game.add.text(350, 350, 'AND PASSWORD', {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" });

        //TV
		var tv = this.game.add.sprite(0, 0, 'tv');
    	tv.fixedToCamera = true;
    	
    	this.click = new Phaser.Sound(this.game, 'click');
    	
    	

    },

    //Función para pasar al estado de OnlineLobby 
    //si el nombre introducido es menor a 12 caracteres
    changeState: function() {
    	this.click.play();
    	var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
        var that = this;
		var input = $('#username')
    	var value = input.val();
		var pwin = $('#passw')
    	var pw = pwin.val();
		var sizename = value.length;
        input.val('');
        pwin.val('');
        freeName = true;
        
        var user = {
            nick: value,
            password: pw,
            ready:false
            //ip: ip
        }
        
        
        //console.log(freeName);
        if(sizename>12){
    		var text = 'Nombre demasiado largo'; 
    		var warning = this.game.add.text(300, 450, text, style);	
        }else if(sizename<=12){
        	var goLogin = true;
        
        		loadUserNames(function (userNames) {
        			for (var i = 0; i < userNames.length; i++) {
        				
        				//Comprobamos si el nombre actual ya existe
        				if(userNames[i] == value){
        					goLogin = false;
        				}
        			}
        			if(goLogin == false){
                        var text = 'Nombre de usuario no disponible'; 
                        var warning = that.game.add.text(300, 450, text, style);
        				
        			}else{
        				createUser(user, function (userWithId) {
                            currentUser = userWithId;
                            that.game.state.start('CharacterSelection', false, false, currentUser);
                        });
        			}
        	});

        }
},


    update: function() {
    	    	
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.click.play();
   			this.game.state.start('MainMenu');}
}

};