var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.OnlineLobby = function(){};

var info;
var usersList;
var usersconnected = 0;
var timer, timerEvent;
var ownId;
var disconnected = false;

function loadUsers(callback) {
    $.ajax({
        url: 'http://localhost:8080/users'
    
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
        callback(users);
    
    }).fail(function () {
        console.error("Se ha perdido la conexión con el servidor.");
        disconnected = true;
        //deleteUser(ownId);
    })
}

//Delete item from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/users/' + userId
    }).done(function (user) {
        console.log("Deleted user " + userId)
    })
}




AsiloRoyale.OnlineLobby.prototype = {

	create: function() {

		//this.loadItemsArray();

		/*var style1 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text1 = 'Usuarios conectados: ' ;
		on = this.game.add.text(320, 200, text1, style1);*/
		//this.usersConnected.fixedToCamera = true;
		//this.userList.parseList(users);
		
		input = document.getElementById('username');
		input.style.display = 'none';

		
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    this.tv.fixedToCamera = true;
    this.tabla_conectados = this.game.add.sprite(282, 125, 'tabla_conectados');
    this.tabla_conectados.fixedToCamera = true;

    this.showUsers();
    	
    //Temporizador
    timer = this.game.time.create();
        
    //Evento de tiempo
   	timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 00, this.endTimer, this);
    //var updaterTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 5, checkConnection() , this);
        
    //Comienzo temporizador
    //timer.start();
    //this.showUsers();

    },
    
  //Recibe parametros de Login
	init: function(currentUser){
		  ownId = currentUser;
	},

  update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   	if(escKey.isDown){
   			deleteUser(ownId);
   			this.game.state.start('MainMenu');
    }
    this.checkConnection();

   	loadUsers(function (users) {
        usersconnected = users.length;
        info = '';
            
        for (var i = 0; i < users.length; i++) {
           	var user = users[i];
           	info += i + ":  " + user.nick + "\n";
             console.log(users[i]);
            }
        usersList.setText(info);
    })
	},

  checkConnection: function (){
    if(disconnected){
      console.log(disconnected);
      var serverAlert = this.game.add.image((this.game.camera.width-150)/2, (this.game.camera.height/2), 'serveroff');
      serverAlert.anchor.setTo(0.5);
      this.tabla_conectados.alpha = 0.4;
      usersList.alpha = 0.4;
    }
     
  },

	
	showUsers: function() {
		var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
		var text = ''; 
		usersList = this.game.add.text(300, 200, text, style);
		usersList.fixedToCamera = true;
	},


//Muestra el tiempo que queda para el final de la partida
	render: function() {
		if (timer.running) {
          this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 1010, 78, "#51F55B", "50px 'VT323'");
      }
      else {
          this.game.debug.text("Done!",1010, 78, "#51F55B", "50px 'VT323'");
      }
  },


  //Código de: http://jsfiddle.net/lewster32/vd70o41p/
  endTimer: function() {
      timer.stop();
      this.game.state.start('Game');
  },

  //cambia el formato del tiempo
  formatTime: function(s) {

      var minutes = "0" + Math.floor(s / 60);
      var seconds = "0" + (s - minutes * 60);
      return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

};