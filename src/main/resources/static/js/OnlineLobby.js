var AsiloRoyale = AsiloRoyale || {};
var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.OnlineLobby = function(){};

var info;
var usersList;
var timer, timerEvent, timerUpdate;
var disconnected = false;
var serverOff = false;
var count = false;
var lobby;
var hostIP;
var host;



AsiloRoyale.OnlineLobby.prototype = {

	create: function() {

      //Recogemos el valor del input y bloqueamos el cuadro de di-alogo
		  input = document.getElementById('username');
		  input.style.display = 'none';
      
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
      
      this.click = new Phaser.Sound(this.game, 'click');
    	
      //Temporizador
      this.timer = this.game.time.create();
        
      //Evento de tiempo
   	  timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 10, this.endTimer, this);

      //Cargamos los usuarios cada 3 segundos
      this.checkUsers();
      var updater = this.game.time.events.loop(Phaser.Timer.SECOND*3, this.checkUsers, this);


      //Nada más conectarnos al lobby enviamos un mensaje, el primer jugador hará de host.
      msgLobby = {socket: "lobby",
                  lobby: lobby.id}

      console.log(msgLobby);

      //Enviamos un mensaje al servidor para agrupar en lobbies las sesiones
      timeConnection.send(JSON.stringify(msgLobby));

   
  },
    

  // Recibimos el usuario desde Login
	init: function(currentUser, currentLobby){
      lobby = currentLobby;

      if(currentLobby.users[0] == currentUser){
        currentUser.host == true;
      }
	},


  update: function() {
 		var that = this;
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    var F5Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F5);

   	if(escKey.isDown || F5Key.isDown){
        deleteUser(currentUser.id);
        deleteLobbyUser(lobby, currentUser)
        this.game.state.start('MainMenu');
        
    }
    this.checkConnection();
	},


  checkUsers: function(){
    var that = this;

    loadLobbyID(lobby.id, function (lobby) {

        var lobbyUsers = lobby.users;
        info = '';
         
        usersconnected = [];

        for (var i = 0; i < lobbyUsers.length; i++) {
            var user = lobbyUsers[i];

            if(user != null){

              if(user.inactivityTime >= 5){
                info += i + ":  " + user.nick + "  [DESC]" + "\n";
                
              }else if (user.ready == true ){
                info += i + ":  " + user.nick + "  [READY]" + "\n";
                usersconnected.push(user);
                console.log(usersconnected);
                
              }else{
                info += i + ":  " + user.nick + "\n";
              }
          }
        }
        usersList.setText(info);
        

        //El host (primer usuario del Lobby) da paso a la cuenta atrás cuando el lobby está completo
        if(usersconnected.length == lobby.maxUsers && count == false){
          that.timer.start();
          count = true;
          console.log("x");

            if (currentUser.host == true){

                msgTime = {socket: "time",
                			     time: that.timer.ms};

                timeConnection.send(JSON.stringify(msgTime));
              }
        }

        //El resto de usuarios recibirán actualizaciones de la cuenta atrás para entrár al juego sincronizados
        //Cuando se actualice el valor del Tiempo comenzará a correr la cuenta atrás  
        if(Tiempo != null && currentUser != host){
          that.timer.start();
        }
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
      this.click.play();
    var that = this;
	   var userReady;
     var updatedLobby;
	   console.log(currentUser.ready);
	   
	   if(currentUser.ready==false){
		   userReady=true;
		   boton5.setFrames(1,1,1,0);
		   currentUser.ready=true;
	   }else{
		   userReady = false;
		   boton5.setFrames(0,0,0,1);
		   currentUser.ready=false;
	   }
	   
      var updatedUser = {
        id: currentUser.id,
        nick: currentUser.nick,
        inactivityTime: 0,
        ready: userReady,
        ip: currentUser.ip,
        skin : currentUser.skin,
        host: currentUser.host              
      }

      console.log(updatedUser.id);

      updateUser(updatedUser);
      updateLobbyUser(lobby, updatedUser);

      /*loadLobbyID(lobby.id, function (lobby) {
          updatedLobby = lobby;
          updatedLobby.users[that.getPosFromLobby(lobby)] = updatedUser;
          console.log(updatedLobby);
          updateLobby(updatedLobby);
      });*/ 
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
		if (this.timer.running) {
          this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - this.timer.ms) / 1000)), 1010, 78, "#51F55B", "50px 'VT323'");
    }else {
          this.game.debug.text("Done!",1010, 78, "#51F55B", "50px 'VT323'");
    }
  },


  // Código de: http://jsfiddle.net/lewster32/vd70o41p/
  endTimer: function() {
      this.timer.stop();
      this.game.state.start('GameOnline', true, false, usersconnected);
  },

  // cambia el formato del tiempo
  formatTime: function(s) {

      var minutes = "0" + Math.floor(s / 60);
      var seconds = "0" + (s - minutes * 60);
      return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

  getPosFromLobby: function(lobby) {
    var pos;

    for(var i = 0; lobby.users.length; i ++){
      if(lobby.users[i] != null && lobby.users[i].id == lobbyUser.id){
        pos = i;
      }
    }
    return pos;
  }

};

