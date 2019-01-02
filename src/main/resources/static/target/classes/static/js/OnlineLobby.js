var AsiloRoyale = AsiloRoyale || {};
var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.OnlineLobby = function(){};

var info;
var usersList;
var usersconnected = 0;
var timer, timerEvent, timerUpdate;
var lobbyUser;
var disconnected = false;
var serverOff = false;



AsiloRoyale.OnlineLobby.prototype = {

	create: function() {

      //Recogemos el valor del input y bloqueamos el cuadro de di-alogo
		  input = document.getElementById('username');
		  input.style.display = 'none';

      //Creamos un nuevo usuario con id + nick
      this.newUser = new User(this.game, lobbyUser.id, lobbyUser.nick);
      
		  //Dimensiones del mundo y cámara
		  this.game.camera.setBoundsToWorld();
		  this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		  this.background.autoScroll(20, 0);
		
      //TV
	    var tv = this.game.add.sprite(0, 0, 'tv');
      tv.fixedToCamera = true;
      this.tabla_conectados = this.game.add.sprite(282, 125, 'tabla_conectados');
      this.tabla_conectados.fixedToCamera = true;
    
      //Botón READY
      boton5 = this.game.add.button((this.game.camera.width-725)/2+290,this.game.camera.height/2+200,'readybutton', this.changeReady, this,0,0,0,1);
	    boton5.width = 150;
	    boton5.height = 70;
	    boton5.anchor.setTo(0.5);

      //Crea el texto que se actualizará con los nombres de los distintos jugadores en línea
      this.showUsers();
    	
      //Temporizador
      timer = this.game.time.create();
        
      //Evento de tiempo
   	  timerEvent = timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 10, this.endTimer, this);

      //Cargamos los usuarios cada 1.5 segundos
      this.checkUsers();
      var updater = this.game.time.events.loop(Phaser.Timer.SECOND*1.5, this.checkUsers, this);
   
  },
    

  // Recibimos el usuario desde Login
	init: function(currentUser){
      lobbyUser = currentUser;
	},


  update: function() {
 		var that = this;
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

   	if(escKey.isDown){
   			deleteUser(lobbyUser.id);
   			this.game.state.start('MainMenu');
    }
    this.checkConnection();
    

	},

  checkUsers: function(){

    loadUsers(function (users) {

        usersconnected = users.length;
        info = '';
         
        var usersReady=0;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];

            if(users[i].inactivityTime >= 5){
                info += i + ":  " + user.nick + "  [DESC]" + "\n";
                usersReady--;
              }else if (users[i].ready == true){
                info += i + ":  " + user.nick + "  [READY]" + "\n";
              usersReady++;
                
              }else{
                info += i + ":  " + user.nick + "\n";
              }


            if(usersReady>=2){
                timer.start();
            }else{
              timer.stop();
            }
             
        }
        usersList.setText(info);
    })
  },

  //Comprueba si el servidor está Online
  checkConnection: function (){
    if(serverOff == true){
      
      //De serlo, el resto de elementos pasan a un segundo plano y se muestra una imágen
      var serverAlert = this.game.add.image((this.game.camera.width-150)/2, (this.game.camera.height/2), 'serveroff');
      serverAlert.anchor.setTo(0.5);
      this.tabla_conectados.alpha = 0.4;
      usersList.alpha = 0.4;
    }
     
  },
  
  //Cambia el estado ready del usuario
  changeReady: function(){
	   var userReady;
	   console.log(this.newUser.ready);
	   
	   if(this.newUser.ready==false){
		   userReady=true;
		   boton5.setFrames(1,1,1,0);
		   this.newUser.ready=true;
	   }else{
		   userReady = false;
		   boton5.setFrames(0,0,0,1);
		   this.newUser.ready=false;
	   }
	   
      var updatedUser = {
        id: this.newUser.id,
        nick: this.newUser.name,
        inactivityTime: this.newUser.inactivityTime,
        ready: userReady               
      }

      updateUser(updatedUser);
       	   
   },

	//Muestra la lista de usuarios
	showUsers: function() {
		
		var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
		var text = ''; 
		usersList = this.game.add.text(300, 200, text, style);
		usersList.fixedToCamera = true;
	},


// Muestra el tiempo que queda para el final de la partida
	render: function() {
		if (timer.running) {
          this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 1010, 78, "#51F55B", "50px 'VT323'");
    }else {
          this.game.debug.text("Done!",1010, 78, "#51F55B", "50px 'VT323'");
    }
  },


  // Código de: http://jsfiddle.net/lewster32/vd70o41p/
  endTimer: function() {
      timer.stop();
      this.game.state.start('Game');
  },

  // cambia el formato del tiempo
  formatTime: function(s) {

      var minutes = "0" + Math.floor(s / 60);
      var seconds = "0" + (s - minutes * 60);
      return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

};
