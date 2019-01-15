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
var countDown;
var globalClock;
var hostOnGame = false;



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

      //Si es el primer usuario en el lobby será el host
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
    this.checkCount();
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
        

        //Si todos los usuarios del lobby están ready lanzamos la cuenta y su sincronización
        if(usersconnected.length == lobby.maxUsers && count == false){
        		count = true;
            	animateCount(10);
            	startCount(currentUser.host);
        }
    })
  },
  
  checkCount: function(){
	  if(timer <= 0 || hostOnGame){
      console.log(timer);
      display.setValue('00:00');
		  clearInterval(countDown);
		  clearInterval(globalClock);
		  this.game.state.start('GameOnline', true, false, usersconnected);
	  }
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
   },

	//Muestra la lista de usuarios
	showUsers: function() {
		
		var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
		var text = ''; 
		usersList = this.game.add.text(300, 200, text, style);
		usersList.fixedToCamera = true;
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

function startCount(host) {
	countDown = setInterval(function () {

    	//Si somos el host enviamos periódicamente mensajes de la cuenta atrás
    	if(host){
    		 msgTime = {socket: "time",
    			     time: timer};
    		 console.log(msgTime);
    		 timeConnection.send(JSON.stringify(msgTime));

    	//Si no actualizamos nuestra cuenta	 
    	}else{
    		if(Tiempo != null){
            	timer = Tiempo;
            }
    	}
    	}, 1000);
    }

